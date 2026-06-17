import { corsair } from "@/lib/corsair";
import { prisma } from "@/lib/prisma";
import { CalendarEventRepository } from "../repositories/calendar-event.repository";
import type { CalendarEvent, ListEventsInput, CreateEventInput, UpdateEventInput, GetAvailabilityInput, CalendarAvailability } from "@/types";
import { ExternalServiceError } from "@/lib/errors";

export class CalendarService {
  constructor(private calendarEventRepository: CalendarEventRepository) {}

  /**
   * Helper to get the Corsair Account ID for a user.
   */
  private async getCorsairAccountId(userId: string): Promise<string> {
    const account = await prisma.corsairAccount.findFirst({
      where: {
        tenantId: userId,
        integration: {
          name: "googlecalendar",
        },
      },
    });

    if (!account) {
      throw new Error("No Google Calendar account connected. Please connect your account first.");
    }

    return account.id;
  }

  /**
   * List calendar events for a user (from database cache).
   */
  async listEvents(params: ListEventsInput): Promise<CalendarEvent[]> {
    return this.calendarEventRepository.list({
      userId: params.userId,
      calendarId: params.calendarId,
      timeMin: params.timeMin,
      timeMax: params.timeMax,
      limit: params.maxResults || 100,
    });
  }

  /**
   * Get a single event.
   */
  async getEvent(eventId: string, userId: string): Promise<CalendarEvent> {
    const event = await this.calendarEventRepository.findById(eventId, userId);
    if (!event) {
      throw new Error(`Calendar event ${eventId} not found.`);
    }
    return event;
  }

  /**
   * Create a new calendar event.
   */
  async createEvent(input: CreateEventInput): Promise<CalendarEvent> {
    const accountId = await this.getCorsairAccountId(input.userId);
    const calendarId = input.calendarId || "primary";

    // Cast is required because withTenant() returns a generic CorsairInstance, 
    // but we need the specific plugin typings (gmail, googlecalendar) configured on the main corsair instance.
    const tenantCorsair = corsair.withTenant(input.userId) as any;

    let createdEvent;
    try {
      // 1. Send create request to Google Calendar API via Corsair
      createdEvent = await tenantCorsair.googlecalendar.api.events.create({
        accountId,
        calendarId,
        event: {
          summary: input.summary,
          description: input.description,
          location: input.location,
          start: input.start,
          end: input.end,
          attendees: input.attendees,
          recurrence: input.recurrence,
          reminders: input.reminders,
          visibility: input.visibility,
        },
        sendUpdates: input.sendUpdates || "all",
      });
    } catch (error) {
      console.error(`Google Calendar createEvent failed for user ${input.userId}:`, error);
      throw new ExternalServiceError("googlecalendar", error);
    }

    // 2. Cache in local database
    const mapped = this.mapCorsairEvent(createdEvent, input.userId, calendarId);
    return this.calendarEventRepository.upsert(mapped);
  }

  /**
   * Update an existing event.
   */
  async updateEvent(input: UpdateEventInput): Promise<CalendarEvent> {
    const accountId = await this.getCorsairAccountId(input.userId);
    const calendarId = input.calendarId || "primary";

    // 1. Fetch current cached event to get details
    const existing = await this.getEvent(input.eventId, input.userId);

    const tenantCorsair = corsair.withTenant(input.userId) as any;

    let updatedEvent;
    try {
      // 2. Send update to Google Calendar via Corsair
      updatedEvent = await tenantCorsair.googlecalendar.api.events.update({
        accountId,
        calendarId,
        eventId: input.eventId,
        event: {
          summary: input.summary ?? existing.summary,
          description: input.description ?? existing.description,
          location: input.location ?? existing.location,
          start: input.start ?? existing.start,
          end: input.end ?? existing.end,
          attendees: input.attendees ?? existing.attendees,
          recurrence: input.recurrence ?? existing.recurrence,
          reminders: input.reminders ?? existing.reminders,
          visibility: input.visibility ?? existing.visibility,
        },
        sendUpdates: input.sendUpdates || "all",
      });
    } catch (error) {
      console.error(`Google Calendar updateEvent failed for user ${input.userId}, event ${input.eventId}:`, error);
      throw new ExternalServiceError("googlecalendar", error);
    }

    // 3. Cache the update
    const mapped = this.mapCorsairEvent(updatedEvent, input.userId, calendarId);
    return this.calendarEventRepository.upsert(mapped);
  }

  /**
   * Delete an event.
   */
  async deleteEvent(userId: string, eventId: string, calendarId = "primary"): Promise<void> {
    const accountId = await this.getCorsairAccountId(userId);

    const tenantCorsair = corsair.withTenant(userId) as any;

    try {
      // 1. Delete from Google Calendar
      await tenantCorsair.googlecalendar.api.events.delete({
        accountId,
        calendarId,
        eventId,
      });
    } catch (error) {
      console.error(`Google Calendar deleteEvent failed for user ${userId}, event ${eventId}:`, error);
      throw new ExternalServiceError("googlecalendar", error);
    }

    // 2. Delete from cache
    await this.calendarEventRepository.delete(eventId, userId);
  }

  /**
   * Fetch free/busy availability scheduling data.
   */
  async getAvailability(input: GetAvailabilityInput): Promise<CalendarAvailability[]> {
    const accountId = await this.getCorsairAccountId(input.userId);
    const calendarIds = input.calendarIds && input.calendarIds.length > 0 ? input.calendarIds : ["primary"];

    const tenantCorsair = corsair.withTenant(input.userId) as any;

    let response;
    try {
      response = await tenantCorsair.googlecalendar.api.calendar.getAvailability({
        accountId,
        timeMin: input.timeMin,
        timeMax: input.timeMax,
        calendarIds,
      });
    } catch (error) {
      console.error(`Google Calendar getAvailability failed for user ${input.userId}:`, error);
      throw new ExternalServiceError("googlecalendar", error);
    }

    return Object.entries(response.calendars || {}).map(([id, val]: [string, any]) => ({
      calendarId: id,
      busy: (val.busy || []).map((b: any) => ({
        start: b.start,
        end: b.end,
      })),
    }));
  }

  /**
   * Sync events from Google Calendar via Corsair APIs.
   */
  async syncFromCorsair(userId: string, timeMin?: string, maxResults = 100): Promise<CalendarEvent[]> {
    const accountId = await this.getCorsairAccountId(userId);
    const calendarId = "primary";

    const tenantCorsair = corsair.withTenant(userId) as any;

    // 1. List events from Google Calendar
    let response;
    try {
      response = await tenantCorsair.googlecalendar.api.events.getMany({
        accountId,
        calendarId,
        timeMin: timeMin || new Date().toISOString(),
        maxResults,
        singleEvents: true,
      });
    } catch (error) {
      console.error(`Google Calendar getMany failed for user ${userId}:`, error);
      throw new ExternalServiceError("googlecalendar", error);
    }

    const syncedEvents: CalendarEvent[] = [];

    // 2. Cache and return each event
    for (const item of response.items || []) {
      try {
        const mapped = this.mapCorsairEvent(item, userId, calendarId);
        const cached = await this.calendarEventRepository.upsert(mapped);
        syncedEvents.push(cached);
      } catch (error) {
        console.error(`Failed caching calendar event ${item.id}:`, error);
      }
    }

    return syncedEvents;
  }

  /**
   * Mapper from Corsair event to domain model.
   */
  private mapCorsairEvent(event: any, userId: string, calendarId: string): CalendarEvent {
    return {
      id: event.id,
      userId,
      calendarId,
      summary: event.summary || "(No Title)",
      description: event.description || undefined,
      location: event.location || undefined,
      start: {
        date: event.start?.date || undefined,
        dateTime: event.start?.dateTime || undefined,
        timeZone: event.start?.timeZone || undefined,
      },
      end: {
        date: event.end?.date || undefined,
        dateTime: event.end?.dateTime || undefined,
        timeZone: event.end?.timeZone || undefined,
      },
      status: (event.status || "confirmed") as any,
      visibility: (event.visibility || "default") as any,
      attendees: (event.attendees || []).map((a: any) => ({
        email: a.email,
        displayName: a.displayName || undefined,
        responseStatus: a.responseStatus || "needsAction",
        organizer: a.organizer || false,
        self: a.self || false,
        optional: a.optional || false,
      })),
      recurrence: event.recurrence || [],
      recurringEventId: event.recurringEventId || undefined,
      htmlLink: event.htmlLink || undefined,
      hangoutLink: event.hangoutLink || undefined,
      colorId: event.colorId || undefined,
      reminders: event.reminders
        ? {
            useDefault: event.reminders.useDefault ?? true,
            overrides: (event.reminders.overrides || []).map((o: any) => ({
              method: o.method as any,
              minutes: o.minutes,
            })),
          }
        : undefined,
      creator: event.creator
        ? {
            email: event.creator.email || "",
            displayName: event.creator.displayName || undefined,
            self: event.creator.self || false,
          }
        : undefined,
      organizer: event.organizer
        ? {
            email: event.organizer.email || "",
            displayName: event.organizer.displayName || undefined,
            self: event.organizer.self || false,
          }
        : undefined,
    };
  }
}

import { BaseRepository } from "./base.repository";
import type { CalendarEvent } from "@/types";
import type { CalendarEvent as PrismaCalendarEvent } from "@/lib/generated/prisma";

export class CalendarEventRepository extends BaseRepository {
  /**
   * Find a calendar event by ID.
   */
  async findById(id: string, userId: string): Promise<CalendarEvent | null> {
    const event = await this.prisma.calendarEvent.findFirst({
      where: { id, userId },
    });
    return event ? this.mapToDomain(event) : null;
  }

  /**
   * List calendar events for a user with date range filtering.
   */
  async list(params: {
    userId: string;
    calendarId?: string;
    timeMin?: string; // ISO 8601
    timeMax?: string; // ISO 8601
    limit?: number;
  }): Promise<CalendarEvent[]> {
    const { userId, calendarId, timeMin, timeMax, limit = 100 } = params;

    // Build the query using raw SQL to query JSON dates efficiently in Postgres
    let sql = `
      SELECT id, user_id, calendar_id, summary, description, location, start, "end", status, visibility, attendees, recurrence, recurring_event_id, html_link, hangout_link, color_id, reminders, creator, organizer, created_at, updated_at
      FROM calendar_events
      WHERE user_id = $1
    `;
    const queryParams: any[] = [userId];

    if (calendarId) {
      sql += ` AND calendar_id = $${queryParams.length + 1}`;
      queryParams.push(calendarId);
    }

    if (timeMin) {
      sql += ` AND COALESCE(start->>'dateTime', start->>'date')::timestamp >= $${queryParams.length + 1}::timestamp`;
      queryParams.push(timeMin);
    }

    if (timeMax) {
      sql += ` AND COALESCE(start->>'dateTime', start->>'date')::timestamp <= $${queryParams.length + 1}::timestamp`;
      queryParams.push(timeMax);
    }

    sql += ` ORDER BY COALESCE(start->>'dateTime', start->>'date') ASC LIMIT $${queryParams.length + 1}`;
    queryParams.push(limit);

    const rawEvents = await this.prisma.$queryRawUnsafe<any[]>(sql, ...queryParams);

    return rawEvents.map((e) => ({
      id: e.id,
      userId: e.user_id,
      calendarId: e.calendar_id,
      summary: e.summary,
      description: e.description || undefined,
      location: e.location || undefined,
      start: e.start,
      end: e.end,
      status: e.status as any,
      visibility: e.visibility || undefined,
      attendees: e.attendees || [],
      recurrence: e.recurrence || [],
      recurringEventId: e.recurring_event_id || undefined,
      htmlLink: e.html_link || undefined,
      hangoutLink: e.hangout_link || undefined,
      colorId: e.color_id || undefined,
      reminders: e.reminders || undefined,
      creator: e.creator || undefined,
      organizer: e.organizer || undefined,
      createdAt: e.created_at?.toISOString(),
      updatedAt: e.updated_at?.toISOString(),
    }));
  }

  /**
   * Create or update (upsert) a calendar event.
   */
  async upsert(event: CalendarEvent): Promise<CalendarEvent> {
    const data = {
      userId: event.userId,
      calendarId: event.calendarId,
      summary: event.summary,
      description: event.description,
      location: event.location,
      start: event.start as any,
      end: event.end as any,
      status: event.status,
      visibility: event.visibility,
      attendees: event.attendees as any,
      recurrence: event.recurrence,
      recurringEventId: event.recurringEventId,
      htmlLink: event.htmlLink,
      hangoutLink: event.hangoutLink,
      colorId: event.colorId,
      reminders: event.reminders as any,
      creator: event.creator as any,
      organizer: event.organizer as any,
    };

    const upserted = await this.prisma.calendarEvent.upsert({
      where: { id: event.id },
      create: {
        id: event.id,
        ...data,
      },
      update: data,
    });

    return this.mapToDomain(upserted);
  }

  /**
   * Delete an event by ID.
   */
  async delete(id: string, userId: string): Promise<void> {
    await this.prisma.calendarEvent.deleteMany({
      where: { id, userId },
    });
  }

  /**
   * Save a vector embedding for an event for semantic operations.
   */
  async updateEmbedding(id: string, embedding: number[]): Promise<void> {
    const vectorStr = `[${embedding.join(",")}]`;
    await this.prisma.$executeRawUnsafe(
      `UPDATE calendar_events SET embedding = $1::vector WHERE id = $2`,
      vectorStr,
      id
    );
  }

  /**
   * Helper to map Prisma model to Domain model.
   */
  private mapToDomain(event: PrismaCalendarEvent): CalendarEvent {
    return {
      id: event.id,
      userId: event.userId,
      calendarId: event.calendarId,
      summary: event.summary,
      description: event.description || undefined,
      location: event.location || undefined,
      start: event.start as any,
      end: event.end as any,
      status: event.status as any,
      visibility: event.visibility as any,
      attendees: event.attendees as any,
      recurrence: event.recurrence,
      recurringEventId: event.recurringEventId || undefined,
      htmlLink: event.htmlLink || undefined,
      hangoutLink: event.hangoutLink || undefined,
      colorId: event.colorId || undefined,
      reminders: event.reminders as any,
      creator: event.creator as any,
      organizer: event.organizer as any,
      createdAt: event.createdAt.toISOString(),
      updatedAt: event.updatedAt.toISOString(),
    };
  }
}

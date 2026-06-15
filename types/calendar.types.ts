/**
 * Calendar domain types for Syncar.
 * Abstracts over Corsair's Google Calendar API types.
 */

// --- Event Status ---

export type CalendarEventStatus = "confirmed" | "tentative" | "cancelled";

// --- Event Visibility ---

export type CalendarEventVisibility =
  | "default"
  | "public"
  | "private"
  | "confidential";

// --- RSVP Status ---

export type RsvpStatus = "needsAction" | "declined" | "tentative" | "accepted";

// --- Date/Time ---

export interface EventDateTime {
  date?: string; // All-day event (YYYY-MM-DD)
  dateTime?: string; // Specific time (ISO 8601)
  timeZone?: string;
}

// --- Attendee ---

export interface CalendarAttendee {
  email: string;
  displayName?: string;
  responseStatus?: RsvpStatus;
  organizer?: boolean;
  self?: boolean;
  optional?: boolean;
}

// --- Reminder ---

export interface EventReminder {
  method: "email" | "popup";
  minutes: number;
}

// --- Core Calendar Event ---

export interface CalendarEvent {
  id: string;
  userId: string;
  calendarId: string;
  summary: string;
  description?: string;
  location?: string;
  start: EventDateTime;
  end: EventDateTime;
  status: CalendarEventStatus;
  visibility?: CalendarEventVisibility;
  attendees: CalendarAttendee[];
  recurrence?: string[];
  recurringEventId?: string;
  htmlLink?: string;
  hangoutLink?: string;
  colorId?: string;
  reminders?: {
    useDefault: boolean;
    overrides?: EventReminder[];
  };
  creator?: {
    email: string;
    displayName?: string;
    self?: boolean;
  };
  organizer?: {
    email: string;
    displayName?: string;
    self?: boolean;
  };
  createdAt?: string;
  updatedAt?: string;
}

// --- Calendar Event Summary (for list views) ---

export interface CalendarEventSummary {
  id: string;
  summary: string;
  start: EventDateTime;
  end: EventDateTime;
  status: CalendarEventStatus;
  location?: string;
  attendeeCount: number;
  hasConference: boolean;
  colorId?: string;
}

// --- Input Types ---

export interface ListEventsInput {
  userId: string;
  calendarId?: string;
  timeMin?: string; // ISO 8601
  timeMax?: string; // ISO 8601
  maxResults?: number;
  query?: string;
  singleEvents?: boolean;
  orderBy?: "startTime" | "updated";
}

export interface GetEventInput {
  userId: string;
  eventId: string;
  calendarId?: string;
}

export interface CreateEventInput {
  userId: string;
  calendarId?: string;
  summary: string;
  description?: string;
  location?: string;
  start: EventDateTime;
  end: EventDateTime;
  attendees?: CalendarAttendee[];
  recurrence?: string[];
  reminders?: {
    useDefault: boolean;
    overrides?: EventReminder[];
  };
  visibility?: CalendarEventVisibility;
  sendUpdates?: "all" | "externalOnly" | "none";
}

export interface UpdateEventInput {
  userId: string;
  eventId: string;
  calendarId?: string;
  summary?: string;
  description?: string;
  location?: string;
  start?: EventDateTime;
  end?: EventDateTime;
  attendees?: CalendarAttendee[];
  recurrence?: string[];
  reminders?: {
    useDefault: boolean;
    overrides?: EventReminder[];
  };
  visibility?: CalendarEventVisibility;
  sendUpdates?: "all" | "externalOnly" | "none";
}

export interface DeleteEventInput {
  userId: string;
  eventId: string;
  calendarId?: string;
  sendUpdates?: "all" | "externalOnly" | "none";
}

export interface GetAvailabilityInput {
  userId: string;
  timeMin: string;
  timeMax: string;
  calendarIds?: string[];
}

// --- Availability ---

export interface FreeBusySlot {
  start: string;
  end: string;
}

export interface CalendarAvailability {
  calendarId: string;
  busy: FreeBusySlot[];
}

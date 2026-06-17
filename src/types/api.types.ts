/**
 * API-layer types for Syncar route handlers.
 * Zod schemas for request validation and typed response helpers.
 */

import { z } from "zod/v4";

// ============================================================
// Email Schemas
// ============================================================

export const EmailParticipantSchema = z.object({
  name: z.string().optional(),
  email: z.email(),
});

export const ListEmailsSchema = z.object({
  labelIds: z.array(z.string()).optional(),
  query: z.string().optional(),
  maxResults: z.number().int().min(1).max(100).optional().default(20),
  pageToken: z.string().optional(),
  priority: z.enum(["HIGH", "MEDIUM", "LOW"]).optional(),
  refresh: z.boolean().optional(),
});

export const SendEmailSchema = z.object({
  to: z.array(EmailParticipantSchema).min(1, "At least one recipient required"),
  cc: z.array(EmailParticipantSchema).optional(),
  bcc: z.array(EmailParticipantSchema).optional(),
  subject: z.string().min(1, "Subject is required"),
  body: z.string().min(1, "Body is required"),
  bodyHtml: z.string().optional(),
  replyToEmailId: z.string().optional(),
  threadId: z.string().optional(),
});

export const CreateDraftSchema = z.object({
  to: z.array(EmailParticipantSchema).optional(),
  cc: z.array(EmailParticipantSchema).optional(),
  bcc: z.array(EmailParticipantSchema).optional(),
  subject: z.string().optional(),
  body: z.string().optional(),
  bodyHtml: z.string().optional(),
  replyToEmailId: z.string().optional(),
});

export const UpdateDraftSchema = z.object({
  to: z.array(EmailParticipantSchema).optional(),
  cc: z.array(EmailParticipantSchema).optional(),
  bcc: z.array(EmailParticipantSchema).optional(),
  subject: z.string().optional(),
  body: z.string().optional(),
  bodyHtml: z.string().optional(),
});

export const SearchEmailsSchema = z.object({
  query: z.string().min(1, "Search query is required"),
  useVectorSearch: z.boolean().optional().default(false),
  maxResults: z.number().int().min(1).max(50).optional().default(10),
  labelIds: z.array(z.string()).optional(),
});

// ============================================================
// Calendar Schemas
// ============================================================

export const EventDateTimeSchema = z.object({
  date: z.string().optional(), // YYYY-MM-DD for all-day
  dateTime: z.string().optional(), // ISO 8601
  timeZone: z.string().optional(),
}).refine(
  (data) => data.date || data.dateTime,
  { message: "Either 'date' or 'dateTime' must be provided" }
);

export const CalendarAttendeeSchema = z.object({
  email: z.email(),
  displayName: z.string().optional(),
  optional: z.boolean().optional(),
});

export const EventReminderSchema = z.object({
  method: z.enum(["email", "popup"]),
  minutes: z.number().int().min(0),
});

export const ListEventsSchema = z.object({
  calendarId: z.string().optional().default("primary"),
  timeMin: z.string().optional(),
  timeMax: z.string().optional(),
  maxResults: z.number().int().min(1).max(250).optional().default(50),
  query: z.string().optional(),
  singleEvents: z.boolean().optional().default(true),
  orderBy: z.enum(["startTime", "updated"]).optional().default("startTime"),
});

export const CreateEventSchema = z.object({
  calendarId: z.string().optional().default("primary"),
  summary: z.string().min(1, "Event title is required"),
  description: z.string().optional(),
  location: z.string().optional(),
  start: EventDateTimeSchema,
  end: EventDateTimeSchema,
  attendees: z.array(CalendarAttendeeSchema).optional(),
  recurrence: z.array(z.string()).optional(),
  reminders: z
    .object({
      useDefault: z.boolean(),
      overrides: z.array(EventReminderSchema).optional(),
    })
    .optional(),
  visibility: z
    .enum(["default", "public", "private", "confidential"])
    .optional(),
  sendUpdates: z.enum(["all", "externalOnly", "none"]).optional().default("all"),
});

export const UpdateEventSchema = z.object({
  calendarId: z.string().optional().default("primary"),
  summary: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  start: EventDateTimeSchema.optional(),
  end: EventDateTimeSchema.optional(),
  attendees: z.array(CalendarAttendeeSchema).optional(),
  recurrence: z.array(z.string()).optional(),
  reminders: z
    .object({
      useDefault: z.boolean(),
      overrides: z.array(EventReminderSchema).optional(),
    })
    .optional(),
  visibility: z
    .enum(["default", "public", "private", "confidential"])
    .optional(),
  sendUpdates: z.enum(["all", "externalOnly", "none"]).optional().default("all"),
});

export const GetAvailabilitySchema = z.object({
  timeMin: z.string().min(1, "Start time is required"),
  timeMax: z.string().min(1, "End time is required"),
  calendarIds: z.array(z.string()).optional(),
});

// ============================================================
// AI Schemas
// ============================================================

export const ChatSchema = z.object({
  conversationId: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

export const ClassifyEmailSchema = z.object({
  emailId: z.string().min(1),
  subject: z.string(),
  from: z.string(),
  snippet: z.string(),
  body: z.string().optional(),
  labelIds: z.array(z.string()).optional(),
});

// ============================================================
// Type Exports (inferred from schemas)
// ============================================================

export type ListEmailsInput = z.infer<typeof ListEmailsSchema>;
export type SendEmailInput = z.infer<typeof SendEmailSchema>;
export type CreateDraftInput = z.infer<typeof CreateDraftSchema>;
export type UpdateDraftInput = z.infer<typeof UpdateDraftSchema>;
export type SearchEmailsInput = z.infer<typeof SearchEmailsSchema>;
export type ListEventsInput = z.infer<typeof ListEventsSchema>;
export type CreateEventInput = z.infer<typeof CreateEventSchema>;
export type UpdateEventInput = z.infer<typeof UpdateEventSchema>;
export type GetAvailabilityInput = z.infer<typeof GetAvailabilitySchema>;
export type ChatInput = z.infer<typeof ChatSchema>;
export type ClassifyEmailInput = z.infer<typeof ClassifyEmailSchema>;

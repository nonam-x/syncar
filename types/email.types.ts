/**
 * Email domain types for Syncar.
 * These types are used by services, use-cases, and API routes.
 * They abstract over Corsair's Gmail API types for internal use.
 */

// --- Priority Classification ---

export type EmailPriority = "HIGH" | "MEDIUM" | "LOW";

// --- Email Header ---

export interface EmailHeader {
  name: string;
  value: string;
}

// --- Email Participant ---

export interface EmailParticipant {
  name?: string;
  email: string;
}

// --- Email Attachment ---

export interface EmailAttachment {
  id: string;
  filename: string;
  mimeType: string;
  size: number;
}

// --- Core Email Type ---

export interface Email {
  id: string;
  threadId: string;
  userId: string;
  from: EmailParticipant;
  to: EmailParticipant[];
  cc?: EmailParticipant[];
  bcc?: EmailParticipant[];
  subject: string;
  snippet: string;
  body: string;
  bodyHtml?: string;
  labelIds: string[];
  isRead: boolean;
  isStarred: boolean;
  priority: EmailPriority;
  receivedAt: Date;
  attachments: EmailAttachment[];
}

// --- Email Summary (for list views) ---

export interface EmailSummary {
  id: string;
  threadId: string;
  from: EmailParticipant;
  subject: string;
  snippet: string;
  labelIds: string[];
  isRead: boolean;
  isStarred: boolean;
  priority: EmailPriority;
  receivedAt: Date;
  hasAttachments: boolean;
}

// --- Email Draft ---

export interface EmailDraft {
  id: string;
  userId: string;
  to: EmailParticipant[];
  cc?: EmailParticipant[];
  bcc?: EmailParticipant[];
  subject: string;
  body: string;
  bodyHtml?: string;
  replyToEmailId?: string;
  corsairDraftId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// --- Email Thread ---

export interface EmailThread {
  id: string;
  messages: Email[];
  snippet: string;
  historyId: string;
}

// --- Input Types ---

export interface ListEmailsInput {
  userId: string;
  labelIds?: string[];
  query?: string;
  maxResults?: number;
  pageToken?: string;
  priority?: EmailPriority;
}

export interface GetEmailInput {
  userId: string;
  emailId: string;
}

export interface SendEmailInput {
  userId: string;
  to: EmailParticipant[];
  cc?: EmailParticipant[];
  bcc?: EmailParticipant[];
  subject: string;
  body: string;
  bodyHtml?: string;
  replyToEmailId?: string;
  threadId?: string;
}

export interface CreateDraftInput {
  userId: string;
  to?: EmailParticipant[];
  cc?: EmailParticipant[];
  bcc?: EmailParticipant[];
  subject?: string;
  body?: string;
  bodyHtml?: string;
  replyToEmailId?: string;
}

export interface UpdateDraftInput {
  draftId: string;
  userId: string;
  to?: EmailParticipant[];
  cc?: EmailParticipant[];
  bcc?: EmailParticipant[];
  subject?: string;
  body?: string;
  bodyHtml?: string;
}

export interface SearchEmailsInput {
  userId: string;
  query: string;
  useVectorSearch?: boolean;
  maxResults?: number;
  labelIds?: string[];
}

// --- Gmail Label ---

export interface GmailLabel {
  id: string;
  name: string;
  type: "system" | "user";
  messagesTotal?: number;
  messagesUnread?: number;
}

/**
 * TanStack Query hooks for all Syncar API endpoints.
 *
 * Usage:
 *   const { data, isLoading, error } = useEmails();
 *   const sendEmail = useSendEmail();
 *   sendEmail.mutate({ to: [...], subject: "...", body: "..." });
 */

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type { Email, EmailDraft, CalendarEvent } from "@/types";

// ─── Helpers ─────────────────────────────────────────────────

async function apiFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...init?.headers },
    ...init,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || body.error || `API error ${res.status}`);
  }
  return res.json();
}

// ─── Query Keys ──────────────────────────────────────────────

export const queryKeys = {
  emails: (params?: Record<string, string>) => ["emails", params ?? {}] as const,
  email: (id: string) => ["email", id] as const,
  drafts: () => ["drafts"] as const,
  calendarEvents: (params?: Record<string, string>) => ["calendarEvents", params ?? {}] as const,
  unreadCount: () => ["unreadCount"] as const,
};

// ─── Email Queries ───────────────────────────────────────────

export function useEmails(params?: {
  labelIds?: string[];
  priority?: string;
  maxResults?: number;
  query?: string;
}) {
  const searchParams = new URLSearchParams();
  if (params?.labelIds?.length) searchParams.set("labelIds", params.labelIds.join(","));
  if (params?.priority) searchParams.set("priority", params.priority);
  if (params?.maxResults) searchParams.set("maxResults", String(params.maxResults));
  if (params?.query) searchParams.set("query", params.query);

  const qs = searchParams.toString();
  const url = `/api/emails${qs ? `?${qs}` : ""}`;

  return useQuery<Email[]>({
    queryKey: queryKeys.emails(params as Record<string, string> | undefined),
    queryFn: () => apiFetch<Email[]>(url),
  });
}

export function useEmail(id: string | null) {
  return useQuery<Email>({
    queryKey: queryKeys.email(id!),
    queryFn: () => apiFetch<Email>(`/api/emails/${id}`),
    enabled: !!id,
  });
}

// ─── Draft Queries ───────────────────────────────────────────

export function useDrafts() {
  return useQuery<EmailDraft[]>({
    queryKey: queryKeys.drafts(),
    queryFn: () => apiFetch<EmailDraft[]>("/api/emails/draft"),
  });
}

// ─── Calendar Queries ────────────────────────────────────────

export function useCalendarEvents(params?: {
  timeMin?: string;
  timeMax?: string;
  maxResults?: number;
  calendarId?: string;
}) {
  const searchParams = new URLSearchParams();
  if (params?.timeMin) searchParams.set("timeMin", params.timeMin);
  if (params?.timeMax) searchParams.set("timeMax", params.timeMax);
  if (params?.maxResults) searchParams.set("maxResults", String(params.maxResults));
  if (params?.calendarId) searchParams.set("calendarId", params.calendarId);

  const qs = searchParams.toString();
  const url = `/api/calendar/events${qs ? `?${qs}` : ""}`;

  return useQuery<CalendarEvent[]>({
    queryKey: queryKeys.calendarEvents(params as Record<string, string> | undefined),
    queryFn: () => apiFetch<CalendarEvent[]>(url),
  });
}

// ─── Mutations ───────────────────────────────────────────────

export function useSendEmail() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: {
      to: { name?: string; email: string }[];
      cc?: { name?: string; email: string }[];
      bcc?: { name?: string; email: string }[];
      subject: string;
      body: string;
      bodyHtml?: string;
      replyToEmailId?: string;
      threadId?: string;
    }) => apiFetch<Email>("/api/emails/send", { method: "POST", body: JSON.stringify(body) }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["emails"] });
    },
  });
}

export function useCreateDraft() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: {
      to?: { name?: string; email: string }[];
      cc?: { name?: string; email: string }[];
      bcc?: { name?: string; email: string }[];
      subject?: string;
      body?: string;
      bodyHtml?: string;
      replyToEmailId?: string;
    }) => apiFetch<EmailDraft>("/api/emails/draft", { method: "POST", body: JSON.stringify(body) }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.drafts() });
    },
  });
}

export function useDeleteDraft() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (draftId: string) =>
      apiFetch<{ success: boolean }>(`/api/emails/draft/${draftId}`, { method: "DELETE" }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.drafts() });
    },
  });
}

export function useSearchEmails() {
  return useMutation({
    mutationFn: (body: {
      query: string;
      useVectorSearch?: boolean;
      maxResults?: number;
    }) => apiFetch<Email[]>("/api/emails/search", { method: "POST", body: JSON.stringify(body) }),
  });
}

export function useAIChat() {
  return useMutation({
    mutationFn: (body: {
      message: string;
      conversationId?: string;
    }) =>
      apiFetch<{
        conversationId: string;
        response: string;
        toolsUsed?: string[];
      }>("/api/ai/chat", { method: "POST", body: JSON.stringify(body) }),
  });
}

export function useUpdateEmail() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...body }: { id: string; isRead?: boolean; isStarred?: boolean; archived?: boolean }) =>
      apiFetch<Email>(`/api/emails/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
    onSuccess: (data, variables) => {
      qc.invalidateQueries({ queryKey: ["emails"] });
      qc.invalidateQueries({ queryKey: ["email", variables.id] });
    },
  });
}

export function useDeleteEmail() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiFetch<{ success: boolean }>(`/api/emails/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["emails"] });
    },
  });
}

export function useCreateCalendarEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: any) =>
      apiFetch<CalendarEvent>("/api/calendar/events", { method: "POST", body: JSON.stringify(body) }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["calendarEvents"] });
    },
  });
}

export function useUpdateCalendarEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...body }: { id: string; [key: string]: any }) =>
      apiFetch<CalendarEvent>(`/api/calendar/events/${id}`, { method: "PUT", body: JSON.stringify(body) }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["calendarEvents"] });
    },
  });
}

export function useDeleteCalendarEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, calendarId = "primary" }: { id: string; calendarId?: string }) =>
      apiFetch<{ success: boolean }>(`/api/calendar/events/${id}?calendarId=${calendarId}`, { method: "DELETE" }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["calendarEvents"] });
    },
  });
}

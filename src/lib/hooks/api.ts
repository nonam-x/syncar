import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Email, EmailDraft, CalendarEvent } from "@/types";

// Helper to fetch JSON from API
async function fetchJson(url: string, options?: RequestInit) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
  }
  return res.json();
}

export function useEmails(options?: { labelIds?: string[]; priority?: string; maxResults?: number }) {
  return useQuery<Email[]>({
    queryKey: ["emails", options],
    queryFn: () => {
      const searchParams = new URLSearchParams();
      if (options?.labelIds && options.labelIds.length > 0) {
        searchParams.set("labelIds", options.labelIds.join(","));
      }
      if (options?.priority) {
        searchParams.set("priority", options.priority);
      }
      if (options?.maxResults) {
        searchParams.set("maxResults", String(options.maxResults));
      }
      return fetchJson(`/api/emails?${searchParams.toString()}`);
    },
  });
}

export function useEmail(id?: string | null) {
  return useQuery<Email>({
    queryKey: ["email", id],
    queryFn: () => fetchJson(`/api/emails/${id}`),
    enabled: !!id,
  });
}

export function useSendEmail() {
  const queryClient = useQueryClient();
  return useMutation<Email, Error, { to: { email: string }[]; subject: string; body: string }>({
    mutationFn: (body) =>
      fetchJson("/api/emails/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["emails"] });
    },
  });
}

export function useSearchEmails() {
  return useMutation<Email[], Error, { query: string }>({
    mutationFn: (body) =>
      fetchJson("/api/emails/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
  });
}

export function useDrafts() {
  return useQuery<EmailDraft[]>({
    queryKey: ["drafts"],
    queryFn: () => fetchJson("/api/emails/draft"),
  });
}

export function useDeleteDraft() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: (id: string) =>
      fetchJson(`/api/emails/draft/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drafts"] });
    },
  });
}

export function useCalendarEvents(options?: { timeMin?: string; timeMax?: string }) {
  return useQuery<CalendarEvent[]>({
    queryKey: ["calendarEvents", options],
    queryFn: () => {
      const searchParams = new URLSearchParams();
      if (options?.timeMin) searchParams.set("timeMin", options.timeMin);
      if (options?.timeMax) searchParams.set("timeMax", options.timeMax);
      return fetchJson(`/api/calendar/events?${searchParams.toString()}`);
    },
  });
}

export function useCreateCalendarEvent() {
  const queryClient = useQueryClient();
  return useMutation<CalendarEvent, Error, any>({
    mutationFn: (body) =>
      fetchJson("/api/calendar/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["calendarEvents"] });
    },
  });
}

export function useUpdateCalendarEvent() {
  const queryClient = useQueryClient();
  return useMutation<CalendarEvent, Error, { id: string } & any>({
    mutationFn: ({ id, ...body }) =>
      fetchJson(`/api/calendar/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["calendarEvents"] });
    },
  });
}

export function useDeleteCalendarEvent() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, { id: string; calendarId: string }>({
    mutationFn: ({ id, calendarId }) =>
      fetchJson(`/api/calendar/events/${id}?calendarId=${encodeURIComponent(calendarId)}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["calendarEvents"] });
    },
  });
}

export function useAIChat() {
  return useMutation<{ response: string; toolsUsed?: string[]; conversationId: string }, Error, { message: string; conversationId?: string }>({
    mutationFn: async (body) => {
      // 1. Send POST request to enqueue the chat run
      const enqueueRes = await fetchJson("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const { conversationId, assistantMessageId } = enqueueRes;

      // 2. Poll the GET endpoint until the message is resolved
      const pollInterval = 1500; // 1.5s
      const maxRetries = 160; // 4 minutes max
      
      for (let i = 0; i < maxRetries; i++) {
        await new Promise((resolve) => setTimeout(resolve, pollInterval));

        const getRes = await fetchJson(`/api/ai/chat?conversationId=${conversationId}`);
        const messages = getRes.messages || [];
        const assistantMsg = messages.find((m: any) => m.id === assistantMessageId);

        if (assistantMsg) {
          if (assistantMsg.status === "completed") {
            return {
              response: assistantMsg.content,
              toolsUsed: assistantMsg.toolCalls ? assistantMsg.toolCalls.map((t: any) => t.name) : [],
              conversationId,
            };
          } else if (assistantMsg.status === "failed") {
            throw new Error(assistantMsg.content || "AI generation failed");
          } else if (assistantMsg.status === "cancelled") {
            throw new Error("AI generation cancelled by user");
          }
        }
      }

      throw new Error("AI generation timed out");
    },
  });
}
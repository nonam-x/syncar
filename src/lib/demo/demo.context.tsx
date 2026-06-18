"use client";

import React, { createContext, useContext } from "react";
import { MOCK_EMAILS, MOCK_DRAFTS } from "@/lib/mock/emails.mock";
import { MOCK_CALENDAR_EVENTS } from "@/lib/mock/calendar.mock";
import type { Email, EmailDraft, CalendarEvent } from "@/types";

// ---------------------------------------------------------------------------
// Mock Tasks (lightweight — no real task model in the app yet)
// ---------------------------------------------------------------------------
export interface MockTask {
  id: string;
  title: string;
  done: boolean;
  priority: "HIGH" | "MEDIUM" | "LOW";
  dueLabel: string;
}

export const MOCK_TASKS: MockTask[] = [
  { id: "task_001", title: "Review Q3 partnership proposal (Stripe)", done: false, priority: "HIGH", dueLabel: "Today" },
  { id: "task_002", title: "Investigate SYN-2847 production bug", done: false, priority: "HIGH", dueLabel: "Today" },
  { id: "task_003", title: "Reply to Jordan Kim — Raycast collaboration", done: false, priority: "MEDIUM", dueLabel: "Tomorrow" },
  { id: "task_004", title: "Prep agenda for Q3 All Hands", done: true, priority: "MEDIUM", dueLabel: "Done" },
  { id: "task_005", title: "Merge PR #47 — AI chat streaming", done: false, priority: "LOW", dueLabel: "This week" },
];

// ---------------------------------------------------------------------------
// Demo Context
// ---------------------------------------------------------------------------
interface DemoContextValue {
  isDemo: true;
  emails: Email[];
  drafts: EmailDraft[];
  calendarEvents: CalendarEvent[];
  tasks: MockTask[];
  /** Stub for any destructive mutation — shows a toast instead */
  disabledAction: (label: string) => void;
}

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const disabledAction = (label: string) => {
    // In demo mode all writes are blocked — individual pages surface the reason
    console.info(`[Demo] "${label}" is disabled in demo mode.`);
  };

  return (
    <DemoContext.Provider
      value={{
        isDemo: true,
        emails: MOCK_EMAILS,
        drafts: MOCK_DRAFTS,
        calendarEvents: MOCK_CALENDAR_EVENTS,
        tasks: MOCK_TASKS,
        disabledAction,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}

export function useDemoMode(): DemoContextValue {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemoMode must be used inside <DemoProvider>");
  return ctx;
}

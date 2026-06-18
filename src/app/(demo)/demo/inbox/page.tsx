"use client";

import { EmailList } from "@/components/email/EmailList";
import { EmailDetail } from "@/components/email/EmailDetail";
import { useUIStore } from "@/lib/store/ui.store";
import { useDemoMode } from "@/lib/demo/demo.context";
import type { Email } from "@/types";

export default function DemoInboxPage() {
  const { selectedEmailId } = useUIStore();
  const { emails } = useDemoMode();

  const unreadCount = emails.filter((e: Email) => !e.isRead).length;
  const selectedEmail = emails.find((e) => e.id === selectedEmailId) ?? null;

  return (
    <div className="flex flex-col h-full">
      {/* Page heading row */}
      <div
        className="flex items-center h-14 px-5 flex-shrink-0 gap-2"
        style={{ background: "var(--surface-1)", borderBottom: "1px solid var(--border)" }}
      >
        <h1 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
          Inbox
        </h1>
        <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>
          · {unreadCount} unread messages
        </p>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Email detail panel */}
        <div
          className="flex-1 min-w-0 overflow-hidden"
          style={{ background: "var(--surface-0)", borderRight: "1px solid var(--border)" }}
        >
          <EmailDetail email={selectedEmail} />
        </div>

        {/* Email list panel */}
        <div
          className="flex flex-col flex-shrink-0"
          style={{ width: "340px", background: "var(--surface-1)" }}
        >
          <EmailList emails={emails} isLoading={false} />
        </div>
      </div>
    </div>
  );
}

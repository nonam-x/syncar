"use client";

import { TopNav } from "@/components/layout/TopNav";
import { EmailList } from "@/components/email/EmailList";
import { EmailDetail } from "@/components/email/EmailDetail";
import { useUIStore } from "@/lib/store/ui.store";
import { useEmails, useEmail } from "@/lib/hooks/api";
import { ErrorState } from "@/components/ui/ErrorState";
import type { Email } from "@/types";

export default function PriorityPage() {
  const { selectedEmailId } = useUIStore();
  const { data: emails = [], isLoading, error } = useEmails({ priority: "HIGH" });
  const { data: selectedEmail } = useEmail(selectedEmailId);

  return (
    <div className="flex flex-col h-full">
      <TopNav
        title="Priority"
        subtitle={
          isLoading
            ? "Loading…"
            : `${emails.filter((e: Email) => !e.isRead).length} unread high-priority emails`
        }
      />
      <div className="flex flex-1 min-h-0">
        {/* Email detail panel */}
        <div className="flex-1 min-w-0 overflow-hidden" style={{ background: "var(--surface-0)", borderRight: "1px solid var(--border)" }}>
          <EmailDetail email={selectedEmail ?? null} />
        </div>

        {/* Email list panel */}
        <div
          className="flex flex-col"
          style={{ width: "340px", flexShrink: 0, background: "var(--surface-1)" }}
        >
          {error ? (
            <ErrorState message={(error as Error).message} />
          ) : (
            <EmailList emails={emails} isLoading={isLoading} />
          )}
        </div>
      </div>
    </div>
  );
}

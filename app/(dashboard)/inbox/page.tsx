"use client";

import { TopNav } from "@/components/layout/TopNav";
import { EmailList } from "@/components/email/EmailList";
import { EmailDetail } from "@/components/email/EmailDetail";
import { useUIStore } from "@/lib/store/ui.store";
import { useEmails, useEmail } from "@/lib/hooks/api";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { motion } from "framer-motion";
import type { Email } from "@/types";

export default function InboxPage() {
  const { selectedEmailId } = useUIStore();
  const { data: emails = [], isLoading, error } = useEmails();
  const { data: selectedEmail } = useEmail(selectedEmailId);
  const unreadCount = emails.filter((e: Email) => !e.isRead).length;

  return (
    <div className="flex flex-col h-full">
      <TopNav
        title="Inbox"
        subtitle={
          isLoading
            ? "Loading…"
            : `${unreadCount} unread · ${emails.length} total`
        }
      />
      <div className="flex flex-1 min-h-0">
        {/* Email detail panel */}
        <motion.div
          className="flex-1 min-w-0 overflow-hidden"
          style={{ background: "var(--surface-0)", borderRight: "1px solid var(--border)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <EmailDetail email={selectedEmail ?? null} />
        </motion.div>

        {/* Email list panel */}
        <div
          className="flex flex-col"
          style={{
            width: "340px",
            flexShrink: 0,
            background: "var(--surface-1)",
          }}
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

"use client";

import { TopNav } from "@/components/layout/TopNav";
import { EmailList } from "@/components/email/EmailList";
import { EmailDetail } from "@/components/email/EmailDetail";
import { useUIStore } from "@/lib/store/ui.store";
import { useEmails, useEmail } from "@/lib/hooks/api";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

export default function SentPage() {
  const { setComposerOpen, selectedEmailId } = useUIStore();
  const { data: emails = [], isLoading, error } = useEmails({ labelIds: ["SENT"] });
  const { data: selectedEmail } = useEmail(selectedEmailId);

  return (
    <div className="flex flex-col h-full">
      <TopNav
        title="Sent"
        subtitle={isLoading ? "Loading…" : `${emails.length} sent messages`}
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
          ) : emails.length === 0 && !isLoading ? (
            <EmptyState
              icon={<Send className="w-8 h-8" />}
              title="No sent messages yet"
              description="Emails you send will appear here"
              action={
                <button
                  onClick={() => setComposerOpen(true)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white"
                  style={{ background: "var(--accent)" }}
                >
                  Compose
                </button>
              }
            />
          ) : (
            <EmailList emails={emails} isLoading={isLoading} />
          )}
        </div>
      </div>
    </div>
  );
}

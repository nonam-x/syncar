"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Email } from "@/types";
import { useUIStore } from "@/lib/store/ui.store";
import { PriorityBadge } from "./PriorityBadge";
import {
  Reply, Forward, Star, Archive, Trash2, MoreHorizontal,
  Paperclip, X, Zap, Bot
} from "lucide-react";
import { cn, formatDate, formatTime, getInitials, formatFileSize } from "@/lib/utils";
import { EmptyState } from "@/components/ui/EmptyState";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { useUpdateEmail, useDeleteEmail } from "@/lib/hooks/api";
import { useEffect, useState } from "react";

interface EmailDetailProps {
  email: Email | null;
}

export function EmailDetail({ email }: EmailDetailProps) {
  const { setComposerOpen } = useUIStore();
  const updateEmail = useUpdateEmail();
  const deleteEmail = useDeleteEmail();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Auto-mark email as read when opened
  useEffect(() => {
    if (email && !email.isRead) {
      updateEmail.mutate({ id: email.id, isRead: true });
    }
  }, [email, updateEmail]);

  if (!email) {
    return (
      <EmptyState
        icon="logo"
        title="Select an email"
        description="Choose an email from the list to read it here"
      />
    );
  }

  return (
    <motion.div
      key={email.id}
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col h-full"
    >
      {/* Email Header */}
      <div
        className="px-6 py-4 flex-shrink-0"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <h2 className="text-base font-semibold leading-snug flex-1" style={{ color: "var(--foreground)" }}>
            {email.subject}
          </h2>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <PriorityBadge priority={email.priority} />
          </div>
        </div>

        {/* Sender info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold text-white flex-shrink-0"
              style={{ background: "var(--accent)" }}
            >
              {getInitials(email.from.name, email.from.email)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                  {email.from.name || email.from.email}
                </span>
                <span className="text-xs" style={{ color: "var(--foreground-muted)" }}>
                  &lt;{email.from.email}&gt;
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs mt-0.5" style={{ color: "var(--foreground-muted)" }}>
                <span>To: {email.to.map((r) => r.name || r.email).join(", ")}</span>
                <span>·</span>
                <span>{formatDate(email.receivedAt)} at {formatTime(email.receivedAt)}</span>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="flex items-center gap-1">
            {[
              {
                icon: Star,
                title: email.isStarred ? "Unstar" : "Star",
                onClick: () => updateEmail.mutate({ id: email.id, isStarred: !email.isStarred }),
                style: email.isStarred ? { color: "var(--warning)" } : {}
              },
              {
                icon: Archive,
                title: "Archive",
                onClick: () => updateEmail.mutate({ id: email.id, archived: true }),
                style: {}
              },
              {
                icon: Trash2,
                title: "Delete",
                onClick: () => setShowDeleteConfirm(true),
                style: {}
              },
              {
                icon: MoreHorizontal,
                title: email.isRead ? "Mark as unread" : "Mark as read",
                onClick: () => updateEmail.mutate({ id: email.id, isRead: !email.isRead }),
                style: {}
              },
            ].map(({ icon: Icon, title, onClick, style }) => (
              <button
                key={title}
                onClick={onClick}
                title={title}
                className="p-1.5 rounded-lg transition-all hover:opacity-80"
                style={{
                  color: "var(--foreground-muted)",
                  background: "transparent",
                  ...style
                }}
              >
                <Icon className="w-4 h-4" style={Icon === Star && email.isStarred ? { fill: "var(--warning)" } : {}} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Email Body */}
      <div className="flex-1 overflow-y-auto px-6 py-5">
        {email.bodyHtml ? (
          <div
            className="prose prose-invert max-w-none text-sm leading-relaxed"
            style={{ color: "var(--foreground)" }}
            dangerouslySetInnerHTML={{ __html: email.bodyHtml }}
          />
        ) : (
          <pre
            className="text-sm leading-relaxed whitespace-pre-wrap font-sans"
            style={{ color: "var(--foreground)" }}
          >
            {email.body}
          </pre>
        )}

        {/* Attachments */}
        {email.attachments.length > 0 && (
          <div className="mt-6">
            <p className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: "var(--foreground-subtle)" }}>
              Attachments ({email.attachments.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {email.attachments.map((att) => (
                <div
                  key={att.id}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:opacity-80 transition-all"
                  style={{
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <Paperclip className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "var(--accent)" }} />
                  <div>
                    <p className="text-xs font-medium" style={{ color: "var(--foreground)" }}>
                      {att.filename}
                    </p>
                    <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>
                      {formatFileSize(att.size)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Reply Actions */}
      <div
        className="px-6 py-4 flex-shrink-0 flex items-center gap-2"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setComposerOpen(true, {
            to: email.from.email,
            subject: email.subject.toLowerCase().startsWith("re:") ? email.subject : `Re: ${email.subject}`,
            threadId: email.threadId || email.id
          })}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all"
          style={{ background: "var(--accent)" }}
        >
          <Reply className="w-3.5 h-3.5" />
          Reply
        </motion.button>
        <button
          onClick={() => setComposerOpen(true, {
            subject: email.subject.toLowerCase().startsWith("fwd:") ? email.subject : `Fwd: ${email.subject}`,
            body: `\n\n---------- Forwarded message ---------\nFrom: ${email.from.name || ""} <${email.from.email}>\nDate: ${new Date(email.receivedAt).toLocaleString()}\nSubject: ${email.subject}\nTo: ${email.to.map(t => t.email).join(", ")}\n\n${email.body}`
          })}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-80"
          style={{
            background: "var(--surface-2)",
            color: "var(--foreground)",
            border: "1px solid var(--border)",
          }}
        >
          <Forward className="w-3.5 h-3.5" />
          Forward
        </button>
        <button
          onClick={() => setComposerOpen(true, {
            to: email.from.email,
            subject: email.subject.toLowerCase().startsWith("re:") ? email.subject : `Re: ${email.subject}`,
            threadId: email.threadId || email.id,
            body: "AI_GENERATING"
          })}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-80 ml-auto"
          style={{
            background: "var(--accent-muted)",
            color: "var(--accent)",
            border: "1px solid var(--border)",
          }}
        >
          <Bot className="w-3.5 h-3.5" />
          AI Reply
        </button>
      </div>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={() => {
          deleteEmail.mutate(email.id);
          setShowDeleteConfirm(false);
        }}
        title="Delete Email"
        description="Are you sure you want to delete this email? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        isLoading={deleteEmail.isPending}
      />
    </motion.div>
  );
}

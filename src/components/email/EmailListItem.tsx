"use client";

import { motion } from "framer-motion";
import type { Email } from "@/types";
import { useUIStore } from "@/lib/store/ui.store";
import { PriorityDot } from "./PriorityBadge";
import { Star, Paperclip } from "lucide-react";
import { cn, formatRelativeTime, getInitials } from "@/lib/utils";

interface EmailListItemProps {
  email: Email;
  isSelected?: boolean;
}

export function EmailListItem({ email, isSelected }: EmailListItemProps) {
  const { setSelectedEmailId } = useUIStore();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      onClick={() => setSelectedEmailId(email.id)}
      className={cn(
        "email-item flex items-start gap-3 px-4 py-3 border-b cursor-pointer group relative",
        isSelected && "active"
      )}
      style={{ borderColor: "var(--border-subtle)" }}
    >
      {/* Unread indicator */}
      {!email.isRead && (
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-full"
          style={{ background: "var(--accent)" }}
        />
      )}

      {/* Avatar */}
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
        style={{ background: "var(--surface-3)", color: "var(--foreground-muted)" }}
      >
        {getInitials(email.from.name, email.from.email)}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2 mb-0.5">
          <span
            className={cn("text-sm truncate", !email.isRead ? "font-semibold" : "font-medium")}
            style={{ color: "var(--foreground)" }}
          >
            {email.from.name || email.from.email}
          </span>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {email.attachments.length > 0 && (
              <Paperclip className="w-3 h-3" style={{ color: "var(--foreground-subtle)" }} />
            )}
            <span className="text-xs" style={{ color: "var(--foreground-muted)" }}>
              {formatRelativeTime(email.receivedAt)}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-1.5 mb-1">
          <PriorityDot priority={email.priority} />
          <p
            className={cn("text-xs truncate flex-1", !email.isRead ? "font-medium" : "")}
            style={{ color: !email.isRead ? "var(--foreground)" : "var(--foreground-muted)" }}
          >
            {email.subject}
          </p>
          {email.isStarred && (
            <Star className="w-3 h-3 fill-current flex-shrink-0" style={{ color: "var(--warning)" }} />
          )}
        </div>

        <p className="text-xs truncate" style={{ color: "var(--foreground-subtle)" }}>
          {email.snippet}
        </p>
      </div>
    </motion.div>
  );
}

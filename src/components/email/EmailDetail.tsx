"use client";

import { useUIStore } from "@/lib/store/ui.store";
import type { Email } from "@/types";
import { PriorityBadge } from "./PriorityBadge";
import { formatRelativeTime, getInitials } from "@/lib/utils";
import { Paperclip, Mail, Bot, Star, ArrowLeft, ArrowUpRight, MessageSquareCode } from "lucide-react";
import { motion } from "framer-motion";

interface EmailDetailProps {
  email: Email | null;
}

export function EmailDetail({ email }: EmailDetailProps) {
  const { setComposerOpen, setSelectedEmailId } = useUIStore();

  if (!email) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <div 
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
          style={{ background: "var(--surface-1)", border: "1px solid var(--border)" }}
        >
          <Mail className="w-6 h-6 opacity-40" style={{ color: "var(--accent)" }} />
        </div>
        <h3 className="text-base font-bold mb-1" style={{ color: "var(--foreground)" }}>
          No conversation selected
        </h3>
        <p className="text-xs max-w-xs" style={{ color: "var(--foreground-muted)" }}>
          Select an email from the list to view its contents, attachments, and AI insights.
        </p>
      </div>
    );
  }

  // Format file size helper
  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleQuickReply = () => {
    const subjectPrefix = email.subject.toLowerCase().startsWith("re:") ? "" : "Re: ";
    setComposerOpen(true, {
      to: email.from.email,
      subject: `${subjectPrefix}${email.subject}`,
      body: "AI_GENERATING",
      threadId: email.threadId,
    });
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Mobile back trigger */}
      <div 
        className="md:hidden flex items-center gap-2 p-3 border-b flex-shrink-0"
        style={{ borderColor: "var(--border)", background: "var(--surface-1)" }}
      >
        <button 
          onClick={() => setSelectedEmailId(null)}
          className="p-1 rounded-md hover:bg-surface-2 transition-all flex items-center gap-1 text-xs"
          style={{ color: "var(--foreground-muted)" }}
        >
          <ArrowLeft className="w-4 h-4" /> Back to Inbox
        </button>
      </div>

      {/* Main header block */}
      <div 
        className="p-6 border-b flex-shrink-0" 
        style={{ borderColor: "var(--border)", background: "var(--surface-1)" }}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 
              className="text-xl font-bold tracking-tight" 
              style={{ color: "var(--foreground)", fontFamily: "var(--font-geist)" }}
            >
              {email.subject || "(No Subject)"}
            </h1>
            <PriorityBadge priority={email.priority} />
            {email.isStarred && (
              <Star className="w-4 h-4 fill-current" style={{ color: "var(--warning)" }} />
            )}
          </div>
          <span className="text-xs font-mono flex-shrink-0" style={{ color: "var(--foreground-muted)" }}>
            {formatRelativeTime(email.receivedAt)}
          </span>
        </div>

        {/* Sender details */}
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
            style={{ background: "var(--surface-3)", color: "var(--foreground-muted)" }}
          >
            {getInitials(email.from.name, email.from.email)}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
              {email.from.name || email.from.email}
            </p>
            <p className="text-xs truncate" style={{ color: "var(--foreground-muted)" }}>
              from: {email.from.email}
            </p>
            {email.to && email.to.length > 0 && (
              <p className="text-[11px] truncate" style={{ color: "var(--foreground-subtle)" }}>
                to: {email.to.map((r) => r.name || r.email).join(", ")}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Scrollable Email Body Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* AI Insight Box if Reasoning is available */}
        {email.reasoning && (
          <motion.div 
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl border flex gap-3 text-xs text-left"
            style={{ 
              background: "var(--accent-muted)", 
              borderColor: "var(--border)",
            }}
          >
            <Bot className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
            <div>
              <span className="font-bold flex items-center gap-1" style={{ color: "var(--foreground)" }}>
                AI Classification Insight 
                {email.confidence !== undefined && (
                  <span className="text-[10px] font-mono font-medium opacity-70">
                    ({Math.round(email.confidence * 100)}% confidence)
                  </span>
                )}
              </span>
              <p className="mt-1 leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
                {email.reasoning}
              </p>
            </div>
          </motion.div>
        )}

        {/* Email content body */}
        <div className="email-body-content min-h-[150px]">
          {email.bodyHtml ? (
            <div 
              className="text-sm overflow-x-auto leading-relaxed"
              style={{ color: "var(--foreground)" }}
              dangerouslySetInnerHTML={{ __html: email.bodyHtml }}
            />
          ) : (
            <pre 
              className="whitespace-pre-wrap font-sans text-sm leading-relaxed"
              style={{ color: "var(--foreground)" }}
            >
              {email.body}
            </pre>
          )}
        </div>

        {/* Attachments panel */}
        {email.attachments && email.attachments.length > 0 && (
          <div className="border-t pt-5" style={{ borderColor: "var(--border)" }}>
            <h4 className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5" style={{ color: "var(--foreground-muted)" }}>
              <Paperclip className="w-3.5 h-3.5" /> Attachments ({email.attachments.length})
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {email.attachments.map((file) => (
                <div 
                  key={file.id} 
                  className="flex items-center justify-between p-3 rounded-lg border text-xs"
                  style={{ background: "var(--surface-1)", borderColor: "var(--border)" }}
                >
                  <div className="min-w-0 pr-3">
                    <p className="font-semibold truncate" style={{ color: "var(--foreground)" }}>
                      {file.filename}
                    </p>
                    <p style={{ color: "var(--foreground-subtle)" }}>
                      {formatSize(file.size)} · {file.mimeType}
                    </p>
                  </div>
                  <button 
                    onClick={() => alert(`Mock download triggered for: ${file.filename}`)}
                    className="p-1.5 rounded-md hover:bg-surface-2 transition-all"
                    style={{ color: "var(--accent)" }}
                    title="Download attachment"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick AI reply suggestion dock */}
      <div 
        className="p-4 border-t flex items-center justify-between gap-4 flex-shrink-0"
        style={{ borderColor: "var(--border)", background: "var(--surface-1)" }}
      >
        <div className="flex items-center gap-2 text-xs" style={{ color: "var(--foreground-muted)" }}>
          <MessageSquareCode className="w-4 h-4" style={{ color: "var(--accent)" }} />
          <span className="hidden sm:inline">Context-aware tools:</span>
        </div>
        <button 
          onClick={handleQuickReply}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90"
          style={{ background: "var(--accent)" }}
        >
          <Bot className="w-3.5 h-3.5" /> Draft AI Response
        </button>
      </div>
    </div>
  );
}
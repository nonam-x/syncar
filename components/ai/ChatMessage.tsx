"use client";

import { motion } from "framer-motion";
import type { MockChatMessage } from "@/lib/mock/ai.mock";
import { Bot, User, Zap } from "lucide-react";
import { cn, formatRelativeTime } from "@/lib/utils";

interface ChatMessageProps {
  message: MockChatMessage;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn("flex gap-3 mb-5", isUser ? "flex-row-reverse" : "flex-row")}
    >
      {/* Avatar */}
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{
          background: isUser ? "var(--accent)" : "var(--surface-3)",
          border: "1px solid var(--border)",
        }}
      >
        {isUser ? (
          <User className="w-3.5 h-3.5 text-white" />
        ) : (
          <Bot className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
        )}
      </div>

      <div className={cn("flex flex-col gap-1 max-w-[80%]", isUser && "items-end")}>
        {/* Tool usage indicator */}
        {message.toolsUsed && message.toolsUsed.length > 0 && (
          <div
            className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs mb-1"
            style={{ background: "var(--accent-muted)", color: "var(--accent)" }}
          >
            <Zap className="w-3 h-3" />
            <span>Used: {message.toolsUsed.join(", ")}</span>
          </div>
        )}

        {/* Message bubble */}
        <div
          className="px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed"
          style={{
            background: isUser ? "var(--accent)" : "var(--surface-2)",
            color: isUser ? "white" : "var(--foreground)",
            border: isUser ? "none" : "1px solid var(--border)",
            borderTopRightRadius: isUser ? "4px" : "16px",
            borderTopLeftRadius: isUser ? "16px" : "4px",
          }}
        >
          {/* Simple markdown: bold */}
          <p
            className="whitespace-pre-wrap"
            dangerouslySetInnerHTML={{
              __html: message.content
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                .replace(/\n/g, "<br/>"),
            }}
          />
        </div>

        <span className="text-xs px-1" style={{ color: "var(--foreground-subtle)" }}>
          {formatRelativeTime(message.createdAt)}
        </span>
      </div>
    </motion.div>
  );
}

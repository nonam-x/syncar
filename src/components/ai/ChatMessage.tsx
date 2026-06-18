"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, Zap, AlertCircle, XCircle } from "lucide-react";
import { cn, formatRelativeTime } from "@/lib/utils";

const THINKING_STEPS = [
  "Analyzing your request...",
  "Searching your inbox...",
  "Reading email threads...",
  "Checking your calendar...",
  "Processing workspace context...",
  "Running AI tools...",
  "Synthesizing results...",
  "Preparing your response...",
];

function ThinkingIndicator() {
  const [stepIndex, setStepIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setStepIndex((i) => (i + 1) % THINKING_STEPS.length);
        setVisible(true);
      }, 300);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 mb-2">
      {/* Animated dots */}
      <div className="flex items-center gap-0.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full animate-bounce"
            style={{
              background: "var(--accent)",
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
      <AnimatePresence mode="wait">
        {visible && (
          <motion.span
            key={stepIndex}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="text-xs font-medium"
            style={{ color: "var(--accent)" }}
          >
            {THINKING_STEPS[stepIndex]}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

// Sub-component to typewrite the message content smoothly on the fly
function Typewriter({ text, speed = 4, onComplete }: { text: string; speed?: number; onComplete?: () => void }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let index = 0;
    setDisplayed("");
    
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayed((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(interval);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  const formattedHtml = displayed
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br/>");

  return (
    <p
      className="whitespace-pre-wrap text-sm"
      dangerouslySetInnerHTML={{ __html: formattedHtml }}
    />
  );
}

interface ChatMessageProps {
  message: {
    id: string;
    role: "user" | "assistant";
    content: string;
    toolsUsed?: string[];
    createdAt: Date;
    status?: "pending" | "completed" | "failed" | "cancelled";
  };
  onCancel?: (messageId: string) => void;
  isLatest?: boolean;
}

export function ChatMessage({ message, onCancel, isLatest = false }: ChatMessageProps) {
  const isUser = message.role === "user";
  const [isTypingComplete, setIsTypingComplete] = useState(!isLatest || isUser || message.status !== "completed");

  const isPending = message.status === "pending";
  const isFailed = message.status === "failed";
  const isCancelled = message.status === "cancelled";

  // If the message text changes or updates, keep complete states synced
  useEffect(() => {
    if (message.status !== "completed") {
      setIsTypingComplete(true);
    }
  }, [message.status]);

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
            className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs mb-1 w-fit"
            style={{ background: "var(--accent-muted)", color: "var(--accent)" }}
          >
            <Zap className="w-3 h-3 animate-pulse" />
            <span>Used: {message.toolsUsed.join(", ")}</span>
          </div>
        )}

        {/* Message bubble */}
        <div
          className={cn(
            "px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed relative group",
            isPending && "animate-pulse"
          )}
          style={{
            background: isUser 
              ? "var(--accent)" 
              : isFailed 
              ? "rgba(239, 68, 68, 0.05)" 
              : isCancelled 
              ? "var(--surface-1)" 
              : "var(--surface-2)",
            color: isUser ? "white" : isFailed ? "var(--error)" : "var(--foreground)",
            border: isUser 
              ? "none" 
              : isFailed 
              ? "1px solid rgba(239, 68, 68, 0.2)" 
              : isCancelled 
              ? "1px dashed var(--border)"
              : "1px solid var(--border)",
            borderTopRightRadius: isUser ? "4px" : "16px",
            borderTopLeftRadius: isUser ? "16px" : "4px",
          }}
        >
          {isPending && <ThinkingIndicator />}

          {isFailed && (
            <div className="flex items-center gap-1.5 mb-1.5 text-xs font-semibold text-red-500">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Failed to generate response</span>
            </div>
          )}

          {isCancelled && (
            <div className="flex items-center gap-1.5 mb-1.5 text-xs font-semibold text-zinc-500">
              <XCircle className="w-3.5 h-3.5" />
              <span>Run cancelled by user</span>
            </div>
          )}

          {/* Message Content */}
          {!isTypingComplete && message.status === "completed" ? (
            <Typewriter 
              text={message.content} 
              onComplete={() => setIsTypingComplete(true)} 
            />
          ) : (
            <p
              className="whitespace-pre-wrap"
              dangerouslySetInnerHTML={{
                __html: message.content
                  .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                  .replace(/\n/g, "<br/>"),
              }}
            />
          )}

          {/* Action Overlay: Cancel Active Run */}
          {isPending && onCancel && (
            <button
              onClick={() => onCancel(message.id)}
              className="absolute -right-12 top-1/2 -translate-y-1/2 p-2 rounded-full border shadow-sm transition-all hover:bg-red-50 hover:text-red-500 hover:scale-105 cursor-pointer bg-white"
              style={{ borderColor: "var(--border)", color: "var(--foreground-muted)" }}
              title="Cancel generation"
            >
              <XCircle className="w-4 h-4" />
            </button>
          )}
        </div>

        <span className="text-xs px-1" style={{ color: "var(--foreground-subtle)" }}>
          {formatRelativeTime(message.createdAt)}
        </span>
      </div>
    </motion.div>
  );
}

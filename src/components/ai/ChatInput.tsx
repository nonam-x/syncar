"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, ArrowUp, Sparkles } from "lucide-react";
import { AI_SUGGESTIONS } from "@/lib/mock/ai.mock";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export function ChatInput({ onSend, isLoading, placeholder }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 160) + "px";
    }
  }, [value]);

  const handleSend = () => {
    if (!value.trim() || isLoading) return;
    onSend(value.trim());
    setValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Suggestion chips (only when input is empty) */}
      <AnimatePresence>
        {!value && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="flex flex-wrap gap-1.5"
          >
            {AI_SUGGESTIONS.slice(0, 3).map((s) => (
              <button
                key={s}
                onClick={() => {
                  setValue(s);
                  textareaRef.current?.focus();
                }}
                className="text-xs px-2.5 py-1 rounded-full transition-all hover:opacity-80 flex items-center gap-1"
                style={{
                  background: "var(--surface-2)",
                  color: "var(--foreground-muted)",
                  border: "1px solid var(--border)",
                }}
              >
                <Sparkles className="w-2.5 h-2.5" style={{ color: "var(--accent)" }} />
                {s}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input area */}
      <div
        className="flex items-end gap-2 p-3 rounded-xl"
        style={{
          background: "var(--surface-2)",
          border: "1px solid var(--border-strong)",
        }}
      >
        <Bot className="w-4 h-4 flex-shrink-0 mb-1" style={{ color: "var(--accent)" }} />
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || "Ask your AI assistant anything..."}
          rows={1}
          className="flex-1 bg-transparent text-sm outline-none resize-none leading-relaxed"
          style={{ color: "var(--foreground)", maxHeight: "160px" }}
          disabled={isLoading}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSend}
          disabled={!value.trim() || isLoading}
          className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ background: "var(--accent)", color: "white" }}
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent"
            />
          ) : (
            <ArrowUp className="w-3.5 h-3.5" />
          )}
        </motion.button>
      </div>

      <p className="text-xs text-center" style={{ color: "var(--foreground-subtle)" }}>
        Enter to send · Shift+Enter for new line
      </p>
    </div>
  );
}

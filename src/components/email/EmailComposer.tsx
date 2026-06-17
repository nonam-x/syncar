"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/lib/store/ui.store";
import { useSendEmail, useAIChat } from "@/lib/hooks/api";
import { X, ChevronDown, Send, Bot, Minus, Maximize2 } from "lucide-react";

export function EmailComposer() {
  const { composerOpen, setComposerOpen, composerPreset } = useUIStore();
  const [minimized, setMinimized] = useState(false);
  const [to, setTo]           = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody]       = useState("");
  const [toFocused, setToFocused] = useState(false);
  const [subjectFocused, setSubjectFocused] = useState(false);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  // Protects against React Strict Mode double-render triggering multiple concurrent draft API calls
  const aiGeneratedRef = useRef<string | null>(null);

  const sendEmail = useSendEmail();
  const aiChat = useAIChat();

  const generateAIDraft = (recipient: string, sub: string) => {
    aiChat.mutate(
      {
        message: `Write a professional email response to ${recipient} with the subject "${sub}" as a follow-up reply. Make it concise and direct.`
      },
      {
        onSuccess: (data) => {
          setBody(data.response);
        },
        onError: (err) => {
          setBody(`Failed to generate AI response: ${err.message || String(err)}`);
        }
      }
    );
  };

  useEffect(() => {
    if (composerOpen && composerPreset) {
      setTo(composerPreset.to || "");
      setSubject(composerPreset.subject || "");
      if (composerPreset.body === "AI_GENERATING") {
        const presetKey = `${composerPreset.to || ""}_${composerPreset.subject || ""}`;
        if (aiGeneratedRef.current !== presetKey) {
          aiGeneratedRef.current = presetKey;
          setBody("Generating AI response...");
          generateAIDraft(composerPreset.to || "", composerPreset.subject || "");
        }
      } else {
        setBody(composerPreset.body || "");
      }
    } else if (composerOpen && !composerPreset) {
      setTo("");
      setSubject("");
      setBody("");
      aiGeneratedRef.current = null;
    } else if (!composerOpen) {
      aiGeneratedRef.current = null;
    }
  }, [composerOpen, composerPreset]);

  useEffect(() => {
    if (composerOpen && !minimized) {
      setTimeout(() => bodyRef.current?.focus(), 300);
    }
  }, [composerOpen, minimized]);

  const handleSend = () => {
    const recipients = to
      .split(",")
      .map((r) => r.trim())
      .filter(Boolean)
      .map((email) => ({ email }));

    sendEmail.mutate(
      {
        to: recipients,
        subject,
        body,
      },
      {
        onSuccess: () => {
          setComposerOpen(false);
          setTo("");
          setSubject("");
          setBody("");
        },
      }
    );
  };

  return (
    <AnimatePresence>
      {composerOpen && (
        <motion.div
          layout
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.96 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 right-4 z-40 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          style={{
            background: "var(--surface-2)",
            border: "1px solid var(--border-strong)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 flex-shrink-0 cursor-pointer"
            style={{ borderBottom: minimized ? "none" : "1px solid var(--border)" }}
            onClick={() => setMinimized(!minimized)}
          >
            <span className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
              {subject || "New Message"}
            </span>
            <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setMinimized(!minimized)}
                className="p-1 rounded hover:opacity-70 transition-all"
                style={{ color: "var(--foreground-muted)" }}
              >
                {minimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setComposerOpen(false)}
                className="p-1 rounded hover:opacity-70 transition-all"
                style={{ color: "var(--foreground-muted)" }}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {!minimized && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="flex flex-col overflow-hidden"
              >
                 {/* To */}
                <div
                  className="flex items-center gap-2 px-4 py-2.5 transition-colors"
                  style={{
                    borderBottom: "1px solid var(--border-subtle)",
                    background: toFocused ? "var(--surface-3)" : "transparent"
                  }}
                >
                  <span className="text-xs font-medium w-10 flex-shrink-0" style={{ color: "var(--foreground-muted)" }}>
                    To
                  </span>
                  <input
                    type="text"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    onFocus={() => setToFocused(true)}
                    onBlur={() => setToFocused(false)}
                    placeholder="recipient@example.com"
                    className="flex-1 bg-transparent text-sm outline-none borderless-focus"
                    style={{ color: "var(--foreground)" }}
                  />
                </div>

                {/* Subject */}
                <div
                  className="flex items-center gap-2 px-4 py-2.5 transition-colors"
                  style={{
                    borderBottom: "1px solid var(--border-subtle)",
                    background: subjectFocused ? "var(--surface-3)" : "transparent"
                  }}
                >
                  <span className="text-xs font-medium w-10 flex-shrink-0" style={{ color: "var(--foreground-muted)" }}>
                    Subj
                  </span>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    onFocus={() => setSubjectFocused(true)}
                    onBlur={() => setSubjectFocused(false)}
                    placeholder="Subject"
                    className="flex-1 bg-transparent text-sm outline-none borderless-focus"
                    style={{ color: "var(--foreground)" }}
                  />
                </div>

                {/* Body */}
                <textarea
                  ref={bodyRef}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Write your message..."
                  rows={8}
                  className="flex-1 bg-transparent px-4 py-3 text-sm outline-none resize-none borderless-focus"
                  style={{ color: "var(--foreground)", lineHeight: "1.6" }}
                />

                {/* Footer */}
                <div
                  className="flex items-center justify-between px-4 py-3 flex-shrink-0"
                  style={{ borderTop: "1px solid var(--border)" }}
                >
                  <button
                    onClick={() => {
                      if (!to) {
                        alert("Please specify a recipient first.");
                        return;
                      }
                      setBody("Generating AI draft...");
                      generateAIDraft(to, subject);
                    }}
                    disabled={aiChat.isPending}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80"
                    style={{
                      color: "var(--accent)",
                      background: "var(--accent-muted)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <Bot className="w-3.5 h-3.5" />
                    {aiChat.isPending ? "Generating..." : "AI Draft"}
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSend}
                    disabled={!to || !body || sendEmail.isPending}
                    className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ background: "var(--accent)" }}
                  >
                    <Send className="w-3.5 h-3.5" />
                    {sendEmail.isPending ? "Sending..." : "Send"}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

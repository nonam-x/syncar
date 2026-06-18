"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/lib/store/ui.store";
import { X, Send, Bot, Minus, Maximize2, CheckCircle } from "lucide-react";

/**
 * DemoEmailComposer — identical UX to the real EmailComposer.
 * On Send: closes the composer and shows a "Email sent!" toast.
 * No real API calls are made.
 */
export function DemoEmailComposer() {
  const { composerOpen, setComposerOpen, composerPreset } = useUIStore();
  const [minimized, setMinimized] = useState(false);
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [toFocused, setToFocused] = useState(false);
  const [subjectFocused, setSubjectFocused] = useState(false);
  const [sending, setSending] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync with composer preset (e.g. quick-reply from EmailDetail)
  useEffect(() => {
    if (composerOpen && composerPreset) {
      setTo(composerPreset.to || "");
      setSubject(composerPreset.subject || "");
      setBody(composerPreset.body === "AI_GENERATING"
        ? "Hi,\n\nThanks for reaching out. I'll get back to you shortly.\n\nBest regards,\nAlex"
        : composerPreset.body || "");
    } else if (composerOpen && !composerPreset) {
      setTo(""); setSubject(""); setBody("");
    }
  }, [composerOpen, composerPreset]);

  useEffect(() => {
    if (composerOpen && !minimized) {
      setTimeout(() => bodyRef.current?.focus(), 300);
    }
  }, [composerOpen, minimized]);

  // Cleanup timer on unmount
  useEffect(() => () => { if (toastTimer.current) clearTimeout(toastTimer.current); }, []);

  const handleSend = () => {
    if (!to.trim() || !body.trim() || sending) return;
    setSending(true);

    // Simulate brief network delay
    setTimeout(() => {
      setSending(false);
      setComposerOpen(false);
      setTo(""); setSubject(""); setBody("");

      // Show success toast
      setShowToast(true);
      if (toastTimer.current) clearTimeout(toastTimer.current);
      toastTimer.current = setTimeout(() => setShowToast(false), 3500);
    }, 800);
  };

  return (
    <>
      {/* ── Composer Modal ─────────────────────────────────────────── */}
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
                      background: toFocused ? "var(--surface-3)" : "transparent",
                    }}
                  >
                    <span className="text-xs font-medium w-10 flex-shrink-0" style={{ color: "var(--foreground-muted)" }}>To</span>
                    <input
                      type="text"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      onFocus={() => setToFocused(true)}
                      onBlur={() => setToFocused(false)}
                      placeholder="recipient@example.com"
                      className="flex-1 bg-transparent text-sm outline-none"
                      style={{ color: "var(--foreground)" }}
                    />
                  </div>

                  {/* Subject */}
                  <div
                    className="flex items-center gap-2 px-4 py-2.5 transition-colors"
                    style={{
                      borderBottom: "1px solid var(--border-subtle)",
                      background: subjectFocused ? "var(--surface-3)" : "transparent",
                    }}
                  >
                    <span className="text-xs font-medium w-10 flex-shrink-0" style={{ color: "var(--foreground-muted)" }}>Subj</span>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      onFocus={() => setSubjectFocused(true)}
                      onBlur={() => setSubjectFocused(false)}
                      placeholder="Subject"
                      className="flex-1 bg-transparent text-sm outline-none"
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
                    className="flex-1 bg-transparent px-4 py-3 text-sm outline-none resize-none"
                    style={{ color: "var(--foreground)", lineHeight: "1.6" }}
                  />

                  {/* Footer */}
                  <div
                    className="flex items-center justify-between px-4 py-3 flex-shrink-0"
                    style={{ borderTop: "1px solid var(--border)" }}
                  >
                    {/* Demo AI draft hint */}
                    <button
                      onClick={() => setBody("Hi,\n\nThanks for reaching out. I'll review and get back to you shortly.\n\nBest regards,\nAlex")}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80"
                      style={{
                        color: "var(--accent)",
                        background: "var(--accent-muted)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <Bot className="w-3.5 h-3.5" />
                      AI Draft
                    </button>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleSend}
                      disabled={!to.trim() || !body.trim() || sending}
                      className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ background: "var(--accent)" }}
                    >
                      {sending ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                            className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          Send
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── "Email sent!" success toast ─────────────────────────── */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl"
            style={{
              background: "var(--surface-1)",
              border: "1px solid var(--border)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            }}
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(16,185,129,0.12)" }}
            >
              <CheckCircle className="w-4 h-4 text-emerald-500" />
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Email sent!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

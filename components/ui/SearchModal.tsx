"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/lib/store/ui.store";
import { useSearchEmails, useEmails } from "@/lib/hooks/api";
import { Search, X, Mail, Clock } from "lucide-react";
import type { Email } from "@/types";
import { formatRelativeTime, getInitials } from "@/lib/utils";
import { PriorityDot } from "@/components/email/PriorityBadge";

export function SearchModal() {
  const { searchOpen, setSearchOpen, setSelectedEmailId } = useUIStore();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Email[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const { data: recentEmails = [] } = useEmails({ maxResults: 3 });
  const searchMutation = useSearchEmails();

  const search = useCallback((q: string) => {
    if (!q.trim()) { setResults([]); return; }
    searchMutation.mutate(
      { query: q },
      {
        onSuccess: (data) => {
          setResults(data.slice(0, 8));
        },
      }
    );
  }, [searchMutation]);

  useEffect(() => {
    const timer = setTimeout(() => search(query), 150);
    return () => clearTimeout(timer);
  }, [query, search]);

  const displayed = query ? results : recentEmails;

  // Reset selected index when query results change
  useEffect(() => {
    setActiveIndex(0);
  }, [query, results, recentEmails]);

  // Keyboard navigation & actions
  useEffect(() => {
    if (!searchOpen) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, displayed.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (displayed.length > 0 && activeIndex >= 0 && activeIndex < displayed.length) {
          handleSelect(displayed[activeIndex]);
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [searchOpen, displayed, activeIndex, setSearchOpen]);

  const handleSelect = (email: Email) => {
    setSelectedEmailId(email.id);
    setSearchOpen(false);
    setQuery("");
  };

  return (
    <AnimatePresence>
      {searchOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
            onClick={() => setSearchOpen(false)}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl flex flex-col"
              style={{
                background: "rgba(18, 20, 28, 0.85)",
                border: "1px solid var(--border)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 12px 48px rgba(0,0,0,0.4)",
              }}
            >
              {/* Search input */}
              <div
                className="flex items-center gap-3 px-4"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <Search className="w-4 h-4 flex-shrink-0" style={{ color: "var(--accent)" }} />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search emails, people, topics..."
                  className="flex-1 py-4 bg-transparent outline-none text-sm"
                  style={{ color: "var(--foreground)" }}
                />
                {query && (
                  <button onClick={() => setQuery("")} style={{ color: "var(--foreground-muted)" }}>
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
 
              {/* Results */}
              <div className="p-2 max-h-80 overflow-y-auto">
                {/* Label */}
                <p
                  className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--foreground-subtle)", fontFamily: "var(--font-mono)" }}
                >
                  {query ? `Results for "${query}"` : "Recent"}
                </p>
 
                {searchMutation.isPending && (
                  <div
                    className="py-8 text-center text-sm"
                    style={{ color: "var(--foreground-muted)" }}
                  >
                    Searching...
                  </div>
                )}
 
                {!searchMutation.isPending && displayed.length === 0 && query && (
                  <div
                    className="py-8 text-center text-sm"
                    style={{ color: "var(--foreground-muted)" }}
                  >
                    No emails found
                  </div>
                )}
 
                {!searchMutation.isPending && displayed.map((email, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <motion.button
                      key={email.id}
                      whileHover={{ x: 2 }}
                      onClick={() => handleSelect(email)}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={`w-full flex items-start gap-3 px-4 py-2.5 rounded-lg text-left transition-all relative ${
                        isActive ? "bg-surface-2" : "bg-transparent"
                      }`}
                      style={{
                        color: "var(--foreground)",
                        border: "none",
                      }}
                    >
                      {/* Left accent bar on hover/active */}
                      <div
                        className={`absolute left-0 top-1.5 bottom-1.5 w-[3px] bg-accent rounded-r transition-all duration-150 ${
                          isActive ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0 mt-0.5"
                        style={{ background: "var(--accent)" }}
                      >
                        {getInitials(email.from.name, email.from.email)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <PriorityDot priority={email.priority} />
                          <span className="text-sm font-medium truncate" style={{ fontFamily: "var(--font-hanken)" }}>{email.subject}</span>
                          <span className="text-xs ml-auto flex-shrink-0" style={{ color: "var(--foreground-muted)" }}>
                            {formatRelativeTime(email.receivedAt)}
                          </span>
                        </div>
                        <p className="text-xs truncate mt-0.5" style={{ color: "var(--foreground-muted)", fontFamily: "var(--font-hanken)" }}>
                          {email.from.name || email.from.email} · {email.snippet}
                        </p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <div
                className="px-4 py-2.5 flex items-center justify-between text-xs border-t"
                style={{ borderColor: "var(--border)", color: "var(--foreground-subtle)" }}
              >
                <span>
                  <kbd className="font-mono">↑↓</kbd> navigate · <kbd className="font-mono">↵</kbd> open
                </span>
                <span><kbd className="font-mono">ESC</kbd> close</span>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

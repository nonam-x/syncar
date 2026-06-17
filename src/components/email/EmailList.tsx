"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useUIStore } from "@/lib/store/ui.store";
import type { Email } from "@/types";
import { EmailListItem } from "./EmailListItem";
import { LoadingState } from "@/components/ui/LoadingState";
import { EmptyState } from "@/components/ui/EmptyState";
import { Inbox, Star, Mail } from "lucide-react";

interface EmailListProps {
  emails: Email[];
  isLoading?: boolean;
}

type FilterTab = "all" | "unread" | "starred";

export function EmailList({ emails, isLoading }: EmailListProps) {
  const { selectedEmailId } = useUIStore();
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [sortBy, setSortBy] = useState<"date" | "priority">("date");

  const filtered = emails
    .filter((e) => {
      if (activeTab === "unread") return !e.isRead;
      if (activeTab === "starred") return e.isStarred;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "priority") {
        const order = { HIGH: 0, MEDIUM: 1, LOW: 2 };
        return order[a.priority] - order[b.priority];
      }
      return new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime();
    });

  const TABS: { id: FilterTab; label: string; icon: React.ElementType }[] = [
    { id: "all",     label: "All",     icon: Mail },
    { id: "unread",  label: "Unread",  icon: Inbox },
    { id: "starred", label: "Starred", icon: Star },
  ];

  return (
    <div className="flex flex-col h-full" style={{ minWidth: 0 }}>
      {/* Toolbar */}
      <div
        className="flex items-center justify-between px-3 py-1.5 flex-shrink-0"
        style={{ borderBottom: "1px solid var(--border)", background: "var(--surface-1)" }}
      >
        {/* Filter tabs */}
        <div className="flex items-center gap-1">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-all"
                style={{
                  color: active ? "var(--foreground)" : "var(--foreground-subtle)",
                  background: active ? "var(--surface-2)" : "transparent",
                }}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.id === "unread" && emails.filter((e) => !e.isRead).length > 0 && (
                  <span
                    className="text-xs rounded-full px-1.5 py-0.2"
                    style={{
                      background: "var(--accent-muted)",
                      color: "var(--accent-text)",
                      fontSize: "9px",
                      fontWeight: 600,
                    }}
                  >
                    {emails.filter((e) => !e.isRead).length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Sort */}
        <button
          onClick={() => setSortBy((s) => s === "date" ? "priority" : "date")}
          className="flex items-center gap-1 px-2 py-1 text-xs rounded-md border transition-all hover:opacity-80 font-medium"
          style={{
            color: "var(--foreground-muted)",
            borderColor: "var(--border)",
            background: "transparent",
          }}
          title="Toggle sort order"
        >
          <span>Sort: {sortBy === "date" ? "Date" : "Priority"}</span>
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <LoadingState />
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={<Inbox className="w-8 h-8" />}
            title={activeTab === "unread" ? "All caught up!" : "No emails found"}
            description={
              activeTab === "unread"
                ? "You've read everything in your inbox."
                : "Nothing here yet."
            }
          />
        ) : (
          <AnimatePresence initial={false}>
            {filtered.map((email) => (
              <EmailListItem
                key={email.id}
                email={email}
                isSelected={selectedEmailId === email.id}
              />
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

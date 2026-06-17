"use client";

import { useEffect, useCallback } from "react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/lib/store/ui.store";
import { useRouter } from "next/navigation";
import {
  Inbox, Star, FileText, Send, Calendar, Bot, Search as SearchIcon,
  Settings, PenSquare, LogOut, Zap, Mail
} from "lucide-react";
import { Brand } from "@/components/ui/Brand";

const COMMANDS = [
  {
    group: "Navigate",
    items: [
      { id: "inbox", label: "Go to Inbox", icon: <Inbox className="w-4 h-4" />, shortcut: "G I", href: "/inbox" },
      { id: "priority", label: "Go to Priority", icon: <Star className="w-4 h-4" />, href: "/priority" },
      { id: "drafts", label: "Go to Drafts", icon: <FileText className="w-4 h-4" />, href: "/drafts" },
      { id: "sent", label: "Go to Sent", icon: <Send className="w-4 h-4" />, href: "/sent" },
      { id: "calendar", label: "Go to Calendar", icon: <Calendar className="w-4 h-4" />, href: "/calendar" },
      { id: "ai", label: "Open AI Assistant", icon: <Bot className="w-4 h-4" />, href: "/ai" },
      { id: "settings", label: "Settings", icon: <Settings className="w-4 h-4" />, href: "/settings" },
    ],
  },
  {
    group: "Actions",
    items: [
      { id: "compose", label: "Compose new email", icon: <PenSquare className="w-4 h-4" />, shortcut: "C", action: "compose" },
      { id: "search", label: "Search emails", icon: <SearchIcon className="w-4 h-4" />, shortcut: "/", action: "search" },
      { id: "ai-chat", label: "Ask AI assistant", icon: <Zap className="w-4 h-4" />, action: "ai" },
    ],
  },
];

export function CommandPalette() {
  const { commandPaletteOpen, setCommandPaletteOpen, setComposerOpen, setSearchOpen, setActiveView } = useUIStore();
  const router = useRouter();

  const close = useCallback(() => setCommandPaletteOpen(false), [setCommandPaletteOpen]);

  // Global keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [commandPaletteOpen, setCommandPaletteOpen, close]);

  const handleSelect = (item: { href?: string; action?: string; id: string }) => {
    close();
    if (item.href) {
      router.push(item.href);
      const viewMap: Record<string, string> = {
        inbox: "inbox", priority: "priority", drafts: "drafts",
        sent: "sent", calendar: "calendar", ai: "ai", settings: "settings",
      };
      if (viewMap[item.id]) setActiveView(viewMap[item.id] as any);
    } else if (item.action === "compose") {
      setComposerOpen(true);
    } else if (item.action === "search") {
      setSearchOpen(true);
    } else if (item.action === "ai") {
      router.push("/ai");
      setActiveView("ai");
    }
  };

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50"
            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
            onClick={close}
          />

          {/* Dialog */}
          <div className="fixed inset-0 z-51 flex items-start justify-center pt-[15vh] px-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto w-full max-w-xl"
              style={{ zIndex: 51 }}
            >
              <Command
                className="overflow-hidden"
                style={{
                  background: "transparent",
                  border: "none",
                  boxShadow: "none",
                }}
              >
                <div
                  className="flex items-center gap-3 px-4 border-b"
                  style={{ borderColor: "var(--border)" }}
                >
                  <SearchIcon className="w-4 h-4 flex-shrink-0" style={{ color: "var(--foreground-muted)" }} />
                  <Command.Input
                    placeholder="Search commands or navigate..."
                    className="flex-1 py-4 bg-transparent border-none outline-none text-sm"
                    style={{ color: "var(--foreground)" }}
                  />
                  <kbd
                    className="text-xs px-1.5 py-0.5 rounded font-mono"
                    style={{
                      background: "var(--surface-3)",
                      color: "var(--foreground-muted)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    ESC
                  </kbd>
                </div>
 
                <Command.List
                  className="p-2 max-h-80 overflow-y-auto"
                >
                  <Command.Empty
                    className="py-8 text-center text-sm"
                    style={{ color: "var(--foreground-muted)" }}
                  >
                    No commands found
                  </Command.Empty>
 
                  {COMMANDS.map((group) => (
                    <Command.Group
                      key={group.group}
                      heading={group.group}
                      className="mb-1"
                    >
                      <div
                        className="px-3 py-1.5 text-xs font-semibold tracking-wider uppercase"
                        style={{ color: "var(--foreground-subtle)", fontFamily: "var(--font-mono)" }}
                      >
                        {group.group}
                      </div>
                      {group.items.map((item) => (
                        <Command.Item
                          key={item.id}
                          value={item.label}
                          onSelect={() => handleSelect(item)}
                          className="flex items-center gap-3 rounded-lg cursor-pointer text-sm transition-all"
                        >
                          <span style={{ color: "var(--foreground-muted)" }}>{item.icon}</span>
                          <span className="flex-1" style={{ fontFamily: "var(--font-hanken)" }}>{item.label}</span>
                          {item.shortcut && (
                            <div className="flex gap-1">
                              {item.shortcut.split(" ").map((k, i) => (
                                <kbd
                                  key={i}
                                  className="text-xs px-1.5 py-0.5 rounded font-mono"
                                  style={{
                                    background: "var(--surface-3)",
                                    color: "var(--foreground-muted)",
                                    border: "1px solid var(--border)",
                                  }}
                                >
                                  {k}
                                </kbd>
                              ))}
                            </div>
                          )}
                        </Command.Item>
                      ))}
                    </Command.Group>
                  ))}
                </Command.List>

                {/* Footer */}
                <div
                  className="flex items-center justify-between px-4 py-2.5 border-t text-xs"
                  style={{ borderColor: "var(--border)", color: "var(--foreground-subtle)" }}
                >
                  <span className="flex items-center">
                    <Brand size="xs" />
                  </span>
                  <span>
                    <kbd className="font-mono">↑↓</kbd> navigate · <kbd className="font-mono">↵</kbd> select
                  </span>
                </div>
              </Command>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

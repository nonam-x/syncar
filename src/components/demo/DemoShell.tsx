"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brand } from "@/components/ui/Brand";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/lib/store/ui.store";
import { useDemoMode } from "@/lib/demo/demo.context";
import { DemoEmailComposer } from "@/components/demo/DemoEmailComposer";
import { cn } from "@/lib/utils";
import {
  Inbox, Calendar, Bot, PenSquare, ChevronLeft, ChevronRight,
  Search, Moon, Sun, Bell,
} from "lucide-react";
import type { Email } from "@/types";

const NAV_ITEMS = [
  { id: "ai",       label: "Assistant", icon: Bot,      href: "/demo/ai" },
  { id: "inbox",    label: "Inbox",     icon: Inbox,    href: "/demo/inbox", badge: true },
  { id: "calendar", label: "Calendar",  icon: Calendar, href: "/demo/calendar" },
];

interface DemoShellProps {
  children: React.ReactNode;
}

/**
 * DemoShell — a Clerk-free dashboard layout for the demo route group.
 * Reads unread count from mock data rather than real API.
 */
export function DemoShell({ children }: DemoShellProps) {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar, setComposerOpen, setSearchOpen, setCommandPaletteOpen, theme, toggleTheme } = useUIStore();
  const { emails } = useDemoMode();

  const unreadCount = emails.filter((e: Email) => !e.isRead).length;
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <div className="flex h-full w-full overflow-hidden" style={{ background: "var(--background)" }}>
      {/* ─── Demo Sidebar ──────────────────────────────────────────────── */}
      <motion.aside
        animate={{ width: sidebarCollapsed ? 64 : 220 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col h-full flex-shrink-0 relative group/sidebar"
        style={{
          background: "var(--surface-1)",
          borderRight: "1px solid var(--border)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          className={cn(
            "flex items-center h-14 flex-shrink-0 relative group/header transition-all duration-200",
            sidebarCollapsed ? "justify-center px-2" : "justify-between pl-4 pr-2"
          )}
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div className={cn("flex items-center flex-1 min-w-0 transition-opacity duration-150", sidebarCollapsed && "group-hover/header:opacity-0 justify-center")}>
            <Brand size="sm" showText={!sidebarCollapsed} />
          </div>

          <button
            onClick={toggleSidebar}
            className={cn(
              "p-1.5 rounded-lg transition-all text-foreground-muted hover:text-foreground hover:bg-surface-2",
              sidebarCollapsed
                ? "absolute inset-0 m-auto w-8 h-8 flex items-center justify-center opacity-0 group-hover/header:opacity-100 scale-90 group-hover/header:scale-100 cursor-pointer"
                : "ml-auto cursor-pointer"
            )}
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Compose button */}
        <div className="px-2 py-3 flex-shrink-0">
          <motion.button
            onClick={() => setComposerOpen(true)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "flex items-center rounded-lg h-9 text-sm font-medium transition-all text-white cursor-pointer",
              sidebarCollapsed ? "justify-center w-full px-0" : "gap-2.5 pl-4 pr-3 w-full"
            )}
            style={{ background: "var(--accent)" }}
            title="Compose"
          >
            <PenSquare className="w-4 h-4 flex-shrink-0" />
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="truncate overflow-hidden whitespace-nowrap"
                >
                  Compose
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-2 py-1 overflow-y-auto space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link key={item.id} href={item.href} className="block rounded-lg">
                <motion.div
                  whileHover={{ x: sidebarCollapsed ? 0 : 2 }}
                  transition={{ duration: 0.1 }}
                  className={cn(
                    "flex items-center text-sm transition-all cursor-pointer relative group h-9 rounded-lg",
                    sidebarCollapsed ? "justify-center px-0" : "gap-2.5 pl-4 pr-3",
                    active
                      ? "font-medium text-foreground bg-surface-2"
                      : "text-foreground-muted hover:text-foreground hover:bg-surface-hover"
                  )}
                >
                  {active && (
                    <motion.div
                      layoutId="demo-sidebar-active"
                      className="absolute left-1 top-1/2 -translate-y-1/2 w-[1px] h-3 rounded-full"
                      style={{ background: "var(--foreground-faint)" }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <AnimatePresence>
                    {!sidebarCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        className="flex-1 truncate overflow-hidden whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {item.badge && unreadCount > 0 && (
                    <AnimatePresence>
                      {!sidebarCollapsed ? (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="text-xs font-semibold px-1.5 py-0.5 rounded-full tabular-nums"
                          style={{ background: "var(--accent)", color: "white", fontSize: "10px", minWidth: "18px", textAlign: "center" }}
                        >
                          {unreadCount}
                        </motion.span>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
                          style={{ background: "var(--accent)" }}
                        />
                      )}
                    </AnimatePresence>
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* User footer — shows a demo user */}
        <div className="px-2 py-3 flex-shrink-0" style={{ borderTop: "1px solid var(--border)" }}>
          <div className={cn("flex items-center gap-2.5", sidebarCollapsed ? "justify-center pl-0" : "pl-2 pr-1")}>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 text-white"
              style={{ background: "var(--accent)" }}
            >
              DM
            </div>
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="flex-1 min-w-0 overflow-hidden"
                >
                  <p className="text-xs font-semibold truncate" style={{ color: "var(--foreground)" }}>Demo User</p>
                  <p className="text-[10px] truncate" style={{ color: "var(--foreground-muted)" }}>demo@syncar.io</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.aside>

      {/* ─── Main content ──────────────────────────────────────────────── */}
      <motion.main
        className="flex-1 min-w-0 flex flex-col overflow-hidden"
        animate={{ marginLeft: 0 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* TopNav (Clerk-free) */}
        <header
          className="flex items-center h-14 px-5 flex-shrink-0 gap-4"
          style={{ background: "var(--surface-1)", borderBottom: "1px solid var(--border)" }}
        >
          <div className="flex-1 min-w-0" />
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {/* Search trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all hover:opacity-80"
              style={{ background: "var(--surface-2)", color: "var(--foreground-muted)", border: "1px solid var(--border)", minWidth: "160px" }}
            >
              <Search className="w-3.5 h-3.5" />
              <span className="flex-1 text-left">Search...</span>
              <kbd className="text-xs rounded px-1 py-0.5" style={{ background: "var(--surface-3)", fontFamily: "monospace", fontSize: "10px" }}>⌘K</kbd>
            </button>
            {/* Compose */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setComposerOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all"
              style={{ background: "var(--accent)" }}
            >
              <PenSquare className="w-3.5 h-3.5" />
              New
            </motion.button>
            {/* Bell */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="p-2 rounded-lg transition-all hover:opacity-80"
              style={{ background: "var(--surface-2)", color: "var(--foreground-muted)", border: "1px solid var(--border)" }}
            >
              <Bell className="w-3.5 h-3.5" />
            </button>
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-all hover:opacity-80"
              style={{ background: "var(--surface-2)", color: "var(--foreground-muted)", border: "1px solid var(--border)" }}
            >
              {theme === "light" ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
            </button>
          </div>
        </header>

        {/* Page content — flex-1 min-h-0 so child h-full resolves correctly */}
        <div className="flex-1 min-h-0 overflow-hidden">
          {children}
        </div>
      </motion.main>

      {/* Demo email composer (no real sends) */}
      <DemoEmailComposer />
    </div>
  );
}

"use client";

import Link from "next/link";
import { Brand } from "@/components/ui/Brand";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useClerk, useUser } from "@clerk/nextjs";
import { useUIStore } from "@/lib/store/ui.store";
import {
  Inbox, Star, FileText, Send, Calendar, Bot, Search,
  Settings, PenSquare, ChevronLeft, ChevronRight, LogOut,
  Zap
} from "lucide-react";
import { cn, getInitials } from "@/lib/utils";
import { useEmails } from "@/lib/hooks/api";
import type { Email } from "@/types";

const NAV_ITEMS = [
    { id: "ai",       label: "Assistant", icon: Bot,      href: "/ai" },
  { id: "inbox",    label: "Inbox",        icon: Inbox,    href: "/inbox",    badge: true },
  { id: "calendar", label: "Calendar",     icon: Calendar, href: "/calendar" },
  { id: "sent",     label: "Sent",         icon: Send,     href: "/sent" },
  { id: "priority", label: "Priority",     icon: Star,     href: "/priority" },
  { id: "drafts",   label: "Drafts",       icon: FileText, href: "/drafts" },

];

const BOTTOM_ITEMS = [
  { id: "search",   label: "Search",   icon: Search,   href: "/search" },
  { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar, setComposerOpen } = useUIStore();
  const { signOut } = useClerk();
  const { user } = useUser();

  const { data: emails = [] } = useEmails();
  const unreadCount = emails.filter((e: Email) => !e.isRead).length;

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
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
        <div
          className={cn(
            "flex items-center flex-1 min-w-0 transition-opacity duration-150",
            sidebarCollapsed && "group-hover/header:opacity-0 justify-center"
          )}
        >
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
          title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Compose Button */}
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
          title="Compose (C)"
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

      {/* Nav Items */}
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
                {/* Active indicator */}
                {active && (
                  <motion.div
                    layoutId="sidebar-active"
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

                {/* Badge */}
                {item.badge && unreadCount > 0 && (
                  <AnimatePresence>
                    {!sidebarCollapsed ? (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="text-xs font-semibold px-1.5 py-0.5 rounded-full tabular-nums"
                        style={{
                          background: "var(--accent)",
                          color: "white",
                          fontSize: "10px",
                          minWidth: "18px",
                          textAlign: "center",
                        }}
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

        {/* Divider */}
        <div className="my-2" style={{ borderTop: "1px solid var(--border-subtle)" }} />

        {BOTTOM_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link key={item.id} href={item.href} className="block rounded-lg">
              <motion.div
                whileHover={{ x: sidebarCollapsed ? 0 : 2 }}
                transition={{ duration: 0.1 }}
                className={cn(
                  "flex items-center text-sm transition-all cursor-pointer h-9 rounded-lg",
                  sidebarCollapsed ? "justify-center px-0" : "gap-2.5 pl-4 pr-3",
                  active
                    ? "font-medium text-foreground bg-surface-2"
                    : "text-foreground-muted hover:text-foreground hover:bg-surface-hover"
                )}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <AnimatePresence>
                  {!sidebarCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="truncate overflow-hidden whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* User Footer */}
      <div
        className="px-2 py-3 flex-shrink-0"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div
          className={cn(
            "flex items-center gap-2.5",
            sidebarCollapsed ? "justify-center pl-0" : "pl-2 pr-1"
          )}
        >
          {/* Avatar */}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 text-white"
            style={{ background: "var(--accent)" }}
          >
            {user ? getInitials(user.fullName ?? undefined, user.primaryEmailAddress?.emailAddress) : "U"}
          </div>

          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="flex-1 min-w-0 overflow-hidden"
              >
                <p className="text-xs font-semibold truncate" style={{ color: "var(--foreground)" }}>
                  {user?.fullName ?? "User"}
                </p>
                <p className="text-[10px] truncate" style={{ color: "var(--foreground-muted)" }}>
                  {user?.primaryEmailAddress?.emailAddress ?? ""}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => signOut({ redirectUrl: "/" })}
                className="p-1 rounded-md transition-all text-foreground-muted hover:text-foreground hover:bg-surface-2 flex-shrink-0 cursor-pointer"
                title="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  );
}

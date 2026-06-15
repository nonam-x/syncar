"use client";

import { motion } from "framer-motion";
import { useUIStore } from "@/lib/store/ui.store";
import { Search, PenSquare, Bell, Sun, Moon } from "lucide-react";
import { useUser } from "@clerk/nextjs";

interface TopNavProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function TopNav({ title, subtitle, actions }: TopNavProps) {
  const { setCommandPaletteOpen, setSearchOpen, setComposerOpen, theme, toggleTheme } = useUIStore();
  const { user } = useUser();

  return (
    <header
      className="flex items-center h-14 px-5 flex-shrink-0 gap-4"
      style={{
        background: "var(--surface-1)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-sm font-semibold leading-none" style={{ color: "var(--foreground)" }}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs mt-0.5 truncate" style={{ color: "var(--foreground-muted)" }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        {actions}

        {/* Search trigger */}
        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all hover:opacity-80"
          style={{
            background: "var(--surface-2)",
            color: "var(--foreground-muted)",
            border: "1px solid var(--border)",
            minWidth: "160px",
          }}
        >
          <Search className="w-3.5 h-3.5" />
          <span className="flex-1 text-left">Search...</span>
          <kbd
            className="text-xs rounded px-1 py-0.5"
            style={{
              background: "var(--surface-3)",
              fontFamily: "monospace",
              fontSize: "10px",
            }}
          >
            ⌘K
          </kbd>
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

        {/* Command palette hint */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="p-2 rounded-lg transition-all hover:opacity-80"
          style={{
            background: "var(--surface-2)",
            color: "var(--foreground-muted)",
            border: "1px solid var(--border)",
          }}
          title="Open command palette (⌘K)"
        >
          <Bell className="w-3.5 h-3.5" />
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg transition-all hover:opacity-80"
          style={{
            background: "var(--surface-2)",
            color: "var(--foreground-muted)",
            border: "1px solid var(--border)",
          }}
          title={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
        >
          {theme === "light" ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
        </button>
      </div>
    </header>
  );
}

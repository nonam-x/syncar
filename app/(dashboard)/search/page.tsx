"use client";

import { TopNav } from "@/components/layout/TopNav";
import { useUIStore } from "@/lib/store/ui.store";
import { SearchModal } from "@/components/ui/SearchModal";
import { Search } from "lucide-react";

export default function SearchPage() {
  const { setSearchOpen } = useUIStore();
  return (
    <div className="flex flex-col h-full">
      <TopNav title="Search" subtitle="Search across your entire workspace" />
      <div className="flex-1 flex flex-col items-center justify-center gap-6 px-8">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{ background: "var(--accent-muted)" }}
        >
          <Search className="w-8 h-8" style={{ color: "var(--accent)" }} />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2" style={{ color: "var(--foreground)" }}>
            Global Search
          </h2>
          <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
            Search emails, calendar events, and more
          </p>
        </div>
        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center gap-3 px-6 py-3 rounded-xl text-sm transition-all hover:opacity-80"
          style={{
            background: "var(--surface-1)",
            color: "var(--foreground-muted)",
            border: "1px solid var(--border-strong)",
            minWidth: "320px",
          }}
        >
          <Search className="w-4 h-4" />
          <span className="flex-1 text-left">Search everything...</span>
          <kbd
            className="text-xs px-1.5 py-0.5 rounded"
            style={{
              background: "var(--surface-3)",
              fontFamily: "monospace",
            }}
          >
            ⌘K
          </kbd>
        </button>
        <SearchModal />
      </div>
    </div>
  );
}

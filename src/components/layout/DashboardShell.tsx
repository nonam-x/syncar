"use client";

import { Sidebar } from "./Sidebar";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { SearchModal } from "@/components/ui/SearchModal";
import { EmailComposer } from "@/components/email/EmailComposer";
import { motion } from "framer-motion";
import { useUIStore } from "@/lib/store/ui.store";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { sidebarCollapsed } = useUIStore();

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ background: "var(--background)" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <motion.main
        className="flex-1 min-w-0 flex flex-col overflow-hidden"
        animate={{ marginLeft: 0 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.main>

      {/* Global overlays */}
      <CommandPalette />
      <SearchModal />
      <EmailComposer />
    </div>
  );
}

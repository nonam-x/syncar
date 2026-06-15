"use client";

import { motion } from "framer-motion";
import { Inbox, Calendar, Bot, Search } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

interface EmptyStateProps {
  icon?: React.ReactNode | "logo";
  title: string;
  description?: string;
  action?: React.ReactNode;
}

const iconMap: Record<string, React.ReactNode> = {
  inbox: <Inbox className="w-10 h-10" />,
  calendar: <Calendar className="w-10 h-10" />,
  ai: <Bot className="w-10 h-10" />,
  search: <Search className="w-10 h-10" />,
};

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-24 px-8 text-center"
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
        style={{ background: "var(--accent-muted)", color: "var(--accent)" }}
      >
        {icon === "logo" ? (
          <Logo width={32} height={32} />
        ) : (
          icon || <Inbox className="w-8 h-8" />
        )}
      </div>
      <h3 className="text-base font-semibold mb-1.5" style={{ color: "var(--foreground)" }}>
        {title}
      </h3>
      {description && (
        <p className="text-sm max-w-xs" style={{ color: "var(--foreground-muted)" }}>
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </motion.div>
  );
}

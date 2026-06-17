"use client";

import type { EmailPriority } from "@/types";

const CONFIG: Record<EmailPriority, { label: string; className: string }> = {
  HIGH:   { label: "High",   className: "priority-high"   },
  MEDIUM: { label: "Medium", className: "priority-medium" },
  LOW:    { label: "Low",    className: "priority-low"    },
};

export function PriorityBadge({ priority }: { priority: EmailPriority }) {
  const { label, className } = CONFIG[priority];
  return (
    <span
      className={`text-xs font-medium px-1.5 py-0.5 rounded-md tabular-nums ${className}`}
      style={{ fontSize: "10px" }}
    >
      {label}
    </span>
  );
}

export function PriorityDot({ priority }: { priority: EmailPriority }) {
  const colors: Record<EmailPriority, string> = {
    HIGH:   "var(--priority-high)",
    MEDIUM: "var(--priority-medium)",
    LOW:    "var(--priority-low)",
  };
  return (
    <span
      className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
      style={{ background: colors[priority] }}
    />
  );
}

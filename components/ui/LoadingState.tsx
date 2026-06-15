"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LoadingStateProps {
  count?: number;
  className?: string;
}

function EmailSkeleton() {
  return (
    <div className="flex items-start gap-3 px-4 py-3 border-b" style={{ borderColor: "var(--border-subtle)" }}>
      <div className="skeleton w-8 h-8 rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="flex justify-between">
          <div className="skeleton h-3.5 w-28 rounded" />
          <div className="skeleton h-3 w-10 rounded" />
        </div>
        <div className="skeleton h-3.5 w-48 rounded" />
        <div className="skeleton h-3 w-full rounded" />
      </div>
    </div>
  );
}

export function LoadingState({ count = 6, className }: LoadingStateProps) {
  return (
    <div className={cn("animate-fade-in", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <EmailSkeleton key={i} />
      ))}
    </div>
  );
}

export function SpinnerState({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 rounded-full border-2 border-t-transparent"
        style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }}
      />
      <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
        {label}
      </p>
    </div>
  );
}

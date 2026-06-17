"use client";

import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  message = "Failed to load data. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 px-8 text-center"
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
        style={{ background: "var(--danger-muted)", color: "var(--danger)" }}
      >
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h3 className="text-base font-semibold mb-1.5" style={{ color: "var(--foreground)" }}>
        {title}
      </h3>
      <p className="text-sm max-w-xs mb-5" style={{ color: "var(--foreground-muted)" }}>
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-80"
          style={{ background: "var(--surface-2)", color: "var(--foreground)", border: "1px solid var(--border)" }}
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Try again
        </button>
      )}
    </motion.div>
  );
}

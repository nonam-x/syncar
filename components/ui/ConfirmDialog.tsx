"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  type?: "danger" | "warning" | "info";
  isLoading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Delete",
  cancelText = "Cancel",
  type = "danger",
  isLoading = false,
}: ConfirmDialogProps) {
  // Prevent body scrolling when dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Icon SVG paths using Phosphor Icons style (Regular weight)
  const getIcon = () => {
    switch (type) {
      case "danger":
        // Phosphor Trash Icon SVG Path
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            className="w-5 h-5"
            fill="currentColor"
            style={{ color: "var(--danger)" }}
          >
            <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z" />
          </svg>
        );
      case "warning":
        // Phosphor Warning Icon SVG Path
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            className="w-5 h-5"
            fill="currentColor"
            style={{ color: "var(--warning)" }}
          >
            <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z" />
          </svg>
        );
      case "info":
      default:
        // Phosphor Info Icon SVG Path
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            className="w-5 h-5"
            fill="currentColor"
            style={{ color: "var(--accent)" }}
          >
            <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,8,8,0,0,1-8-8V128a8,8,0,0,1,8-8,8,8,0,0,1,8,8ZM112,84a16,16,0,1,1,16,16A16,16,0,0,1,112,84Z" />
          </svg>
        );
    }
  };

  const getIconBackground = () => {
    switch (type) {
      case "danger":
        return "var(--danger-muted)";
      case "warning":
        return "var(--warning-muted)";
      case "info":
      default:
        return "var(--accent-muted)";
    }
  };

  const getConfirmButtonStyles = () => {
    switch (type) {
      case "danger":
        return {
          background: "var(--danger)",
        };
      case "warning":
        return {
          background: "var(--warning)",
        };
      case "info":
      default:
        return {
          background: "var(--accent)",
        };
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
          />

          {/* Dialog Container Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="relative w-[360px] max-w-full p-5 rounded-2xl border flex flex-col gap-4 shadow-xl z-10"
            style={{
              background: "var(--surface-1)",
              borderColor: "var(--border)",
            }}
          >
            <div className="flex items-start gap-3.5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: getIconBackground() }}
              >
                {getIcon()}
              </div>
              <div className="flex-1 min-w-0">
                <h3
                  className="text-sm font-semibold mb-1"
                  style={{ color: "var(--foreground)" }}
                >
                  {title}
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--foreground-muted)" }}
                >
                  {description}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 mt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="btn btn-secondary text-xs px-3.5 py-1.5 h-8 font-medium cursor-pointer"
              >
                {cancelText}
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={isLoading}
                className="btn text-xs px-3.5 py-1.5 h-8 font-medium text-white transition-all hover:opacity-90 active:scale-[0.98] cursor-pointer"
                style={getConfirmButtonStyles()}
              >
                {isLoading ? "Deleting..." : confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

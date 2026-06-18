"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FlaskConical, X, ArrowRight } from "lucide-react";

/**
 * DemoBanner
 * Fixed amber strip shown at the top of every demo page.
 * - Labels the session clearly
 * - Provides Sign up / Sign in exit CTAs
 * - Can be dismissed to a small floating badge
 */
export function DemoBanner() {
  const [dismissed, setDismissed] = useState(false);

  return (
    <>
      {/* Full Banner */}
      <AnimatePresence>
        {!dismissed && (
          <motion.div
            initial={{ y: -48, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -48, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="demo-banner"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 9999,
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingLeft: "16px",
              paddingRight: "12px",
              background: "linear-gradient(90deg, #78350f 0%, #92400e 100%)",
              borderBottom: "1px solid rgba(251,191,36,0.3)",
              gap: "8px",
            }}
          >
            {/* Left: label */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0 }}>
              <FlaskConical
                style={{ width: "14px", height: "14px", color: "#fbbf24", flexShrink: 0 }}
              />
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#fef3c7",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Demo Mode
              </span>
              <span
                style={{
                  fontSize: "12px",
                  color: "rgba(253,230,138,0.7)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                className="hidden sm:block"
              >
         
              </span>
            </div>

            {/* Right: CTAs + close */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
              <Link
                href="/sign-in"
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "rgba(253,230,138,0.8)",
                  whiteSpace: "nowrap",
                  textDecoration: "none",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  transition: "color 150ms",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fef3c7")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(253,230,138,0.8)")}
              >
                Sign in
              </Link>

              <Link
                href="/sign-up"
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#1c1917",
                  background: "#fbbf24",
                  whiteSpace: "nowrap",
                  textDecoration: "none",
                  padding: "5px 12px",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  transition: "background 150ms",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#f59e0b")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#fbbf24")}
              >
                Sign up free
                <ArrowRight style={{ width: "12px", height: "12px" }} />
              </Link>

              <button
                onClick={() => setDismissed(true)}
                aria-label="Dismiss demo banner"
                style={{
                  padding: "4px",
                  borderRadius: "4px",
                  border: "none",
                  background: "transparent",
                  color: "rgba(253,230,138,0.6)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "color 150ms",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fef3c7")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(253,230,138,0.6)")}
              >
                <X style={{ width: "14px", height: "14px" }} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating badge after dismissal */}
      <AnimatePresence>
        {dismissed && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setDismissed(false)}
            title="Demo Mode — click to restore banner"
            style={{
              position: "fixed",
              top: "12px",
              right: "12px",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 10px",
              borderRadius: "20px",
              border: "1px solid rgba(251,191,36,0.4)",
              background: "#78350f",
              color: "#fbbf24",
              fontSize: "11px",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
            }}
          >
            <FlaskConical style={{ width: "12px", height: "12px" }} />
            Demo
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

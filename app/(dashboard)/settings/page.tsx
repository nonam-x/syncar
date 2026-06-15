"use client";

import { TopNav } from "@/components/layout/TopNav";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { User, Bell, Palette, Shield, Zap, ChevronRight } from "lucide-react";
import { getInitials } from "@/lib/utils";
import { Brand } from "@/components/ui/Brand";

const SETTINGS_SECTIONS = [
  {
    id: "profile",
    label: "Profile",
    icon: User,
    description: "Manage your personal information",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    description: "Configure email and push notifications",
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: Palette,
    description: "Theme, density, and display options",
  },
  {
    id: "ai",
    label: "AI Preferences",
    icon: Zap,
    description: "Tone, response style, and automation settings",
  },
  {
    id: "security",
    label: "Privacy & Security",
    icon: Shield,
    description: "Connected accounts, tokens, and data",
  },
];

export default function SettingsPage() {
  const { user } = useUser();

  return (
    <div className="flex flex-col h-full">
      <TopNav title="Settings" />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto py-8 px-6 space-y-6">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 p-5 rounded-2xl"
            style={{
              background: "var(--surface-1)",
              border: "1px solid var(--border)",
            }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold text-white flex-shrink-0"
              style={{ background: "var(--accent)" }}
            >
              {user ? getInitials(user.fullName ?? undefined, user.primaryEmailAddress?.emailAddress) : "U"}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold" style={{ color: "var(--foreground)" }}>
                {user?.fullName ?? "User"}
              </h3>
              <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
                {user?.primaryEmailAddress?.emailAddress ?? ""}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "var(--foreground-subtle)" }}>
                Syncar Pro · AI-First Workspace
              </p>
            </div>
            <div
              className="px-3 py-1.5 rounded-lg text-xs font-medium"
              style={{ background: "var(--accent-muted)", color: "var(--accent)" }}
            >
              Pro Plan
            </div>
          </motion.div>

          {/* Settings Items */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid var(--border)" }}
          >
            {SETTINGS_SECTIONS.map((section, i) => {
              const Icon = section.icon;
              return (
                <motion.button
                  key={section.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-4 px-5 py-4 w-full text-left transition-all hover:opacity-80"
                  style={{
                    background: "var(--surface-1)",
                    borderBottom: i < SETTINGS_SECTIONS.length - 1 ? "1px solid var(--border-subtle)" : "none",
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--surface-2)" }}
                  >
                    <Icon className="w-4 h-4" style={{ color: "var(--accent)" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                      {section.label}
                    </p>
                    <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>
                      {section.description}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: "var(--foreground-subtle)" }} />
                </motion.button>
              );
            })}
          </div>

          {/* Connections */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="p-5 rounded-2xl"
            style={{ background: "var(--surface-1)", border: "1px solid var(--border)" }}
          >
            <h4 className="text-sm font-semibold mb-4" style={{ color: "var(--foreground)" }}>
              Connected Accounts
            </h4>
            {[
              { name: "Gmail", status: "Connected", color: "var(--success)" },
              { name: "Google Calendar", status: "Connected", color: "var(--success)" },
              { name: "Gemini AI", status: "Active", color: "var(--accent)" },
            ].map((conn) => (
              <div
                key={conn.name}
                className="flex items-center justify-between py-2.5"
                style={{ borderBottom: "1px solid var(--border-subtle)" }}
              >
                <span className="text-sm" style={{ color: "var(--foreground)" }}>
                  {conn.name}
                </span>
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{ background: `${conn.color}18`, color: conn.color }}
                >
                  {conn.status}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Footer Branding */}
          <div className="flex flex-col items-center justify-center pt-8 pb-4 gap-1.5 text-xs opacity-60">
            <Brand size="xs" />
            <p style={{ color: "var(--foreground-subtle)", fontSize: "10px" }}>v1.0.0 · AI-First Workspace</p>
          </div>
        </div>
      </div>
    </div>
  );
}

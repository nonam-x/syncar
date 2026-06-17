"use client";

import { useEffect, useState } from "react";
import { TopNav } from "@/components/layout/TopNav";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { User, Bell, Palette, Shield, Zap, ChevronRight, Mail, Calendar, Loader2 } from "lucide-react";
import { getInitials } from "@/lib/utils";
import { Brand } from "@/components/ui/Brand";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

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

type IntegrationStatus = {
  gmail: { connected: boolean };
  googlecalendar: { connected: boolean };
};

export default function SettingsPage() {
  const { user } = useUser();
  const [status, setStatus] = useState<IntegrationStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [connectingPlugin, setConnectingPlugin] = useState<string | null>(null);
  const [disconnectingPlugin, setDisconnectingPlugin] = useState<"gmail" | "googlecalendar" | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Fetch integration status
  const fetchStatus = async () => {
    try {
      const res = await fetch("/api/integrations/status");
      if (res.ok) {
        const data = await res.json();
        setStatus(data);
      }
    } catch (err) {
      console.error("Failed to fetch integration status:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleConnect = async (plugin: "gmail" | "googlecalendar") => {
    setErrorMsg(null);
    setConnectingPlugin(plugin);
    try {
      const res = await fetch(`/api/auth/connect?plugin=${plugin}`);
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.message || `Failed to start connection for ${plugin}`);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
      setConnectingPlugin(null);
    }
  };

  const handleDisconnect = async () => {
    if (!disconnectingPlugin) return;
    const plugin = disconnectingPlugin;
    setDisconnectingPlugin(null);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/integrations/disconnect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plugin }),
      });
      if (res.ok) {
        setStatus({
          gmail: { connected: false },
          googlecalendar: { connected: false },
        });
      } else {
        const data = await res.json();
        throw new Error(data.message || `Failed to disconnect ${plugin}`);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to disconnect.");
    }
  };

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
            className="p-5 rounded-2xl space-y-4"
            style={{ background: "var(--surface-1)", border: "1px solid var(--border)" }}
          >
            <h4 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
              Connected Accounts
            </h4>

            {errorMsg && (
              <div
                className="p-3 rounded-lg text-xs font-medium border"
                style={{
                  background: "var(--danger-muted)",
                  color: "var(--danger)",
                  borderColor: "rgba(181, 58, 42, 0.15)"
                }}
              >
                {errorMsg}
              </div>
            )}

            {loading ? (
              <div className="flex items-center gap-2 py-4 justify-center text-xs" style={{ color: "var(--foreground-muted)" }}>
                <Loader2 className="w-4 h-4 animate-spin" style={{ color: "var(--accent)" }} />
                <span>Loading integration status...</span>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Google Workspace Connection */}
                <div className="flex items-center justify-between py-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center border flex-shrink-0"
                      style={{ background: "var(--surface-2)", borderColor: "var(--border)" }}
                    >
                      <Zap className="w-4 h-4" style={{ color: "var(--accent)" }} />
                    </div>
                    <div>
                      <span className="text-sm font-medium block" style={{ color: "var(--foreground)" }}>
                        Google Workspace
                      </span>
                      <span className="text-xs block" style={{ color: "var(--foreground-muted)" }}>
                        Gmail & Google Calendar with AI outcomes
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    {status?.gmail.connected && status?.googlecalendar.connected ? (
                      <>
                        <span
                          className="text-xs font-medium px-2 py-0.5 rounded-full"
                          style={{ background: "rgba(16, 185, 129, 0.08)", color: "rgb(16, 185, 129)" }}
                        >
                          Connected
                        </span>
                        <button
                          type="button"
                          onClick={() => setDisconnectingPlugin("gmail")}
                          className="text-xs font-medium px-3 py-1.5 rounded-lg border hover:opacity-80 transition-all cursor-pointer"
                          style={{ color: "var(--danger)", borderColor: "var(--border)" }}
                        >
                          Disconnect
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleConnect("gmail")}
                        disabled={connectingPlugin !== null}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white transition-all hover:opacity-90 disabled:opacity-50 cursor-pointer"
                        style={{ background: "var(--accent)" }}
                      >
                        {connectingPlugin !== null ? "Connecting..." : "Connect"}
                      </button>
                    )}
                  </div>
                </div>

                {/* Gemini AI Active status */}
                <div className="flex items-center justify-between py-2 border-t pt-4 gap-4" style={{ borderColor: "var(--border-subtle)" }}>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center border flex-shrink-0"
                      style={{ background: "var(--surface-2)", borderColor: "var(--border)" }}
                    >
                      <Zap className="w-4 h-4" style={{ color: "var(--accent)" }} />
                    </div>
                    <div>
                      <span className="text-sm font-medium block" style={{ color: "var(--foreground)" }}>
                        Gemini AI Assistant
                      </span>
                      <span className="text-xs block" style={{ color: "var(--foreground-muted)" }}>
                        Orchestrate email and calendar outcomes
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span
                      className="text-xs font-medium px-2.5 py-0.5 rounded-full"
                      style={{ background: "var(--accent-muted)", color: "var(--accent)" }}
                    >
                      Active
                    </span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Footer Branding */}
          <div className="flex flex-col items-center justify-center pt-8 pb-4 gap-1.5 text-xs opacity-60">
            <Brand size="xs" />
            <p style={{ color: "var(--foreground-subtle)", fontSize: "10px" }}>v1.0.0 · AI-First Workspace</p>
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={!!disconnectingPlugin}
        onClose={() => setDisconnectingPlugin(null)}
        onConfirm={handleDisconnect}
        title="Disconnect Google Workspace"
        description="Are you sure you want to disconnect your Google Workspace account? This will temporarily pause Gmail and Google Calendar integrations and erase their cached data."
        confirmText="Disconnect"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
}

"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Mail, Calendar, Check, ArrowRight, LogOut, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Brand } from "@/components/ui/Brand";

type IntegrationStatus = {
  gmail: { connected: boolean };
  googlecalendar: { connected: boolean };
};

function OnboardingContent() {
  const { user, isLoaded: isUserLoaded } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [status, setStatus] = useState<IntegrationStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [connectingPlugin, setConnectingPlugin] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Check query parameters for callback results
  useEffect(() => {
    const error = searchParams.get("error");
    const success = searchParams.get("success");
    if (error) {
      setErrorMsg(decodeURIComponent(error));
    } else if (success) {
      setSuccessMsg("Integration successfully connected!");
      setTimeout(() => setSuccessMsg(null), 5000);
    }
  }, [searchParams]);

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
    if (isUserLoaded && user) {
      fetchStatus();
    }
  }, [isUserLoaded, user, searchParams]);

  const handleConnect = async (plugin: "gmail" | "googlecalendar") => {
    setErrorMsg(null);
    setConnectingPlugin(plugin);  //for example plugin is  "gmail"
    try {
      // `/api/auth/connect?plugin=gmail`call hoga hai response me aye url (google url) pe   redirect ho jyga
      const res = await fetch(`/api/auth/connect?plugin=${plugin}`);
      const data = await res.json(); // ye wo google url bana ke return kar rha hai
      if (res.ok && data.url) {
        window.location.href = data.url;   // ye google login page pe redirect krega actual page pe
      } else {
        throw new Error(data.message || `Failed to start connection for ${plugin}`);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
      setConnectingPlugin(null);
    }
  };

  const handleDisconnect = async (plugin: "gmail" | "googlecalendar") => {
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

  const allConnected = status?.gmail.connected && status?.googlecalendar.connected;

  if (!isUserLoaded || loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-zinc-100 gap-4">
        <Logo width={40} height={40} className="animate-pulse" />
        <p className="text-sm text-zinc-400">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-zinc-100 px-6 py-12 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg z-10"
      >
        {/* Header */}
        <div className="text-center mb-8 flex flex-col items-center">
          <Brand size="xl" layout="vertical" className="mb-4" />
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4 bg-emerald-950/40 text-emerald-400 border border-emerald-900/30">
            Connect Google Workspace
          </div>
          <p className="text-sm text-zinc-400 max-w-sm mx-auto">
            Syncar runs on a zero-latency database cache. Connect your Google account to start.
          </p>
        </div>

        {/* Status Messages */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-900/30 flex items-start gap-3 text-sm text-red-300">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}
        
        {successMsg && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-950/40 border border-emerald-900/30 flex items-start gap-3 text-sm text-emerald-300">
            <Check className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Cards Wrapper */}
        <div className="space-y-4 mb-8">
          {/* Google Workspace Connection Card */}
          <div
            className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-between gap-4 transition-all hover:border-zinc-700"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-zinc-800/80 flex items-center justify-center border border-zinc-700">
                <Sparkles className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-white">Google Workspace</h3>
                <p className="text-xs text-zinc-400">Sync Gmail and Google Calendar with AI outcomes</p>
              </div>
            </div>

            <div>
              {allConnected ? (
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-950/50 text-emerald-400 border border-emerald-900/30 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Connected
                  </span>
                  <button
                    onClick={() => handleDisconnect("gmail")}
                    className="text-xs text-zinc-400 hover:text-red-400 transition-colors"
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleConnect("gmail")}
                  disabled={connectingPlugin !== null}
                  className="text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white transition-all cursor-pointer shadow-md"
                >
                  {connectingPlugin !== null ? "Connecting..." : "Connect"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Next Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => router.push("/inbox")}
            disabled={!allConnected}
            className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg text-white"
            style={{
              background: allConnected ? "var(--accent)" : "var(--border-strong)",
              opacity: allConnected ? 1 : 0.6,
              cursor: allConnected ? "pointer" : "not-allowed",
            }}
          >
            Continue to Workspace
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center justify-between text-xs text-zinc-500 mt-2 px-2">
            <span>Logged in as {user?.primaryEmailAddress?.emailAddress}</span>
            <SignOutButton>
              <button className="flex items-center gap-1.5 hover:text-red-400 transition-colors cursor-pointer">
                <LogOut className="w-3.5 h-3.5" /> Sign out
              </button>
            </SignOutButton>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-zinc-100 gap-4">
        <Logo width={40} height={40} className="animate-pulse" />
        <p className="text-sm text-zinc-400">Loading...</p>
      </div>
    }>
      <OnboardingContent />
    </Suspense>
  );
}

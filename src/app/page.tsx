"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Brand } from "@/components/ui/Brand";
import { useUser } from "@clerk/nextjs";
import { useUIStore } from "@/lib/store/ui.store";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap, Bot, Calendar, Mail, Search, Command, ArrowRight,
  CheckCircle2, Sparkles, Sun, Moon, Clock, Keyboard, Send,
  Globe, Database, Play, ArrowRightLeft, X, Check, Sliders, RefreshCw, Menu
} from "lucide-react";

/* ============================================================================
   1. TYPES & DATA CONSTANTS (Hybrid-Elite-Dark Spec)
   ============================================================================ */

const HERO_SCENARIOS = [
  {
    id: 0,
    prompt: "Schedule a sync with Rahul next Thursday at 2pm and draft a follow-up.",
    badge: "Meeting Sync",
    steps: [
      "Analyzing scheduling request...",
      "Resolving contact: rahul@company.com",
      "Checking calendar availability for conflict...",
      "Reserving slot: Thursday, June 18 at 2:00 PM",
      "Created draft confirmation reply in Gmail"
    ],
    calendarDetail: { title: "Rahul Sync", time: "Thu, Jun 18, 2:00 PM" },
    emailDetail: { to: "rahul@company.com", subject: "Sync Confirmation", body: "Hi Rahul, I've scheduled our sync next Thursday at 2:00 PM. See you then!" }
  },
  {
    id: 1,
    prompt: "Summarize today's urgent messages.",
    badge: "AI Digest",
    steps: [
      "Scanning synced inbox cache (5 unread)...",
      "Classifying priorities via Gemini AI...",
      "Identified 2 High Priority threads...",
      "Compiling focus action items..."
    ],
    calendarDetail: null,
    emailDetail: { to: "You", subject: "Syncar Focus Digest", body: "• Sarah Chen: Q3 partnership proposal deck needs feedback. • Marcus Webb: Database connection pool leak reported in server." }
  },
  {
    id: 2,
    prompt: "Find hackathon emails and create a meeting from them.",
    badge: "Context Grouping",
    steps: [
      "Searching local cache (pgvector similarity)...",
      "Matched 3 threads discussing 'hackathon-prep'...",
      "Resolving attendees: Marcus, Priya...",
      "Finding open slot: Friday at 3:00 PM...",
      "Dispatched calendar invitations to team"
    ],
    calendarDetail: { title: "Hackathon Prep Sync", time: "Fri, Jun 19, 3:00 PM" },
    emailDetail: { to: "marcus@company.com, priya@company.com", subject: "Hackathon Prep Sync", body: "Hey team, creating this sync session based on our hackathon email discussions." }
  }
];

const PRESETS = [
  {
    title: "Schedule Sync",
    prompt: "Schedule meeting with Rahul next Thursday at 2pm and send follow-up",
    steps: [
      "Parsed scheduling intent.",
      "Resolved contact: Rahul (rahul@example.com)",
      "Checked calendars: No conflicts detected.",
      "Created GCal event: Thursday, June 18 at 2:00 PM.",
      "Queued Gmail draft reply confirmation."
    ],
    result: {
      event: { title: "Rahul Sync", time: "Thursday, Jun 18, 2:00 PM - 2:30 PM" },
      email: { to: "rahul@example.com", subject: "Sync: Thursday 2:00 PM", body: "Hi Rahul, I've scheduled our sync next Thursday at 2:00 PM. See you then!" }
    }
  },
  {
    title: "Summarize Inbox",
    prompt: "Summarize today's important emails",
    steps: [
      "Scanned 5 unread local email threads.",
      "Classified 2 High Priority threads.",
      "Compiled executive focus summary brief."
    ],
    result: {
      digest: [
        { from: "Sarah Chen", priority: "HIGH", text: "Urgent feedback requested on Q3 partnership deck." },
        { from: "Marcus Webb", priority: "HIGH", text: "Reported database connection pool leak SYN-2847." },
        { from: "Priya Sharma", priority: "MEDIUM", text: "Sent design assets for onboarding layouts." }
      ]
    }
  },
  {
    title: "Group Hackathon",
    prompt: "Find all emails related to the hackathon and create a meeting from them",
    steps: [
      "Matched 3 emails using vector search.",
      "Identified attendees: marcus@syncar.ai, priya@syncar.ai",
      "Calculated open intersection slot: Friday at 3:00 PM.",
      "Created 'Hackathon Prep Sync' calendar event."
    ],
    result: {
      event: { title: "Hackathon Prep Sync", time: "Friday, Jun 19, 3:00 PM - 4:00 PM" },
      email: { to: "marcus@syncar.ai, priya@syncar.ai", subject: "Hackathon Prep Sync", body: "Hi Marcus and Priya, let's sync up Friday at 3:00 PM to align on hackathon details." }
    }
  }
];

const ONBOARDING_STEPS = [
  { step: "01", title: "Authenticate with Clerk", desc: "Secure multi-tenant workspace isolation. Zero password footprints stored." },
  { step: "02", title: "Google Workspace Handscheck", desc: "Link Gmail updates and Calendar logs via secure OAuth credentials." },
  { step: "03", title: "Local Cache Ingestion", desc: "Local PostgreSQL DB creates high-speed indices for vector and semantic search." }
];

/* ============================================================================
   2. MAIN EXPORT COMPONENT
   ============================================================================ */

export default function LandingPage() {
  const { isSignedIn = false, isLoaded } = useUser();
  const { theme } = useUIStore();

  // Global Page States
  const [toast, setToast] = useState<{ message: string; shortcut?: string } | null>(null);
  const [workspaceView, setWorkspaceView] = useState<"inbox" | "calendar" | "ai">("inbox");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const toastTimeoutRef = useRef<any>(null);

  // Toast notifier helper
  const showToast = (message: string, shortcut?: string) => {
    setToast({ message, shortcut });
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => setToast(null), 3000);
  };

  // Keyboard Event Listeners for Page Speed Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      const key = e.key.toLowerCase();
      
      if (key === "k" || (e.metaKey && key === "k") || (e.ctrlKey && key === "k")) {
        e.preventDefault();
        setPaletteOpen(prev => !prev);
        showToast("Toggled Command Palette", "⌘K");
      } else if (key === "i") {
        setWorkspaceView("inbox");
        showToast("Switched Workspace to Inbox", "I");
      } else if (key === "c") {
        setWorkspaceView("calendar");
        showToast("Switched Workspace to Calendar", "C");
      } else if (key === "a") {
        setWorkspaceView("ai");
        showToast("Switched Workspace to AI Assistant", "A");
      } else if (e.key === "Escape") {
        setPaletteOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  return (
    <div 
      className="landing-page min-h-screen overflow-x-hidden font-sans" 
      style={{ background: "var(--canvas)", color: "var(--ink)" }}
    >
      {/* Navigation */}
      <NavigationBar isLoaded={isLoaded} isSignedIn={isSignedIn} theme={theme} />

      {/* Floating shortcut toast notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border border-[#eceae4] shadow-sm bg-white"
          >
            <Zap className="w-4 h-4 text-[#1c1c1c] animate-pulse" />
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#1c1c1c]">{toast.message}</span>
              {toast.shortcut && (
                <span className="text-xs text-[#1c1c1c]/60 font-sans">
                  Shortcut: <kbd className="bg-[#f2eee5] px-1 py-0.5 rounded text-[#1c1c1c] font-mono font-bold">{toast.shortcut}</kbd>
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>



      {/* Hero Section */}
      <HeroSection isLoaded={isLoaded} isSignedIn={isSignedIn} />

      {/* Workflow Transformation Comparison */}
      <WorkflowTransformation />

      {/* AI Command Center */}
      <AICommandCenter />

      {/* Chaos to Clarity Priority Filter */}
      <ChaosToClarity />

      {/* Calendar Intelligence context extractor */}
      <CalendarIntelligence showToast={showToast} />

      {/* Unified Workspace connected preview */}
      <UnifiedWorkspaceSection workspaceView={workspaceView} setWorkspaceView={setWorkspaceView} />

      {/* Speed Layer (Shortcuts Showcase) */}
      <SpeedLayer setPaletteOpen={setPaletteOpen} setWorkspaceView={setWorkspaceView} showToast={showToast} />

      {/* Future of Work (Local Architecture Engine) */}
      <FutureOfWork />

      {/* Setup Step-by-Step */}
      <OnboardingSection />

      {/* Action Center Bottom CTA */}
      <ActionCenterSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

/* ============================================================================
   3. SUBCOMPONENTS
   ============================================================================ */

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#1c1c1c]/5 text-[#1c1c1c]/80 border border-[#1c1c1c]/10 mb-4 font-sans">
      {children}
    </span>
  );
}

/**
 * Top navigation bar (Hybrid-Elite-Dark style)
 */
function NavigationBar({ isLoaded, isSignedIn, theme }: { isLoaded: boolean; isSignedIn: boolean; theme: string }) {
  const { toggleTheme } = useUIStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
          scrolled 
            ? "bg-white/80 dark:bg-[#010102]/80 backdrop-blur-md border-b border-[#eceae4]/80 dark:border-[#23252a]/80 shadow-[0_2px_12px_-3px_rgba(0,0,0,0.04)]" 
            : "bg-transparent"
        }`}
      >
        <div className="max-w-5xl mx-auto h-full px-6 md:px-12 w-full">
          <div className="flex lg:grid lg:grid-cols-[120px_1fr_260px] items-center justify-between h-full w-full">
            {/* Column 1: Brand */}
            <div className="flex justify-start items-center">
              <Brand size="sm" />
            </div>

            {/* Column 2: Center navigation links */}
            <div className="hidden lg:flex justify-center items-center gap-6 text-sm font-medium text-[#1c1c1c]/70 dark:text-[#f7f8f8]/70">
              <a href="#transform" className="hover:text-[#1c1c1c] dark:hover:text-[#f7f8f8] transition-colors duration-200 whitespace-nowrap">Compare</a>
              <a href="#commands" className="hover:text-[#1c1c1c] dark:hover:text-[#f7f8f8] transition-colors duration-200 whitespace-nowrap">Commands</a>
              <a href="#clarity" className="hover:text-[#1c1c1c] dark:hover:text-[#f7f8f8] transition-colors duration-200 whitespace-nowrap">AI Filter</a>
              <a href="#intelligence" className="hover:text-[#1c1c1c] dark:hover:text-[#f7f8f8] transition-colors duration-200 whitespace-nowrap">Calendar</a>
              <a href="#workspace" className="hover:text-[#1c1c1c] dark:hover:text-[#f7f8f8] transition-colors duration-200 whitespace-nowrap">Workspace</a>
              <a href="#speed" className="hover:text-[#1c1c1c] dark:hover:text-[#f7f8f8] transition-colors duration-200 whitespace-nowrap">Speed Layer</a>
            </div>

            {/* Column 3: Actions */}
            <div className="flex justify-end items-center gap-3">
              <div className="hidden sm:flex items-center gap-2">
                {!isLoaded && (
                  <div className="animate-pulse flex items-center gap-2">
                    <div className="h-8 w-14 bg-[#1c1c1c]/5 dark:bg-[#f7f8f8]/10 rounded" />
                    <div className="h-9 w-24 bg-[#1c1c1c]/10 dark:bg-[#f7f8f8]/20 rounded-md" />
                  </div>
                )}
                {isLoaded && !isSignedIn && (
                  <>
                    <Link
                      href="/sign-in"
                      className="text-sm font-medium px-3 py-1.5 rounded text-[#1c1c1c]/70 dark:text-[#f7f8f8]/70 hover:text-[#1c1c1c] dark:hover:text-[#f7f8f8] transition-colors duration-200 whitespace-nowrap"
                    >
                      Sign in
                    </Link>
                    <Link
                      href="/sign-up"
                      className="btn-lovable-primary px-3.5 py-2 text-sm font-medium rounded-md whitespace-nowrap"
                    >
                      Get started
                    </Link>
                  </>
                )}
                {isLoaded && isSignedIn && (
                  <Link
                    href="/inbox"
                    className="btn-lovable-primary px-3.5 py-2 text-sm font-medium rounded-md whitespace-nowrap"
                  >
                    Go to Workspace
                  </Link>
                )}
              </div>

              <button
                onClick={toggleTheme}
                className="p-2 rounded-md border border-[#eceae4] dark:border-[#23252a] hover:bg-[#fafafa] dark:hover:bg-[#141516] hover:border-[#1c1c1c]/25 dark:hover:border-[#f7f8f8]/25 transition-all text-[#1c1c1c]/70 dark:text-[#f7f8f8]/70 hover:text-[#1c1c1c] dark:hover:text-[#f7f8f8]"
                title="Toggle Theme"
              >
                {mounted ? (
                  theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />
                ) : (
                  <div className="w-4 h-4" />
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(prev => !prev)}
                className="lg:hidden p-2 rounded-md border border-[#eceae4] dark:border-[#23252a] hover:bg-[#fafafa] dark:hover:bg-[#141516] transition-all text-[#1c1c1c]/70 dark:text-[#f7f8f8]/70 hover:text-[#1c1c1c] dark:hover:text-[#f7f8f8]"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Dropdown Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="fixed top-16 left-0 right-0 z-40 bg-white dark:bg-[#010102] border-b border-[#eceae4] dark:border-[#23252a] shadow-lg lg:hidden p-6 flex flex-col gap-4 text-left"
          >
            <div className="flex flex-col gap-3.5 text-sm font-medium text-[#1c1c1c]/70 dark:text-[#f7f8f8]/70">
              <a 
                href="#transform" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#1c1c1c] dark:hover:text-[#f7f8f8] transition-colors py-1.5 border-b border-gray-50 dark:border-[#23252a]"
              >
                Compare
              </a>
              <a 
                href="#commands" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#1c1c1c] dark:hover:text-[#f7f8f8] transition-colors py-1.5 border-b border-gray-50 dark:border-[#23252a]"
              >
                Commands
              </a>
              <a 
                href="#clarity" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#1c1c1c] dark:hover:text-[#f7f8f8] transition-colors py-1.5 border-b border-gray-50 dark:border-[#23252a]"
              >
                AI Filter
              </a>
              <a 
                href="#intelligence" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#1c1c1c] dark:hover:text-[#f7f8f8] transition-colors py-1.5 border-b border-gray-50 dark:border-[#23252a]"
              >
                Calendar
              </a>
              <a 
                href="#workspace" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#1c1c1c] dark:hover:text-[#f7f8f8] transition-colors py-1.5 border-b border-gray-50 dark:border-[#23252a]"
              >
                Workspace
              </a>
              <a 
                href="#speed" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#1c1c1c] dark:hover:text-[#f7f8f8] transition-colors py-1.5"
              >
                Speed Layer
              </a>
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-[#eceae4] dark:border-[#23252a]">
              {isLoaded && !isSignedIn && (
                <>
                  <Link
                    href="/sign-in"
                    className="w-full text-center text-sm font-medium py-2 rounded border border-[#eceae4] dark:border-[#23252a] text-[#1c1c1c]/70 dark:text-[#f7f8f8]/70 hover:text-[#1c1c1c] dark:hover:text-[#f7f8f8]"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/sign-up"
                    className="w-full text-center btn-lovable-primary py-2.5 text-sm font-medium rounded-md"
                  >
                    Get started
                  </Link>
                </>
              )}
              {isLoaded && isSignedIn && (
                <Link
                  href="/inbox"
                  className="w-full text-center btn-lovable-primary py-2.5 text-sm font-medium rounded-md"
                >
                  Go to Workspace
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * Immersive full-screen Hero section with active node orchestrator
 */
function HeroSection({ isLoaded, isSignedIn }: { isLoaded: boolean; isSignedIn: boolean }) {
  // Scenario Typing State Machine
  const [typedPrompt, setTypedPrompt] = useState("");
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [state, setState] = useState<"typing" | "ingest" | "resolving" | "success">("typing");
  const currentScenario = HERO_SCENARIOS[scenarioIdx];

  useEffect(() => {
    let timer: any;
    setTypedPrompt("");
    setState("typing");
    
    let charIdx = 0;
    const promptText = currentScenario.prompt;
    
    const typePrompt = () => {
      if (charIdx < promptText.length) {
        setTypedPrompt(promptText.slice(0, charIdx + 1));
        charIdx++;
        timer = setTimeout(typePrompt, 25);
      } else {
        setState("ingest");
        timer = setTimeout(() => {
          setState("resolving");
          timer = setTimeout(() => {
            setState("success");
            timer = setTimeout(() => {
              setScenarioIdx(prev => (prev + 1) % HERO_SCENARIOS.length);
            }, 4000); // Hold success for 4s
          }, 2000); // 2s active logs
        }, 800); // 800ms ingest delay
      }
    };
    
    timer = setTimeout(typePrompt, 600);
    return () => clearTimeout(timer);
  }, [scenarioIdx]);

  return (
    <section 
      className="relative flex flex-col items-center justify-center min-h-screen pt-28 pb-16 px-6 text-center overflow-hidden border-b border-[#eceae4]"
      style={{ background: "var(--canvas)" }}
    >
      <div className="relative z-10 flex flex-col items-center max-w-5xl w-full">
        {/* Active Engine Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 border border-[#eceae4] bg-white">
          <span className={`w-1.5 h-1.5 rounded-full ${state === "success" ? "bg-emerald-500 animate-pulse" : "bg-[#1c1c1c]"}`} />
          <span className="text-[#1c1c1c]/80 font-sans text-sm font-medium">
            Orchestrator: <span className="text-[#1c1c1c] font-semibold">{state === "typing" ? "Ingesting" : state === "ingest" ? "Parsing" : state === "resolving" ? "Executing" : "Resolved"}</span>
          </span>
        </div>

        {/* Aggressive Display Headline */}
        <h1 className="display-1 max-w-4xl mb-6 text-[#1c1c1c] tracking-[-0.04em] leading-[1.05] font-semibold">
          Stop managing email.
          <br />
          <span className="opacity-50">Start managing outcomes.</span>
        </h1>

        <p className="body-md max-w-2xl mb-10 text-[#1c1c1c]/80 leading-relaxed font-sans">
          Syncar is the local-first command layer for communication. Connect Gmail and Google Calendar to turn scattered threads into high-speed, automated AI workflows.
        </p>

        {/* Call to Actions (Hero rounded exceptions) */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-16">
          {isLoaded && !isSignedIn && (
            <>
              <Link href="/sign-up" className="btn-lovable-primary px-6 py-3 text-sm font-medium rounded-md inline-flex items-center gap-2">
                Connect Workspace Free
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#transform" className="btn-lovable-outline px-6 py-3 text-sm font-medium rounded-md text-[#1c1c1c] inline-flex items-center gap-2">
                See Comparative Flow
              </a>
            </>
          )}
          {isLoaded && isSignedIn && (
            <Link href="/inbox" className="btn-lovable-primary px-6 py-3 text-sm font-medium rounded-md inline-flex items-center gap-2">
              Enter My Workspace
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {/* Immersive Living Workflow Canvas */}
        <div 
          className="w-full max-w-4xl rounded-xl border border-[#eceae4] overflow-hidden relative shadow-sm flex flex-col p-8 bg-white"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-[#eceae4] pb-4 mb-6">
            <span className="text-sm font-medium text-[#1c1c1c]/70">Interactive simulator</span>
            <div className="text-sm bg-[#1c1c1c]/5 text-[#1c1c1c] font-medium px-2.5 py-0.5 rounded-md border border-[#1c1c1c]/10 font-sans">
              {currentScenario.badge}
            </div>
          </div>

          {/* Living Canvas Core layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative min-h-[200px]">
            
            {/* Input Node (Left) */}
            <div className="md:col-span-4 flex flex-col gap-2 text-left z-10">
              <span className="text-sm font-medium text-[#1c1c1c]/60">Inbound prompt</span>
              <div 
                className="p-4 rounded-lg border border-[#eceae4] min-h-[90px] flex items-start gap-2 relative bg-[#f7f4ed] shadow-inner"
              >
                <div className="text-sm font-normal text-[#1c1c1c]/90 leading-relaxed font-sans">
                  "{typedPrompt}"
                  {state === "typing" && <span className="animate-pulse text-[#1c1c1c] font-bold">|</span>}
                </div>
              </div>
            </div>

            {/* AI Engine Processing Node (Center) */}
            <div className="md:col-span-4 flex flex-col items-center justify-center relative z-10">
              <div className="relative w-20 h-20 flex items-center justify-center">
                {/* Subtle solid ring */}
                <div className={`absolute inset-0 rounded-full border transition-colors duration-500 ${state === "success" ? "border-emerald-500/20" : "border-[#eceae4]"}`} />
                
                {/* Core Sphere */}
                <div 
                  className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-500 ${
                    state === "success" 
                      ? "bg-emerald-555/5 border-emerald-500 text-emerald-600 shadow-[0_0_20px_rgba(16,185,129,0.05)]" 
                      : state === "resolving" || state === "ingest"
                      ? "bg-[#1c1c1c] border-[#1c1c1c] text-[#fcfbf8] animate-pulse"
                      : "bg-[#fafafa] border-[#eceae4] text-[#1c1c1c]/60"
                  }`}
                >
                  <Bot className="w-6 h-6" />
                </div>
              </div>

              {/* Action logs */}
              <div className="h-6 mt-4 w-full flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  {(state === "resolving" || state === "ingest") && (
                    <motion.span 
                      key="resolving-log"
                      initial={{ y: 8, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -8, opacity: 0 }}
                      className="text-sm text-[#1c1c1c]/80 font-medium font-sans"
                    >
                      {currentScenario.steps[0]}
                    </motion.span>
                  )}
                  {state === "success" && (
                    <motion.span 
                      key="success-log"
                      initial={{ y: 8, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="text-sm text-emerald-600 font-semibold font-sans"
                    >
                      ✔ Completed in 1.2s
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Resolved Targets Node (Right) */}
            <div className="md:col-span-4 flex flex-col gap-3 text-left relative z-10">
              <span className="text-sm font-medium text-[#1c1c1c]/60">Executed action</span>
              
              <AnimatePresence mode="wait">
                {state === "success" ? (
                  <motion.div 
                    key="action-outcome"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    className="space-y-2 w-full"
                  >
                    {/* Calendar slot creation */}
                    {currentScenario.calendarDetail && (
                      <div className="p-3 rounded-lg border border-emerald-200 bg-emerald-50/30 flex items-start gap-2.5">
                        <Calendar className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-[#1c1c1c]">{currentScenario.calendarDetail.title}</p>
                          <p className="text-sm text-[#1c1c1c]/70 flex items-center gap-1 mt-0.5 font-sans">
                            <Clock className="w-3.5 h-3.5 text-[#1c1c1c]/50" /> {currentScenario.calendarDetail.time}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Email draft created */}
                    {currentScenario.emailDetail && (
                      <div className="p-3 rounded-lg border border-[#eceae4] bg-white flex items-start gap-2.5 max-w-full">
                        <Mail className="w-4 h-4 text-[#1c1c1c] mt-0.5 flex-shrink-0" />
                        <div className="overflow-hidden flex-1 text-sm">
                          <p className="text-sm text-[#1c1c1c]/60">To: {currentScenario.emailDetail.to}</p>
                          <p className="font-semibold text-[#1c1c1c] truncate mt-0.5">{currentScenario.emailDetail.subject}</p>
                          <p className="text-sm text-[#1c1c1c]/80 truncate mt-0.5 italic">"{currentScenario.emailDetail.body}"</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 border border-dashed border-[#eceae4] rounded-lg text-center h-[160px] text-zinc-400 w-full">
                    <Clock className="w-4 h-4 mb-2 animate-spin text-[#1c1c1c]/50" />
                    <span className="text-sm font-sans text-[#1c1c1c]/60">Awaiting orchestrator...</span>
                  </div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Section 1: Workflow Transformation (Traditional vs Syncar)
 */
function WorkflowTransformation() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [timeText, setTimeText] = useState("0m 00s");
  const [activeStep, setActiveStep] = useState(-1);
  const [syncarStatus, setSyncarStatus] = useState<"idle" | "running" | "success">("idle");
  
  const traditionalSteps = [
    { title: "Context Retrieval", desc: "Read email thread, identify target slot details ('Thursday at 2 PM')." },
    { title: "Silo Transition", desc: "Switch browser tabs, open Google Calendar grid, load target week." },
    { title: "Manual Coordinate Entry", desc: "Double check conflicts, double-click empty grid, copy recipient emails." },
    { title: "Context Confirmation", desc: "Save calendar invite, switch back to Gmail tab, draft confirmation reply." }
  ];

  const triggerSimulation = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setClickCount(0);
    setTimeText("0m 00s");
    setActiveStep(0);
    setSyncarStatus("idle");
    
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < traditionalSteps.length) {
        setActiveStep(step);
        setClickCount(prev => prev + 4 + Math.floor(Math.random() * 2));
        const elapsedSec = step * 64;
        const mins = Math.floor(elapsedSec / 60);
        const secs = elapsedSec % 60;
        setTimeText(`${mins}m ${secs < 10 ? '0' : ''}${secs}s`);
      } else {
        clearInterval(interval);
        setClickCount(17);
        setTimeText("4m 12s");
        setIsPlaying(false);
      }
    }, 900);
  };

  const triggerSyncar = () => {
    if (syncarStatus !== "idle") return;
    setSyncarStatus("running");
    setTimeout(() => {
      setSyncarStatus("success");
    }, 1000);
  };

  return (
    <section id="transform" className="px-6 py-24 border-b border-[#eceae4] bg-transparent">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <SectionEyebrow>Comparison</SectionEyebrow>
          <h2 className="heading-1 mt-2 text-[#1c1c1c] font-semibold tracking-[-0.03em]">Friction Comparison</h2>
          <p className="body-md text-[#1c1c1c]/80 max-w-xl mx-auto mt-3 font-sans">
            Siloed apps introduce coordination friction. Compare step-by-step clicks side-by-side.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Traditional Panel */}
          <div className="bg-white border border-[#eceae4] rounded-xl p-8 flex flex-col justify-between relative shadow-sm">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#eceae4] mb-8">
                <span className="text-sm font-semibold text-[#1c1c1c]/85 flex items-center gap-1.5">
                  <ArrowRightLeft className="w-3.5 h-3.5" /> Siloed Gmail + Calendar
                </span>
                <span className="text-sm text-[#1c1c1c]/60 font-semibold">17 steps</span>
              </div>

              {/* Progress steps */}
              <div className="space-y-4 pr-2 text-left">
                {traditionalSteps.map((step, idx) => (
                  <div 
                    key={step.title} 
                    className={`p-3.5 rounded-lg border transition-all duration-200 ${
                      activeStep === idx 
                        ? "bg-[#fafafa] border-[#1c1c1c]/30 text-[#1c1c1c] font-semibold" 
                        : idx < activeStep 
                        ? "bg-[#fafafa]/50 border-[#eceae4]/20 text-[#1c1c1c]/40 line-through opacity-45" 
                        : "bg-transparent border-transparent text-[#1c1c1c]/70"
                    }`}
                  >
                    <h4 className="text-sm font-semibold font-sans text-[#1c1c1c]">{step.title}</h4>
                    <p className="text-sm text-[#1c1c1c]/70 mt-1 leading-normal font-sans">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 border-t border-[#eceae4] pt-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-[#1c1c1c]/60 block">Clicks</span>
                  <p className="text-xl font-semibold tracking-tight text-[#1c1c1c] font-sans">{clickCount}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-[#1c1c1c]/60 block">Duration</span>
                  <p className="text-xl font-semibold tracking-tight text-[#1c1c1c] font-sans">{timeText}</p>
                </div>
              </div>

              <button 
                onClick={triggerSimulation}
                disabled={isPlaying}
                className="w-full btn-lovable-outline px-4 py-2.5 text-sm font-medium rounded-md text-[#1c1c1c] transition-all flex items-center justify-center gap-2"
              >
                {isPlaying ? "Simulating clicks..." : "Simulate clicks"}
              </button>
            </div>
          </div>

          {/* Syncar Panel */}
          <div className="bg-white border border-[#eceae4] rounded-xl p-8 flex flex-col justify-between relative shadow-sm">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#eceae4] mb-8">
                <span className="text-sm font-semibold text-[#1c1c1c] flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" /> Syncar Flow
                </span>
                <span className="text-sm text-[#1c1c1c]/60 font-semibold">1 Action</span>
              </div>

              <div className="p-6 rounded-lg border border-[#eceae4] bg-[#f7f4ed] flex flex-col gap-3 min-h-[160px] justify-center text-left">
                <span className="text-sm font-medium text-[#1c1c1c]/60">Natural language prompt</span>
                <div className="text-sm font-normal text-[#1c1c1c]/90 p-3 rounded bg-white border border-[#eceae4] select-none font-sans">
                  "Schedule meeting with Sarah next Thursday afternoon"
                </div>

                <div className="flex items-center gap-2 text-sm text-[#1c1c1c]/70 mt-1 font-sans">
                  <Bot className="w-3.5 h-3.5 text-[#1c1c1c]" />
                  <span>Syncar maps intent, creates event, and drafts reply confirmation.</span>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-[#eceae4] pt-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-[#1c1c1c]/60 block">Clicks</span>
                  <p className="text-xl font-semibold tracking-tight text-[#1c1c1c] font-sans">1 Action</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-[#1c1c1c]/60 block">Duration</span>
                  <p className="text-xl font-semibold tracking-tight text-[#1c1c1c] font-sans">1.8 seconds</p>
                </div>
              </div>

              <button 
                onClick={triggerSyncar}
                disabled={syncarStatus !== "idle"}
                className={`w-full text-sm font-medium transition-all duration-300 py-2.5 rounded-md ${
                  syncarStatus === "success" 
                    ? "bg-emerald-50 border border-emerald-200 text-emerald-700 cursor-default" 
                    : syncarStatus === "running"
                    ? "bg-[#f2eee5] border border-[#eceae4] text-[#1c1c1c]/60 animate-pulse"
                    : "btn-lovable-primary"
                }`}
              >
                {syncarStatus === "success" ? (
                  <span className="flex items-center justify-center gap-1.5"><Check className="w-4 h-4" /> Workflow Dispatched</span>
                ) : syncarStatus === "running" ? (
                  <span>Executing...</span>
                ) : (
                  <span className="flex items-center justify-center gap-1.5"><Sparkles className="w-3.5 h-3.5 animate-pulse" /> Execute in 1 click</span>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/**
 * Section 2: AI Command Center (Interactive chat simulator)
 */
function AICommandCenter() {
  const [promptInput, setPromptInput] = useState("");
  const [activeSteps, setActiveSteps] = useState<string[]>([]);
  const [executing, setExecuting] = useState(false);
  const [resolved, setResolved] = useState(false);
  const [activePreset, setActivePreset] = useState<number | null>(null);

  const handlePresetClick = (idx: number) => {
    if (executing) return;
    setActivePreset(idx);
    setResolved(false);
    setExecuting(true);
    setPromptInput("");
    setActiveSteps([]);

    const p = PRESETS[idx];
    let i = 0;
    
    // Typing simulation
    const typeInterval = setInterval(() => {
      setPromptInput(prev => p.prompt.slice(0, i + 1));
      i++;
      if (i >= p.prompt.length) {
        clearInterval(typeInterval);
        
        // Progress steps simulator
        let stepIdx = 0;
        const stepInterval = setInterval(() => {
          setActiveSteps(prev => [...prev, p.steps[stepIdx]]);
          stepIdx++;
          if (stepIdx >= p.steps.length) {
            clearInterval(stepInterval);
            setExecuting(false);
            setResolved(true);
          }
        }, 450);
      }
    }, 20);
  };

  return (
    <section id="commands" className="px-6 py-24 border-b border-[#eceae4] bg-transparent">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <SectionEyebrow>Command workspace</SectionEyebrow>
          <h2 className="heading-1 mt-2 text-[#1c1c1c] font-semibold tracking-[-0.03em]">AI Command Center</h2>
          <p className="body-md text-[#1c1c1c]/80 max-w-xl mx-auto mt-3 font-sans">
            Trigger visual outcomes instantly. Click on one of the presets to watch the assistant resolve the action.
          </p>
        </div>

        {/* Presets List */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {PRESETS.map((p, idx) => (
            <button
              key={p.title}
              onClick={() => handlePresetClick(idx)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all border ${
                activePreset === idx 
                  ? "bg-[#1c1c1c] border-[#1c1c1c] text-[#fcfbf8]" 
                  : "bg-white border-[#eceae4] text-[#1c1c1c]/80 hover:border-[#1c1c1c]/30"
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>

        {/* Chat assistant container */}
        <div className="w-full max-w-4xl mx-auto rounded-xl border border-[#eceae4] overflow-hidden shadow-sm bg-white">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#eceae4] bg-[#f7f4ed]">
            <span className="text-sm font-semibold text-[#1c1c1c] flex items-center gap-2">
              <Bot className="w-4 h-4 text-[#1c1c1c]" /> Syncar AI Assistant
            </span>
            <span className="text-sm font-semibold text-[#1c1c1c]/60">Interactive shell</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[320px]">
            
            {/* Assistant Dialog Pane (Left 7 Columns) */}
            <div className="md:col-span-7 p-6 border-b md:border-b-0 md:border-r border-[#eceae4] flex flex-col justify-between bg-white min-h-[260px] text-left">
              <div className="space-y-5">
                {/* User Message */}
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded bg-[#f2eee5] flex items-center justify-center font-semibold text-sm text-[#1c1c1c]/80 flex-shrink-0 font-sans">U</div>
                  <div className="text-sm font-normal text-[#1c1c1c]/90 leading-relaxed font-sans">
                    {promptInput || "Select a preset above to ask the assistant..."}
                    {executing && !activeSteps.length && <span className="animate-pulse text-[#1c1c1c]">|</span>}
                  </div>
                </div>

                {/* Assistant Processing Steps */}
                {activeSteps.length > 0 && (
                  <div className="flex items-start gap-3 border-t border-[#eceae4] pt-4">
                    <div className="w-7 h-7 rounded bg-[#1c1c1c] text-white flex items-center justify-center flex-shrink-0">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                    <div className="space-y-2">
                      <span className="text-sm font-medium text-[#1c1c1c]/60 block">AI progress</span>
                      {activeSteps.map((step, idx) => (
                        <div key={idx} className="text-sm text-[#1c1c1c]/80 flex items-center gap-2 leading-relaxed font-sans">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#1c1c1c] flex-shrink-0" />
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {!executing && !resolved && (
                <div className="text-sm text-[#1c1c1c]/60 italic select-none font-sans">
                  Preset actions show checklist completions inside the assistant thread.
                </div>
              )}
            </div>

            {/* Resolved outcome container (Right 5 Columns) */}
            <div className="md:col-span-5 p-6 flex flex-col justify-center bg-[#fafafa] min-h-[220px] text-left">
              <span className="text-sm font-medium text-[#1c1c1c]/60 mb-4 block">Resolution outcomes</span>

              <AnimatePresence mode="wait">
                {resolved && activePreset !== null ? (
                  <motion.div
                    key={activePreset}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="space-y-4"
                  >
                    {PRESETS[activePreset].result.event && (
                      <div className="p-4 rounded-lg border border-[#eceae4] bg-white">
                        <span className="text-sm text-[#1c1c1c] font-semibold flex items-center gap-1.5 mb-2">
                          <Calendar className="w-3.5 h-3.5" /> Calendar block created
                        </span>
                        <h4 className="text-sm font-semibold text-[#1c1c1c] font-sans">{PRESETS[activePreset].result.event.title}</h4>
                        <p className="text-sm text-[#1c1c1c]/80 mt-1 flex items-center gap-1 font-sans">
                          <Clock className="w-3.5 h-3.5 text-[#1c1c1c]/50" /> {PRESETS[activePreset].result.event.time}
                        </p>
                      </div>
                    )}

                    {PRESETS[activePreset].result.email && (
                      <div className="p-4 rounded-lg border border-[#eceae4] bg-white text-sm">
                        <span className="text-sm text-[#1c1c1c] font-semibold flex items-center gap-1.5 mb-2">
                          <Mail className="w-3.5 h-3.5" /> Gmail draft confirmation
                        </span>
                        <p className="text-sm text-[#1c1c1c]/60 font-sans">To: {PRESETS[activePreset].result.email.to}</p>
                        <p className="font-semibold text-[#1c1c1c] mt-0.5 truncate font-sans">{PRESETS[activePreset].result.email.subject}</p>
                        <p className="text-sm text-[#1c1c1c]/80 mt-1.5 italic p-2 rounded bg-[#f7f4ed] border border-[#eceae4] leading-relaxed font-sans">
                          "{PRESETS[activePreset].result.email.body}"
                        </p>
                      </div>
                    )}

                    {PRESETS[activePreset].result.digest && (
                      <div className="p-4 rounded-lg border border-[#eceae4] bg-white space-y-3">
                        <span className="text-sm text-[#1c1c1c] font-semibold flex items-center gap-1.5 mb-1.5">
                          <Bot className="w-3.5 h-3.5" /> Focus Digest Brief
                        </span>
                        {PRESETS[activePreset].result.digest.map((d, index) => (
                          <div key={index} className="border-t border-[#eceae4] pt-2 first:border-0 first:pt-0">
                            <div className="flex items-center justify-between mb-0.5 font-sans">
                              <span className="text-sm font-semibold text-[#1c1c1c]">{d.from}</span>
                              <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-[#1c1c1c]/5 text-[#1c1c1c]">{d.priority}</span>
                            </div>
                            <p className="text-sm text-[#1c1c1c]/80 leading-snug font-sans">{d.text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 border border-dashed border-[#eceae4] rounded-lg text-center h-[200px] text-[#1c1c1c]/40">
                    <Sliders className="w-5 h-5 text-[#eceae4] mb-2" />
                    <span className="text-sm font-sans">Awaiting prompt submission...</span>
                  </div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Section 3: From Chaos to Clarity (Priority Ingestion Visualizer)
 */
function ChaosToClarity() {
  const [isSorted, setIsSorted] = useState(false);
  const [isSorting, setIsSorting] = useState(false);

  const rawEmails = [
    { id: 1, from: "Marcus Webb", subject: "CRITICAL: Database connection pool leak SYN-2847", desc: "Our database is capping connections on our Neon postgres clusters.", priority: "HIGH" },
    { id: 2, from: "Newsletter Digest", subject: "Vercel Next.js 16 updates", desc: "Here are the top changes you need to know about Next.js and Tailwind.", priority: "LOW" },
    { id: 3, from: "Sarah Chen", subject: "Q3 Partnership Pitch Deck Review", desc: "Let's review the investment slide deck and schedule a alignment slot.", priority: "HIGH" },
    { id: 4, from: "Priya Sharma", subject: "Lunch tomorrow at cafe?", desc: "Hey! Let me know if you want to grab tacos at the cafe tomorrow at 1 PM.", priority: "MEDIUM" }
  ];

  const runSorting = () => {
    if (isSorting) return;
    setIsSorting(true);
    setIsSorted(false);
    setTimeout(() => {
      setIsSorting(false);
      setIsSorted(true);
    }, 1500);
  };

  return (
    <section id="clarity" className="px-6 py-24 border-b border-[#eceae4] bg-transparent">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <SectionEyebrow>Priority classification</SectionEyebrow>
          <h2 className="heading-1 mt-2 text-[#1c1c1c] font-semibold tracking-[-0.03em]">From Chaos to Clarity</h2>
          <p className="body-md text-[#1c1c1c]/80 max-w-xl mx-auto mt-3 font-sans">
            Say goodbye to unsorted inboxes. Syncar categorizes priority queues, letting you focus on the details that require actions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Flow Trigger (5 Columns) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <h3 className="heading-2 text-[#1c1c1c] font-semibold tracking-[-0.02em]">Clean workspace priorities</h3>
            <p className="body-sm text-[#1c1c1c]/80 leading-relaxed font-sans">
              When emails sync locally, background workers map key metadata to Gemini. Syncar analyzes thread context, calendar slots, and contact values to organize them into priorities.
            </p>

            <button
              onClick={runSorting}
              disabled={isSorting}
              className="px-5 py-2.5 inline-flex items-center gap-2 text-sm font-medium rounded-md bg-[#1c1c1c] text-white hover:bg-[#1c1c1c]/90 transition-all"
            >
              {isSorting ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Classifying...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Run priority classification</span>
                </>
              )}
            </button>
          </div>

          {/* Right Column: Visualizer Box (7 Columns) */}
          <div 
            className="lg:col-span-7 rounded-xl border border-[#eceae4] p-6 relative overflow-hidden bg-white min-h-[340px] flex flex-col justify-between shadow-sm"
          >
            {/* Header bar */}
            <div className="flex items-center justify-between pb-4 border-b border-[#eceae4]">
              <span className="text-sm font-semibold text-[#1c1c1c] flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-[#1c1c1c]" /> Local cache inbox
              </span>
              <span className="text-sm bg-[#1c1c1c]/5 text-[#1c1c1c] font-medium px-2.5 py-0.5 rounded-md border border-[#1c1c1c]/10">
                {isSorted ? "Classified" : isSorting ? "Parsing..." : "Pending Classify"}
              </span>
            </div>

            <div className="my-6 relative flex-1 flex flex-col justify-center text-left">
              <AnimatePresence mode="wait">
                {!isSorted && !isSorting ? (
                  // Initial chaotic list
                  <motion.div 
                    key="unsorted"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-2.5"
                  >
                    {rawEmails.map((item) => (
                      <div 
                        key={item.id}
                        className="p-3.5 rounded-lg border border-[#eceae4] bg-[#fafafa] flex items-center justify-between"
                      >
                        <div className="overflow-hidden flex-1 pr-4 text-sm font-sans">
                          <span className="text-sm font-semibold text-[#1c1c1c]/60">{item.from}</span>
                          <h4 className="font-semibold text-[#1c1c1c] truncate mt-0.5">{item.subject}</h4>
                        </div>
                        <span className="text-sm font-medium px-2 py-0.5 rounded-md bg-[#f2eee5] text-[#1c1c1c]/85 border border-[#eceae4]/60 font-sans">
                          Pending AI
                        </span>
                      </div>
                    ))}
                  </motion.div>
                ) : isSorting ? (
                  // Sorting progress visualization
                  <motion.div 
                    key="sorting"
                    className="flex flex-col items-center justify-center p-8 gap-4"
                  >
                    <div className="relative w-16 h-16 flex items-center justify-center">
                      <motion.div 
                        animate={{ scale: [1, 1.1, 1], rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        className="absolute inset-0 border-2 border-[#1c1c1c] rounded-full border-t-transparent"
                      />
                      <Bot className="w-5 h-5 text-[#1c1c1c]" />
                    </div>
                    <span className="text-sm text-[#1c1c1c] font-medium animate-pulse font-sans">Running priority matrix...</span>
                  </motion.div>
                ) : (
                  // Sorted priority stream (unified list, opacity reduction for low priority)
                  <motion.div 
                    key="sorted"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-2.5"
                  >
                    {rawEmails.map((item) => (
                      <div 
                        key={item.id}
                        className={`p-3.5 rounded-lg border flex items-center justify-between transition-all duration-300 ${
                          item.priority === "HIGH" 
                            ? "bg-white border-red-200 bg-red-50/30" 
                            : item.priority === "MEDIUM"
                            ? "bg-white border-amber-200 bg-amber-50/30"
                            : "bg-white border-[#eceae4] opacity-50"
                        }`}
                      >
                        <div className="overflow-hidden flex-1 pr-4 text-sm font-sans">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-[#1c1c1c]/60">{item.from}</span>
                            {item.priority === "HIGH" ? (
                              <span className="text-xs font-semibold bg-red-100/50 text-red-700 px-1.5 py-0.5 rounded">High</span>
                            ) : item.priority === "MEDIUM" ? (
                              <span className="text-xs font-semibold bg-amber-100/50 text-amber-700 px-1.5 py-0.5 rounded">Medium</span>
                            ) : (
                              <span className="text-xs font-semibold bg-[#f2eee5]/50 text-[#1c1c1c]/50 px-1.5 py-0.5 rounded">Low</span>
                            )}
                          </div>
                          <h4 className="font-semibold text-[#1c1c1c] truncate mt-0.5">{item.subject}</h4>
                        </div>
                        {item.priority === "LOW" ? (
                          <span className="text-sm text-[#1c1c1c]/50 font-medium italic font-sans">Auto-archived</span>
                        ) : (
                          <span className="text-sm text-emerald-700 font-semibold font-sans">Priority Classified</span>
                        )}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Smart Digest Summary */}
            <div className="p-4 rounded-lg bg-[#f7f4ed] border border-[#eceae4] flex items-start gap-2.5 text-sm text-left">
              <Bot className="w-5 h-5 text-[#1c1c1c] flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#1c1c1c] block font-sans">AI Focus Summary:</span>
                <span className="text-[#1c1c1c]/80 mt-1 block leading-relaxed font-sans">
                  {isSorted 
                    ? "2 urgent high priority threads need your response. Newsletter archive scheduled." 
                    : "Inbox currently unparsed. Trigger sorting to run prioritization index."}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/**
 * Section 4: Calendar Intelligence (Context Scheduling)
 */
function CalendarIntelligence({ showToast }: { showToast: (msg: string, key?: string) => void }) {
  const [hoveredTime, setHoveredTime] = useState<string | null>(null);
  const [bookedSlot, setBookedSlot] = useState<string | null>(null);

  const confirmMeeting = (slot: string) => {
    setBookedSlot(slot);
    showToast(`Meeting Scheduled: ${slot === "tuesday" ? "Tuesday at 2:00 PM" : "Friday at 11:00 AM"}`);
  };

  return (
    <section id="intelligence" className="px-6 py-24 border-b border-[#eceae4] bg-transparent">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <SectionEyebrow>Coordinate Extract</SectionEyebrow>
          <h2 className="heading-1 mt-2 text-[#1c1c1c] font-semibold tracking-[-0.03em]">Calendar Intelligence</h2>
          <p className="body-md text-[#1c1c1c]/80 max-w-xl mx-auto mt-3 font-sans">
            Schedule meetings without app hopping. Syncar highlights proposed slots and books events directly from email context.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Email Pane (Left - 6 Columns) */}
          <div className="lg:col-span-6 bg-white border border-[#eceae4] rounded-xl p-8 flex flex-col justify-between text-left shadow-sm">
            <div>
              {/* Email Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#eceae4] mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-[#f2eee5] text-[#1c1c1c] flex items-center justify-center font-bold text-sm font-sans">S</div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#1c1c1c] font-sans">Sarah Chen</h4>
                    <p className="text-sm text-[#1c1c1c]/60 font-sans">sarah@partner-firm.com</p>
                  </div>
                </div>
                <span className="text-sm text-[#1c1c1c]/50 font-sans font-medium">Yesterday, 4:18 PM</span>
              </div>

              <div>
                <span className="text-sm font-medium text-[#1c1c1c]/70 font-sans">Subject: Partnership Deck Coordination</span>
                
                {/* Email Body */}
                <div className="mt-4 text-sm text-[#1c1c1c]/80 leading-relaxed bg-[#fafafa] p-4 rounded-lg border border-[#eceae4]">
                  <p>Hi Manoj,</p>
                  <br />
                  <p>
                    I reviewed the proposal documents. Let's sync up for 30 minutes to lock in the final revisions. 
                    I checked my calendar and I can do{" "}
                    <span 
                      onMouseEnter={() => setHoveredTime("tuesday")}
                      onMouseLeave={() => setHoveredTime(null)}
                      onClick={() => confirmMeeting("tuesday")}
                      className="inline-block px-1.5 py-0.5 rounded cursor-pointer border border-[#1c1c1c] text-[#1c1c1c] font-semibold bg-[#1c1c1c]/5 hover:bg-[#1c1c1c]/10 transition-all font-sans"
                    >
                      next Tuesday at 2:00 PM
                    </span>{" "}
                    or{" "}
                    <span
                      onMouseEnter={() => setHoveredTime("friday")}
                      onMouseLeave={() => setHoveredTime(null)}
                      onClick={() => confirmMeeting("friday")}
                      className="inline-block px-1.5 py-0.5 rounded cursor-pointer border border-[#1c1c1c] text-[#1c1c1c] font-semibold bg-[#1c1c1c]/5 hover:bg-[#1c1c1c]/10 transition-all font-sans"
                    >
                      Friday at 11:00 AM
                    </span>
                    .
                  </p>
                  <br />
                  <p>Let me know what works best for you!</p>
                  <br />
                  <p>Best,</p>
                  <p>Sarah</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#eceae4] text-sm text-[#1c1c1c]/60 flex items-center gap-2 font-sans">
              <Bot className="w-3.5 h-3.5 text-[#1c1c1c]" />
              <span>Hover over dates in the email to preview calendar slots. Click to schedule.</span>
            </div>
          </div>

          {/* Calendar Day Grid (Right - 6 Columns) */}
          <div className="lg:col-span-6 bg-white border border-[#eceae4] rounded-xl p-8 flex flex-col justify-between text-left shadow-sm">
            <div className="w-full">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#eceae4] mb-6">
                <span className="text-sm font-semibold text-[#1c1c1c] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#1c1c1c]" /> Calendar Day Agenda
                </span>
                <span className="text-sm text-[#1c1c1c]/60 font-medium font-sans">June 2026</span>
              </div>

              {/* Day schedules */}
              <div className="space-y-6">
                {/* Tuesday Schedule */}
                <div>
                  <span className="text-sm font-medium text-[#1c1c1c]/70 font-sans">Tuesday, June 16</span>
                  <div className="mt-2 space-y-2">
                    <div className="p-3 rounded border border-[#eceae4] bg-[#fafafa] text-sm flex items-center justify-between">
                      <span className="text-[#1c1c1c]/80 font-sans">10:00 AM - Internal Sync</span>
                      <span className="text-sm text-[#1c1c1c]/50 font-sans font-medium">1h</span>
                    </div>

                    {/* Interactive Slot */}
                    <div 
                      onClick={() => confirmMeeting("tuesday")}
                      className={`p-3 rounded border border-dashed transition-all duration-300 text-sm flex items-center justify-between cursor-pointer ${
                        bookedSlot === "tuesday"
                          ? "bg-emerald-550 border-emerald-300 text-emerald-700 font-semibold"
                          : hoveredTime === "tuesday"
                          ? "bg-[#1c1c1c]/5 border-[#1c1c1c] text-[#1c1c1c] font-semibold"
                          : "bg-white border-[#eceae4] text-[#1c1c1c]/60"
                      }`}
                    >
                      <span>
                        {bookedSlot === "tuesday" 
                          ? "✔ Partnership Review (Sarah Chen)" 
                          : hoveredTime === "tuesday"
                          ? "💡 Suggestion: Finalize Revisions (Sarah)" 
                          : "2:00 PM - Available slot"}
                      </span>
                      <span className="text-sm text-[#1c1c1c]/50 font-sans font-medium">30m</span>
                    </div>
                  </div>
                </div>

                {/* Friday Schedule */}
                <div>
                  <span className="text-sm font-medium text-[#1c1c1c]/70 font-sans">Friday, June 19</span>
                  <div className="mt-2 space-y-2">
                    {/* Interactive Slot */}
                    <div 
                      onClick={() => confirmMeeting("friday")}
                      className={`p-3 rounded border border-dashed transition-all duration-300 text-sm flex items-center justify-between cursor-pointer ${
                        bookedSlot === "friday"
                          ? "bg-emerald-555 border-emerald-300 text-emerald-700 font-semibold"
                          : hoveredTime === "friday"
                          ? "bg-[#1c1c1c]/5 border-[#1c1c1c] text-[#1c1c1c] font-semibold"
                          : "bg-white border-[#eceae4] text-[#1c1c1c]/60"
                      }`}
                    >
                      <span>
                        {bookedSlot === "friday" 
                          ? "✔ Partnership Review (Sarah Chen)" 
                          : hoveredTime === "friday"
                          ? "💡 Suggestion: Finalize Revisions (Sarah)" 
                          : "11:00 AM - Available slot"}
                      </span>
                      <span className="text-sm text-[#1c1c1c]/50 font-sans font-medium">30m</span>
                    </div>

                    <div className="p-3 rounded border border-[#eceae4] bg-[#fafafa] text-sm flex items-center justify-between">
                      <span className="text-[#1c1c1c]/80 font-sans">1:00 PM - Design Sign-off</span>
                      <span className="text-sm text-[#1c1c1c]/50 font-sans font-medium">1.5h</span>
                    </div>
                  </div>
                </div>
              </div>

              {bookedSlot && (
                <button 
                  onClick={() => setBookedSlot(null)}
                  className="mt-4 text-sm text-[#1c1c1c] hover:underline w-full text-right font-semibold font-sans"
                >
                  Reset bookings
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Section 5: Unified Workspace Section (Preview Canvas)
 */
function UnifiedWorkspaceSection({ 
  workspaceView, 
  setWorkspaceView 
}: { 
  workspaceView: "inbox" | "calendar" | "ai"; 
  setWorkspaceView: (v: "inbox" | "calendar" | "ai") => void 
}) {
  const [selectedMailIndex, setSelectedMailIndex] = useState(0);

  const emails = [
    {
      from: "Sarah Chen",
      subject: "Q3 Partnership Proposal — Final Terms",
      time: "10m ago",
      priority: "HIGH",
      summary: "Sarah requests feedback on Q3 partnership outline. Suggestion is to check GCal at 11:00 AM.",
      aiDraft: "Hi Sarah, locked in 11:00 AM on our calendars to review the terms. Looking forward to final coordination!",
      calHighlight: "11:00 AM"
    },
    {
      from: "Marcus Webb",
      subject: "Critical database connection pool leaks SYN-2847",
      time: "45m ago",
      priority: "HIGH",
      summary: "Neon postgres connections capping out in our staging environment. Bug debugging set for 2:00 PM.",
      aiDraft: "Hey Marcus, tracking logs now. Let's sync up today at 2:00 PM to fix connection leak routing.",
      calHighlight: "2:00 PM"
    },
    {
      from: "Priya Sharma",
      subject: "Design assets & onboarding layouts review",
      time: "2h ago",
      priority: "MEDIUM",
      summary: "Sharing Figma mockups for onboarding flows. Review scheduled on calendar at 4:00 PM.",
      aiDraft: "Thanks Priya, reviewing mockups now. Let's sync at 4:00 PM to finalize layout adjustments.",
      calHighlight: "4:00 PM"
    }
  ];

  const activeEmail = emails[selectedMailIndex];

  return (
    <section id="workspace" className="px-6 py-24 border-b border-[#eceae4] bg-transparent">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <SectionEyebrow>Unified Dashboard</SectionEyebrow>
          <h2 className="heading-1 mt-2 text-[#1c1c1c] font-semibold tracking-[-0.03em]">A single source of truth</h2>
          <p className="body-md text-[#1c1c1c]/80 max-w-xl mx-auto mt-3 font-sans">
            No separate apps. Mail, calendar, and your AI assistant work together. Click on emails below to witness live cross-pane updates.
          </p>
        </div>

        {/* View togglers */}
        <div className="flex justify-center gap-3 mb-8">
          {(["inbox", "calendar", "ai"] as const).map((view) => (
            <button
              key={view}
              onClick={() => setWorkspaceView(view)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all border ${
                workspaceView === view 
                  ? "bg-[#1c1c1c] text-white border-[#1c1c1c] font-semibold" 
                  : "bg-white border-[#eceae4] text-[#1c1c1c]/70 hover:border-[#1c1c1c]/30"
              }`}
            >
              {view} view
            </button>
          ))}
        </div>

        {/* High-fidelity mockup box with single shadow */}
        <div 
          className="w-full rounded-xl overflow-hidden border border-[#eceae4] shadow-sm bg-white"
        >
          {/* Mock title bar */}
          <div className="flex items-center gap-2 px-6 py-4 border-b border-[#eceae4] bg-[#fafafa]">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#eceae4]" />
              <div className="w-2 h-2 rounded-full bg-[#eceae4]" />
              <div className="w-2 h-2 rounded-full bg-[#eceae4]" />
            </div>
            <div className="flex-1 flex items-center justify-center max-w-[280px] mx-auto bg-[#f2eee5] border border-[#eceae4] rounded-md py-0.5 px-3 text-sm text-[#1c1c1c]/80 font-sans font-medium">
              workspace.syncar.ai/{workspaceView}
            </div>
          </div>

          {/* Connected Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[440px]">
            
            {/* INBOX COLUMN (4 Columns) */}
            <div className={`md:col-span-4 border-r border-[#eceae4] p-4 flex flex-col justify-between bg-white text-left ${workspaceView !== "inbox" ? "hidden md:flex" : ""}`}>
              <div>
                <span className="text-sm font-medium text-[#1c1c1c]/60 block mb-4 flex items-center gap-1.5 font-sans">
                  <Mail className="w-3.5 h-3.5 text-[#1c1c1c]" /> Synced Inbox
                </span>

                <div className="space-y-2">
                  {emails.map((mail, idx) => (
                    <div
                      key={mail.from}
                      onClick={() => setSelectedMailIndex(idx)}
                      className={`p-3 rounded-lg border text-left cursor-pointer transition-all duration-150 ${
                        selectedMailIndex === idx 
                          ? "bg-[#f2eee5] border-[#1c1c1c]/20 shadow-inner" 
                          : "bg-transparent border-transparent hover:bg-[#fafafa]"
                      }`}
                    >
                      <div className="flex items-center justify-between font-sans">
                        <span className="text-sm font-semibold text-[#1c1c1c]">{mail.from}</span>
                        <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-[#1c1c1c]/5 text-[#1c1c1c]">
                          {mail.priority}
                        </span>
                      </div>
                      <h4 className="text-sm text-[#1c1c1c]/85 mt-1 truncate font-sans">{mail.subject}</h4>
                      <span className="text-sm text-[#1c1c1c]/50 block mt-2 font-sans font-medium">{mail.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CALENDAR COLUMN (4 Columns) */}
            <div className={`md:col-span-4 border-r border-[#eceae4] p-4 flex flex-col justify-between bg-white text-left ${workspaceView !== "calendar" ? "hidden md:flex" : ""}`}>
              <div>
                <span className="text-sm font-medium text-[#1c1c1c]/60 block mb-4 flex items-center gap-1.5 font-sans">
                  <Calendar className="w-3.5 h-3.5 text-[#1c1c1c]" /> Calendar Agenda
                </span>

                <div className="space-y-3">
                  <div className={`p-3 rounded-lg border transition-all duration-300 ${
                    activeEmail.calHighlight === "11:00 AM"
                      ? "bg-[#1c1c1c]/5 border-[#1c1c1c] text-[#1c1c1c] font-semibold"
                      : "bg-[#fafafa] border-[#eceae4] text-[#1c1c1c]/80"
                  }`}>
                    <span className="text-sm block font-sans text-[#1c1c1c]/50 font-medium">11:00 AM - 11:30 AM</span>
                    <span className="text-sm font-semibold block mt-0.5 font-sans">Partnership Sync</span>
                  </div>
 
                  <div className={`p-3 rounded-lg border transition-all duration-300 ${
                    activeEmail.calHighlight === "2:00 PM"
                      ? "bg-[#1c1c1c]/5 border-[#1c1c1c] text-[#1c1c1c] font-semibold"
                      : "bg-[#fafafa] border-[#eceae4] text-[#1c1c1c]/80"
                  }`}>
                    <span className="text-sm block font-sans text-[#1c1c1c]/50 font-medium">2:00 PM - 2:30 PM</span>
                    <span className="text-sm font-semibold block mt-0.5 font-sans">Database Bug Debugging</span>
                  </div>
 
                  <div className={`p-3 rounded-lg border transition-all duration-300 ${
                    activeEmail.calHighlight === "4:00 PM"
                      ? "bg-[#1c1c1c]/5 border-[#1c1c1c] text-[#1c1c1c] font-semibold"
                      : "bg-[#fafafa] border-[#eceae4] text-[#1c1c1c]/80"
                  }`}>
                    <span className="text-sm block font-sans text-[#1c1c1c]/50 font-medium">4:00 PM - 4:45 PM</span>
                    <span className="text-sm font-semibold block mt-0.5 font-sans">Design Sign-off Review</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI CONTEXT COLUMN (4 Columns) */}
            <div className={`md:col-span-4 p-4 flex flex-col justify-between bg-[#fafafa] text-left ${workspaceView !== "ai" ? "hidden md:flex" : ""}`}>
              <div className="space-y-4">
                <span className="text-sm font-medium text-[#1c1c1c]/60 block flex items-center gap-1.5 font-sans">
                  <Bot className="w-3.5 h-3.5 text-[#1c1c1c]" /> AI Context Assistant
                </span>
 
                {/* Email Summary Box */}
                <div className="p-3.5 rounded-lg border border-[#eceae4] bg-white">
                  <span className="text-sm font-medium text-[#1c1c1c]/60 block mb-1 font-sans">Context summary</span>
                  <p className="text-sm text-[#1c1c1c] leading-relaxed font-sans">{activeEmail.summary}</p>
                </div>
 
                {/* AI Draft Suggestion */}
                <div className="p-3.5 rounded-lg border border-[#eceae4] bg-white">
                  <span className="text-sm font-semibold text-[#1c1c1c] block mb-2 flex items-center gap-1 font-sans">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Auto-reply draft
                  </span>
                  <p className="text-sm text-[#1c1c1c]/80 italic p-2 rounded bg-[#f7f4ed] border border-[#eceae4] leading-relaxed font-sans">
                    "{activeEmail.aiDraft}"
                  </p>
                </div>
              </div>

              <button className="w-full btn-lovable-primary text-sm font-medium flex items-center gap-2 justify-center py-2.5 rounded-md">
                <Send className="w-3.5 h-3.5" /> Dispatch Reply Draft
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Section 6: Speed Layer (Superhuman Keybindings UI)
 */
function SpeedLayer({ 
  setPaletteOpen, 
  setWorkspaceView,
  showToast
}: { 
  setPaletteOpen: (v: boolean) => void;
  setWorkspaceView: (v: "inbox" | "calendar" | "ai") => void;
  showToast: (msg: string, key?: string) => void;
}) {
  const triggerInputSearch = () => {
    setPaletteOpen(true);
    showToast("Opened Command Palette", "⌘K");
  };

  const setView = (v: "inbox" | "calendar" | "ai", label: string, shortcut: string) => {
    setWorkspaceView(v);
    showToast(label, shortcut);
  };

  return (
    <section id="speed" className="px-6 py-24 border-b border-[#eceae4] bg-transparent">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <SectionEyebrow>Keyboard First Engine</SectionEyebrow>
          <h2 className="heading-1 mt-2 text-[#1c1c1c] font-semibold tracking-[-0.03em]">Built for the Speed Layer</h2>
          <p className="body-md text-[#1c1c1c]/80 max-w-xl mx-auto mt-3 font-sans">
            Keep your hands on the home row. Syncar matches Superhuman's extreme speed and Raycast's quick menus. Try it right now on this page.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Left Column: Command Palette UI (6 Columns) */}
          <div className="bg-white border border-[#eceae4] rounded-xl p-8 flex flex-col justify-between min-h-[300px] text-left shadow-sm">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#eceae4] mb-6">
                <span className="text-sm font-semibold text-[#1c1c1c] flex items-center gap-1.5 font-sans">
                  <Command className="w-3.5 h-3.5 text-[#1c1c1c]" /> Quick Command Palette
                </span>
                <span className="text-sm text-[#1c1c1c]/60 font-medium font-sans">Interactable</span>
              </div>

              {/* Clickable mock search bar */}
              <div 
                onClick={triggerInputSearch}
                className="w-full flex items-center justify-between bg-[#f7f4ed] border border-[#eceae4] p-3 rounded-lg hover:border-[#1c1c1c]/40 transition-all cursor-pointer shadow-inner"
              >
                <span className="text-sm text-[#1c1c1c]/80 flex items-center gap-2 font-sans"><Search className="w-4 h-4 text-[#1c1c1c]" /> Search commands or workflows...</span>
                <kbd className="text-sm font-sans bg-[#f2eee5] border border-[#eceae4] px-1.5 py-0.5 rounded text-[#1c1c1c] font-bold">K</kbd>
              </div>

              <div className="space-y-2 mt-4">
                <div 
                  onClick={() => setView("inbox", "Opened Inbox", "I")}
                  className="p-2.5 rounded-md hover:bg-[#fafafa] cursor-pointer flex items-center justify-between text-sm text-[#1c1c1c] transition-all border border-transparent hover:border-[#eceae4]"
                >
                  <span className="flex items-center gap-2 font-sans"><Mail className="w-3.5 h-3.5 text-[#1c1c1c]" /> Switch to Inbox</span>
                  <span className="text-sm text-[#1c1c1c]/50 font-sans font-medium">Press I</span>
                </div>
                <div 
                  onClick={() => setView("calendar", "Opened Calendar", "C")}
                  className="p-2.5 rounded-md hover:bg-[#fafafa] cursor-pointer flex items-center justify-between text-sm text-[#1c1c1c] transition-all border border-transparent hover:border-[#eceae4]"
                >
                  <span className="flex items-center gap-2 font-sans"><Calendar className="w-3.5 h-3.5 text-[#1c1c1c]" /> Switch to Calendar</span>
                  <span className="text-sm text-[#1c1c1c]/50 font-sans font-medium">Press C</span>
                </div>
                <div 
                  onClick={() => setView("ai", "Opened AI Agent", "A")}
                  className="p-2.5 rounded-md hover:bg-[#fafafa] cursor-pointer flex items-center justify-between text-sm text-[#1c1c1c] transition-all border border-transparent hover:border-[#eceae4]"
                >
                  <span className="flex items-center gap-2 font-sans"><Bot className="w-3.5 h-3.5 text-[#1c1c1c]" /> Switch to AI Agent</span>
                  <span className="text-sm text-[#1c1c1c]/50 font-sans font-medium">Press A</span>
                </div>
              </div>
            </div>

            <div className="text-sm text-[#1c1c1c]/60 mt-4 border-t border-[#eceae4] pt-3 flex items-center gap-2 font-sans">
              <Bot className="w-3.5 h-3.5 text-[#1c1c1c]" />
              <span>Press those keys anywhere on this page to test live shortcuts.</span>
            </div>
          </div>

          {/* Right Column: Speed details (6 Columns) */}
          <div className="space-y-6 text-left">
            <h3 className="heading-2 text-[#1c1c1c] font-semibold tracking-[-0.02em]">Navigation at home row speeds</h3>
            <p className="body-sm text-[#1c1c1c]/80 leading-relaxed font-sans">
              Zero visual distractions, zero loading states. Syncar is built with keyboard triggers to let you traverse email replies, calendar coordinate bookings, search indices, and integrations with minimal resistance.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-[#eceae4] bg-white shadow-sm">
                <span className="text-sm font-semibold text-[#1c1c1c] block mb-1 font-sans">Sub-100ms Ingest</span>
                <p className="text-sm text-[#1c1c1c]/80 leading-relaxed font-sans">Cached index renders state changes offline instantly, saving changes to PostgreSQL in the background.</p>
              </div>

              <div className="p-4 rounded-xl border border-[#eceae4] bg-white shadow-sm">
                <span className="text-sm font-semibold text-[#1c1c1c] block mb-1 font-sans">Home Row Shortcuts</span>
                <p className="text-sm text-[#1c1c1c]/80 leading-relaxed font-sans">Archive, delete, draft, and query search structures with fast key triggers built natively.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/**
 * Section 7: Future of Work (Architecture details)
 */
function FutureOfWork() {
  return (
    <section className="px-6 py-24 border-b border-[#eceae4] bg-transparent">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <SectionEyebrow>System architecture</SectionEyebrow>
          <h2 className="heading-1 mt-2 text-[#1c1c1c] font-semibold tracking-[-0.03em]">An operating system for work</h2>
          <p className="body-md text-[#1c1c1c]/80 max-w-xl mx-auto mt-3 font-sans">
            An underlying architecture compiled for local speed, unified data consistency, and advanced LLM tool executions.
          </p>
        </div>

        {/* Bento Grid Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {/* Box 1 */}
          <div className="bg-white border border-[#eceae4] rounded-xl p-6 flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-8 h-8 rounded border border-[#eceae4] bg-[#fafafa] flex items-center justify-center mb-4">
                <Database className="w-4 h-4 text-[#1c1c1c]" />
              </div>
              <h3 className="text-base font-semibold text-[#1c1c1c] mb-2">Local-First Cache Index</h3>
              <p className="text-sm text-[#1c1c1c]/80 leading-relaxed font-sans">
                Synchronized PostgreSQL database replicating critical Gmail message headers and Google Calendar schedules. Queries retrieve instantly without direct API hops.
              </p>
            </div>
          </div>

          {/* Box 2 */}
          <div className="bg-white border border-[#eceae4] rounded-xl p-6 flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-8 h-8 rounded border border-[#eceae4] bg-[#fafafa] flex items-center justify-center mb-4">
                <Globe className="w-4 h-4 text-[#1c1c1c]" />
              </div>
              <h3 className="text-base font-semibold text-[#1c1c1c] mb-2">Corsair Sync Webhooks</h3>
              <p className="text-sm text-[#1c1c1c]/80 leading-relaxed font-sans">
                Webhook streams coordinate and sync remote alterations in background workers, keeping local datasets always aligned and resolving conflicts in real-time.
              </p>
            </div>
          </div>

          {/* Box 3 */}
          <div className="bg-white border border-[#eceae4] rounded-xl p-6 flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-8 h-8 rounded border border-[#eceae4] bg-[#fafafa] flex items-center justify-center mb-4">
                <Search className="w-4 h-4 text-[#1c1c1c]" />
              </div>
              <h3 className="text-base font-semibold text-[#1c1c1c] mb-2">pgvector Semantic Search</h3>
              <p className="text-sm text-[#1c1c1c]/80 leading-relaxed font-sans">
                Vector embeddings computed using Google's text-embedding-004 allows users to perform semantic search, matching user intents rather than simple keywords.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Setup onboarding flow
 */
function OnboardingSection() {
  return (
    <section className="px-6 py-24 border-b border-[#eceae4] bg-transparent">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <SectionEyebrow>Guided Setup</SectionEyebrow>
          <h2 className="heading-1 mt-2 text-[#1c1c1c] font-semibold tracking-[-0.03em]">Connect in 3 minutes</h2>
          <p className="body-md text-[#1c1c1c]/80 mt-3 font-sans">
            Secure, sandboxed local environment initialized immediately upon sign up.
          </p>
        </div>

        <div className="space-y-4 text-left">
          {ONBOARDING_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="flex items-start gap-4 p-5 rounded-xl border border-[#eceae4] bg-white shadow-sm"
            >
              <span className="text-lg font-bold tabular-nums text-[#1c1c1c]/60 w-8 font-sans">
                {step.step}
              </span>
              <div className="flex-1 text-left">
                <h3 className="text-base font-semibold mb-1 text-[#1c1c1c] font-sans">{step.title}</h3>
                <p className="text-sm text-[#1c1c1c]/80 leading-relaxed font-sans">{step.desc}</p>
              </div>
              <CheckCircle2 className="w-4 h-4 text-[#1c1c1c] flex-shrink-0 mt-0.5" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Call to Action box at bottom
 */
function ActionCenterSection() {
  return (
    <section className="px-6 py-24 bg-transparent">
      <div 
        className="max-w-2xl mx-auto text-center p-12 rounded-xl border border-[#eceae4] bg-white w-full shadow-sm"
      >
        <div className="flex flex-col items-center gap-6 mb-8 w-full">
          <SectionEyebrow>Get Started</SectionEyebrow>
          <h2 className="display-2 text-[#1c1c1c] text-balance tracking-[-0.04em] font-semibold" style={{ maxWidth: "38rem" }}>Reclaim your inbox attention</h2>
          <p className="body-md text-[#1c1c1c]/80 text-balance font-sans" style={{ maxWidth: "32rem" }}>
            Experience local inbox execution speed. Join the beta and coordinate workflows with natural AI commands.
          </p>
        </div>
        <Link href="/sign-up" className="btn-lovable-primary px-6 py-3 text-sm font-medium rounded-md inline-flex items-center gap-2">
          Connect Workspace Free
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

/**
 * Site Footer
 */
function Footer() {
  return (
    <footer
      className="bg-[#101010] text-[#a1a1aa] px-6 md:px-12 py-16 border-t border-[#1a1a1a] text-xs"
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 text-left">
        <div>
          <Brand size="sm" textClassName="font-semibold text-white" />
          <p className="mt-4 text-[#71717a] text-[11px] leading-relaxed">
            The AI command layer for email and calendar. Built for fast execution.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4 text-xs">Product</h4>
          <ul className="space-y-2 text-[#71717a] text-[11px] font-sans">
            <li><a href="#transform" className="hover:text-white transition-colors">Compare Flows</a></li>
            <li><a href="#commands" className="hover:text-white transition-colors">AI CommandCenter</a></li>
            <li><a href="#workspace" className="hover:text-white transition-colors">Workspace Views</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4 text-xs">System</h4>
          <ul className="space-y-2 text-[#71717a] text-[11px] font-sans">
            <li>Local Postgres Database</li>
            <li>Clerk Tenant Isolation</li>
            <li>Gemini Tool Calling</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4 text-xs">Security</h4>
          <ul className="space-y-2 text-[#71717a] text-[11px] font-sans">
            <li>OAuth Sandboxed</li>
            <li>End-to-End Encryption</li>
            <li>GDPR Compliant</li>
          </ul>
        </div>
      </div>
      <div className="max-w-5xl mx-auto pt-8 border-t border-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between gap-4 text-[#71717a] text-[11px] font-sans">
        <p>© 2026 Syncar. All rights reserved.</p>
        <p>Next.js 16 · Corsair Dev Engine · Gemini Flash · Clerk Auth · pgvector</p>
      </div>
    </footer>
  );
}
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
  Globe, Database, Play, ArrowRightLeft, X, Check, Sliders
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
  const { isSignedIn, isLoaded } = useUser();
  const { theme, setTheme } = useUIStore();

  // Global Page States
  const [toast, setToast] = useState<{ message: string; shortcut?: string } | null>(null);
  const [workspaceView, setWorkspaceView] = useState<"inbox" | "calendar" | "ai">("inbox");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const toastTimeoutRef = useRef<any>(null);

  // Set theme to dark by default on landing page mount (Hybrid-Elite-Dark design)
  useEffect(() => {
    setTheme("dark");
  }, [setTheme]);

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
      className="min-h-screen overflow-x-hidden font-sans" 
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
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-md border border-hairline-strong shadow-lg glass"
            style={{ background: "var(--surface-3)" }}
          >
            <Zap className="w-4 h-4 text-accent-olive animate-pulse" />
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-ink">{toast.message}</span>
              {toast.shortcut && (
                <span className="text-[10px] text-ink-muted">Shortcut: <kbd className="bg-surface-4 px-1 py-0.5 rounded text-accent-olive font-mono">{toast.shortcut}</kbd></span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard Shortcuts Hint Bar */}
      <div className="fixed bottom-4 left-6 z-40 hidden md:flex items-center gap-4 text-[10px] text-ink-muted bg-surface-1/90 px-3 py-1.5 rounded-sm border border-hairline backdrop-blur-sm">
        <span className="flex items-center gap-1"><Keyboard className="w-3.5 h-3.5 text-accent-olive" /> Global Shortcuts:</span>
        <span><kbd className="bg-surface-2 px-1 rounded font-mono">⌘K</kbd> Palette</span>
        <span><kbd className="bg-surface-2 px-1 rounded font-mono">I</kbd> Inbox</span>
        <span><kbd className="bg-surface-2 px-1 rounded font-mono">C</kbd> Calendar</span>
        <span><kbd className="bg-surface-2 px-1 rounded font-mono">A</kbd> AI Assistant</span>
      </div>

      {/* Mock Command Palette (CMDK Overlay) */}
      <AnimatePresence>
        {paletteOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-canvas/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              className="w-full max-w-lg border border-hairline-strong rounded-lg overflow-hidden shadow-2xl"
              style={{ background: "var(--surface-1)" }}
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b border-hairline bg-surface-2">
                <Search className="w-4 h-4 text-accent-olive" />
                <input
                  type="text"
                  placeholder="Type a command or ask Syncar AI..."
                  className="flex-1 bg-transparent border-0 outline-none text-sm text-ink placeholder:text-ink-muted focus:ring-0 focus:outline-none focus:shadow-none"
                  style={{ background: "transparent !important", border: "none !important" }}
                  autoFocus
                />
                <button 
                  onClick={() => setPaletteOpen(false)}
                  className="p-1 rounded-sm hover:bg-surface-4 text-ink-muted"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-2 max-h-[300px] overflow-y-auto">
                <div className="px-3 py-1 text-[10px] font-semibold text-ink-muted uppercase tracking-wider">Navigation</div>
                <div 
                  onClick={() => { setWorkspaceView("inbox"); setPaletteOpen(false); showToast("Opened Inbox", "I"); }}
                  className="flex items-center justify-between px-3 py-2 rounded-sm hover:bg-surface-2 cursor-pointer text-xs text-ink"
                >
                  <span className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-accent-olive" /> Go to Inbox</span>
                  <span className="text-[10px] font-mono text-ink-muted">I</span>
                </div>
                <div 
                  onClick={() => { setWorkspaceView("calendar"); setPaletteOpen(false); showToast("Opened Calendar", "C"); }}
                  className="flex items-center justify-between px-3 py-2 rounded-sm hover:bg-surface-2 cursor-pointer text-xs text-ink"
                >
                  <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-accent-olive" /> Go to Calendar</span>
                  <span className="text-[10px] font-mono text-ink-muted">C</span>
                </div>
                <div 
                  onClick={() => { setWorkspaceView("ai"); setPaletteOpen(false); showToast("Opened AI Agent", "A"); }}
                  className="flex items-center justify-between px-3 py-2 rounded-sm hover:bg-surface-2 cursor-pointer text-xs text-ink"
                >
                  <span className="flex items-center gap-2"><Bot className="w-3.5 h-3.5 text-accent-olive" /> Talk to AI Assistant</span>
                  <span className="text-[10px] font-mono text-ink-muted">A</span>
                </div>
              </div>
            </motion.div>
          </div>
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

/**
 * Top navigation bar (Hybrid-Elite-Dark style)
 */
function NavigationBar({ isLoaded, isSignedIn, theme }: { isLoaded: boolean; isSignedIn: boolean; theme: string }) {
  const { toggleTheme } = useUIStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 height-[56px] transition-all duration-300 ${
        scrolled ? "bg-canvas/90 backdrop-blur-md border-b border-hairline py-3" : "bg-transparent py-4"
      }`}
    >
      <div className="flex items-center">
        <Brand size="sm" />
      </div>

      <div className="hidden md:flex items-center gap-8 text-[11px] font-semibold uppercase tracking-wider text-ink-secondary">
        <a href="#transform" className="hover:text-ink transition-colors">Compare</a>
        <a href="#commands" className="hover:text-ink transition-colors">Commands</a>
        <a href="#clarity" className="hover:text-ink transition-colors">AI Filter</a>
        <a href="#intelligence" className="hover:text-ink transition-colors">Calendar</a>
        <a href="#workspace" className="hover:text-ink transition-colors">Workspace</a>
        <a href="#speed" className="hover:text-ink transition-colors">Speed Layer</a>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {isLoaded && !isSignedIn && (
            <>
              <Link
                href="/sign-in"
                className="text-xs font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded text-ink-secondary hover:text-ink transition-all"
              >
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className="text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-sm btn-primary"
              >
                Get started
              </Link>
            </>
          )}
          {isLoaded && isSignedIn && (
            <Link
              href="/inbox"
              className="text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-sm btn-primary"
            >
              Go to Workspace
            </Link>
          )}
        </div>

        <button
          onClick={toggleTheme}
          className="p-1.5 rounded-sm border border-hairline hover:bg-surface-2 transition-all text-ink-secondary hover:text-ink"
          title="Toggle Theme"
        >
          {theme === "light" ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
        </button>
      </div>
    </nav>
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
      className="relative flex flex-col items-center justify-center min-h-screen pt-28 pb-16 px-6 text-center overflow-hidden border-b border-hairline"
      style={{ background: "var(--canvas)" }}
    >
      <div className="relative z-10 flex flex-col items-center max-w-5xl w-full">
        {/* Active Engine Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 border border-hairline bg-surface-1">
          <span className={`w-1.5 h-1.5 rounded-full ${state === "success" ? "bg-emerald-500 animate-pulse" : "bg-accent-olive"}`} />
          <span className="text-ink-secondary font-sans text-[10px] tracking-wider uppercase font-semibold">
            Orchestrator: <span className="text-ink">{state === "typing" ? "Ingesting" : state === "ingest" ? "Parsing" : state === "resolving" ? "Executing" : "Resolved"}</span>
          </span>
        </div>

        {/* Aggressive Notion-style letter-spaced Display Headline */}
        <h1 className="display-1 max-w-4xl mb-6 text-ink tracking-[-2.125px]">
          Stop managing email.
          <br />
          <span className="text-accent-olive">Start managing outcomes.</span>
        </h1>

        <p className="body-md max-w-2xl mb-10 text-ink-secondary leading-relaxed">
          Syncar is the local-first command layer for communication. Connect Gmail and Google Calendar to turn scattered threads into high-speed, automated AI workflows.
        </p>

        {/* Call to Actions (Hero full-pill exceptions) */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-16">
          {isLoaded && !isSignedIn && (
            <>
              <Link href="/sign-up" className="btn btn-hero-pill inline-flex items-center gap-2">
                Connect Workspace Free
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#transform" className="btn btn-secondary rounded-full px-6 py-3 font-semibold text-xs text-ink">
                See Comparative Flow
              </a>
            </>
          )}
          {isLoaded && isSignedIn && (
            <Link href="/inbox" className="btn btn-hero-pill inline-flex items-center gap-2">
              Enter My Workspace
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {/* Immersive Living Workflow Canvas */}
        <div 
          className="w-full max-w-4xl rounded-xl border border-hairline overflow-hidden relative shadow-2xl flex flex-col p-8"
          style={{ background: "var(--surface-1)" }}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-hairline pb-4 mb-6">
            <span className="text-[10px] font-sans font-bold text-ink-muted uppercase tracking-wider">Interactive simulator</span>
            <div className="text-[10px] bg-accent-olive/10 text-accent-olive font-semibold px-2 py-0.5 rounded-sm border border-accent-olive/20 uppercase font-sans">
              {currentScenario.badge}
            </div>
          </div>

          {/* Living Canvas Core layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative min-h-[200px]">
            
            {/* Input Node (Left) */}
            <div className="md:col-span-4 flex flex-col gap-2 text-left z-10">
              <span className="text-[9px] uppercase tracking-wider font-bold text-ink-muted">Inbound prompt</span>
              <div 
                className="p-4 rounded-lg border border-hairline min-h-[90px] flex items-start gap-2 relative bg-canvas shadow-inner"
              >
                <div className="text-xs font-sans text-ink leading-relaxed font-semibold">
                  "{typedPrompt}"
                  {state === "typing" && <span className="animate-pulse text-accent-olive font-bold">|</span>}
                </div>
              </div>
            </div>

            {/* AI Engine Processing Node (Center) */}
            <div className="md:col-span-4 flex flex-col items-center justify-center relative z-10">
              <div className="relative w-20 h-20 flex items-center justify-center">
                {/* Subtle solid ring */}
                <div className={`absolute inset-0 rounded-full border transition-colors duration-500 ${state === "success" ? "border-emerald-500/20" : "border-hairline"}`} />
                
                {/* Core Sphere */}
                <div 
                  className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-500 ${
                    state === "success" 
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.1)]" 
                      : state === "resolving" || state === "ingest"
                      ? "bg-primary border-accent-olive text-accent-olive animate-pulse"
                      : "bg-surface-2 border-hairline text-ink-muted"
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
                      className="text-[10px] text-accent-olive-light font-medium"
                    >
                      {currentScenario.steps[0]}
                    </motion.span>
                  )}
                  {state === "success" && (
                    <motion.span 
                      key="success-log"
                      initial={{ y: 8, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="text-[10px] text-emerald-400 font-semibold"
                    >
                      ✔ Completed in 1.2s
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Resolved Targets Node (Right) */}
            <div className="md:col-span-4 flex flex-col gap-3 text-left relative z-10">
              <span className="text-[9px] uppercase tracking-wider font-bold text-ink-muted">Executed Action</span>
              
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
                      <div className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 flex items-start gap-2.5">
                        <Calendar className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-ink">{currentScenario.calendarDetail.title}</p>
                          <p className="text-[10px] text-ink-secondary flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3 text-ink-muted" /> {currentScenario.calendarDetail.time}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Email draft created */}
                    {currentScenario.emailDetail && (
                      <div className="p-3 rounded-lg border border-hairline bg-canvas flex items-start gap-2.5 max-w-full">
                        <Mail className="w-4 h-4 text-accent-olive mt-0.5 flex-shrink-0" />
                        <div className="overflow-hidden flex-1 text-xs">
                          <p className="text-[9px] text-ink-muted">To: {currentScenario.emailDetail.to}</p>
                          <p className="font-bold text-ink truncate mt-0.5">{currentScenario.emailDetail.subject}</p>
                          <p className="text-[10px] text-ink-secondary truncate mt-0.5 italic">"{currentScenario.emailDetail.body}"</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <div key="action-placeholder" className="p-8 border border-dashed border-hairline rounded-lg text-center flex flex-col items-center justify-center text-ink-faint h-[110px]">
                    <Clock className="w-4 h-4 mb-2 animate-spin text-ink-muted" />
                    <span className="text-[10px] font-sans">Awaiting orchestrator...</span>
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
    <section id="transform" className="px-6 py-32 border-b border-hairline bg-surface-1">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <span className="eyebrow text-accent-olive">Comparison</span>
          <h2 className="heading-1 mt-2 text-ink">Friction Comparison</h2>
          <p className="body-md text-ink-secondary max-w-xl mx-auto mt-3">
            Siloed apps introduce coordination friction. Compare step-by-step clicks side-by-side.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
          
          {/* Traditional Panel */}
          <div className="bento-card flex flex-col justify-between border border-hairline relative bg-canvas">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-hairline mb-8">
                <span className="text-xs font-bold text-ink-secondary flex items-center gap-1.5 uppercase tracking-wider">
                  <ArrowRightLeft className="w-3.5 h-3.5" /> Siloed Gmail + Calendar
                </span>
                <span className="text-[10px] text-ink-muted uppercase tracking-wider font-semibold">17 steps</span>
              </div>

              {/* Progress steps */}
              <div className="space-y-4 pr-2 text-left">
                {traditionalSteps.map((step, idx) => (
                  <div 
                    key={step.title} 
                    className={`p-3.5 rounded-lg border transition-all duration-200 ${
                      activeStep === idx 
                        ? "bg-surface-2 border-hairline-strong text-ink font-semibold" 
                        : idx < activeStep 
                        ? "bg-surface-1/50 border-hairline/20 text-ink-muted line-through opacity-40" 
                        : "bg-transparent border-transparent text-ink-secondary"
                    }`}
                  >
                    <h4 className="text-xs font-bold">{step.title}</h4>
                    <p className="text-[10px] text-ink-muted mt-1 leading-normal">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 border-t border-hairline pt-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase font-bold text-ink-muted tracking-wider">Clicks</span>
                  <p className="text-xl font-bold text-ink">{clickCount}</p>
                </div>
                <div className="text-right">
                  <span className="text-[9px] uppercase font-bold text-ink-muted tracking-wider">Duration</span>
                  <p className="text-xl font-bold text-ink">{timeText}</p>
                </div>
              </div>

              <button 
                onClick={triggerSimulation}
                disabled={isPlaying}
                className="w-full btn btn-secondary text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                {isPlaying ? "Simulating clicks..." : "Simulate clicks"}
              </button>
            </div>
          </div>

          {/* Syncar Panel */}
          <div className="bento-card flex flex-col justify-between border border-hairline relative bg-canvas">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-hairline mb-8">
                <span className="text-xs font-bold text-accent-olive flex items-center gap-1.5 uppercase tracking-wider">
                  <Zap className="w-3.5 h-3.5" /> Syncar Flow
                </span>
                <span className="text-[10px] text-accent-olive-light uppercase tracking-wider font-semibold">1 Action</span>
              </div>

              <div className="p-6 rounded-lg border border-hairline bg-surface-1 flex flex-col gap-3 min-h-[160px] justify-center text-left">
                <span className="text-[9px] uppercase font-bold text-ink-muted tracking-wider">Natural language prompt</span>
                <div className="text-xs font-sans font-semibold text-ink p-3 rounded bg-canvas border border-hairline select-none">
                  "Schedule meeting with Sarah next Thursday afternoon"
                </div>

                <div className="flex items-center gap-2 text-[10px] text-ink-muted mt-1">
                  <Bot className="w-3.5 h-3.5 text-accent-olive" />
                  <span>Syncar maps intent, creates event, and drafts reply confirmation.</span>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-hairline pt-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase font-bold text-ink-muted tracking-wider">Clicks</span>
                  <p className="text-xl font-bold text-accent-olive">1 Action</p>
                </div>
                <div className="text-right">
                  <span className="text-[9px] uppercase font-bold text-ink-muted tracking-wider">Duration</span>
                  <p className="text-xl font-bold text-accent-olive">1.8 seconds</p>
                </div>
              </div>

              <button 
                onClick={triggerSyncar}
                disabled={syncarStatus !== "idle"}
                className={`w-full btn text-xs uppercase tracking-wider transition-all duration-300 ${
                  syncarStatus === "success" 
                    ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 cursor-default" 
                    : syncarStatus === "running"
                    ? "bg-surface-2 border border-hairline text-ink-secondary"
                    : "btn-primary"
                }`}
              >
                {syncarStatus === "success" ? (
                  <span className="flex items-center gap-1.5"><Check className="w-4 h-4" /> Workflow Dispatched</span>
                ) : syncarStatus === "running" ? (
                  <span>Executing...</span>
                ) : (
                  <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" /> Execute in 1 click</span>
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
    <section id="commands" className="px-6 py-32 border-b border-hairline" style={{ background: "var(--canvas)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="eyebrow text-accent-olive">Command workspace</span>
          <h2 className="heading-1 mt-2 text-ink">AI Command Center</h2>
          <p className="body-md text-ink-secondary max-w-xl mx-auto mt-3">
            Trigger visual outcomes instantly. Click on one of the presets to watch the assistant resolve the action.
          </p>
        </div>

        {/* Presets List */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {PRESETS.map((p, idx) => (
            <button
              key={p.title}
              onClick={() => handlePresetClick(idx)}
              className={`px-4 py-2 rounded-sm text-xs font-semibold transition-all border ${
                activePreset === idx 
                  ? "bg-accent-olive/15 border-accent-olive text-accent-olive font-bold" 
                  : "bg-surface-1 border-hairline text-ink-secondary hover:text-ink hover:border-hairline-strong"
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>

        {/* Chat assistant container */}
        <div className="w-full max-w-4xl mx-auto rounded-lg border border-hairline overflow-hidden shadow-2xl bg-surface-1">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-hairline bg-surface-2">
            <span className="text-xs font-bold text-ink flex items-center gap-2">
              <Bot className="w-4 h-4 text-accent-olive" /> Syncar AI Assistant
            </span>
            <span className="text-[10px] text-ink-muted uppercase tracking-wider font-semibold">Interactive Shell</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[320px]">
            
            {/* Assistant Dialog Pane (Left 7 Columns) */}
            <div className="md:col-span-7 p-6 border-b md:border-b-0 md:border-r border-hairline flex flex-col justify-between bg-canvas min-h-[260px] text-left">
              <div className="space-y-5">
                {/* User Message */}
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded bg-surface-2 flex items-center justify-center font-bold text-[10px] text-ink-secondary flex-shrink-0">U</div>
                  <div className="text-xs font-sans text-ink leading-relaxed font-semibold">
                    {promptInput || "Select a preset above to ask the assistant..."}
                    {executing && !activeSteps.length && <span className="animate-pulse text-accent-olive">|</span>}
                  </div>
                </div>

                {/* Assistant Processing Steps */}
                {activeSteps.length > 0 && (
                  <div className="flex items-start gap-3 border-t border-hairline/50 pt-4">
                    <div className="w-7 h-7 rounded bg-accent-olive/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-3.5 h-3.5 text-accent-olive" />
                    </div>
                    <div className="space-y-2">
                      <span className="text-[9px] uppercase font-bold text-ink-muted tracking-wider block">AI Progress</span>
                      {activeSteps.map((step, idx) => (
                        <div key={idx} className="text-xs text-ink-secondary flex items-center gap-2 leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 text-accent-olive flex-shrink-0" />
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {!executing && !resolved && (
                <div className="text-[10px] text-ink-muted italic select-none">
                  Preset actions show checklist completions inside the assistant thread.
                </div>
              )}
            </div>

            {/* Resolved outcome container (Right 5 Columns) */}
            <div className="md:col-span-5 p-6 flex flex-col justify-center bg-surface-1 min-h-[220px] text-left">
              <span className="text-[9px] uppercase font-bold text-ink-muted mb-4 tracking-wider block">Resolution outcomes</span>

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
                      <div className="p-4 rounded-lg border border-hairline bg-canvas">
                        <span className="text-[9px] text-accent-olive font-bold uppercase tracking-wider flex items-center gap-1 mb-2">
                          <Calendar className="w-3 h-3" /> Calendar block created
                        </span>
                        <h4 className="text-xs font-bold text-ink">{PRESETS[activePreset].result.event.title}</h4>
                        <p className="text-[10px] text-ink-secondary mt-1 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-ink-muted" /> {PRESETS[activePreset].result.event.time}
                        </p>
                      </div>
                    )}

                    {PRESETS[activePreset].result.email && (
                      <div className="p-4 rounded-lg border border-hairline bg-canvas text-xs">
                        <span className="text-[9px] text-accent-olive font-bold uppercase tracking-wider flex items-center gap-1 mb-2">
                          <Mail className="w-3 h-3" /> Gmail draft confirmation
                        </span>
                        <p className="text-[9px] text-ink-muted">To: {PRESETS[activePreset].result.email.to}</p>
                        <p className="font-bold text-ink mt-0.5 truncate">{PRESETS[activePreset].result.email.subject}</p>
                        <p className="text-[10px] text-ink-secondary mt-1.5 italic p-2 rounded-sm bg-surface-2 border border-hairline/30 leading-relaxed">
                          "{PRESETS[activePreset].result.email.body}"
                        </p>
                      </div>
                    )}

                    {PRESETS[activePreset].result.digest && (
                      <div className="p-4 rounded-lg border border-hairline bg-canvas space-y-3">
                        <span className="text-[9px] text-accent-olive font-bold uppercase tracking-wider flex items-center gap-1 mb-1">
                          <Bot className="w-3 h-3" /> Focus Digest Brief
                        </span>
                        {PRESETS[activePreset].result.digest.map((d, index) => (
                          <div key={index} className="border-t border-hairline pt-2 first:border-0 first:pt-0">
                            <div className="flex items-center justify-between mb-0.5">
                              <span className="text-[10px] font-bold text-ink">{d.from}</span>
                              <span className="text-[8px] font-bold uppercase px-1 rounded bg-accent-olive/10 text-accent-olive">{d.priority}</span>
                            </div>
                            <p className="text-[10px] text-ink-secondary leading-snug">{d.text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 border border-dashed border-hairline rounded-lg text-center h-[200px] text-ink-faint">
                    <Sliders className="w-5 h-5 text-hairline-strong mb-2" />
                    <span className="text-xs font-sans">Awaiting prompt submission...</span>
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
    <section id="clarity" className="px-6 py-32 border-b border-hairline bg-surface-1">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <span className="eyebrow text-accent-olive">Priority classification</span>
          <h2 className="heading-1 mt-2 text-ink">From Chaos to Clarity</h2>
          <p className="body-md text-ink-secondary max-w-xl mx-auto mt-3">
            Say goodbye to unsorted inboxes. Syncar categorizes priority queues, letting you focus on the details that require actions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Flow Trigger (5 Columns) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <h3 className="heading-2 text-ink">Clean workspace priorities</h3>
            <p className="body-sm text-ink-secondary leading-relaxed">
              When emails sync locally, background workers map key metadata to Gemini. Syncar analyzes thread context, calendar slots, and contact values to organize them into priorities.
            </p>

            <button
              onClick={runSorting}
              disabled={isSorting}
              className="btn btn-primary inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold"
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
            className="lg:col-span-7 rounded-xl border border-hairline p-6 relative overflow-hidden bg-canvas min-h-[340px] flex flex-col justify-between shadow-xl"
          >
            {/* Header bar */}
            <div className="flex items-center justify-between pb-4 border-b border-hairline">
              <span className="text-[10px] font-sans font-bold text-ink-secondary flex items-center gap-1.5 uppercase tracking-wider">
                <Database className="w-3.5 h-3.5 text-accent-olive" /> Local cache inbox
              </span>
              <span className="text-[9px] bg-accent-olive/10 text-accent-olive font-bold px-2.5 py-0.5 rounded-sm border border-accent-olive/20">
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
                        className="p-3.5 rounded-lg border border-hairline bg-surface-1 flex items-center justify-between"
                      >
                        <div className="overflow-hidden flex-1 pr-4 text-xs">
                          <span className="text-[9px] font-bold text-ink-muted">{item.from}</span>
                          <h4 className="font-bold text-ink truncate mt-0.5">{item.subject}</h4>
                        </div>
                        <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded bg-surface-2 text-ink-secondary border border-hairline">
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
                        className="absolute inset-0 border-2 border-accent-olive rounded-full border-t-transparent"
                      />
                      <Bot className="w-5 h-5 text-accent-olive" />
                    </div>
                    <span className="text-xs text-accent-olive font-medium animate-pulse">Running priority matrix...</span>
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
                            ? "bg-canvas border-red-500/20" 
                            : item.priority === "MEDIUM"
                            ? "bg-canvas border-amber-500/20"
                            : "bg-surface-1/40 border-hairline/10 opacity-45"
                        }`}
                      >
                        <div className="overflow-hidden flex-1 pr-4 text-xs">
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-bold text-ink-muted">{item.from}</span>
                            {item.priority === "HIGH" ? (
                              <span className="text-[8px] font-bold bg-red-500/10 text-red-400 px-1 rounded uppercase">High</span>
                            ) : item.priority === "MEDIUM" ? (
                              <span className="text-[8px] font-bold bg-amber-500/10 text-amber-400 px-1 rounded uppercase">Medium</span>
                            ) : (
                              <span className="text-[8px] font-bold bg-surface-2 text-ink-muted px-1 rounded uppercase">Low</span>
                            )}
                          </div>
                          <h4 className="font-bold text-ink truncate mt-0.5">{item.subject}</h4>
                        </div>
                        {item.priority === "LOW" ? (
                          <span className="text-[9px] text-ink-muted font-medium italic">Auto-archived</span>
                        ) : (
                          <span className="text-[9px] text-emerald-400 font-bold">Priority Classified</span>
                        )}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Smart Digest Summary */}
            <div className="p-4 rounded-lg bg-surface-1 border border-hairline flex items-start gap-2.5 text-xs text-left">
              <Bot className="w-5 h-5 text-accent-olive flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-ink block">AI Focus Summary:</span>
                <span className="text-ink-secondary mt-1 block leading-relaxed">
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
    <section id="intelligence" className="px-6 py-32 border-b border-hairline" style={{ background: "var(--canvas)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <span className="eyebrow text-accent-olive">Coordinate Extract</span>
          <h2 className="heading-1 mt-2 text-ink">Calendar Intelligence</h2>
          <p className="body-md text-ink-secondary max-w-xl mx-auto mt-3">
            Schedule meetings without app hopping. Syncar highlights proposed slots and books events directly from email context.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Email Pane (Left - 6 Columns) */}
          <div className="lg:col-span-6 bento-card border border-hairline flex flex-col justify-between bg-surface-1 text-left">
            <div>
              {/* Email Header */}
              <div className="flex items-center justify-between pb-4 border-b border-hairline mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-accent-olive/10 text-accent-olive flex items-center justify-center font-bold text-xs">S</div>
                  <div>
                    <h4 className="text-xs font-bold text-ink">Sarah Chen</h4>
                    <p className="text-[10px] text-ink-muted">sarah@partner-firm.com</p>
                  </div>
                </div>
                <span className="text-[10px] text-ink-muted">Yesterday, 4:18 PM</span>
              </div>

              <div>
                <span className="text-[9px] uppercase font-bold text-ink-muted tracking-wider">Subject: Partnership Deck Coordination</span>
                
                {/* Email Body */}
                <div className="mt-4 text-xs text-ink-secondary leading-relaxed bg-canvas p-4 rounded-lg border border-hairline">
                  <p>Hi Manoj,</p>
                  <br />
                  <p>
                    I reviewed the proposal documents. Let's sync up for 30 minutes to lock in the final revisions. 
                    I checked my calendar and I can do{" "}
                    <span 
                      onMouseEnter={() => setHoveredTime("tuesday")}
                      onMouseLeave={() => setHoveredTime(null)}
                      onClick={() => confirmMeeting("tuesday")}
                      className="inline-block px-1.5 py-0.5 rounded cursor-pointer border border-accent-olive text-accent-olive font-semibold bg-accent-olive/10 hover:bg-accent-olive/20 transition-all font-sans"
                    >
                      next Tuesday at 2:00 PM
                    </span>{" "}
                    or{" "}
                    <span
                      onMouseEnter={() => setHoveredTime("friday")}
                      onMouseLeave={() => setHoveredTime(null)}
                      onClick={() => confirmMeeting("friday")}
                      className="inline-block px-1.5 py-0.5 rounded cursor-pointer border border-accent-olive text-accent-olive font-semibold bg-accent-olive/10 hover:bg-accent-olive/20 transition-all font-sans"
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

            <div className="mt-6 pt-4 border-t border-hairline text-[10px] text-ink-muted flex items-center gap-2">
              <Bot className="w-3.5 h-3.5 text-accent-olive" />
              <span>Hover over dates in the email to preview calendar slots. Click to schedule.</span>
            </div>
          </div>

          {/* Calendar Day Grid (Right - 6 Columns) */}
          <div className="lg:col-span-6 bento-card border border-hairline flex flex-col justify-between bg-surface-1 text-left">
            <div className="w-full">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-hairline mb-6">
                <span className="text-xs font-bold text-ink flex items-center gap-1.5 uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5 text-accent-olive" /> Calendar Day Agenda
                </span>
                <span className="text-[10px] text-ink-muted">June 2026</span>
              </div>

              {/* Day schedules */}
              <div className="space-y-6">
                {/* Tuesday Schedule */}
                <div>
                  <span className="text-[9px] uppercase font-bold text-ink-muted tracking-wider">Tuesday, June 16</span>
                  <div className="mt-2 space-y-2">
                    <div className="p-3 rounded border border-hairline bg-surface-2 text-xs flex items-center justify-between">
                      <span className="text-ink-secondary">10:00 AM - Internal Sync</span>
                      <span className="text-[9px] text-ink-muted font-mono">1h</span>
                    </div>

                    {/* Interactive Slot */}
                    <div 
                      onClick={() => confirmMeeting("tuesday")}
                      className={`p-3 rounded border border-dashed transition-all duration-300 text-xs flex items-center justify-between cursor-pointer ${
                        bookedSlot === "tuesday"
                          ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 font-semibold"
                          : hoveredTime === "tuesday"
                          ? "bg-accent-olive/10 border-accent-olive text-accent-olive font-semibold"
                          : "bg-canvas border-hairline text-ink-muted"
                      }`}
                    >
                      <span>
                        {bookedSlot === "tuesday" 
                          ? "✔ Partnership Review (Sarah Chen)" 
                          : hoveredTime === "tuesday"
                          ? "💡 Suggestion: Finalize Revisions (Sarah)" 
                          : "2:00 PM - Available slot"}
                      </span>
                      <span className="text-[9px] opacity-80">30m</span>
                    </div>
                  </div>
                </div>

                {/* Friday Schedule */}
                <div>
                  <span className="text-[9px] uppercase font-bold text-ink-muted tracking-wider">Friday, June 19</span>
                  <div className="mt-2 space-y-2">
                    {/* Interactive Slot */}
                    <div 
                      onClick={() => confirmMeeting("friday")}
                      className={`p-3 rounded border border-dashed transition-all duration-300 text-xs flex items-center justify-between cursor-pointer ${
                        bookedSlot === "friday"
                          ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 font-semibold"
                          : hoveredTime === "friday"
                          ? "bg-accent-olive/10 border-accent-olive text-accent-olive font-semibold"
                          : "bg-canvas border-hairline text-ink-muted"
                      }`}
                    >
                      <span>
                        {bookedSlot === "friday" 
                          ? "✔ Partnership Review (Sarah Chen)" 
                          : hoveredTime === "friday"
                          ? "💡 Suggestion: Finalize Revisions (Sarah)" 
                          : "11:00 AM - Available slot"}
                      </span>
                      <span className="text-[9px] opacity-80">30m</span>
                    </div>

                    <div className="p-3 rounded border border-hairline bg-surface-2 text-xs flex items-center justify-between">
                      <span className="text-ink-secondary">1:00 PM - Design Sign-off</span>
                      <span className="text-[9px] text-ink-muted font-mono">1.5h</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {bookedSlot && (
              <button 
                onClick={() => setBookedSlot(null)}
                className="mt-4 text-[10px] text-accent-olive hover:underline w-full text-right font-semibold"
              >
                Reset bookings
              </button>
            )}
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
    <section id="workspace" className="px-6 py-32 border-b border-hairline bg-surface-1">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="eyebrow text-accent-olive">Unified Dashboard</span>
          <h2 className="heading-1 mt-2 text-ink">A single source of truth</h2>
          <p className="body-md text-ink-secondary max-w-xl mx-auto mt-3">
            No separate apps. Mail, calendar, and your AI assistant work together. Click on emails below to witness live cross-pane updates.
          </p>
        </div>

        {/* View togglers */}
        <div className="flex justify-center gap-3 mb-8">
          {(["inbox", "calendar", "ai"] as const).map((view) => (
            <button
              key={view}
              onClick={() => setWorkspaceView(view)}
              className={`px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all border ${
                workspaceView === view 
                  ? "bg-accent-olive text-canvas border-accent-olive font-bold" 
                  : "bg-surface-2 border-hairline text-ink-secondary hover:text-ink"
              }`}
            >
              {view} view
            </button>
          ))}
        </div>

        {/* High-fidelity mockup box with single shadow */}
        <div 
          className="w-full rounded-lg overflow-hidden border border-hairline shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
          style={{ background: "var(--canvas)" }}
        >
          {/* Mock title bar */}
          <div className="flex items-center gap-2 px-6 py-4 border-b border-hairline bg-surface-1">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-hairline-strong" />
              <div className="w-2 h-2 rounded-full bg-hairline-strong" />
              <div className="w-2 h-2 rounded-full bg-hairline-strong" />
            </div>
            <div className="flex-1 flex items-center justify-center max-w-[280px] mx-auto bg-surface-2 border border-hairline rounded-sm py-0.5 px-3 text-[10px] text-ink-secondary font-sans font-semibold">
              workspace.syncar.ai/{workspaceView}
            </div>
          </div>

          {/* Connected Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[440px]">
            
            {/* INBOX COLUMN (4 Columns) */}
            <div className={`md:col-span-4 border-r border-hairline p-4 flex flex-col justify-between bg-canvas text-left ${workspaceView !== "inbox" ? "hidden md:flex" : ""}`}>
              <div>
                <span className="text-[10px] uppercase font-bold text-ink-muted block mb-4 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-accent-olive" /> Synced Inbox
                </span>

                <div className="space-y-2">
                  {emails.map((mail, idx) => (
                    <div
                      key={mail.from}
                      onClick={() => setSelectedMailIndex(idx)}
                      className={`p-3 rounded-lg border text-left cursor-pointer transition-all duration-150 ${
                        selectedMailIndex === idx 
                          ? "bg-surface-1 border-hairline-strong shadow-inner" 
                          : "bg-transparent border-transparent hover:bg-surface-2"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-ink">{mail.from}</span>
                        <span className="text-[8px] font-bold uppercase px-1.5 py-0.5 rounded bg-accent-olive/10 text-accent-olive">
                          {mail.priority}
                        </span>
                      </div>
                      <h4 className="text-xs text-ink-secondary mt-1 truncate">{mail.subject}</h4>
                      <span className="text-[9px] text-ink-muted block mt-2">{mail.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CALENDAR COLUMN (4 Columns) */}
            <div className={`md:col-span-4 border-r border-hairline p-4 flex flex-col justify-between bg-canvas text-left ${workspaceView !== "calendar" ? "hidden md:flex" : ""}`}>
              <div>
                <span className="text-[10px] uppercase font-bold text-ink-muted block mb-4 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-accent-olive" /> Calendar Agenda
                </span>

                <div className="space-y-3">
                  <div className={`p-3 rounded-lg border transition-all duration-300 ${
                    activeEmail.calHighlight === "11:00 AM"
                      ? "bg-accent-olive/10 border-accent-olive text-ink font-semibold"
                      : "bg-surface-1 border-hairline text-ink-secondary"
                  }`}>
                    <span className="text-[9px] block">11:00 AM - 11:30 AM</span>
                    <span className="text-xs font-bold block mt-0.5">Partnership Sync</span>
                  </div>

                  <div className={`p-3 rounded-lg border transition-all duration-300 ${
                    activeEmail.calHighlight === "2:00 PM"
                      ? "bg-accent-olive/10 border-accent-olive text-ink font-semibold"
                      : "bg-surface-1 border-hairline text-ink-secondary"
                  }`}>
                    <span className="text-[9px] block">2:00 PM - 2:30 PM</span>
                    <span className="text-xs font-bold block mt-0.5">Database Bug Debugging</span>
                  </div>

                  <div className={`p-3 rounded-lg border transition-all duration-300 ${
                    activeEmail.calHighlight === "4:00 PM"
                      ? "bg-accent-olive/10 border-accent-olive text-ink font-semibold"
                      : "bg-surface-1 border-hairline text-ink-secondary"
                  }`}>
                    <span className="text-[9px] block">4:00 PM - 4:45 PM</span>
                    <span className="text-xs font-bold block mt-0.5">Design Sign-off Review</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI CONTEXT COLUMN (4 Columns) */}
            <div className={`md:col-span-4 p-4 flex flex-col justify-between bg-surface-1 text-left ${workspaceView !== "ai" ? "hidden md:flex" : ""}`}>
              <div className="space-y-4">
                <span className="text-[10px] uppercase font-bold text-ink-muted block flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5 text-accent-olive" /> AI Context Assistant
                </span>

                {/* Email Summary Box */}
                <div className="p-3.5 rounded-lg border border-hairline bg-canvas">
                  <span className="text-[8px] uppercase tracking-wider font-bold text-ink-muted block mb-1">Context Summary</span>
                  <p className="text-xs text-ink leading-relaxed font-sans">{activeEmail.summary}</p>
                </div>

                {/* AI Draft Suggestion */}
                <div className="p-3.5 rounded-lg border border-hairline bg-canvas">
                  <span className="text-[8px] uppercase tracking-wider font-bold text-accent-olive block mb-2 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 animate-pulse" /> Auto-reply draft
                  </span>
                  <p className="text-[10px] text-ink-secondary italic p-2 rounded bg-surface-2 border border-hairline/30 leading-relaxed">
                    "{activeEmail.aiDraft}"
                  </p>
                </div>
              </div>

              <button className="w-full btn btn-primary text-xs uppercase tracking-wider flex items-center gap-2 justify-center py-2.5">
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
    <section id="speed" className="px-6 py-32 border-b border-hairline" style={{ background: "var(--canvas)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <span className="eyebrow text-accent-olive">Keyboard First Engine</span>
          <h2 className="heading-1 mt-2 text-ink">Built for the Speed Layer</h2>
          <p className="body-md text-ink-secondary max-w-xl mx-auto mt-3">
            Keep your hands on the home row. Syncar matches Superhuman's extreme speed and Raycast's quick menus. Try it right now on this page.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Command Palette UI (6 Columns) */}
          <div className="bento-card border border-hairline bg-surface-1 p-6 relative flex flex-col justify-between min-h-[300px] text-left">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-hairline mb-6">
                <span className="text-xs font-bold text-ink-secondary flex items-center gap-1.5 uppercase tracking-wider">
                  <Command className="w-3.5 h-3.5 text-accent-olive" /> Quick Command Palette
                </span>
                <span className="text-[10px] text-ink-muted uppercase tracking-wider font-semibold">Interactable</span>
              </div>

              {/* Clickable mock search bar */}
              <div 
                onClick={triggerInputSearch}
                className="w-full flex items-center justify-between bg-canvas border border-hairline p-3 rounded-lg hover:border-hairline-strong transition-all cursor-pointer shadow-inner"
              >
                <span className="text-xs text-ink-secondary flex items-center gap-2"><Search className="w-4 h-4 text-accent-olive" /> Search commands or workflows...</span>
                <kbd className="text-[9px] font-mono bg-surface-2 border border-hairline px-1.5 py-0.5 rounded text-accent-olive font-bold">K</kbd>
              </div>

              <div className="space-y-2 mt-4">
                <div 
                  onClick={() => setView("inbox", "Opened Inbox", "I")}
                  className="p-2.5 rounded hover:bg-surface-2 cursor-pointer flex items-center justify-between text-xs text-ink transition-all border border-transparent hover:border-hairline"
                >
                  <span className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-accent-olive" /> Switch to Inbox</span>
                  <span className="text-[10px] text-ink-muted">Press I</span>
                </div>
                <div 
                  onClick={() => setView("calendar", "Opened Calendar", "C")}
                  className="p-2.5 rounded hover:bg-surface-2 cursor-pointer flex items-center justify-between text-xs text-ink transition-all border border-transparent hover:border-hairline"
                >
                  <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-accent-olive" /> Switch to Calendar</span>
                  <span className="text-[10px] text-ink-muted">Press C</span>
                </div>
                <div 
                  onClick={() => setView("ai", "Opened AI Agent", "A")}
                  className="p-2.5 rounded hover:bg-surface-2 cursor-pointer flex items-center justify-between text-xs text-ink transition-all border border-transparent hover:border-hairline"
                >
                  <span className="flex items-center gap-2"><Bot className="w-3.5 h-3.5 text-accent-olive" /> Switch to AI Agent</span>
                  <span className="text-[10px] text-ink-muted">Press A</span>
                </div>
              </div>
            </div>

            <div className="text-[10px] text-ink-muted mt-4 border-t border-hairline pt-3 flex items-center gap-2">
              <Bot className="w-3.5 h-3.5 text-accent-olive" />
              <span>Press those keys anywhere on this page to test live shortcuts.</span>
            </div>
          </div>

          {/* Right Column: Speed details (6 Columns) */}
          <div className="space-y-6 text-left">
            <h3 className="heading-2 text-ink">Navigation at home row speeds</h3>
            <p className="body-sm text-ink-secondary leading-relaxed">
              Zero visual distractions, zero loading states. Syncar is built with keyboard triggers to let you traverse email replies, calendar coordinate bookings, search indices, and integrations with minimal resistance.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-hairline bg-surface-1">
                <span className="text-[9px] uppercase font-bold text-accent-olive block mb-1">Sub-100ms Ingest</span>
                <p className="text-[10px] text-ink-secondary leading-relaxed">Cached index renders state changes offline instantly, saving changes to PostgreSQL in the background.</p>
              </div>

              <div className="p-4 rounded-lg border border-hairline bg-surface-1">
                <span className="text-[9px] uppercase font-bold text-accent-olive block mb-1">Home Row Shortcuts</span>
                <p className="text-[10px] text-ink-secondary leading-relaxed">Archive, delete, draft, and query search structures with fast key triggers built natively.</p>
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
    <section className="px-6 py-32 border-b border-hairline bg-surface-1">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <span className="eyebrow text-accent-olive">System architecture</span>
          <h2 className="heading-1 mt-2 text-ink">An operating system for work</h2>
          <p className="body-md text-ink-secondary max-w-xl mx-auto mt-3">
            An underlying architecture compiled for local speed, unified data consistency, and advanced LLM tool executions.
          </p>
        </div>

        {/* Bento Grid Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {/* Box 1 */}
          <div className="bento-card border border-hairline bg-canvas flex flex-col justify-between p-6">
            <div>
              <div className="w-8 h-8 rounded border border-hairline bg-surface-1 flex items-center justify-center mb-4">
                <Database className="w-4 h-4 text-accent-olive" />
              </div>
              <h3 className="heading-3 mb-2 text-ink text-sm">Local-First Cache Index</h3>
              <p className="text-[10px] text-ink-secondary leading-relaxed">
                Synchronized PostgreSQL database replicating critical Gmail message headers and Google Calendar schedules. Queries retrieve instantly without direct API hops.
              </p>
            </div>
          </div>

          {/* Box 2 */}
          <div className="bento-card border border-hairline bg-canvas flex flex-col justify-between p-6">
            <div>
              <div className="w-8 h-8 rounded border border-hairline bg-surface-1 flex items-center justify-center mb-4">
                <Globe className="w-4 h-4 text-accent-olive" />
              </div>
              <h3 className="heading-3 mb-2 text-ink text-sm">Corsair Sync Webhooks</h3>
              <p className="text-[10px] text-ink-secondary leading-relaxed">
                Webhook streams coordinate and sync remote alterations in background workers, keeping local datasets always aligned and resolving conflicts in real-time.
              </p>
            </div>
          </div>

          {/* Box 3 */}
          <div className="bento-card border border-hairline bg-canvas flex flex-col justify-between p-6">
            <div>
              <div className="w-8 h-8 rounded border border-hairline bg-surface-1 flex items-center justify-center mb-4">
                <Search className="w-4 h-4 text-accent-olive" />
              </div>
              <h3 className="heading-3 mb-2 text-ink text-sm">pgvector Semantic Search</h3>
              <p className="text-[10px] text-ink-secondary leading-relaxed">
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
    <section className="px-6 py-32 border-b border-hairline" style={{ background: "var(--canvas)" }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <span className="eyebrow text-accent-olive">Guided Setup</span>
          <h2 className="heading-1 mt-2 text-ink">Connect in 3 minutes</h2>
          <p className="body-md text-ink-secondary mt-3">
            Secure, sandboxed local environment initialized immediately upon sign up.
          </p>
        </div>

        <div className="space-y-4 text-left">
          {ONBOARDING_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="flex items-start gap-4 p-5 rounded-lg border border-hairline bg-surface-1"
            >
              <span className="text-lg font-bold tabular-nums text-accent-olive/60 w-8">
                {step.step}
              </span>
              <div className="flex-1 text-left">
                <h3 className="text-sm font-semibold mb-1 text-ink">{step.title}</h3>
                <p className="text-xs text-ink-secondary leading-relaxed">{step.desc}</p>
              </div>
              <CheckCircle2 className="w-4 h-4 text-accent-olive flex-shrink-0 mt-0.5" />
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
    <section className="px-6 py-32" style={{ background: "var(--surface-1)" }}>
      <div 
        className="max-w-2xl mx-auto text-center p-12 rounded-xl border border-hairline bg-canvas w-full shadow-2xl"
      >
        <div className="flex flex-col items-center gap-6 mb-8 w-full">
          <span className="eyebrow text-accent-olive font-bold">Get Started</span>
          <h2 className="display-2 text-ink text-balance tracking-[-1.875px]" style={{ maxWidth: "38rem" }}>Reclaim your inbox attention</h2>
          <p className="body-md text-ink-secondary text-balance" style={{ maxWidth: "32rem" }}>
            Experience local inbox execution speed. Join the beta and coordinate workflows with natural AI commands.
          </p>
        </div>
        <Link href="/sign-up" className="btn btn-hero-pill inline-flex items-center gap-2">
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
      className="px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-hairline text-[11px]"
      style={{ background: "var(--canvas)", color: "var(--ink-muted)" }}
    >
      <div className="flex items-center">
        <Brand size="xs" textClassName="font-semibold animate-none" />
        <span className="ml-2 opacity-60">· AI Workspace Layer</span>
      </div>
      <p>Next.js 16 · Corsair Dev Engine · Gemini Flash · Clerk Auth · PostgreSQL Vector</p>
      <p>© 2026 Syncar. All rights reserved.</p>
    </footer>
  );
}
"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Brand } from "@/components/ui/Brand";
import { useUser } from "@clerk/nextjs";
import { useUIStore } from "@/lib/store/ui.store";
import { motion, AnimatePresence } from "framer-motion";
import {
  BoltIcon, CpuChipIcon, CalendarIcon, EnvelopeIcon, MagnifyingGlassIcon,
  CommandLineIcon, ArrowRightIcon, CheckCircleIcon, SparklesIcon, SunIcon,
  MoonIcon, ClockIcon, PaperAirplaneIcon, GlobeAltIcon, ServerIcon,
  ArrowsRightLeftIcon, XMarkIcon, CheckIcon, AdjustmentsHorizontalIcon,
  ArrowPathIcon, Bars3Icon
} from "@heroicons/react/24/outline";

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

const EASE_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number];
const EASE_OUT = [0.25, 1, 0.5, 1] as [number, number, number, number];

const MotionLink = motion(Link);

const arrowVariants = {
  initial: { x: 0 },
  hover: { x: 4, transition: { type: "spring" as const, stiffness: 400, damping: 25 } }
};

const heroContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: EASE_EXPO
    }
  }
};

const bentoContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const bentoItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_EXPO } }
};

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
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border border-hairline shadow-sm bg-surface-1"
          >
            <BoltIcon className="w-4 h-4 text-ink animate-pulse" />
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-ink">{toast.message}</span>
              {toast.shortcut && (
                <span className="caption text-ink-muted">
                  Shortcut: <kbd className="bg-surface-3 px-1 py-0.5 rounded text-ink font-mono font-bold">{toast.shortcut}</kbd>
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
    <span className="inline-flex items-center px-3 py-1 rounded-full bg-ink/5 text-ink-secondary border border-ink/10 mb-4 eyebrow">
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
            ? "bg-canvas/80 backdrop-blur-md border-b border-hairline/80 shadow-[0_2px_12px_-3px_rgba(0,0,0,0.04)]" 
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
            <div className="hidden lg:flex justify-center items-center gap-6 text-sm font-medium text-ink-secondary">
              <a href="#transform" className="hover:text-ink transition-colors duration-200 whitespace-nowrap">Compare</a>
              <a href="#commands" className="hover:text-ink transition-colors duration-200 whitespace-nowrap">Commands</a>
              <a href="#clarity" className="hover:text-ink transition-colors duration-200 whitespace-nowrap">AI Filter</a>
              <a href="#intelligence" className="hover:text-ink transition-colors duration-200 whitespace-nowrap">Calendar</a>
              <a href="#workspace" className="hover:text-ink transition-colors duration-200 whitespace-nowrap">Workspace</a>
              <a href="#speed" className="hover:text-ink transition-colors duration-200 whitespace-nowrap">Speed Layer</a>
            </div>

            {/* Column 3: Actions */}
            <div className="flex justify-end items-center gap-3">
              <div className="hidden sm:flex items-center gap-2">
                {!isLoaded && (
                  <div className="animate-pulse flex items-center gap-2">
                    <div className="h-8 w-14 bg-ink/5 rounded" />
                    <div className="h-9 w-24 bg-ink/10 rounded-md" />
                  </div>
                )}
                {isLoaded && !isSignedIn && (
                  <>
                    <MotionLink
                      href="/sign-in"
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className="text-sm font-medium px-3 py-1.5 rounded text-ink-secondary hover:text-ink transition-all duration-200 whitespace-nowrap"
                    >
                      Sign in
                    </MotionLink>
                    <MotionLink
                      href="/sign-up"
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-lovable-primary px-3.5 py-2 text-sm font-medium rounded-md whitespace-nowrap"
                    >
                      Get started
                    </MotionLink>
                  </>
                )}
                {isLoaded && isSignedIn && (
                  <MotionLink
                    href="/inbox"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-lovable-primary px-3.5 py-2 text-sm font-medium rounded-md whitespace-nowrap"
                  >
                    Go to Workspace
                  </MotionLink>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 rounded-md border border-hairline hover:bg-surface-1 hover:border-hairline-strong transition-all text-ink-secondary hover:text-ink flex items-center justify-center"
                title="Toggle Theme"
              >
                {mounted ? (
                  theme === "light" ? <MoonIcon className="w-4 h-4" /> : <SunIcon className="w-4 h-4" />
                ) : (
                  <div className="w-4 h-4" />
                )}
              </motion.button>

              {/* Mobile Menu Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(prev => !prev)}
                className="lg:hidden p-2 rounded-md border border-hairline hover:bg-surface-1 transition-all text-ink-secondary hover:text-ink flex items-center justify-center"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <XMarkIcon className="w-4 h-4" /> : <Bars3Icon className="w-4 h-4" />}
              </motion.button>
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
            className="fixed top-16 left-0 right-0 z-40 bg-canvas border-b border-hairline shadow-lg lg:hidden p-6 flex flex-col gap-4 text-left"
          >
            <div className="flex flex-col gap-3.5 text-sm font-medium text-ink-secondary">
              <a 
                href="#transform" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-ink transition-colors py-1.5 border-b border-hairline"
              >
                Compare
              </a>
              <a 
                href="#commands" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-ink transition-colors py-1.5 border-b border-hairline"
              >
                Commands
              </a>
              <a 
                href="#clarity" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-ink transition-colors py-1.5 border-b border-hairline"
              >
                AI Filter
              </a>
              <a 
                href="#intelligence" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-ink transition-colors py-1.5 border-b border-hairline"
              >
                Calendar
              </a>
              <a 
                href="#workspace" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-ink transition-colors py-1.5 border-b border-hairline"
              >
                Workspace
              </a>
              <a 
                href="#speed" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-ink transition-colors py-1.5"
              >
                Speed Layer
              </a>
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-hairline">
              {isLoaded && !isSignedIn && (
                <>
                  <Link
                    href="/sign-in"
                    className="w-full text-center text-sm font-medium py-2 rounded border border-hairline text-ink-secondary hover:text-ink"
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
      className="relative flex flex-col items-center justify-center min-h-screen pt-28 pb-16 px-6 text-center overflow-hidden border-b border-hairline"
      style={{ background: "var(--canvas)" }}
    >
      <motion.div 
        variants={heroContainerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center max-w-5xl w-full"
      >
        {/* Active Engine Indicator */}
        <motion.div 
          variants={heroItemVariants}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 border border-hairline bg-surface-1"
        >
          <span className={`w-1.5 h-1.5 rounded-full ${state === "success" ? "bg-emerald-500 animate-pulse" : "bg-ink"}`} />
          <span className="caption text-ink-secondary font-medium">
            Orchestrator: <span className="text-ink font-semibold">{state === "typing" ? "Ingesting" : state === "ingest" ? "Parsing" : state === "resolving" ? "Executing" : "Resolved"}</span>
          </span>
        </motion.div>

        {/* Aggressive Display Headline */}
        <motion.h1 
          variants={heroItemVariants}
          className="display-1 max-w-4xl mb-6 text-ink tracking-[-0.04em] leading-[1.05] font-semibold"
        >
          Stop managing email.
          <br />
          <span className="opacity-50">Start managing outcomes.</span>
        </motion.h1>

        <motion.p 
          variants={heroItemVariants}
          className="body-md max-w-2xl mb-10 text-ink-secondary leading-relaxed"
        >
          Syncar is the local-first command layer for communication. Connect Gmail and Google Calendar to turn scattered threads into high-speed, automated AI workflows.
        </motion.p>

        {/* Call to Actions (Hero rounded exceptions) */}
        <motion.div 
          variants={heroItemVariants}
          className="flex flex-col sm:flex-row items-center gap-3 mb-16"
        >
          {isLoaded && !isSignedIn && (
            <>
              <MotionLink 
                href="/sign-up" 
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
                className="btn-lovable-primary px-6 py-3 text-sm font-medium rounded-md inline-flex items-center gap-2"
              >
                Connect Workspace Free
                <motion.span variants={arrowVariants} className="flex items-center justify-center">
                  <ArrowRightIcon className="w-4 h-4" />
                </motion.span>
              </MotionLink>
              <motion.a 
                href="#transform" 
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
                className="btn-lovable-outline px-6 py-3 text-sm font-medium rounded-md text-ink inline-flex items-center gap-2"
              >
                See Comparative Flow
                <motion.span variants={arrowVariants} className="flex items-center justify-center">
                  <ArrowRightIcon className="w-4 h-4" />
                </motion.span>
              </motion.a>
            </>
          )}
          {isLoaded && isSignedIn && (
            <MotionLink 
              href="/inbox" 
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
              className="btn-lovable-primary px-6 py-3 text-sm font-medium rounded-md inline-flex items-center gap-2"
            >
              Enter My Workspace
              <motion.span variants={arrowVariants} className="flex items-center justify-center">
                <ArrowRightIcon className="w-4 h-4" />
              </motion.span>
            </MotionLink>
          )}
        </motion.div>

        {/* Immersive Living Workflow Canvas */}
        <motion.div 
          variants={heroItemVariants}
          className="w-full max-w-4xl rounded-xl border border-hairline overflow-hidden relative shadow-sm flex flex-col p-8 bg-surface-1"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-hairline pb-4 mb-6">
            <span className="text-sm font-medium text-ink-secondary">Interactive simulator</span>
            <div className="caption bg-ink/5 text-ink font-medium px-2.5 py-0.5 rounded-md border border-ink/10">
              {currentScenario.badge}
            </div>
          </div>

          {/* Living Canvas Core layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative min-h-[200px]">
            
            {/* Input Node (Left) */}
            <div className="md:col-span-4 flex flex-col gap-2 text-left z-10">
              <span className="text-sm font-medium text-ink-muted">Inbound prompt</span>
              <div 
                className="p-4 rounded-lg border border-hairline min-h-[90px] flex items-start gap-2 relative bg-[#f7f4ed] dark:bg-surface-2 shadow-inner"
              >
                <div className="caption text-ink leading-relaxed">
                  "{typedPrompt}"
                  {state === "typing" && <span className="animate-pulse text-ink font-bold">|</span>}
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
                      ? "bg-emerald-555/5 border-emerald-500 text-emerald-600 shadow-[0_0_20px_rgba(16,185,129,0.05)]" 
                      : state === "resolving" || state === "ingest"
                      ? "bg-ink border-ink text-canvas animate-pulse"
                      : "bg-surface-1 border-hairline text-ink-muted"
                  }`}
                >
                  <CpuChipIcon className="w-6 h-6" />
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
                      className="caption text-ink-secondary font-medium"
                    >
                      {currentScenario.steps[0]}
                    </motion.span>
                  )}
                  {state === "success" && (
                    <motion.span 
                      key="success-log"
                      initial={{ y: 8, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="caption text-emerald-600 font-semibold"
                    >
                      ✔ Completed in 1.2s
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Resolved Targets Node (Right) */}
            <div className="md:col-span-4 flex flex-col gap-3 text-left relative z-10">
              <span className="text-sm font-medium text-ink-muted">Executed action</span>
              
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
                        <CalendarIcon className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-ink">{currentScenario.calendarDetail.title}</p>
                          <p className="caption text-ink-secondary flex items-center gap-1 mt-0.5">
                            <ClockIcon className="w-3.5 h-3.5 text-ink-muted" /> {currentScenario.calendarDetail.time}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Email draft created */}
                    {currentScenario.emailDetail && (
                      <div className="p-3 rounded-lg border border-hairline bg-surface-1 flex items-start gap-2.5 max-w-full">
                        <EnvelopeIcon className="w-4 h-4 text-ink mt-0.5 flex-shrink-0" />
                        <div className="overflow-hidden flex-1 text-sm">
                          <p className="text-sm text-ink-muted">To: {currentScenario.emailDetail.to}</p>
                          <p className="font-semibold text-ink truncate mt-0.5">{currentScenario.emailDetail.subject}</p>
                          <p className="text-sm text-ink-secondary truncate mt-0.5 italic">"{currentScenario.emailDetail.body}"</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 border border-dashed border-hairline rounded-lg text-center h-[160px] text-zinc-400 w-full">
                    <ClockIcon className="w-4 h-4 mb-2 animate-spin text-ink-muted" />
                    <span className="caption text-ink-muted">Awaiting orchestrator...</span>
                  </div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </motion.div>
      </motion.div>
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
    <motion.section 
      id="transform"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.8, ease: EASE_EXPO }}
      className="px-6 py-24 border-b border-hairline bg-transparent"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <SectionEyebrow>Comparison</SectionEyebrow>
          <h2 className="heading-1 mt-2 text-ink font-semibold tracking-[-0.03em]">Friction Comparison</h2>
          <p className="body-md text-ink-secondary max-w-xl mx-auto mt-3">
            Siloed apps introduce coordination friction. Compare step-by-step clicks side-by-side.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Traditional Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.8, delay: 0.08, ease: EASE_EXPO }}
            className="bg-surface-1 border border-hairline rounded-xl p-8 flex flex-col justify-between relative shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-hairline mb-8">
                <span className="text-sm font-semibold text-ink-secondary flex items-center gap-1.5">
                  <ArrowsRightLeftIcon className="w-3.5 h-3.5" /> Siloed Gmail + Calendar
                </span>
                <span className="text-sm text-ink-muted font-semibold">17 steps</span>
              </div>

              {/* Progress steps */}
              <div className="space-y-4 pr-2 text-left">
                {traditionalSteps.map((step, idx) => (
                  <motion.div 
                    key={step.title} 
                    layout
                    className={`p-3.5 rounded-lg border transition-all duration-200 ${
                      activeStep === idx 
                        ? "bg-surface-2 border-hairline-strong text-ink font-semibold" 
                        : idx < activeStep 
                        ? "bg-surface-1/50 border-hairline/20 text-ink-muted/40 line-through opacity-45" 
                        : "bg-transparent border-transparent text-ink-secondary"
                    }`}
                  >
                    <h4 className="caption font-semibold text-ink">{step.title}</h4>
                    <p className="caption text-ink-secondary mt-1 leading-normal">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-10 border-t border-hairline pt-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-ink-muted block">Clicks</span>
                  <p className="text-xl font-semibold font-mono tracking-tight text-ink">{clickCount}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-ink-muted block">Duration</span>
                  <p className="text-xl font-semibold font-mono tracking-tight text-ink">{timeText}</p>
                </div>
              </div>

              <motion.button 
                onClick={triggerSimulation}
                disabled={isPlaying}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full btn-lovable-outline px-4 py-2.5 text-sm font-medium rounded-md text-ink transition-all flex items-center justify-center gap-2"
              >
                {isPlaying ? "Simulating clicks..." : "Simulate clicks"}
              </motion.button>
            </div>
          </motion.div>

          {/* Syncar Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.8, delay: 0.16, ease: EASE_EXPO }}
            className="bg-surface-1 border border-hairline rounded-xl p-8 flex flex-col justify-between relative shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-hairline mb-8">
                <span className="text-sm font-semibold text-ink flex items-center gap-1.5">
                  <BoltIcon className="w-3.5 h-3.5" /> Syncar Flow
                </span>
                <span className="text-sm text-ink-muted font-semibold">1 Action</span>
              </div>

              <div className="p-6 rounded-lg border border-hairline bg-[#f7f4ed] dark:bg-surface-2 flex flex-col gap-3 min-h-[160px] justify-center text-left">
                <span className="text-sm font-medium text-ink-muted">Natural language prompt</span>
                <div className="caption text-ink p-3 rounded bg-surface-1 border border-hairline select-none">
                  "Schedule meeting with Sarah next Thursday afternoon"
                </div>

                <div className="flex items-center gap-2 caption text-ink-secondary mt-1">
                  <CpuChipIcon className="w-3.5 h-3.5 text-ink" />
                  <span>Syncar maps intent, creates event, and drafts reply confirmation.</span>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-hairline pt-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-ink-muted block">Clicks</span>
                  <p className="text-xl font-semibold font-mono tracking-tight text-ink">1 Action</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-ink-muted block">Duration</span>
                  <p className="text-xl font-semibold font-mono tracking-tight text-ink">1.8 seconds</p>
                </div>
              </div>

              <motion.button 
                onClick={triggerSyncar}
                disabled={syncarStatus !== "idle"}
                whileHover={syncarStatus === "idle" ? { scale: 1.01 } : {}}
                whileTap={syncarStatus === "idle" ? { scale: 0.99 } : {}}
                className={`w-full text-sm font-medium transition-all duration-300 py-2.5 rounded-md ${
                  syncarStatus === "success" 
                    ? "bg-emerald-550/10 border border-emerald-500/35 text-emerald-600 dark:text-emerald-400 cursor-default" 
                    : syncarStatus === "running"
                    ? "bg-[#f2eee5] dark:bg-surface-3 border border-hairline text-ink-muted animate-pulse"
                    : "btn-lovable-primary"
                }`}
              >
                {syncarStatus === "success" ? (
                  <span className="flex items-center justify-center gap-1.5"><CheckIcon className="w-4 h-4" /> Workflow Dispatched</span>
                ) : syncarStatus === "running" ? (
                  <span>Executing...</span>
                ) : (
                  <span className="flex items-center justify-center gap-1.5"><SparklesIcon className="w-3.5 h-3.5 animate-pulse" /> Execute in 1 click</span>
                )}
              </motion.button>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.section>
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
    <motion.section 
      id="commands"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.8, ease: EASE_EXPO }}
      className="px-6 py-24 border-b border-hairline bg-transparent"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <SectionEyebrow>Command workspace</SectionEyebrow>
          <h2 className="heading-1 mt-2 text-ink font-semibold tracking-[-0.03em]">AI Command Center</h2>
          <p className="body-md text-ink-secondary max-w-xl mx-auto mt-3">
            Trigger visual outcomes instantly. Click on one of the presets to watch the assistant resolve the action.
          </p>
        </div>

        {/* Presets List */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {PRESETS.map((p, idx) => (
            <motion.button
              key={p.title}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handlePresetClick(idx)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all border ${
                activePreset === idx 
                  ? "bg-ink border-ink text-canvas font-semibold" 
                  : "bg-surface-1 border-hairline text-ink-secondary hover:border-hairline-strong"
              }`}
            >
              {p.title}
            </motion.button>
          ))}
        </div>

        {/* Chat assistant container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.8, ease: EASE_EXPO }}
          className="w-full max-w-4xl mx-auto rounded-xl border border-hairline overflow-hidden shadow-sm bg-surface-1"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-hairline bg-surface-2">
            <span className="text-sm font-semibold text-ink flex items-center gap-2">
              <CpuChipIcon className="w-4 h-4 text-ink" /> Syncar AI Assistant
            </span>
            <span className="text-sm font-semibold text-ink-muted">Interactive shell</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[320px]">
            
            {/* Assistant Dialog Pane (Left 7 Columns) */}
            <div className="md:col-span-7 p-6 border-b md:border-b-0 md:border-r border-hairline flex flex-col justify-between bg-surface-1 min-h-[260px] text-left">
              <div className="space-y-5">
                {/* User Message */}
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded bg-surface-2 flex items-center justify-center font-semibold caption text-ink-secondary flex-shrink-0">U</div>
                  <div className="caption text-ink leading-relaxed">
                    {promptInput || "Select a preset above to ask the assistant..."}
                    {executing && !activeSteps.length && <span className="animate-pulse text-ink">|</span>}
                  </div>
                </div>

                {/* Assistant Processing Steps */}
                {activeSteps.length > 0 && (
                  <div className="flex items-start gap-3 border-t border-hairline pt-4">
                    <div className="w-7 h-7 rounded bg-ink text-canvas flex items-center justify-center flex-shrink-0">
                      <CpuChipIcon className="w-3.5 h-3.5" />
                    </div>
                    <div className="space-y-2 w-full">
                      <span className="text-sm font-medium text-ink-muted block">AI progress</span>
                      {activeSteps.map((step, idx) => (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, ease: EASE_OUT }}
                          className="caption text-ink-secondary flex items-center gap-2 leading-relaxed"
                        >
                          <CheckCircleIcon className="w-3.5 h-3.5 text-ink flex-shrink-0" />
                          <span>{step}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {!executing && !resolved && (
                <div className="caption text-ink-muted italic select-none">
                  Preset actions show checklist completions inside the assistant thread.
                </div>
              )}
            </div>

            {/* Resolved outcome container (Right 5 Columns) */}
            <div className="md:col-span-5 p-6 flex flex-col justify-center bg-surface-2 min-h-[220px] text-left">
              <span className="text-sm font-medium text-ink-muted mb-4 block">Resolution outcomes</span>

              <AnimatePresence mode="wait">
                {resolved && activePreset !== null ? (
                  <motion.div
                    key={activePreset}
                    initial={{ opacity: 0, scale: 0.98, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -8 }}
                    transition={{ duration: 0.3, ease: EASE_OUT }}
                    className="space-y-4"
                  >
                    {PRESETS[activePreset].result.event && (
                      <div className="p-4 rounded-lg border border-hairline bg-surface-1">
                        <span className="text-sm text-ink font-semibold flex items-center gap-1.5 mb-2">
                          <CalendarIcon className="w-3.5 h-3.5" /> Calendar block created
                        </span>
                        <h4 className="text-sm font-semibold text-ink font-sans">{PRESETS[activePreset].result.event.title}</h4>
                        <p className="caption text-ink-secondary mt-1 flex items-center gap-1">
                          <ClockIcon className="w-3.5 h-3.5 text-ink-muted" /> {PRESETS[activePreset].result.event.time}
                        </p>
                      </div>
                    )}

                    {PRESETS[activePreset].result.email && (
                      <div className="p-4 rounded-lg border border-hairline bg-surface-1 text-sm">
                        <span className="text-sm text-ink font-semibold flex items-center gap-1.5 mb-2">
                          <EnvelopeIcon className="w-3.5 h-3.5" /> Gmail draft confirmation
                        </span>
                        <p className="caption text-ink-muted">To: {PRESETS[activePreset].result.email.to}</p>
                        <p className="caption font-semibold text-ink mt-0.5 truncate">{PRESETS[activePreset].result.email.subject}</p>
                        <p className="caption text-ink-secondary mt-1.5 italic p-2 rounded bg-[#f7f4ed] dark:bg-surface-2 border border-hairline leading-relaxed">
                          "{PRESETS[activePreset].result.email.body}"
                        </p>
                      </div>
                    )}

                    {PRESETS[activePreset].result.digest && (
                      <div className="p-4 rounded-lg border border-hairline bg-surface-1 space-y-3">
                        <span className="text-sm text-ink font-semibold flex items-center gap-1.5 mb-1.5">
                          <CpuChipIcon className="w-3.5 h-3.5" /> Focus Digest Brief
                        </span>
                        {PRESETS[activePreset].result.digest.map((d, index) => (
                          <div key={index} className="border-t border-hairline pt-2 first:border-0 first:pt-0">
                            <div className="flex items-center justify-between mb-0.5 caption">
                              <span className="text-sm font-semibold text-ink">{d.from}</span>
                              <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-ink/5 text-ink">{d.priority}</span>
                            </div>
                            <p className="caption text-ink-secondary leading-snug">{d.text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 border border-dashed border-hairline rounded-lg text-center h-[200px] text-ink-muted">
                    <AdjustmentsHorizontalIcon className="w-5 h-5 text-hairline mb-2" />
                    <span className="caption">Awaiting prompt submission...</span>
                  </div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </motion.div>
      </div>
    </motion.section>
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
    { id: 4, from: "Priya Sharma", subject: "Lunch tomorrow at cafe?", desc: "Hey! Let know if you want to grab tacos at the cafe tomorrow at 1 PM.", priority: "MEDIUM" }
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

  const displayedEmails = isSorted 
    ? [...rawEmails].sort((a, b) => {
        const priorityOrder: Record<string, number> = { HIGH: 1, MEDIUM: 2, LOW: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      })
    : rawEmails;

  return (
    <motion.section 
      id="clarity"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.8, ease: EASE_EXPO }}
      className="px-6 py-24 border-b border-hairline bg-transparent"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <SectionEyebrow>Priority classification</SectionEyebrow>
          <h2 className="heading-1 mt-2 text-ink font-semibold tracking-[-0.03em]">From Chaos to Clarity</h2>
          <p className="body-md text-ink-secondary max-w-xl mx-auto mt-3">
            Say goodbye to unsorted inboxes. Syncar categorizes priority queues, letting you focus on the details that require actions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Flow Trigger (5 Columns) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <h3 className="heading-2 text-ink font-semibold tracking-[-0.02em]">Clean workspace priorities</h3>
            <p className="body-sm text-ink-secondary leading-relaxed">
              When emails sync locally, background workers map key metadata to Gemini. Syncar analyzes thread context, calendar slots, and contact values to organize them into priorities.
            </p>

            <motion.button
              onClick={runSorting}
              disabled={isSorting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2.5 inline-flex items-center gap-2 text-sm font-medium rounded-md bg-ink text-canvas hover:opacity-90 transition-all cursor-pointer"
            >
              {isSorting ? (
                <>
                  <ArrowPathIcon className="w-3.5 h-3.5 animate-spin" />
                  <span>Classifying...</span>
                </>
              ) : (
                <>
                  <SparklesIcon className="w-3.5 h-3.5" />
                  <span>Run priority classification</span>
                </>
              )}
            </motion.button>
          </div>

          {/* Right Column: Visualizer Box (7 Columns) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.8, ease: EASE_EXPO }}
            className="lg:col-span-7 rounded-xl border border-hairline p-6 relative overflow-hidden bg-surface-1 min-h-[340px] flex flex-col justify-between shadow-sm"
          >
            {/* Header bar */}
            <div className="flex items-center justify-between pb-4 border-b border-hairline">
              <span className="text-sm font-semibold text-ink flex items-center gap-1.5">
                <ServerIcon className="w-3.5 h-3.5 text-ink" /> Local cache inbox
              </span>
              <span className="text-sm bg-ink/5 text-ink font-medium px-2.5 py-0.5 rounded-md border border-ink/10">
                {isSorted ? "Classified" : isSorting ? "Parsing..." : "Pending Classify"}
              </span>
            </div>

            <div className="my-6 relative flex-1 flex flex-col justify-center text-left min-h-[220px]">
              <div className="space-y-2.5 relative">
                {/* Sorting progress scanner overlay */}
                <AnimatePresence>
                  {isSorting && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-canvas/30 backdrop-blur-[1px] z-10 flex flex-col items-center justify-center gap-3 rounded-lg"
                    >
                      <div className="relative w-12 h-12 flex items-center justify-center">
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          className="absolute inset-0 border-2 border-ink rounded-full border-t-transparent"
                        />
                        <CpuChipIcon className="w-5 h-5 text-ink" />
                      </div>
                      <span className="caption text-ink font-semibold animate-pulse">Running priority matrix...</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {displayedEmails.map((item) => {
                  const isHigh = item.priority === "HIGH";
                  const isMed = item.priority === "MEDIUM";
                  const isLow = item.priority === "LOW";
                  
                  return (
                    <motion.div 
                      key={item.id}
                      layout
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30
                      }}
                      className={`p-3.5 rounded-lg border flex items-center justify-between transition-all duration-300 ${
                        !isSorted
                          ? "bg-surface-2 border-hairline text-ink"
                          : isHigh 
                          ? "bg-surface-1 border-red-250 dark:border-red-900/30 bg-red-50/10 dark:bg-red-950/10 text-ink" 
                          : isMed
                          ? "bg-surface-1 border-amber-250 dark:border-amber-900/30 bg-amber-50/10 dark:bg-amber-950/10 text-ink"
                          : "bg-surface-1 border-hairline opacity-50 text-ink-muted"
                      }`}
                    >
                      <div className="overflow-hidden flex-1 pr-4 caption">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-ink-muted">{item.from}</span>
                          {isSorted && (
                            isHigh ? (
                              <span className="text-xs font-semibold bg-red-100/50 dark:bg-red-950/30 text-red-700 dark:text-red-400 px-1.5 py-0.5 rounded">High</span>
                            ) : isMed ? (
                              <span className="text-xs font-semibold bg-amber-100/50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 px-1.5 py-0.5 rounded">Medium</span>
                            ) : (
                              <span className="text-xs font-semibold bg-[#f2eee5]/50 dark:bg-surface-3/50 text-ink-muted px-1.5 py-0.5 rounded">Low</span>
                            )
                          )}
                        </div>
                        <h4 className="font-semibold text-ink truncate mt-0.5">{item.subject}</h4>
                      </div>
                      {isSorted && isLow ? (
                        <span className="caption text-ink-muted font-medium italic">Auto-archived</span>
                      ) : isSorted ? (
                        <span className="caption text-emerald-700 dark:text-emerald-400 font-semibold">Priority Classified</span>
                      ) : (
                        <span className="caption font-medium px-2 py-0.5 rounded-md bg-[#f2eee5] dark:bg-surface-3 text-ink-secondary border border-hairline/60">
                          Pending AI
                        </span>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Smart Digest Summary */}
            <div className="p-4 rounded-lg bg-[#f7f4ed] dark:bg-surface-2 border border-hairline flex items-start gap-2.5 text-sm text-left">
              <CpuChipIcon className="w-5 h-5 text-ink flex-shrink-0 mt-0.5" />
              <div>
                <span className="caption font-semibold text-ink block">AI Focus Summary:</span>
                <span className="caption text-ink-secondary mt-1 block leading-relaxed">
                  {isSorted 
                    ? "2 urgent high priority threads need your response. Newsletter archive scheduled." 
                    : "Inbox currently unparsed. Trigger sorting to run prioritization index."}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </motion.section>
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
    <motion.section 
      id="intelligence"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.8, ease: EASE_EXPO }}
      className="px-6 py-24 border-b border-hairline bg-transparent"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <SectionEyebrow>Coordinate Extract</SectionEyebrow>
          <h2 className="heading-1 mt-2 text-ink font-semibold tracking-[-0.03em]">Calendar Intelligence</h2>
          <p className="body-md text-ink-secondary max-w-xl mx-auto mt-3">
            Schedule meetings without app hopping. Syncar highlights proposed slots and books events directly from email context.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Email Pane (Left - 6 Columns) */}
          <motion.div 
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.8, delay: 0.08, ease: EASE_EXPO }}
            className="lg:col-span-6 bg-surface-1 border border-hairline rounded-xl p-8 flex flex-col justify-between text-left shadow-sm"
          >
            <div>
              {/* Email Header */}
              <div className="flex items-center justify-between pb-4 border-b border-hairline mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-surface-2 text-ink flex items-center justify-center font-bold caption">S</div>
                  <div>
                    <h4 className="text-sm font-semibold text-ink font-sans">Sarah Chen</h4>
                    <p className="caption text-ink-muted">sarah@partner-firm.com</p>
                  </div>
                </div>
                <span className="caption font-mono text-ink-muted font-semibold">Yesterday, 4:18 PM</span>
              </div>

              <div>
                <span className="caption font-semibold text-ink-secondary">Subject: Partnership Deck Coordination</span>
                
                {/* Email Body */}
                <div className="mt-4 text-sm text-ink-secondary leading-relaxed bg-surface-2 p-4 rounded-lg border border-hairline">
                  <p>Hi Manoj,</p>
                  <br />
                  <p>
                    I reviewed the proposal documents. Let's sync up for 30 minutes to lock in the final revisions. 
                    I checked my calendar and I can do{" "}
                    <motion.span 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onMouseEnter={() => setHoveredTime("tuesday")}
                      onMouseLeave={() => setHoveredTime(null)}
                      onClick={() => confirmMeeting("tuesday")}
                      className="inline-block px-1.5 py-0.5 rounded cursor-pointer border border-ink text-ink font-semibold bg-ink/5 hover:bg-ink/10 transition-all caption"
                    >
                      next Tuesday at 2:00 PM
                    </motion.span>{" "}
                    or{" "}
                    <motion.span
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onMouseEnter={() => setHoveredTime("friday")}
                      onMouseLeave={() => setHoveredTime(null)}
                      onClick={() => confirmMeeting("friday")}
                      className="inline-block px-1.5 py-0.5 rounded cursor-pointer border border-ink text-ink font-semibold bg-ink/5 hover:bg-ink/10 transition-all caption"
                    >
                      Friday at 11:00 AM
                    </motion.span>
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

            <div className="mt-6 pt-4 border-t border-hairline caption text-ink-muted flex items-center gap-2">
              <CpuChipIcon className="w-3.5 h-3.5 text-ink" />
              <span>Hover over dates in the email to preview calendar slots. Click to schedule.</span>
            </div>
          </motion.div>

          {/* Calendar Day Grid (Right - 6 Columns) */}
          <motion.div 
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.8, delay: 0.16, ease: EASE_EXPO }}
            className="lg:col-span-6 bg-surface-1 border border-hairline rounded-xl p-8 flex flex-col justify-between text-left shadow-sm"
          >
            <div className="w-full">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-hairline mb-6">
                <span className="text-sm font-semibold text-ink flex items-center gap-1.5">
                  <CalendarIcon className="w-3.5 h-3.5 text-ink" /> Calendar Day Agenda
                </span>
                <span className="caption text-ink-muted font-medium">June 2026</span>
              </div>

              {/* Day schedules */}
              <div className="space-y-6">
                {/* Tuesday Schedule */}
                <div>
                  <span className="caption font-semibold text-ink-secondary">Tuesday, June 16</span>
                  <div className="mt-2 space-y-2">
                    <div className="p-3 rounded border border-hairline bg-surface-2 text-sm flex items-center justify-between">
                      <span className="text-ink-secondary caption">10:00 AM - Internal Sync</span>
                      <span className="caption font-mono text-ink-muted font-semibold">1h</span>
                    </div>

                    {/* Interactive Slot */}
                    <motion.div 
                      onClick={() => confirmMeeting("tuesday")}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.99 }}
                      className={`p-3 rounded border border-dashed transition-all duration-300 text-sm flex items-center justify-between cursor-pointer ${
                        bookedSlot === "tuesday"
                          ? "bg-emerald-550 border-emerald-300 text-emerald-700 font-semibold"
                          : hoveredTime === "tuesday"
                          ? "bg-ink/5 border-ink text-ink font-semibold"
                          : "bg-surface-1 border-hairline text-ink-muted"
                      }`}
                    >
                      <span>
                        {bookedSlot === "tuesday" 
                          ? "✔ Partnership Review (Sarah Chen)" 
                          : hoveredTime === "tuesday"
                          ? "💡 Suggestion: Finalize Revisions (Sarah)" 
                          : "2:00 PM - Available slot"}
                      </span>
                      <span className="caption font-mono text-ink-muted font-semibold">30m</span>
                    </motion.div>
                  </div>
                </div>

                {/* Friday Schedule */}
                <div>
                  <span className="caption font-semibold text-ink-secondary">Friday, June 19</span>
                  <div className="mt-2 space-y-2">
                    {/* Interactive Slot */}
                    <motion.div 
                      onClick={() => confirmMeeting("friday")}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.99 }}
                      className={`p-3 rounded border border-dashed transition-all duration-300 text-sm flex items-center justify-between cursor-pointer ${
                        bookedSlot === "friday"
                          ? "bg-emerald-555 border-emerald-300 text-emerald-700 font-semibold"
                          : hoveredTime === "friday"
                          ? "bg-ink/5 border-ink text-ink font-semibold"
                          : "bg-surface-1 border-hairline text-ink-muted"
                      }`}
                    >
                      <span>
                        {bookedSlot === "friday" 
                          ? "✔ Partnership Review (Sarah Chen)" 
                          : hoveredTime === "friday"
                          ? "💡 Suggestion: Finalize Revisions (Sarah)" 
                          : "11:00 AM - Available slot"}
                      </span>
                      <span className="caption font-mono text-ink-muted font-semibold">30m</span>
                    </motion.div>

                    <div className="p-3 rounded border border-hairline bg-surface-2 text-sm flex items-center justify-between">
                      <span className="text-ink-secondary caption">1:00 PM - Design Sign-off</span>
                      <span className="caption font-mono text-ink-muted font-semibold">1.5h</span>
                    </div>
                  </div>
                </div>
              </div>

              {bookedSlot && (
                <motion.button 
                  onClick={() => setBookedSlot(null)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 caption text-ink hover:underline w-full text-right font-semibold block"
                >
                  Reset bookings
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
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
    <motion.section 
      id="workspace"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.8, ease: EASE_EXPO }}
      className="px-6 py-24 border-b border-hairline bg-transparent"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <SectionEyebrow>Unified Dashboard</SectionEyebrow>
          <h2 className="heading-1 mt-2 text-ink font-semibold tracking-[-0.03em]">A single source of truth</h2>
          <p className="body-md text-ink-secondary max-w-xl mx-auto mt-3">
            No separate apps. Mail, calendar, and your AI assistant work together. Click on emails below to witness live cross-pane updates.
          </p>
        </div>

        {/* View togglers */}
        <div className="flex justify-center gap-3 mb-8">
          {(["inbox", "calendar", "ai"] as const).map((view) => (
            <motion.button
              key={view}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setWorkspaceView(view)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all border ${
                workspaceView === view 
                  ? "bg-ink text-canvas border-ink font-semibold" 
                  : "bg-surface-1 border-hairline text-ink-secondary hover:border-hairline-strong"
              }`}
            >
              {view} view
            </motion.button>
          ))}
        </div>

        {/* High-fidelity mockup box with single shadow */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.99 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.8, ease: EASE_EXPO }}
          className="w-full rounded-xl overflow-hidden border border-hairline shadow-sm bg-surface-1"
        >
          {/* Mock title bar */}
          <div className="flex items-center gap-2 px-6 py-4 border-b border-hairline bg-surface-2">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-hairline" />
              <div className="w-2 h-2 rounded-full bg-hairline" />
              <div className="w-2 h-2 rounded-full bg-hairline" />
            </div>
            <div className="flex-1 flex items-center justify-center max-w-[280px] mx-auto bg-[#f2eee5] dark:bg-surface-3 border border-hairline rounded-md py-0.5 px-3 caption text-ink-secondary font-medium">
              workspace.syncar.ai/{workspaceView}
            </div>
          </div>

          {/* Connected Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[440px]">
            
            {/* INBOX COLUMN (4 Columns) */}
            <div className={`md:col-span-4 border-r border-hairline p-4 flex flex-col justify-between bg-surface-1 text-left ${workspaceView !== "inbox" ? "hidden md:flex" : ""}`}>
              <div>
                <span className="caption font-medium text-ink-muted block mb-4 flex items-center gap-1.5">
                  <EnvelopeIcon className="w-3.5 h-3.5 text-ink" /> Synced Inbox
                </span>

                <div className="space-y-2">
                  {emails.map((mail, idx) => (
                    <motion.div
                      key={mail.from}
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setSelectedMailIndex(idx)}
                      className={`p-3 rounded-lg border text-left cursor-pointer transition-all duration-150 ${
                        selectedMailIndex === idx 
                          ? "bg-[#f2eee5] dark:bg-surface-2 border-hairline-strong shadow-inner" 
                          : "bg-transparent border-transparent hover:bg-surface-2"
                      }`}
                    >
                      <div className="flex items-center justify-between caption">
                        <span className="text-sm font-semibold text-ink">{mail.from}</span>
                        <span className="caption text-xs font-semibold px-1.5 py-0.5 rounded bg-ink/5 text-ink">
                          {mail.priority}
                        </span>
                      </div>
                      <h4 className="caption text-ink-secondary mt-1 truncate">{mail.subject}</h4>
                      <span className="caption text-ink-muted block mt-2 font-medium">{mail.time}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* CALENDAR COLUMN (4 Columns) */}
            <div className={`md:col-span-4 border-r border-hairline p-4 flex flex-col justify-between bg-surface-1 text-left ${workspaceView !== "calendar" ? "hidden md:flex" : ""}`}>
              <div>
                <span className="caption font-medium text-ink-muted block mb-4 flex items-center gap-1.5">
                  <CalendarIcon className="w-3.5 h-3.5 text-ink" /> Calendar Agenda
                </span>

                <div className="space-y-3">
                  <div className={`p-3 rounded-lg border transition-all duration-300 ${
                    activeEmail.calHighlight === "11:00 AM"
                      ? "bg-ink/5 border-ink text-ink font-semibold"
                      : "bg-surface-2 border-hairline text-ink-secondary"
                  }`}>
                    <span className="caption block text-ink-muted font-medium">11:00 AM - 11:30 AM</span>
                    <span className="caption font-semibold block mt-0.5">Partnership Sync</span>
                  </div>
 
                  <div className={`p-3 rounded-lg border transition-all duration-300 ${
                    activeEmail.calHighlight === "2:00 PM"
                      ? "bg-ink/5 border-ink text-ink font-semibold"
                      : "bg-surface-2 border-hairline text-ink-secondary"
                  }`}>
                    <span className="caption block text-ink-muted font-medium">2:00 PM - 2:30 PM</span>
                    <span className="caption font-semibold block mt-0.5">Database Bug Debugging</span>
                  </div>
 
                  <div className={`p-3 rounded-lg border transition-all duration-300 ${
                    activeEmail.calHighlight === "4:00 PM"
                      ? "bg-ink/5 border-ink text-ink font-semibold"
                      : "bg-surface-2 border-hairline text-ink-secondary"
                  }`}>
                    <span className="caption block text-ink-muted font-medium">4:00 PM - 4:45 PM</span>
                    <span className="caption font-semibold block mt-0.5">Design Sign-off Review</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI CONTEXT COLUMN (4 Columns) */}
            <div className={`md:col-span-4 p-4 flex flex-col justify-between bg-surface-2 text-left ${workspaceView !== "ai" ? "hidden md:flex" : ""}`}>
              <div className="space-y-4">
                <span className="caption font-medium text-ink-muted block flex items-center gap-1.5">
                  <CpuChipIcon className="w-3.5 h-3.5 text-ink" /> AI Context Assistant
                </span>
 
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedMailIndex}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2, ease: EASE_OUT }}
                    className="space-y-4"
                  >
                    {/* Email Summary Box */}
                    <div className="p-3.5 rounded-lg border border-hairline bg-surface-1">
                      <span className="caption font-medium text-ink-muted block mb-1">Context summary</span>
                      <p className="caption text-ink leading-relaxed">{activeEmail.summary}</p>
                    </div>
     
                    {/* AI Draft Suggestion */}
                    <div className="p-3.5 rounded-lg border border-hairline bg-surface-1">
                      <span className="caption font-semibold text-ink block mb-2 flex items-center gap-1">
                        <SparklesIcon className="w-3.5 h-3.5 animate-pulse" /> Auto-reply draft
                      </span>
                      <p className="caption text-ink-secondary italic p-2 rounded bg-[#f7f4ed] dark:bg-surface-2 border border-hairline leading-relaxed">
                        "{activeEmail.aiDraft}"
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-lovable-primary text-sm font-medium flex items-center gap-2 justify-center py-2.5 rounded-md"
              >
                <PaperAirplaneIcon className="w-3.5 h-3.5" /> Dispatch Reply Draft
              </motion.button>
            </div>

          </div>
        </motion.div>
      </div>
    </motion.section>
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
    <motion.section 
      id="speed"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.8, ease: EASE_EXPO }}
      className="px-6 py-24 border-b border-hairline bg-transparent"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <SectionEyebrow>Keyboard First Engine</SectionEyebrow>
          <h2 className="heading-1 mt-2 text-ink font-semibold tracking-[-0.03em]">Built for the Speed Layer</h2>
          <p className="body-md text-ink-secondary max-w-xl mx-auto mt-3">
            Keep your hands on the home row. Syncar matches Superhuman's extreme speed and Raycast's quick menus. Try it right now on this page.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Left Column: Command Palette UI (6 Columns) */}
          <motion.div 
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.8, delay: 0.08, ease: EASE_EXPO }}
            className="bg-surface-1 border border-hairline rounded-xl p-8 flex flex-col justify-between min-h-[300px] text-left shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-hairline mb-6">
                <span className="caption font-semibold text-ink flex items-center gap-1.5">
                  <CommandLineIcon className="w-3.5 h-3.5 text-ink" /> Quick Command Palette
                </span>
                <span className="caption text-ink-muted font-medium">Interactable</span>
              </div>

              {/* Clickable mock search bar */}
              <motion.div 
                onClick={triggerInputSearch}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full flex items-center justify-between bg-[#f7f4ed] dark:bg-surface-2 border border-hairline p-3 rounded-lg hover:border-hairline-strong transition-all cursor-pointer shadow-inner"
              >
                <span className="caption text-ink-secondary flex items-center gap-2"><MagnifyingGlassIcon className="w-4 h-4 text-ink" /> Search commands or workflows...</span>
                <kbd className="caption font-mono bg-surface-3 border border-hairline px-1.5 py-0.5 rounded text-ink font-bold">K</kbd>
              </motion.div>

              <div className="space-y-2 mt-4">
                <motion.div 
                  onClick={() => setView("inbox", "Opened Inbox", "I")}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  className="p-2.5 rounded-md hover:bg-surface-2 cursor-pointer flex items-center justify-between text-sm text-ink transition-all border border-transparent hover:border-hairline"
                >
                  <span className="flex items-center gap-2 caption"><EnvelopeIcon className="w-3.5 h-3.5 text-ink" /> Switch to Inbox</span>
                  <span className="caption font-mono text-ink-muted font-semibold">Press I</span>
                </motion.div>
                <motion.div 
                  onClick={() => setView("calendar", "Opened Calendar", "C")}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  className="p-2.5 rounded-md hover:bg-surface-2 cursor-pointer flex items-center justify-between text-sm text-ink transition-all border border-transparent hover:border-hairline"
                >
                  <span className="flex items-center gap-2 caption"><CalendarIcon className="w-3.5 h-3.5 text-ink" /> Switch to Calendar</span>
                  <span className="caption font-mono text-ink-muted font-semibold">Press C</span>
                </motion.div>
                <motion.div 
                  onClick={() => setView("ai", "Opened AI Agent", "A")}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  className="p-2.5 rounded-md hover:bg-surface-2 cursor-pointer flex items-center justify-between text-sm text-ink transition-all border border-transparent hover:border-hairline"
                >
                  <span className="flex items-center gap-2 caption"><CpuChipIcon className="w-3.5 h-3.5 text-ink" /> Switch to AI Agent</span>
                  <span className="caption font-mono text-ink-muted font-semibold">Press A</span>
                </motion.div>
              </div>
            </div>

            <div className="caption text-ink-muted mt-4 border-t border-hairline pt-3 flex items-center gap-2">
              <CpuChipIcon className="w-3.5 h-3.5 text-ink" />
              <span>Press those keys anywhere on this page to test live shortcuts.</span>
            </div>
          </motion.div>

          {/* Right Column: Speed details (6 Columns) */}
          <motion.div 
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.8, delay: 0.16, ease: EASE_EXPO }}
            className="space-y-6 text-left"
          >
            <h3 className="heading-2 text-ink font-semibold tracking-[-0.02em]">Navigation at home row speeds</h3>
            <p className="body-sm text-ink-secondary leading-relaxed">
              Zero visual distractions, zero loading states. Syncar is built with keyboard triggers to let you traverse email replies, calendar coordinate bookings, search indices, and integrations with minimal resistance.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-hairline bg-surface-1 shadow-sm">
                <span className="caption font-semibold text-ink block mb-1">Sub-100ms Ingest</span>
                <p className="caption text-ink-secondary leading-relaxed">Cached index renders state changes offline instantly, saving changes to PostgreSQL in the background.</p>
              </div>

              <div className="p-4 rounded-xl border border-hairline bg-surface-1 shadow-sm">
                <span className="caption font-semibold text-ink block mb-1">Home Row Shortcuts</span>
                <p className="caption text-ink-secondary leading-relaxed">Archive, delete, draft, and query search structures with fast key triggers built natively.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}

/**
 * Section 7: Future of Work (Architecture details)
 */
function FutureOfWork() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.8, ease: EASE_EXPO }}
      className="px-6 py-24 border-b border-hairline bg-transparent"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <SectionEyebrow>System architecture</SectionEyebrow>
          <h2 className="heading-1 mt-2 text-ink font-semibold tracking-[-0.03em]">An operating system for work</h2>
          <p className="body-md text-ink-secondary max-w-xl mx-auto mt-3">
            An underlying architecture compiled for local speed, unified data consistency, and advanced LLM tool executions.
          </p>
        </div>

        {/* Bento Grid Architecture */}
        <motion.div 
          variants={bentoContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left"
        >
          {/* Box 1 */}
          <motion.div 
            variants={bentoItem}
            whileHover={{ y: -6, transition: { duration: 0.2, ease: EASE_OUT } }}
            className="bg-surface-1 border border-hairline rounded-xl p-6 flex flex-col justify-between shadow-sm cursor-pointer"
          >
            <div>
              <div className="w-8 h-8 rounded border border-hairline bg-surface-2 flex items-center justify-center mb-4">
                <ServerIcon className="w-4 h-4 text-ink" />
              </div>
              <h3 className="text-base font-semibold text-ink mb-2">Local-First Cache Index</h3>
              <p className="caption text-ink-secondary leading-relaxed">
                Synchronized PostgreSQL database replicating critical Gmail message headers and Google Calendar schedules. Queries retrieve instantly without direct API hops.
              </p>
            </div>
          </motion.div>

          {/* Box 2 */}
          <motion.div 
            variants={bentoItem}
            whileHover={{ y: -6, transition: { duration: 0.2, ease: EASE_OUT } }}
            className="bg-surface-1 border border-hairline rounded-xl p-6 flex flex-col justify-between shadow-sm cursor-pointer"
          >
            <div>
              <div className="w-8 h-8 rounded border border-hairline bg-surface-2 flex items-center justify-center mb-4">
                <GlobeAltIcon className="w-4 h-4 text-ink" />
              </div>
              <h3 className="text-base font-semibold text-ink mb-2">Corsair Sync Webhooks</h3>
              <p className="caption text-ink-secondary leading-relaxed">
                Webhook streams coordinate and sync remote alterations in background workers, keeping local datasets always aligned and resolving conflicts in real-time.
              </p>
            </div>
          </motion.div>

          {/* Box 3 */}
          <motion.div 
            variants={bentoItem}
            whileHover={{ y: -6, transition: { duration: 0.2, ease: EASE_OUT } }}
            className="bg-surface-1 border border-hairline rounded-xl p-6 flex flex-col justify-between shadow-sm cursor-pointer"
          >
            <div>
              <div className="w-8 h-8 rounded border border-hairline bg-surface-2 flex items-center justify-center mb-4">
                <MagnifyingGlassIcon className="w-4 h-4 text-ink" />
              </div>
              <h3 className="text-base font-semibold text-ink mb-2">pgvector Semantic Search</h3>
              <p className="caption text-ink-secondary leading-relaxed">
                Vector embeddings computed using Google's text-embedding-004 allows users to perform semantic search, matching user intents rather than simple keywords.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

/**
 * Setup onboarding flow
 */
function OnboardingSection() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.8, ease: EASE_EXPO }}
      className="px-6 py-24 border-b border-hairline bg-transparent"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <SectionEyebrow>Guided Setup</SectionEyebrow>
          <h2 className="heading-1 mt-2 text-ink font-semibold tracking-[-0.03em]">Connect in 3 minutes</h2>
          <p className="body-md text-ink-secondary mt-3">
            Secure, sandboxed local environment initialized immediately upon sign up.
          </p>
        </div>

        <motion.div 
          variants={bentoContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          className="space-y-4 text-left"
        >
          {ONBOARDING_STEPS.map((step, idx) => (
            <motion.div
              key={step.step}
              variants={bentoItem}
              whileHover={{ x: 4 }}
              className="flex items-start gap-4 p-5 rounded-xl border border-hairline bg-surface-1 shadow-sm"
            >
              <span className="text-lg font-bold tabular-nums text-ink-muted w-8 font-mono">
                {step.step}
              </span>
              <div className="flex-1 text-left">
                <h3 className="text-base font-semibold mb-1 text-ink">{step.title}</h3>
                <p className="caption text-ink-secondary leading-relaxed">{step.desc}</p>
              </div>
              <CheckCircleIcon className="w-4 h-4 text-ink flex-shrink-0 mt-0.5" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

/**
 * Call to Action box at bottom
 */
function ActionCenterSection() {
  return (
    <motion.section 
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.9, ease: EASE_EXPO }}
      className="px-6 py-24 bg-transparent"
    >
      <div 
        className="max-w-2xl mx-auto text-center p-12 rounded-xl border border-hairline bg-surface-1 w-full shadow-sm"
      >
        <div className="flex flex-col items-center gap-6 mb-8 w-full">
          <SectionEyebrow>Get Started</SectionEyebrow>
          <h2 className="display-2 text-ink text-balance tracking-[-0.04em] font-semibold" style={{ maxWidth: "38rem" }}>Reclaim your inbox attention</h2>
          <p className="body-md text-ink-secondary text-balance" style={{ maxWidth: "32rem" }}>
            Experience local inbox execution speed. Join the beta and coordinate workflows with natural AI commands.
          </p>
        </div>
        <MotionLink 
          href="/sign-up" 
          whileHover="hover"
          whileTap={{ scale: 0.98 }}
          className="btn-lovable-primary px-6 py-3 text-sm font-medium rounded-md inline-flex items-center gap-2"
        >
          Connect Workspace Free
          <motion.span variants={arrowVariants} className="flex items-center justify-center">
            <ArrowRightIcon className="w-4 h-4" />
          </motion.span>
        </MotionLink>
      </div>
    </motion.section>
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
          <ul className="space-y-2 text-[#71717a] text-[11px] font-inter">
            <li><a href="#transform" className="hover:text-white transition-colors">Compare Flows</a></li>
            <li><a href="#commands" className="hover:text-white transition-colors">AI CommandCenter</a></li>
            <li><a href="#workspace" className="hover:text-white transition-colors">Workspace Views</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4 text-xs">System</h4>
          <ul className="space-y-2 text-[#71717a] text-[11px] font-inter">
            <li>Local Postgres Database</li>
            <li>Clerk Tenant Isolation</li>
            <li>Gemini Tool Calling</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4 text-xs">Security</h4>
          <ul className="space-y-2 text-[#71717a] text-[11px] font-inter">
            <li>OAuth Sandboxed</li>
            <li>End-to-End Encryption</li>
            <li>GDPR Compliant</li>
          </ul>
        </div>
      </div>
      <div className="max-w-5xl mx-auto pt-8 border-t border-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between gap-4 text-[#71717a] text-[11px] font-inter">
        <p>© 2026 Syncar. All rights reserved.</p>
        <p>Next.js 16 · Corsair Dev Engine · Gemini Flash · Clerk Auth · pgvector</p>
      </div>
    </footer>
  );
}
"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChatMessage } from "@/components/ai/ChatMessage";
import { ChatInput } from "@/components/ai/ChatInput";
import { Plus, CalendarCheck, Mail, UserCheck, Sparkles } from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { MOCK_CONVERSATIONS, AI_SUGGESTIONS } from "@/lib/mock/ai.mock";

interface LocalChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  toolsUsed?: string[];
  createdAt: Date;
  status?: "pending" | "completed" | "failed" | "cancelled";
}

interface LocalConversation {
  id: string;
  title: string;
  messages: LocalChatMessage[];
  updatedAt: Date;
}

// ─── Featured scheduling demo conversation ────────────────────────────────────
const SCHEDULING_CONV: LocalConversation = {
  id: "conv_scheduling_demo",
  title: "Schedule meet with demo@syncar.com",
  updatedAt: new Date(Date.now() - 1000 * 60 * 5),
  messages: [
    {
      id: "sched_u1",
      role: "user",
      content: "Schedule a meeting with demo@syncar.com tomorrow at 3pm and notify them with a calendar invite and a confirmation email.",
      createdAt: new Date(Date.now() - 1000 * 60 * 6),
      status: "completed",
    },
    {
      id: "sched_a1",
      role: "assistant",
      content: `On it! Here's what I just did across your workspace:\n\n**Step 1 — Contact resolved** ✅\nFound: **Demo User** · demo@syncar.com\n\n**Step 2 — Calendar checked** ✅\nNo conflicts found for tomorrow at 3:00 PM – 3:30 PM.\n\n**Step 3 — Event created** ✅\n📅 **Sync with Demo User**\n🗓 Tomorrow · 3:00 PM – 3:30 PM\n📍 Google Meet · meet.google.com/syn-car-demo\n👥 Attendees: you@syncar.io, demo@syncar.com\n\n**Step 4 — Invite sent** ✅\nCalendar invite dispatched to demo@syncar.com.\n\n**Step 5 — Confirmation email sent** ✅\n📧 To: demo@syncar.com\n📌 Subject: Meeting confirmation — Sync tomorrow at 3 PM\n\n> Hi,\n>\n> I've scheduled a 30-minute sync for tomorrow at 3:00 PM.\n> Google Meet link: meet.google.com/syn-car-demo\n>\n> Looking forward to it!\n> Alex\n\n---\nAll done in 1.8s. Is there anything else you'd like me to adjust?`,
      toolsUsed: [
        "gmail.contacts.resolve",
        "googlecalendar.api.events.create",
        "gmail.api.messages.send",
      ],
      createdAt: new Date(Date.now() - 1000 * 60 * 5),
      status: "completed",
    },
  ],
};

// ─── Other seeded conversations ───────────────────────────────────────────────
const SEEDED: LocalConversation[] = [
  SCHEDULING_CONV,
  ...MOCK_CONVERSATIONS.map((c) => ({
    id: c.id,
    title: c.title,
    updatedAt: c.updatedAt,
    messages: c.messages.map((m) => ({
      ...m,
      status: "completed" as const,
    })),
  })),
];

// ─── Smart canned replies ─────────────────────────────────────────────────────
const DEMO_REPLY = (userMsg: string): { content: string; toolsUsed: string[] } => {
  const q = userMsg.toLowerCase();

  if (
    q.includes("schedule") || q.includes("meeting") || q.includes("book") ||
    q.includes("calendar invite") || q.includes("3pm") || q.includes("tomorrow")
  ) {
    const emailMatch = userMsg.match(/[\w.-]+@[\w.-]+\.\w+/);
    const email = emailMatch ? emailMatch[0] : "demo@syncar.com";
    return {
      content: `On it! Here's what I just did across your workspace:\n\n**Step 1 — Contact resolved** ✅\nFound: **Demo User** · ${email}\n\n**Step 2 — Calendar checked** ✅\nNo conflicts found for tomorrow at 3:00 PM – 3:30 PM.\n\n**Step 3 — Event created** ✅\n📅 **Sync with Demo User**\n🗓 Tomorrow · 3:00 PM – 3:30 PM\n📍 Google Meet · meet.google.com/syn-car-demo\n👥 Attendees: you@syncar.io, ${email}\n\n**Step 4 — Invite sent** ✅\nCalendar invite dispatched to ${email}.\n\n**Step 5 — Confirmation email sent** ✅\n📧 To: ${email}\n📌 Subject: Meeting confirmation — Sync tomorrow at 3 PM\n\n> Hi,\n>\n> I've scheduled a 30-minute sync for tomorrow at 3:00 PM.\n> Google Meet link: meet.google.com/syn-car-demo\n>\n> Looking forward to it!\n> Alex\n\n---\nAll done in 1.8s. Anything else to adjust?`,
      toolsUsed: ["gmail.contacts.resolve", "googlecalendar.api.events.create", "gmail.api.messages.send"],
    };
  }

  if (q.includes("inbox") || q.includes("email") || q.includes("important"))
    return {
      content: "I scanned your inbox and found **3 high-priority items**:\n\n1. **Sarah Chen (Stripe)** — Partnership proposal requires your signature by Friday.\n2. **Marcus Webb (Linear)** — Production bug SYN-2847 affecting ~12% of users. P0.\n3. **Jordan Kim (Raycast)** — Collaboration inquiry worth a quick reply.",
      toolsUsed: ["gmail.db.messages.search"],
    };

  if (q.includes("calendar") || q.includes("today") || q.includes("free"))
    return {
      content: "You have **2 meetings today**:\n\n- **9:00 AM — Q3 Planning All Hands** (1.5h) — Google Meet with Sarah Chen & Marcus Webb\n- **2:00 PM — 1:1 with Priya** (45 min) — Design feedback & roadmap\n\nYour morning is free for deep work before the All Hands. Want me to block focus time?",
      toolsUsed: ["googlecalendar.api.events.getMany"],
    };

  if (q.includes("draft") || q.includes("reply") || q.includes("write"))
    return {
      content: "Here's a draft reply for the Stripe partnership email:\n\n---\nHi Sarah,\n\nThanks for the follow-up. I've reviewed the proposal and I'm aligned on the Q3 timeline. A couple of questions before I sign:\n\n1. Section 4.2 — can we clarify the revenue share structure?\n2. Is there flexibility on the exclusivity clause?\n\nHappy to jump on a quick call this week.\n\nBest,\nAlex\n\n---",
      toolsUsed: ["gmail.api.messages.draft"],
    };

  return {
    content: "I'm Syncar AI — your workspace intelligence layer.\n\nWhat would you like to explore?\n- 📅 Schedule a meeting\n- 📧 Summarize your inbox\n- ✍️ Draft a reply",
    toolsUsed: [],
  };
};

// ─── Step-by-step "typewriter" for scheduling responses ───────────────────────
const SCHEDULE_STEPS = [
  { icon: UserCheck,    label: "Resolving contact...",           color: "#6366f1", delay: 0 },
  { icon: CalendarCheck, label: "Checking calendar availability...", color: "#0ea5e9", delay: 700 },
  { icon: CalendarCheck, label: "Creating calendar event...",    color: "#10b981", delay: 1400 },
  { icon: Mail,          label: "Sending calendar invite...",    color: "#f59e0b", delay: 2100 },
  { icon: Mail,          label: "Sending confirmation email...", color: "#f59e0b", delay: 2800 },
];

function SchedulingSteps({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    SCHEDULE_STEPS.forEach((s, i) => {
      timers.push(setTimeout(() => setStep(i + 1), s.delay + 400));
    });
    timers.push(
      setTimeout(() => {
        setDone(true);
        onComplete();
      }, 3600)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex flex-col gap-2 px-3 py-2.5 rounded-xl mb-3"
      style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
      <div className="flex items-center gap-1.5 mb-1">
        <Sparkles className="w-3 h-3" style={{ color: "var(--accent)" }} />
        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--accent)" }}>
          Syncar AI · Orchestrating
        </span>
      </div>
      {SCHEDULE_STEPS.map((s, i) => {
        const Icon = s.icon;
        const active = step === i;
        const complete = step > i || done;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: step >= i ? 1 : 0.3, x: 0 }}
            transition={{ delay: s.delay / 1000, duration: 0.3 }}
            className="flex items-center gap-2"
          >
            <div
              className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: complete ? s.color + "22" : active ? s.color + "11" : "transparent",
                border: `1px solid ${complete || active ? s.color + "55" : "var(--border)"}`,
              }}
            >
              {complete ? (
                <span style={{ fontSize: 8, color: s.color }}>✓</span>
              ) : active ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  className="w-2 h-2 rounded-full border border-t-transparent"
                  style={{ borderColor: s.color }}
                />
              ) : (
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--border)" }} />
              )}
            </div>
            <span
              className="text-xs"
              style={{
                color: complete ? "var(--foreground)" : active ? s.color : "var(--foreground-subtle)",
                fontWeight: active || complete ? 500 : 400,
              }}
            >
              {s.label}
            </span>
            {active && (
              <span
                className="text-[9px] font-mono px-1.5 py-0.5 rounded"
                style={{ background: s.color + "22", color: s.color }}
              >
                running
              </span>
            )}
            {complete && (
              <span
                className="text-[9px] font-mono px-1.5 py-0.5 rounded"
                style={{ background: "#10b98122", color: "#10b981" }}
              >
                done
              </span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

export default function DemoAIPage() {
  const [conversations, setConversations] = useState<LocalConversation[]>(SEEDED);
  const [activeConvId, setActiveConvId] = useState<string>(SEEDED[0].id);
  const [isLoading, setIsLoading] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConv = conversations.find((c) => c.id === activeConvId) ?? null;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConv?.messages, isLoading]);

  const handleNewConversation = () => {
    const newConv: LocalConversation = {
      id: `conv_demo_${Date.now()}`,
      title: "New conversation",
      messages: [],
      updatedAt: new Date(),
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveConvId(newConv.id);
  };

  const handleSend = (message: string) => {
    if (isLoading || !message.trim()) return;

    let targetId = activeConvId;
    if (!targetId || !conversations.find((c) => c.id === targetId)) {
      const newConv: LocalConversation = {
        id: `conv_demo_${Date.now()}`,
        title: message.slice(0, 40) + (message.length > 40 ? "..." : ""),
        messages: [],
        updatedAt: new Date(),
      };
      setConversations((prev) => [newConv, ...prev]);
      setActiveConvId(newConv.id);
      targetId = newConv.id;
    }

    const userMsg: LocalChatMessage = {
      id: `m_${Date.now()}`,
      role: "user",
      content: message,
      createdAt: new Date(),
      status: "completed",
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === targetId
          ? {
              ...c,
              messages: [...c.messages, userMsg],
              title: c.messages.length === 0 ? message.slice(0, 40) + (message.length > 40 ? "..." : "") : c.title,
              updatedAt: new Date(),
            }
          : c
      )
    );

    const isScheduling =
      message.toLowerCase().includes("schedule") ||
      message.toLowerCase().includes("book") ||
      message.toLowerCase().includes("meeting") ||
      message.toLowerCase().includes("3pm") ||
      message.toLowerCase().includes("tomorrow");

    setIsLoading(true);
    if (isScheduling) setShowSteps(true);

    const delay = isScheduling ? 4000 : 1400;

    setTimeout(() => {
      const reply = DEMO_REPLY(message);
      const assistantMsg: LocalChatMessage = {
        id: `m_${Date.now() + 1}`,
        role: "assistant",
        content: reply.content,
        toolsUsed: reply.toolsUsed,
        createdAt: new Date(),
        status: "completed",
      };

      setConversations((prev) =>
        prev.map((c) =>
          c.id === targetId
            ? { ...c, messages: [...c.messages, assistantMsg], updatedAt: new Date() }
            : c
        )
      );
      setIsLoading(false);
      setShowSteps(false);
    }, delay);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div
        className="flex items-center h-14 px-5 flex-shrink-0 gap-2"
        style={{ background: "var(--surface-1)", borderBottom: "1px solid var(--border)" }}
      >
        <h1 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>AI Assistant</h1>
        <span className="text-xs" style={{ color: "var(--foreground-muted)" }}>· Powered by Gemini · Syncar</span>
      </div>

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Chat Panel */}
        <div className="flex-1 flex flex-col min-w-0" style={{ background: "var(--surface-0)" }}>
          <div className="flex-1 overflow-y-auto min-h-0">
            {!activeConv || activeConv.messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-full p-8 max-w-3xl mx-auto w-full">
                <div className="text-center mb-10 flex flex-col items-center">
                  <div className="mb-6 flex justify-center">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{ background: "var(--accent-muted)", border: "1px solid var(--border)" }}
                    >
                      <Logo width={36} height={36} />
                    </div>
                  </div>
                  <h1 className="text-3xl font-bold mb-3 tracking-tight" style={{ color: "var(--foreground)", fontFamily: "var(--font-geist)" }}>
                    Welcome, Alex!
                  </h1>
                  <p className="text-sm max-w-md" style={{ color: "var(--foreground-muted)", fontFamily: "var(--font-hanken)" }}>
                    This is a demo of Syncar AI. Ask anything — responses use sample data.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-8">
                  {[
                    { emoji: "📅", title: "Schedule a Meeting", prompt: "Schedule a meeting with demo@syncar.com tomorrow at 3pm and send them a confirmation email", bg: "rgba(99,102,241,0.08)" },
                    { emoji: "📧", title: "Summarize Inbox",   prompt: "What's important in my inbox right now?",                                                      bg: "rgba(239,110,16,0.08)" },
                    { emoji: "✍️", title: "Draft Response",    prompt: "Draft a reply to the Stripe partnership email",                                                 bg: "rgba(168,85,247,0.08)" },
                  ].map(({ emoji, title, prompt, bg }) => (
                    <button
                      key={title}
                      onClick={() => handleSend(prompt)}
                      className="p-6 rounded-2xl border text-left transition-all hover:shadow-sm group cursor-pointer"
                      style={{ background: "var(--surface-1)", borderColor: "var(--border)" }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                        style={{ background: bg }}
                      >
                        <span className="text-lg">{emoji}</span>
                      </div>
                      <h3 className="font-semibold mb-2 text-sm" style={{ color: "var(--foreground)", fontFamily: "var(--font-hanken)" }}>{title}</h3>
                      <p className="text-xs leading-relaxed" style={{ color: "var(--foreground-muted)", fontFamily: "var(--font-hanken)" }}>{prompt}</p>
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 justify-center">
                  {AI_SUGGESTIONS.slice(0, 4).map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSend(s)}
                      className="px-3 py-1.5 rounded-full text-xs font-medium border transition-all hover:opacity-80"
                      style={{ background: "var(--surface-1)", borderColor: "var(--border)", color: "var(--foreground-muted)" }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="px-6 py-5">
                <AnimatePresence initial={false}>
                  {activeConv.messages.map((msg, index) => (
                    <ChatMessage
                      key={msg.id}
                      message={msg}
                      isLatest={index === activeConv.messages.length - 1}
                    />
                  ))}
                </AnimatePresence>

                {/* Scheduling step-by-step progress */}
                {isLoading && showSteps && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3 mb-5"
                  >
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "var(--surface-3)", border: "1px solid var(--border)" }}
                    >
                      <Sparkles className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
                    </div>
                    <div className="flex flex-col gap-1 max-w-[80%]">
                      <SchedulingSteps onComplete={() => {}} />
                    </div>
                  </motion.div>
                )}

                {/* Generic thinking indicator (non-scheduling) */}
                {isLoading && !showSteps && (
                  <ChatMessage
                    message={{
                      id: "thinking",
                      role: "assistant",
                      content: "Analyzing your request and workspace context...",
                      createdAt: new Date(),
                      status: "pending",
                    }}
                    isLatest
                  />
                )}

                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input */}
          <div className="px-6 py-4 flex-shrink-0" style={{ borderTop: "1px solid var(--border)" }}>
            <ChatInput
              onSend={handleSend}
              isLoading={isLoading}
              placeholder='Ask your AI assistant anything...'
            />
          </div>
        </div>

        {/* Conversation Sidebar */}
        <div
          className="flex flex-col w-64 flex-shrink-0"
          style={{ borderLeft: "1px solid var(--border)", background: "var(--surface-1)" }}
        >
          <div className="p-4 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border)" }}>
            <h2 className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>Chat history</h2>
            <button
              onClick={handleNewConversation}
              className="p-1.5 rounded-lg transition-all hover:bg-surface-2"
              style={{ color: "var(--accent)", border: "1px solid var(--border)" }}
              title="New Chat"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-1">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setActiveConvId(conv.id)}
                className={cn(
                  "w-full flex flex-col items-start gap-0.5 px-3 py-2 rounded-lg text-left transition-all hover:opacity-85",
                  activeConvId === conv.id ? "font-medium" : ""
                )}
                style={{
                  background: activeConvId === conv.id ? "var(--surface-2)" : "transparent",
                  color: activeConvId === conv.id ? "var(--foreground)" : "var(--foreground-muted)",
                }}
              >
                <span className="text-xs truncate w-full" style={{ fontFamily: "var(--font-hanken)" }}>{conv.title}</span>
                <span className="text-[10px]" style={{ color: "var(--foreground-subtle)", fontFamily: "var(--font-mono)" }}>
                  {formatRelativeTime(conv.updatedAt)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export type MockChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  toolsUsed?: string[];
  createdAt: Date;
};

export type MockConversation = {
  id: string;
  title: string;
  messages: MockChatMessage[];
  updatedAt: Date;
};

export const MOCK_CONVERSATIONS: MockConversation[] = [
  {
    id: "conv_001",
    title: "Inbox summary this morning",
    updatedAt: new Date(Date.now() - 1000 * 60 * 20),
    messages: [
      {
        id: "m_001",
        role: "user",
        content: "What's most important in my inbox right now?",
        createdAt: new Date(Date.now() - 1000 * 60 * 22),
      },
      {
        id: "m_002",
        role: "assistant",
        content:
          "I scanned your inbox and found **3 high-priority items** that need your attention:\n\n1. **Sarah Chen (Stripe)** — Partnership proposal requires your signature by Friday. The legal review is complete.\n\n2. **Marcus Webb (Linear)** — Production bug SYN-2847 affecting ~12% of users. P0, needs immediate investigation.\n\n3. **Jordan Kim (Raycast)** — Collaboration inquiry, worth a quick reply to explore.\n\nWant me to draft replies for any of these?",
        toolsUsed: ["gmail.db.messages.search"],
        createdAt: new Date(Date.now() - 1000 * 60 * 21),
      },
    ],
  },
  {
    id: "conv_002",
    title: "Calendar today",
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    messages: [
      {
        id: "m_003",
        role: "user",
        content: "What's on my calendar today?",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2 - 60000),
      },
      {
        id: "m_004",
        role: "assistant",
        content:
          "You have **2 meetings** today:\n\n- **9:00 AM — Q3 Planning All Hands** (1.5h) — Google Meet with Sarah Chen, Marcus Webb, and your full team\n- **2:00 PM — 1:1 with Priya** (45 min) — Design feedback and roadmap priorities\n\nYour morning is free for deep work before the All Hands. Want me to block some focus time?",
        toolsUsed: ["googlecalendar.api.events.getMany"],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
      },
    ],
  },
];

export const AI_SUGGESTIONS = [
  "What's most important in my inbox?",
  "Summarize my emails from today",
  "What meetings do I have this week?",
  "Draft a reply to the Stripe partnership email",
  "Find emails from Marcus",
  "Am I free tomorrow afternoon?",
];

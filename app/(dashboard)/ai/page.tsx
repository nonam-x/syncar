"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TopNav } from "@/components/layout/TopNav";
import { ChatMessage } from "@/components/ai/ChatMessage";
import { ChatInput } from "@/components/ai/ChatInput";
import { useAIChat } from "@/lib/hooks/api";
import { Plus, Bot, Zap, MessageSquare } from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { useUser } from "@clerk/nextjs";

interface LocalChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  toolsUsed?: string[];
  createdAt: Date;
}

interface LocalConversation {
  id: string;
  title: string;
  messages: LocalChatMessage[];
  updatedAt: Date;
  serverConvId?: string;
}

export default function AIPage() {
  const { user } = useUser();
  const [conversations, setConversations] = useState<LocalConversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const aiChat = useAIChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConv = conversations.find((c) => c.id === activeConvId) ?? null;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConv?.messages]);

  const handleNewConversation = () => {
    const newConv: LocalConversation = {
      id: `conv_${Date.now()}`,
      title: "New conversation",
      messages: [],
      updatedAt: new Date(),
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveConvId(newConv.id);
  };

  const handleSend = async (message: string) => {
    if (!activeConvId) {
      handleNewConversation();
    }

    const targetId = activeConvId ?? `conv_${Date.now()}`;

    const userMsg: LocalChatMessage = {
      id: `m_${Date.now()}`,
      role: "user",
      content: message,
      createdAt: new Date(),
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

    const activeConvForSend = conversations.find((c) => c.id === targetId);

    aiChat.mutate(
      { message, conversationId: activeConvForSend?.serverConvId },
      {
        onSuccess: (data) => {
          const assistantMsg: LocalChatMessage = {
            id: `m_${Date.now() + 1}`,
            role: "assistant",
            content: data.response,
            toolsUsed: data.toolsUsed,
            createdAt: new Date(),
          };

          setConversations((prev) =>
            prev.map((c) =>
              c.id === targetId
                ? {
                  ...c,
                  messages: [...c.messages, assistantMsg],
                  updatedAt: new Date(),
                  serverConvId: data.conversationId,
                }
                : c
            )
          );
        },
        onError: (err) => {
          const errorMsg: LocalChatMessage = {
            id: `m_${Date.now() + 1}`,
            role: "assistant",
            content: `Sorry, I encountered an error: ${(err as Error).message}`,
            createdAt: new Date(),
          };
          setConversations((prev) =>
            prev.map((c) =>
              c.id === targetId
                ? { ...c, messages: [...c.messages, errorMsg], updatedAt: new Date() }
                : c
            )
          );
        },
      }
    );
  };

  return (
    <div className="flex flex-col h-full">
      <TopNav title="AI Assistant" subtitle="Powered by Gemini · Syncar" />
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Chat Panel (Left & Center) */}
        <div className="flex-1 flex flex-col min-w-0" style={{ background: "var(--surface-0)" }}>
          {/* Scrollable Chat Content Area */}
          <div className="flex-1 overflow-y-auto min-h-0">
            {!activeConv || activeConv.messages.length === 0 ? (
              /* Empty / Welcome state styled like Stitch dashboard */
              <div className="flex flex-col items-center justify-center min-h-full p-8 max-w-3xl mx-auto w-full">
                {/* Welcome Header */}
                <div className="text-center mb-10 flex flex-col items-center">
                  <div className="mb-6 flex justify-center">
                    {/* Premium Star/Logo Icon */}
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center animate-fade-in"
                      style={{
                        background: "var(--accent-muted)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <Logo width={36} height={36} />
                    </div>
                  </div>
                  <h1 className="text-3xl font-bold mb-3 tracking-tight" style={{ color: "var(--foreground)", fontFamily: "var(--font-geist)" }}>
                    Welcome, {user?.firstName ?? "User"}!
                  </h1>
                  <p className="text-sm max-w-md" style={{ color: "var(--foreground-muted)", fontFamily: "var(--font-hanken)" }}>
                    How can I help you today? Ask about your inbox, check your schedule, or draft replies.
                  </p>
                </div>

                {/* Action Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-8">
                  {/* Card 1 */}
                  <button
                    onClick={() => handleSend("What's important in my inbox right now?")}
                    className="p-6 rounded-2xl border text-left transition-all hover:shadow-sm group cursor-pointer"
                    style={{
                      background: "var(--surface-1)",
                      borderColor: "var(--border)",
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                      style={{ background: "rgba(239, 110, 16, 0.08)" }}
                    >
                      <span className="text-lg">📧</span>
                    </div>
                    <h3 className="font-semibold mb-2 text-sm" style={{ color: "var(--foreground)", fontFamily: "var(--font-hanken)" }}>
                      Summarize Inbox
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--foreground-muted)", fontFamily: "var(--font-hanken)" }}>
                      Get key highlights and summary of important unread emails.
                    </p>
                  </button>

                  {/* Card 2 */}
                  <button
                    onClick={() => handleSend("What's on my calendar today?")}
                    className="p-6 rounded-2xl border text-left transition-all hover:shadow-sm group cursor-pointer"
                    style={{
                      background: "var(--surface-1)",
                      borderColor: "var(--border)",
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                      style={{ background: "rgba(59, 130, 246, 0.08)" }}
                    >
                      <span className="text-lg">📅</span>
                    </div>
                    <h3 className="font-semibold mb-2 text-sm" style={{ color: "var(--foreground)", fontFamily: "var(--font-hanken)" }}>
                      Check Schedule
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--foreground-muted)", fontFamily: "var(--font-hanken)" }}>
                      View scheduled events, meetings, and check your free slots.
                    </p>
                  </button>

                  {/* Card 3 */}
                  <button
                    onClick={() => handleSend("Draft a reply to my last email")}
                    className="p-6 rounded-2xl border text-left transition-all hover:shadow-sm group cursor-pointer"
                    style={{
                      background: "var(--surface-1)",
                      borderColor: "var(--border)",
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                      style={{ background: "rgba(168, 85, 247, 0.08)" }}
                    >
                      <span className="text-lg">✍️</span>
                    </div>
                    <h3 className="font-semibold mb-2 text-sm" style={{ color: "var(--foreground)", fontFamily: "var(--font-hanken)" }}>
                      Draft Response
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--foreground-muted)", fontFamily: "var(--font-hanken)" }}>
                      Draft replies to messages using natural context-aware templates.
                    </p>
                  </button>
                </div>
              </div>
            ) : (
              /* Messages */
              <div className="px-6 py-5">
                <AnimatePresence initial={false}>
                  {activeConv.messages.map((msg) => (
                    <ChatMessage key={msg.id} message={msg} />
                  ))}
                </AnimatePresence>

                {/* Loading indicator */}
                <AnimatePresence>
                  {aiChat.isPending && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex gap-3 mb-5"
                    >
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: "var(--surface-3)", border: "1px solid var(--border)" }}
                      >
                        <Bot className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
                      </div>
                      <div
                        className="px-3.5 py-2.5 rounded-2xl rounded-tl-sm"
                        style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
                      >
                        <div className="flex gap-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              animate={{ scale: [1, 1.3, 1] }}
                              transition={{ delay: i * 0.15, duration: 0.6, repeat: Infinity }}
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ background: "var(--foreground-muted)" }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input */}
          <div
            className="px-6 py-4 flex-shrink-0"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <ChatInput
              onSend={handleSend}
              isLoading={aiChat.isPending}
              placeholder="Ask your AI assistant anything..."
            />
          </div>
        </div>

        {/* Conversation Sidebar (Right) */}
        <div
          className="flex flex-col w-64 flex-shrink-0"
          style={{ borderLeft: "1px solid var(--border)", background: "var(--surface-1)" }}
        >
          <div className="p-4 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border)" }}>
            <h2 className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>Chat history</h2>
            <button
              onClick={handleNewConversation}
              className="p-1.5 rounded-lg transition-all hover:bg-surface-2"
              style={{
                color: "var(--accent)",
                border: "1px solid var(--border)",
              }}
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

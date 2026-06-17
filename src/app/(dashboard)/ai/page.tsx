"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TopNav } from "@/components/layout/TopNav";
import { ChatMessage } from "@/components/ai/ChatMessage";
import { ChatInput } from "@/components/ai/ChatInput";
import { Plus, Bot } from "lucide-react";
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
  status?: "pending" | "completed" | "failed" | "cancelled";
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
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConv = conversations.find((c) => c.id === activeConvId) ?? null;

  // 1. Load conversations from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("syncar_ai_conversations");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const mapped = parsed.map((c: any) => ({
          ...c,
          updatedAt: new Date(c.updatedAt),
          messages: c.messages.map((m: any) => ({
            ...m,
            createdAt: new Date(m.createdAt),
          })),
        }));
        setConversations(mapped);
        if (mapped.length > 0) {
          setActiveConvId(mapped[0].id);
        }
      } catch (err) {
        console.error("Failed to parse saved conversations:", err);
      }
    }
  }, []);

  // 2. Save conversations to localStorage on change
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem("syncar_ai_conversations", JSON.stringify(conversations));
    }
  }, [conversations]);

  // 3. Poll for pending messages
  useEffect(() => {
    const pendingMsg = activeConv?.messages.find((m) => m.status === "pending");
    if (!pendingMsg || !activeConv.serverConvId) return;

    const conversationId = activeConv.serverConvId;
    const messageId = pendingMsg.id;

    setIsLoading(true);

    let intervalId = setInterval(async () => {
      try {
        const res = await fetch(`/api/ai/chat?conversationId=${conversationId}`);
        if (!res.ok) return;
        const data = await res.json();
        const serverMessages = data.messages || [];

        // Find the matching server message
        const matchingServerMsg = serverMessages.find((m: any) => m.id === messageId);
        if (matchingServerMsg) {
          setConversations((prev) =>
            prev.map((c) => {
              if (c.serverConvId !== conversationId) return c;

              return {
                ...c,
                messages: c.messages.map((m) => {
                  if (m.id !== messageId) return m;
                  return {
                    ...m,
                    content: matchingServerMsg.content || "Syncar is thinking...",
                    status: matchingServerMsg.status,
                    toolsUsed: matchingServerMsg.toolCalls ? matchingServerMsg.toolCalls.map((t: any) => t.name) : m.toolsUsed,
                  };
                }),
                updatedAt: new Date(),
              };
            })
          );

          if (matchingServerMsg.status !== "pending") {
            setIsLoading(false);
            clearInterval(intervalId);
          }
        }
      } catch (err) {
        console.error("Error polling message status:", err);
      }
    }, 1500);

    return () => {
      clearInterval(intervalId);
    };
  }, [activeConv?.messages, activeConv?.serverConvId]);

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

  const handleCancel = async (messageId: string) => {
    try {
      const res = await fetch("/api/ai/chat", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageId }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to cancel request");
      }

      setConversations((prev) =>
        prev.map((c) => {
          return {
            ...c,
            messages: c.messages.map((m) => {
              if (m.id !== messageId) return m;
              return {
                ...m,
                status: "cancelled",
                content: "⚠️ AI Request paused and cancelled by user.",
              };
            }),
            updatedAt: new Date(),
          };
        })
      );
      setIsLoading(false);
    } catch (err) {
      console.error("Cancellation failed:", err);
    }
  };

  const handleSend = async (message: string) => {
    if (isLoading) return;
    if (!message || !message.trim()) return;

    let targetId = activeConvId;

    if (!targetId) {
      targetId = `conv_${Date.now()}`;
      const newConv: LocalConversation = {
        id: targetId,
        title: message.slice(0, 40) + (message.length > 40 ? "..." : ""),
        messages: [],
        updatedAt: new Date(),
      };
      setConversations((prev) => [newConv, ...prev]);
      setActiveConvId(targetId);
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

    setIsLoading(true);

    try {
      const activeConvForSend = conversations.find((c) => c.id === targetId);

      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          conversationId: activeConvForSend?.serverConvId,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit chat message");
      }

      const { conversationId: serverId, assistantMessageId } = data;

      const assistantMsg: LocalChatMessage = {
        id: assistantMessageId,
        role: "assistant",
        content: "🔍 Analyzing your request and workspace context...",
        createdAt: new Date(),
        status: "pending",
      };

      setConversations((prev) =>
        prev.map((c) =>
          c.id === targetId
            ? {
                ...c,
                messages: [...c.messages, assistantMsg],
                updatedAt: new Date(),
                serverConvId: serverId,
              }
            : c
        )
      );
    } catch (err) {
      const errorMsg: LocalChatMessage = {
        id: `m_${Date.now() + 1}`,
        role: "assistant",
        content: `Sorry, I encountered an error: ${(err as Error).message}`,
        createdAt: new Date(),
        status: "failed",
      };
      setConversations((prev) =>
        prev.map((c) => (c.id === targetId ? { ...c, messages: [...c.messages, errorMsg], updatedAt: new Date() } : c))
      );
      setIsLoading(false);
    }
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
                  {activeConv.messages.map((msg, index) => (
                    <ChatMessage
                      key={msg.id}
                      message={msg}
                      onCancel={handleCancel}
                      isLatest={index === activeConv.messages.length - 1}
                    />
                  ))}
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
              isLoading={isLoading}
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

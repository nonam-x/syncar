/**
 * AI domain types for Syncar.
 * Covers classification, chat agent, and embedding types.
 */

import type { EmailPriority } from "./email.types";

// --- Chat Roles ---

export type ChatRole = "user" | "assistant" | "system";

// --- Chat Message ---

export interface ChatMessage {
  id: string;
  conversationId: string;
  role: ChatRole;
  content: string;
  status?: "pending" | "completed" | "failed" | "cancelled";
  toolCalls?: ToolCall[];
  toolResults?: ToolResult[];
  createdAt: Date;
}

// --- Tool Call (for MCP / function calling) ---

export interface ToolCall {
  id: string;
  name: string;
  arguments: Record<string, unknown>;
}

export interface ToolResult {
  toolCallId: string;
  content: string;
  isError?: boolean;
}

// --- Conversation ---

export interface AIConversation {
  id: string;
  userId: string;
  title?: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

// --- Classification ---

export interface EmailClassification {
  emailId: string;
  priority: EmailPriority;
  confidence: number; // 0.0 - 1.0
  reasoning: string;
  suggestedLabels?: string[];
}

// --- Embedding ---

export interface EmbeddingResult {
  text: string;
  embedding: number[];
  dimensions: number;
}

// --- Input Types ---

export interface ChatInput {
  userId: string;
  conversationId?: string; // null for new conversation
  message: string;
}

export interface ClassifyEmailInput {
  emailId: string;
  subject: string;
  from: string;
  snippet: string;
  body?: string;
  labelIds?: string[];
}

export interface GenerateEmbeddingInput {
  text: string;
  model?: string;
}

export interface SuggestReplyInput {
  userId: string;
  emailId: string;
  context?: string;
  tone?: "professional" | "friendly" | "concise";
}

// --- Output Types ---

export interface ChatOutput {
  conversationId: string;
  response: string;
  toolsUsed?: string[];
}

export interface SuggestReplyOutput {
  suggestions: string[];
  emailId: string;
}

// --- AI Model Configuration ---

export interface AIModelConfig {
  model: string;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
}

// --- Gemini Models ---

export const GEMINI_MODELS = {
  FAST: "gemini-3.1-flash-lite",
  STANDARD: "gemini-3.1-flash-lite",
  HEAVY: "gemma-4-31b-it",
} as const;

export type GeminiModel = (typeof GEMINI_MODELS)[keyof typeof GEMINI_MODELS];

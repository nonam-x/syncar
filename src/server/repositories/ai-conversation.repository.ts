import { BaseRepository } from "./base.repository";
import type { AIConversation, ChatMessage } from "@/types";
import type {
  AIConversation as PrismaConversation,
  AIMessage as PrismaMessage,
} from "@/lib/generated/prisma";

export class AIConversationRepository extends BaseRepository {
  /**
   * Find conversation by ID, including its messages.
   */
  async findById(id: string, userId: string): Promise<AIConversation | null> {
    const conversation = await this.prisma.aIConversation.findFirst({
      where: { id, userId },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    return conversation ? this.mapToDomain(conversation) : null;
  }

  /**
   * List conversations for a user (without loading all message content, or simple summary).
   */
  async list(userId: string, limit = 20): Promise<Omit<AIConversation, "messages">[]> {
    const conversations = await this.prisma.aIConversation.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      take: limit,
    });

    return conversations.map((c) => ({
      id: c.id,
      userId: c.userId,
      title: c.title || undefined,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
    }));
  }

  /**
   * Create a new chat conversation.
   */
  async create(userId: string, title?: string): Promise<AIConversation> {
    const created = await this.prisma.aIConversation.create({
      data: {
        userId,
        title,
      },
      include: {
        messages: true,
      },
    });

    return this.mapToDomain(created);
  }

  /**
   * Add a message to an existing conversation and update conversation's updatedAt timestamp.
   */
  async addMessage(
    conversationId: string,
    message: Omit<ChatMessage, "id" | "createdAt" | "conversationId">
  ): Promise<ChatMessage> {
    const created = await this.prisma.$transaction(async (tx) => {
      const msg = await tx.aIMessage.create({
        data: {
          conversationId,
          role: message.role,
          content: message.content,
          status: message.status || "completed",
          toolCalls: message.toolCalls as any,
          toolResults: message.toolResults as any,
        },
      });

      await tx.aIConversation.update({
        where: { id: conversationId },
        data: { updatedAt: new Date() },
      });

      return msg;
    });

    return this.mapMessageToDomain(created);
  }

  /**
   * Update conversation title.
   */
  async updateTitle(id: string, userId: string, title: string): Promise<void> {
    await this.prisma.aIConversation.updateMany({
      where: { id, userId },
      data: { title },
    });
  }

  /**
   * Delete a conversation.
   */
  async delete(id: string, userId: string): Promise<void> {
    await this.prisma.aIConversation.deleteMany({
      where: { id, userId },
    });
  }

  /**
   * Helper to map Prisma model to Domain model.
   */
  private mapToDomain(
    convo: PrismaConversation & { messages: PrismaMessage[] }
  ): AIConversation {
    return {
      id: convo.id,
      userId: convo.userId,
      title: convo.title || undefined,
      messages: convo.messages.map((m) => this.mapMessageToDomain(m)),
      createdAt: convo.createdAt,
      updatedAt: convo.updatedAt,
    };
  }

  /**
   * Helper to map message to Domain model.
   */
  private mapMessageToDomain(msg: PrismaMessage): ChatMessage {
    return {
      id: msg.id,
      conversationId: msg.conversationId,
      role: msg.role as any,
      content: msg.content,
      status: (msg as any).status as any || "completed",
      toolCalls: (msg.toolCalls as any) || undefined,
      toolResults: (msg.toolResults as any) || undefined,
      createdAt: msg.createdAt,
    };
  }
}

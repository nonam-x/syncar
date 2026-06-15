import { BaseRepository } from "./base.repository";
import type { Email, EmailPriority } from "@/types";
import type { Email as PrismaEmail, EmailPriority as PrismaEmailPriority } from "@/lib/generated/prisma";

export class EmailRepository extends BaseRepository {
  /**
   * Find an email by its ID and user ID.
   */
  async findById(id: string, userId: string): Promise<Email | null> {
    const email = await this.prisma.email.findFirst({
      where: { id, userId },
    });
    return email ? this.mapToDomain(email) : null;
  }

  /**
   * Find emails by thread ID.
   */
  async findByThreadId(threadId: string, userId: string): Promise<Email[]> {
    const emails = await this.prisma.email.findMany({
      where: { threadId, userId },
      orderBy: { receivedAt: "asc" },
    });
    return emails.map((e) => this.mapToDomain(e));
  }

  /**
   * List emails with filtering and pagination.
   */
  async list(params: {
    userId: string;
    labelIds?: string[];
    priority?: EmailPriority;
    isRead?: boolean;
    isStarred?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<Email[]> {
    const { userId, labelIds, priority, isRead, isStarred, limit = 20, offset = 0 } = params;

    const emails = await this.prisma.email.findMany({
      where: {
        userId,
        ...(priority ? { priority: priority as PrismaEmailPriority } : {}),
        ...(isRead !== undefined ? { isRead } : {}),
        ...(isStarred !== undefined ? { isStarred } : {}),
        ...(labelIds && labelIds.length > 0
          ? {
              labelIds: {
                hasSome: labelIds,
              },
            }
          : {
              labelIds: {
                has: "INBOX",
              },
            }),
      },
      orderBy: { receivedAt: "desc" },
      take: limit,
      skip: offset,
    });

    return emails.map((e) => this.mapToDomain(e));
  }

  /**
   * Delete an email by its ID and user ID from the cache.
   */
  async delete(id: string, userId: string): Promise<void> {
    await this.prisma.email.deleteMany({
      where: { id, userId },
    });
  }

  /**
   * Create or update (upsert) an email.
   * This is crucial for syncing emails from Corsair.
   */
  async upsert(email: Omit<Email, "priority"> & { priority?: EmailPriority; confidence?: number; reasoning?: string }): Promise<Email> {
    const data = {
      threadId: email.threadId,
      userId: email.userId,
      from: email.from as any,
      to: email.to as any,
      cc: email.cc as any,
      bcc: email.bcc as any,
      subject: email.subject,
      snippet: email.snippet,
      body: email.body,
      bodyHtml: email.bodyHtml,
      labelIds: email.labelIds,
      isRead: email.isRead,
      isStarred: email.isStarred,
      priority: (email.priority || "MEDIUM") as PrismaEmailPriority,
      confidence: email.confidence,
      reasoning: email.reasoning,
      receivedAt: email.receivedAt,
      attachments: email.attachments as any,
    };

    const upserted = await this.prisma.email.upsert({
      where: { id: email.id },
      create: {
        id: email.id,
        ...data,
      },
      update: data,
    });

    return this.mapToDomain(upserted);
  }

  /**
   * Save a vector embedding for an email to enable semantic search.
   */
  async updateEmbedding(id: string, embedding: number[]): Promise<void> {
    const vectorStr = `[${embedding.join(",")}]`;
    await this.prisma.$executeRawUnsafe(
      `UPDATE emails SET embedding = $1::vector WHERE id = $2`,
      vectorStr,
      id
    );
  }

  /**
   * Perform vector similarity search on emails using pgvector.
   */
  async vectorSearch(params: {
    userId: string;
    embedding: number[];
    limit?: number;
    labelIds?: string[];
  }): Promise<Email[]> {
    const { userId, embedding, limit = 10, labelIds } = params;
    const vectorStr = `[${embedding.join(",")}]`;

    // Because prisma has issues binding arrays inside raw queries natively for pgvector,
    // we use a clean raw query with string format or parameter binding.
    let query = `
      SELECT id, thread_id, user_id, "from", "to", cc, bcc, subject, snippet, body, body_html, label_ids, is_read, is_starred, priority, confidence, reasoning, received_at, attachments
      FROM emails
      WHERE user_id = $1
    `;

    const queryParams: any[] = [userId, vectorStr];

    if (labelIds && labelIds.length > 0) {
      query += ` AND label_ids && $3`;
      queryParams.push(labelIds);
    }

    query += ` ORDER BY embedding <=> $2::vector LIMIT $${queryParams.length + 1}`;
    queryParams.push(limit);

    const rawEmails = await this.prisma.$queryRawUnsafe<any[]>(query, ...queryParams);

    return rawEmails.map((e) => ({
      id: e.id,
      threadId: e.thread_id,
      userId: e.user_id,
      from: e.from,
      to: e.to,
      cc: e.cc || undefined,
      bcc: e.bcc || undefined,
      subject: e.subject,
      snippet: e.snippet,
      body: e.body,
      bodyHtml: e.body_html || undefined,
      labelIds: e.label_ids || [],
      isRead: e.is_read,
      isStarred: e.is_starred,
      priority: e.priority as EmailPriority,
      receivedAt: new Date(e.received_at),
      attachments: e.attachments || [],
    }));
  }

  /**
   * Helper to map Prisma model to Domain model.
   */
  private mapToDomain(email: PrismaEmail): Email {
    return {
      id: email.id,
      threadId: email.threadId,
      userId: email.userId,
      from: email.from as any,
      to: email.to as any,
      cc: (email.cc as any) || undefined,
      bcc: (email.bcc as any) || undefined,
      subject: email.subject,
      snippet: email.snippet,
      body: email.body,
      bodyHtml: email.bodyHtml || undefined,
      labelIds: email.labelIds,
      isRead: email.isRead,
      isStarred: email.isStarred,
      priority: email.priority as EmailPriority,
      receivedAt: email.receivedAt,
      attachments: email.attachments as any,
    };
  }
}

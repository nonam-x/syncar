import { EmailRepository } from "../repositories/email.repository";
import { AIService } from "./ai.service";
import type { Email } from "@/types";

export class SearchService {
  constructor(
    private emailRepository: EmailRepository,
    private aiService: AIService
  ) {}

  /**
   * Search emails using vector search (semantic) or classic text matching, or combined.
   */
  async search(params: {
    userId: string;
    query: string;
    useVectorSearch?: boolean;
    limit?: number;
    labelIds?: string[];
  }): Promise<Email[]> {
    const { userId, query, useVectorSearch = true, limit = 20, labelIds } = params;

    if (!query.trim()) {
      return this.emailRepository.list({ userId, labelIds, limit });
    }

    if (useVectorSearch) {
      try {
        // 1. Generate search query embedding
        const queryEmbedding = await this.aiService.generateEmbedding(query);

        // 2. Query similarity index in DB
        const vectorResults = await this.emailRepository.vectorSearch({
          userId,
          embedding: queryEmbedding,
          limit,
          labelIds,
        });

        if (vectorResults.length > 0) {
          return vectorResults;
        }
      } catch (error) {
        console.error("Vector search failed, falling back to text search:", error);
      }
    }

    // Classic keyword search fallback
    return this.keywordSearch({ userId, query, limit, labelIds });
  }

  /**
   * Classic SQL text search (insensitive contains/ILIKE) across email fields.
   */
  private async keywordSearch(params: {
    userId: string;
    query: string;
    limit: number;
    labelIds?: string[];
  }): Promise<Email[]> {
    const { userId, query, limit, labelIds } = params;

    // Use Prisma's standard filtering for case-insensitive keyword search
    const emails = await this.emailRepository.list({
      userId,
      labelIds,
      limit,
    });

    // In a production app, we would search with database OR condition.
    // Let's implement full database keyword search directly using prisma:
    const prisma = (this.emailRepository as any).prisma;
    const dbResults = await prisma.email.findMany({
      where: {
        userId,
        AND: [
          ...(labelIds && labelIds.length > 0 ? [{ labelIds: { hasSome: labelIds } }] : []),
          {
            OR: [
              { subject: { contains: query, mode: "insensitive" } },
              { snippet: { contains: query, mode: "insensitive" } },
              { body: { contains: query, mode: "insensitive" } },
            ],
          },
        ],
      },
      orderBy: { receivedAt: "desc" },
      take: limit,
    });

    // Map to domain model
    return dbResults.map((email: any) => ({
      id: email.id,
      threadId: email.threadId,
      userId: email.userId,
      from: email.from,
      to: email.to,
      cc: email.cc || undefined,
      bcc: email.bcc || undefined,
      subject: email.subject,
      snippet: email.snippet,
      body: email.body,
      bodyHtml: email.bodyHtml || undefined,
      labelIds: email.labelIds,
      isRead: email.isRead,
      isStarred: email.isStarred,
      priority: email.priority,
      receivedAt: email.receivedAt,
      attachments: email.attachments,
    }));
  }
}

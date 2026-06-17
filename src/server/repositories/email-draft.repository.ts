import { BaseRepository } from "./base.repository";
import type { EmailDraft } from "@/types";
import type { EmailDraft as PrismaEmailDraft } from "@/lib/generated/prisma";

export class EmailDraftRepository extends BaseRepository {
  /**
   * Find a draft by ID and user ID.
   */
  async findById(id: string, userId: string): Promise<EmailDraft | null> {
    const draft = await this.prisma.emailDraft.findFirst({
      where: { id, userId },
    });
    return draft ? this.mapToDomain(draft) : null;
  }

  /**
   * Find draft by its Corsair Draft ID.
   */
  async findByCorsairDraftId(corsairDraftId: string): Promise<EmailDraft | null> {
    const draft = await this.prisma.emailDraft.findFirst({
      where: { corsairDraftId },
    });
    return draft ? this.mapToDomain(draft) : null;
  }

  /**
   * List drafts for a user.
   */
  async list(userId: string, limit = 50): Promise<EmailDraft[]> {
    const drafts = await this.prisma.emailDraft.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      take: limit,
    });
    return drafts.map((d) => this.mapToDomain(d));
  }

  /**
   * Create a new draft.
   */
  async create(draft: Omit<EmailDraft, "id" | "createdAt" | "updatedAt">): Promise<EmailDraft> {
    const created = await this.prisma.emailDraft.create({
      data: {
        userId: draft.userId,
        to: draft.to as any,
        cc: draft.cc as any,
        bcc: draft.bcc as any,
        subject: draft.subject,
        body: draft.body,
        bodyHtml: draft.bodyHtml,
        replyToEmailId: draft.replyToEmailId,
        corsairDraftId: draft.corsairDraftId,
      },
    });
    return this.mapToDomain(created);
  }

  /**
   * Update an existing draft.
   */
  async update(
    id: string,
    userId: string,
    data: Partial<Omit<EmailDraft, "id" | "userId" | "createdAt" | "updatedAt">>
  ): Promise<EmailDraft> {
    const updated = await this.prisma.emailDraft.update({
      where: { id },
      data: {
        ...(data.to ? { to: data.to as any } : {}),
        ...(data.cc ? { cc: data.cc as any } : {}),
        ...(data.bcc ? { bcc: data.bcc as any } : {}),
        ...(data.subject !== undefined ? { subject: data.subject } : {}),
        ...(data.body !== undefined ? { body: data.body } : {}),
        ...(data.bodyHtml !== undefined ? { bodyHtml: data.bodyHtml } : {}),
        ...(data.replyToEmailId !== undefined ? { replyToEmailId: data.replyToEmailId } : {}),
        ...(data.corsairDraftId !== undefined ? { corsairDraftId: data.corsairDraftId } : {}),
      },
    });
    return this.mapToDomain(updated);
  }

  /**
   * Delete a draft.
   */
  async delete(id: string, userId: string): Promise<void> {
    await this.prisma.emailDraft.deleteMany({
      where: { id, userId },
    });
  }

  /**
   * Helper to map Prisma model to Domain model.
   */
  private mapToDomain(draft: PrismaEmailDraft): EmailDraft {
    return {
      id: draft.id,
      userId: draft.userId,
      to: draft.to as any,
      cc: (draft.cc as any) || undefined,
      bcc: (draft.bcc as any) || undefined,
      subject: draft.subject,
      body: draft.body,
      bodyHtml: draft.bodyHtml || undefined,
      replyToEmailId: draft.replyToEmailId || undefined,
      corsairDraftId: draft.corsairDraftId || undefined,
      createdAt: draft.createdAt,
      updatedAt: draft.updatedAt,
    };
  }
}

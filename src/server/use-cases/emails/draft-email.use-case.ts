import { CreateDraftSchema, UpdateDraftSchema } from "@/types/api.types";
import { ValidationError } from "@/lib/errors";
import { Result, ok, err, fromPromise } from "@/lib/result";
import { EmailService } from "@/server/services/email.service";
import type { EmailDraft } from "@/types";

export class DraftEmailUseCase {
  constructor(private emailService: EmailService) {}

  /**
   * Create a new draft.
   */
  async createDraft(
    userId: string,
    input: unknown
  ): Promise<Result<EmailDraft>> {
    const validation = CreateDraftSchema.safeParse(input);
    if (!validation.success) {
      return err(
        new ValidationError("Invalid parameters for creating draft", {
          errors: validation.error.format(),
        })
      );
    }

    return fromPromise(
      this.emailService.createDraft(userId, {
        userId,
        to: validation.data.to || [],
        cc: validation.data.cc,
        bcc: validation.data.bcc,
        subject: validation.data.subject || "",
        body: validation.data.body || "",
        bodyHtml: validation.data.bodyHtml,
        replyToEmailId: validation.data.replyToEmailId,
      }),
      (error) => {
        console.error("CreateDraft failure:", error);
        return error as any;
      }
    );
  }

  /**
   * Update an existing draft in cache (Google Calendar/Gmail sync does the API update, or we update via EmailDraftRepository).
   */
  async updateDraft(
    userId: string,
    draftId: string,
    input: unknown
  ): Promise<Result<EmailDraft>> {
    if (!draftId) {
      return err(new ValidationError("Draft ID is required"));
    }

    const validation = UpdateDraftSchema.safeParse(input);
    if (!validation.success) {
      return err(
        new ValidationError("Invalid parameters for updating draft", {
          errors: validation.error.format(),
        })
      );
    }

    const repo = (this.emailService as any).emailDraftRepository;
    return fromPromise(
      repo.update(draftId, userId, validation.data),
      (error) => {
        console.error(`UpdateDraft failure for ${draftId}:`, error);
        return error as any;
      }
    );
  }

  /**
   * Delete an existing draft from cache.
   */
  async deleteDraft(userId: string, draftId: string): Promise<Result<void>> {
    if (!draftId) {
      return err(new ValidationError("Draft ID is required"));
    }

    const repo = (this.emailService as any).emailDraftRepository;
    return fromPromise(
      repo.delete(draftId, userId),
      (error) => {
        console.error(`DeleteDraft failure for ${draftId}:`, error);
        return error as any;
      }
    );
  }
}

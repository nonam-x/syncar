import { ListEmailsSchema } from "@/types/api.types";
import { ValidationError } from "@/lib/errors";
import { Result, ok, err, fromPromise } from "@/lib/result";
import { EmailService } from "@/server/services/email.service";
import type { Email } from "@/types";

export class ListEmailsUseCase {
  constructor(private emailService: EmailService) {}

  async execute(
    userId: string,
    input: unknown
  ): Promise<Result<Email[]>> {
    // 1. Validate inputs with Zod
    const validation = ListEmailsSchema.safeParse(input);
    if (!validation.success) {
      return err(
        new ValidationError("Invalid parameters for listing emails", {
          errors: validation.error.format(),
        })
      );
    }

    const { labelIds, priority, maxResults } = validation.data;

    // 2. Call service layer wrapped in Result monad
    return fromPromise(
      this.emailService.listEmails({
        userId,
        labelIds,
        priority: priority as any,
        limit: maxResults,
      }),
      (error) => {
        console.error("ListEmailsUseCase failure:", error);
        return error as any;
      }
    );
  }
}

import { SendEmailSchema } from "@/types/api.types";
import { ValidationError } from "@/lib/errors";
import { Result, ok, err, fromPromise } from "@/lib/result";
import { EmailService } from "@/server/services/email.service";
import type { Email } from "@/types";

export class SendEmailUseCase {
  constructor(private emailService: EmailService) {}

  async execute(
    userId: string,
    input: unknown
  ): Promise<Result<Email>> {
    // 1. Validate inputs with Zod
    const validation = SendEmailSchema.safeParse(input);
    if (!validation.success) {
      return err(
        new ValidationError("Invalid parameters for sending email", {
          errors: validation.error.format(),
        })
      );
    }

    // 2. Call service layer wrapped in Result monad
    return fromPromise(
      this.emailService.sendEmail({
        userId,
        ...validation.data,
      }),
      (error) => {
        console.error("SendEmailUseCase failure:", error);
        return error as any;
      }
    );
  }
}

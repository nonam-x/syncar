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

    // 2. Prevent SMTP / Email Header Injection (deny newlines/carriage returns in headers)
    const { to, cc, bcc, subject } = validation.data;
    if (/[\r\n]/.test(subject)) {
      return err(new ValidationError("Invalid characters in subject (newline not allowed)"));
    }
    for (const rec of to) {
      if (/[\r\n]/.test(rec.email) || (rec.name && /[\r\n]/.test(rec.name))) {
        return err(new ValidationError("Invalid characters in recipient email or name"));
      }
    }
    if (cc) {
      for (const rec of cc) {
        if (/[\r\n]/.test(rec.email) || (rec.name && /[\r\n]/.test(rec.name))) {
          return err(new ValidationError("Invalid characters in CC recipient email or name"));
        }
      }
    }
    if (bcc) {
      for (const rec of bcc) {
        if (/[\r\n]/.test(rec.email) || (rec.name && /[\r\n]/.test(rec.name))) {
          return err(new ValidationError("Invalid characters in BCC recipient email or name"));
        }
      }
    }

    // 3. Call service layer wrapped in Result monad
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

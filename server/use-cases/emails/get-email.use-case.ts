import { ValidationError, NotFoundError } from "@/lib/errors";
import { Result, ok, err, fromPromise } from "@/lib/result";
import { EmailService } from "@/server/services/email.service";
import type { Email } from "@/types";

export class GetEmailUseCase {
  constructor(private emailService: EmailService) {}

  async execute(userId: string, emailId: string): Promise<Result<Email>> {
    if (!emailId || typeof emailId !== "string") {
      return err(new ValidationError("Email ID is required"));
    }

    return fromPromise(
      this.emailService.getEmail(emailId, userId),
      (error: any) => {
        console.error(`GetEmailUseCase failure for email ${emailId}:`, error);
        return new NotFoundError("Email", emailId);
      }
    );
  }
}

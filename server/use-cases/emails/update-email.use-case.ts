import { Result, fromPromise } from "@/lib/result";
import { EmailService } from "@/server/services/email.service";
import type { Email } from "@/types";

export class UpdateEmailUseCase {
  constructor(private emailService: EmailService) {}

  async execute(
    userId: string,
    emailId: string,
    updates: { isRead?: boolean; isStarred?: boolean; archived?: boolean }
  ): Promise<Result<Email>> {
    return fromPromise(
      this.emailService.updateEmail(userId, emailId, updates),
      (error) => {
        console.error("UpdateEmailUseCase failure:", error);
        return error as any;
      }
    );
  }
}

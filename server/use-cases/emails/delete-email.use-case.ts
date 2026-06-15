import { Result, fromPromise } from "@/lib/result";
import { EmailService } from "@/server/services/email.service";

export class DeleteEmailUseCase {
  constructor(private emailService: EmailService) {}

  async execute(userId: string, emailId: string): Promise<Result<void>> {
    return fromPromise(
      this.emailService.deleteEmail(userId, emailId),
      (error) => {
        console.error("DeleteEmailUseCase failure:", error);
        return error as any;
      }
    );
  }
}

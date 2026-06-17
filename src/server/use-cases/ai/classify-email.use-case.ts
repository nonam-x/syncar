import { ClassifyEmailSchema } from "@/types/api.types";
import { ValidationError, NotFoundError } from "@/lib/errors";
import { Result, ok, err, fromPromise } from "@/lib/result";
import { ClassificationService } from "@/server/services/classification.service";
import type { Email } from "@/types";

export class ClassifyEmailUseCase {
  constructor(private classificationService: ClassificationService) {}

  async execute(
    userId: string,
    input: unknown
  ): Promise<Result<Email>> {
    // 1. Validate inputs with Zod
    const validation = ClassifyEmailSchema.safeParse(input);
    if (!validation.success) {
      return err(
        new ValidationError("Invalid parameters for email priority classification", {
          errors: validation.error.format(),
        })
      );
    }

    const { emailId } = validation.data;

    // 2. Classify and store updates in database
    return fromPromise(
      this.classificationService.classifyAndStore(emailId, userId).then((result) => {
        if (!result) {
          throw new NotFoundError("Email", emailId);
        }
        return result;
      }),
      (error) => {
        console.error(`ClassifyEmailUseCase failure for email ${emailId}:`, error);
        return error as any;
      }
    );
  }
}

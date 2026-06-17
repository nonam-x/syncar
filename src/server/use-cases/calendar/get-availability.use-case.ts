import { GetAvailabilitySchema } from "@/types/api.types";
import { ValidationError } from "@/lib/errors";
import { Result, ok, err, fromPromise } from "@/lib/result";
import { CalendarService } from "@/server/services/calendar.service";
import type { CalendarAvailability } from "@/types";

export class GetAvailabilityUseCase {
  constructor(private calendarService: CalendarService) {}

  async execute(
    userId: string,
    input: unknown
  ): Promise<Result<CalendarAvailability[]>> {
    // 1. Validate inputs with Zod
    const validation = GetAvailabilitySchema.safeParse(input);
    if (!validation.success) {
      return err(
        new ValidationError("Invalid parameters for checking availability", {
          errors: validation.error.format(),
        })
      );
    }

    // 2. Call service layer wrapped in Result monad
    return fromPromise(
      this.calendarService.getAvailability({
        userId,
        ...validation.data,
      }),
      (error) => {
        console.error("GetAvailabilityUseCase failure:", error);
        return error as any;
      }
    );
  }
}

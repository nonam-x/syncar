import { ListEventsSchema } from "@/types/api.types";
import { ValidationError } from "@/lib/errors";
import { Result, ok, err, fromPromise } from "@/lib/result";
import { CalendarService } from "@/server/services/calendar.service";
import type { CalendarEvent } from "@/types";

export class ListEventsUseCase {
  constructor(private calendarService: CalendarService) {}

  async execute(
    userId: string,
    input: unknown
  ): Promise<Result<CalendarEvent[]>> {
    // 1. Validate inputs with Zod
    const validation = ListEventsSchema.safeParse(input);
    if (!validation.success) {
      return err(
        new ValidationError("Invalid parameters for listing events", {
          errors: validation.error.format(),
        })
      );
    }

    // 2. Call service layer wrapped in Result monad
    return fromPromise(
      this.calendarService.listEvents({
        userId,
        ...validation.data,
      }),
      (error) => {
        console.error("ListEventsUseCase failure:", error);
        return error as any;
      }
    );
  }
}

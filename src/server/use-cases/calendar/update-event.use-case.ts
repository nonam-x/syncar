import { UpdateEventSchema } from "@/types/api.types";
import { ValidationError } from "@/lib/errors";
import { Result, ok, err, fromPromise } from "@/lib/result";
import { CalendarService } from "@/server/services/calendar.service";
import type { CalendarEvent } from "@/types";

export class UpdateEventUseCase {
  constructor(private calendarService: CalendarService) {}

  async execute(
    userId: string,
    eventId: string,
    input: unknown
  ): Promise<Result<CalendarEvent>> {
    if (!eventId) {
      return err(new ValidationError("Event ID is required"));
    }

    // 1. Validate inputs with Zod
    const validation = UpdateEventSchema.safeParse(input);
    if (!validation.success) {
      return err(
        new ValidationError("Invalid parameters for updating calendar event", {
          errors: validation.error.format(),
        })
      );
    }

    // 2. Call service layer wrapped in Result monad
    return fromPromise(
      this.calendarService.updateEvent({
        userId,
        eventId,
        ...validation.data,
      }),
      (error) => {
        console.error(`UpdateEventUseCase failure for event ${eventId}:`, error);
        return error as any;
      }
    );
  }
}

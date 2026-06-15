import { ValidationError } from "@/lib/errors";
import { Result, ok, err, fromPromise } from "@/lib/result";
import { WebhookService } from "@/server/services/webhook.service";

export class ProcessWebhookUseCase {
  constructor(private webhookService: WebhookService) {}

  /**
   * Execute the webhook processing pipeline.
   * Receives headers and body payload from Corsair webhook dispatcher.
   */
  async execute(headers: Record<string, string>, body: any): Promise<Result<any>> {
    if (!body || !body.type || !body.payload) {
      return err(
        new ValidationError("Invalid webhook body. Must contain type and payload fields.", {
          body,
        })
      );
    }

    const eventType = body.type;
    const eventPayload = body.payload;

    return fromPromise(
      this.webhookService.handleCorsairWebhook(eventType, eventPayload).then(() => {
        return { success: true, eventProcessed: eventType };
      }),
      (error) => {
        console.error(`ProcessWebhookUseCase failure for event ${eventType}:`, error);
        return error as any;
      }
    );
  }
}

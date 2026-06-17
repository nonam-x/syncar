import { ValidationError } from "@/lib/errors";
import { Result, ok, err, fromPromise } from "@/lib/result";
import { WebhookService } from "@/server/services/webhook.service";
import { prisma } from "@/lib/prisma";
import { corsair } from "@/lib/corsair";
import { processWebhook } from "corsair";

export class ProcessWebhookUseCase {
  constructor(private webhookService: WebhookService) {}

  /**
   * Execute the webhook processing pipeline.
   * Receives headers and body payload from Corsair webhook dispatcher.
   */
  async execute(headers: Record<string, string>, body: any): Promise<Result<any>> {
    // 1. Check if the body is a Google Pub/Sub push notification message
    if (body && body.message && body.message.messageId && body.message.data) {
      const pubsubMessageId = body.message.messageId;

      try {
        // Idempotency: check if already processed or pending
        const existingEvent = await prisma.webhookEvent.findUnique({
          where: { id: pubsubMessageId },
        });

        if (existingEvent) {
          if (existingEvent.status === "processed") {
            console.log(`[Webhook] Duplicate event ${pubsubMessageId} already processed. Skipping.`);
            return ok({ success: true, duplicated: true });
          }
          if (existingEvent.status === "pending") {
            console.log(`[Webhook] Event ${pubsubMessageId} is currently pending processing. Skipping.`);
            return ok({ success: true, pending: true });
          }
        }

        // Decode Pub/Sub payload data
        let emailAddress: string;
        let historyId: string;
        try {
          const decoded = JSON.parse(
            Buffer.from(body.message.data, "base64").toString("utf-8")
          );
          emailAddress = decoded.emailAddress;
          historyId = decoded.historyId;
        } catch (decodeErr) {
          console.error("[Webhook] Failed to decode Pub/Sub message data:", decodeErr);
          return ok({ success: false, error: "Invalid Pub/Sub message encoding" });
        }

        if (!emailAddress) {
          return ok({ success: false, error: "Missing emailAddress in Pub/Sub data" });
        }

        // Resolve tenant ID (Clerk userId) by connected Gmail email
        const accounts = await prisma.corsairAccount.findMany({
          where: {
            integration: {
              name: "gmail",
            },
          },
        });

        const matchedAccount = accounts.find((acc) => {
          const config = acc.config as Record<string, any>;
          return config?.email === emailAddress;
        });

        let tenantId = matchedAccount?.tenantId;

        // Fallback: look up by user primary email if not found in CorsairAccount config mapping
        if (!tenantId) {
          const matchedUser = await prisma.user.findUnique({
            where: { email: emailAddress },
          });
          tenantId = matchedUser?.id;
        }

        if (!tenantId) {
          console.warn(`[Webhook] No active tenant found matching Gmail address: ${emailAddress}`);
          await prisma.webhookEvent.create({
            data: {
              id: pubsubMessageId,
              eventType: "gmail.pubsub.unmapped",
              payload: body,
              status: "failed",
              error: `No tenant mapped to Gmail address: ${emailAddress}`,
            },
          });
          return ok({ success: false, error: "Unmapped tenant email address" });
        }

        // If historyId is present, we can also record it for tracking in the config of the account
        if (historyId && matchedAccount) {
          const currentConfig = typeof matchedAccount.config === "object" && matchedAccount.config !== null ? matchedAccount.config : {};
          await prisma.corsairAccount.update({
            where: { id: matchedAccount.id },
            data: {
              config: {
                ...(currentConfig as Record<string, any>),
                watchHistoryId: historyId,
              },
            },
          });
        }

        // Log the event in a pending state
        await prisma.webhookEvent.create({
          data: {
            id: pubsubMessageId,
            eventType: "gmail.pubsub",
            payload: body,
            status: "pending",
          },
        });

        // Run Corsair's processWebhook pipeline (executes the webhookHooks registered in lib/corsair.ts)
        const result = await processWebhook(corsair, headers, body, { tenantId });

        // Update status to processed
        await prisma.webhookEvent.update({
          where: { id: pubsubMessageId },
          data: { status: "processed" },
        });

        return ok(result.response || { success: true });
      } catch (err: any) {
        console.error(`[Webhook] Error processing Pub/Sub message ${pubsubMessageId}:`, err);
        
        // Mark as failed in DB
        await prisma.webhookEvent.upsert({
          where: { id: pubsubMessageId },
          update: {
            status: "failed",
            error: err.message || String(err),
          },
          create: {
            id: pubsubMessageId,
            eventType: "gmail.pubsub",
            payload: body,
            status: "failed",
            error: err.message || String(err),
          },
        });

        return err(err);
      }
    }

    // 2. Standard CorsairWebhook payload processing
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

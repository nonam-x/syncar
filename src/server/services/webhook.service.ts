import { prisma } from "@/lib/prisma";
import { corsair } from "@/lib/corsair";
import { EmailRepository } from "../repositories/email.repository";
import { CalendarEventRepository } from "../repositories/calendar-event.repository";
import { ClassificationService } from "./classification.service";
import { EmailService } from "./email.service";
import { CalendarService } from "./calendar.service";

export class WebhookService {
  constructor(
    private emailRepository: EmailRepository,
    private calendarEventRepository: CalendarEventRepository,
    private classificationService: ClassificationService,
    private emailService: EmailService,
    private calendarService: CalendarService
  ) {}

  /**
   * Log the webhook event in the database for auditing/debugging.
   */
  private async logWebhookEvent(params: {
    eventType: string;
    payload: any;
    status: "pending" | "processed" | "failed";
    error?: string;
  }) {
    return prisma.webhookEvent.create({
      data: {
        eventType: params.eventType,
        payload: params.payload,
        status: params.status,
        error: params.error,
      },
    });
  }

  /**
   * Dispatch and process a webhook received from Corsair.
   */
  async handleCorsairWebhook(eventType: string, payload: any): Promise<void> {
    const logRecord = await this.logWebhookEvent({
      eventType,
      payload,
      status: "pending",
    });

    try {
      console.log(`Processing Corsair webhook: ${eventType}`, payload);

      const accountId = payload.accountId;
      if (!accountId) {
        throw new Error("Missing accountId in webhook payload");
      }

      // Map Corsair account to user
      const account = await prisma.corsairAccount.findUnique({
        where: { id: accountId },
      });
      const userId = account?.tenantId || "default";

      switch (eventType) {
        // --- Gmail Webhooks ---
        case "gmail.messageChanged":
        case "gmail.messageCreated": {
          const messageId = payload.messageId || payload.id;
          if (!messageId) {
            throw new Error("Missing messageId/id in Gmail webhook payload");
          }

          // Cast is required because withTenant() returns a generic CorsairInstance, 
          // but we need the specific plugin typings (gmail, googlecalendar) configured on the main corsair instance.
          const tenantCorsair = corsair.withTenant(userId) as any;

          // Fetch message from Gmail API using Corsair
          const fullMsg = await tenantCorsair.gmail.api.messages.get({
            accountId,
            id: messageId,
          });

          // Map and upsert
          const mapped = (this.emailService as any).mapCorsairMessageToEmail(fullMsg, userId);
          const cached = await this.emailRepository.upsert(mapped);

          // Run classification & embedding pipeline
          await this.classificationService.classifyAndStore(cached.id, userId);
          break;
        }

        case "gmail.messageDeleted": {
          const messageId = payload.messageId || payload.id;
          if (!messageId) {
            throw new Error("Missing messageId/id in Gmail webhook payload");
          }
          await this.emailRepository.delete(messageId, userId);
          break;
        }

        // --- Google Calendar Webhooks ---
        case "googlecalendar.eventChanged":
        case "googlecalendar.eventCreated": {
          const eventId = payload.eventId || payload.id;
          const calendarId = payload.calendarId || "primary";
          if (!eventId) {
            throw new Error("Missing eventId/id in Calendar webhook payload");
          }

          const tenantCorsair = corsair.withTenant(userId) as any;

          // Fetch event details
          const fullEvent = await tenantCorsair.googlecalendar.api.events.get({
            accountId,
            calendarId,
            eventId,
          });

          // Map and upsert
          const mapped = (this.calendarService as any).mapCorsairEvent(fullEvent, userId, calendarId);
          await this.calendarEventRepository.upsert(mapped);
          break;
        }

        case "googlecalendar.eventDeleted": {
          const eventId = payload.eventId || payload.id;
          if (eventId) {
            await this.calendarEventRepository.delete(eventId, userId);
          }
          break;
        }

        default:
          console.warn(`Unhandled Corsair webhook event type: ${eventType}`);
      }

      // Mark webhook as processed
      await prisma.webhookEvent.update({
        where: { id: logRecord.id },
        data: { status: "processed" },
      });
    } catch (error: any) {
      console.error(`Error processing webhook ${eventType}:`, error);

      // Mark webhook as failed
      await prisma.webhookEvent.update({
        where: { id: logRecord.id },
        data: {
          status: "failed",
          error: error.message || String(error),
        },
      });
      throw error;
    }
  }
}

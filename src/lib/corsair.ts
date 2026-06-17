import { createCorsair } from "corsair";
import { gmail } from "@corsair-dev/gmail";
import { googlecalendar } from "@corsair-dev/googlecalendar";
import { Pool } from "pg";

// Configure PostgreSQL connection pool for Corsair DB adapter
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const corsair = createCorsair({
  database: pool,
  plugins: [
    gmail({
      authType: "oauth_2",
      permissions: {
        mode: "open",
      },
      webhookHooks: {
        messageChanged: {
          before: async (ctx, request) => {
            return {
              ctx,
              args: request,
              passToAfter: JSON.stringify(request.payload),
            };
          },
          after: async (ctx, response, passToAfter) => {
            if (!passToAfter) return;
            try {
              const payload = JSON.parse(passToAfter);
              const tenantId = ctx.tenantId;
              if (!tenantId) {
                console.warn("[CorsairHook] No tenantId found in context");
                return;
              }

              const accountId = await ctx.$getAccountId();
              const { webhookService } = await import("@/lib/container");

              if (payload.type === "messageReceived" || payload.type === "messageLabelChanged") {
                await webhookService.handleCorsairWebhook("gmail.messageChanged", {
                  accountId,
                  id: payload.message?.id || payload.messageId,
                  type: payload.type,
                });
              } else if (payload.type === "messageDeleted") {
                await webhookService.handleCorsairWebhook("gmail.messageDeleted", {
                  accountId,
                  id: payload.message?.id || payload.messageId,
                  type: payload.type,
                });
              }
            } catch (err) {
              console.error("[CorsairHook] Error processing gmail messageChanged hook:", err);
            }
          },
        },
      },
    }),
    googlecalendar({
      authType: "oauth_2",
      permissions: {
        mode: "open",
      },
    }),
  ],
  multiTenancy: true,
  kek: process.env.CORSAIR_KEK || "",
});

/**
 * Self-healing initialization to ensure Gmail and Google Calendar
 * oauth integrations are set up with client credentials in the Corsair database.
 */
export async function ensureCorsairInitialized(): Promise<void> {
  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const googleRedirectUri = process.env.GOOGLE_REDIRECT_URI;

  if (!googleClientId || !googleClientSecret || !googleRedirectUri) {
    console.warn("[Corsair] Missing Google client configuration in env variables.");
    return;
  }

  try {
    // Check and set gmail client credentials
    const currentGmailClientId = await corsair.keys.gmail.get_client_id();
    if (!currentGmailClientId) {
      console.log("[Corsair] Initializing integration credentials for gmail plugin");
      await corsair.keys.gmail.set_client_id(googleClientId);
      await corsair.keys.gmail.set_client_secret(googleClientSecret);
      await corsair.keys.gmail.set_redirect_url(googleRedirectUri);
    }

    // Check and set googlecalendar client credentials
    const currentCalendarClientId = await corsair.keys.googlecalendar.get_client_id();
    if (!currentCalendarClientId) {
      console.log("[Corsair] Initializing integration credentials for googlecalendar plugin");
      await corsair.keys.googlecalendar.set_client_id(googleClientId);
      await corsair.keys.googlecalendar.set_client_secret(googleClientSecret);
      await corsair.keys.googlecalendar.set_redirect_url(googleRedirectUri);
    }
  } catch (err) {
    console.error("[Corsair] Failed to initialize keys:", err);
  }
}
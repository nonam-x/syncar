import { corsair, ensureCorsairInitialized } from "@/lib/corsair";
import { processOAuthCallback } from "corsair/oauth";
import { emailService, calendarService } from "@/lib/container";
import { errorResponse } from "@/lib/errors";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");

  const redirectUri = process.env.GOOGLE_REDIRECT_URI;

  if (error) {
    console.error("OAuth callback error from provider:", error);
    return Response.redirect(new URL(`/onboarding?error=${encodeURIComponent(error)}`, request.url));
  }

  if (!code || !state) {
    return Response.redirect(new URL("/onboarding?error=Missing+code+or+state", request.url));
  }

  try {
    // Ensure Corsair is initialized with global credentials
    await ensureCorsairInitialized();

    if (!redirectUri) {
      throw new Error("GOOGLE_REDIRECT_URI is not set in environment variables");
    }

    // Complete the OAuth exchange and store encrypted tokens
    const { plugin, tenantId } = await processOAuthCallback(corsair, {
      code,
      state,
      redirectUri,
    });

    if (plugin === "gmail") {
      const gmailAccount = await prisma.corsairAccount.findFirst({
        where: {
          tenantId,
          integration: { name: "gmail" },
        },
      });

      if (gmailAccount) {
        const calendarIntegration = await prisma.corsairIntegration.findFirst({
          where: { name: "googlecalendar" },
        });

        if (calendarIntegration) {
          const calendarAccount = await prisma.corsairAccount.findFirst({
            where: {
              tenantId,
              integrationId: calendarIntegration.id,
            },
          });

          if (calendarAccount) {
            await prisma.corsairAccount.update({
              where: { id: calendarAccount.id },
              data: {
                config: gmailAccount.config || {},
                dek: gmailAccount.dek,
                updatedAt: new Date(),
              },
            });
          } else {
            const newAccountId = crypto.randomUUID();
            await prisma.corsairAccount.create({
              data: {
                id: newAccountId,
                tenantId,
                integrationId: calendarIntegration.id,
                config: gmailAccount.config || {},
                dek: gmailAccount.dek,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            });
          }
        }
      }
    }

    // Asynchronously trigger initial cache sync for both integrations
    emailService.syncFromCorsair(tenantId, 30).catch((err) => {
      console.error("Initial Gmail sync failed:", err);
    });
    calendarService.syncFromCorsair(tenantId).catch((err) => {
      console.error("Initial Calendar sync failed:", err);
    });

    // Redirect to onboarding page
    return Response.redirect(new URL("/onboarding?success=true", request.url));
  } catch (err: any) {
    console.error("OAuth callback processing failed:", err);
    return Response.redirect(
      new URL(`/onboarding?error=${encodeURIComponent(err.message || String(err))}`, request.url)
    );
  }
}


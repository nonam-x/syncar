import { requireAuth } from "@/lib/clerk";
import { errorResponse, ValidationError } from "@/lib/errors";
import { corsair, ensureCorsairInitialized } from "@/lib/corsair";
import { generateOAuthUrl } from "corsair/oauth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { userId } = await requireAuth();

    const url = new URL(request.url);
    const plugin = url.searchParams.get("plugin");

    if (!plugin || (plugin !== "gmail" && plugin !== "googlecalendar")) {
      throw new ValidationError("Invalid or missing plugin. Must be 'gmail' or 'googlecalendar'.");
    }

    // Ensure Corsair is initialized with Google Client credentials
    await ensureCorsairInitialized();

    // Check if the user is already connected for both integrations
    const accounts = await prisma.corsairAccount.findMany({
      where: {
        tenantId: userId,
        integration: {
          name: { in: ["gmail", "googlecalendar"] },
        },
      },
      include: {
        integration: true,
      },
    });

    const hasGmail = accounts.some((acc) => acc.integration.name === "gmail");
    const hasCalendar = accounts.some((acc) => acc.integration.name === "googlecalendar");

    if (hasGmail && hasCalendar) {
      return Response.json({ url: "/onboarding?success=true", alreadyConnected: true });
    }

    const redirectUri = process.env.GOOGLE_REDIRECT_URI;
    if (!redirectUri) {
      throw new Error("GOOGLE_REDIRECT_URI is not set in environment variables");
    }

    // Always generate URL based on gmail so the callback resolves to /api/auth/gmail/callback
    const result = await generateOAuthUrl(corsair, "gmail", {
      tenantId: userId,
      redirectUri,
    });

    // Parse URL and append google calendar scope
    const parsedUrl = new URL(result.url);
    const scopeParam = parsedUrl.searchParams.get("scope") || "";
    const scopes = scopeParam.split(/[ +]/).filter(Boolean);
    const calendarScope = "https://www.googleapis.com/auth/calendar";

    if (!scopes.includes(calendarScope)) {
      scopes.push(calendarScope);
    }

    parsedUrl.searchParams.set("scope", scopes.join(" "));
    // Force prompt=consent and access_type=offline to always receive a refresh token
    parsedUrl.searchParams.set("prompt", "consent");
    parsedUrl.searchParams.set("access_type", "offline");

    return Response.json({ url: parsedUrl.toString() });
  } catch (error) {
    return errorResponse(error);
  }
}


// (`/api/auth/connect?plugin=${plugin}`);  ye route response me user ko google pe redirect karne ke liye  complete generateOAuthUrl() url dega 

import { requireAuth } from "@/lib/clerk";
import { errorResponse, ValidationError } from "@/lib/errors";
import { corsair, ensureCorsairInitialized } from "@/lib/corsair";
import { generateOAuthUrl } from "corsair/oauth";

export async function GET(request: Request) {
  try {
    const { userId } = await requireAuth(); // ye id clerk se extrack ki hui hai

    const url = new URL(request.url);
    const plugin = url.searchParams.get("plugin"); // frontedn pe jis button se triger hoga wpr ya ayga gmail ya calender

    if (!plugin || (plugin !== "gmail" && plugin !== "googlecalendar")) {
      throw new ValidationError("Invalid or missing plugin. Must be 'gmail' or 'googlecalendar'.");
    }

    // Ensure Corsair is initialized with Google Client credentials
    await ensureCorsairInitialized();

    const redirectUri = process.env.GOOGLE_REDIRECT_URI;
    if (!redirectUri) {
      throw new Error("GOOGLE_REDIRECT_URI is not set in environment variables");
    }

    const result = await generateOAuthUrl(corsair, plugin, {
      tenantId: userId,
      redirectUri,
    });

    return Response.json({ url: result.url });
  } catch (error) {
    return errorResponse(error);
  }
}

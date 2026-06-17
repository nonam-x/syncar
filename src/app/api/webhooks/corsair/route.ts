import { processWebhookUseCase } from "@/lib/container";
import { errorResponse } from "@/lib/errors";

export async function POST(request: Request) {
  try {
    const url = new URL(request.url);
    const token = url.searchParams.get("token");

    // Secure webhook endpoint with secret token if configured in environment variables
    const webhookSecret = process.env.WEBHOOK_SECRET;
    if (webhookSecret && token !== webhookSecret) {
      console.warn("[Webhook] Unauthorized attempt: missing or invalid token parameter");
      return Response.json(
        { success: false, error: "Unauthorized: Invalid or missing token parameter" },
        { status: 401 }
      );
    }

    const headers = Object.fromEntries(request.headers);
    const body = await request.json();

    const result = await processWebhookUseCase.execute(headers, body);

    if (result.ok) {
      return Response.json(result.data);
    }
    return errorResponse(result.error);
  } catch (error) {
    return errorResponse(error);
  }
}

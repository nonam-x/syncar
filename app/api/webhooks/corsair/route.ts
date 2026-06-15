import { processWebhookUseCase } from "@/lib/container";
import { errorResponse } from "@/lib/errors";

export async function POST(request: Request) {
  try {
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

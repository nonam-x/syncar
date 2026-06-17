import { sendEmailUseCase } from "@/lib/container";
import { requireAuth } from "@/lib/clerk";
import { errorResponse } from "@/lib/errors";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    const { userId } = await requireAuth();

    const rateLimit = await checkRateLimit(userId, "gmail");
    if (!rateLimit.allowed) {
      return Response.json({ error: rateLimit.error }, { status: 429 });
    }

    const body = await request.json();

    const result = await sendEmailUseCase.execute(userId, body);

    if (result.ok) {
      return Response.json(result.data);
    }
    return errorResponse(result.error);
  } catch (error) {
    return errorResponse(error);
  }
}

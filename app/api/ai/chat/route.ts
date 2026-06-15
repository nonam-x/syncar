import { chatUseCase } from "@/lib/container";
import { requireAuth } from "@/lib/clerk";
import { errorResponse } from "@/lib/errors";

export async function POST(request: Request) {
  try {
    const { userId } = await requireAuth();
    const body = await request.json();

    const result = await chatUseCase.execute(userId, body);

    if (result.ok) {
      return Response.json(result.data);
    }
    return errorResponse(result.error);
  } catch (error) {
    return errorResponse(error);
  }
}

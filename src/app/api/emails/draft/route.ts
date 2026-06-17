import { draftEmailUseCase } from "@/lib/container";
import { emailDraftRepository } from "@/lib/container";
import { requireAuth } from "@/lib/clerk";
import { errorResponse } from "@/lib/errors";

export async function GET() {
  try {
    const { userId } = await requireAuth();
    const drafts = await emailDraftRepository.list(userId);
    return Response.json(drafts);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = await requireAuth();
    const body = await request.json();

    const result = await draftEmailUseCase.createDraft(userId, body);

    if (result.ok) {
      return Response.json(result.data);
    }
    return errorResponse(result.error);
  } catch (error) {
    return errorResponse(error);
  }
}

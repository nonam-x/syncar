import { draftEmailUseCase } from "@/lib/container";
import { requireAuth } from "@/lib/clerk";
import { errorResponse } from "@/lib/errors";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const { userId } = await requireAuth();
    const resolvedParams = 'then' in params ? await params : params;
    const { id } = resolvedParams;
    const body = await request.json();

    const result = await draftEmailUseCase.updateDraft(userId, id, body);

    if (result.ok) {
      return Response.json(result.data);
    }
    return errorResponse(result.error);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const { userId } = await requireAuth();
    const resolvedParams = 'then' in params ? await params : params;
    const { id } = resolvedParams;

    const result = await draftEmailUseCase.deleteDraft(userId, id);

    if (result.ok) {
      return Response.json({ success: true });
    }
    return errorResponse(result.error);
  } catch (error) {
    return errorResponse(error);
  }
}

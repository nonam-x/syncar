import { getEmailUseCase, updateEmailUseCase, deleteEmailUseCase } from "@/lib/container";
import { requireAuth } from "@/lib/clerk";
import { errorResponse } from "@/lib/errors";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const { userId } = await requireAuth();
    
    // In Next.js 15+, params is a promise that needs to be awaited. 
    // We handle both Promise and resolved object configurations.
    const resolvedParams = 'then' in params ? await params : params;
    const { id } = resolvedParams;

    const result = await getEmailUseCase.execute(userId, id);

    if (result.ok) {
      return Response.json(result.data);
    }
    return errorResponse(result.error);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const { userId } = await requireAuth();
    const resolvedParams = 'then' in params ? await params : params;
    const { id } = resolvedParams;
    const body = await request.json();

    const result = await updateEmailUseCase.execute(userId, id, body);

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

    const result = await deleteEmailUseCase.execute(userId, id);

    if (result.ok) {
      return Response.json({ success: true });
    }
    return errorResponse(result.error);
  } catch (error) {
    return errorResponse(error);
  }
}

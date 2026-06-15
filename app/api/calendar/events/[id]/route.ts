import { calendarService, updateEventUseCase } from "@/lib/container";
import { requireAuth } from "@/lib/clerk";
import { errorResponse } from "@/lib/errors";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const { userId } = await requireAuth();
    const resolvedParams = 'then' in params ? await params : params;
    const { id } = resolvedParams;

    const event = await calendarService.getEvent(id, userId);
    return Response.json(event);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const { userId } = await requireAuth();
    const resolvedParams = 'then' in params ? await params : params;
    const { id } = resolvedParams;
    const body = await request.json();

    const result = await updateEventUseCase.execute(userId, id, body);

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

    const url = new URL(request.url);
    const calendarId = url.searchParams.get("calendarId") || "primary";

    await calendarService.deleteEvent(userId, id, calendarId);

    return Response.json({ success: true });
  } catch (error) {
    return errorResponse(error);
  }
}

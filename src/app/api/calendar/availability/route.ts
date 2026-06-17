import { getAvailabilityUseCase } from "@/lib/container";
import { requireAuth } from "@/lib/clerk";
import { errorResponse } from "@/lib/errors";

export async function GET(request: Request) {
  try {
    const { userId } = await requireAuth();
    const url = new URL(request.url);
    
    const timeMin = url.searchParams.get("timeMin") || "";
    const timeMax = url.searchParams.get("timeMax") || "";
    const calendarIds = url.searchParams.get("calendarIds")?.split(",").map(id => id.trim()).filter(Boolean) || undefined;

    const result = await getAvailabilityUseCase.execute(userId, {
      timeMin,
      timeMax,
      calendarIds,
    });

    if (result.ok) {
      return Response.json(result.data);
    }
    return errorResponse(result.error);
  } catch (error) {
    return errorResponse(error);
  }
}

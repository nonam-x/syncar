import { listEventsUseCase, createEventUseCase } from "@/lib/container";
import { requireAuth } from "@/lib/clerk";
import { errorResponse } from "@/lib/errors";

export async function GET(request: Request) {
  try {
    const { userId } = await requireAuth();
    const url = new URL(request.url);
    
    const calendarId = url.searchParams.get("calendarId") || undefined;
    const timeMin = url.searchParams.get("timeMin") || undefined;
    const timeMax = url.searchParams.get("timeMax") || undefined;
    const maxResults = url.searchParams.get("maxResults") 
      ? parseInt(url.searchParams.get("maxResults")!, 10) 
      : undefined;
    const query = url.searchParams.get("query") || undefined;
    const singleEvents = url.searchParams.get("singleEvents") !== "false";
    const orderBy = url.searchParams.get("orderBy") || undefined;

    const result = await listEventsUseCase.execute(userId, {
      calendarId,
      timeMin,
      timeMax,
      maxResults,
      query,
      singleEvents,
      orderBy: orderBy as any,
    });

    if (result.ok) {
      return Response.json(result.data);
    }
    return errorResponse(result.error);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = await requireAuth();
    const body = await request.json();

    const result = await createEventUseCase.execute(userId, body);

    if (result.ok) {
      return Response.json(result.data);
    }
    return errorResponse(result.error);
  } catch (error) {
    return errorResponse(error);
  }
}

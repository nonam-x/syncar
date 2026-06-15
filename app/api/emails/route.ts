import { listEmailsUseCase } from "@/lib/container";
import { requireAuth } from "@/lib/clerk";
import { errorResponse } from "@/lib/errors";

export async function GET(request: Request) {
  try {
    const { userId } = await requireAuth();
    const url = new URL(request.url);
    
    const labelIds = url.searchParams.get("labelIds")?.split(",").map(id => id.trim()).filter(Boolean) || undefined;
    const query = url.searchParams.get("query") || undefined;
    const maxResults = url.searchParams.get("maxResults") 
      ? parseInt(url.searchParams.get("maxResults")!, 10) 
      : undefined;
    const pageToken = url.searchParams.get("pageToken") || undefined;
    const priority = url.searchParams.get("priority") || undefined;

    const result = await listEmailsUseCase.execute(userId, {
      labelIds,
      query,
      maxResults,
      pageToken,
      priority,
    });

    if (result.ok) {
      return Response.json(result.data);
    }
    return errorResponse(result.error);
  } catch (error) {
    return errorResponse(error);
  }
}

import { requireAuth, ensureDbUserSync } from "@/lib/clerk";
import { errorResponse } from "@/lib/errors";
import { prisma } from "@/lib/prisma";
import { ensureCorsairInitialized } from "@/lib/corsair";

export async function GET(request: Request) {
  try {
    const { userId } = await requireAuth();

    // Self-healing database user sync
    await ensureDbUserSync(userId);

    // Self-healing Corsair initialization
    await ensureCorsairInitialized();

    // Query connected accounts for this user
    const accounts = await prisma.corsairAccount.findMany({
      where: {
        tenantId: userId,
      },
      include: {
        integration: true,
      },
    });

    const gmailConnected = accounts.some(acc => acc.integration.name === "gmail");
    const calendarConnected = accounts.some(acc => acc.integration.name === "googlecalendar");

    return Response.json({
      gmail: { connected: gmailConnected },
      googlecalendar: { connected: calendarConnected },
    });
  } catch (error) {
    return errorResponse(error);
  }
}

import { requireAuth } from "@/lib/clerk";
import { errorResponse, ValidationError } from "@/lib/errors";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { userId } = await requireAuth();
    const body = await request.json().catch(() => ({}));
    const plugin = body.plugin;

    if (!plugin || (plugin !== "gmail" && plugin !== "googlecalendar")) {
      throw new ValidationError("Invalid or missing plugin. Must be 'gmail' or 'googlecalendar'.");
    }

    // Run in transaction to clean up DB cache and connections for BOTH integrations
    await prisma.$transaction(async (tx) => {
      // Find both accounts to delete
      const accounts = await tx.corsairAccount.findMany({
        where: {
          tenantId: userId,
          integration: {
            name: { in: ["gmail", "googlecalendar"] },
          },
        },
      });

      for (const account of accounts) {
        // Delete Corsair entities and events associated with this account
        await tx.corsairEntity.deleteMany({
          where: { accountId: account.id },
        });
        await tx.corsairEvent.deleteMany({
          where: { accountId: account.id },
        });

        // Delete the main account
        await tx.corsairAccount.delete({
          where: { id: account.id },
        });
      }

      // Delete cached domain data for this user for both Gmail and Calendar
      await tx.email.deleteMany({
        where: { userId },
      });
      await tx.emailDraft.deleteMany({
        where: { userId },
      });
      await tx.calendarEvent.deleteMany({
        where: { userId },
      });
    });

    return Response.json({ success: true });
  } catch (error) {
    return errorResponse(error);
  }
}


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

    // Run in transaction to clean up DB cache and connections
    await prisma.$transaction(async (tx) => {
      // Find the account to delete
      const account = await tx.corsairAccount.findFirst({
        where: {
          tenantId: userId,
          integration: {
            name: plugin,
          },
        },
      });

      if (account) {
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

      // Delete cached domain data for this user
      if (plugin === "gmail") {
        await tx.email.deleteMany({
          where: { userId },
        });
        await tx.emailDraft.deleteMany({
          where: { userId },
        });
      } else if (plugin === "googlecalendar") {
        await tx.calendarEvent.deleteMany({
          where: { userId },
        });
      }
    });

    return Response.json({ success: true });
  } catch (error) {
    return errorResponse(error);
  }
}

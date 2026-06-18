import { requireAuth } from "@/lib/clerk";
import { prisma } from "@/lib/prisma";
import { corsair, ensureCorsairInitialized } from "@/lib/corsair";

export async function GET() {
  try {
    const { userId } = await requireAuth();

    // 1. Check Corsair integration credentials in DB
    await ensureCorsairInitialized();
    const gmailIntegration = await prisma.corsairIntegration.findFirst({
      where: { name: "gmail" },
    });

    // 2. Check user's Corsair account
    const corsairAccount = await prisma.corsairAccount.findFirst({
      where: { tenantId: userId, integration: { name: "gmail" } },
      include: { integration: true },
    });

    // 3. Check if tenantCorsair.gmail is defined
    const tenantCorsair = corsair.withTenant(userId) as any;
    const gmailDefined = typeof tenantCorsair.gmail !== "undefined";

    // 4. Count cached emails in DB
    const emailCount = await prisma.email.count({ where: { userId } });

    // 5. Try getProfile if gmail is defined
    let profileResult = null;
    let profileError = null;
    if (gmailDefined) {
      try {
        const profile = await tenantCorsair.gmail.api.users.getProfile({ userId: "me" });
        profileResult = profile;
      } catch (e: any) {
        profileError = e.message;
      }
    }

    return Response.json({
      userId,
      gmailIntegration: gmailIntegration ? { id: gmailIntegration.id, name: gmailIntegration.name } : null,
      corsairAccount: corsairAccount ? { id: corsairAccount.id, tenantId: corsairAccount.tenantId } : null,
      gmailPluginDefined: gmailDefined,
      cachedEmailCount: emailCount,
      profileResult,
      profileError,
    });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

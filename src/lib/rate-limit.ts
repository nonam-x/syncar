import { prisma } from "./prisma";

export interface PlanLimits {
  aiLimit: number;
  gmailLimit: number;
  calendarLimit: number;
}

// Daily limits by plan tier
export const PLAN_LIMITS: Record<string, PlanLimits> = {
  Starter: { aiLimit: 10, gmailLimit: 500, calendarLimit: 500 },
  Professional: { aiLimit: 30, gmailLimit: 500, calendarLimit: 500 },
  Business: { aiLimit: 100, gmailLimit: 500, calendarLimit: 500 },
};

/**
 * Checks and increments the daily rate limits for a user.
 * Employs row-level locking (FOR UPDATE) inside a transaction to prevent race conditions.
 */
export async function checkRateLimit(
  userId: string,
  action: "ai" | "gmail" | "calendar"
): Promise<{ allowed: boolean; current: number; limit: number; error?: string }> {
  try {
    return await prisma.$transaction(async (tx) => {
      // 1. Fetch user subscription details
      const sub = await tx.userSubscription.findUnique({
        where: { userId },
      });

      const planName = sub?.status === "active" ? (sub?.planName || "Starter") : "Starter";
      const limits = { ...(PLAN_LIMITS[planName] || PLAN_LIMITS.Starter) };

      // 2. Fetch usage statistics using FOR UPDATE locking to prevent concurrent increment races
      const todayStr = new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'

      const usages = await tx.$queryRawUnsafe<any[]>(
        `SELECT user_id, ai_calls_count, gmail_calls_count, calendar_calls_count, last_reset_date 
         FROM user_usage 
         WHERE user_id = $1 
         FOR UPDATE`,
        userId
      );

      const usage = usages[0] || null;

      let aiCount = usage ? usage.ai_calls_count : 0;
      let gmailCount = usage ? usage.gmail_calls_count : 0;
      let calendarCount = usage ? usage.calendar_calls_count : 0;
      let lastResetDate = usage ? usage.last_reset_date : "";

      // Reset daily counts if date changed or record doesn't exist
      if (!usage || lastResetDate !== todayStr) {
        aiCount = 0;
        gmailCount = 0;
        calendarCount = 0;

        if (!usage) {
          await tx.$executeRawUnsafe(
            `INSERT INTO user_usage (user_id, ai_calls_count, gmail_calls_count, calendar_calls_count, last_reset_date, created_at, updated_at)
             VALUES ($1, 0, 0, 0, $2, NOW(), NOW())`,
            userId,
            todayStr
          );
        } else {
          await tx.$executeRawUnsafe(
            `UPDATE user_usage 
             SET ai_calls_count = 0, gmail_calls_count = 0, calendar_calls_count = 0, last_reset_date = $1, updated_at = NOW() 
             WHERE user_id = $2`,
            todayStr,
            userId
          );
        }
      }

      // 3. Enforce limit and increment
      if (action === "ai") {
        if (aiCount >= limits.aiLimit) {
          return {
            allowed: false,
            current: aiCount,
            limit: limits.aiLimit,
            error: `Daily AI Operation limit reached (${limits.aiLimit}). Please upgrade your plan in settings.`
          };
        }
        await tx.$executeRawUnsafe(
          `UPDATE user_usage SET ai_calls_count = ai_calls_count + 1, updated_at = NOW() WHERE user_id = $1`,
          userId
        );
        return { allowed: true, current: aiCount + 1, limit: limits.aiLimit };
      } else if (action === "gmail") {
        if (gmailCount >= limits.gmailLimit) {
          return {
            allowed: false,
            current: gmailCount,
            limit: limits.gmailLimit,
            error: `Daily Gmail refresh/action limit reached (${limits.gmailLimit}) to prevent anti-spam.`
          };
        }
        await tx.$executeRawUnsafe(
          `UPDATE user_usage SET gmail_calls_count = gmail_calls_count + 1, updated_at = NOW() WHERE user_id = $1`,
          userId
        );
        return { allowed: true, current: gmailCount + 1, limit: limits.gmailLimit };
      } else {
        if (calendarCount >= limits.calendarLimit) {
          return {
            allowed: false,
            current: calendarCount,
            limit: limits.calendarLimit,
            error: `Daily Calendar refresh/action limit reached (${limits.calendarLimit}) to prevent anti-spam.`
          };
        }
        await tx.$executeRawUnsafe(
          `UPDATE user_usage SET calendar_calls_count = calendar_calls_count + 1, updated_at = NOW() WHERE user_id = $1`,
          userId
        );
        return { allowed: true, current: calendarCount + 1, limit: limits.calendarLimit };
      }
    });
  } catch (error) {
    // Fail open: if the rate limit check itself errors (e.g. DB connection issue),
    // allow the request through rather than blocking all users.
    console.error("Rate limit check failed, failing open:", error);
    return {
      allowed: true,
      current: 0,
      limit: 0,
    };
  }
}

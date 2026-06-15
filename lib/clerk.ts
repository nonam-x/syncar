/**
 * Clerk authentication helpers for Syncar.
 *
 * Provides typed wrappers around Clerk's auth() for use in:
 * - API Route Handlers
 * - Server Components
 * - Use Cases
 */

import { auth, currentUser } from "@clerk/nextjs/server";
import { UnauthorizedError } from "./errors";

/**
 * Extracts and validates the authenticated user's ID from Clerk.
 * Throws UnauthorizedError if no user is authenticated.
 *
 * @example
 * ```ts
 * export async function GET() {
 *   const userId = await requireAuth();
 *   // userId is guaranteed to be a string
 * }
 * ```
 */



export async function requireAuth(): Promise<{ userId: string }> {

  //yaha seuserId mil jata hai 
  const { userId } = await auth();

  if (!userId) {
    throw new UnauthorizedError("You must be signed in to access this resource");
  }

  return { userId };
}

/**
 * Returns the authenticated user's ID, or null if not authenticated.
 * Use this for optional authentication scenarios.
 */
export async function getOptionalAuth(): Promise<string | null> {
  const { userId } = await auth();
  return userId;
}

/**
 * Returns the full Clerk user object for the authenticated user.
 * Throws UnauthorizedError if not authenticated.
 */
export async function requireUser() {
  const user = await currentUser();

  if (!user) {
    throw new UnauthorizedError("You must be signed in to access this resource");
  }

  return user;
}

/**
 * Extracts common user metadata from Clerk for syncing to our database.
 */
export async function getAuthUserMetadata() {
  const user = await requireUser();

  return {
    clerkId: user.id,
    email: user.primaryEmailAddress?.emailAddress ?? null,
    firstName: user.firstName,
    lastName: user.lastName,
    imageUrl: user.imageUrl,
  };
}

import { prisma } from "./prisma";

/**
 * Ensures the Clerk user is synchronized to our local PostgreSQL database users table.
 */
export async function ensureDbUserSync(userId: string): Promise<void> {
  const existing = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (existing) {
    return;
  }

  // Fetch full profile from Clerk
  const user = await currentUser();
  if (!user || user.id !== userId) {
    return;
  }

  await prisma.user.create({
    data: {
      id: user.id,
      email: user.primaryEmailAddress?.emailAddress ?? "",
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
    },
  });
}

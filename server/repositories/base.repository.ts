import { prisma } from "@/lib/prisma";

/**
 * Base Repository providing common data access logic.
 * Wraps the Prisma client singleton.
 */
export abstract class BaseRepository {
  protected prisma = prisma;
}

/**
 * Corsair integration instance for Syncar.
 *
 * Configures Corsair with Gmail and Google Calendar plugins.
 * This is the single entry point for all Corsair operations.
 *
 * API usage pattern:
 *   corsair.gmail.api.messages.list({ ... })
 *   corsair.gmail.api.messages.send({ ... })
 *   corsair.gmail.api.drafts.create({ ... })
 *   corsair.googlecalendar.api.events.create({ ... })
 *   corsair.googlecalendar.api.events.getMany({ ... })
 *
 * DB usage pattern (local cached data):
 *   corsair.gmail.db.messages.search({ ... })
 *   corsair.googlecalendar.db.events.search({ ... })
 */

import "dotenv/config";
import { Pool } from "pg";
import { createCorsair } from "corsair";
import { gmail } from "@corsair-dev/gmail";
import { googlecalendar } from "@corsair-dev/googlecalendar";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export const corsair = createCorsair({
  plugins: [gmail(), googlecalendar()],
  database: pool,
  kek: process.env.CORSAIR_KEK!,
  multiTenancy: true,
});

import { setupCorsair } from "corsair/setup";

/**
 * Export the raw pg Pool for direct SQL queries (e.g., pgvector).
 * Prisma uses its own adapter-based connection, but raw SQL
 * for vector search needs the pool directly.
 */
export { pool };

let isInitialized = false;

/**
 * Initializes the Corsair client by provisioning integrations and
 * setting up the Google OAuth credentials globally.
 */
export async function ensureCorsairInitialized(): Promise<void> {
  if (isInitialized) return;

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET environment variables.");
  }

  await setupCorsair(corsair as any, {
    credentials: {
      gmail: {
        client_id: clientId,
        client_secret: clientSecret,
      },
      googlecalendar: {
        client_id: clientId,
        client_secret: clientSecret,
      },
    },
  });

  isInitialized = true;
}
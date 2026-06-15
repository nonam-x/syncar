/**
 * Barrel export for all Syncar types.
 */

export * from "./common.types";
export * from "./email.types";
export * from "./calendar.types";
export * from "./ai.types";

// API schemas are exported separately to avoid Zod dependency contamination
// Import them directly: import { SendEmailSchema } from "@/types/api.types";

import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest";
import { processAICall, trackFailedAICalls, syncGmailWebhook } from "@/inngest/functions";

// Allow execution up to 5 minutes for long-running agent tool calls
export const maxDuration = 300;

// Serve the registered Inngest background operations
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [processAICall, trackFailedAICalls, syncGmailWebhook],

});

/**
 * Utility to clean AI response content by:
 * 1. Stripping <thought>...</thought> tags and their contents.
 * 2. Stripping markdown formatting code fences (e.g. ```json ... ```).
 * 3. Normalizing whitespace and carriage returns.
 */
export function cleanAIResponse(text: string): string {
  if (!text) return "";

  let cleaned = text;

  // Remove <thought>...</thought> blocks and any trailing/leading whitespace around them
  cleaned = cleaned.replace(/<thought>[\s\S]*?<\/thought>/gi, "");

  // Remove markdown code blocks (e.g. ```json ... ```) while keeping the content inside
  cleaned = cleaned.replace(/^```[a-z]*\n([\s\S]*?)\n```$/gim, "$1");
  cleaned = cleaned.replace(/```[a-z]*/gi, "");
  cleaned = cleaned.replace(/```/g, "");

  // Normalize duplicate newlines (no more than 2 consecutive newlines)
  cleaned = cleaned.replace(/\n{3,}/g, "\n\n");

  return cleaned.trim();
}

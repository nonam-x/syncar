import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Missing GEMINI_API_KEY in environment variables");
}

export const genAI = new GoogleGenerativeAI(apiKey);

export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-lite",
});

export const geminiFastModel = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-lite",
});

// Embedding model (768 dimensions)
export const geminiEmbeddingModel = genAI.getGenerativeModel({
  model: "gemini-embedding-001",
});

// ---------------------------------------------------------------------------
// Mistral fallback (optional — only used if MISTRAL_API_KEY is set)
// ---------------------------------------------------------------------------

const mistralApiKey = process.env.MISTRAL_API_KEY;

export const hasMistral = Boolean(mistralApiKey);

/**
 * Call Mistral API directly via REST (no SDK needed).
 * Used as a fallback when Gemini hits quota/rate limits.
 */
export async function callMistral(
  prompt: string,
  model = "mistral-small-latest"
): Promise<string> {
  if (!mistralApiKey) {
    throw new Error("MISTRAL_API_KEY is not set — Mistral fallback unavailable");
  }

  const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${mistralApiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Mistral API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "";
}

// ---------------------------------------------------------------------------
// Retry wrapper — falls back to Mistral on Gemini 429/quota errors
// ---------------------------------------------------------------------------

/**
 * Executes a Gemini API operation with exponential backoff on 429 Rate Limit/Quota errors.
 * If Mistral is configured and Gemini keeps failing, falls back to Mistral.
 */
export async function executeGeminiWithRetry<T>(
  operation: () => Promise<T>,
  maxRetries = 2,
  initialDelay = 1000,
  mistralFallback?: () => Promise<T>
): Promise<T> {
  let delay = initialDelay;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error: any) {
      const errorMsg = String(error.message || error).toLowerCase();
      const is429 =
        error.status === 429 ||
        errorMsg.includes("429") ||
        errorMsg.includes("quota exceeded") ||
        errorMsg.includes("too many requests");

      if (is429 && attempt < maxRetries) {
        console.warn(
          `[Gemini API] Rate limit hit (429/quota). Retrying in ${delay}ms (attempt ${attempt}/${maxRetries})...`
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2;
      } else if (is429 && hasMistral && mistralFallback) {
        console.warn("[Gemini API] Quota exhausted — falling back to Mistral.");
        return await mistralFallback();
      } else {
        throw error;
      }
    }
  }
  throw new Error(`Gemini request failed after ${maxRetries} attempts`);
}
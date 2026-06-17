import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Missing GEMINI_API_KEY in environment variables");
}

export const genAI = new GoogleGenerativeAI(apiKey);

// Default conversational model
// export const geminiModel = genAI.getGenerativeModel({
//   model: "gemini-3.1-flash-lite", // We use 3.5-flash as default high quality model
// });
// export const geminiModel = genAI.getGenerativeModel({
//   model: "gemma-4-12b-it", // We use 3.5-flash as default high quality model
// });

// Fast model for classification
// export const geminiFastModel = genAI.getGenerativeModel({
//   model: "gemini-3.1-flash-lite",
// });

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

/**
 * Executes a Gemini API operation with exponential backoff on 429 Rate Limit/Quota errors.
 */
export async function executeGeminiWithRetry<T>(
  operation: () => Promise<T>,
  maxRetries = 2,
  initialDelay = 1000
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
        delay *= 2; // Exponential backoff
      } else {
        throw error;
      }
    }
  }
  throw new Error(`Gemini request failed after ${maxRetries} attempts`);
}
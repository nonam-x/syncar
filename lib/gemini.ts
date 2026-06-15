import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Missing GEMINI_API_KEY in environment variables");
}

export const genAI = new GoogleGenerativeAI(apiKey);

// Default conversational model
// export const geminiModel = genAI.getGenerativeModel({
//   model: "gemini-3.5-flash-lite", // We use 3.5-flash as default high quality model
// });
export const geminiModel = genAI.getGenerativeModel({
  model: "gemma-4-12b-it", // We use 3.5-flash as default high quality model
});

// Fast model for classification
export const geminiFastModel = genAI.getGenerativeModel({
  model: "gemini-3.1-flash-lite",
});

// Embedding model (768 dimensions)
export const geminiEmbeddingModel = genAI.getGenerativeModel({
  model: "gemini-embedding-001",
});
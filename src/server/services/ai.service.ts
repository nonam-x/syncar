import { geminiModel, geminiFastModel, geminiEmbeddingModel, executeGeminiWithRetry } from "@/lib/gemini";
import type { EmailPriority, ChatRole } from "@/types";
import { SchemaType } from "@google/generative-ai";

export class AIService {
  // Embedding cache to deduplicate duplicate vector generation requests
  private embeddingCache = new Map<string, number[]>();
  private readonly maxCacheSize = 200;

  // Background task rate limiter state
  private lastRequestTime = 0;
  private readonly minInterval = 1000; // Enforce minimum 1 second delay between background queries

  private async throttleRequest() {
    const now = Date.now();
    const elapsed = now - this.lastRequestTime;
    if (elapsed < this.minInterval) {
      const waitTime = this.minInterval - elapsed;
      this.lastRequestTime = now + waitTime;
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    } else {
      this.lastRequestTime = now;
    }
  }
  /**
   * Generate 768-dimensional text embedding using text-embedding-004.
   */
  async generateEmbedding(text: string): Promise<number[]> {
    try {
      const cleanedText = text.replace(/\n/g, " ").trim();
      if (!cleanedText) {
        return new Array(768).fill(0);
      }

      // Check cache first
      const cached = this.embeddingCache.get(cleanedText);
      if (cached) {
        return cached;
      }

      // Rate limit background requests to protect quota limits
      await this.throttleRequest();

      const result = await executeGeminiWithRetry(() =>
        geminiEmbeddingModel.embedContent({
          content: { parts: [{ text: cleanedText }] },
          outputDimensionality: 768,
        } as any)
      );

      if (!result.embedding || !result.embedding.values) {
        throw new Error("Failed to retrieve embedding values from Gemini API");
      }

      const values = result.embedding.values;
      let finalValues = values;
      if (values.length > 768) {
        finalValues = values.slice(0, 768);
      } else if (values.length < 768) {
        finalValues = [...values, ...new Array(768 - values.length).fill(0)];
      }

      // Store in LRU cache
      if (this.embeddingCache.size >= this.maxCacheSize) {
        const firstKey = this.embeddingCache.keys().next().value;
        if (firstKey !== undefined) this.embeddingCache.delete(firstKey);
      }
      this.embeddingCache.set(cleanedText, finalValues);

      return finalValues;
    } catch (error) {
      console.error("Error generating embedding:", error);
      // Return zero-vector fallback so database inserts don't fail
      return new Array(768).fill(0);
    }
  }

  /**
   * Classify email priority (HIGH, MEDIUM, LOW) based on content.
   */
  async classifyEmailPriority(email: {
    subject: string;
    from: string;
    snippet: string;
    body?: string;
  }): Promise<{
    priority: EmailPriority;
    confidence: number;
    reasoning: string;
  }> {
    const emailContent = `
Sender: ${email.from}
Subject: ${email.subject}
Snippet: ${email.snippet}
Body: ${email.body || ""}
    `.trim();

    const prompt = `
You are a priority classifier for a professional email manager application (similar to Superhuman).
Analyze the incoming email content and classify its priority for the recipient.

Priority Levels:
- HIGH: Time-sensitive requests, direct action items from key contacts, calendar scheduling conflicts, urgent alerts, or important business threads.
- MEDIUM: Standard work emails, updates, inquiries that require attention but not immediately, newsletters of high professional relevance.
- LOW: Automated marketing, social alerts, transactional receipts, promotional emails, or bulk newsletters.

Provide your output in strict JSON format matching the schema.
    `.trim();

    try {
      // Rate limit background requests to protect quota limits
      await this.throttleRequest();

      const response = await executeGeminiWithRetry(() =>
        geminiFastModel.generateContent({
          contents: [
            { role: "user", parts: [{ text: `${prompt}\n\nEmail Content:\n${emailContent}` }] },
          ],
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
              type: SchemaType.OBJECT,
              properties: {
                priority: {
                  type: SchemaType.STRING,
                  enum: ["HIGH", "MEDIUM", "LOW"],
                },
                confidence: {
                  type: SchemaType.NUMBER,
                  description: "Confidence score between 0.0 and 1.0",
                },
                reasoning: {
                  type: SchemaType.STRING,
                  description: "Brief reason why this priority was assigned",
                },
              },
              required: ["priority", "confidence", "reasoning"],
            },
          },
        } as any)
      );

      const text = response.response.text();
      const parsed = JSON.parse(text);

      return {
        priority: parsed.priority as EmailPriority,
        confidence: parsed.confidence,
        reasoning: parsed.reasoning,
      };
    } catch (error) {
      console.error("Error classifying email priority:", error);
      return {
        priority: "MEDIUM",
        confidence: 0.5,
        reasoning: "Fallback classification due to an API error.",
      };
    }
  }

  /**
   * Suggest reply options for an email.
   */
  async suggestReply(
    email: { subject: string; from: string; body: string },
    context?: string,
    tone: "professional" | "friendly" | "concise" = "professional"
  ): Promise<string[]> {
    const prompt = `
You are an AI email assistant. Suggest three brief, high-quality reply options for the following email.
Tone of suggestions should be: ${tone}.
Context provided by the user: ${context || "None"}.

Email Details:
From: ${email.from}
Subject: ${email.subject}
Content:
${email.body}

Format the output in JSON as an object containing an array of suggestions.
    `.trim();

    try {
      // User-initiated action, does not throttle but uses backoff retry for quota errors
      const response = await executeGeminiWithRetry(() =>
        geminiModel.generateContent({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
              type: SchemaType.OBJECT,
              properties: {
                suggestions: {
                  type: SchemaType.ARRAY,
                  items: {
                    type: SchemaType.STRING,
                  },
                  description: "Three alternative email drafts",
                },
              },
              required: ["suggestions"],
            },
          },
        })
      );

      const text = response.response.text();
      const parsed = JSON.parse(text);
      return parsed.suggestions;
    } catch (error) {
      console.error("Error generating reply suggestions:", error);
      return [
        "Thanks for the email. I'll get back to you shortly.",
        "Got it, thank you. Let me review and follow up.",
        "Received, thanks. I will check on this and let you know.",
      ];
    }
  }
}

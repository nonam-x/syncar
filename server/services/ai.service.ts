import { geminiModel, geminiFastModel, geminiEmbeddingModel } from "@/lib/gemini";
import type { EmailPriority, ChatRole } from "@/types";

export class AIService {
  /**
   * Generate 768-dimensional text embedding using text-embedding-004.
   */
  async generateEmbedding(text: string): Promise<number[]> {
    try {
      const cleanedText = text.replace(/\n/g, " ").trim();
      if (!cleanedText) {
        return new Array(768).fill(0);
      }

      const result = await geminiEmbeddingModel.embedContent({
        content: { parts: [{ text: cleanedText }] },
        outputDimensionality: 768,
      } as any);

      if (!result.embedding || !result.embedding.values) {
        throw new Error("Failed to retrieve embedding values from Gemini API");
      }

      const values = result.embedding.values;
      if (values.length > 768) {
        return values.slice(0, 768);
      } else if (values.length < 768) {
        return [...values, ...new Array(768 - values.length).fill(0)];
      }

      return values;
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
      const response = await geminiFastModel.generateContent({
        contents: [
          { role: "user", parts: [{ text: `${prompt}\n\nEmail Content:\n${emailContent}` }] },
        ],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              priority: {
                type: "STRING",
                enum: ["HIGH", "MEDIUM", "LOW"],
              },
              confidence: {
                type: "NUMBER",
                description: "Confidence score between 0.0 and 1.0",
              },
              reasoning: {
                type: "STRING",
                description: "Brief reason why this priority was assigned",
              },
            },
            required: ["priority", "confidence", "reasoning"],
          },
        },
      } as any);

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
      const response = await geminiModel.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              suggestions: {
                type: "ARRAY",
                items: {
                  type: "STRING",
                },
                description: "Three alternative email drafts",
              },
            },
            required: ["suggestions"],
          },
        },
      });

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

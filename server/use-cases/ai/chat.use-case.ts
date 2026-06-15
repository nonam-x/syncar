import { ChatSchema } from "@/types/api.types";
import { ValidationError, NotFoundError } from "@/lib/errors";
import { Result, ok, err } from "@/lib/result";
import { AIConversationRepository } from "@/server/repositories/ai-conversation.repository";
import { corsair } from "@/lib/corsair";
import { genAI } from "@/lib/gemini";
import { buildCorsairToolDefs } from "@corsair-dev/mcp";
import { z } from "zod";
import type { ChatOutput } from "@/types";

/**
 * Helper to determine if a Zod schema is optional.
 * Essential for generating precise tool parameter requirements.
 */
function isZodSchemaOptional(zodVal: z.ZodTypeAny): boolean {
  if (zodVal instanceof z.ZodOptional) {
    return true;
  }
  // Safe fallback for custom schema types or wrapper implementations
  if (typeof (zodVal as any).isOptional === "function") {
    return (zodVal as any).isOptional();
  }
  return false;
}

export class ChatUseCase {
  constructor(private aiConversationRepository: AIConversationRepository) {}

  async execute(
    userId: string,
    input: unknown
  ): Promise<Result<ChatOutput>> {
    // 1. Validate inputs with Zod
    const validation = ChatSchema.safeParse(input);
    if (!validation.success) {
      return err(
        new ValidationError("Invalid parameters for AI chat", {
          errors: validation.error.format(),
        })
      );
    }

    const { conversationId, message } = validation.data;

    try {
      let activeConversationId = conversationId;
      const historyParts: any[] = [];

      // 2. Resolve or create AIConversation
      if (activeConversationId) {
        const convo = await this.aiConversationRepository.findById(activeConversationId, userId);
        if (!convo) {
          return err(new NotFoundError("Conversation", activeConversationId));
        }
        
        // Build history in Gemini format
        for (const msg of convo.messages) {
          historyParts.push({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: msg.content }],
          });
        }
      } else {
        // Create new conversation
        const title = message.substring(0, 30) + (message.length > 30 ? "..." : "");
        const newConvo = await this.aiConversationRepository.create(userId, title);
        activeConversationId = newConvo.id;
      }

      // 3. Save User Message
      await this.aiConversationRepository.addMessage(activeConversationId, {
        role: "user",
        content: message,
      });

      // 4. Build Corsair Tools for LLM
      const toolDefs = buildCorsairToolDefs({ corsair, tenantId: userId });
      const functionDeclarations = toolDefs.map((def) => {
        const properties: Record<string, any> = {};
        const required: string[] = [];

        for (const [key, zodVal] of Object.entries(def.shape)) {
          const isOptional = isZodSchemaOptional(zodVal);
          if (!isOptional) {
            required.push(key);
          }

          let type = "STRING";
          let description = (zodVal as any).description || "";
          let enumVals: string[] | undefined = undefined;

          let currentVal: any = zodVal;
          while (currentVal._def && (currentVal._def.innerType || currentVal._def.schema)) {
            currentVal = currentVal._def.innerType || currentVal._def.schema;
          }

          if (currentVal instanceof z.ZodEnum) {
            type = "STRING";
            enumVals = currentVal._def.values;
          } else if (currentVal instanceof z.ZodNumber) {
            type = "NUMBER";
          } else if (currentVal instanceof z.ZodBoolean) {
            type = "BOOLEAN";
          } else if (currentVal instanceof z.ZodArray) {
            type = "ARRAY";
          } else if (currentVal instanceof z.ZodObject || currentVal instanceof z.ZodRecord) {
            type = "OBJECT";
          }

          properties[key] = {
            type,
            description,
            ...(enumVals ? { enum: enumVals } : {}),
          };
        }

        return {
          name: def.name,
          description: def.description,
          parameters: {
            type: "OBJECT",
            properties,
            required: required.length > 0 ? required : undefined,
          },
        };
      });

      // 5. Initialize Gemini Agent with Tools
      const model = genAI.getGenerativeModel({
        model: "gemini-3.5-flash",
        tools: [{ functionDeclarations }],
        systemInstruction: `
You are Syncar's intelligent AI email and calendar companion.
You help users read/search/send emails, check schedules, and manage events.

To access the user's account details, query databases, or execute integrations, use the tools provided.
The primary tool is 'run_script', which lets you execute JavaScript queries directly using Corsair paths:
- Gmail message search: const list = await corsair.gmail.db.messages.search({ query: "..." }); return list;
- Send email: await corsair.gmail.api.messages.send({ raw: "base64url_mime_string" });
- List events: await corsair.googlecalendar.api.events.getMany({ calendarId: "primary", timeMin: "..." });
- Free/Busy: await corsair.googlecalendar.api.calendar.getAvailability({ timeMin: "...", timeMax: "...", calendarIds: ["primary"] });

Always return friendly, markdown-formatted professional answers summarizing your findings or actions.
        `.trim(),
      });

      // 6. Execute Conversation with Tool Loop
      const chat = model.startChat({
        history: historyParts,
      });

      let response = await chat.sendMessage(message);
      let functionCalls = response.response.functionCalls();
      const toolsUsed: string[] = [];

      while (functionCalls && functionCalls.length > 0) {
        const functionResponses = [];

        for (const call of functionCalls) {
          toolsUsed.push(call.name);
          const tool = toolDefs.find((t) => t.name === call.name);

          if (tool) {
            try {
              const rawResult = await tool.handler(call.args as any);
              const textResult = rawResult.content
                .filter((c) => c.type === "text")
                .map((c) => ("text" in c ? c.text : ""))
                .join("\n");

              functionResponses.push({
                functionResponse: { name: call.name, response: { result: textResult } },
              });
            } catch (err: any) {
              functionResponses.push({
                functionResponse: {
                  name: call.name,
                  response: { error: err.message || String(err) },
                },
              });
            }
          } else {
            functionResponses.push({
              functionResponse: {
                name: call.name,
                response: { error: `Tool ${call.name} not found.` },
              },
            });
          }
        }

        response = await chat.sendMessage(functionResponses);
        functionCalls = response.response.functionCalls();
      }

      const finalResponseText = response.response.text().trim();

      // 7. Save Assistant Message
      await this.aiConversationRepository.addMessage(activeConversationId, {
        role: "assistant",
        content: finalResponseText,
      });

      return ok({
        conversationId: activeConversationId,
        response: finalResponseText,
        toolsUsed,
      });
    } catch (error: any) {
      console.error("ChatUseCase tool loop failure:", error);
      return err(error as any);
    }
  }
}

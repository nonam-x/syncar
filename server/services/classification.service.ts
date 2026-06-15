import { EmailRepository } from "../repositories/email.repository";
import { AIService } from "./ai.service";
import type { Email } from "@/types";

export class ClassificationService {
  constructor(
    private emailRepository: EmailRepository,
    private aiService: AIService
  ) {}

  /**
   * Run the AI classification and embedding generation pipeline for an email,
   * then store the metadata in the local database.
   */
  async classifyAndStore(emailId: string, userId: string): Promise<Email | null> {
    const email = await this.emailRepository.findById(emailId, userId);
    if (!email) {
      console.warn(`Email ${emailId} not found in database for user ${userId}, skipping classification.`);
      return null;
    }

    try {
      // 1. Run AI Priority Classification in background
      const classification = await this.aiService.classifyEmailPriority({
        subject: email.subject,
        from: email.from.name ? `"${email.from.name}" <${email.from.email}>` : email.from.email,
        snippet: email.snippet,
        body: email.body,
      });

      // 2. Generate Search Embeddings (Subject + body snippet)
      const embeddingText = `Subject: ${email.subject}\nSnippet: ${email.snippet}\nContent: ${email.body.substring(0, 1000)}`;
      const embedding = await this.aiService.generateEmbedding(embeddingText);

      // 3. Save Priority metadata
      const updatedEmail = await this.emailRepository.upsert({
        ...email,
        priority: classification.priority,
        confidence: classification.confidence,
        reasoning: classification.reasoning,
      });

      // 4. Save Vector embedding
      await this.emailRepository.updateEmbedding(emailId, embedding);

      return updatedEmail;
    } catch (error) {
      console.error(`Pipeline failure for email ${emailId}:`, error);
      return email;
    }
  }

  /**
   * Batch classify emails (e.g. on initial account connect or sync).
   */
  async batchClassify(userId: string, emailIds: string[]): Promise<void> {
    // Run sequentially or in parallel chunks to respect rate limits
    for (const emailId of emailIds) {
      await this.classifyAndStore(emailId, userId);
    }
  }
}

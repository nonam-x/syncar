import { corsair } from "@/lib/corsair";
import { prisma } from "@/lib/prisma";
import { EmailRepository } from "../repositories/email.repository";
import { EmailDraftRepository } from "../repositories/email-draft.repository";
import { ClassificationService } from "./classification.service";
import type { Email, EmailDraft, EmailParticipant, SendEmailInput, EmailPriority } from "@/types";
import { ExternalServiceError } from "@/lib/errors";

export class EmailService {
  constructor(
    private emailRepository: EmailRepository,
    private emailDraftRepository: EmailDraftRepository,
    private classificationService: ClassificationService
  ) {}

  /**
   * Helper to get the Corsair Account ID for a user.
   */
  private async getCorsairAccountId(userId: string): Promise<string> {
    const account = await prisma.corsairAccount.findFirst({
      where: {
        tenantId: userId,
        integration: {
          name: "gmail",
        },
      },
    });

    if (!account) {
      throw new Error("No Gmail account connected. Please connect your account first.");
    }

    return account.id;
  }

  /**
   * List emails for a user from the local cache.
   */
  async listEmails(params: {
    userId: string;
    labelIds?: string[];
    priority?: EmailPriority;
    isRead?: boolean;
    isStarred?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<Email[]> {
    return this.emailRepository.list(params);
  }

  /**
   * Get a single email by ID.
   */
  async getEmail(id: string, userId: string): Promise<Email> {
    const email = await this.emailRepository.findById(id, userId);
    if (!email) {
      throw new Error(`Email with ID ${id} not found.`);
    }
    return email;
  }

  /**
   * Update email states (read/unread, star/unstar, archive).
   */
  async updateEmail(
    userId: string,
    emailId: string,
    updates: { isRead?: boolean; isStarred?: boolean; archived?: boolean }
  ): Promise<Email> {
    const accountId = await this.getCorsairAccountId(userId);
    // Cast is required because withTenant() returns a generic CorsairInstance, 
    // but we need the specific plugin typings (gmail, googlecalendar) configured on the main corsair instance.
    const tenantCorsair = corsair.withTenant(userId) as typeof corsair;

    // Get existing cached email to know current label status
    const existing = await this.getEmail(emailId, userId);

    const addLabelIds: string[] = [];
    const removeLabelIds: string[] = [];

    if (updates.isRead !== undefined) {
      if (updates.isRead) {
        removeLabelIds.push("UNREAD");
      } else {
        addLabelIds.push("UNREAD");
      }
    }

    if (updates.isStarred !== undefined) {
      if (updates.isStarred) {
        addLabelIds.push("STARRED");
      } else {
        removeLabelIds.push("STARRED");
      }
    }

    if (updates.archived !== undefined && updates.archived) {
      removeLabelIds.push("INBOX");
    }

    try {
      if (addLabelIds.length > 0 || removeLabelIds.length > 0) {
        await tenantCorsair.gmail.api.messages.modify({
          accountId,
          id: emailId,
          ...(addLabelIds.length > 0 ? { addLabelIds } : {}),
          ...(removeLabelIds.length > 0 ? { removeLabelIds } : {}),
        });
      }
    } catch (error) {
      console.error(`Gmail modify failed for user ${userId}, email ${emailId}:`, error);
      throw new ExternalServiceError("gmail", error);
    }

    // Compute updated values locally to update the cache
    let updatedLabelIds = [...existing.labelIds];
    
    for (const label of addLabelIds) {
      if (!updatedLabelIds.includes(label)) {
        updatedLabelIds.push(label);
      }
    }

    for (const label of removeLabelIds) {
      updatedLabelIds = updatedLabelIds.filter((l) => l !== label);
    }

    const isRead = updates.isRead !== undefined ? updates.isRead : existing.isRead;
    const isStarred = updates.isStarred !== undefined ? updates.isStarred : existing.isStarred;

    // Save updated state to local cache
    return this.emailRepository.upsert({
      ...existing,
      labelIds: updatedLabelIds,
      isRead,
      isStarred,
    });
  }

  /**
   * Delete an email (trash it on Gmail and remove from cache).
   */
  async deleteEmail(userId: string, emailId: string): Promise<void> {
    const accountId = await this.getCorsairAccountId(userId);
    const tenantCorsair = corsair.withTenant(userId) as typeof corsair;

    try {
      await tenantCorsair.gmail.api.messages.trash({
        accountId,
        id: emailId,
      });
    } catch (error) {
      console.error(`Gmail trash failed for user ${userId}, email ${emailId}:`, error);
      throw new ExternalServiceError("gmail", error);
    }

    // Remove from local cache
    await this.emailRepository.delete(emailId, userId);
  }

  /**
   * Send a new email or reply.
   */
  async sendEmail(input: SendEmailInput): Promise<Email> {
    const accountId = await this.getCorsairAccountId(input.userId);

    // 1. Build RFC 2822 MIME message
    const mimeMessage = this.buildMimeMessage({
      from: { email: "me" }, // Gmail handles the from address automatically for 'me'
      to: input.to,
      cc: input.cc,
      bcc: input.bcc,
      subject: input.subject,
      body: input.body,
      bodyHtml: input.bodyHtml,
      threadId: input.threadId,
    });

    // 2. Encode to base64url
    const base64Raw = Buffer.from(mimeMessage)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const tenantCorsair = corsair.withTenant(input.userId) as typeof corsair;

    let response;
    try {
      // 3. Send using Corsair Gmail plugin API
      response = await tenantCorsair.gmail.api.messages.send({
        accountId,
        raw: base64Raw,
        ...(input.threadId ? { threadId: input.threadId } : {}),
      });
    } catch (error) {
      console.error(`Gmail send message failed for user ${input.userId}:`, error);
      throw new ExternalServiceError("gmail", error);
    }

    let sentMessage;
    try {
      // 4. Retrieve full details of sent message from Corsair API
      sentMessage = await tenantCorsair.gmail.api.messages.get({
        accountId,
        id: response.id,
      });
    } catch (error) {
      console.error(`Gmail get message failed for user ${input.userId}, id ${response.id}:`, error);
      throw new ExternalServiceError("gmail", error);
    }

    // 5. Cache and classify sent email in our local database
    const mappedEmail = this.mapCorsairMessageToEmail(sentMessage, input.userId);
    const cachedEmail = await this.emailRepository.upsert(mappedEmail);

    // Asynchronously classify and run embedding generation for the sent email
    this.classificationService.classifyAndStore(cachedEmail.id, input.userId).catch((err) => {
      console.error("Failed to classify sent email:", err);
    });

    return cachedEmail;
  }

  /**
   * Sync emails from Gmail via Corsair APIs (e.g. for initial load or manual refresh).
   */
  async syncFromCorsair(userId: string, maxResults = 50): Promise<Email[]> {
    const accountId = await this.getCorsairAccountId(userId);

    const tenantCorsair = corsair.withTenant(userId) as typeof corsair;

    // List recent messages from Corsair Gmail API
    let listResponse;
    try {
      listResponse = await tenantCorsair.gmail.api.messages.list({
        accountId,
        maxResults,
      });
    } catch (error) {
      console.error(`Gmail list messages failed for user ${userId}:`, error);
      throw new ExternalServiceError("gmail", error);
    }

    const syncedEmails: Email[] = [];

    for (const msgSummary of listResponse.messages || []) {
      try {
        const fullMsg = await tenantCorsair.gmail.api.messages.get({
          accountId,
          id: msgSummary.id,
        });

        const mapped = this.mapCorsairMessageToEmail(fullMsg, userId);
        const cached = await this.emailRepository.upsert(mapped);

        // Run classification
        await this.classificationService.classifyAndStore(cached.id, userId);
        syncedEmails.push(cached);
      } catch (error) {
        console.error(`Failed to sync email ${msgSummary.id}:`, error);
      }
    }

    return syncedEmails;
  }

  /**
   * Create a new draft.
   */
  async createDraft(userId: string, input: Omit<EmailDraft, "id" | "userId" | "createdAt" | "updatedAt" | "corsairDraftId">): Promise<EmailDraft> {
    const accountId = await this.getCorsairAccountId(userId);

    const tenantCorsair = corsair.withTenant(userId) as typeof corsair;

    let corsairDraft;
    try {
      corsairDraft = await tenantCorsair.gmail.api.drafts.create({
        accountId,
        draft: {
          message: {
            raw: Buffer.from(
              this.buildMimeMessage({
                from: { email: "me" },
                to: input.to || [],
                cc: input.cc,
                bcc: input.bcc,
                subject: input.subject || "",
                body: input.body || "",
                bodyHtml: input.bodyHtml,
              })
            )
              .toString("base64")
              .replace(/\+/g, "-")
              .replace(/\//g, "_")
              .replace(/=+$/, ""),
          },
        },
      });
    } catch (error) {
      console.error(`Gmail drafts.create failed for user ${userId}:`, error);
      throw new ExternalServiceError("gmail", error);
    }

    return this.emailDraftRepository.create({
      userId,
      to: input.to || [],
      cc: input.cc,
      bcc: input.bcc,
      subject: input.subject || "",
      body: input.body || "",
      bodyHtml: input.bodyHtml,
      replyToEmailId: input.replyToEmailId,
      corsairDraftId: corsairDraft.id,
    });
  }

  /**
   * Helper to build a simple MIME (RFC 2822) formatted email message string.
   */
  private buildMimeMessage(email: {
    from: EmailParticipant;
    to: EmailParticipant[];
    cc?: EmailParticipant[];
    bcc?: EmailParticipant[];
    subject: string;
    body: string;
    bodyHtml?: string;
    threadId?: string;
  }): string {
    const headers: string[] = [];

    // Format email addresses
    const formatAddresses = (list: EmailParticipant[]) =>
      list.map((p) => (p.name ? `"${p.name}" <${p.email}>` : p.email)).join(", ");

    headers.push(`To: ${formatAddresses(email.to)}`);
    if (email.cc && email.cc.length > 0) {
      headers.push(`Cc: ${formatAddresses(email.cc)}`);
    }
    if (email.bcc && email.bcc.length > 0) {
      headers.push(`Bcc: ${formatAddresses(email.bcc)}`);
    }

    // Subject mapping (with UTF-8 base64 encoding if it contains non-ASCII, keeping it simple here)
    headers.push(`Subject: ${email.subject}`);

    // Thread binding
    if (email.threadId) {
      headers.push(`In-Reply-To: <${email.threadId}@mail.gmail.com>`);
      headers.push(`References: <${email.threadId}@mail.gmail.com>`);
    }

    headers.push("MIME-Version: 1.0");

    if (email.bodyHtml) {
      // Multipart boundary
      const boundary = `----=_Part_${Math.random().toString(36).substring(2)}`;
      headers.push(`Content-Type: multipart/alternative; boundary="${boundary}"`);
      headers.push("");

      headers.push(`--${boundary}`);
      headers.push("Content-Type: text/plain; charset=UTF-8");
      headers.push("Content-Transfer-Encoding: 7bit");
      headers.push("");
      headers.push(email.body);
      headers.push("");

      headers.push(`--${boundary}`);
      headers.push("Content-Type: text/html; charset=UTF-8");
      headers.push("Content-Transfer-Encoding: 7bit");
      headers.push("");
      headers.push(email.bodyHtml);
      headers.push("");
      headers.push(`--${boundary}--`);
    } else {
      headers.push("Content-Type: text/plain; charset=UTF-8");
      headers.push("Content-Transfer-Encoding: 7bit");
      headers.push("");
      headers.push(email.body);
    }

    return headers.join("\r\n");
  }

  /**
   * Helper to map raw Corsair Gmail message structure to our clean domain Email.
   */
  private mapCorsairMessageToEmail(msg: any, userId: string): Omit<Email, "priority"> & { priority?: EmailPriority } {
    // Corsair returns email structures with headers, body content, snippet, dates
    const headers = msg.payload?.headers || [];
    const getHeader = (name: string) => headers.find((h: any) => h.name.toLowerCase() === name.toLowerCase())?.value || "";

    const parseParticipant = (str: string): EmailParticipant => {
      if (!str) return { email: "" };
      const match = str.match(/(?:"?([^"]*)"?\s)?(?:<([^>]+)>|([^\s<>]+))/);
      if (match) {
        return {
          name: match[1]?.trim() || undefined,
          email: (match[2] || match[3] || "").trim(),
        };
      }
      return { email: str.trim() };
    };

    const parseParticipantsList = (str: string): EmailParticipant[] => {
      if (!str) return [];
      return str.split(",").map((s) => parseParticipant(s));
    };

    const fromVal = getHeader("from");
    const toVal = getHeader("to");
    const ccVal = getHeader("cc");
    const bccVal = getHeader("bcc");
    const dateVal = getHeader("date");

    // Extract body plain text and HTML
    let body = msg.body?.text || msg.snippet || "";
    let bodyHtml = msg.body?.html || undefined;

    // Corsair payload structures sometimes place body parts nested in parts
    if (!msg.body?.text && msg.payload?.parts) {
      const plainPart = msg.payload.parts.find((p: any) => p.mimeType === "text/plain");
      const htmlPart = msg.payload.parts.find((p: any) => p.mimeType === "text/html");
      if (plainPart?.body?.data) {
        body = Buffer.from(plainPart.body.data, "base64").toString("utf-8");
      }
      if (htmlPart?.body?.data) {
        bodyHtml = Buffer.from(htmlPart.body.data, "base64").toString("utf-8");
      }
    }

    return {
      id: msg.id,
      threadId: msg.threadId || msg.id,
      userId,
      from: parseParticipant(fromVal),
      to: parseParticipantsList(toVal),
      cc: ccVal ? parseParticipantsList(ccVal) : undefined,
      bcc: bccVal ? parseParticipantsList(bccVal) : undefined,
      subject: getHeader("subject") || "(No Subject)",
      snippet: msg.snippet || "",
      body,
      bodyHtml,
      labelIds: msg.labelIds || [],
      isRead: !(msg.labelIds || []).includes("UNREAD"),
      isStarred: (msg.labelIds || []).includes("STARRED"),
      receivedAt: dateVal ? new Date(dateVal) : new Date(),
      attachments: [],
    };
  }
}

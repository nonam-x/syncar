import { corsair } from "@/lib/corsair";
import { prisma } from "@/lib/prisma";
import { EmailRepository } from "../repositories/email.repository";
import { EmailDraftRepository } from "../repositories/email-draft.repository";
import { ClassificationService } from "./classification.service";
import type { Email, EmailDraft, SendEmailInput, CreateDraftInput, EmailPriority } from "@/types";
import { ExternalServiceError } from "@/lib/errors";

export class EmailService {
  constructor(
    private emailRepository: EmailRepository,
    public emailDraftRepository: EmailDraftRepository,
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
      throw new Error("No Gmail account connected. Please connect your Gmail account first.");
    }

    return account.id;
  }

  async listEmails(params: {
    userId: string;
    labelIds?: string[];
    priority?: EmailPriority;
    limit?: number;
    forceRefresh?: boolean;
  }): Promise<Email[]> {
    // 1. Check if we have active cache
    let cached = await this.emailRepository.list({
      userId: params.userId,
      labelIds: params.labelIds,
      priority: params.priority,
      limit: params.limit,
    });

    // 2. Fallback to Gmail sync if cache is empty or if forceRefresh is true
    if (cached.length === 0 || params.forceRefresh) {
      try {
        await this.syncFromCorsair(params.userId, params.limit || 30);
        
        // Re-query local DB cache
        cached = await this.emailRepository.list({
          userId: params.userId,
          labelIds: params.labelIds,
          priority: params.priority,
          limit: params.limit,
        });
      } catch (err) {
        console.error("Failed to sync emails from Corsair on-the-fly, returning cached values if any:", err);
      }
    }

    return cached;
  }

  async getEmail(emailId: string, userId: string): Promise<Email> {
    let email = await this.emailRepository.findById(emailId, userId);
    if (!email) {
      // Try to fetch it from Gmail API and cache it on-the-fly
      try {
        const tenantCorsair = corsair.withTenant(userId) as any;
        const fullMsg = await tenantCorsair.gmail.api.messages.get({ id: emailId });
        const mapped = this.mapCorsairMessageToEmail(fullMsg, userId);
        email = await this.emailRepository.upsert(mapped);
      } catch (err) {
        throw new Error(`Email ${emailId} not found.`);
      }
    }

    // Automatically mark as read if currently unread
    if (email && !email.isRead) {
      try {
        email = await this.updateEmail(userId, emailId, { isRead: true });
      } catch (err) {
        console.error(`Failed to automatically mark email ${emailId} as read:`, err);
      }
    }

    return email;
  }

  /**
   * Delete an email.
   */
  async deleteEmail(userId: string, emailId: string): Promise<void> {
    const tenantCorsair = corsair.withTenant(userId) as any;
    try {
      await tenantCorsair.gmail.api.messages.delete({ id: emailId });
    } catch (error) {
      console.error(`Gmail api messages.delete failed for email ${emailId}:`, error);
      throw new ExternalServiceError("gmail", error);
    }
    await this.emailRepository.delete(emailId, userId);
  }

  /**
   * Update email read/star/archive state.
   */
  async updateEmail(
    userId: string,
    emailId: string,
    updates: { isRead?: boolean; isStarred?: boolean; archived?: boolean }
  ): Promise<Email> {
    const tenantCorsair = corsair.withTenant(userId) as any;
    
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
    
    if (updates.archived !== undefined) {
      if (updates.archived) {
        removeLabelIds.push("INBOX");
      } else {
        addLabelIds.push("INBOX");
      }
    }
    
    let updatedMsg;
    try {
      updatedMsg = await tenantCorsair.gmail.api.messages.modify({
        id: emailId,
        addLabelIds,
        removeLabelIds,
      });
    } catch (error) {
      console.error(`Gmail api messages.modify failed for email ${emailId}:`, error);
      throw new ExternalServiceError("gmail", error);
    }
    
    const mapped = this.mapCorsairMessageToEmail(updatedMsg, userId);
    return this.emailRepository.upsert(mapped);
  }

  /**
   * Build MIME structure and send a new email.
   */
  async sendEmail(params: SendEmailInput): Promise<Email> {
    const tenantCorsair = corsair.withTenant(params.userId) as any;
    
    // Refresh tokens and fetch connected profile email
    const profile = await tenantCorsair.gmail.api.users.getProfile({ userId: "me" });
    const fromEmail = profile.emailAddress;
    if (!fromEmail) {
      throw new Error("Failed to resolve connected Gmail address profile");
    }

    const mime = this.buildMimeMessage({
      from: fromEmail,
      to: params.to,
      cc: params.cc,
      bcc: params.bcc,
      subject: params.subject,
      body: params.body,
      bodyHtml: params.bodyHtml,
    });

    const raw = this.base64urlEncode(mime);

    let sendResult;
    try {
      sendResult = await tenantCorsair.gmail.api.messages.send({
        raw,
        threadId: params.threadId,
      });
    } catch (error) {
      console.error(`Gmail api messages.send failed for user ${params.userId}:`, error);
      throw new ExternalServiceError("gmail", error);
    }

    const mapped = this.mapCorsairMessageToEmail(sendResult, params.userId);
    const cached = await this.emailRepository.upsert(mapped);

    // Run priority classification pipeline in background
    this.classificationService.classifyAndStore(cached.id, params.userId).catch((err) => {
      console.error("AI priority classification pipeline failed:", err);
    });

    return cached;
  }

  /**
   * Build MIME structure and create a new email draft.
   */
  async createDraft(userId: string, params: CreateDraftInput): Promise<EmailDraft> {
    const tenantCorsair = corsair.withTenant(userId) as any;

    // Refresh tokens and fetch connected profile email
    const profile = await tenantCorsair.gmail.api.users.getProfile({ userId: "me" });
    const fromEmail = profile.emailAddress;
    if (!fromEmail) {
      throw new Error("Failed to resolve connected Gmail address profile");
    }

    const mime = this.buildMimeMessage({
      from: fromEmail,
      to: params.to || [],
      cc: params.cc,
      bcc: params.bcc,
      subject: params.subject || "",
      body: params.body || "",
      bodyHtml: params.bodyHtml,
    });

    const raw = this.base64urlEncode(mime);

    let draftResult;
    try {
      draftResult = await tenantCorsair.gmail.api.drafts.create({
        draft: {
          message: {
            raw,
            threadId: params.replyToEmailId ? undefined : undefined, // can be extended
          },
        },
      });
    } catch (error) {
      console.error(`Gmail api drafts.create failed for user ${userId}:`, error);
      throw new ExternalServiceError("gmail", error);
    }

    return this.emailDraftRepository.create({
      userId,
      to: params.to || [],
      cc: params.cc,
      bcc: params.bcc,
      subject: params.subject || "",
      body: params.body || "",
      bodyHtml: params.bodyHtml,
      replyToEmailId: params.replyToEmailId,
      corsairDraftId: draftResult.id,
    });
  }

  /**
   * Sync the most recent messages from Gmail to the local cache and register a watch.
   */
  async syncFromCorsair(userId: string, maxResults: number = 30): Promise<void> {
    const tenantCorsair = corsair.withTenant(userId) as any;
    const accountId = await this.getCorsairAccountId(userId);

    // 1. Get profile and save connected email address in CorsairAccount config for mapping lookup
    const profile = await tenantCorsair.gmail.api.users.getProfile({ userId: "me" });
    const emailAddress = profile.emailAddress;
    
    if (emailAddress) {
      const account = await prisma.corsairAccount.findUnique({
        where: { id: accountId },
      });
      if (account) {
        const currentConfig = typeof account.config === "object" && account.config !== null ? account.config : {};
        await prisma.corsairAccount.update({
          where: { id: accountId },
          data: {
            config: {
              ...(currentConfig as Record<string, any>),
              email: emailAddress,
            },
          },
        });
      }
    }

    // 2. Fetch list of messages
    const listResult = await tenantCorsair.gmail.api.messages.list({
      maxResults,
    });

    const messages = listResult.messages || [];
    const syncedIds: string[] = [];

    for (const msg of messages) {
      if (!msg.id) continue;

      try {
        const fullMsg = await tenantCorsair.gmail.api.messages.get({
          id: msg.id,
        });

        const mapped = this.mapCorsairMessageToEmail(fullMsg, userId);
        const cached = await this.emailRepository.upsert(mapped);
        syncedIds.push(cached.id);
      } catch (err) {
        console.error(`Failed to sync message ${msg.id} for user ${userId}:`, err);
      }
    }

    // 3. Register real-time push watch channel
    try {
      await this.watchGmail(userId);
    } catch (err) {
      console.error(`Failed to register Gmail watch for user ${userId}:`, err);
    }

    // 4. Run priority classification pipeline in background
    if (syncedIds.length > 0) {
      this.classificationService.batchClassify(userId, syncedIds).catch((err) => {
        console.error(`Batch classification failed for user ${userId}:`, err);
      });
    }
  }

  /**
   * Registers a real-time watch subscription for the user's Gmail mailbox.
   */
  async watchGmail(userId: string): Promise<{ expiration: string; historyId: string }> {
    const tenantCorsair = corsair.withTenant(userId) as any;
    const accountId = await this.getCorsairAccountId(userId);

    // Get fresh token
    const token = await tenantCorsair.gmail.keys.get_access_token();
    if (!token) {
      throw new Error("Failed to retrieve oauth access token for Gmail watch");
    }

    const res = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/watch", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topicName: "projects/syncar-499101/topics/Syncar",
        labelIds: ["INBOX"],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Gmail watch subscription failed: ${errText}`);
    }

    const data = (await res.json()) as { expiration: string; historyId: string };

    const account = await prisma.corsairAccount.findUnique({
      where: { id: accountId },
    });

    if (account) {
      const currentConfig = typeof account.config === "object" && account.config !== null ? account.config : {};
      await prisma.corsairAccount.update({
        where: { id: accountId },
        data: {
          config: {
            ...(currentConfig as Record<string, any>),
            watchExpiration: data.expiration,
            watchHistoryId: data.historyId,
            watchActive: true,
            watchedAt: new Date().toISOString(),
          },
        },
      });
    }

    return {
      expiration: data.expiration,
      historyId: data.historyId,
    };
  }

  /**
   * Maps a raw Corsair Gmail message resource to the internal Email domain object.
   */
  mapCorsairMessageToEmail(msg: any, userId: string): Email {
    const payload = msg.payload || {};
    const headers = payload.headers || [];

    const getHeader = (name: string) => {
      return headers.find((h: any) => h.name?.toLowerCase() === name.toLowerCase())?.value;
    };

    const subject = getHeader("Subject") || "(No Subject)";
    const fromRaw = getHeader("From");
    const toRaw = getHeader("To");
    const ccRaw = getHeader("Cc");
    const bccRaw = getHeader("Bcc");

    const parseParticipant = (raw: string | undefined) => {
      if (!raw) return { email: "" };
      const match = raw.match(/^(?:"?([^"]*)"?\s+)?<([^>]+)>$/);
      if (match) {
        return { name: match[1]?.trim() || undefined, email: match[2].trim() };
      }
      return { email: raw.trim() };
    };

    const parseParticipantList = (raw: string | undefined) => {
      if (!raw) return [];
      const parts: string[] = [];
      let current = "";
      let inQuotes = false;
      for (let i = 0; i < raw.length; i++) {
        const char = raw[i];
        if (char === '"') inQuotes = !inQuotes;
        if (char === "," && !inQuotes) {
          parts.push(current);
          current = "";
        } else {
          current += char;
        }
      }
      if (current) parts.push(current);

      return parts
        .map((p) => parseParticipant(p.trim()))
        .filter((p) => p.email);
    };

    const extractBody = (part: any): { text?: string; html?: string } => {
      let text = "";
      let html = "";

      if (part.mimeType === "text/plain" && part.body?.data) {
        try {
          text = Buffer.from(part.body.data, "base64").toString("utf-8");
        } catch {}
      } else if (part.mimeType === "text/html" && part.body?.data) {
        try {
          html = Buffer.from(part.body.data, "base64").toString("utf-8");
        } catch {}
      }

      if (part.parts && part.parts.length > 0) {
        for (const p of part.parts) {
          const res = extractBody(p);
          if (res.text) text += (text ? "\n" : "") + res.text;
          if (res.html) html += (html ? "\n" : "") + res.html;
        }
      }

      return { text, html };
    };

    const extractAttachments = (part: any): { id: string; filename: string; mimeType: string; size: number }[] => {
      const list: any[] = [];

      if (part.filename && part.body?.attachmentId) {
        list.push({
          id: part.body.attachmentId,
          filename: part.filename,
          mimeType: part.mimeType || "application/octet-stream",
          size: part.body.size || 0,
        });
      }

      if (part.parts && part.parts.length > 0) {
        for (const p of part.parts) {
          list.push(...extractAttachments(p));
        }
      }

      return list;
    };

    const from = parseParticipant(fromRaw);
    const to = parseParticipantList(toRaw);
    const cc = ccRaw ? parseParticipantList(ccRaw) : undefined;
    const bcc = bccRaw ? parseParticipantList(bccRaw) : undefined;

    const { text, html } = extractBody(payload);
    const attachments = extractAttachments(payload);

    const receivedAt = msg.internalDate ? new Date(Number(msg.internalDate)) : new Date();

    return {
      id: msg.id,
      threadId: msg.threadId || msg.id,
      userId,
      from,
      to,
      cc,
      bcc,
      subject,
      snippet: msg.snippet || "",
      body: text || msg.snippet || "",
      bodyHtml: html || undefined,
      labelIds: msg.labelIds || [],
      isRead: !msg.labelIds?.includes("UNREAD"),
      isStarred: msg.labelIds?.includes("STARRED"),
      priority: "MEDIUM",
      attachments,
      receivedAt,
    };
  }

  /**
   * Helper to build standard MIME RFC 2822 email raw block.
   */
  private buildMimeMessage(params: {
    from: string;
    to: { name?: string; email: string }[];
    cc?: { name?: string; email: string }[];
    bcc?: { name?: string; email: string }[];
    subject: string;
    body: string;
    bodyHtml?: string;
  }): string {
    const formatParticipant = (p: { name?: string; email: string }) => {
      return p.name ? `"${p.name}" <${p.email}>` : p.email;
    };

    const headers: string[] = [];
    headers.push(`From: ${params.from}`);
    headers.push(`To: ${params.to.map(formatParticipant).join(", ")}`);

    if (params.cc && params.cc.length > 0) {
      headers.push(`Cc: ${params.cc.map(formatParticipant).join(", ")}`);
    }

    if (params.bcc && params.bcc.length > 0) {
      headers.push(`Bcc: ${params.bcc.map(formatParticipant).join(", ")}`);
    }

    const subjectEncoded = `=?utf-8?B?${Buffer.from(params.subject).toString("base64")}?=`;
    headers.push(`Subject: ${subjectEncoded}`);
    headers.push("MIME-Version: 1.0");

    if (params.bodyHtml) {
      const boundary = `----=_Part_${Math.random().toString(36).substring(2)}`;
      headers.push(`Content-Type: multipart/alternative; boundary="${boundary}"`);
      headers.push("");

      headers.push(`--${boundary}`);
      headers.push('Content-Type: text/plain; charset="UTF-8"');
      headers.push("Content-Transfer-Encoding: base64");
      headers.push("");
      headers.push(Buffer.from(params.body).toString("base64"));
      headers.push("");

      headers.push(`--${boundary}`);
      headers.push('Content-Type: text/html; charset="UTF-8"');
      headers.push("Content-Transfer-Encoding: base64");
      headers.push("");
      headers.push(Buffer.from(params.bodyHtml).toString("base64"));
      headers.push("");
      headers.push(`--${boundary}--`);
    } else {
      headers.push('Content-Type: text/plain; charset="UTF-8"');
      headers.push("Content-Transfer-Encoding: base64");
      headers.push("");
      headers.push(Buffer.from(params.body).toString("base64"));
    }

    return headers.join("\r\n");
  }

  /**
   * RFC 4648 Base64url encoding helper.
   */
  private base64urlEncode(str: string): string {
    return Buffer.from(str, "utf-8")
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }
}
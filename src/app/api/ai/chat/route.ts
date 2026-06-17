import { NextRequest, NextResponse } from "next/server";
import { requireAuth, requireUser } from "@/lib/clerk";
import { prisma } from "@/lib/prisma";
import { inngest } from "@/lib/inngest";
import { checkRateLimit } from "@/lib/rate-limit";
import { errorResponse } from "@/lib/errors";
import { ChatSchema } from "@/types/api.types";
import crypto from "crypto";

// GET: Retrieve all chat messages for a conversation (scoped to user to prevent data leaks)
export async function GET(req: NextRequest) {
  try {
    const { userId } = await requireAuth();
    const { searchParams } = new URL(req.url);
    const conversationId = searchParams.get("conversationId");

    if (!conversationId) {
      return NextResponse.json({ error: "Missing conversationId parameter." }, { status: 400 });
    }

    const messages = await prisma.aIMessage.findMany({
      where: {
        conversationId,
        conversation: {
          userId,
        },
      },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({ messages });
  } catch (error) {
    return errorResponse(error);
  }
}

// POST: Save user message, save pending assistant placeholder, trigger Inngest workflow
export async function POST(req: NextRequest) {
  try {
    const { userId } = await requireAuth();

    // 1. Rate Limiter Check for AI operations
    const rateLimit = await checkRateLimit(userId, "ai");
    if (!rateLimit.allowed) {
      return NextResponse.json({ error: rateLimit.error }, { status: 429 });
    }

    const user = await requireUser();
    const body = await req.json();

    const parseResult = ChatSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid message structure or parameters", details: parseResult.error.format() },
        { status: 400 }
      );
    }

    const { conversationId, message } = parseResult.data;

    let activeConversationId = conversationId;
    if (!activeConversationId) {
      // Create new conversation in DB
      const title = message.substring(0, 30) + (message.length > 30 ? "..." : "");
      const newConvo = await prisma.aIConversation.create({
        data: {
          userId,
          title,
        },
      });
      activeConversationId = newConvo.id;
    }

    const userMessageId = crypto.randomUUID();
    const assistantMessageId = crypto.randomUUID();

    // Insert user message (completed) and assistant message placeholder (pending)
    await prisma.aIMessage.create({
      data: {
        id: userMessageId,
        conversationId: activeConversationId,
        role: "user",
        content: message,
        status: "completed",
      },
    });

    await prisma.aIMessage.create({
      data: {
        id: assistantMessageId,
        conversationId: activeConversationId,
        role: "assistant",
        content: "",
        status: "pending",
      },
    });

    // Extract history of the last 6 messages
    const prevMessages = await prisma.aIMessage.findMany({
      where: {
        conversationId: activeConversationId,
        status: "completed",
      },
      orderBy: { createdAt: "asc" },
      take: 6,
    });

    const formattedHistory = prevMessages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    // Trigger Inngest workflow
    await inngest.send({
      name: "chat.message.sent",
      data: {
        userId,
        userFirstName: user.firstName,
        userLastName: user.lastName,
        userEmail: user.primaryEmailAddress?.emailAddress || "",
        messages: formattedHistory,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
        localTime: new Date().toString(),
        assistantMessageId,
        conversationId: activeConversationId,
      },
    });

    return NextResponse.json({
      success: true,
      conversationId: activeConversationId,
      userMessageId,
      assistantMessageId,
    });
  } catch (error) {
    return errorResponse(error);
  }
}

// PUT: Cancel active message processing (strictly scoped to user to prevent IDOR)
export async function PUT(req: NextRequest) {
  try {
    const { userId } = await requireAuth();
    const { messageId } = await req.json();

    if (!messageId) {
      return NextResponse.json({ error: "Message ID is required for cancellation" }, { status: 400 });
    }

    // Verify ownership
    const msg = await prisma.aIMessage.findFirst({
      where: {
        id: messageId,
        conversation: {
          userId,
        },
      },
    });

    if (!msg) {
      return NextResponse.json({ error: "Message not found or unauthorized" }, { status: 404 });
    }

    // Update message status to cancelled in DB
    await prisma.aIMessage.update({
      where: { id: messageId },
      data: {
        status: "cancelled",
        content: "⚠️ AI Request paused and cancelled by user.",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return errorResponse(error);
  }
}

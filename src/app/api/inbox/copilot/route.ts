import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { generateAiReply } from "@/lib/ai-engine";

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { conversationId } = await request.json();

    if (!conversationId) {
      return NextResponse.json({ error: "Missing conversation ID" }, { status: 400 });
    }

    // 1. Fetch the conversation along with its last few messages to construct context
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        messages: {
          orderBy: { createdAt: "desc" },
          take: 8,
        },
      },
    });

    if (!conversation) {
      return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
    }

    // Find the last customer message content
    const customerMessages = conversation.messages.filter(m => m.sender === "CUSTOMER");
    const lastCustomerMessage = customerMessages[0];

    if (!lastCustomerMessage) {
      return NextResponse.json({
        suggestion: null,
        message: "No customer message to reply to yet."
      });
    }

    // Construct history for AI Engine format
    const chatHistory = conversation.messages
      .slice()
      .reverse()
      .map(m => ({
        sender: m.sender,
        content: m.content
      }));

    // Generate dynamic reply suggestion using our advanced semantic hybrid retrieval engine
    const replyDetails = await generateAiReply(
      conversation.workspaceId,
      lastCustomerMessage.content,
      chatHistory
    );

    return NextResponse.json({
      suggestion: {
        text: replyDetails.text,
        confidence: replyDetails.confidence,
        source: replyDetails.source,
        triggerQuery: lastCustomerMessage.content
      }
    });

  } catch (err) {
    console.error("[CopilotAPI] Error generating suggested reply:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

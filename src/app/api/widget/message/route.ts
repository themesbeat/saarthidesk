import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateAiReply } from "@/lib/ai-engine";
import { triggerRealtimeEvent } from "@/lib/pusher";

export async function POST(request: Request) {
  try {
    const { widgetId, conversationId, content, visitorName } = await request.json();

    if (!widgetId || !content) {
      return NextResponse.json({ error: "Missing widgetId or content" }, { status: 400 });
    }

    let conversation = null;

    // 1. Resolve or create active conversation session
    if (conversationId) {
      conversation = await prisma.conversation.findUnique({
        where: { id: conversationId },
        include: { contact: true },
      });
    }

    if (!conversation) {
      // Create new contact
      const contact = await prisma.contact.create({
        data: {
          workspaceId: widgetId,
          name: visitorName || "Web Visitor",
          avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=visitor_${Math.random().toString(36).substring(7)}`,
        },
      });

      // Create new conversation on the WEB platform
      conversation = await prisma.conversation.create({
        data: {
          workspaceId: widgetId,
          platform: "WEB",
          contactId: contact.id,
          status: "OPEN",
          priority: "MEDIUM",
          aiEnabled: true,
        },
        include: { contact: true },
      });
    }

    // 2. Save the customer's message to database
    const userMessage = await prisma.message.create({
      data: {
        conversationId: conversation.id,
        content,
        sender: "CUSTOMER",
        senderId: conversation.contactId,
        messageType: "TEXT",
        isAiGenerated: false,
      },
    });

    // Update conversation timelines
    await prisma.conversation.update({
      where: { id: conversation.id },
      data: {
        lastMessageAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // Trigger dashboard real-time updates for agents
    await triggerRealtimeEvent(widgetId, "inbox", "message:new", {
      conversationId: conversation.id,
      message: userMessage,
      contact: conversation.contact,
    });

    await triggerRealtimeEvent(widgetId, "inbox", "conversation:updated", {
      conversationId: conversation.id,
      lastMessage: content,
      updatedAt: new Date(),
    });

    // 3. Trigger dynamic AI responder
    let aiResponse = null;
    if (conversation.aiEnabled) {
      const aiSettings = await prisma.aiSettings.findUnique({
        where: { workspaceId: widgetId },
      });

      const autoReplyEnabled = aiSettings?.autoReply ?? true;
      if (autoReplyEnabled) {
        // Retrieve dynamic prompt response
        const { text: aiReplyText } = await generateAiReply(widgetId, content);

        // Store response record in DB
        aiResponse = await prisma.message.create({
          data: {
            conversationId: conversation.id,
            content: aiReplyText,
            sender: "AI",
            isAiGenerated: true,
            messageType: "TEXT",
          },
        });

        // Update timestamps again
        await prisma.conversation.update({
          where: { id: conversation.id },
          data: {
            lastMessageAt: new Date(),
            updatedAt: new Date(),
          },
        });

        // Trigger real-time push for AI response
        await triggerRealtimeEvent(widgetId, "inbox", "message:new", {
          conversationId: conversation.id,
          message: aiResponse,
          contact: conversation.contact,
        });

        await triggerRealtimeEvent(widgetId, "inbox", "conversation:updated", {
          conversationId: conversation.id,
          lastMessage: aiReplyText,
          updatedAt: new Date(),
        });
      }
    }

    return NextResponse.json({
      success: true,
      conversationId: conversation.id,
      message: userMessage,
      aiResponse,
    });
  } catch (err) {
    console.error("[WidgetMessageAPI] Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

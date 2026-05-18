import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { TelegramAdapter } from "@/lib/adapters/telegram.adapter";
import { triggerRealtimeEvent } from "@/lib/pusher";

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    let workspaceId = searchParams.get("workspaceId");

    // 1. Resolve workspace (use fallback for easy development/testing)
    if (!workspaceId) {
      const fallbackWorkspace = await prisma.workspace.findFirst();
      if (!fallbackWorkspace) {
        return NextResponse.json({ error: "No workspaces configured" }, { status: 400 });
      }
      workspaceId = fallbackWorkspace.id;
    }

    const body = await request.json();

    // Skip non-message updates (e.g. delivery receipts, status updates)
    if (!body.message && !body.edited_message) {
      return NextResponse.json({ success: true, note: "Ignored non-message update" });
    }

    // 2. Fetch Channel credentials or use local development mock token
    const channel = await prisma.channel.findFirst({
      where: {
        workspaceId,
        type: "TELEGRAM",
        isActive: true,
      },
    });

    const botToken = (channel?.credentials as any)?.botToken || "mock_telegram_bot_token";
    const telegramAdapter = new TelegramAdapter(botToken);

    // 3. Normalize incoming payload
    const normalized = telegramAdapter.normalizePayload(body);
    const chatId = normalized.metadata?.chatId?.toString() || normalized.customer.phone || "";

    // 4. Find or Create Contact in a tenant-isolated query
    let contact = await prisma.contact.findFirst({
      where: {
        workspaceId,
        phone: normalized.customer.phone,
      },
    });

    if (!contact) {
      contact = await prisma.contact.create({
        data: {
          workspaceId,
          name: normalized.customer.name || "Telegram User",
          phone: normalized.customer.phone,
          email: normalized.customer.email,
          avatar: normalized.customer.avatar,
          tags: ["telegram-inbound"],
        },
      });
    }

    // 5. Find or Create active Conversation
    let conversation = await prisma.conversation.findFirst({
      where: {
        workspaceId,
        contactId: contact.id,
        platform: "TELEGRAM",
      },
    });

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          workspaceId,
          contactId: contact.id,
          platform: "TELEGRAM",
          status: "OPEN",
          priority: "MEDIUM",
        },
      });
    }

    // 6. Save the Normalized Inbound Message to DB
    const incomingMessage = await prisma.message.create({
      data: {
        conversationId: conversation.id,
        content: normalized.content,
        sender: "CUSTOMER",
        senderId: contact.id,
        messageType: normalized.messageType || "TEXT",
        externalMessageId: normalized.externalMessageId,
        isAiGenerated: false,
      },
    });

    // 7. Update Conversation timeline
    await prisma.conversation.update({
      where: { id: conversation.id },
      data: {
        lastMessageAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // 8. Broadcast Live Real-Time Events to Dashboard
    await triggerRealtimeEvent(workspaceId, "inbox", "message:new", {
      conversationId: conversation.id,
      message: incomingMessage,
      contact,
    });

    await triggerRealtimeEvent(workspaceId, "inbox", "conversation:updated", {
      conversationId: conversation.id,
      lastMessage: normalized.content,
      updatedAt: new Date(),
    });

    // 9. Process co-pilot or direct AI response loop
    const aiSettings = await prisma.aiSettings.findUnique({
      where: { workspaceId },
    });

    if (conversation.aiEnabled && aiSettings?.autoReply) {
      const tone = aiSettings.tone || "PROFESSIONAL";
      let aiReplyText = "";

      if (tone === "FRIENDLY") {
        aiReplyText = `Hey ${contact.name}! Thanks so much for reaching out to us on Telegram! 😊 I'd be absolutely thrilled to help you out with this. Let me verify the details for you right now!`;
      } else if (tone === "BOLD") {
        aiReplyText = `Got your Telegram message, ${contact.name}! We are on it. Let's make things happen! Hang tight, I'll get back to you with answers in a flash.`;
      } else if (tone === "EMPATHETIC") {
        aiReplyText = `Hello ${contact.name}. I completely understand how important this is to you, and I am here to help. I am reviewing your request right away to ensure we resolve it perfectly for you.`;
      } else if (tone === "ACADEMIC") {
        aiReplyText = `Transmission received, ${contact.name}. We are analyzing the technical specifications to formulate an optimized resolution schema. Please remain online.`;
      } else {
        // PROFESSIONAL
        aiReplyText = `Thank you for your message, ${contact.name}. I am reviewing your inquiry and will provide the relevant information shortly. Please let me know if you have any additional details to add.`;
      }

      // Write AI response to DB
      const outgoingMessage = await prisma.message.create({
        data: {
          conversationId: conversation.id,
          content: aiReplyText,
          sender: "AI",
          isAiGenerated: true,
          messageType: "TEXT",
        },
      });

      // Update Conversation timeline again
      await prisma.conversation.update({
        where: { id: conversation.id },
        data: {
          lastMessageAt: new Date(),
          updatedAt: new Date(),
        },
      });

      // Send outbound Telegram message back to User
      if (botToken !== "mock_telegram_bot_token") {
        await telegramAdapter.sendOutgoingMessage(chatId, aiReplyText);
      } else {
        console.log(`[Telegram Bot] [MOCK SEND] ChatId: ${chatId} | Text: ${aiReplyText}`);
      }

      // Broadcast the AI response
      await triggerRealtimeEvent(workspaceId, "inbox", "message:new", {
        conversationId: conversation.id,
        message: outgoingMessage,
        contact,
      });
    }

    return NextResponse.json({ success: true, messageId: incomingMessage.id });
  } catch (err: any) {
    console.error("[Telegram Webhook] Error:", err);
    return NextResponse.json({ error: "Internal Server Error", details: err.message }, { status: 500 });
  }
}

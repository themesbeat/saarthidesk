import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { triggerRealtimeEvent } from "@/lib/pusher";
import { TelegramAdapter } from "@/lib/adapters/telegram.adapter";
import { EmailAdapter } from "@/lib/adapters/email.adapter";

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { conversationId, content, sender, messageType, attachments, metadata } = await request.json();

    if (!conversationId || !content || !sender) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    // 1. Retrieve the conversation, workspace, and contact details
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        contact: true,
        workspace: {
          include: {
            aiSettings: true,
            channels: true,
          },
        },
      },
    });

    if (!conversation) {
      return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
    }

    const workspaceId = conversation.workspaceId;
    const isInternal = messageType === "INTERNAL_NOTE";

    // 2. Create the message in database with enhanced fields
    const userMessage = await prisma.message.create({
      data: {
        conversationId,
        content,
        sender,
        senderId: sender === "CUSTOMER" ? conversation.contactId : session.user.id,
        messageType: messageType || "TEXT",
        attachments: attachments || [],
        metadata: metadata || {},
        isAiGenerated: sender === "AI",
      },
    });

    // 3. Update conversation timeline and floats it to top
    await prisma.conversation.update({
      where: { id: conversationId },
      data: {
        lastMessageAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // 4. Trigger Real-time Event broadcast
    await triggerRealtimeEvent(workspaceId, "inbox", "message:new", {
      conversationId,
      message: userMessage,
      contact: conversation.contact,
    });

    await triggerRealtimeEvent(workspaceId, "inbox", "conversation:updated", {
      conversationId,
      lastMessage: content,
      updatedAt: new Date(),
    });

    // 5. Outbound dispatch to external networks (Telegram or Email) if sent by Agent/User and NOT an internal note
    if (sender !== "CUSTOMER" && !isInternal) {
      if (conversation.platform === "TELEGRAM") {
        const tgChannel = conversation.workspace.channels.find(c => c.type === "TELEGRAM" && c.isActive);
        const tgCreds = tgChannel?.credentials as { botToken?: string } | null;
        const botToken = tgCreds?.botToken || "mock_telegram_bot_token";
        
        const chatId = conversation.contact.phone || "";
        if (chatId) {
          const telegramAdapter = new TelegramAdapter(botToken);
          if (botToken !== "mock_telegram_bot_token") {
            await telegramAdapter.sendOutgoingMessage(chatId, content);
          } else {
            console.log(`[Telegram Outbound MOCK] ChatId: ${chatId} | Message: ${content}`);
          }
        }
      } else if (conversation.platform === "EMAIL") {
        const emailChannel = conversation.workspace.channels.find(c => c.type === "EMAIL" && c.isActive);
        const emailCreds = emailChannel?.credentials as { apiKey?: string; fromEmail?: string } | null;
        const apiKey = emailCreds?.apiKey || "mock-key";
        const fromEmail = emailCreds?.fromEmail || "support@saarthidesk.com";
        
        const customerEmail = conversation.contact.email || "";
        if (customerEmail) {
          const emailAdapter = new EmailAdapter(apiKey, fromEmail);
          await emailAdapter.sendOutgoingMessage(customerEmail, content);
        }
      }
    }

    // 6. Trigger database-driven AI auto-response if customer sent the message and auto-reply is active
    let aiResponse = null;
    if (sender === "CUSTOMER" && conversation.aiEnabled) {
      const autoReplyEnabled = conversation.workspace.aiSettings?.autoReply ?? true;
      if (autoReplyEnabled) {
        const tone = conversation.workspace.aiSettings?.tone || "PROFESSIONAL";
        let aiReplyText = "Thank you for reaching out. Let me look into this for you.";

        if (tone === "FRIENDLY") {
          aiReplyText = "Hey! Thanks so much for messaging us! 😊 I'd be absolutely thrilled to help you out with this. Let me check the details for you right away!";
        } else if (tone === "BOLD") {
          aiReplyText = "Got your inquiry. We are on it. Let's make things happen! Hang tight, I'll get back to you with answers in a flash.";
        } else if (tone === "EMPATHETIC") {
          aiReplyText = "I completely understand how important this is to you, and I am here to help. I am reviewing your request right away to ensure we resolve it perfectly for you.";
        } else if (tone === "ACADEMIC") {
          aiReplyText = "Your transmission has been logged. We are analyzing the technical specifications to formulate a optimized resolution schema. Please remain online.";
        } else {
          // PROFESSIONAL
          aiReplyText = "Thank you for your message. I am reviewing your inquiry and will provide the relevant information shortly. Please let me know if you have any additional details to add.";
        }

        // Store the AI reply record in the database
        aiResponse = await prisma.message.create({
          data: {
            conversationId,
            content: aiReplyText,
            sender: "AI",
            isAiGenerated: true,
            messageType: "TEXT",
          },
        });

        // Update timestamps again
        await prisma.conversation.update({
          where: { id: conversationId },
          data: {
            lastMessageAt: new Date(),
            updatedAt: new Date(),
          },
        });

        // Outbound send back to customer
        if (conversation.platform === "TELEGRAM") {
          const tgChannel = conversation.workspace.channels.find(c => c.type === "TELEGRAM" && c.isActive);
          const tgCreds = tgChannel?.credentials as { botToken?: string } | null;
          const botToken = tgCreds?.botToken || "mock_telegram_bot_token";
          const chatId = conversation.contact.phone || "";
          if (chatId) {
            const telegramAdapter = new TelegramAdapter(botToken);
            if (botToken !== "mock_telegram_bot_token") {
              await telegramAdapter.sendOutgoingMessage(chatId, aiReplyText);
            }
          }
        } else if (conversation.platform === "EMAIL") {
          const emailChannel = conversation.workspace.channels.find(c => c.type === "EMAIL" && c.isActive);
          const emailCreds = emailChannel?.credentials as { apiKey?: string; fromEmail?: string } | null;
          const apiKey = emailCreds?.apiKey || "mock-key";
          const fromEmail = emailCreds?.fromEmail || "support@saarthidesk.com";
          const customerEmail = conversation.contact.email || "";
          if (customerEmail) {
            const emailAdapter = new EmailAdapter(apiKey, fromEmail);
            await emailAdapter.sendOutgoingMessage(customerEmail, aiReplyText);
          }
        }

        // Broadcast AI reply
        await triggerRealtimeEvent(workspaceId, "inbox", "message:new", {
          conversationId,
          message: aiResponse,
          contact: conversation.contact,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: userMessage,
      aiResponse,
    });
  } catch (err) {
    console.error("[MessageAPI] Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

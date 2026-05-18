import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { EmailAdapter } from "@/lib/adapters/email.adapter";
import { triggerRealtimeEvent } from "@/lib/pusher";

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    let workspaceId = searchParams.get("workspaceId");

    // 1. Resolve workspace (use fallback for development/testing)
    if (!workspaceId) {
      const fallbackWorkspace = await prisma.workspace.findFirst();
      if (!fallbackWorkspace) {
        return NextResponse.json({ error: "No workspaces configured" }, { status: 400 });
      }
      workspaceId = fallbackWorkspace.id;
    }

    const body = await request.json();

    // Skip empty payloads
    if (!body.from && !body.sender) {
      return NextResponse.json({ error: "Missing sender details" }, { status: 400 });
    }

    // 2. Fetch Channel credentials or use local development mock settings
    const channel = await prisma.channel.findFirst({
      where: {
        workspaceId,
        type: "EMAIL",
        isActive: true,
      },
    });

    const apiKey = (channel?.credentials as any)?.apiKey || "mock-key";
    const fromEmail = (channel?.credentials as any)?.fromEmail || "support@saarthidesk.com";
    const emailAdapter = new EmailAdapter(apiKey, fromEmail);

    // 3. Normalize incoming payload
    const normalized = emailAdapter.normalizePayload(body);
    const customerEmail = normalized.customer.email || "";

    if (!customerEmail) {
      return NextResponse.json({ error: "Could not extract sender email" }, { status: 400 });
    }

    // 4. Find or Create Contact in a tenant-isolated query
    let contact = await prisma.contact.findFirst({
      where: {
        workspaceId,
        email: customerEmail,
      },
    });

    if (!contact) {
      contact = await prisma.contact.create({
        data: {
          workspaceId,
          name: normalized.customer.name || customerEmail.split("@")[0] || "Email User",
          email: customerEmail,
          avatar: normalized.customer.avatar,
          tags: ["email-inbound"],
        },
      });
    }

    // 5. Find or Create active Conversation
    let conversation = await prisma.conversation.findFirst({
      where: {
        workspaceId,
        contactId: contact.id,
        platform: "EMAIL",
      },
    });

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          workspaceId,
          contactId: contact.id,
          platform: "EMAIL",
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

    // 9. AI auto-reply loop
    const aiSettings = await prisma.aiSettings.findUnique({
      where: { workspaceId },
    });

    if (conversation.aiEnabled && aiSettings?.autoReply) {
      const tone = aiSettings.tone || "PROFESSIONAL";
      let aiReplyText = "";

      if (tone === "FRIENDLY") {
        aiReplyText = `Hi ${contact.name},\n\nThanks so much for reaching out! 😊 I'd be absolutely thrilled to assist you with your request. I am looking over the details for you right now, and I will follow up with an update shortly!`;
      } else if (tone === "BOLD") {
        aiReplyText = `Hey ${contact.name},\n\nGot your email! We are on it. Let's make things happen! Hang tight, I'll get back to you with answers in a flash.`;
      } else if (tone === "EMPATHETIC") {
        aiReplyText = `Dear ${contact.name},\n\nI completely understand how important this is to you, and I am here to help. I am reviewing your request right away to ensure we resolve it perfectly for you.`;
      } else if (tone === "ACADEMIC") {
        aiReplyText = `Greetings ${contact.name},\n\nTransmission received. We are analyzing the technical specifications to formulate an optimized resolution schema. Please remain online.`;
      } else {
        // PROFESSIONAL
        aiReplyText = `Dear ${contact.name},\n\nThank you for your message. I am currently reviewing your inquiry and will provide the relevant information shortly. Please let us know if you have any additional details to add.`;
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

      // Dispatch outbound email
      await emailAdapter.sendOutgoingMessage(customerEmail, aiReplyText);

      // Broadcast the AI response
      await triggerRealtimeEvent(workspaceId, "inbox", "message:new", {
        conversationId: conversation.id,
        message: outgoingMessage,
        contact,
      });
    }

    return NextResponse.json({ success: true, messageId: incomingMessage.id });
  } catch (err: any) {
    console.error("[Email Webhook] Error:", err);
    return NextResponse.json({ error: "Internal Server Error", details: err.message }, { status: 500 });
  }
}

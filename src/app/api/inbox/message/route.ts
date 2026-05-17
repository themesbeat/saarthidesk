import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { conversationId, content, sender } = await request.json();

    if (!conversationId || !content || !sender) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    // 1. Create the new message in the database
    const userMessage = await prisma.message.create({
      data: {
        conversationId,
        content,
        sender,
        isAiGenerated: sender === "AI",
      },
    });

    // 2. Update conversation updatedAt timestamp to float it to top of list
    await prisma.conversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() },
    });

    // 3. Trigger database-driven AI auto-response if customer sent the message and auto-reply is active
    let aiResponse = null;
    if (sender === "CUSTOMER") {
      const workspace = await prisma.workspace.findFirst({
        where: {
          conversations: {
            some: { id: conversationId },
          },
        },
        include: {
          aiSettings: true,
        },
      });

      const autoReplyEnabled = workspace?.aiSettings?.autoReply ?? true;
      if (autoReplyEnabled) {
        const tone = workspace?.aiSettings?.tone || "PROFESSIONAL";
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
          },
        });

        // Update timestamps again
        await prisma.conversation.update({
          where: { id: conversationId },
          data: { updatedAt: new Date() },
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

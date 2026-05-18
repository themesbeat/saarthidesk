import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const widgetId = searchParams.get("widgetId");

  if (!widgetId) {
    return NextResponse.json({ error: "Missing widgetId" }, { status: 400 });
  }

  try {
    // Fetch active AI Settings for this specific workspace
    let aiSettings = await prisma.aiSettings.findUnique({
      where: { workspaceId: widgetId },
    });

    // Fallback default setup if no settings row is initialized yet
    if (!aiSettings) {
      aiSettings = await prisma.aiSettings.create({
        data: {
          workspaceId: widgetId,
          tone: "PROFESSIONAL",
          autoReply: true,
          agentName: "Saarthi AI",
          systemPrompt: "You are Saarthi, a virtual receptionist. You are helpful, polite, and focused on assisting customers.",
          escalateEmail: "support@saarthidesk.com",
          escalatePhone: "+91 98765 43210",
        },
      });
    }

    const { agentName, tone, autoReply } = aiSettings;

    // Generate dynamic tone-specific premium greetings
    let welcomeMessage = `Hello, I am ${agentName}, your virtual assistant. How can I help you with our services or booking today?`;
    if (tone === "CASUAL") {
      welcomeMessage = `Hey there! 😊 I'm ${agentName}, your friendly AI assistant. How can I help you out today? 🚀`;
    } else if (tone === "EMPATHETIC") {
      welcomeMessage = `Hello, I'm ${agentName}. ❤️ I'm here to listen and help you in any way I can. What can I support you with today?`;
    } else if (tone === "ENTHUSIASTIC") {
      welcomeMessage = `Hi! I'm ${agentName}! 🎉 I am super excited to assist you today! What amazing things can I answer or schedule for you? ✨`;
    } else if (tone === "ACADEMIC") {
      welcomeMessage = `System Online. I am ${agentName}. Ready to parse your queries and provide structured technical guidance. Please specify your parameters.`;
    }

    return NextResponse.json({
      success: true,
      agentName,
      tone,
      autoReply,
      welcomeMessage,
    });
  } catch (err) {
    console.error("[WidgetSettingsAPI] Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

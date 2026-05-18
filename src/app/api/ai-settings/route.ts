import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { getOrCreateActiveWorkspace } from "@/lib/workspace";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const workspace = await getOrCreateActiveWorkspace(session.user.id);
    const settings = await prisma.aiSettings.findUnique({
      where: { workspaceId: workspace.id },
    });

    return NextResponse.json({ settings });
  } catch (err) {
    console.error("[AiSettingsGET] Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { tone, autoReply, languages, agentName, systemPrompt, escalateEmail, escalatePhone } = await request.json();

    const workspace = await getOrCreateActiveWorkspace(session.user.id);

    const updatedSettings = await prisma.aiSettings.upsert({
      where: { workspaceId: workspace.id },
      update: {
        tone: tone || "PROFESSIONAL",
        autoReply: autoReply !== undefined ? autoReply : true,
        languages: languages || ["en"],
        agentName: agentName !== undefined ? agentName : "Saarthi AI",
        systemPrompt: systemPrompt !== undefined ? systemPrompt : "",
        escalateEmail: escalateEmail !== undefined ? escalateEmail : "support@saarthidesk.com",
        escalatePhone: escalatePhone !== undefined ? escalatePhone : "+91 98765 43210",
      },
      create: {
        workspaceId: workspace.id,
        tone: tone || "PROFESSIONAL",
        autoReply: autoReply !== undefined ? autoReply : true,
        languages: languages || ["en"],
        agentName: agentName !== undefined ? agentName : "Saarthi AI",
        systemPrompt: systemPrompt !== undefined ? systemPrompt : "",
        escalateEmail: escalateEmail !== undefined ? escalateEmail : "support@saarthidesk.com",
        escalatePhone: escalatePhone !== undefined ? escalatePhone : "+91 98765 43210",
      },
    });

    return NextResponse.json({ success: true, settings: updatedSettings });
  } catch (err) {
    console.error("[AiSettingsPOST] Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

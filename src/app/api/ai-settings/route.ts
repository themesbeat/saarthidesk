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
    const { tone, autoReply, languages } = await request.json();

    const workspace = await getOrCreateActiveWorkspace(session.user.id);

    const updatedSettings = await prisma.aiSettings.upsert({
      where: { workspaceId: workspace.id },
      update: {
        tone: tone || "PROFESSIONAL",
        autoReply: autoReply !== undefined ? autoReply : true,
        languages: languages || ["en"],
      },
      create: {
        workspaceId: workspace.id,
        tone: tone || "PROFESSIONAL",
        autoReply: autoReply !== undefined ? autoReply : true,
        languages: languages || ["en"],
      },
    });

    return NextResponse.json({ success: true, settings: updatedSettings });
  } catch (err) {
    console.error("[AiSettingsPOST] Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

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
    const articles = await prisma.knowledgeBase.findMany({
      where: { workspaceId: workspace.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ articles });
  } catch (err) {
    console.error("[KnowledgeGET] Error:", err);
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
    const { title, content, type } = await request.json();

    if (!title || !content || !type) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const workspace = await getOrCreateActiveWorkspace(session.user.id);

    const article = await prisma.knowledgeBase.create({
      data: {
        workspaceId: workspace.id,
        title,
        content,
        type,
      },
    });

    return NextResponse.json({ success: true, article });
  } catch (err) {
    console.error("[KnowledgePOST] Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "Missing parameter id" }, { status: 400 });
    }

    // Verify ownership
    const workspace = await getOrCreateActiveWorkspace(session.user.id);
    const article = await prisma.knowledgeBase.findFirst({
      where: { id, workspaceId: workspace.id },
    });

    if (!article) {
      return NextResponse.json({ error: "Article not found or access denied" }, { status: 404 });
    }

    await prisma.knowledgeBase.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[KnowledgeDELETE] Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

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
    const workspaceId = workspace.id;

    const conversations = await prisma.conversation.findMany({
      where: { workspaceId },
      include: {
        contact: {
          include: {
            lead: true,
          },
        },
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json({ conversations });
  } catch (err) {
    console.error("[InboxConversationsAPI] Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

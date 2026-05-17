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
    const members = await prisma.workspaceMember.findMany({
      where: { workspaceId: workspace.id },
      include: {
        user: true,
      },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({ success: true, members });
  } catch (err) {
    console.error("[TeamGET] Error:", err);
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
    const { email, role } = await request.json();

    if (!email || !role) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const workspace = await getOrCreateActiveWorkspace(session.user.id);
    const workspaceId = workspace.id;

    // Find or create the user being invited
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: email.split("@")[0].replace(/[._-]/g, " "),
          avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 999999)}?w=150`
        },
      });
    }

    // Check if the user is already a member
    const existingMember = await prisma.workspaceMember.findFirst({
      where: { workspaceId, userId: user.id },
    });

    if (existingMember) {
      return NextResponse.json({ error: "User is already a member of this workspace" }, { status: 400 });
    }

    // Create the membership
    const member = await prisma.workspaceMember.create({
      data: {
        workspaceId,
        userId: user.id,
        role: role.toUpperCase(), // OWNER, ADMIN, MEMBER
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json({ success: true, member });
  } catch (err) {
    console.error("[TeamPOST] Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

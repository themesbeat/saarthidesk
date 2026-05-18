import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { getOrCreateActiveWorkspace } from "@/lib/workspace";

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const workspace = await getOrCreateActiveWorkspace(session.user.id);
    const workspaceId = workspace.id;
    const { name, phone, service, priority } = await request.json();

    if (!name || !phone || !service) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const waitlistEntry = await prisma.waitlistEntry.create({
      data: {
        workspaceId,
        name,
        phone,
        service,
        priority: priority || "MEDIUM",
      },
    });

    return NextResponse.json({ success: true, waitlistEntry });
  } catch (err) {
    console.error("[WaitlistPOST] Error:", err);
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
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    const workspace = await getOrCreateActiveWorkspace(session.user.id);
    const workspaceId = workspace.id;

    const entry = await prisma.waitlistEntry.findFirst({
      where: { id, workspaceId },
    });

    if (!entry) {
      return NextResponse.json({ error: "Waitlist entry not found" }, { status: 404 });
    }

    await prisma.waitlistEntry.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[WaitlistDELETE] Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

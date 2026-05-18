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

    const appointments = await prisma.appointment.findMany({
      where: { workspaceId },
      orderBy: { createdAt: "desc" },
    });

    let bookingRule = await prisma.bookingRule.findUnique({
      where: { workspaceId },
    });

    if (!bookingRule) {
      bookingRule = await prisma.bookingRule.create({
        data: {
          workspaceId,
          bufferTime: 15,
          cancelWindow: 24,
          reminder24h: true,
          reminder1h: true,
        },
      });
    }

    const waitlist = await prisma.waitlistEntry.findMany({
      where: { workspaceId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, appointments, bookingRule, waitlist });
  } catch (err) {
    console.error("[AppointmentsGET] Error:", err);
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
    const workspace = await getOrCreateActiveWorkspace(session.user.id);
    const workspaceId = workspace.id;
    const body = await request.json();

    const { action } = body;

    if (action === "create_appointment") {
      const { time, staff, client, type } = body;
      if (!time || !staff || !client || !type) {
        return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
      }

      const appointment = await prisma.appointment.create({
        data: {
          workspaceId,
          time,
          staff,
          client,
          type,
          status: "CONFIRMED",
        },
      });

      return NextResponse.json({ success: true, appointment });
    }

    if (action === "update_rules") {
      const { bufferTime, cancelWindow, reminder24h, reminder1h } = body;

      const bookingRule = await prisma.bookingRule.upsert({
        where: { workspaceId },
        update: {
          bufferTime,
          cancelWindow,
          reminder24h,
          reminder1h,
        },
        create: {
          workspaceId,
          bufferTime: bufferTime ?? 15,
          cancelWindow: cancelWindow ?? 24,
          reminder24h: reminder24h ?? true,
          reminder1h: reminder1h ?? true,
        },
      });

      return NextResponse.json({ success: true, bookingRule });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err) {
    console.error("[AppointmentsPOST] Error:", err);
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

    // Verify ownership
    const app = await prisma.appointment.findFirst({
      where: { id, workspaceId },
    });

    if (!app) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    await prisma.appointment.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[AppointmentsDELETE] Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

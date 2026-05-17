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
    const leads = await prisma.lead.findMany({
      where: { workspaceId: workspace.id },
      include: {
        contact: true,
      },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json({ success: true, leads });
  } catch (err) {
    console.error("[LeadGET] Error:", err);
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
    const { contactId, name, email, phone, stage, value, source, notes } = await request.json();

    if (!stage) {
      return NextResponse.json({ error: "Stage parameter is required" }, { status: 400 });
    }

    const workspace = await getOrCreateActiveWorkspace(session.user.id);
    const workspaceId = workspace.id;

    let finalContactId = contactId;

    // Create a new contact if only name is provided
    if (!finalContactId && name) {
      const contact = await prisma.contact.create({
        data: {
          name,
          email: email || null,
          phone: phone || null,
          avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 999999)}?w=150`
        }
      });
      finalContactId = contact.id;

      // Seed an initial mock conversation as well so the inbox can list them
      await prisma.conversation.create({
        data: {
          workspaceId,
          contactId: contact.id,
          platform: "WEB",
          status: "OPEN"
        }
      });
    }

    if (!finalContactId) {
      return NextResponse.json({ error: "Either contactId or name must be provided" }, { status: 400 });
    }

    // Use upsert to handle both creation of leads (if they didn't exist) and updates
    const lead = await prisma.lead.upsert({
      where: { contactId: finalContactId },
      update: {
        stage,
        value: value !== undefined ? parseFloat(value) : undefined,
        notes: notes !== undefined ? notes : undefined,
        source: source !== undefined ? source : undefined,
        updatedAt: new Date(),
      },
      create: {
        workspaceId,
        contactId: finalContactId,
        stage,
        value: value !== undefined ? parseFloat(value) : 0,
        notes: notes !== undefined ? notes : "",
        source: source !== undefined ? source : "Website Chat",
      },
    });

    // Fetch complete lead with contact for immediate dynamic UI appending
    const completeLead = await prisma.lead.findUnique({
      where: { id: lead.id },
      include: {
        contact: true
      }
    });

    return NextResponse.json({
      success: true,
      lead: completeLead,
    });
  } catch (err) {
    console.error("[LeadAPI] Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

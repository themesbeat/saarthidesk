import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      fullName, 
      email, 
      phone, 
      businessName, 
      businessType, 
      teamSize, 
      volume, 
      message 
    } = body;

    // Basic validation
    if (!fullName || !email) {
      return NextResponse.json(
        { error: "Name and Email are required fields." },
        { status: 400 }
      );
    }

    // 1. Get or create a default Workspace
    let workspace = await prisma.workspace.findFirst();
    if (!workspace) {
      workspace = await prisma.workspace.create({
        data: {
          name: "SaarthiDesk Headquarters",
        },
      });
    }

    // 2. Normalize and check if Contact exists
    const normalizedEmail = email.trim().toLowerCase();
    let contact = await prisma.contact.findFirst({
      where: { email: normalizedEmail }
    });

    const customFieldsData = {
      businessName: businessName || "",
      businessType: businessType || "",
      teamSize: teamSize || "",
      volume: volume || "",
      submittedAt: new Date().toISOString(),
    };

    if (!contact) {
      // Create new contact
      contact = await prisma.contact.create({
        data: {
          name: fullName.trim(),
          email: normalizedEmail,
          phone: phone || "",
          workspaceId: workspace.id,
          customFields: customFieldsData,
          tags: ["Demo Requested", "High Intent"],
        },
      });
    } else {
      // Update existing contact details
      const existingFields = typeof contact.customFields === 'object' && contact.customFields !== null
        ? (contact.customFields as Record<string, unknown>)
        : {};

      contact = await prisma.contact.update({
        where: { id: contact.id },
        data: {
          name: fullName.trim() || contact.name,
          phone: phone || contact.phone,
          customFields: {
            ...existingFields,
            ...customFieldsData,
          },
        },
      });
    }

    // 3. Find or create the Lead (1-to-1 relationship with Contact)
    let lead = await prisma.lead.findUnique({
      where: { contactId: contact.id }
    });

    if (!lead) {
      lead = await prisma.lead.create({
        data: {
          workspaceId: workspace.id,
          contactId: contact.id,
          stage: "NEW",
          source: "Website Demo Form",
          notes: message || "Requested a free demo presentation.",
        },
      });
    } else {
      // Append a note and mark back as NEW
      const updatedNotes = message 
        ? `${lead.notes || ""}\n\n[New Request: ${new Date().toLocaleDateString()}]\n${message}` 
        : lead.notes;
        
      lead = await prisma.lead.update({
        where: { id: lead.id },
        data: {
          stage: "NEW",
          notes: updatedNotes,
        },
      });
    }

    return NextResponse.json({ 
      success: true, 
      leadId: lead.id,
      contactId: contact.id,
      message: "Lead successfully recorded in CRM database."
    });

  } catch (error) {
    console.error("[DEMO_SUBMISSION_API_ERROR]", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}

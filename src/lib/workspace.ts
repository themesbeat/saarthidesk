import prisma from "./prisma";
import { Workspace, AiSettings } from "@prisma/client";

export type WorkspaceWithSettings = Workspace & {
  aiSettings: AiSettings | null;
};

export async function getOrCreateActiveWorkspace(userId: string): Promise<WorkspaceWithSettings> {
  // 1. Try to find an existing workspace membership for this user
  const member = await prisma.workspaceMember.findFirst({
    where: { userId },
    include: {
      workspace: {
        include: {
          aiSettings: true,
        },
      },
    },
  });

  if (member?.workspace) {
    return member.workspace;
  }

  // 2. If no workspace membership exists, create a default workspace & seed sample database records
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  const workspaceName = user?.name ? `${user.name.split(" ")[0]}'s Helpdesk` : "Acme Corporation";

  // Create Workspace with active User Member and AI settings
  const newWorkspace = await prisma.workspace.create({
    data: {
      name: workspaceName,
      members: {
        create: {
          userId,
          role: "OWNER",
        },
      },
      aiSettings: {
        create: {
          tone: "PROFESSIONAL",
          autoReply: true,
          languages: ["en", "hi"],
        },
      },
    },
    include: {
      aiSettings: true,
    },
  });

  const workspaceId = newWorkspace.id;

  // 3. Auto-Seed beautiful mock support conversations, messages, CRM leads & Help articles
  const seedContacts = [
    {
      name: "Alice Chen",
      phone: "+1 (555) 019-2834",
      email: "alice@example.com",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      platform: "WHATSAPP",
      status: "OPEN",
      lead: {
        stage: "INTERESTED",
        source: "WhatsApp",
        value: 1200,
        notes: "Interested in the Pro Plan. Requested custom WhatsApp CTA template buttons walkthrough tomorrow.",
      },
      messages: [
        { sender: "CUSTOMER", content: "Hi there! I am interested in SaarthiDesk's Pro Plan. Does it support custom WhatsApp template buttons?", isAiGenerated: false },
        { sender: "AI", content: "Hello Alice! Yes, absolutely. SaarthiDesk fully supports interactive template buttons (Quick Replies and Call-to-Action) directly integrated into WhatsApp Business campaigns. Would you like me to set up a quick walkthrough?", isAiGenerated: true },
        { sender: "CUSTOMER", content: "Yes please, that would be great. Can we schedule it for tomorrow?", isAiGenerated: false }
      ]
    },
    {
      name: "Rahul Sharma",
      phone: "+91 98765 43210",
      email: "rahul@example.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      platform: "WEB",
      status: "OPEN",
      lead: {
        stage: "NEW",
        source: "Web Chat",
        value: 450,
        notes: "Developer testing credential tokens. Troubleshooting API authorization parameters.",
      },
      messages: [
        { sender: "CUSTOMER", content: "My API keys are throwing a 401 unauthorized error since this morning. Did the endpoint URL change?", isAiGenerated: false },
        { sender: "USER", content: "Hey Rahul, checking this for you. Let's make sure the header includes the 'Authorization: Bearer <key>' format. Can you verify your key prefix?", isAiGenerated: false },
        { sender: "CUSTOMER", content: "Ah! I forgot the Bearer prefix in my script. Let me test that quickly.", isAiGenerated: false }
      ]
    },
    {
      name: "Sarah Jenkins",
      phone: "+44 20 7946 0958",
      email: "sarah@example.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      platform: "INSTAGRAM",
      status: "RESOLVED",
      lead: null,
      messages: [
        { sender: "CUSTOMER", content: "Love your AI replies! They are so natural and rapid.", isAiGenerated: false },
        { sender: "AI", content: "Thank you, Sarah! We aim to make support seamless and human-like. Let us know if you need anything else!", isAiGenerated: true }
      ]
    },
    {
      name: "David Koomson",
      phone: "+233 24 123 4567",
      email: "david@example.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      platform: "EMAIL",
      status: "OPEN",
      lead: {
        stage: "FOLLOW_UP",
        source: "Email",
        value: 8500,
        notes: "Enterprise buyer representing 50 support agents. Requires custom SLA & Dedicated VM hosting options.",
      },
      messages: [
        { sender: "CUSTOMER", content: "We need a Custom Enterprise contract for 50 agents. Who can we talk to?", isAiGenerated: false },
        { sender: "USER", content: "Hello David, thanks for reaching out. One of our Enterprise account executives will email you today with our custom SLA options.", isAiGenerated: false }
      ]
    },
    {
      name: "Elena Rostova",
      phone: "+7 901 123-45-67",
      email: "elena@example.com",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
      platform: "WEB",
      status: "OPEN",
      lead: {
        stage: "NEW",
        source: "Web Chat",
        value: 900,
        notes: "Wants information regarding custom webhooks to feed into regional CRMs.",
      },
      messages: [
        { sender: "CUSTOMER", content: "Can I integrate SaarthiDesk with our local CRM system? We require custom Webhook endpoints.", isAiGenerated: false }
      ]
    }
  ];

  // Insert mock data step-by-step
  for (const c of seedContacts) {
    const contact = await prisma.contact.create({
      data: {
        name: c.name,
        phone: c.phone,
        email: c.email,
        avatar: c.avatar,
      },
    });

    const conversation = await prisma.conversation.create({
      data: {
        workspaceId,
        contactId: contact.id,
        platform: c.platform,
        status: c.status,
      },
    });

    // Create messages
    for (const m of c.messages) {
      await prisma.message.create({
        data: {
          conversationId: conversation.id,
          content: m.content,
          sender: m.sender,
          isAiGenerated: m.isAiGenerated,
        },
      });
    }

    // Create lead if present
    if (c.lead) {
      await prisma.lead.create({
        data: {
          workspaceId,
          contactId: contact.id,
          stage: c.lead.stage,
          source: c.lead.source,
          value: c.lead.value,
          notes: c.lead.notes,
        },
      });
    }
  }

  // Seed KnowledgeBase support articles
  const seedArticles = [
    {
      title: "Getting Started with WhatsApp Business API",
      content: "To connect your WhatsApp Business account, navigate to Integrations -> WhatsApp. You will need a verified Meta Business Manager account. Paste your Permanent Token and Phone ID in the configuration dashboard. Custom CTA buttons can be set up in the Templates panel.",
      type: "TEXT"
    },
    {
      title: "Configuring the AI Agent Tone",
      content: "You can customize how the virtual receptionist sounds by selecting a preset tone in AI Settings. Options include: Professional, Friendly, Bold, Empathetic, or Academic. This updates the underlying agent instructions dynamically.",
      type: "TEXT"
    },
    {
      title: "Understanding CRM Lead Pipeline Stages",
      content: "Leads are tracked automatically across 5 stages: NEW, INTERESTED, FOLLOW_UP, CONVERTED, and CLOSED. Stages can be updated directly from the Unified Inbox side-drawer or inside the CRM Leads grid view.",
      type: "TEXT"
    }
  ];

  for (const a of seedArticles) {
    await prisma.knowledgeBase.create({
      data: {
        workspaceId,
        title: a.title,
        content: a.content,
        type: a.type,
      },
    });
  }

  return newWorkspace;
}

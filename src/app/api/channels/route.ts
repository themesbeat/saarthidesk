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
    const channels = await prisma.channel.findMany({
      where: { workspaceId: workspace.id },
    });

    // Generate webhook URL helper
    const reqHeaders = await headers();
    const host = reqHeaders.get("x-forwarded-host") || reqHeaders.get("host") || "localhost:3000";
    const proto = reqHeaders.get("x-forwarded-proto") || "http";
    const publicUrl = `${proto}://${host}`;

    const webhookUrls = {
      telegram: `${publicUrl}/api/webhooks/telegram?workspaceId=${workspace.id}`,
    };

    return NextResponse.json({ success: true, channels, webhookUrls });
  } catch (err) {
    console.error("[ChannelsGET] Error:", err);
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
    const { type, credentials, isActive } = await request.json();

    if (!type || !credentials) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    const workspace = await getOrCreateActiveWorkspace(session.user.id);

    // Save or update the channel
    const channel = await prisma.channel.upsert({
      where: {
        // Since prisma doesn't have a unique constraint on type/workspaceId in this layout, we look it up first
        id: (await prisma.channel.findFirst({
          where: { workspaceId: workspace.id, type },
        }))?.id || "temp-id-to-force-create",
      },
      update: {
        credentials,
        isActive: isActive !== undefined ? isActive : true,
      },
      create: {
        workspaceId: workspace.id,
        type,
        credentials,
        isActive: isActive !== undefined ? isActive : true,
      },
    });

    // Check if we need to auto-register webhook with Telegram
    const reqHeaders = await headers();
    const host = reqHeaders.get("x-forwarded-host") || reqHeaders.get("host") || "localhost:3000";
    const proto = reqHeaders.get("x-forwarded-proto") || "http";
    const publicUrl = `${proto}://${host}`;
    const webhookUrl = `${publicUrl}/api/webhooks/telegram?workspaceId=${workspace.id}`;

    let webhookRegistered = false;
    let telegramError = null;

    if (type === "TELEGRAM" && credentials?.botToken && credentials.botToken !== "mock_telegram_bot_token") {
      // Only call Telegram API if it's not localhost/127.0.0.1
      if (!host.includes("localhost") && !host.includes("127.0.0.1")) {
        try {
          const telegramRes = await fetch(`https://api.telegram.org/bot${credentials.botToken}/setWebhook`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: webhookUrl }),
          });
          const telegramData = await telegramRes.json();
          if (telegramData.ok) {
            webhookRegistered = true;
          } else {
            telegramError = telegramData.description || "Failed to set Telegram webhook";
          }
        } catch (err) {
          console.error("[TelegramWebhookRegister] Error calling setWebhook:", err);
          telegramError = err instanceof Error ? err.message : "Failed to register webhook with Telegram";
        }
      }
    }

    return NextResponse.json({
      success: true,
      channel,
      webhookUrl: type === "TELEGRAM" ? webhookUrl : null,
      webhookRegistered,
      telegramError,
    });
  } catch (err) {
    console.error("[ChannelsPOST] Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

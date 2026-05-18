import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getOrCreateActiveWorkspace } from "@/lib/workspace";
import { generateAiReply } from "@/lib/ai-engine";

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: "Missing parameter message" }, { status: 400 });
    }

    const workspace = await getOrCreateActiveWorkspace(session.user.id);
    
    // Call our newly created dynamic AI Engine!
    const result = await generateAiReply(workspace.id, message);

    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    console.error("[AiPlaygroundPOST] Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

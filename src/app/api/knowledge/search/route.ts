import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getOrCreateActiveWorkspace } from "@/lib/workspace";
import { performHybridSearch } from "@/lib/vector-service";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { query, limit, threshold, category, tag } = await request.json();

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const workspace = await getOrCreateActiveWorkspace(session.user.id);
    const start = Date.now();
    
    // Execute hybrid similarity search
    const results = await performHybridSearch(workspace.id, query, {
      limit: limit ? parseInt(limit) : 5,
      threshold: threshold ? parseFloat(threshold) : 0.35,
      category: category || undefined,
      tag: tag || undefined
    });
    
    const latency = Date.now() - start;

    return NextResponse.json({
      success: true,
      query,
      latencyMs: latency,
      resultsCount: results.length,
      results
    });
  } catch (err) {
    console.error("[KnowledgeSearchAPI] Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

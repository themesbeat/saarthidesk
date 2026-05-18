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
    const articles = await prisma.knowledgeBase.findMany({
      where: { workspaceId: workspace.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ articles });
  } catch (err) {
    console.error("[KnowledgeGET] Error:", err);
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
    const { title, content, type } = await request.json();

    if (!content || !type) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const workspace = await getOrCreateActiveWorkspace(session.user.id);

    let finalTitle = title || "Untitled Source";
    let finalContent = content;

    if (type === "URL") {
      try {
        const targetUrl = content.trim();
        if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
          return NextResponse.json({ error: "Invalid URL protocol. Must start with http:// or https://" }, { status: 400 });
        }

        const fetchController = new AbortController();
        const fetchTimeout = setTimeout(() => fetchController.abort(), 12000); // 12-second timeout

        const response = await fetch(targetUrl, {
          signal: fetchController.signal,
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.5"
          }
        });

        clearTimeout(fetchTimeout);

        if (!response.ok) {
          return NextResponse.json({ error: `Website returned status code ${response.status}: ${response.statusText}` }, { status: 400 });
        }

        const html = await response.text();

        // 1. Strip boilerplates & non-content tags completely
        let cleanText = html;
        cleanText = cleanText.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "");
        cleanText = cleanText.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");
        cleanText = cleanText.replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, "");
        cleanText = cleanText.replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, "");
        cleanText = cleanText.replace(/<svg[^>]*>[\s\S]*?<\/svg>/gi, "");
        cleanText = cleanText.replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, "");
        cleanText = cleanText.replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, "");
        cleanText = cleanText.replace(/<header[^>]*>[\s\S]*?<\/header>/gi, "");

        // 2. Extract title if not explicitly provided or if it's default
        if (!title || title.startsWith("Website URL:") || title === "") {
          const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
          if (titleMatch && titleMatch[1]) {
            finalTitle = titleMatch[1]
              .replace(/<[^>]+>/g, "")
              .replace(/&nbsp;/g, " ")
              .replace(/&amp;/g, "&")
              .replace(/&lt;/g, "<")
              .replace(/&gt;/g, ">")
              .replace(/&quot;/g, '"')
              .replace(/\s+/g, " ")
              .trim();
          }
        }

        if (!finalTitle || finalTitle === "" || finalTitle === "Untitled Source") {
          try {
            const parsedUrl = new URL(targetUrl);
            finalTitle = `Website: ${parsedUrl.hostname}${parsedUrl.pathname !== "/" ? parsedUrl.pathname : ""}`;
          } catch {
            finalTitle = `Website: ${targetUrl}`;
          }
        }

        // 3. Strip all other HTML tags
        cleanText = cleanText.replace(/<[^>]+>/g, " ");

        // 4. Decode common HTML entities
        cleanText = cleanText
          .replace(/&nbsp;/g, " ")
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&apos;/g, "'");

        // 5. Clean up excessive whitespace
        cleanText = cleanText.replace(/\s+/g, " ").trim();

        if (cleanText.length < 30) {
          return NextResponse.json({ error: "The crawler did not find enough readable content on this page. Check the URL and ensure it has public text." }, { status: 400 });
        }

        // 6. Truncate to maximum performant size (8000 characters)
        if (cleanText.length > 8000) {
          cleanText = cleanText.substring(0, 8000) + "... [truncated]";
        }

        finalContent = cleanText;

      } catch (err: any) {
        console.error("[KnowledgeCrawler] Fetch error:", err);
        const errMsg = err.name === "AbortError" ? "Request timed out after 12 seconds." : (err.message || err.toString());
        return NextResponse.json({ error: `Connection failed: ${errMsg}` }, { status: 400 });
      }
    }

    const article = await prisma.knowledgeBase.create({
      data: {
        workspaceId: workspace.id,
        title: finalTitle,
        content: finalContent,
        type,
      },
    });

    return NextResponse.json({ success: true, article });
  } catch (err) {
    console.error("[KnowledgePOST] Error:", err);
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
      return NextResponse.json({ error: "Missing parameter id" }, { status: 400 });
    }

    // Verify ownership
    const workspace = await getOrCreateActiveWorkspace(session.user.id);
    const article = await prisma.knowledgeBase.findFirst({
      where: { id, workspaceId: workspace.id },
    });

    if (!article) {
      return NextResponse.json({ error: "Article not found or access denied" }, { status: 404 });
    }

    await prisma.knowledgeBase.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[KnowledgeDELETE] Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

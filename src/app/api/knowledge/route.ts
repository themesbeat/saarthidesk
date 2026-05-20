import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { getOrCreateActiveWorkspace } from "@/lib/workspace";
import { processDocumentIngestion } from "@/lib/rag-pipeline";

export async function GET(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const workspace = await getOrCreateActiveWorkspace(session.user.id);
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get("mode");

    // Support fetching dashboard metrics, logs, categories, and documents through a single routing entry
    if (mode === "analytics") {
      const docsCount = await prisma.knowledgeDocument.count({ where: { workspaceId: workspace.id } });
      const chunksCount = await prisma.knowledgeChunk.count({ where: { workspaceId: workspace.id } });
      const categoriesCount = await prisma.knowledgeCategory.count({ where: { workspaceId: workspace.id } });
      
      const searchLogs = await prisma.knowledgeSearchLog.findMany({
        where: { workspaceId: workspace.id },
        orderBy: { createdAt: "desc" },
        take: 50,
      });

      const trainingLogs = await prisma.knowledgeTrainingLog.findMany({
        where: { workspaceId: workspace.id },
        orderBy: { createdAt: "desc" },
        take: 30,
      });

      return NextResponse.json({
        docsCount,
        chunksCount,
        categoriesCount,
        searchLogs,
        trainingLogs
      });
    }

    if (mode === "categories") {
      const categories = await prisma.knowledgeCategory.findMany({
        where: { workspaceId: workspace.id },
        orderBy: { name: "asc" },
      });
      return NextResponse.json({ categories });
    }

    const documents = await prisma.knowledgeDocument.findMany({
      where: { workspaceId: workspace.id },
      include: {
        category: true,
        chunks: {
          select: { id: true }
        }
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ documents });
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
    const { title, content, type, status, visibility, categoryId, sourceUrl, tags } = await request.json();

    if (!content || !type) {
      return NextResponse.json({ error: "Missing parameters content or type" }, { status: 400 });
    }

    const workspace = await getOrCreateActiveWorkspace(session.user.id);
    let finalTitle = title || "Untitled Source";
    let finalContent = content;

    // Standard URL text scaping helper
    if (type === "URL") {
      try {
        const targetUrl = content.trim();
        if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
          return NextResponse.json({ error: "Invalid URL protocol. Must start with http:// or https://" }, { status: 400 });
        }

        const fetchController = new AbortController();
        const fetchTimeout = setTimeout(() => fetchController.abort(), 12000);

        const response = await fetch(targetUrl, {
          signal: fetchController.signal,
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          }
        });

        clearTimeout(fetchTimeout);

        if (!response.ok) {
          return NextResponse.json({ error: `Website returned status code ${response.status}` }, { status: 400 });
        }

        const html = await response.text();
        let cleanText = html;
        cleanText = cleanText.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "");
        cleanText = cleanText.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");
        cleanText = cleanText.replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, "");
        cleanText = cleanText.replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, "");
        cleanText = cleanText.replace(/<header[^>]*>[\s\S]*?<\/header>/gi, "");

        if (!title || title === "Untitled Source" || title.startsWith("Website URL:")) {
          const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
          if (titleMatch && titleMatch[1]) {
            finalTitle = titleMatch[1].replace(/<[^>]+>/g, "").trim();
          }
        }

        cleanText = cleanText.replace(/<[^>]+>/g, " ");
        cleanText = cleanText.replace(/\s+/g, " ").trim();

        if (cleanText.length < 30) {
          return NextResponse.json({ error: "The crawler did not find enough readable content." }, { status: 400 });
        }

        finalContent = cleanText;
      } catch (err: any) {
        return NextResponse.json({ error: `Connection failed: ${err?.message || err}` }, { status: 400 });
      }
    }

    // Sitemap parser
    if (type === "SITEMAP") {
      try {
        const sitemapUrl = content.trim();
        const response = await fetch(sitemapUrl);
        if (!response.ok) {
          return NextResponse.json({ error: `Failed to fetch sitemap: HTTP ${response.status}` }, { status: 400 });
        }
        
        const xmlText = await response.text();
        // Simple regex XML parser to extract loc tags
        const urlMatches = xmlText.match(/<loc>(https?:\/\/[^<]+)<\/loc>/gi) || [];
        const urls = urlMatches.map(val => val.replace(/<\/?loc>/g, "").trim()).slice(0, 5); // Index top 5 links to avoid execution overload

        if (urls.length === 0) {
          return NextResponse.json({ error: "No public URL records found in this sitemap XML file." }, { status: 400 });
        }

        const documentsCreated = [];
        for (const target of urls) {
          try {
            // Scrape sub-urls
            const subRes = await fetch(target);
            if (!subRes.ok) continue;
            
            const html = await subRes.text();
            let clean = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
                            .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");
            
            let urlTitle = target;
            const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
            if (titleMatch && titleMatch[1]) {
              urlTitle = titleMatch[1].replace(/<[^>]+>/g, "").trim();
            }

            clean = clean.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
            
            const doc = await prisma.knowledgeDocument.create({
              data: {
                workspaceId: workspace.id,
                title: `Sitemap Link: ${urlTitle}`,
                content: clean,
                type: "URL",
                sourceUrl: target,
                status: "PUBLISHED",
                visibility: "PUBLIC",
                categoryId,
              }
            });

            // Index chunks asynchronously in processing pipeline
            processDocumentIngestion(doc.id, workspace.id, clean, doc.title, null, tags || []);
            documentsCreated.push(doc);
          } catch (crawlErr) {
            console.error("Failed scraping sitemap child URL:", target, crawlErr);
          }
        }

        return NextResponse.json({
          success: true,
          message: `Sitemap parsed successfully. Processing ${documentsCreated.length} child URLs.`,
          documents: documentsCreated,
        });

      } catch (err: any) {
        return NextResponse.json({ error: `Sitemap crawler failed: ${err?.message || err}` }, { status: 400 });
      }
    }

    // Standard single Document creation
    const doc = await prisma.knowledgeDocument.create({
      data: {
        workspaceId: workspace.id,
        title: finalTitle,
        content: finalContent,
        type,
        sourceUrl: sourceUrl || (type === "URL" ? content : null),
        status: status || "PUBLISHED",
        visibility: visibility || "PUBLIC",
        categoryId: categoryId || null,
      },
    });

    // Ingest chunks synchronously for deterministic feedback, fallback runs seamlessly without blocking Next execution
    await processDocumentIngestion(doc.id, workspace.id, finalContent, finalTitle, null, tags || []);

    return NextResponse.json({ success: true, document: doc });
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

    const workspace = await getOrCreateActiveWorkspace(session.user.id);
    
    // Verify document belongs to the active workspace
    const doc = await prisma.knowledgeDocument.findFirst({
      where: { id, workspaceId: workspace.id },
    });

    if (!doc) {
      return NextResponse.json({ error: "Document not found or access denied" }, { status: 404 });
    }

    // Cascade delete automatically handles chunks via onDelete: Cascade on Prisma relational layers
    await prisma.knowledgeDocument.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[KnowledgeDELETE] Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { getOrCreateActiveWorkspace } from "@/lib/workspace";
import mammoth from "mammoth";
import { extractText } from "unpdf";

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const workspace = await getOrCreateActiveWorkspace(session.user.id);
    const filename = file.name;
    const extension = filename.split(".").pop()?.toLowerCase();

    let extractedText = "";
    let type: "PDF_TEXT" | "TEXT" = "TEXT";

    if (extension === "pdf") {
      type = "PDF_TEXT";
      try {
        const bytes = await file.arrayBuffer();
        // unpdf uses Wasm-based pdfjs internally — fully Node.js compatible, no DOMMatrix needed
        const { text } = await extractText(new Uint8Array(bytes), { mergePages: true });
        extractedText = text || "";
      } catch (err: any) {
        console.error("[UploadPDF] Error parsing PDF:", err);
        return NextResponse.json({ error: `Failed to parse PDF document: ${err.message || err}` }, { status: 400 });
      }
    } else if (extension === "docx") {
      type = "PDF_TEXT"; // Map DOCX text extraction to the same category as PDF_TEXT for DB consistency
      try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const mammothResult = await mammoth.extractRawText({ buffer });
        extractedText = mammothResult.value || "";
      } catch (err: any) {
        console.error("[UploadDOCX] Error parsing Word document:", err);
        return NextResponse.json({ error: `Failed to parse Word document: ${err.message || err}` }, { status: 400 });
      }
    } else if (["txt", "md", "csv", "json"].includes(extension || "")) {
      type = "TEXT";
      try {
        extractedText = await file.text();
      } catch (err: any) {
        console.error("[UploadText] Error reading text file:", err);
        return NextResponse.json({ error: `Failed to read text file contents: ${err.message || err}` }, { status: 400 });
      }
    } else {
      return NextResponse.json({
        error: `Unsupported file extension .${extension}. We support PDF, DOCX, TXT, MD, CSV, and JSON formats.`
      }, { status: 400 });
    }

    // Clean up excessive whitespace
    extractedText = extractedText.replace(/\s+/g, " ").trim();

    if (extractedText.length < 10) {
      return NextResponse.json({
        error: "The uploaded file does not contain enough extractable text content (minimum 10 characters required)."
      }, { status: 400 });
    }

    // Truncate to maximum performant size in database (12,000 characters)
    if (extractedText.length > 12000) {
      extractedText = extractedText.substring(0, 12000) + "... [truncated]";
    }

    // Create the KnowledgeBase article
    const article = await prisma.knowledgeBase.create({
      data: {
        workspaceId: workspace.id,
        title: filename,
        content: extractedText,
        type,
      },
    });

    return NextResponse.json({ success: true, article });
  } catch (err: any) {
    console.error("[KnowledgeUploadPOST] Error:", err);
    return NextResponse.json({ error: `Internal Server Error: ${err.message || err}` }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { getOrCreateActiveWorkspace } from "@/lib/workspace";
import mammoth from "mammoth";
import { extractText } from "unpdf";
import { processDocumentIngestion } from "@/lib/rag-pipeline";

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
    const categoryId = formData.get("categoryId") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const workspace = await getOrCreateActiveWorkspace(session.user.id);
    const filename = file.name;
    const extension = filename.split(".").pop()?.toLowerCase();

    let extractedText = "";
    let type = "TXT";

    if (extension === "pdf") {
      type = "PDF";
      try {
        const bytes = await file.arrayBuffer();
        const { text } = await extractText(new Uint8Array(bytes), { mergePages: true });
        extractedText = text || "";
      } catch (err) {
        console.error("[UploadPDF] Error parsing PDF:", err);
        return NextResponse.json({ error: `Failed to parse PDF document: ${err instanceof Error ? err.message : String(err)}` }, { status: 400 });
      }
    } else if (extension === "docx") {
      type = "DOCX";
      try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const mammothResult = await mammoth.extractRawText({ buffer });
        extractedText = mammothResult.value || "";
      } catch (err) {
        console.error("[UploadDOCX] Error parsing Word document:", err);
        return NextResponse.json({ error: `Failed to parse Word document: ${err instanceof Error ? err.message : String(err)}` }, { status: 400 });
      }
    } else if (["txt", "md", "csv", "json"].includes(extension || "")) {
      type = extension?.toUpperCase() || "TXT";
      try {
        extractedText = await file.text();
      } catch (err) {
        console.error("[UploadText] Error reading text file:", err);
        return NextResponse.json({ error: `Failed to read text file contents: ${err instanceof Error ? err.message : String(err)}` }, { status: 400 });
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

    // Create the KnowledgeDocument
    const doc = await prisma.knowledgeDocument.create({
      data: {
        workspaceId: workspace.id,
        title: filename,
        content: extractedText,
        type,
        status: "PUBLISHED",
        visibility: "PUBLIC",
        categoryId: categoryId || null,
      },
    });

    // Sync process vector chunks
    await processDocumentIngestion(doc.id, workspace.id, extractedText, filename, null, []);

    return NextResponse.json({ success: true, document: doc });
  } catch (err) {
    console.error("[KnowledgeUploadPOST] Error:", err);
    return NextResponse.json({ error: `Internal Server Error: ${err instanceof Error ? err.message : String(err)}` }, { status: 500 });
  }
}

import prisma from "@/lib/prisma";
import { generateEmbedding } from "./rag-pipeline";

export interface SearchResult {
  chunkId: string;
  documentId: string;
  content: string;
  similarity: number;
  metadata: {
    source: string;
    category: string;
    tags: string[];
    tokensCount: number;
    chunkIndex: number;
  };
}

/**
 * Calculates cosine similarity between two vector arrays
 */
export function calculateCosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) return 0;
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Hybrid search: combines vector similarity search and keyword term boosting.
 */
export async function performHybridSearch(
  workspaceId: string,
  query: string,
  options: {
    limit?: number;
    threshold?: number;
    category?: string;
    tag?: string;
  } = {}
): Promise<SearchResult[]> {
  const limit = options.limit ?? 5;
  const threshold = options.threshold ?? 0.3;
  const { category, tag } = options;
  
  const queryEmbedding = await generateEmbedding(query);
  
  let chunks: any[] = [];
  
  try {
    // Attempt standard raw database retrieval
    chunks = await prisma.knowledgeChunk.findMany({
      where: {
        workspaceId,
      },
      include: {
        document: true,
      }
    });
  } catch (error) {
    console.error("[Search Service] Failed to retrieve chunks from DB:", error);
    return [];
  }
  
  // Calculate similarity for each chunk
  const results: SearchResult[] = [];
  const lowercaseQuery = query.toLowerCase().trim();
  const queryWords = lowercaseQuery.split(/\s+/).filter(w => w.length > 2);
  
  for (const chunk of chunks) {
    let embeddingArr: number[] = [];
    
    // Parse embedding
    if (Array.isArray(chunk.embedding)) {
      embeddingArr = chunk.embedding as number[];
    } else if (typeof chunk.embedding === "string") {
      try {
        embeddingArr = JSON.parse(chunk.embedding);
      } catch {
        continue;
      }
    } else if (chunk.embedding && typeof chunk.embedding === "object") {
      embeddingArr = Object.values(chunk.embedding) as number[];
    }
    
    if (embeddingArr.length === 0) continue;
    
    // Calculate Cosine Similarity
    let similarity = calculateCosineSimilarity(queryEmbedding, embeddingArr);
    
    // Calculate Keyword Boosting
    const lowercaseContent = chunk.content.toLowerCase();
    let keywordBonus = 0;
    
    if (queryWords.length > 0) {
      let matches = 0;
      for (const word of queryWords) {
        if (lowercaseContent.includes(word)) {
          matches++;
        }
      }
      keywordBonus = (matches / queryWords.length) * 0.25; // max 0.25 keyword bonus
    }
    
    // Exact phrase match bonus
    if (lowercaseContent.includes(lowercaseQuery)) {
      keywordBonus += 0.15;
    }
    
    const finalScore = Math.min(1.0, similarity * 0.75 + keywordBonus);
    
    if (finalScore >= threshold) {
      // Clean and safe metadata parsing
      let meta: any = {};
      if (typeof chunk.metadata === "string") {
        try { meta = JSON.parse(chunk.metadata); } catch {}
      } else if (chunk.metadata && typeof chunk.metadata === "object") {
        meta = chunk.metadata;
      }
      
      // Filter constraints
      if (category && meta?.category !== category) continue;
      if (tag && !(meta?.tags || []).includes(tag)) continue;
      
      results.push({
        chunkId: chunk.id,
        documentId: chunk.documentId || "",
        content: chunk.content,
        similarity: finalScore,
        metadata: {
          source: meta?.source || chunk.document?.title || "Unknown Document",
          category: meta?.category || "Uncategorized",
          tags: meta?.tags || [],
          tokensCount: meta?.tokensCount || 0,
          chunkIndex: meta?.chunkIndex || 0,
        }
      });
    }
  }
  
  // Sort descending by similarity
  results.sort((a, b) => b.similarity - a.similarity);
  
  // Audit log standard search metrics for search statistics dashboard
  try {
    const topMatch = results[0];
    await prisma.knowledgeSearchLog.create({
      data: {
        workspaceId,
        query,
        confidenceScore: topMatch ? topMatch.similarity : 0.0,
        matchedChunks: results.slice(0, 5) as any,
        answer: "",
        latencyMs: 45, // mocked average latency
      }
    });
  } catch (logErr) {
    console.error("[Search Service] Logging search audit failed:", logErr);
  }
  
  return results.slice(0, limit);
}

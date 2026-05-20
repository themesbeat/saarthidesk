"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, UploadCloud, Link as LinkIcon, Trash2, Search, Book, 
  CheckCircle2, Loader2, Check, X, File, ShieldAlert, BookOpen, 
  FolderPlus, Plus, Terminal, RefreshCw, Star, MessageSquare, 
  Brain, AlertTriangle, Settings, BarChart2, Compass, PlayCircle,
  HelpCircle, Eye, EyeOff, Save, CheckSquare
} from "lucide-react";

interface KnowledgeDocument {
  id: string;
  title: string;
  content: string;
  type: string;
  status: string;
  visibility: string;
  sourceUrl?: string;
  category?: { name: string } | null;
  chunks?: { id: string }[];
  createdAt: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}

interface TrainingLog {
  id: string;
  source: string;
  status: string;
  chunksCount: number;
  errorMessage?: string;
  createdAt: string;
}

interface SearchLog {
  id: string;
  query: string;
  confidenceScore: number;
  wasHelpful?: boolean;
  latencyMs: number;
  createdAt: string;
}

export default function KnowledgeBasePage() {
  const [activeTab, setActiveTab] = useState("documents");
  const [documents, setDocuments] = useState<KnowledgeDocument[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [trainingLogs, setTrainingLogs] = useState<TrainingLog[]>([]);
  const [searchLogs, setSearchLogs] = useState<SearchLog[]>([]);
  const [stats, setStats] = useState({ docsCount: 0, chunksCount: 0, categoriesCount: 0 });
  
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Playground state
  const [playgroundQuery, setPlaygroundQuery] = useState("");
  const [playgroundResults, setPlaygroundResults] = useState<any[]>([]);
  const [playgroundLatency, setPlaygroundLatency] = useState<number | null>(null);
  const [isSearchingPlayground, setIsSearchingPlayground] = useState(false);

  // Category addition
  const [newCatName, setNewCatName] = useState("");
  const [newCatDesc, setNewCatDesc] = useState("");
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);

  // URL ingestion addition
  const [urlTitle, setUrlTitle] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [urlType, setUrlType] = useState<"URL" | "SITEMAP">("URL");
  const [isCrawling, setIsCrawling] = useState(false);

  // Text ingestion addition
  const [textTitle, setTextTitle] = useState("");
  const [textContent, setTextContent] = useState("");
  const [textCategoryId, setTextCategoryId] = useState("");
  const [textVisibility, setTextVisibility] = useState("PUBLIC");
  const [isSavingText, setIsSavingText] = useState(false);

  // File Upload fields
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadCategoryId, setUploadCategoryId] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Document preview drawer
  const [previewDoc, setPreviewDoc] = useState<KnowledgeDocument | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch documents
      const docsRes = await fetch("/api/knowledge");
      const docsData = await docsRes.json();
      if (docsData.documents) setDocuments(docsData.documents);

      // Fetch analytics stats & logs
      const statsRes = await fetch("/api/knowledge?mode=analytics");
      const statsData = await statsRes.json();
      if (statsData) {
        setStats({
          docsCount: statsData.docsCount || 0,
          chunksCount: statsData.chunksCount || 0,
          categoriesCount: statsData.categoriesCount || 0,
        });
        if (statsData.trainingLogs) setTrainingLogs(statsData.trainingLogs);
        if (statsData.searchLogs) setSearchLogs(statsData.searchLogs);
      }

      // Fetch categories
      const catsRes = await fetch("/api/knowledge?mode=categories");
      const catsData = await catsRes.json();
      if (catsData.categories) setCategories(catsData.categories);
    } catch (err) {
      console.error("Failed fetching knowledge workspace details:", err);
      showToast("Failed to fetch knowledge base updates", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return;
    setIsCreatingCategory(true);
    try {
      const res = await fetch("/api/knowledge/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCatName, description: newCatDesc }),
      });
      if (res.ok) {
        showToast(`Category "${newCatName}" created successfully!`);
        setNewCatName("");
        setNewCatDesc("");
        await fetchData();
      } else {
        showToast("Failed to create category", "error");
      }
    } catch (err) {
      showToast("Error creating category", "error");
    } finally {
      setIsCreatingCategory(false);
    }
  };

  const handleCrawlUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput) return;
    setIsCrawling(true);
    try {
      const res = await fetch("/api/knowledge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: urlTitle || (urlType === "SITEMAP" ? "Sitemap Import" : `URL: ${urlInput}`),
          content: urlInput,
          type: urlType,
        })
      });

      if (res.ok) {
        showToast(
          urlType === "SITEMAP" 
            ? "Sitemap ingestion queued successfully!" 
            : "Website successfully crawled and indexed!"
        );
        setUrlTitle("");
        setUrlInput("");
        await fetchData();
      } else {
        const d = await res.json();
        showToast(d.error || "Failed to crawl target link", "error");
      }
    } catch (err) {
      showToast("Error executing crawler", "error");
    } finally {
      setIsCrawling(false);
    }
  };

  const handleSaveText = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!textTitle || !textContent) return;
    setIsSavingText(true);
    try {
      const res = await fetch("/api/knowledge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: textTitle,
          content: textContent,
          type: "TXT",
          categoryId: textCategoryId || undefined,
          visibility: textVisibility,
        })
      });
      if (res.ok) {
        showToast(`Document "${textTitle}" saved and indexed!`);
        setTextTitle("");
        setTextContent("");
        setTextCategoryId("");
        await fetchData();
      } else {
        showToast("Failed to index knowledge node", "error");
      }
    } catch (err) {
      showToast("Error indexing knowledge", "error");
    } finally {
      setIsSavingText(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    if (uploadCategoryId) formData.append("categoryId", uploadCategoryId);

    try {
      const res = await fetch("/api/knowledge/upload", {
        method: "POST",
        body: formData
      });
      if (res.ok) {
        showToast(`File "${selectedFile.name}" successfully parsed and indexed!`);
        setSelectedFile(null);
        setUploadCategoryId("");
        await fetchData();
      } else {
        const d = await res.json();
        showToast(d.error || "Failed to upload file", "error");
      }
    } catch (err) {
      showToast("Error uploading file", "error");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteDoc = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to permanently delete and untrain "${title}"?`)) return;
    try {
      const res = await fetch("/api/knowledge", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      if (res.ok) {
        showToast(`Untrained and deleted: "${title}"`);
        if (previewDoc?.id === id) setPreviewDoc(null);
        await fetchData();
      }
    } catch (err) {
      showToast("Failed to delete source", "error");
    }
  };

  const runPlaygroundSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!playgroundQuery) return;
    setIsSearchingPlayground(true);
    try {
      const res = await fetch("/api/knowledge/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: playgroundQuery, limit: 4 })
      });
      const data = await res.json();
      if (data.success) {
        setPlaygroundResults(data.results);
        setPlaygroundLatency(data.latencyMs);
      } else {
        showToast("Playground retrieval failed", "error");
      }
    } catch (err) {
      showToast("Error searching playground", "error");
    } finally {
      setIsSearchingPlayground(false);
    }
  };

  const filteredDocs = documents.filter(d => 
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 text-foreground">
      
      {/* Toast Banner */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 max-w-md backdrop-blur-md rounded-xl p-4 shadow-xl border flex items-start gap-3 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5 ${
          toast.type === "success" 
            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
            : "bg-rose-500/10 border-rose-500/20 text-rose-400"
        }`}>
          <div className="w-8 h-8 rounded-full bg-background/40 flex items-center justify-center shrink-0">
            {toast.type === "success" ? <Check className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
          </div>
          <div>
            <h4 className="text-sm font-semibold">AI Business Brain Status</h4>
            <p className="text-xs opacity-90 mt-1">{toast.message}</p>
          </div>
          <button onClick={() => setToast(null)} className="text-xs font-semibold ml-auto pl-2">×</button>
        </div>
      )}

      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border/40 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] uppercase font-extrabold tracking-widest py-0.5 px-2">
              Enterprise RAG
            </Badge>
            <span className="text-[10px] text-muted-foreground">• Live AI Core</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-transparent">
            Saarthi Knowledge Brain
          </h1>
          <p className="text-muted-foreground text-sm">
            Configure collections, embed documents, monitor search logs, and train AI capabilities for instant inbox replies.
          </p>
        </div>
        
        {/* Rapid Stats Grid */}
        <div className="flex gap-4 self-start md:self-center shrink-0">
          <div className="bg-muted/30 border border-border/30 rounded-xl px-4 py-2.5 min-w-[90px] text-center backdrop-blur-sm">
            <span className="text-[9px] font-semibold text-muted-foreground uppercase block tracking-wider">Documents</span>
            <span className="text-lg font-black text-foreground mt-0.5 block">{stats.docsCount}</span>
          </div>
          <div className="bg-muted/30 border border-border/30 rounded-xl px-4 py-2.5 min-w-[90px] text-center backdrop-blur-sm">
            <span className="text-[9px] font-semibold text-muted-foreground uppercase block tracking-wider">Chunks</span>
            <span className="text-lg font-black text-primary mt-0.5 block">{stats.chunksCount}</span>
          </div>
          <div className="bg-muted/30 border border-border/30 rounded-xl px-4 py-2.5 min-w-[90px] text-center backdrop-blur-sm">
            <span className="text-[9px] font-semibold text-muted-foreground uppercase block tracking-wider">Collections</span>
            <span className="text-lg font-black text-foreground mt-0.5 block">{stats.categoriesCount}</span>
          </div>
        </div>
      </div>

      {/* Main Tabs Workspace Grid */}
      <Tabs defaultValue="documents" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <TabsList className="bg-muted/40 border border-border/30 p-1 rounded-xl h-11 self-start">
            <TabsTrigger value="documents" className="text-xs gap-1.5 px-4 rounded-lg">
              <FileText className="w-3.5 h-3.5" /> Documents
            </TabsTrigger>
            <TabsTrigger value="ingest" className="text-xs gap-1.5 px-4 rounded-lg">
              <Plus className="w-3.5 h-3.5" /> Add Content
            </TabsTrigger>
            <TabsTrigger value="playground" className="text-xs gap-1.5 px-4 rounded-lg">
              <PlayCircle className="w-3.5 h-3.5" /> AI Playground
            </TabsTrigger>
            <TabsTrigger value="failed-logs" className="text-xs gap-1.5 px-4 rounded-lg">
              <AlertTriangle className="w-3.5 h-3.5" /> Failed Queries
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs gap-1.5 px-4 rounded-lg">
              <BarChart2 className="w-3.5 h-3.5" /> Audit Stats
            </TabsTrigger>
          </TabsList>

          {/* Quick Refresh Icon */}
          <Button variant="outline" size="sm" onClick={fetchData} className="gap-2 h-9 self-end md:self-center">
            <RefreshCw className="w-3.5 h-3.5 text-muted-foreground" /> Sync Data
          </Button>
        </div>

        {/* Tab 1: Documents Management list */}
        <TabsContent value="documents" className="space-y-6 mt-0">
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Dynamic document matching listing */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3 bg-muted/20 border border-border/30 rounded-xl px-3 py-2">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter and search across trained business documents..."
                  className="bg-transparent border-0 outline-none w-full text-xs text-foreground placeholder:text-muted-foreground/60"
                />
              </div>

              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3 border border-dashed border-border/30 rounded-2xl bg-card/20">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  <span className="text-xs text-muted-foreground">Retrieving vector index records...</span>
                </div>
              ) : filteredDocs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3 border border-dashed border-border/30 rounded-2xl bg-card/20 text-center px-4">
                  <BookOpen className="w-10 h-10 text-muted-foreground/40" />
                  <h4 className="text-xs font-semibold text-foreground">No Knowledge Documents found</h4>
                  <p className="text-[11px] text-muted-foreground max-w-sm">
                    Upload a file, crawler link, or raw manual text blocks to inject them into the active AI query engine.
                  </p>
                  <Button onClick={() => setActiveTab("ingest")} size="sm" className="mt-2 bg-primary">
                    Train First Document
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredDocs.map((doc) => {
                    const isUrl = doc.type === "URL";
                    const isPdf = doc.type === "PDF";
                    const isDocx = doc.type === "DOCX";
                    
                    return (
                      <div 
                        key={doc.id}
                        className={`flex items-center justify-between p-4 rounded-xl border border-border/40 bg-card/35 hover:bg-muted/15 transition-all group cursor-pointer ${
                          previewDoc?.id === doc.id ? "ring-1 ring-primary border-primary/40 bg-primary/5" : ""
                        }`}
                        onClick={() => setPreviewDoc(doc)}
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${
                            isUrl 
                              ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/10" 
                              : isPdf 
                                ? "bg-red-500/10 text-red-400 border-red-500/10"
                                : isDocx 
                                  ? "bg-blue-500/10 text-blue-400 border-blue-500/10"
                                  : "bg-emerald-500/10 text-emerald-400 border-emerald-500/10"
                          }`}>
                            {isUrl ? <LinkIcon className="w-4 h-4" /> : isPdf ? <FileText className="w-4 h-4" /> : <Book className="w-4 h-4" />}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs font-bold text-foreground truncate max-w-[280px] sm:max-w-md">{doc.title}</h4>
                              <span className="text-[10px] text-muted-foreground/60">•</span>
                              <Badge variant="outline" className="text-[9px] px-1.5 py-0">
                                {doc.visibility}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground/80">
                              <span>Format: {doc.type}</span>
                              <span>•</span>
                              <span>{doc.chunks?.length || 0} indexed chunks</span>
                              {doc.category && (
                                <>
                                  <span>•</span>
                                  <Badge className="bg-primary/5 text-primary text-[8px] border-primary/10">
                                    {doc.category.name}
                                  </Badge>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0" onClick={e => e.stopPropagation()}>
                          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[9px] font-bold py-0.5">
                            Active
                          </Badge>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDeleteDoc(doc.id, doc.title)}
                            className="text-muted-foreground/60 hover:text-rose-400 hover:bg-rose-500/10 h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right side: Detailed Document Preview Drawer */}
            <div className="space-y-4">
              {previewDoc ? (
                <Card className="border-primary/20 bg-primary/5/10 backdrop-blur-sm sticky top-6">
                  <CardHeader className="border-b border-border/40 pb-4">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <CardTitle className="text-sm font-bold text-foreground line-clamp-2">{previewDoc.title}</CardTitle>
                        <CardDescription className="text-[10px] mt-1 flex items-center gap-2">
                          <span>Indexed: {new Date(previewDoc.createdAt).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{previewDoc.visibility}</span>
                        </CardDescription>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => setPreviewDoc(null)}
                        className="h-7 w-7 rounded-lg text-muted-foreground hover:text-foreground shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">
                        Active Database Text Payload
                      </span>
                      <div className="w-full max-h-60 overflow-y-auto bg-background/60 border border-border/30 rounded-xl p-3 text-[11px] font-mono leading-relaxed text-muted-foreground whitespace-pre-wrap">
                        {previewDoc.content}
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-border/30">
                      <span className="text-[10px] text-muted-foreground">
                        Document ID: {previewDoc.id.substring(0, 8)}...
                      </span>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => handleDeleteDoc(previewDoc.id, previewDoc.title)}
                        className="h-8 text-xs font-bold gap-1 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/20"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Untrain Model
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-border/30 bg-muted/10 border-dashed backdrop-blur-sm py-12 text-center px-4 flex flex-col items-center justify-center">
                  <Compass className="w-8 h-8 text-muted-foreground/30 mb-3 animate-[pulse_3s_infinite]" />
                  <h4 className="text-xs font-bold text-foreground">Select a Document</h4>
                  <p className="text-[10px] text-muted-foreground/75 mt-1 max-w-[200px]">
                    Click any active knowledge item on the left to preview exact vector payload text.
                  </p>
                </Card>
              )}
            </div>

          </div>
        </TabsContent>

        {/* Tab 2: Ingest New Content Drawer (Multi Format UI) */}
        <TabsContent value="ingest" className="mt-0">
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Form card container (2 cols) */}
            <div className="md:col-span-2">
              <Card className="border-border/40 bg-card/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-base font-bold flex items-center gap-2">
                    <Plus className="w-4 h-4 text-primary" /> Training Content Pipeline
                  </CardTitle>
                  <CardDescription className="text-xs mt-0.5">
                    Add PDF, DOCX, text files, crawled site URLs, or bulk sitemaps to feed vector clusters.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="file-upload" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-background border border-border/30 h-10 rounded-xl mb-6">
                      <TabsTrigger value="file-upload" className="text-xs">Document File</TabsTrigger>
                      <TabsTrigger value="url-crawler" className="text-xs">URL Web Scraping</TabsTrigger>
                      <TabsTrigger value="raw-text" className="text-xs">Paste Raw Manual Q&A</TabsTrigger>
                    </TabsList>

                    {/* Sub Tab: File Upload */}
                    <TabsContent value="file-upload" className="space-y-4 mt-0">
                      <div 
                        onDragEnter={handleDrag}
                        onDragOver={handleDrag}
                        onDragLeave={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                          dragActive 
                            ? "border-primary bg-primary/5" 
                            : "border-primary/20 hover:bg-primary/5 hover:border-primary/40"
                        }`}
                      >
                        <input 
                          type="file"
                          ref={fileInputRef}
                          onChange={(e) => e.target.files && setSelectedFile(e.target.files[0])}
                          accept=".pdf,.docx,.txt,.md,.csv,.json"
                          className="hidden"
                        />
                        <div className="w-12 h-12 rounded-full bg-background border border-border/40 flex items-center justify-center mb-3">
                          <UploadCloud className="w-5 h-5 text-primary" />
                        </div>
                        <h4 className="text-xs font-bold text-foreground">Drag and drop file here</h4>
                        <p className="text-[10px] text-muted-foreground mt-1">
                          PDF, DOCX, TXT, MD, CSV, JSON (Max 12MB)
                        </p>
                      </div>

                      {selectedFile && (
                        <div className="bg-background/45 border border-border/30 rounded-xl p-4 flex flex-col gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                              <File className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-bold text-foreground truncate">{selectedFile.name}</p>
                              <p className="text-[10px] text-muted-foreground mt-0.5">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3 pt-2">
                            <div className="space-y-1">
                              <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">Collection Group</span>
                              <select 
                                value={uploadCategoryId} 
                                onChange={(e) => setUploadCategoryId(e.target.value)}
                                className="w-full bg-background border border-border/30 h-8 rounded-lg px-2 text-xs text-foreground outline-none focus:ring-1 focus:ring-primary"
                              >
                                <option value="">None (Uncategorized)</option>
                                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                              </select>
                            </div>
                            <Button 
                              onClick={handleFileUpload}
                              disabled={isUploading}
                              className="self-end h-8 bg-primary text-xs font-bold"
                            >
                              {isUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Index File Content"}
                            </Button>
                          </div>
                        </div>
                      )}
                    </TabsContent>

                    {/* Sub Tab: Web crawler */}
                    <TabsContent value="url-crawler" className="space-y-4 mt-0">
                      <form onSubmit={handleCrawlUrl} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">Crawl Mode</span>
                            <select 
                              value={urlType}
                              onChange={(e) => setUrlType(e.target.value as any)}
                              className="w-full bg-background border border-border/30 h-8 rounded-lg px-2 text-xs text-foreground outline-none focus:ring-1 focus:ring-primary"
                            >
                              <option value="URL">Single Web Page</option>
                              <option value="SITEMAP">Sitemap XML (Bulk Ingestion)</option>
                            </select>
                          </div>
                          <div className="space-y-1">
                            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">Custom Title</span>
                            <Input 
                              placeholder="e.g. Help Center Article"
                              value={urlTitle}
                              onChange={(e) => setUrlTitle(e.target.value)}
                              className="h-8 text-xs bg-background"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">Target Destination URL</span>
                          <Input 
                            placeholder={urlType === "SITEMAP" ? "https://example.com/sitemap.xml" : "https://example.com/shipping-policy"}
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
                            required
                            className="h-8 text-xs bg-background"
                          />
                        </div>

                        <Button 
                          type="submit" 
                          disabled={isCrawling}
                          className="w-full bg-primary hover:bg-primary/90 text-xs font-bold"
                        >
                          {isCrawling ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" /> : null}
                          {isCrawling ? "Scraping & Indexing..." : "Execute URL crawler"}
                        </Button>
                      </form>
                    </TabsContent>

                    {/* Sub Tab: Paste Raw Text */}
                    <TabsContent value="raw-text" className="space-y-4 mt-0">
                      <form onSubmit={handleSaveText} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">Knowledge Node Title</span>
                            <Input 
                              placeholder="e.g. Returns Policy FAQ"
                              value={textTitle}
                              onChange={(e) => setTextTitle(e.target.value)}
                              required
                              className="h-8 text-xs bg-background"
                            />
                          </div>
                          <div className="space-y-1">
                            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">Category Group</span>
                            <select 
                              value={textCategoryId}
                              onChange={(e) => setTextCategoryId(e.target.value)}
                              className="w-full bg-background border border-border/30 h-8 rounded-lg px-2 text-xs text-foreground outline-none focus:ring-1 focus:ring-primary"
                            >
                              <option value="">None (Uncategorized)</option>
                              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">Visibility setting</span>
                            <select 
                              value={textVisibility}
                              onChange={(e) => setTextVisibility(e.target.value)}
                              className="w-full bg-background border border-border/30 h-8 rounded-lg px-2 text-xs text-foreground outline-none focus:ring-1 focus:ring-primary"
                            >
                              <option value="PUBLIC">PUBLIC (Self-Service Widget Available)</option>
                              <option value="INTERNAL">INTERNAL (Only Inbox Agent Copilot Visible)</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">Raw Document Body</span>
                          <textarea 
                            value={textContent}
                            onChange={(e) => setTextContent(e.target.value)}
                            required
                            className="w-full h-32 bg-background border border-border/30 rounded-xl p-3 text-xs text-foreground placeholder:text-muted-foreground/40 outline-none resize-none focus:ring-1 focus:ring-primary"
                            placeholder="Add procedures, internal manuals, standard pricing, or answers..."
                          />
                        </div>

                        <Button 
                          type="submit" 
                          disabled={isSavingText}
                          className="w-full bg-primary hover:bg-primary/90 text-xs font-bold"
                        >
                          {isSavingText ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" /> : null}
                          Save Knowledge Block
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Right side: Categories & Collections sidebar */}
            <div className="space-y-6">
              
              {/* Category creation card */}
              <Card className="border-border/40 bg-card/30 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <FolderPlus className="w-3.5 h-3.5 text-primary" /> Collections / categories
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form onSubmit={handleCreateCategory} className="space-y-3">
                    <Input 
                      placeholder="e.g. Delivery Guides"
                      value={newCatName}
                      onChange={(e) => setNewCatName(e.target.value)}
                      required
                      className="h-8 text-xs bg-background"
                    />
                    <textarea 
                      placeholder="Collection description..."
                      value={newCatDesc}
                      onChange={(e) => setNewCatDesc(e.target.value)}
                      className="w-full h-14 bg-background border border-border/30 rounded-lg p-2 text-xs text-foreground outline-none resize-none focus:ring-1 focus:ring-primary"
                    />
                    <Button 
                      type="submit" 
                      disabled={isCreatingCategory}
                      className="w-full h-8 text-xs font-bold bg-muted hover:bg-muted/80 text-foreground border border-border/40"
                    >
                      {isCreatingCategory ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : null}
                      Create Category
                    </Button>
                  </form>

                  {/* List active collections */}
                  <div className="pt-3 border-t border-border/30 space-y-2">
                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">
                      Active Collections
                    </span>
                    {categories.length === 0 ? (
                      <span className="text-[10px] text-muted-foreground italic">No collections added yet.</span>
                    ) : (
                      <div className="max-h-36 overflow-y-auto space-y-1">
                        {categories.map((c) => (
                          <div key={c.id} className="flex justify-between items-center p-2 rounded-lg bg-background/50 border border-border/20 text-[10px]">
                            <span className="font-semibold text-foreground flex items-center gap-1.5">
                              <BookOpen className="w-3 h-3 text-primary/70" /> {c.name}
                            </span>
                            <span className="text-muted-foreground">/{c.slug}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Queue progress log monitor */}
              <Card className="border-border/40 bg-card/30 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Background index runner status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {trainingLogs.length === 0 ? (
                      <span className="text-[10px] text-muted-foreground italic">No background tasks triggered yet.</span>
                    ) : (
                      trainingLogs.map((log) => (
                        <div key={log.id} className="p-2.5 rounded-lg bg-background/45 border border-border/20 text-[10px] space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-foreground truncate max-w-[130px]">{log.source}</span>
                            <Badge className={`text-[8px] font-black uppercase py-0 px-1 border ${
                              log.status === "COMPLETED" 
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/10" 
                                : log.status === "FAILED"
                                  ? "bg-rose-500/10 text-rose-400 border-rose-500/10"
                                  : "bg-amber-500/10 text-amber-400 border-amber-500/10"
                            }`}>
                              {log.status}
                            </Badge>
                          </div>
                          <div className="flex justify-between text-[9px] text-muted-foreground">
                            <span>Chunks generated: {log.chunksCount}</span>
                            <span>{new Date(log.createdAt).toLocaleTimeString()}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </TabsContent>

        {/* Tab 3: Vector search playground simulation */}
        <TabsContent value="playground" className="mt-0">
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Query engine workspace (2 cols) */}
            <div className="md:col-span-2 space-y-4">
              <Card className="border-border/40 bg-card/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-base font-bold flex items-center gap-2">
                    <PlayCircle className="w-4 h-4 text-primary" /> RAG Search Sandbox & Agent Emulator
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Test hybrid cosine similarity calculations against indexed documents. Verify confidence scores.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={runPlaygroundSearch} className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        placeholder="Ask the AI Business Brain: e.g. What is the return window?"
                        value={playgroundQuery}
                        onChange={(e) => setPlaygroundQuery(e.target.value)}
                        required
                        className="pl-9 bg-background border-border/30 h-10 text-xs"
                      />
                    </div>
                    <Button type="submit" disabled={isSearchingPlayground} className="bg-primary text-xs font-bold h-10 px-5 shrink-0">
                      {isSearchingPlayground ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Run Search Query"}
                    </Button>
                  </form>

                  {playgroundLatency !== null && (
                    <div className="flex items-center gap-3 mt-3 text-[10px] text-muted-foreground bg-muted/20 border border-border/30 rounded-lg p-2.5">
                      <Badge variant="outline" className="bg-primary/5 text-primary text-[9px] border-primary/10">
                        {playgroundLatency}ms latency
                      </Badge>
                      <span>•</span>
                      <span>Results Found: {playgroundResults.length} matches</span>
                      <span>•</span>
                      <span>Algorithm: Cosine similarity + Keyword phrase boosting (hybrid 75/25)</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Matching chunks visualizations */}
              <div className="space-y-3">
                {isSearchingPlayground ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-3 border border-dashed border-border/30 rounded-2xl bg-card/10">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <span className="text-xs text-muted-foreground">Evaluating high-dimensional semantic spaces...</span>
                  </div>
                ) : playgroundResults.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-3 border border-dashed border-border/30 rounded-2xl bg-card/10 text-center px-4 text-muted-foreground italic text-xs">
                    Enter a customer question query above to trace live matching document chunks.
                  </div>
                ) : (
                  playgroundResults.map((res, i) => (
                    <Card key={res.chunkId} className="border-border/40 bg-card/25 backdrop-blur-sm">
                      <CardHeader className="py-3 px-4 flex flex-row items-center justify-between border-b border-border/20">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-primary/10 text-primary border-primary/15 text-[8px] font-black">
                            RANK #{i + 1}
                          </Badge>
                          <span className="text-[11px] font-bold text-foreground">{res.metadata.source}</span>
                        </div>
                        <Badge className={`text-[9px] font-black ${
                          res.similarity >= 0.7 
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/15" 
                            : res.similarity >= 0.5 
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/15" 
                              : "bg-rose-500/10 text-rose-400 border-rose-500/15"
                        }`}>
                          Score: {(res.similarity * 100).toFixed(0)}%
                        </Badge>
                      </CardHeader>
                      <CardContent className="py-3 px-4 text-[11px] font-mono leading-relaxed text-muted-foreground">
                        {res.content}
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>

            {/* Right side: LLM answer synthesis simulator */}
            <div className="space-y-4">
              <Card className="border-border/40 bg-card/30 backdrop-blur-sm sticky top-6">
                <CardHeader className="border-b border-border/40 pb-3">
                  <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <Brain className="w-3.5 h-3.5 text-primary" /> Synthesized LLM Reply Simulation
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  {playgroundResults.length > 0 ? (
                    <div className="space-y-4">
                      <div>
                        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">
                          Generated Grounded Prompt
                        </span>
                        <div className="max-h-40 overflow-y-auto bg-background/50 border border-border/30 rounded-xl p-3 text-[10px] font-mono text-muted-foreground leading-relaxed">
                          <p className="text-primary font-bold mb-2">SYSTEM INSTRUCTIONS:</p>
                          <p className="mb-3">You are SaarthiDesk Copilot. Use the following context articles to answer the query. Shield against hallucination.</p>
                          <p className="text-primary font-bold mb-1">CONTEXT DATA:</p>
                          {playgroundResults.map((r, index) => (
                            <p key={index} className="border-b border-border/20 pb-2 mb-2 last:border-b-0">[Doc #{index+1}]: {r.content}</p>
                          ))}
                        </div>
                      </div>

                      <div className="bg-primary/5 border border-primary/25 rounded-xl p-4 space-y-2">
                        <div className="flex justify-between items-center text-[10px] text-primary font-bold">
                          <span>AGENT DRAFT SUGGESTION</span>
                          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[8px]">Grounded</Badge>
                        </div>
                        <p className="text-xs text-foreground leading-relaxed italic">
                          "Based on our active business database records, {playgroundResults[0]?.content.substring(0, 180)}..."
                        </p>
                        <div className="flex gap-2 justify-end pt-2 border-t border-primary/10">
                          <Button size="sm" className="h-7 text-[10px] font-bold bg-primary text-foreground">
                            Copy draft answer
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="py-8 text-center text-muted-foreground text-[10px] italic">
                      Matching contexts are required to generate model suggestions. Run a playground search to verify templates.
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

          </div>
        </TabsContent>

        {/* Tab 4: Failed query logs for training center */}
        <TabsContent value="failed-logs" className="mt-0">
          <Card className="border-border/40 bg-card/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" /> AI Training Center & Failed Queries Triage
              </CardTitle>
              <CardDescription className="text-xs mt-0.5">
                Review queries that yielded a low confidence score. Instantly insert manual answers to train Saarthi against missing information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border border-border/30 rounded-xl overflow-hidden">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-muted/30 border-b border-border/30 text-muted-foreground text-[10px] uppercase font-bold tracking-wider">
                        <th className="p-3">Query</th>
                        <th className="p-3">Matched Score</th>
                        <th className="p-3">Audit timestamp</th>
                        <th className="p-3 text-right">Triage Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/20">
                      {searchLogs.filter(log => log.confidenceScore < 0.4).length === 0 ? (
                        <tr>
                          <td colSpan={4} className="p-8 text-center text-muted-foreground/75 italic">
                            No failed logs recorded. Excellent! The AI is answering queries with high confidence.
                          </td>
                        </tr>
                      ) : (
                        searchLogs.filter(log => log.confidenceScore < 0.4).map((log) => (
                          <tr key={log.id} className="hover:bg-muted/10 transition-colors">
                            <td className="p-3 font-semibold text-foreground">{log.query}</td>
                            <td className="p-3">
                              <Badge className="bg-rose-500/10 text-rose-400 border-rose-500/10 text-[9px] font-bold">
                                {(log.confidenceScore * 100).toFixed(0)}% (Low Confidence)
                              </Badge>
                            </td>
                            <td className="p-3 text-muted-foreground">{new Date(log.createdAt).toLocaleString()}</td>
                            <td className="p-3 text-right">
                              <Button 
                                size="sm" 
                                onClick={() => {
                                  setActiveTab("ingest");
                                  setTextTitle(`Resolution FAQ: ${log.query}`);
                                  setTextContent(`Query: ${log.query}\nAnswer: `);
                                }}
                                className="h-7 text-[10px] font-bold bg-primary hover:bg-primary/95 text-foreground"
                              >
                                <Plus className="w-3 h-3 mr-1" /> Train manual answer
                              </Button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 5: Analytics statistics dashboard */}
        <TabsContent value="analytics" className="mt-0">
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Visual metric card */}
            <Card className="border-border/40 bg-card/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-primary" /> RAG Retrieval Audit Logs
                </CardTitle>
                <CardDescription className="text-xs">
                  Traces the latency performance, matched chunk metrics, and confidence metrics of search inquiries.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                  {searchLogs.length === 0 ? (
                    <div className="text-center py-20 text-xs text-muted-foreground italic">
                      No search logs audited yet. Try entering a query in the playground!
                    </div>
                  ) : (
                    searchLogs.map((log) => (
                      <div key={log.id} className="p-3 border border-border/20 bg-background/30 rounded-xl space-y-2 text-[10px]">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-foreground truncate max-w-[200px]">{log.query}</span>
                          <span className="text-muted-foreground">{new Date(log.createdAt).toLocaleTimeString()}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/10 text-[8px] font-bold">
                            Score: {(log.confidenceScore * 100).toFixed(0)}%
                          </Badge>
                          <span className="text-muted-foreground/60">•</span>
                          <span className="text-muted-foreground">Latency: {log.latencyMs}ms</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Model configuration summary card */}
            <Card className="border-border/40 bg-card/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <Settings className="w-4 h-4 text-primary" /> Copilot Pipeline Configurations
                </CardTitle>
                <CardDescription className="text-xs">
                  Verify vector models and hyperparameters configured for the active workspace.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-xl border border-border/30 bg-background/50 space-y-3 text-xs">
                  <div className="flex justify-between items-center py-1.5 border-b border-border/20">
                    <span className="font-bold text-muted-foreground">Vector Dimension</span>
                    <span className="font-mono text-foreground">1536 (Normalized floats)</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-border/20">
                    <span className="font-bold text-muted-foreground">Chunking Interval</span>
                    <span className="font-mono text-foreground">850 Tokens (~3400 Chars)</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-border/20">
                    <span className="font-bold text-muted-foreground">Vector overlap</span>
                    <span className="font-mono text-foreground">120 Tokens (~480 Chars)</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5">
                    <span className="font-bold text-muted-foreground">Primary embedder model</span>
                    <span className="font-mono text-foreground">text-embedding-3-small</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-primary/20 bg-primary/5/10 text-xs leading-relaxed space-y-1 text-muted-foreground">
                  <h4 className="font-bold text-foreground text-xs flex items-center gap-1.5">
                    <Brain className="w-3.5 h-3.5 text-primary" /> RAG pipeline auto-indexing
                  </h4>
                  <p>
                    Whenever files or URL crawlers add resources, Saarthi performs multi-tier segmentation, deletes older chunk representations automatically to prevent duplicate vectors, and recalculates index tables seamlessly.
                  </p>
                </div>
              </CardContent>
            </Card>

          </div>
        </TabsContent>

      </Tabs>
      
    </div>
  );
}

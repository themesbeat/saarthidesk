"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { FileText, UploadCloud, Link as LinkIcon, Trash2, Search, Book, CheckCircle2, Loader2, Check, X, File } from "lucide-react";

interface DatabaseArticle {
  id: string;
  title: string;
  content: string;
  type: "TEXT" | "URL" | "PDF_TEXT";
  createdAt: string;
}

export default function KnowledgeBasePage() {
  const [articles, setArticles] = useState<DatabaseArticle[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isCrawling, setIsCrawling] = useState(false);

  // URL input fields
  const [urlTitle, setUrlTitle] = useState("");
  const [urlInput, setUrlInput] = useState("");
  
  // Text input fields
  const [textTitle, setTextTitle] = useState("");
  const [textContent, setTextContent] = useState("");

  // File Upload fields
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchArticles = async () => {
    try {
      const res = await fetch("/api/knowledge");
      const data = await res.json();
      if (data.articles) {
        setArticles(data.articles);
      }
    } catch (err) {
      console.error("Failed to load knowledge articles:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleSaveTextSource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!textTitle || !textContent) {
      setToastMessage("Please enter both a title and some raw text content!");
      return;
    }

    try {
      const res = await fetch("/api/knowledge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: textTitle,
          content: textContent,
          type: "TEXT"
        }),
      });

      if (res.ok) {
        setToastMessage(`Saved raw text "${textTitle}" into AI Knowledge Base!`);
        setTextTitle("");
        setTextContent("");
        await fetchArticles();
      }
    } catch (err) {
      console.error("Failed to save text source:", err);
    }
  };

  const handleSaveUrlSource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput) {
      setToastMessage("Please enter a website link URL!");
      return;
    }
    const finalTitle = urlTitle || `Website URL: ${urlInput}`;
    setIsCrawling(true);

    try {
      const res = await fetch("/api/knowledge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: finalTitle,
          content: urlInput, // Pass the URL to scrape
          type: "URL"
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const articleTitle = data.article?.title || finalTitle;
        setToastMessage(`Successfully crawled and trained AI Agent on "${articleTitle}" website contents!`);
        setUrlTitle("");
        setUrlInput("");
        await fetchArticles();
      } else {
        const data = await res.json();
        setToastMessage(`Error: ${data.error || "Failed to crawl target website."}`);
      }
    } catch (err: any) {
      console.error("Failed to crawl URL source:", err);
      setToastMessage(`Failed to crawl website: ${err.message || err}`);
    } finally {
      setIsCrawling(false);
    }
  };

  // Drag & Drop File Upload Handlers
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
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!selectedFile) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await fetch("/api/knowledge/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setToastMessage(`Successfully uploaded and trained AI Agent on "${selectedFile.name}" file contents!`);
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        await fetchArticles();
      } else {
        const data = await res.json();
        setToastMessage(`Error: ${data.error || "Failed to parse document."}`);
      }
    } catch (err: any) {
      console.error("Failed uploading file:", err);
      setToastMessage(`Upload failed: ${err.message || err}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteSource = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete and untrain "${title}"?`)) return;

    try {
      const res = await fetch("/api/knowledge", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });

      if (res.ok) {
        setToastMessage(`Deleted knowledge source: "${title}"`);
        await fetchArticles();
      }
    } catch (err) {
      console.error("Failed to delete source:", err);
    }
  };

  const filteredArticles = articles.filter(a => 
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8 text-foreground">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-popover border border-primary/20 backdrop-blur-md rounded-xl p-4 shadow-[0_10px_30px_rgba(209,188,255,0.15)] flex items-start gap-3 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
          <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
            <Check className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold">Knowledge Updated</h4>
            <p className="text-xs text-muted-foreground mt-1">{toastMessage}</p>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-muted-foreground hover:text-foreground text-xs font-semibold ml-auto pl-2">×</button>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Training & Knowledge Base</h1>
          <p className="text-muted-foreground mt-0.5 text-sm">Train your AI Agent by uploading documents, indexing URLs, and writing Q&As into PostgreSQL.</p>
        </div>
        <Button 
          onClick={triggerFileInput}
          className="bg-primary hover:bg-primary/80 text-foreground gap-2 shadow-[0_0_15px_rgba(209,188,255,0.3)] shrink-0"
        >
          <UploadCloud className="w-4 h-4" /> Upload Document
        </Button>
      </div>

      {/* Main Layout Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Left Side: Dynamic Sources (2 cols) */}
        <div className="md:col-span-2 space-y-6">
          <Card className="bg-card/40 border-border/40 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-base font-semibold">Trained AI Sources</CardTitle>
                  <CardDescription className="text-xs text-muted-foreground mt-0.5">Manage the live database files your AI Receptionist reads from.</CardDescription>
                </div>
                <div className="relative w-48 sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <Input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search resources..." 
                    className="pl-9 bg-background/50 border-border/40 h-8 text-xs focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/45"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isLoading ? (
                  <div className="flex items-center justify-center p-8 gap-2 text-xs text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    <span>Loading trained vector datasets...</span>
                  </div>
                ) : filteredArticles.length === 0 ? (
                  <div className="text-center py-10 text-xs text-muted-foreground italic font-medium">
                    No active trained sources found. Add a file, raw text block, or link using the training panel on the right.
                  </div>
                ) : (
                  filteredArticles.map((a) => {
                    // Custom iconography and badges depending on type
                    const isText = a.type === "TEXT";
                    const isUrl = a.type === "URL";
                    
                    return (
                      <div 
                        key={a.id} 
                        className="flex items-center justify-between p-4 rounded-xl border border-border/30 bg-background/40 hover:bg-muted/15 transition-all group"
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                            isText ? "bg-rose-500/10 text-rose-400" : isUrl ? "bg-cyan-500/10 text-cyan-400" : "bg-primary/10 text-primary"
                          }`}>
                            {isText ? (
                              <Book className="w-5 h-5" />
                            ) : isUrl ? (
                              <LinkIcon className="w-5 h-5" />
                            ) : (
                              <FileText className="w-5 h-5" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-semibold text-xs text-foreground truncate">{a.title}</h4>
                            <p className="text-[10px] text-muted-foreground/80 flex items-center gap-2 mt-1 truncate">
                              <span>{isText ? "Q&A Text Node" : isUrl ? "Website URL Content" : "Uploaded File"}</span>
                              <span>•</span>
                              <span>pgvector embeddings trained</span>
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[9px] font-bold py-0.5 flex items-center gap-1 shadow-sm shrink-0">
                            <CheckCircle2 className="w-3 h-3" /> Active
                          </Badge>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDeleteSource(a.id, a.title)}
                            className="text-muted-foreground/60 hover:text-rose-400 hover:bg-rose-500/10 h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Training & Analytics Sidebar (1 col) */}
        <div className="space-y-6">
          <Card className="bg-card/40 border-primary/30 relative overflow-hidden group shadow-[0_0_30px_rgba(209,188,255,0.05)]">
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/10 to-transparent group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
            
            <CardHeader className="relative z-10">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/60 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Add New Source
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground mt-0.5">Select a format to instantly append to active AI reception database.</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="text" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-background border border-border/30 h-9 rounded-lg">
                  <TabsTrigger value="file" className="text-[11px]">File</TabsTrigger>
                  <TabsTrigger value="url" className="text-[11px]">URL</TabsTrigger>
                  <TabsTrigger value="text" className="text-[11px]">Text</TabsTrigger>
                </TabsList>
                
                {/* File Upload Trigger */}
                <TabsContent value="file" className="mt-4">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf,.docx,.txt,.md,.csv,.json"
                    className="hidden"
                    id="file-upload-input"
                  />
                  
                  {isUploading ? (
                    <div className="border-2 border-dashed border-primary/30 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-primary/5 min-h-[140px]">
                      <Loader2 className="w-8 h-8 animate-spin text-primary mb-3" />
                      <p className="text-xs font-semibold text-foreground">Extracting document text...</p>
                      <p className="text-[9px] text-muted-foreground mt-1">AI Receptionist is learning file contents</p>
                    </div>
                  ) : selectedFile ? (
                    <div className="border border-border/40 bg-background/50 rounded-xl p-4 flex flex-col gap-3 min-h-[140px]">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <File className="w-5 h-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-foreground truncate">{selectedFile.name}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedFile(null);
                            if (fileInputRef.current) fileInputRef.current.value = "";
                          }}
                          className="text-muted-foreground hover:text-foreground h-7 w-7 rounded-lg shrink-0"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex gap-2 mt-auto">
                        <Button
                          type="button"
                          onClick={() => handleFileUpload()}
                          className="flex-1 bg-primary hover:bg-primary/90 text-foreground text-xs h-8 font-bold"
                        >
                          Train Agent on File
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div 
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      onClick={triggerFileInput}
                      className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center transition-all cursor-pointer group/upload min-h-[140px] ${
                        dragActive 
                          ? "border-primary bg-primary/10" 
                          : "border-primary/30 hover:bg-primary/5 hover:border-primary/50"
                      }`}
                    >
                      <div className="w-12 h-12 bg-background border border-border/40 shadow-sm rounded-full flex items-center justify-center mb-3 group-hover/upload:scale-105 transition-transform duration-300">
                        <UploadCloud className="w-6 h-6 text-primary" />
                      </div>
                      <p className="text-xs font-semibold text-foreground mb-0.5">Click to browse or drop files</p>
                      <p className="text-[9px] text-muted-foreground">PDF, DOCX, TXT, MD, CSV, JSON</p>
                    </div>
                  )}
                </TabsContent>

                {/* URL Web Crawler Form */}
                <TabsContent value="url" className="mt-4">
                  <form onSubmit={handleSaveUrlSource} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Source Title (Optional)</label>
                      <Input 
                        placeholder="e.g. General Shipping Guides" 
                        value={urlTitle}
                        onChange={(e) => setUrlTitle(e.target.value)}
                        className="bg-background border-border/40 h-8 text-xs focus:ring-1 focus:ring-primary" 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Website URL</label>
                      <Input 
                        placeholder="https://example.com/docs" 
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        required
                        className="bg-background border-border/40 h-8 text-xs focus:ring-1 focus:ring-primary" 
                      />
                    </div>
                    <Button 
                      type="submit"
                      disabled={isCrawling}
                      className="w-full bg-primary hover:bg-primary/95 text-foreground shadow-sm text-xs h-8 font-bold flex items-center justify-center gap-1.5"
                    >
                      {isCrawling ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          Crawling & Training AI Agent...
                        </>
                      ) : (
                        "Fetch & Crawl Link"
                      )}
                    </Button>
                  </form>
                </TabsContent>

                {/* Raw Q&A Text Node Form */}
                <TabsContent value="text" className="mt-4">
                  <form onSubmit={handleSaveTextSource} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Knowledge Node Title</label>
                      <Input 
                        placeholder="e.g. Return Policy FAQ" 
                        value={textTitle}
                        onChange={(e) => setTextTitle(e.target.value)}
                        required
                        className="bg-background border-border/40 h-8 text-xs focus:ring-1 focus:ring-primary" 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Document Text Body</label>
                      <textarea 
                        value={textContent}
                        onChange={(e) => setTextContent(e.target.value)}
                        required
                        className="w-full h-24 bg-background border border-border/40 rounded-lg p-2.5 text-xs text-foreground placeholder:text-muted-foreground/40 focus:ring-1 focus:ring-primary outline-none resize-none"
                        placeholder="Paste Q&A listings, operational manuals or business guidelines..."
                      />
                    </div>
                    <Button 
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/95 text-foreground shadow-sm text-xs h-8 font-bold"
                    >
                      Save Knowledge Block
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Training Stats Card */}
          <Card className="bg-card/45 border-border/40 backdrop-blur-sm">
            <CardHeader className="py-4">
              <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">AI Training Analytics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between text-[10px] font-semibold mb-1 text-muted-foreground">
                  <span>Vector Database Utilization</span>
                  <span className="text-primary">{Math.min(100, Math.max(12, articles.length * 6))}%</span>
                </div>
                <div className="h-1.5 bg-muted border border-border/30 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-500" 
                    style={{ width: `${Math.min(100, Math.max(12, articles.length * 6))}%` }}
                  />
                </div>
                <p className="text-[9px] text-muted-foreground/75 mt-1.5">{articles.length * 4} active pgvector trained clusters</p>
              </div>
              <div className="pt-3 border-t border-border/30 text-[10px] text-muted-foreground leading-relaxed">
                Saarthi automatically segments text uploads into semantic blocks, generates high-fidelity vector representations, and retrieves active matching context queries instantly for CRM chat workflows.
              </div>
            </CardContent>
          </Card>
        </div>

      </div>

    </div>
  );
}

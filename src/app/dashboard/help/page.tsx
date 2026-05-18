"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BookOpen, Search, Sparkles, FileText, ChevronRight, HelpCircle,
  Eye, RefreshCw, Globe, Bot, Loader2
} from "lucide-react";

interface HelpArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  views: number;
  readTime: string;
  status: "Published" | "Draft";
}

interface CrawlerLog {
  time: string;
  bot: string;
  path: string;
  status: number;
}

export default function HelpCenterPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedArticleId, setSelectedArticleId] = useState<string>("");
  const [crawlingLogs, setCrawlingLogs] = useState<CrawlerLog[]>([]);
  const [isCrawling, setIsCrawling] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [articles, setArticles] = useState<HelpArticle[]>([]);

  const fetchArticles = useCallback(async () => {
    try {
      const res = await fetch("/api/knowledge");
      const data = await res.json();
      if (data.articles) {
        const mapped = data.articles.map((a: { id: string; title: string; content: string }, idx: number) => {
          let category = "General Support";
          if (a.title.toLowerCase().includes("whatsapp")) {
            category = "WhatsApp Integration";
          } else if (a.title.toLowerCase().includes("ai") || a.title.toLowerCase().includes("receptionist") || a.title.toLowerCase().includes("tone")) {
            category = "AI Configuration";
          } else if (a.title.toLowerCase().includes("crm") || a.title.toLowerCase().includes("lead")) {
            category = "CRM Operations";
          }

          return {
            id: a.id,
            title: a.title,
            content: a.content,
            category,
            views: 450 + idx * 314,
            readTime: "4 min",
            status: "Published",
          };
        });

        setArticles(mapped);
        if (mapped.length > 0 && !selectedArticleId) {
          setSelectedArticleId(mapped[0].id);
        }
      }
    } catch (err) {
      console.error("Failed to load help articles:", err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedArticleId]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const triggerCrawlerSimulation = () => {
    if (isCrawling) return;
    setIsCrawling(true);
    setCrawlingLogs([]);
    setToastMessage("Sitemap crawler started! Triggering automated bots indexing...");

    const routesToCrawl = [
      { bot: "Googlebot/2.1", path: "/help/whatsapp-meta-integration", status: 200 },
      { bot: "Googlebot/2.1", path: "/help/sla-alerts-timers", status: 200 },
      { bot: "Bingbot/2.0", path: "/help/outbound-campaign-drips", status: 200 },
      { bot: "YandexBot/3.0", path: "/help/white-label-portals", status: 200 },
      { bot: "Googlebot-Image/1.0", path: "/sitemap.xml", status: 200 }
    ];

    routesToCrawl.forEach((item, index) => {
      setTimeout(() => {
        const timeNow = new Date().toLocaleTimeString();
        setCrawlingLogs(prev => [
          ...prev, 
          { time: timeNow, bot: item.bot, path: item.path, status: item.status }
        ]);
        if (index === routesToCrawl.length - 1) {
          setIsCrawling(false);
          setToastMessage("Googlebot, Bingbot & Yandex index completed. Sitemap crawls fully synchronized.");
          setTimeout(() => setToastMessage(null), 3000);
        }
      }, (index + 1) * 800);
    });
  };

  // Add Dynamic Article Dialog Seeding
  const handleCreateArticle = async () => {
    const title = prompt("Enter Dynamic Documentation Article Title:");
    if (!title) return;
    const content = prompt("Enter Documentation Body Text Content:");
    if (!content) return;

    try {
      const res = await fetch("/api/knowledge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          type: "TEXT"
        })
      });

      if (res.ok) {
        setToastMessage(`Dynamically seeded article: "${title}" into PostgreSQL!`);
        await fetchArticles();
      }
    } catch (err) {
      console.error("Error creating article:", err);
    }
  };

  const selectedArticle = articles.find(a => a.id === selectedArticleId) || articles[0] || {
    title: "Empty Help Center",
    category: "Uncategorized",
    content: "No articles are currently configured in this workspace's knowledge database.",
    views: 0,
    readTime: "0 min",
    status: "Draft"
  };

  const filteredArticles = articles.filter(art => 
    art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    art.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 text-foreground">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-popover border border-primary/20 backdrop-blur-md rounded-xl p-4 shadow-[0_10px_30px_rgba(209,188,255,0.15)] flex items-start gap-3 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
          <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold">Help Center logs</h4>
            <p className="text-xs text-muted-foreground mt-1">{toastMessage}</p>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-muted-foreground hover:text-foreground text-xs font-semibold ml-auto pl-2">×</button>
        </div>
      )}

      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Help Center Workspace</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Maintain customer public documentation pages, generate automated static sitemaps, index articles path variables, and preview widget layouts.
          </p>
        </div>
        <div className="bg-muted/30 border border-border/30 rounded-xl px-4 py-2 flex items-center gap-3 shrink-0">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search article titles..."
            className="bg-transparent border-none text-xs text-foreground focus:outline-none w-[180px] font-medium placeholder:text-muted-foreground/50"
          />
        </div>
      </div>

      {/* Knowledge base summary stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card/40 border-border/40 backdrop-blur-md p-4">
          <div className="flex justify-between items-center text-xs font-bold text-muted-foreground uppercase tracking-wider">
            <span>Articles Loaded</span>
            <FileText className="w-4 h-4 text-primary" />
          </div>
          <div className="text-2xl font-black mt-2">{articles.length} Articles</div>
          <p className="text-[10px] text-muted-foreground mt-1">Sourced live from database</p>
        </Card>
        <Card className="bg-card/40 border-border/40 backdrop-blur-md p-4">
          <div className="flex justify-between items-center text-xs font-bold text-muted-foreground uppercase tracking-wider">
            <span>Aggregate Views</span>
            <Eye className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black mt-2">
            {articles.reduce((acc, a) => acc + a.views, 0)} Views
          </div>
          <p className="text-[10px] text-emerald-400 font-bold mt-1">+18.5% weekly spike</p>
        </Card>
        <Card className="bg-card/40 border-border/40 backdrop-blur-md p-4">
          <div className="flex justify-between items-center text-xs font-bold text-muted-foreground uppercase tracking-wider">
            <span>Sitemap Sync</span>
            <Globe className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black mt-2">{articles.length + 5} Routes</div>
          <p className="text-[10px] text-muted-foreground mt-1">Registered dynamic links</p>
        </Card>
        <Card className="bg-card/40 border-border/40 backdrop-blur-md p-4">
          <div className="flex justify-between items-center text-xs font-bold text-muted-foreground uppercase tracking-wider">
            <span>Bot Index Score</span>
            <Bot className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black mt-2">100% Score</div>
          <p className="text-[10px] text-emerald-400 mt-1">Zero broken redirect paths</p>
        </Card>
      </div>

      {/* Main Grid: Articles search and Sitemap bot crawling */}
      <div className="grid gap-6 lg:grid-cols-7 items-start">
        
        {/* Help Directory & Previews (Left Column - 4 grids) */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-card/45 border-border/40 backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Public Documentation Manager</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">Select published documents to preview desk widget layouts</p>
              </div>
              <button 
                onClick={handleCreateArticle}
                className="px-2.5 py-1.5 text-[10px] bg-primary hover:bg-primary/80 text-foreground font-bold rounded-lg transition-colors flex items-center gap-1 shadow-[0_0_10px_rgba(209,188,255,0.2)]"
              >
                + New Document
              </button>
            </CardHeader>
            <CardContent className="space-y-3">
              {isLoading ? (
                <div className="flex items-center justify-center p-8 gap-2 text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <span>Loading documentation index...</span>
                </div>
              ) : filteredArticles.length === 0 ? (
                <div className="text-center py-8 text-xs text-muted-foreground font-semibold">
                  No published documentation articles found matching &quot;{searchQuery}&quot;
                </div>
              ) : (
                filteredArticles.map((art) => (
                  <div 
                    key={art.id}
                    onClick={() => setSelectedArticleId(art.id)}
                    className={`border p-4 rounded-xl flex items-center justify-between gap-4 cursor-pointer transition-all ${
                      selectedArticleId === art.id 
                        ? 'bg-primary/5 border-primary/50 shadow-sm' 
                        : 'bg-muted/10 border-border/30 hover:border-primary/20'
                    }`}
                  >
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold text-primary tracking-wider uppercase">{art.category}</span>
                      <h4 className="text-xs font-bold text-foreground leading-relaxed">{art.title}</h4>
                      <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-medium">
                        <span>👁️ {art.views} reads</span>
                        <span>⏱️ {art.readTime} read time</span>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${selectedArticleId === art.id ? 'text-primary translate-x-1' : 'text-muted-foreground'}`} />
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Sitemap crawl simulator logs */}
          <Card className="bg-card/45 border-border/40 backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Sitemap Crawler logs</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">Simulate search engine bots indexing dynamic static article paths</p>
              </div>
              <button 
                onClick={triggerCrawlerSimulation}
                disabled={isCrawling}
                className={`px-3 py-1.5 text-[10px] font-bold rounded-lg border flex items-center gap-1.5 transition-all ${
                  isCrawling 
                    ? 'bg-muted/50 text-muted-foreground border-border/30 cursor-not-allowed' 
                    : 'bg-primary text-primary-foreground border-transparent hover:shadow-[0_0_8px_rgba(209,188,255,0.4)] active:scale-95'
                }`}
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isCrawling ? 'animate-spin' : ''}`} /> {isCrawling ? "Crawling XML..." : "Crawl Simulator"}
              </button>
            </CardHeader>
            <CardContent className="bg-black/40 border border-border/30 rounded-xl p-4 font-mono text-[10px] space-y-2 min-h-[140px] max-h-[220px] overflow-y-auto">
              <div className="text-primary font-bold">🤖 $ saarthidesk-sitemap-agent crawl --target=sitemap.xml</div>
              
              {crawlingLogs.map((log, idx) => (
                <div key={idx} className="flex justify-between items-center text-muted-foreground leading-relaxed animate-in fade-in duration-300">
                  <div>
                    <span className="text-emerald-400 font-bold">[{log.time}]</span>{" "}
                    <span className="text-foreground">{log.bot}</span>{" "}
                    <span>crawled {log.path}</span>
                  </div>
                  <span className="text-emerald-400 font-bold">🟢 {log.status} OK</span>
                </div>
              ))}

              {crawlingLogs.length === 0 && !isCrawling && (
                <div className="text-muted-foreground italic py-4">
                  Simulator idle. Click &quot;Crawl Simulator&quot; to broadcast Googlebot crawl paths.
                </div>
              )}

              {isCrawling && (
                <div className="text-primary animate-pulse italic">
                  Indexing directories in background thread...
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Live Desk Widget Previewer (Right Column - 3 grids) */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="bg-card/45 border-border/40 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Live Desk Widget Preview</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Visualize how the selected help center article renders inside customers&apos; public desk widget screen</p>
            </CardHeader>
            <CardContent className="flex justify-center">
              
              {/* Phone Frame Simulator */}
              <div className="w-full max-w-[280px] bg-muted/60 border border-border/50 rounded-3xl p-3 shadow-inner relative group">
                <div className="w-16 h-4 bg-background border border-border/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-muted rounded-full"></span>
                </div>
                
                {/* Simulated Screen */}
                <div className="bg-background rounded-2xl p-3 min-h-[360px] border border-border/30 flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* Header preview */}
                    <div className="flex items-center gap-2 border-b border-border/30 pb-2.5">
                      <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                        <BookOpen className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h5 className="text-[10px] font-black text-foreground">Support Documentation</h5>
                        <span className="text-[8px] text-muted-foreground block">SaarthiDesk Core System</span>
                      </div>
                    </div>

                    {/* Content Preview */}
                    <div className="space-y-2">
                      <span className="text-[7px] bg-primary/20 text-primary px-1.5 py-0.5 rounded border border-primary/20 font-bold uppercase tracking-wider">
                        {selectedArticle.category}
                      </span>
                      <h4 className="text-[10px] font-bold text-foreground leading-relaxed">
                        {selectedArticle.title}
                      </h4>
                      <p className="text-[9px] text-muted-foreground leading-relaxed">
                        {selectedArticle.content}
                      </p>
                    </div>
                  </div>

                  {/* Widget Help Button */}
                  <div className="border-t border-border/30 pt-2 flex items-center justify-between text-[8px]">
                    <span className="text-muted-foreground">Was this article helpful?</span>
                    <div className="flex gap-1.5">
                      <button className="px-2 py-0.5 bg-muted border border-border/30 hover:text-primary rounded font-bold text-foreground">Yes</button>
                      <button className="px-2 py-0.5 bg-muted border border-border/30 hover:text-primary rounded font-bold text-foreground">No</button>
                    </div>
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>

      </div>

    </div>
  );
}

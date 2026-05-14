import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { FileText, UploadCloud, Link as LinkIcon, Plus, Trash2, Search, Book, CheckCircle2 } from "lucide-react";

export default function KnowledgeBasePage() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Knowledge Base</h1>
          <p className="text-muted-foreground">Train your AI Agent by uploading documents, FAQs, and website links.</p>
        </div>
        <Button className="bg-primary/90 hover:bg-primary/80 text-foreground gap-2 shadow-[0_0_15px_rgba(209,188,255,0.3)]">
          <UploadCloud className="w-4 h-4" /> Upload Knowledge
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-foreground">Data Sources</CardTitle>
                  <CardDescription className="text-muted-foreground">Manage the content your AI learns from.</CardDescription>
                </div>
                <div className="relative w-64 hidden sm:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/80" />
                  <Input 
                    placeholder="Search sources..." 
                    className="pl-9 bg-background border-border/50 h-9"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Source Item */}
                <div className="flex items-center justify-between p-4 rounded-xl border border-border/30 bg-background/50 hover:bg-muted transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 text-primary flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Pricing_Brochure_2026.pdf</h4>
                      <p className="text-xs text-muted-foreground/80 flex items-center gap-2 mt-1">
                        PDF Document • 2.4 MB • Uploaded 2 days ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Trained
                    </Badge>
                    <Button variant="ghost" size="icon" className="text-muted-foreground/80 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Source Item */}
                <div className="flex items-center justify-between p-4 rounded-xl border border-border/30 bg-background/50 hover:bg-muted transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                      <LinkIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">https://saarthidesk.com/help/shipping</h4>
                      <p className="text-xs text-muted-foreground/80 flex items-center gap-2 mt-1">
                        Website URL • Auto-syncs weekly • Synced yesterday
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Trained
                    </Badge>
                    <Button variant="ghost" size="icon" className="text-muted-foreground/80 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Source Item */}
                <div className="flex items-center justify-between p-4 rounded-xl border border-border/30 bg-background/50 hover:bg-muted transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                      <Book className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">General FAQs</h4>
                      <p className="text-xs text-muted-foreground/80 flex items-center gap-2 mt-1">
                        Text Content • 15 Q&A Pairs • Updated today
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span> Processing
                    </Badge>
                    <Button variant="ghost" size="icon" className="text-muted-foreground/80 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Knowledge Sidebar */}
        <div className="space-y-6">
          <Card className="bg-card/40 border-primary/30 relative overflow-hidden group shadow-[0_0_30px_rgba(209,188,255,0.05)]">
            {/* Shimmer Effect Background */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/10 to-transparent group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
            
            <CardHeader className="relative z-10">
              <CardTitle className="text-foreground flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/60 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
                Add New Source
              </CardTitle>
              <CardDescription className="text-muted-foreground">Choose a format to upload and train your agent.</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="file" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-card border border-primary/20">
                  <TabsTrigger value="file">File</TabsTrigger>
                  <TabsTrigger value="url">URL</TabsTrigger>
                  <TabsTrigger value="text">Text</TabsTrigger>
                </TabsList>
                <TabsContent value="file" className="mt-4 relative">
                  <div className="border-2 border-dashed border-primary/40 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-primary/10 hover:border-primary/60 hover:shadow-[0_0_20px_rgba(209,188,255,0.2)] transition-all cursor-pointer relative overflow-hidden group/upload">
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/upload:opacity-100 transition-opacity pointer-events-none" />
                    <div className="w-14 h-14 bg-background border border-primary/30 shadow-[0_0_15px_rgba(209,188,255,0.3)] rounded-full flex items-center justify-center mb-4 relative z-10 group-hover/upload:scale-110 transition-transform duration-300">
                      <UploadCloud className="w-7 h-7 text-primary" />
                    </div>
                    <p className="text-sm font-medium text-foreground mb-1 relative z-10">Click to upload or drag & drop</p>
                    <p className="text-xs text-muted-foreground relative z-10">PDF, DOCX, TXT, CSV (Max 10MB)</p>
                  </div>
                </TabsContent>
                <TabsContent value="url" className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Website URL</label>
                    <Input placeholder="https://example.com/pricing" className="bg-card border-border/50" />
                  </div>
                  <Button className="w-full bg-primary/90 hover:bg-primary text-primary-foreground shadow-[0_0_15px_rgba(209,188,255,0.4)] transition-all hover:shadow-[0_0_25px_rgba(209,188,255,0.6)]">Fetch Content</Button>
                </TabsContent>
                <TabsContent value="text" className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Raw Text</label>
                    <textarea 
                      className="w-full h-32 bg-card border border-border/50 rounded-md p-3 text-sm text-foreground placeholder:text-slate-600 focus:ring-1 focus:ring-primary outline-none resize-none"
                      placeholder="Paste your text here..."
                    />
                  </div>
                  <Button className="w-full bg-primary/90 hover:bg-primary text-primary-foreground shadow-[0_0_15px_rgba(209,188,255,0.4)] transition-all hover:shadow-[0_0_25px_rgba(209,188,255,0.6)]">Save Knowledge</Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-foreground text-sm">AI Training Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Vector Storage Used</span>
                    <span className="text-primary font-medium">45%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[45%]"></div>
                  </div>
                  <p className="text-[10px] text-muted-foreground/80 mt-1">1,240 / 5,000 document chunks</p>
                </div>
                <div className="pt-4 border-t border-border/30">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Saarthi AI automatically chunks, embeds, and stores your data using pgvector. 
                    It retrieves relevant context to craft highly accurate responses for your customers.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

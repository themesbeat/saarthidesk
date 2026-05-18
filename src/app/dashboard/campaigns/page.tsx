"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Megaphone, Send, Mail, MessageSquare, Plus, 
  Sparkles, CheckCircle2, AlertCircle, BarChart3, Filter,
  HelpCircle, Clock, Zap, X
} from "lucide-react";

interface CampaignLog {
  id: string;
  name: string;
  channel: string;
  sent: number;
  delivered: number;
  openRate: number;
  replies: number;
  status: string;
}

export default function CampaignsPage() {
  const [activeSegment, setActiveSegment] = useState<string>("All Leads");
  const [selectedChannel, setSelectedChannel] = useState<string>("WhatsApp");
  const [campaignName, setCampaignName] = useState<string>("");
  const [broadcastText, setBroadcastText] = useState<string>("Hi {{name}}, we noticed you left some items in your cart! Use code SAARTHI10 for 10% off.");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLaunching, setIsLaunching] = useState<boolean>(false);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Dynamic campaign data from PostgreSQL
  const [campaigns, setCampaigns] = useState<CampaignLog[]>([]);
  const [stats, setStats] = useState({
    totalBroadcasted: 0,
    avgOpenRate: 82.4,
    clickThroughRate: 18.5,
    totalReplies: 0
  });

  const fetchCampaignData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/campaigns");
      const data = await res.json();
      if (data.success) {
        setCampaigns(data.campaigns);
        if (data.stats) {
          setStats(data.stats);
        }
      }
    } catch (err) {
      console.error("Error fetching campaign data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaignData();
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4500);
  };

  const launchBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastText.trim()) return;

    setIsLaunching(true);
    setProgressPercent(10);
    
    // Simulate broadcasting progress ticks
    const interval = setInterval(() => {
      setProgressPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 30;
      });
    }, 400);

    const finalCampaignName = campaignName.trim() || `${selectedChannel} Blast - ${activeSegment}`;
    const mockSentCount = Math.floor(200 + Math.random() * 800);
    const mockOpenRate = selectedChannel === "WhatsApp" ? parseFloat((85 + Math.random() * 10).toFixed(1)) : parseFloat((30 + Math.random() * 10).toFixed(1));
    const mockReplies = Math.floor(mockSentCount * (mockOpenRate / 100) * 0.15);

    try {
      const res = await fetch("/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: finalCampaignName,
          channel: selectedChannel,
          sent: mockSentCount,
          openRate: mockOpenRate,
          replies: mockReplies,
          status: "Completed"
        })
      });

      const data = await res.json();
      if (data.success) {
        // Wait a small moment to align with progress bar
        setTimeout(() => {
          setIsLaunching(false);
          setProgressPercent(0);
          setCampaignName("");
          triggerToast(`Broadcast Campaign "${finalCampaignName}" successfully fired to ${mockSentCount} active leads!`);
          fetchCampaignData(); // Refresh list and metrics
        }, 1500);
      }
    } catch (err) {
      console.error("Error launching campaign:", err);
      setIsLaunching(false);
    }
  };

  return (
    <div className="p-6 space-y-6 text-foreground">
      
      {/* Dynamic Launch Progress & Toasts */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-popover/90 border border-primary/20 backdrop-blur-md rounded-xl p-4 shadow-[0_10px_30px_rgba(209,188,255,0.15)] flex items-start gap-3 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
          <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4 animate-bounce" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold">Campaign Fired</h4>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{toastMessage}</p>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-muted-foreground hover:text-foreground text-xs font-semibold shrink-0 pl-2">&times;</button>
        </div>
      )}

      {isLaunching && (
        <div className="fixed bottom-6 right-6 z-50 w-80 bg-popover/95 border border-primary/20 backdrop-blur-md rounded-xl p-4 shadow-[0_10px_30px_rgba(209,188,255,0.15)] space-y-3">
          <div className="flex justify-between text-xs font-semibold">
            <span>Broadcasting Messages...</span>
            <span className="font-mono text-primary animate-pulse">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all duration-500 rounded-full" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <p className="text-[10px] text-muted-foreground">Running segment queries and firing API gateways...</p>
        </div>
      )}

      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Campaigns & Broadcasts</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Launch multi-channel broadcasts and design automated multi-step drip pipelines with precise tag filtering.
          </p>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card/40 border-border/40 backdrop-blur-md p-4">
          <div className="flex justify-between items-center">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Total Broadcasted</h4>
            <Megaphone className="w-4 h-4 text-primary" />
          </div>
          <div className="text-2xl font-black mt-2">
            {isLoading ? "..." : stats.totalBroadcasted.toLocaleString()}
          </div>
          <p className="text-[10px] text-emerald-400 mt-1 flex items-center gap-0.5 font-medium">
            +18.4% from last quarter
          </p>
        </Card>
        <Card className="bg-card/40 border-border/40 backdrop-blur-md p-4">
          <div className="flex justify-between items-center">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Average Open Rate</h4>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black mt-2">
            {isLoading ? "..." : `${stats.avgOpenRate}%`}
          </div>
          <p className="text-[10px] text-muted-foreground mt-1 font-medium">High conversion on WhatsApp DM</p>
        </Card>
        <Card className="bg-card/40 border-border/40 backdrop-blur-md p-4">
          <div className="flex justify-between items-center">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Click-Through Rate</h4>
            <Zap className="w-4 h-4 text-yellow-400" />
          </div>
          <div className="text-2xl font-black mt-2">
            {stats.clickThroughRate}%
          </div>
          <p className="text-[10px] text-emerald-400 mt-1 font-medium">Auto-link shortener enabled</p>
        </Card>
        <Card className="bg-card/40 border-border/40 backdrop-blur-md p-4">
          <div className="flex justify-between items-center">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Lead Replies</h4>
            <Sparkles className="w-4 h-4 text-pink-400" />
          </div>
          <div className="text-2xl font-black mt-2">
            {isLoading ? "..." : `${stats.totalReplies} Replies`}
          </div>
          <p className="text-[10px] text-muted-foreground mt-1 font-medium">Direct sales attribution</p>
        </Card>
      </div>

      {/* Main Grid split */}
      <div className="grid gap-6 lg:grid-cols-7 items-start">
        
        {/* Outbound Logs & Flowchart (Left Column - 4 grids) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Active Campaigns Logs */}
          <Card className="bg-card/45 border-border/40 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Active Broadcast Logs</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Real-time status tracking for active promotional funnels in PostgreSQL</p>
            </CardHeader>
            <CardContent className="px-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border/30 text-[10px] text-muted-foreground tracking-wider uppercase bg-muted/20 font-bold">
                      <th className="py-2.5 px-4">Campaign Target</th>
                      <th className="py-2.5 px-4 text-center">Channel</th>
                      <th className="py-2.5 px-4 text-right">Sent Size</th>
                      <th className="py-2.5 px-4 text-right">Open Rate</th>
                      <th className="py-2.5 px-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/20 text-xs">
                    {isLoading ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-muted-foreground">
                          Querying live broadcast telemetry reports...
                        </td>
                      </tr>
                    ) : campaigns.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-muted-foreground">
                          No campaigns found. Launch one below!
                        </td>
                      </tr>
                    ) : (
                      campaigns.map((c) => (
                        <tr key={c.id} className="hover:bg-muted/10 transition-colors">
                          <td className="py-3 px-4 font-bold text-foreground">{c.name}</td>
                          <td className="py-3 px-4 text-center">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                              c.channel === 'WhatsApp' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/10' : c.channel === 'Email' ? 'bg-primary/10 text-primary border-primary/10' : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/10'
                            }`}>
                              {c.channel}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right font-mono font-medium text-foreground">{c.sent.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right font-mono text-muted-foreground">{c.openRate === 0 ? '-' : `${c.openRate}%`}</td>
                          <td className="py-3 px-4 text-center">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              c.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' : c.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-400 animate-pulse' : 'bg-zinc-500/20 text-zinc-400'
                            }`}>
                              {c.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Drip Sequence flow */}
          <Card className="bg-card/45 border-border/40 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Drip Sequences Pipeline Visualizer</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Define cascading messages timed by custom hours/days triggers</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-muted/20 border border-border/30 rounded-xl">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span> Lead Nurturing Sequence
                  </h4>
                  <p className="text-[10px] text-muted-foreground">Triggered instantly on Shopify abandoned checkout webhook</p>
                </div>
                <div className="text-[10px] bg-primary/20 text-primary font-bold px-2.5 py-1 rounded border border-primary/10">
                  Active (3 Steps)
                </div>
              </div>

              {/* Drip Step Pipeline chart */}
              <div className="flex flex-col md:flex-row items-stretch justify-center gap-3 relative pt-2">
                <DripStepCard 
                  step="Step 1" 
                  channel="WhatsApp" 
                  trigger="Instant" 
                  description="Hi {{name}}, we noticed you left items in your cart! Ready to checkout?"
                />
                <div className="flex items-center justify-center text-muted-foreground font-bold">&rarr;</div>
                <DripStepCard 
                  step="Step 2" 
                  channel="SMS" 
                  trigger="After 24 Hours" 
                  description="Don't miss out, {{name}}! Here's a 10% coupon code: SAARTHI10."
                />
                <div className="flex items-center justify-center text-muted-foreground font-bold">&rarr;</div>
                <DripStepCard 
                  step="Step 3" 
                  channel="AI Handoff" 
                  trigger="On Reply" 
                  description="Instantly assign context to AI agent to answer shipping/pricing questions."
                />
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Live Broadcast Composer (Right Column - 3 grids) */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="bg-card/45 border-border/40 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Broadcast Campaign Composer</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Draft template alerts and dispatch instantly to filter contacts</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={launchBroadcast} className="space-y-4">
                
                {/* Campaign Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Campaign Name</label>
                  <input 
                    type="text"
                    placeholder="e.g. Winter Warmup Sale Blast"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    className="w-full bg-muted border border-border/40 text-xs px-3 py-2 rounded-lg text-foreground focus:outline-none focus:border-primary/50"
                  />
                </div>

                {/* Segment selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Target Segment</label>
                  <select 
                    value={activeSegment}
                    onChange={(e) => setActiveSegment(e.target.value)}
                    className="w-full bg-muted border border-border/40 text-xs px-3 py-2 rounded-lg text-foreground focus:outline-none focus:border-primary/50"
                  >
                    <option>All Leads</option>
                    <option>Previous Buyers</option>
                    <option>Abandoned Cart Users</option>
                    <option>Clinics - North Region</option>
                  </select>
                </div>

                {/* Channel selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Dispatch Channel</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["WhatsApp", "SMS", "Email"].map((ch) => (
                      <button 
                        key={ch}
                        type="button"
                        onClick={() => setSelectedChannel(ch)}
                        className={`py-2 text-[10px] font-semibold rounded-lg border transition-all ${
                          selectedChannel === ch 
                            ? 'bg-primary/20 text-primary border-primary/25 shadow-sm' 
                            : 'bg-muted/40 border-border/40 text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {ch}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Text box */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    <span>Message Body</span>
                    <span className="text-[10px] text-primary lowercase font-medium">Placeholders: {"{{name}}"}</span>
                  </div>
                  <textarea 
                    value={broadcastText}
                    onChange={(e) => setBroadcastText(e.target.value)}
                    rows={4}
                    placeholder="Enter message template text here..."
                    className="w-full bg-muted border border-border/40 text-xs p-3 rounded-lg text-foreground focus:outline-none focus:border-primary/50 font-sans resize-none"
                  />
                </div>

                {/* Info block */}
                <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg flex items-start gap-2.5">
                  <Zap className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    SaarthiDesk automatically shortens embedded links and links click conversions to CRM analytics logs.
                  </p>
                </div>

                {/* Button */}
                <button 
                  type="submit"
                  disabled={isLaunching}
                  className="w-full py-2.5 bg-primary text-primary-foreground font-bold hover:shadow-[0_0_12px_rgba(209,188,255,0.4)] rounded-lg transition-all text-xs flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" /> Launch Campaign
                </button>

              </form>
            </CardContent>
          </Card>
        </div>

      </div>

    </div>
  );
}

function DripStepCard({ 
  step, channel, trigger, description 
}: { 
  step: string; channel: string; trigger: string; description: string 
}) {
  return (
    <div className="flex-1 bg-muted/30 border border-border/40 p-3 rounded-xl space-y-2 hover:border-primary/30 transition-all flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center">
          <span className="text-[9px] font-bold text-primary uppercase tracking-wider">{step}</span>
          <span className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 border border-primary/10 rounded font-medium">{channel}</span>
        </div>
        <p className="text-[10px] text-foreground mt-2 leading-relaxed">&ldquo;{description}&rdquo;</p>
      </div>
      <div className="text-[9px] text-muted-foreground border-t border-border/20 pt-2 flex items-center gap-1">
        <Clock className="w-2.5 h-2.5" /> Delay: {trigger}
      </div>
    </div>
  );
}

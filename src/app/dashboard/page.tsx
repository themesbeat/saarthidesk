"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MessageSquare, Users, Clock, TrendingUp, 
  ArrowUpRight, ArrowDownRight, Bot, ShieldAlert,
  Zap, Calendar, HelpCircle, UserPlus, Send, CheckCircle,
  AlertTriangle, RefreshCw, Layers, Sparkles
} from "lucide-react";

interface Visitor {
  id: string;
  name: string;
  country: string;
  flag: string;
  page: string;
  duration: number;
  channel: string;
}

export default function DashboardPage() {
  const [activeNotification, setActiveNotification] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"volume" | "sentiment">("volume");
  
  // Real-time ticking visitor list state
  const [visitors, setVisitors] = useState<Visitor[]>([
    { id: "1", name: "Anonymous User #928", country: "United States", flag: "🇺🇸", page: "/pricing", duration: 42, channel: "Web Widget" },
    { id: "2", name: "Rahul Sharma", country: "India", flag: "🇮🇳", page: "/features/ai-replies", duration: 105, channel: "WhatsApp" },
    { id: "3", name: "Jessica K.", country: "United Kingdom", flag: "🇬🇧", page: "/solutions/clinics", duration: 18, channel: "Web Widget" },
    { id: "4", name: "Marc Depont", country: "France", flag: "🇫🇷", page: "/checkout", duration: 250, channel: "Instagram" },
    { id: "5", name: "Elena Rostova", country: "Russia", flag: "🇷🇺", page: "/solutions/ecommerce", duration: 61, channel: "Telegram" }
  ]);

  // Live PostgreSQL-backed metrics state
  const [metrics, setMetrics] = useState({
    totalConversations: 1248,
    openConversations: 18,
    resolvedConversations: 1042,
    aiResolutionRate: 84.6,
    totalRevenue: 4280,
    recentLeads: [],
    recentConversations: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard/metrics")
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          setMetrics({
            totalConversations: data.totalConversations,
            openConversations: data.openConversations,
            resolvedConversations: data.resolvedConversations,
            aiResolutionRate: data.aiResolutionRate,
            totalRevenue: data.totalRevenue,
            recentLeads: data.recentLeads || [],
            recentConversations: data.recentConversations || []
          });
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("[Dashboard] Error fetching live metrics:", err);
        setLoading(false);
      });
  }, []);

  // Tick the visitor duration timers every second to make it feel alive!
  useEffect(() => {
    const interval = setInterval(() => {
      setVisitors((prev) =>
        prev.map((v) => ({ ...v, duration: v.duration + 1 }))
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const triggerQuickAction = (actionName: string) => {
    setActiveNotification(`Successfully executed quick action: "${actionName}". Simulating background worker routing...`);
    setTimeout(() => {
      setActiveNotification(null);
    }, 4500);
  };

  return (
    <div className="p-6 space-y-6 text-foreground relative">
      
      {/* Dynamic Action Notification Toast */}
      {activeNotification && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-popover/90 border border-primary/20 backdrop-blur-md rounded-xl p-4 shadow-[0_10px_30px_rgba(209,188,255,0.15)] flex items-start gap-3 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
          <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">Action Triggered</h4>
            <p className="text-xs text-muted-foreground mt-1">{activeNotification}</p>
          </div>
          <button 
            onClick={() => setActiveNotification(null)}
            className="text-muted-foreground hover:text-foreground text-xs font-semibold ml-auto pl-2"
          >
            ×
          </button>
        </div>
      )}

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-primary/80">
              Overview Dashboard
            </h1>
            <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full border border-primary/10 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-ping"></span> Live Systems Active
            </span>
          </div>
          <p className="text-muted-foreground mt-1 text-sm">
            Monitor real-time omnichannel flows, active SLA conditions, automated AI reply analytics, and agent rosters.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => triggerQuickAction("Sync Systems")}
            className="flex items-center gap-2 px-3 py-1.5 text-xs bg-muted/50 border border-border/50 hover:bg-muted/80 text-foreground transition-all rounded-lg"
          >
            <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" /> Sync Channels
          </button>
        </div>
      </div>

      {/* Bento Metric Matrix - Section 1 Specs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard 
          title="Total Conversations" 
          value={metrics.totalConversations.toLocaleString()} 
          change="+12.5%" 
          isPositive={true}
          subtitle="All connected touchpoints"
          icon={<MessageSquare className="w-4 h-4 text-primary" />} 
        />
        <MetricCard 
          title="Open Conversations" 
          value={metrics.openConversations.toLocaleString()} 
          change="-5.3%" 
          isPositive={metrics.openConversations < 10}
          subtitle="Queued in human inbox"
          icon={<AlertTriangle className="w-4 h-4 text-amber-400" />} 
        />
        <MetricCard 
          title="Avg. Response Time" 
          value="1m 24s" 
          change="-18.2%" 
          isPositive={true}
          subtitle="AI & human collective average"
          icon={<Clock className="w-4 h-4 text-cyan-400" />} 
        />
        <MetricCard 
          title="Customer Satisfaction (CSAT)" 
          value="4.9 / 5.0" 
          change="+1.2%" 
          isPositive={true}
          subtitle="98% highly positive reviews"
          icon={<Sparkles className="w-4 h-4 text-pink-400" />} 
        />
        <MetricCard 
          title="AI Resolution Rate" 
          value={`${metrics.aiResolutionRate}%`} 
          change="+4.1%" 
          isPositive={true}
          subtitle="Answered without human agent"
          icon={<Bot className="w-4 h-4 text-emerald-400" />} 
        />
        <MetricCard 
          title="SLA Breach Alerts" 
          value="0 Pending" 
          change="100% compliant" 
          isPositive={true}
          subtitle="No threshold breaches today"
          icon={<ShieldAlert className="w-4 h-4 text-rose-400" />} 
        />
        <MetricCard 
          title="Active Agents Online" 
          value="5 Active" 
          change="3 shifts active" 
          isPositive={true}
          subtitle="Roster fully covered"
          icon={<Users className="w-4 h-4 text-purple-400" />} 
        />
        <MetricCard 
          title="Revenue Attribution" 
          value={`$${metrics.totalRevenue.toLocaleString()}`} 
          change="+22.4%" 
          isPositive={true}
          subtitle="Sales from chat funnels"
          icon={<TrendingUp className="w-4 h-4 text-yellow-400" />} 
        />
      </div>

      {/* Main Grid: Analytical SVG Charts & Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-7">
        
        {/* SVG Bezier Area Analytics Graph */}
        <Card className="lg:col-span-4 bg-card/40 border-border/50 backdrop-blur-md relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base font-semibold text-foreground">AI vs Human Handled Chats</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Continuous hourly message breakdown</p>
            </div>
            <div className="flex items-center gap-1.5 bg-muted/40 p-0.5 rounded-lg border border-border/40">
              <button 
                onClick={() => setActiveTab("volume")}
                className={`px-2.5 py-1 text-[10px] font-medium rounded-md transition-all ${activeTab === 'volume' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Volume
              </button>
              <button 
                onClick={() => setActiveTab("sentiment")}
                className={`px-2.5 py-1 text-[10px] font-medium rounded-md transition-all ${activeTab === 'sentiment' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Sentiment
              </button>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            {activeTab === "volume" ? (
              <div className="space-y-4">
                {/* SVG Visual area plot */}
                <div className="relative h-[220px] w-full border-b border-l border-border/40 pl-2">
                  <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="aiGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(168, 85, 247, 0.4)" />
                        <stop offset="100%" stopColor="rgba(168, 85, 247, 0.0)" />
                      </linearGradient>
                      <linearGradient id="humanGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(6, 182, 212, 0.4)" />
                        <stop offset="100%" stopColor="rgba(6, 182, 212, 0.0)" />
                      </linearGradient>
                    </defs>
                    
                    {/* Grid lines */}
                    <line x1="0" y1="50" x2="500" y2="50" stroke="rgba(255,255,255,0.05)" strokeDasharray="4" />
                    <line x1="0" y1="100" x2="500" y2="100" stroke="rgba(255,255,255,0.05)" strokeDasharray="4" />
                    <line x1="0" y1="150" x2="500" y2="150" stroke="rgba(255,255,255,0.05)" strokeDasharray="4" />

                    {/* AI Volume Curve (Purple) */}
                    <path 
                      d="M 0 160 Q 75 80 150 120 T 300 40 T 450 60 L 500 50 L 500 200 L 0 200 Z" 
                      fill="url(#aiGrad)" 
                    />
                    <path 
                      d="M 0 160 Q 75 80 150 120 T 300 40 T 450 60 L 500 50" 
                      fill="none" 
                      stroke="#a855f7" 
                      strokeWidth="2.5" 
                      className="drop-shadow-[0_2px_8px_rgba(168,85,247,0.4)]"
                    />

                    {/* Human Volume Curve (Cyan) */}
                    <path 
                      d="M 0 190 Q 75 160 150 150 T 300 120 T 450 110 L 500 130 L 500 200 L 0 200 Z" 
                      fill="url(#humanGrad)" 
                    />
                    <path 
                      d="M 0 190 Q 75 160 150 150 T 300 120 T 450 110 L 500 130" 
                      fill="none" 
                      stroke="#06b6d4" 
                      strokeWidth="2" 
                      className="drop-shadow-[0_2px_8px_rgba(6,182,212,0.4)]"
                    />
                  </svg>
                  
                  {/* Legend Overlay */}
                  <div className="absolute top-2 right-4 flex items-center gap-4 text-[10px]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm bg-purple-500"></span>
                      <span className="text-muted-foreground font-medium">AI Chats (1,056)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm bg-cyan-500"></span>
                      <span className="text-muted-foreground font-medium">Human Handled (192)</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[10px] text-muted-foreground px-2">
                  <span>08:00 AM</span>
                  <span>12:00 PM</span>
                  <span>04:00 PM</span>
                  <span>08:00 PM</span>
                  <span>12:00 AM</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4 py-2">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
                    <span className="text-2xl font-bold text-emerald-400">88.2%</span>
                    <h5 className="text-xs font-semibold text-foreground mt-1">Positive Sentiment</h5>
                    <p className="text-[10px] text-muted-foreground mt-1">High conversion probabilities, customer appreciation</p>
                  </div>
                  <div className="bg-zinc-500/10 border border-zinc-500/20 rounded-xl p-4 text-center">
                    <span className="text-2xl font-bold text-zinc-400">8.1%</span>
                    <h5 className="text-xs font-semibold text-foreground mt-1">Neutral Queries</h5>
                    <p className="text-[10px] text-muted-foreground mt-1">Standard logistics requests, operating hours sync</p>
                  </div>
                  <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 text-center">
                    <span className="text-2xl font-bold text-rose-400">3.7%</span>
                    <h5 className="text-xs font-semibold text-foreground mt-1">Negative Indicators</h5>
                    <p className="text-[10px] text-muted-foreground mt-1">SLA delays warning, billing questions escalations</p>
                  </div>
                </div>
                
                {/* Micro hourly feedback tracker */}
                <div className="bg-muted/30 border border-border/40 rounded-lg p-3 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span className="text-xs font-medium text-foreground">AI Sentiment Guard enabled</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">Self-correcting tone trigger activated</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions Panel - Section 1 Specs */}
        <Card className="lg:col-span-3 bg-card/40 border-border/50 backdrop-blur-md flex flex-col">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-foreground">Quick Action Portal</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">Trigger custom automations instantly</p>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3 flex-1">
            <QuickActionButton 
              label="Compose Message" 
              icon={<MessageSquare className="w-4 h-4" />} 
              onClick={() => triggerQuickAction("Compose Message Drawer")}
            />
            <QuickActionButton 
              label="Create Ticket" 
              icon={<ShieldAlert className="w-4 h-4 text-orange-400" />} 
              onClick={() => triggerQuickAction("Create Support Ticket")}
            />
            <QuickActionButton 
              label="Assign Conversation" 
              icon={<Users className="w-4 h-4 text-purple-400" />} 
              onClick={() => triggerQuickAction("Assign Roster Slot")}
            />
            <QuickActionButton 
              label="Trigger Automation" 
              icon={<Zap className="w-4 h-4 text-yellow-400" />} 
              onClick={() => triggerQuickAction("Run Trigger Rule")}
            />
            <QuickActionButton 
              label="Add Team Member" 
              icon={<UserPlus className="w-4 h-4 text-emerald-400" />} 
              onClick={() => triggerQuickAction("Add Agent Roster Invitation")}
            />
            <QuickActionButton 
              label="Create AI Workflow" 
              icon={<Bot className="w-4 h-4 text-pink-400" />} 
              onClick={() => triggerQuickAction("AI Node Customizer")}
            />
            <QuickActionButton 
              label="Broadcast Campaign" 
              icon={<Send className="w-4 h-4 text-cyan-400" />} 
              onClick={() => triggerQuickAction("Launch WhatsApp/Email Blast")}
            />
            <QuickActionButton 
              label="Connect Channel" 
              icon={<Layers className="w-4 h-4 text-blue-400" />} 
              onClick={() => triggerQuickAction("Omnichannel Sync Gateway")}
            />
          </CardContent>
        </Card>

      </div>

      {/* Third Row: Live Visitor Tracker & Sentiment / Channels */}
      <div className="grid gap-6 lg:grid-cols-7">
        
        {/* Live Visitor Tracking Panel */}
        <Card className="lg:col-span-4 bg-card/40 border-border/50 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base font-semibold text-foreground">Live Visitor Tracking</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Real-time session monitors currently browsing your brand site</p>
            </div>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 border border-emerald-500/10 rounded-full font-bold">
              {visitors.length} Active Sessions
            </span>
          </CardHeader>
          <CardContent className="px-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border/30 text-[10px] text-muted-foreground tracking-wider uppercase bg-muted/20">
                    <th className="py-2.5 px-4 font-semibold">User Ident</th>
                    <th className="py-2.5 px-4 font-semibold">Active Page</th>
                    <th className="py-2.5 px-4 font-semibold">Source Channel</th>
                    <th className="py-2.5 px-4 font-semibold text-right">Time On Site</th>
                    <th className="py-2.5 px-4 font-semibold text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20 text-xs">
                  {visitors.map((v) => (
                    <tr key={v.id} className="hover:bg-muted/10 transition-colors">
                      <td className="py-3 px-4 font-medium text-foreground flex items-center gap-2">
                        <span>{v.flag}</span>
                        <div>
                          <span>{v.name}</span>
                          <span className="block text-[10px] text-muted-foreground">{v.country}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-primary font-mono text-[11px]">{v.page}</td>
                      <td className="py-3 px-4">
                        <span className="bg-primary/10 text-primary border border-primary/10 text-[10px] px-2 py-0.5 rounded-full font-medium">
                          {v.channel}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-muted-foreground">
                        {Math.floor(v.duration / 60)}m {v.duration % 60}s
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button 
                          onClick={() => triggerQuickAction(`Initiate direct chat with ${v.name}`)}
                          className="px-2.5 py-1 text-[10px] bg-primary text-primary-foreground font-semibold rounded-md shadow-[0_2px_8px_rgba(209,188,255,0.2)] hover:shadow-[0_2px_12px_rgba(209,188,255,0.4)] transition-all"
                        >
                          Intervene
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Channel-wise Message Distribution & Top Issues */}
        <Card className="lg:col-span-3 bg-card/40 border-border/50 backdrop-blur-md flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-foreground">Top Customer Issues</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">Top-cited categorization categories</p>
          </CardHeader>
          <CardContent className="space-y-4 flex-1">
            <IssueMetric label="Billing & Refund Queries" count={42} percentage={45} color="bg-primary" />
            <IssueMetric label="Appointment Rescheduling" count={28} percentage={30} color="bg-amber-400" />
            <IssueMetric label="API Key Credentials setup" count={14} percentage={15} color="bg-cyan-400" />
            <IssueMetric label="Product Delivery Logistics" count={9} percentage={10} color="bg-rose-400" />

            <div className="border-t border-border/40 pt-4 mt-4">
              <h5 className="text-xs font-semibold text-foreground mb-3">Channel Distribution</h5>
              <div className="grid grid-cols-2 gap-3 text-[11px]">
                <div className="flex items-center justify-between bg-muted/20 border border-border/30 rounded-lg p-2">
                  <span className="text-muted-foreground">WhatsApp</span>
                  <span className="font-semibold text-foreground">45%</span>
                </div>
                <div className="flex items-center justify-between bg-muted/20 border border-border/30 rounded-lg p-2">
                  <span className="text-muted-foreground">Web Widget</span>
                  <span className="font-semibold text-foreground">30%</span>
                </div>
                <div className="flex items-center justify-between bg-muted/20 border border-border/30 rounded-lg p-2">
                  <span className="text-muted-foreground">Email sync</span>
                  <span className="font-semibold text-foreground">12%</span>
                </div>
                <div className="flex items-center justify-between bg-muted/20 border border-border/30 rounded-lg p-2">
                  <span className="text-muted-foreground">Instagram DM</span>
                  <span className="font-semibold text-foreground">8%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>

    </div>
  );
}

function MetricCard({ 
  title, value, change, isPositive, subtitle, icon 
}: { 
  title: string; value: string; change: string; isPositive: boolean; subtitle: string; icon: React.ReactNode 
}) {
  return (
    <Card className="bg-card/45 border-border/40 backdrop-blur-md hover:bg-card/75 transition-all duration-300 relative group overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <CardHeader className="flex flex-row items-center justify-between pb-1 pt-4 px-4">
        <CardTitle className="text-xs font-bold text-muted-foreground tracking-wide uppercase">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="text-2xl font-black text-foreground mt-1">{value}</div>
        <div className="flex items-center gap-1.5 mt-1.5">
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 ${
            isPositive ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/10" : "bg-rose-500/10 text-rose-400 border border-rose-500/10"
          }`}>
            {isPositive ? <ArrowUpRight className="w-2.5 h-2.5" /> : <ArrowDownRight className="w-2.5 h-2.5" />}
            {change}
          </span>
          <span className="text-[10px] text-muted-foreground font-medium truncate">{subtitle}</span>
        </div>
      </CardContent>
    </Card>
  );
}

function QuickActionButton({ 
  label, icon, onClick 
}: { 
  label: string; icon: React.ReactNode; onClick: () => void 
}) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center justify-center p-3 rounded-xl border border-border/40 bg-muted/20 hover:bg-primary/10 hover:border-primary/30 text-muted-foreground hover:text-foreground transition-all duration-300 text-center gap-2 group relative overflow-hidden active:scale-95"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="w-8 h-8 rounded-lg bg-card/60 border border-border/60 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/20 transition-all shadow-sm">
        {icon}
      </div>
      <span className="text-[11px] font-semibold tracking-tight">{label}</span>
    </button>
  );
}

function IssueMetric({ 
  label, count, percentage, color 
}: { 
  label: string; count: number; percentage: number; color: string 
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-xs">
        <span className="font-semibold text-foreground">{label}</span>
        <span className="text-muted-foreground font-mono text-[10px]">{count} queries ({percentage}%)</span>
      </div>
      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
}

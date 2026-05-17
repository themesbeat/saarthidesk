"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, TrendingUp, Bot, MessageSquare, 
  Clock, Calendar, Sparkles, Filter, Download, 
  ArrowUpRight, AlertCircle, HelpCircle, CheckCircle2 
} from "lucide-react";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "24h">("7d");

  // Grid heat map hours
  const hours = ["9 AM", "11 AM", "1 PM", "3 PM", "5 PM", "7 PM"];
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  // Custom mock intensity values for our Activity Heatmap grid (0 to 3 scale)
  const heatmapData = [
    [1, 2, 3, 2, 1, 0], // Mon
    [2, 3, 3, 2, 2, 1], // Tue
    [1, 2, 2, 3, 3, 2], // Wed
    [2, 1, 3, 3, 2, 1], // Thu
    [3, 3, 2, 2, 3, 2], // Fri
    [1, 1, 2, 2, 1, 0], // Sat
  ];

  const getHeatmapColor = (intensity: number) => {
    switch (intensity) {
      case 3: return "bg-primary shadow-[0_0_10px_rgba(209,188,255,0.4)]"; // high
      case 2: return "bg-primary/60 border border-primary/20"; // medium
      case 1: return "bg-primary/20 border border-primary/10"; // low
      default: return "bg-[#181822] border border-border/30"; // none
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 h-full flex flex-col overflow-auto">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-primary" /> Performance Analytics
          </h1>
          <p className="text-muted-foreground">Monitor AI performance metrics, WhatsApp template delivery, and user activity.</p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Timeframe selector */}
          <div className="bg-muted/50 border border-border/50 p-0.5 rounded-lg flex">
            {[
              { id: "24h", label: "24 Hours" },
              { id: "7d", label: "7 Days" },
              { id: "30d", label: "30 Days" }
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setTimeRange(opt.id as any)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  timeRange === opt.id 
                    ? "bg-primary/20 text-primary" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm" className="border-border/50 text-foreground bg-card gap-1.5 h-8">
            <Download className="w-3.5 h-3.5" /> Export Report
          </Button>
        </div>
      </div>

      {/* 4 Cards Stats Matrix */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 flex-shrink-0">
        {/* Total Conversations */}
        <Card className="bg-card/40 border-border/50 backdrop-blur-sm shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-2xl rounded-full" />
          <CardHeader className="pb-2">
            <CardDescription className="text-xs uppercase tracking-wider font-bold text-muted-foreground flex items-center justify-between">
              Total Conversations
              <MessageSquare className="w-4 h-4 text-primary" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">1,842</div>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                <TrendingUp className="w-2.5 h-2.5" /> +18%
              </span>
              <span className="text-[10px] text-muted-foreground">vs last week</span>
            </div>
          </CardContent>
        </Card>

        {/* AI Resolution Rate */}
        <Card className="bg-card/40 border-border/50 backdrop-blur-sm shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-2xl rounded-full" />
          <CardHeader className="pb-2">
            <CardDescription className="text-xs uppercase tracking-wider font-bold text-muted-foreground flex items-center justify-between">
              AI Resolution Rate
              <Bot className="w-4 h-4 text-primary" />
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-foreground">84.6%</div>
              <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3 animate-pulse" /> Saves 42 hours/wk
              </div>
            </div>
            {/* Native SVG Radial Progress Bar */}
            <div className="relative w-12 h-12 shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-zinc-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-primary"
                  strokeDasharray="85, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  style={{ filter: "drop-shadow(0 0 4px rgba(209,188,255,0.4))" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">85%</div>
            </div>
          </CardContent>
        </Card>

        {/* WhatsApp Deliveries */}
        <Card className="bg-card/40 border-border/50 backdrop-blur-sm shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-2xl rounded-full" />
          <CardHeader className="pb-2">
            <CardDescription className="text-xs uppercase tracking-wider font-bold text-muted-foreground flex items-center justify-between">
              WhatsApp Notifications
              <Calendar className="w-4 h-4 text-primary" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">452</div>
            <div className="flex items-center gap-1.5 mt-1 text-[10px] text-muted-foreground">
              <span className="text-emerald-400 font-semibold">99.8%</span> delivery success rate
            </div>
          </CardContent>
        </Card>

        {/* Response Speed */}
        <Card className="bg-card/40 border-border/50 backdrop-blur-sm shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 blur-2xl rounded-full" />
          <CardHeader className="pb-2">
            <CardDescription className="text-xs uppercase tracking-wider font-bold text-muted-foreground flex items-center justify-between">
              Avg AI Response Speed
              <Clock className="w-4 h-4 text-primary" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">1.4s</div>
            <div className="text-[10px] text-muted-foreground/80 mt-1 flex items-center gap-1">
              <span className="text-emerald-400 font-semibold">95% faster</span> than human agents (12m avg)
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Graphs Layout */}
      <div className="grid lg:grid-cols-12 gap-6 items-start flex-grow">
        {/* Weekly Chat Volume Graph (Pure SVG with Glow and Fill Gradient) */}
        <Card className="lg:col-span-8 bg-card/50 border-border/50 backdrop-blur-sm flex flex-col h-full">
          <CardHeader>
            <CardTitle className="text-foreground text-base flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" /> Weekly Conversation Traffic
            </CardTitle>
            <CardDescription className="text-muted-foreground text-xs">A comprehensive outline of total resolved threads compared to manual escalations.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-end min-h-[300px] pt-4">
            {/* The SVG Container */}
            <div className="relative w-full h-[220px] flex-grow">
              <svg className="w-full h-full" viewBox="0 0 700 220" preserveAspectRatio="none">
                <defs>
                  {/* Glowing Fill Gradient */}
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d1bcff" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#d1bcff" stopOpacity="0.00" />
                  </linearGradient>
                  {/* Glowing Stroke Filter */}
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Horizontal Guide Gridlines */}
                <line x1="0" y1="20" x2="700" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                <line x1="0" y1="80" x2="700" y2="80" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                <line x1="0" y1="140" x2="700" y2="140" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                <line x1="0" y1="200" x2="700" y2="200" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

                {/* Translucent Bezier curve fill area */}
                {/* Points: Mon(20,180), Tue(133,140), Wed(246,190), Thu(359,80), Fri(472,60), Sat(585,110), Sun(700,90) */}
                <path
                  d="M 0,200 L 0,180 C 60,160 80,150 133,140 C 180,130 200,200 246,190 C 300,180 320,100 359,80 C 400,60 430,70 472,60 C 520,50 550,120 585,110 C 620,100 660,100 700,90 L 700,200 Z"
                  fill="url(#areaGrad)"
                />

                {/* Crisp Bezier vector line */}
                <path
                  d="M 0,180 C 60,160 80,150 133,140 C 180,130 200,200 246,190 C 300,180 320,100 359,80 C 400,60 430,70 472,60 C 520,50 550,120 585,110 C 620,100 660,100 700,90"
                  fill="none"
                  stroke="#d1bcff"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  filter="url(#glow)"
                />

                {/* Individual Glowing Data Point Circles */}
                <circle cx="133" cy="140" r="5" fill="#d1bcff" stroke="#000" strokeWidth="2" />
                <circle cx="246" cy="190" r="5" fill="#d1bcff" stroke="#000" strokeWidth="2" />
                <circle cx="359" cy="80" r="5" fill="#d1bcff" stroke="#000" strokeWidth="2" />
                <circle cx="472" cy="60" r="5" fill="#d1bcff" stroke="#000" strokeWidth="2" />
                <circle cx="585" cy="110" r="5" fill="#d1bcff" stroke="#000" strokeWidth="2" />
              </svg>
            </div>

            {/* X-Axis labels layout */}
            <div className="flex justify-between items-center text-[10px] text-muted-foreground font-bold px-2 pt-2 border-t border-border/40">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </CardContent>
        </Card>

        {/* Activity Heatmap Grid */}
        <Card className="lg:col-span-4 bg-card/50 border-border/50 backdrop-blur-sm flex flex-col h-full">
          <CardHeader>
            <CardTitle className="text-foreground text-base flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" /> Traffic Peak Hotspots
            </CardTitle>
            <CardDescription className="text-muted-foreground text-xs">Identifies peak hours when clients interact with Saarthi most heavily.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center space-y-4">
            <div className="grid grid-cols-7 gap-2">
              {/* Top empty block */}
              <div></div>
              {/* Hour Columns header */}
              {hours.map((hour, idx) => (
                <div key={idx} className="text-[9px] text-center font-bold text-muted-foreground">{hour}</div>
              ))}

              {/* Weekly grid heatmap values */}
              {weekdays.map((day, dIdx) => (
                <>
                  <div key={`d-${dIdx}`} className="text-[9px] font-bold text-muted-foreground flex items-center">{day}</div>
                  {heatmapData[dIdx].map((intensity, hIdx) => (
                    <div
                      key={`h-${dIdx}-${hIdx}`}
                      className={`h-6 rounded-md transition-all ${getHeatmapColor(intensity)}`}
                      title={`Intensity: ${intensity}`}
                    />
                  ))}
                </>
              ))}
            </div>

            <div className="flex items-center justify-between text-[9px] text-muted-foreground pt-2 border-t border-border/40">
              <span>Lower Traffic</span>
              <div className="flex gap-1">
                <span className="w-2.5 h-2.5 rounded bg-[#181822] border border-border/30"></span>
                <span className="w-2.5 h-2.5 rounded bg-primary/20"></span>
                <span className="w-2.5 h-2.5 rounded bg-primary/60"></span>
                <span className="w-2.5 h-2.5 rounded bg-primary shadow-[0_0_5px_rgba(209,188,255,0.4)]"></span>
              </div>
              <span>Peak Busy</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Automated FAQ Resolution Leaderboard */}
      <div className="grid md:grid-cols-2 gap-6 flex-shrink-0">
        <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Highly Resolved FAQs
            </CardTitle>
            <CardDescription className="text-muted-foreground text-xs">Common client questions answered perfectly without manual agent touch.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3.5">
            {[
              { q: "What is your pricing model?", count: 438, rate: "98% resolved", source: "Pricing_Brochure_2026.pdf" },
              { q: "How do I book an appointment?", count: 312, rate: "95% resolved", source: "Appointment_Scheduler_Rules" },
              { q: "Where are you located?", count: 219, rate: "100% resolved", source: "Business_Info_Sheet" },
              { q: "Can I talk to a manager?", count: 65, rate: "Escalated", source: "Smart_Escalation_Protocol" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-background/30 border border-border/30 hover:bg-muted/40 transition-colors">
                <div className="space-y-0.5">
                  <div className="text-xs text-foreground font-semibold flex items-center gap-1.5">
                    <span className="text-[10px] text-primary font-bold">#{idx+1}</span>
                    {item.q}
                  </div>
                  <div className="text-[9px] text-muted-foreground">Source match: <span className="font-semibold text-primary/80">{item.source}</span></div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-white font-bold">{item.count} hits</div>
                  <div className="text-[9px] text-emerald-400 font-semibold">{item.rate}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Active WhatsApp Reminder Campaign Metrics */}
        <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground text-sm flex items-center gap-2">
              <ArrowUpRight className="w-4 h-4 text-primary animate-pulse" /> Active Campaign Conversion logs
            </CardTitle>
            <CardDescription className="text-muted-foreground text-xs">Tracks outcomes and bookings confirmed via automated triggers.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { campaign: "Dentistry Consultation Reminder", dispatch: "148 dispatched", confirm: "142 confirmed", bounce: "0 failures" },
              { campaign: "Salon Hair-spa Slot Follow-up", dispatch: "184 dispatched", confirm: "168 confirmed", bounce: "1 failures" },
              { campaign: "Personal Gym Training Notice", dispatch: "120 dispatched", confirm: "115 confirmed", bounce: "0 failures" }
            ].map((c, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-background/30 border border-border/30 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-foreground font-bold">{c.campaign}</span>
                  <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[8px] font-bold">Active</Badge>
                </div>
                <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
                  <span>🚀 {c.dispatch}</span>
                  <span className="text-emerald-400">✔️ {c.confirm}</span>
                  <span className="text-rose-400">❌ {c.bounce}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

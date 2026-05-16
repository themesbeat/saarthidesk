"use client";

import Link from "next/link";
import React from "react";
import { 
  BarChart3, 
  TrendingUp, 
  Activity, 
  Zap, 
  Play,
  PieChart,
  DollarSign
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/ChatWidget";

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-foreground font-sans selection:bg-primary/30">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-20 md:pt-32 md:pb-24 overflow-hidden">
          {/* Background Glows */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full -mr-64 -mt-32 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full -ml-64 -mb-32 pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-bold text-indigo-400 mb-8 tracking-wider uppercase">
                <Zap className="w-3 h-3" /> AI Insights Command
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-white">
                Surgical Intelligence <br />
                for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Every Conversation</span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-10 max-w-xl leading-relaxed">
                Unpack every customer interaction with multi-layered AI analytics. 
                Track performance, revenue attribution, and sentiment shifts in real-time.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <Link 
                  href="/register" 
                  className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(209,188,255,0.3)] text-center"
                >
                  Get Started Free
                </Link>
                <Link 
                  href="/demo" 
                  className="w-full sm:w-auto px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-xl font-bold text-lg transition-all hover:bg-white/10 flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5 fill-white" /> Product tour
                </Link>
              </div>
            </div>

            {/* Premium Dashboard Mockup */}
            <div className="flex-1 w-full relative">
              <div className="relative z-10 bg-[#16161a] rounded-3xl border border-white/10 shadow-2xl overflow-hidden aspect-[4/3] group">
                {/* Mockup Top Bar */}
                <div className="h-10 border-b border-white/5 bg-white/5 flex items-center px-4 justify-between">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                  </div>
                  <div className="text-[10px] text-muted-foreground font-mono">ANALYTICS_V2.0 // LIVE</div>
                </div>
                
                {/* Mockup Content */}
                <div className="p-6 h-full flex flex-col gap-6">
                  {/* Internal Graph Mockup */}
                  <div className="flex-1 bg-[#0d0d0f] rounded-2xl border border-white/5 p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                      <div className="space-y-1">
                        <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Sentiment Flow</div>
                        <div className="text-xl font-bold text-white">94.2% Positive</div>
                      </div>
                      <div className="flex gap-2">
                        <div className="px-2 py-1 rounded bg-indigo-500/20 text-indigo-400 text-[9px] font-bold">24H</div>
                        <div className="px-2 py-1 rounded border border-white/10 text-muted-foreground text-[9px] font-bold">7D</div>
                      </div>
                    </div>
                    
                    {/* Visual Waves */}
                    <div className="flex-1 flex items-end gap-1 overflow-hidden relative">
                       {/* SVG Wave */}
                       <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 150">
                          <path 
                            d="M0,100 C50,80 100,120 150,90 C200,60 250,110 300,80 C350,50 400,90 400,90 L400,150 L0,150 Z" 
                            fill="url(#grad1)"
                          />
                          <defs>
                            <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" style={{stopColor:'rgb(99,102,241)', stopOpacity:1}} />
                              <stop offset="100%" style={{stopColor:'rgb(99,102,241)', stopOpacity:0}} />
                            </linearGradient>
                          </defs>
                       </svg>
                       <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 150">
                          <path 
                            d="M0,100 C50,80 100,120 150,90 C200,60 250,110 300,80 C350,50 400,90 400,90" 
                            fill="none" 
                            stroke="#818cf8" 
                            strokeWidth="3"
                          />
                       </svg>

                       {/* Bars */}
                       {Array.from({length: 20}).map((_, i) => (
                         <div 
                          key={i} 
                          className="flex-1 bg-white/5 rounded-t-sm" 
                          style={{ height: `${Math.random() * 60 + 20}%` }}
                         />
                       ))}
                    </div>

                    <div className="mt-6 flex justify-between items-center">
                      <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-indigo-500" />
                          <span className="text-[10px] text-muted-foreground">Automation</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-purple-500" />
                          <span className="text-[10px] text-muted-foreground">Revenue</span>
                        </div>
                      </div>
                      <div className="text-[10px] text-muted-foreground">Last updated: 2m ago</div>
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="flex gap-4 h-24">
                    <div className="flex-1 bg-[#1a1a1f] rounded-2xl border border-white/5 p-4 flex flex-col justify-center">
                      <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Response Rate</div>
                      <div className="text-xl font-bold text-white">99.8%</div>
                    </div>
                    <div className="flex-1 bg-[#1a1a1f] rounded-2xl border border-white/5 p-4 flex flex-col justify-center">
                      <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Avg Resolution</div>
                      <div className="text-xl font-bold text-white">4m 12s</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating UI Elements */}
              <div className="absolute -top-10 -left-10 z-20 bg-white/5 backdrop-blur-2xl border border-white/10 p-4 rounded-2xl shadow-2xl animate-bounce-slow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Avg. AI Accuracy</div>
                    <div className="text-2xl font-bold text-white">96.4% <span className="text-xs text-emerald-400">+2.1%</span></div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 z-20 bg-[#121216] border border-white/10 p-5 rounded-2xl shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Live Threads</div>
                    <div className="text-2xl font-bold text-white">1,284</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Master Your Metadata */}
        <section className="py-24 bg-[#0a0a0c]">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Master Your Metadata</h2>
              <p className="text-muted-foreground text-lg">One integrated ecosystem of intelligence. No silos, just insights.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
              
              {/* High-Fidelity Response Analysis */}
              <div className="lg:col-span-8 bg-[#121216] rounded-3xl border border-white/5 p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 flex gap-2">
                   <div className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[9px] text-muted-foreground font-bold">LAST 24H</div>
                   <div className="px-2 py-1 rounded bg-indigo-500/20 text-indigo-400 text-[9px] font-bold">LIVE</div>
                </div>
                
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">High-Fidelity Response Analysis</h3>
                <p className="text-muted-foreground text-sm mb-8">Precision tracking across all interaction layers.</p>
                
                {/* Mock Chart Area */}
                <div className="h-[280px] bg-black/40 rounded-2xl border border-white/5 p-6 flex flex-col relative">
                   <div className="flex-1 flex items-end justify-between gap-2">
                      {Array.from({length: 12}).map((_, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group/bar">
                           <div className="w-full bg-white/5 rounded-t-lg transition-all group-hover/bar:bg-indigo-500/40" style={{ height: `${20 + (i * 7) % 60}%` }} />
                           <div className="text-[9px] text-muted-foreground font-mono">0{i*2}:00</div>
                        </div>
                      ))}
                   </div>
                   {/* Gradient Overlay */}
                   <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/5 to-transparent pointer-events-none" />
                </div>
              </div>

              {/* AI vs Human */}
              <div className="lg:col-span-4 bg-[#121216] rounded-3xl border border-white/5 p-8 flex flex-col relative overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6">
                  <PieChart className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">AI vs Human</h3>
                
                <div className="flex-1 flex flex-col items-center justify-center py-6">
                  <div className="relative w-48 h-48 flex items-center justify-center">
                    {/* Gauge Circle */}
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#d1bcff" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="45" strokeLinecap="round" className="drop-shadow-[0_0_8px_rgba(209,188,255,0.5)]" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold text-white">82%</span>
                      <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Automation</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mt-auto">
                  <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                    <span className="text-xs text-muted-foreground">Autonomous Resolution</span>
                    <span className="text-sm font-bold text-white">782</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                    <span className="text-xs text-muted-foreground">Human Intervention</span>
                    <span className="text-sm font-bold text-white">144</span>
                  </div>
                </div>
              </div>

              {/* Real-time Signal */}
              <div className="lg:col-span-5 bg-[#121216] rounded-3xl border border-white/5 p-8 flex flex-col">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-sm font-bold text-white">Real-time Signal</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground font-mono">ID: R4-9371</span>
                </div>

                <div className="space-y-4">
                  {[
                    { intent: 'CANCEL_SUBSCRIBE', text: 'I want to cancel my subscription? It&apos;s too...', time: 'Just now', color: 'bg-rose-500/20 text-rose-400' },
                    { intent: 'FEATURE_QUERY', text: 'Can I integrate with my local Shopify store?', time: '2m ago', color: 'bg-blue-500/20 text-blue-400' },
                    { intent: 'GREETING', text: 'Hello, how can I help you today?', time: '5m ago', color: 'bg-emerald-500/20 text-emerald-400' },
                  ].map((item, i) => (
                    <div key={i} className="p-4 bg-black/40 rounded-2xl border border-white/5 group hover:border-indigo-500/30 transition-all cursor-pointer">
                      <div className="flex justify-between items-center mb-2">
                         <span className={`text-[9px] font-black px-2 py-0.5 rounded tracking-tighter ${item.color}`}>INTENT: {item.intent}</span>
                         <span className="text-[9px] text-muted-foreground">{item.time}</span>
                      </div>
                      <p className="text-sm text-foreground0 italic truncate">&quot;{item.text}&quot;</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Attributed Revenue */}
              <div className="lg:col-span-7 bg-[#121216] rounded-3xl border border-white/5 p-8 flex flex-col relative overflow-hidden">
                <div className="flex-1 flex flex-col">
                   <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-4">Attributed Revenue</div>
                   <div className="flex items-baseline gap-4 mb-6">
                      <div className="text-6xl font-black text-white">$142.8k</div>
                      <div className="text-lg font-bold text-emerald-400 flex items-center gap-1">
                        <TrendingUp className="w-5 h-5" /> 32%
                      </div>
                   </div>
                   <p className="text-muted-foreground text-sm max-w-sm mb-12">
                     AI-driven interventions contributed to 43% of total conversion lift this quarter.
                   </p>

                   {/* Mini Bar Chart */}
                   <div className="mt-auto flex items-end gap-3 h-24">
                      {[30, 45, 35, 60, 80, 50, 90, 70].map((h, i) => (
                        <div 
                          key={i} 
                          className={`flex-1 rounded-t-lg transition-all ${i === 6 ? 'bg-primary shadow-[0_0_15px_rgba(209,188,255,0.5)]' : 'bg-white/10'}`} 
                          style={{ height: `${h}%` }} 
                        />
                      ))}
                   </div>
                </div>
                
                {/* Floating Icon Background */}
                <DollarSign className="absolute -bottom-10 -right-10 w-48 h-48 text-white/[0.02] -rotate-12" />
              </div>

            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 bg-[#0a0a0c] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/5 to-transparent" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter">
              Stop guessing. <br />
              Start measuring.
            </h2>
            <p className="text-muted-foreground text-xl mb-12 max-w-2xl mx-auto">
              Deploy the most advanced analytics suite for Indian SMBs in under 5 minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <Link 
                href="/register" 
                className="px-10 py-5 bg-primary text-primary-foreground rounded-2xl font-bold text-xl hover:scale-[1.05] transition-all shadow-[0_0_30px_rgba(209,188,255,0.4)]"
              >
                Start Your Free Trial
              </Link>
              <Link 
                href="/demo" 
                className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-xl hover:bg-white/10 transition-all backdrop-blur-xl"
              >
                Book 1:1 Demo
              </Link>
            </div>

            <div className="mt-20">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em] mb-8">Trusted by 500+ teams</p>
              <div className="flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale invert">
                 <div className="text-2xl font-serif italic">Lumina</div>
                 <div className="text-2xl font-black">AETHER</div>
                 <div className="text-2xl font-bold">URBANROOT</div>
                 <div className="text-2xl font-serif">Velvet & Co.</div>
                 <div className="text-2xl font-black">ZENITH</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ChatWidget />

      {/* Custom Styles for Animations */}
      <style jsx global>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

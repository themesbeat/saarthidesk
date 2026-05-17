"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  MessageSquare, 
  Sparkles, 
  BarChart3, 
  Inbox,
  Mail,
  Plus,
  GitBranch,
  Layers,
  History,
  AtSign,
  Bot
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/ChatWidget";

export default function AgenciesSolutionPage() {
  return (
    <div className="min-h-screen bg-[#0a0c10] text-foreground font-sans selection:bg-primary/30">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-20 md:pt-32 md:pb-24 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center gap-16">
            
            <div className="flex-1 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-white/60 mb-8 tracking-widest uppercase italic">
                <Sparkles className="w-3 h-3 text-primary" /> SAARTHIDESK FOR AGENCIES
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-white">
                AI-Powered Client <br />
                Communication For <br />
                <span className="text-primary italic">Agencies</span>
              </h1>
              
              <p className="text-lg text-white/60 mb-10 max-w-xl leading-relaxed">
                Manage leads, support conversations, and client communication across WhatsApp, Instagram, and email in a unified AI-first workspace.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-5 mb-12">
                <Link 
                  href="/register" 
                  className="w-full sm:w-auto px-10 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg transition-all hover:bg-primary/90 text-center shadow-[0_10px_30px_rgba(209,188,255,0.2)]"
                >
                  Start Free Trial
                </Link>
                <Link 
                  href="/demo" 
                  className="w-full sm:w-auto px-10 py-4 bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-xl font-bold text-lg transition-all hover:bg-white/10 text-center flex items-center justify-center gap-3"
                >
                  Book a Demo
                </Link>
              </div>
            </div>

            {/* Hero Visual (Tablet Mockup) */}
            <div className="flex-1 w-full max-w-2xl relative">
              <div className="relative z-10 group">
                <div className="relative aspect-[16/10] w-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-[#0a0c10] rotate-[-2deg] group-hover:rotate-0 transition-transform duration-700">
                   <Image 
                      src="/agency_communication_tablet_mockup_1778945848245.png" 
                      alt="Agency Communication Dashboard" 
                      fill 
                      className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000" 
                   />
                   <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0c10]/40 to-transparent pointer-events-none"></div>
                </div>
              </div>
              {/* Background Glows */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/10 rounded-full blur-[120px] -z-10"></div>
            </div>

          </div>
        </section>

        {/* Section: Purpose-built */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight">Purpose-built for High-Growth Agencies</h2>
              <p className="text-white/40 text-lg">A unified intelligence layer for your entire client operation.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-7xl mx-auto">
              
              {/* Card 1: Shared Team Inbox (5 cols) */}
              <div className="md:col-span-5 bg-[#14171c] rounded-[2.5rem] border border-white/5 p-10 hover:border-primary/30 transition-all group min-h-[300px] flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                    <Inbox className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Shared Team Inbox</h3>
                  <p className="text-sm text-white/40 leading-relaxed mb-8">
                    Centralize WhatsApp, Instagram, and Email into one collaborative thread.
                  </p>
                </div>
                <div className="flex -space-x-3">
                   {[1, 2, 3].map(i => (
                      <div key={i} className={`w-10 h-10 rounded-full border-2 border-[#14171c] bg-slate-800 flex items-center justify-center font-bold text-[10px] ${i === 3 ? 'bg-primary text-foreground' : 'text-white/40'}`}>
                         {i === 3 ? <Plus className="w-4 h-4" /> : `A${i}`}
                      </div>
                   ))}
                </div>
              </div>

              {/* Card 2: AI Client Support (3 cols) */}
              <div className="md:col-span-3 bg-[#14171c] rounded-[2.5rem] border border-white/5 p-10 hover:border-indigo-400/30 transition-all group flex flex-col justify-between">
                <div className="w-10 h-10 rounded-xl bg-indigo-400/10 text-indigo-400 flex items-center justify-center border border-indigo-400/20 mb-4">
                   <Bot className="w-5 h-5" />
                </div>
                <div>
                   <h3 className="text-xl font-bold text-white mb-2 leading-tight">AI Client Support</h3>
                   <p className="text-xs text-white/40 leading-relaxed">
                      AI-crafted replies that sound exactly like your agency brand.
                   </p>
                </div>
              </div>

              {/* Card 3: Multi-channel Hub (4 cols) */}
              <div className="md:col-span-4 bg-[#14171c] rounded-[2.5rem] border border-white/5 p-10 hover:border-emerald-500/30 transition-all group flex flex-col justify-center items-center text-center">
                 <div className="flex items-center gap-6 mb-6">
                    <Mail className="w-6 h-6 text-white/20 group-hover:text-white/60 transition-colors" />
                    <MessageSquare className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                    <AtSign className="w-6 h-6 text-white/20 group-hover:text-white/60 transition-colors" />
                 </div>
                 <div className="text-sm font-bold text-white tracking-widest uppercase">Multi-channel Hub</div>
              </div>

              {/* Card 4: AI Thread Summaries (6 cols) */}
              <div className="md:col-span-6 bg-[#14171c] rounded-[2.5rem] border border-white/5 p-10 hover:border-primary/30 transition-all group flex flex-col md:flex-row gap-10 min-h-[300px]">
                 <div className="flex-1">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 border border-primary/20">
                      <History className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">AI Thread Summaries</h3>
                    <p className="text-sm text-white/40 leading-relaxed">
                      Never read 100+ messages again. Get instant bullet points of client needs and next steps.
                    </p>
                 </div>
                 <div className="flex-1 bg-[#0a0c10]/50 rounded-3xl border border-white/5 p-6 flex flex-col gap-3">
                    <div className="h-2 w-1/2 bg-white/10 rounded-full"></div>
                    <div className="h-2 w-full bg-white/5 rounded-full"></div>
                    <div className="h-2 w-3/4 bg-white/5 rounded-full"></div>
                    <div className="h-2 w-full bg-white/5 rounded-full"></div>
                 </div>
              </div>

              {/* Card 5: Lead Pipeline (3 cols) */}
              <div className="md:col-span-3 bg-[#14171c] rounded-[2.5rem] border border-white/5 p-8 hover:border-blue-400/30 transition-all group flex flex-col justify-between">
                 <div className="w-10 h-10 rounded-xl bg-blue-400/10 text-blue-400 flex items-center justify-center border border-blue-400/20 mb-4">
                    <GitBranch className="w-5 h-5 rotate-90" />
                 </div>
                 <div>
                    <h3 className="text-lg font-bold text-white mb-1">Lead Pipeline</h3>
                    <p className="text-[10px] text-white/40 leading-relaxed">Track prospects from Instagram DM to signed contract.</p>
                 </div>
              </div>

              {/* Card 6: @Mentions (3 cols) */}
              <div className="md:col-span-3 bg-[#14171c] rounded-[2.5rem] border border-white/5 p-8 hover:border-orange-400/30 transition-all group flex flex-col justify-between">
                 <div className="w-10 h-10 rounded-xl bg-orange-400/10 text-orange-400 flex items-center justify-center border border-orange-400/20 mb-4">
                    <AtSign className="w-5 h-5" />
                 </div>
                 <div>
                    <h3 className="text-lg font-bold text-white mb-1">@Mentions</h3>
                    <p className="text-[10px] text-white/40 leading-relaxed">Private notes for team internal context within client chats.</p>
                 </div>
              </div>

              {/* Card 7: Advanced Analytics (5 cols) */}
              <div className="md:col-span-5 bg-[#14171c] rounded-[2.5rem] border border-white/5 p-10 hover:border-emerald-500/30 transition-all group flex flex-col justify-between min-h-[350px]">
                 <div>
                    <div className="flex justify-between items-start mb-8">
                       <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                          <BarChart3 className="w-5 h-5 text-emerald-500" />
                       </div>
                       <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-500">
                          +24% efficiency
                       </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Advanced Analytics</h3>
                 </div>
                 <div className="flex items-end gap-2 h-32">
                    {[40, 60, 90, 70, 85, 45].map((h, i) => (
                       <div key={i} className="flex-1 bg-primary/20 rounded-t-lg group-hover:bg-primary/40 transition-all" style={{ height: `${h}%` }}></div>
                    ))}
                 </div>
              </div>

              {/* Card 8: Workflow Automation (7 cols) */}
              <div className="md:col-span-7 bg-[#14171c] rounded-[2.5rem] border border-white/5 p-10 hover:border-primary/30 transition-all group flex flex-col md:flex-row items-center gap-10 min-h-[350px]">
                 <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-4">Workflow Automation</h3>
                    <p className="text-sm text-white/40 leading-relaxed">
                       &quot;If Instagram Lead arrives, notify sales and generate AI summary.&quot;
                    </p>
                 </div>
                 <div className="flex-1 flex justify-center">
                    <div className="w-24 h-24 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center animate-pulse">
                       <Layers className="w-10 h-10 text-primary" />
                    </div>
                 </div>
              </div>

            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 bg-[#0a0c10]">
          <div className="container mx-auto max-w-6xl bg-gradient-to-br from-[#1a1d23] to-[#0a0c10] rounded-[4rem] p-16 md:p-24 text-center relative overflow-hidden border border-white/5 shadow-2xl">
            <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[180px] pointer-events-none"></div>
            
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight leading-[1.1]">
              Ready to scale your agency <br /> with AI?
            </h2>
            <p className="text-white/40 text-xl mb-14 max-w-2xl mx-auto leading-relaxed">
              Join 200+ top-tier agencies using SaarthiDesk to automate their client operations and close leads faster.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-10">
              <Link 
                href="/register" 
                className="px-12 py-5 bg-primary text-primary-foreground rounded-2xl font-black text-xl hover:bg-primary/90 transition-all shadow-[0_20px_40px_rgba(209,188,255,0.15)]"
              >
                Start Free Trial
              </Link>
              <Link 
                href="/demo" 
                className="px-12 py-5 bg-white/5 text-white border border-white/10 rounded-2xl font-bold text-xl hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                Book a Demo
              </Link>
            </div>
            
            <p className="text-[11px] font-bold text-white/20 uppercase tracking-widest">No credit card required. 14-day free trial.</p>
          </div>
        </section>

      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}

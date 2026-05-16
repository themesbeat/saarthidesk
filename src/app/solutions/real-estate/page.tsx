"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  Calendar, 
  MessageSquare, 
  Bell, 
  Search, 
  Inbox, 
  FileText, 
  Sparkles, 
  ClipboardList,
  CheckCircle2,
  Bot,
  Shield,
  Clock,
  TrendingUp,
  UserCheck,
  Star,
  Tag,
  Megaphone,
  Users,
  Zap,
  Play,
  ArrowRight,
  Activity,
  BarChart3,
  MapPin,
  Home,
  DollarSign
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/ChatWidget";

export default function RealEstateSolutionPage() {
  return (
    <div className="min-h-screen bg-[#0a0c10] text-foreground font-sans selection:bg-primary/30">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-20 md:pt-32 md:pb-24 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center gap-16">
            
            <div className="flex-1 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-white/60 mb-8 tracking-widest uppercase">
                <Sparkles className="w-3 h-3 text-primary" /> RE-IMAGINING REAL ESTATE OPS
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-white">
                AI Lead Management For <br />
                <span className="text-primary italic">Real Estate</span> Teams
              </h1>
              
              <p className="text-lg text-white/60 mb-10 max-w-xl leading-relaxed">
                Automatically qualify property leads, respond instantly, and manage customer conversations from one AI-powered inbox.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <Link 
                  href="/register" 
                  className="w-full sm:w-auto px-10 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg transition-all hover:bg-primary/90 text-center shadow-[0_10px_30px_rgba(209,188,255,0.2)] flex items-center justify-center gap-2"
                >
                  Get Started <ArrowRight className="w-5 h-5" />
                </Link>
                <Link 
                  href="/demo" 
                  className="w-full sm:w-auto px-10 py-4 bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-xl font-bold text-lg transition-all hover:bg-white/10 text-center flex items-center justify-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center">
                    <Play className="w-3 h-3 fill-current" />
                  </div>
                  Watch Demo
                </Link>
              </div>
            </div>

            {/* Hero Visual (Dashboard Mockup) */}
            <div className="flex-1 w-full max-w-2xl relative">
              <div className="relative z-10 group">
                <div className="absolute top-1/4 -right-8 z-20 bg-[#1a1d23] border border-white/10 p-4 rounded-2xl shadow-2xl backdrop-blur-xl animate-float">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">High Intent Lead</span>
                  </div>
                  <div className="text-lg font-bold text-white mb-1">Conversion Prob.</div>
                  <div className="text-3xl font-black text-primary italic">89.4%</div>
                  <div className="mt-2 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[89%]"></div>
                  </div>
                </div>
                
                <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#0a0c10]">
                   <Image 
                      src="/real_estate_dashboard_mockup_1778943839262.png" 
                      alt="Real Estate Dashboard" 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-1000 opacity-80" 
                   />
                </div>
              </div>
              {/* Background Glows */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 rounded-full blur-[120px] -z-10"></div>
            </div>

          </div>
        </section>

        {/* Bento Grid Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-7xl mx-auto">
              
              {/* Card 1: AI Lead Qualification (6 cols) */}
              <div className="md:col-span-6 bg-[#14171c] rounded-[2.5rem] border border-white/5 p-10 hover:border-primary/30 transition-all group overflow-hidden flex flex-col justify-between min-h-[450px]">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-8 border border-primary/20">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 leading-tight">AI Lead Qualification</h3>
                  <p className="text-base text-white/40 leading-relaxed mb-10 max-w-sm">
                    Automatically screen leads based on budget, timeline, and location preferences before your team even picks up the phone.
                  </p>
                </div>
                
                {/* Visual Content */}
                <div className="bg-[#0a0c10]/50 rounded-3xl p-6 border border-white/5 space-y-4">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <DollarSign className="w-4 h-4 text-emerald-400" />
                         <span className="text-xs text-white/60">Budget: $2M+</span>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                   </div>
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <Clock className="w-4 h-4 text-primary" />
                         <span className="text-xs text-white/60">Timeline: 3 Months</span>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                   </div>
                   <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Auto-Qualified</span>
                      <span className="text-xl font-black text-white italic">9.8/10</span>
                   </div>
                </div>
              </div>

              {/* Card 2: Instant WhatsApp Replies (6 cols) */}
              <div className="md:col-span-6 bg-[#14171c] rounded-[2.5rem] border border-white/5 p-10 hover:border-blue-400/30 transition-all group overflow-hidden flex flex-col justify-between min-h-[450px]">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-400/10 text-blue-400 flex items-center justify-center mb-8 border border-blue-400/20">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 leading-tight">Instant WhatsApp Replies</h3>
                  <p className="text-base text-white/40 leading-relaxed mb-10 max-w-sm">
                    AI responds to buyer queries in seconds, handling common questions about amenities, floor plans, and pricing 24/7.
                  </p>
                </div>
                
                {/* Visual Content: Chat UI */}
                <div className="space-y-4">
                   <div className="bg-white/5 rounded-2xl rounded-tl-none p-4 text-sm text-white/80 border border-white/5 max-w-[80%]">
                      Is there a gym in the building?
                   </div>
                   <div className="bg-primary/20 rounded-2xl rounded-tr-none p-4 text-sm text-white/90 ml-auto max-w-[85%] border border-primary/20">
                      <div className="flex items-center gap-2 mb-2">
                         <Bot className="w-3 h-3 text-primary" />
                         <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Saarthi AI</span>
                      </div>
                      Yes! The complex features a state-of-the-art 24/7 fitness center on the 4th floor with panoramic city views.
                   </div>
                </div>
              </div>

              {/* Card 3: Inquiry Automation (4 cols) */}
              <div className="md:col-span-4 bg-[#14171c] rounded-[2.5rem] border border-white/5 p-8 hover:border-orange-400/30 transition-all group min-h-[300px] flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-orange-400/10 text-orange-400 flex items-center justify-center mb-6 border border-orange-400/20">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 leading-tight">Inquiry Automation</h3>
                  <p className="text-sm text-white/40 leading-relaxed">
                    Triage incoming requests from portals like Zillow, PropertyFinder, or your own site directly into the right pipeline.
                  </p>
                </div>
              </div>

              {/* Card 4: Automated Nurture (2 cols) */}
              <div className="md:col-span-2 bg-[#14171c] rounded-[2.5rem] border border-white/5 p-6 hover:border-indigo-400/30 transition-all group flex flex-col justify-between">
                <div className="w-8 h-8 rounded-lg bg-indigo-400/10 text-indigo-400 flex items-center justify-center mb-4 border border-indigo-400/20">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">Automated Nurture</h4>
                  <p className="text-[11px] text-white/40 leading-relaxed">
                    Scheduled follow-ups that sound human, ensuring no lead goes cold.
                  </p>
                </div>
              </div>

              {/* Card 5: Team Sync (2 cols) */}
              <div className="md:col-span-2 bg-[#14171c] rounded-[2.5rem] border border-white/5 p-6 hover:border-primary/30 transition-all group flex flex-col justify-between">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 border border-primary/20">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">Team Sync</h4>
                  <p className="text-[11px] text-white/40 leading-relaxed">
                    Assign leads to agents and collaborate on threads seamlessly.
                  </p>
                </div>
              </div>

              {/* Card 6: Proprietary Scoring (4 cols) */}
              <div className="md:col-span-4 bg-[#14171c] rounded-[2.5rem] border border-white/5 p-8 hover:border-emerald-400/30 transition-all group flex flex-col justify-between min-h-[300px]">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center border border-emerald-400/20">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md">+12%</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1">Proprietary Scoring</div>
                  <div className="text-4xl font-black text-white italic mb-2">842</div>
                  <p className="text-[11px] text-white/40 font-medium">Avg. Quality Score per Lead</p>
                </div>
              </div>

              {/* Card 7: Smart Scheduling (8 cols) */}
              <div className="md:col-span-8 bg-[#14171c] rounded-[2.5rem] border border-white/5 p-10 hover:border-primary/30 transition-all group overflow-hidden flex flex-col md:flex-row gap-10 min-h-[350px]">
                <div className="flex-1 flex flex-col justify-center">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 border border-primary/20">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 leading-tight">Smart Scheduling</h3>
                  <p className="text-base text-white/40 leading-relaxed max-w-xs">
                    AI books viewings directly into your agent's calendars based on availability and property location.
                  </p>
                </div>
                
                {/* Visual Content: Time Picker */}
                <div className="flex-1 bg-[#0a0c10]/50 rounded-[2rem] border border-white/5 p-6 flex flex-col justify-center gap-3">
                   <div className="text-center mb-2">
                      <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Friday, Oct 24</div>
                   </div>
                   <div className="px-4 py-3 bg-white/5 rounded-xl border border-white/5 text-xs text-white/40 flex justify-between items-center opacity-50">
                      10:00 AM - Booked
                   </div>
                   <div className="px-4 py-3 bg-primary/20 rounded-xl border border-primary/40 text-xs text-white font-bold flex justify-between items-center animate-pulse">
                      11:30 AM - Suggested <CheckCircle2 className="w-4 h-4 text-primary" />
                   </div>
                   <div className="px-4 py-3 bg-white/5 rounded-xl border border-white/5 text-xs text-white/40 flex justify-between items-center opacity-50">
                      02:00 PM - Booked
                   </div>
                </div>
              </div>

              {/* Card 8: Pipeline Velocity (4 cols) */}
              <div className="md:col-span-4 bg-[#14171c] rounded-[2.5rem] border border-white/5 p-10 hover:border-indigo-400/30 transition-all group overflow-hidden flex flex-col justify-between min-h-[350px]">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-indigo-400/10 text-indigo-400 flex items-center justify-center mb-6 border border-indigo-400/20">
                    <Activity className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 leading-tight">Pipeline Velocity</h3>
                </div>
                
                {/* Visual Content: Mini Graph */}
                <div className="flex items-end gap-2 h-24 mb-4">
                   {[30, 45, 60, 40, 85, 55, 95].map((h, i) => (
                      <div 
                         key={i} 
                         className={`flex-1 rounded-sm transition-all duration-700 delay-${i * 50} ${i === 6 ? 'bg-primary' : 'bg-white/10'}`} 
                         style={{ height: `${h}%` }}
                      ></div>
                   ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-6xl bg-gradient-to-br from-[#1a1d23] to-[#0a0c10] rounded-[3rem] p-16 md:p-20 text-center relative overflow-hidden border border-white/5 shadow-2xl">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -mr-48 -mt-48"></div>
            
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 relative z-10 tracking-tight leading-[1.1]">
              Ready to automate your <br /> property pipeline?
            </h2>
            <p className="text-white/40 text-xl mb-12 max-w-2xl mx-auto relative z-10 leading-relaxed">
              Join 500+ premium real estate agencies using SaarthiDesk to close deals faster with AI.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
              <Link 
                href="/register" 
                className="px-10 py-5 bg-primary text-primary-foreground rounded-2xl font-black text-xl hover:bg-primary/90 transition-all shadow-[0_20px_40px_rgba(209,188,255,0.15)]"
              >
                Get Started Free
              </Link>
              <Link 
                href="/sales" 
                className="px-10 py-5 bg-white/5 text-white border border-white/10 rounded-2xl font-bold text-xl hover:bg-white/10 transition-all"
              >
                Talk to Sales
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  MessageSquare, 
  Bell, 
  Sparkles, 
  Plus,
  TrendingUp,
  Zap,
  Play,
  ArrowRight,
  BarChart3,
  GraduationCap,
  UserPlus
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/ChatWidget";

export default function CoachingSolutionPage() {
  return (
    <div className="min-h-screen bg-[#0a0c10] text-foreground font-sans selection:bg-primary/30">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-20 md:pt-32 md:pb-24 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center gap-16">
            
            <div className="flex-1 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-white/60 mb-8 tracking-widest uppercase italic">
                <Zap className="w-3 h-3 text-primary" /> AI-POWERED ADMISSIONS
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-white">
                AI Communication For <br />
                <span className="text-primary italic">Coaching</span> Institutes
              </h1>
              
              <p className="text-lg text-white/60 mb-10 max-w-xl leading-relaxed">
                Automate student inquiries, admission follow-ups, and WhatsApp communication using AI. Scale your counseling team without increasing headcount.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-5 mb-12">
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

              <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">Trusted by 500+ institutes across India</p>
            </div>

            {/* Hero Visual (Dashboard Mockup) */}
            <div className="flex-1 w-full max-w-2xl relative">
              <div className="relative z-10 group">
                 <div className="absolute -bottom-6 -left-6 z-20 bg-[#1a1d23] border border-white/10 p-5 rounded-2xl shadow-2xl backdrop-blur-xl animate-float">
                    <div className="flex items-center gap-3 mb-2">
                       <TrendingUp className="w-4 h-4 text-emerald-400" />
                       <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Growth Metric</span>
                    </div>
                    <div className="text-3xl font-black text-white italic">+40%</div>
                    <div className="text-[9px] text-white/30 font-medium">Admissions Growth</div>
                 </div>

                <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#0a0c10]">
                   <Image 
                      src="/coaching_admission_dashboard_mockup_1778945107951.png" 
                      alt="Coaching Admission Dashboard" 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-1000 opacity-90" 
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
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight leading-tight">The Intelligence Behind Your Growth</h2>
              <p className="text-white/40 text-lg">Everything you need to automate your institute&apos;s counseling office.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-7xl mx-auto">
              
              {/* Card 1: AI Student Support (4 cols wide, tall) */}
              <div className="md:col-span-5 bg-[#14171c] rounded-[2.5rem] border border-white/5 p-10 hover:border-primary/30 transition-all group overflow-hidden flex flex-col justify-between min-h-[500px]">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-8 border border-primary/20">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 leading-tight">AI Student Support</h3>
                  <p className="text-base text-white/40 leading-relaxed mb-10">
                    24/7 AI-powered helpdesk answering complex student queries about syllabus, faculty, and batch timings instantly.
                  </p>
                </div>
                
                {/* Visual Content: Chat UI */}
                <div className="bg-[#0a0c10]/50 rounded-3xl p-6 border border-white/5 space-y-4">
                   <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0"></div>
                      <div className="bg-white/5 rounded-2xl rounded-tl-none p-4 text-[11px] text-white/80 border border-white/5">
                         &quot;The JEE Advanced batch starts on April 15th. Would you like to see the detailed faculty profile?&quot;
                      </div>
                   </div>
                </div>
              </div>

              {/* Card 2: WhatsApp Automation (7 cols wide, top right) */}
              <div className="md:col-span-7 bg-[#14171c] rounded-[2.5rem] border border-white/5 p-10 hover:border-emerald-500/30 transition-all group overflow-hidden flex flex-col md:flex-row gap-10 min-h-[240px]">
                 <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-4 leading-tight">WhatsApp Automation</h3>
                    <p className="text-sm text-white/40 leading-relaxed">
                       Automated fee reminders and admission confirmations via WhatsApp.
                    </p>
                 </div>
                 <div className="flex-1 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform">
                       <MessageSquare className="w-8 h-8 text-emerald-500" />
                    </div>
                 </div>
              </div>

              {/* Card 3: Lead Manager (3.5 cols, middle) */}
              <div className="md:col-span-3.5 bg-[#14171c] rounded-[2.5rem] border border-white/5 p-8 hover:border-blue-400/30 transition-all group flex flex-col justify-between min-h-[240px]">
                <div className="w-10 h-10 rounded-xl bg-blue-400/10 text-blue-400 flex items-center justify-center mb-4 border border-blue-400/20">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Lead Manager</h3>
                  <p className="text-xs text-white/40 leading-relaxed">
                    Track every student progress from inquiry to enrollment.
                  </p>
                </div>
              </div>

              {/* Card 4: Smart Reminders (3.5 cols, middle) */}
              <div className="md:col-span-3.5 bg-[#14171c] rounded-[2.5rem] border border-white/5 p-8 hover:border-orange-400/30 transition-all group flex flex-col justify-between min-h-[240px]">
                <div className="w-10 h-10 rounded-xl bg-orange-400/10 text-orange-400 flex items-center justify-center mb-4 border border-orange-400/20">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Smart Reminders</h3>
                  <p className="text-xs text-white/40 leading-relaxed">
                    Never miss a cold inquiry with intelligent follow-up scheduling.
                  </p>
                </div>
              </div>

              {/* Card 5: Shared Counseling Inbox (7 cols, bottom left) */}
              <div className="md:col-span-7 bg-[#14171c] rounded-[2.5rem] border border-white/5 p-10 hover:border-primary/30 transition-all group flex flex-col md:flex-row items-center gap-10 min-h-[250px]">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-4 leading-tight">Shared Counseling Inbox</h3>
                  <p className="text-sm text-white/40 leading-relaxed">
                    A unified workspace for counselors and admission officers to collaborate.
                  </p>
                </div>
                <div className="flex -space-x-3">
                   {[1, 2, 3].map(i => (
                      <div key={i} className={`w-12 h-12 rounded-full border-4 border-[#14171c] bg-slate-800 flex items-center justify-center font-bold text-xs ${i === 3 ? 'bg-primary text-foreground' : 'text-white/40'}`}>
                         {i === 3 ? <Plus className="w-5 h-5" /> : `U${i}`}
                      </div>
                   ))}
                </div>
              </div>

              {/* Card 6: Shared Brain (2.5 cols, bottom right) */}
              <div className="md:col-span-2.5 bg-[#14171c] rounded-[2.5rem] border border-white/5 p-8 hover:border-indigo-400/30 transition-all group flex flex-col justify-between min-h-[250px]">
                <div className="w-10 h-10 rounded-xl bg-indigo-400/10 text-indigo-400 flex items-center justify-center mb-4 border border-indigo-400/20">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="text-sm font-bold text-white">Shared Brain</div>
              </div>

              {/* Card 7: Conversion Insights (2.5 cols, bottom right) */}
              <div className="md:col-span-2.5 bg-[#14171c] rounded-[2.5rem] border border-white/5 p-8 hover:border-emerald-400/30 transition-all group flex flex-col justify-between min-h-[250px]">
                <div className="w-10 h-10 rounded-xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-400/20">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div className="text-sm font-bold text-white">Conversion Insights</div>
              </div>

            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 bg-[#0a0c10]">
          <div className="container mx-auto max-w-6xl bg-gradient-to-br from-[#1a1d23] to-[#0a0c10] rounded-[3rem] p-16 md:p-24 text-center relative overflow-hidden border border-white/5 shadow-2xl">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] -mr-64 -mt-64"></div>
            
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 relative z-10 tracking-tight leading-[1.1]">
              Ready to transform your admissions?
            </h2>
            <p className="text-white/40 text-xl mb-14 max-w-3xl mx-auto relative z-10 leading-relaxed">
              Join the top 5% of coaching institutes using AI to scale their impact.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10 mb-8">
              <Link 
                href="/register" 
                className="px-12 py-5 bg-primary text-primary-foreground rounded-2xl font-black text-xl hover:bg-primary/90 transition-all shadow-[0_20px_40px_rgba(209,188,255,0.15)] flex items-center justify-center gap-3"
              >
                Start Free Trial
              </Link>
              <Link 
                href="/demo" 
                className="px-12 py-5 bg-white/5 text-white border border-white/10 rounded-2xl font-bold text-xl hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                Book 1-on-1 Consultation
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

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
  Dumbbell
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/ChatWidget";

export default function GymsSolutionPage() {
  return (
    <div className="min-h-screen bg-[#0a0c10] text-foreground font-sans selection:bg-primary/30">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-20 md:pt-32 md:pb-24 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center gap-16">
            
            <div className="flex-1 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-white/60 mb-8 tracking-widest uppercase">
                SAARTHIDESK FOR GYMS V2.0
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-white">
                Never Miss A <br />
                <span className="text-primary italic">Gym Lead</span> <br />
                Again
              </h1>
              
              <p className="text-lg text-white/60 mb-10 max-w-xl leading-relaxed">
                Use AI to automate WhatsApp replies, membership inquiries, follow-ups, and customer engagement for your fitness empire.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <Link 
                  href="/register" 
                  className="w-full sm:w-auto px-10 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg transition-all hover:bg-primary/90 text-center shadow-[0_10px_30px_rgba(209,188,255,0.2)]"
                >
                  Get Started
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

            {/* Hero Visual (Laptop Mockup) */}
            <div className="flex-1 w-full max-w-2xl relative">
              <div className="relative z-10 group">
                <div className="absolute -top-6 -right-6 z-20 bg-blue-600 text-white text-[10px] font-black px-4 py-2 rounded-lg shadow-xl animate-bounce flex items-center gap-2 border border-blue-400">
                  <TrendingUp className="w-3 h-3" /> Membership Growth +115%
                </div>
                <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                   <Image 
                      src="/gym_dashboard_laptop_mockup_1778941888066.png" 
                      alt="Gym Dashboard" 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-1000" 
                   />
                </div>
              </div>
              {/* Background Glows */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 rounded-full blur-[120px] -z-10"></div>
            </div>

          </div>
        </section>

        {/* Features Section */}
        <section className="py-32 relative">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight">Built for High-Growth Fitness Brands</h2>
              <p className="text-white/40 text-lg">The all-in-one AI engine for your sales and support stack.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              
              {/* Card 1: Membership Inquiry Automation */}
              <div className="bg-[#14171c] rounded-[2rem] border border-white/5 p-10 hover:border-primary/30 transition-all group relative overflow-hidden flex flex-col justify-between min-h-[320px]">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 border border-primary/20">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Membership Inquiry Automation</h3>
                  <p className="text-sm text-white/40 leading-relaxed mb-8">
                    AI handles pricing, amenities, and trial questions 24/7 with human-like precision.
                  </p>
                </div>
                
                <div className="space-y-3 mt-auto">
                   <div className="flex gap-2 items-start">
                      <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-[8px] font-bold text-white">AI</div>
                      <div className="bg-white/5 rounded-xl rounded-tl-none p-3 text-[10px] text-white/80 border border-white/5">
                         Our Gold Plan is ₹2999/mo including 24/7 access. Would you like a free guest pass?
                      </div>
                   </div>
                   <div className="bg-primary/20 rounded-xl rounded-tr-none p-3 text-[10px] text-white/90 ml-auto max-w-[80%] border border-primary/20 flex items-center justify-between">
                      "Yes, send me one"
                      <Zap className="w-3 h-3 text-primary" />
                   </div>
                </div>
              </div>

              {/* Card 2: AI WhatsApp Support */}
              <div className="bg-[#14171c] rounded-[2rem] border border-white/5 p-10 hover:border-blue-400/30 transition-all group relative overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-400/10 text-blue-400 flex items-center justify-center mb-6 border border-blue-400/20">
                    <Bot className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">AI WhatsApp Support</h3>
                </div>
                
                <div className="space-y-3 mt-8 opacity-40">
                   <div className="h-8 bg-white/5 rounded-full w-2/3"></div>
                   <div className="h-10 bg-primary/40 rounded-full w-3/4 ml-auto"></div>
                </div>
              </div>

              {/* Card 3: Trial Booking */}
              <div className="bg-[#14171c] rounded-[2rem] border border-white/5 p-10 hover:border-orange-400/30 transition-all group relative overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-orange-400/10 text-orange-400 flex items-center justify-center mb-6 border border-orange-400/20">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Trial Booking</h3>
                </div>
                <div className="grid grid-cols-4 gap-2 mt-8">
                   {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                      <div key={i} className={`aspect-square rounded-lg border border-white/5 flex items-center justify-center transition-all ${i === 3 ? 'bg-primary/40 border-primary/40' : 'bg-white/5'}`}></div>
                   ))}
                </div>
              </div>

              {/* Card 4: Lead Conversion Chart */}
              <div className="bg-[#14171c] rounded-[2rem] border border-white/5 p-10 hover:border-indigo-400/30 transition-all group relative overflow-hidden">
                <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-4">LEAD CONVERSION</div>
                <div className="flex items-end gap-1.5 h-24 mb-6">
                   {[20, 35, 50, 75, 90].map((h, i) => (
                      <div 
                         key={i} 
                         className={`flex-1 rounded-sm transition-all duration-700 delay-${i * 100} ${i === 4 ? 'bg-primary' : i === 3 ? 'bg-primary/60' : 'bg-white/10'}`} 
                         style={{ height: `${h}%` }}
                      ></div>
                   ))}
                </div>
                <p className="text-[11px] text-white/40 leading-relaxed font-medium">
                  AI-optimized funnel tracks every interaction from lead to member.
                </p>
              </div>

              {/* Card 5: Automated Reminders (Wide) */}
              <div className="lg:col-span-2 bg-[#14171c] rounded-[2rem] border border-white/5 p-10 hover:border-primary/30 transition-all group relative overflow-hidden flex flex-col justify-between">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">Automated Reminders</h3>
                    <p className="text-sm text-white/40 leading-relaxed">
                      Never let a trial session go cold with smart follow-ups.
                    </p>
                  </div>
                  <div className="px-3 py-1 bg-primary/10 text-primary text-[9px] font-black rounded-full border border-primary/20 tracking-widest">LIVE</div>
                </div>
                
                <div className="space-y-4">
                   <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex items-center gap-4 group-hover:bg-white/10 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                         <Bell className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                         <div className="text-[11px] text-white font-bold">Follow-up: Rahul Sharma</div>
                         <div className="text-[10px] text-white/40">Sent reminder for 6 PM Session</div>
                      </div>
                   </div>
                   <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex items-center gap-4 group-hover:bg-white/10 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center">
                         <Inbox className="w-4 h-4 text-indigo-400" />
                      </div>
                      <div>
                         <div className="text-[11px] text-white font-bold">Email: Priya Patel</div>
                         <div className="text-[10px] text-white/40">Membership offer expiring in 2h</div>
                      </div>
                   </div>
                </div>
              </div>

              {/* Card 6: Performance Score */}
              <div className="bg-[#14171c] rounded-[2rem] border border-white/5 p-10 hover:border-emerald-400/30 transition-all group relative overflow-hidden flex flex-col justify-center items-center text-center">
                 <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-4">PERFORMANCE SCORE</div>
                 <div className="text-6xl font-black text-white mb-3 tracking-tighter">98%</div>
                 <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
                    <Zap className="w-3 h-3" /> Elite Performance
                 </div>
              </div>

              {/* Card 7: Team Collaboration */}
              <div className="bg-[#14171c] rounded-[2rem] border border-white/5 p-10 hover:border-primary/30 transition-all group relative overflow-hidden flex flex-col justify-between">
                <h3 className="text-xl font-bold text-white mb-6">Team Collaboration</h3>
                <div className="space-y-4">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden relative border border-white/10">
                         <Image src="https://i.pravatar.cc/100?u=vikram" alt="Vikram" fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                         <div className="flex items-center justify-between">
                            <span className="text-[11px] text-white font-bold">Vikram</span>
                            <span className="text-[9px] font-black text-white/20 uppercase tracking-widest px-2 py-0.5 bg-white/5 rounded-md">Closing Fast</span>
                         </div>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center border border-white/10">
                         <Bot className="w-4 h-4 text-foreground" />
                      </div>
                      <div className="flex-1">
                         <div className="flex items-center justify-between">
                            <span className="text-[11px] text-white font-bold">Saarthi AI</span>
                            <span className="text-[9px] font-black text-primary uppercase tracking-widest px-2 py-0.5 bg-primary/10 rounded-md">On standby</span>
                         </div>
                      </div>
                   </div>
                </div>
              </div>

              {/* Card 8: Activity Stream */}
              <div className="bg-[#14171c] rounded-[2rem] border border-white/5 p-10 hover:border-primary/30 transition-all group relative overflow-hidden flex flex-col justify-between">
                <h3 className="text-xl font-bold text-white mb-6">Activity Stream</h3>
                <div className="space-y-5">
                   <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                      <div className="flex-1">
                         <p className="text-[11px] text-white/80 leading-relaxed">
                            New trial booked: <span className="text-white font-bold">"strength & conditioning"</span>
                         </p>
                         <span className="text-[9px] text-white/20 font-medium">2m ago</span>
                      </div>
                   </div>
                   <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5"></div>
                      <div className="flex-1">
                         <p className="text-[11px] text-white/80 leading-relaxed">
                            Payment received: <span className="text-white font-bold">Gold Membership (Anjali R.)</span>
                         </p>
                         <span className="text-[9px] text-white/20 font-medium">15m ago</span>
                      </div>
                   </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-4 bg-[#0a0c10]">
          <div className="container mx-auto max-w-6xl bg-gradient-to-br from-[#1a1d23] to-[#0a0c10] rounded-[3rem] p-16 md:p-24 text-center relative overflow-hidden border border-white/5 shadow-2xl">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] -mr-64 -mt-64"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[150px] -ml-64 -mb-64"></div>
            
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 relative z-10 tracking-tight leading-[1.1]">
              Ready to scale your gym?
            </h2>
            <p className="text-white/40 text-xl mb-14 max-w-3xl mx-auto relative z-10 leading-relaxed">
              Join 500+ premium Indian fitness brands automating their growth with SaarthiDesk.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10 mb-8">
              <Link 
                href="/register" 
                className="px-12 py-5 bg-primary text-primary-foreground rounded-2xl font-black text-xl hover:bg-primary/90 transition-all shadow-[0_20px_40px_rgba(209,188,255,0.15)] flex items-center justify-center gap-3"
              >
                Start 14-Day Free Trial
              </Link>
              <Link 
                href="/demo" 
                className="px-12 py-5 bg-white/5 text-white border border-white/10 rounded-2xl font-bold text-xl hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                Book a Personalized Demo
              </Link>
            </div>
            <p className="text-[11px] text-white/20 font-bold uppercase tracking-widest relative z-10">
               No credit card required. Setup in 10 minutes.
            </p>
          </div>
        </section>

      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}

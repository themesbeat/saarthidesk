"use client";

import Link from "next/link";
import { 
  Bot, 
  Sparkles, 
  Play, 
  Calendar, 
  Clock, 
  UserCheck, 
  Bell, 
  AlertTriangle,
  CheckCircle2,
  CalendarCheck,
  Brain,
  MessageSquare,
  Mail
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/ChatWidget";

export default function AIReceptionistPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-foreground font-sans selection:bg-primary/30">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden">
          {/* Background Glows */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full -mr-64 -mt-32 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full -ml-64 -mb-32 pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-bold text-indigo-400 mb-8 tracking-wider uppercase">
                <Sparkles className="w-3 h-3" /> New: AI Receptionist V2
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-white">
                Your AI Receptionist, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Available 24/7</span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-10 max-w-xl leading-relaxed">
                Automatically answer customer questions, book appointments, 
                qualify leads, and support customers around the clock.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <Link 
                  href="/register" 
                  className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(209,188,255,0.3)] text-center"
                >
                  Start Free Trial
                </Link>
                <Link 
                  href="/demo" 
                  className="w-full sm:w-auto px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-xl font-bold text-lg transition-all hover:bg-white/10 flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5 fill-white" /> Watch Video
                </Link>
              </div>
            </div>

            {/* Appointment Booking Mockup */}
            <div className="flex-1 w-full relative">
               <div className="relative z-10 bg-[#16161a] rounded-3xl border border-white/10 shadow-2xl overflow-hidden p-8">
                  <div className="flex items-center gap-3 mb-8">
                     <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                        <Bot className="w-6 h-6" />
                     </div>
                     <div>
                        <div className="text-sm font-bold text-white">AI Assistant</div>
                        <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                           <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" /> Active
                        </div>
                     </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
                     <p className="text-sm text-foreground mb-4 italic">&quot;I&apos;ve booked your dental checkup for Tuesday at 2 PM. Would you like a reminder?&quot;</p>
                     
                     <div className="bg-black/40 rounded-xl p-4 border border-white/5">
                        <div className="flex justify-between items-center mb-4">
                           <span className="text-xs font-bold text-white">Tuesday, Nov 24</span>
                           <Calendar className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                           {['10:00 AM', '11:30 AM', '02:00 PM'].map((time, i) => (
                             <div key={i} className={`text-[10px] py-2 rounded-lg text-center font-bold border ${i === 2 ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'bg-white/5 border-white/10 text-muted-foreground'}`}>
                               {time}
                             </div>
                           ))}
                        </div>
                     </div>
                  </div>

                  <div className="flex justify-end gap-2">
                     <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-500/20">Yes, please send it to my WhatsApp</button>
                  </div>

                  <div className="mt-8 flex justify-center">
                     <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-muted-foreground flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Appointment Confirmed
                     </div>
                  </div>
               </div>

               {/* Decorative Background Circles */}
               <div className="absolute -top-12 -right-12 w-64 h-64 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />
               <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-purple-500/10 blur-3xl rounded-full pointer-events-none" />
            </div>
          </div>
        </section>

        {/* Everything your front desk needs */}
        <section className="py-24 bg-[#0a0a0c]">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Everything your front desk needs</h2>
              <p className="text-muted-foreground text-lg">Seamlessly manage scheduling, support, and lead intake with a single intelligent interface.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
              {/* Feature 1: Appointment Booking */}
              <div className="lg:col-span-6 bg-[#121216] rounded-3xl border border-white/5 p-8 flex flex-col group overflow-hidden relative">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
                  <CalendarCheck className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Automated Appointment Booking</h3>
                <p className="text-muted-foreground text-sm max-w-md mb-8">
                  The AI syncs with your calendar to manage slots, cancellations, and rescheduling automatically.
                </p>
                {/* Visual Mockup */}
                <div className="mt-auto relative">
                   <div className="bg-[#1a1a1f] rounded-2xl border border-white/10 p-4 shadow-2xl translate-y-4 group-hover:translate-y-2 transition-transform">
                      <div className="grid grid-cols-7 gap-1 mb-4">
                         {Array.from({length: 31}).map((_, i) => (
                           <div key={i} className={`aspect-square rounded flex items-center justify-center text-[8px] font-bold ${i === 23 ? 'bg-indigo-500 text-white' : 'bg-white/5 text-muted-foreground'}`}>
                              {i + 1}
                           </div>
                         ))}
                      </div>
                      <div className="bg-indigo-500/20 border border-indigo-500/30 p-2 rounded text-[8px] text-indigo-400 font-bold">New Booking: 2:00 PM - 3:00 PM</div>
                   </div>
                </div>
              </div>

              {/* Feature 2: AI Support */}
              <div className="lg:col-span-6 bg-[#121216] rounded-3xl border border-white/5 p-8 flex flex-col group relative overflow-hidden">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                   <div className="flex-1">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6">
                        <Bot className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">AI Support</h3>
                      <p className="text-muted-foreground text-sm max-w-sm">
                        Instant answers for FAQs, pricing, and services without human intervention.
                      </p>
                   </div>
                   <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-indigo-500/10 transition-all">
                      <MessageSquare className="w-10 h-10 text-white/20 group-hover:text-indigo-400/50" />
                   </div>
                </div>
                
                {/* Secondary Cards in this grid */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                   <div className="bg-black/40 border border-white/5 p-4 rounded-2xl">
                      <Clock className="w-4 h-4 text-orange-400 mb-2" />
                      <div className="text-xs font-bold text-white mb-1">24/7 After-Hours</div>
                      <p className="text-[10px] text-muted-foreground">Never miss a lead, even when you&apos;re sleeping.</p>
                   </div>
                   <div className="bg-black/40 border border-white/5 p-4 rounded-2xl">
                      <UserCheck className="w-4 h-4 text-blue-400 mb-2" />
                      <div className="text-xs font-bold text-white mb-1">Smart Qualification</div>
                      <p className="text-[10px] text-muted-foreground">Auto-tag and filter leads based on intent.</p>
                   </div>
                </div>
              </div>

              {/* Feature 3: Automated Reminders */}
              <div className="lg:col-span-6 bg-[#121216] rounded-3xl border border-white/5 p-8 flex flex-col group relative overflow-hidden">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                   <div className="flex-1">
                      <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mb-6">
                        <Bell className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Automated Reminders</h3>
                      <p className="text-muted-foreground text-sm max-w-sm">
                        Reduce no-shows by 80% with proactive WhatsApp and SMS notifications.
                      </p>
                   </div>
                   {/* Notification Mockup */}
                   <div className="w-full md:w-56 bg-[#1a1a1f] border border-white/10 p-4 rounded-2xl shadow-xl flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-[10px] text-white">S</div>
                      <div>
                         <div className="text-[10px] font-bold text-white mb-0.5">Notification</div>
                         <div className="text-[9px] text-muted-foreground leading-tight">Your appointment starts in 30 mins! See you soon.</div>
                      </div>
                   </div>
                </div>
              </div>

              {/* Feature 4: Sync Anywhere & Escalation */}
              <div className="lg:col-span-3 bg-[#121216] rounded-3xl border border-white/5 p-8 flex flex-col group">
                 <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-6">Sync Anywhere</div>
                 <div className="flex gap-4 mb-8">
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center"><Calendar className="w-6 h-6 text-muted-foreground" /></div>
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center"><Mail className="w-6 h-6 text-muted-foreground" /></div>
                 </div>
                 <h3 className="text-lg font-bold text-white mb-1">Native Integrations</h3>
                 <p className="text-[10px] text-muted-foreground">Sync with Google Calendar, Outlook, and CRMs.</p>
              </div>

              <div className="lg:col-span-3 bg-[#121216] rounded-3xl border border-white/5 p-8 flex flex-col group relative overflow-hidden">
                 <div className="absolute top-4 right-4">
                    <div className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 text-[8px] font-bold">ESCALATING</div>
                 </div>
                 <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-6">
                   <AlertTriangle className="w-5 h-5" />
                 </div>
                 <h3 className="text-lg font-bold text-white mb-1">Smart Escalation</h3>
                 <p className="text-[10px] text-muted-foreground">Complex query detection. Routing to human agents instantly.</p>
              </div>
            </div>
          </div>
        </section>

        {/* The Intelligence Behind the Desk */}
        <section className="py-24 bg-[#0a0a0c]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto bg-gradient-to-br from-indigo-900/10 to-purple-900/10 border border-white/5 rounded-[3rem] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-16 overflow-hidden relative">
               <div className="flex-1 z-10">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">The Intelligence Behind the Desk</h2>
                  <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
                    Our proprietary LLM logic doesn&apos;t just scan for keywords. It understands complex scheduling constraints, verifies availability in real-time, and handles nuance like a trained professional.
                  </p>
                  
                  <ul className="space-y-6">
                     {[
                       "Context-aware natural language processing",
                       "Multi-step logical reasoning for complex booking",
                       "Seamless switching between Hindi, English, and Spanish"
                     ].map((item, i) => (
                       <li key={i} className="flex items-center gap-4">
                          <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                             <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                          </div>
                          <span className="text-sm text-white/80">{item}</span>
                       </li>
                     ))}
                  </ul>
               </div>

               <div className="flex-1 relative flex items-center justify-center">
                  <div className="relative w-80 h-80 flex items-center justify-center">
                     {/* Brain Visual Animation */}
                     <div className="absolute inset-0 rounded-full border border-indigo-500/10 animate-[spin_10s_linear_infinite]" />
                     <div className="absolute inset-4 rounded-full border border-purple-500/20 animate-[spin_15s_linear_infinite_reverse]" />
                     
                     <div className="relative z-10 w-32 h-32 rounded-3xl bg-indigo-500/10 border border-indigo-500/30 flex flex-col items-center justify-center gap-2 backdrop-blur-xl shadow-2xl">
                        <Brain className="w-12 h-12 text-indigo-400" />
                        <div className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">Saarthi Brain v3.0</div>
                     </div>

                     <div className="absolute bottom-0 text-center w-full">
                        <div className="text-[10px] font-bold text-white mb-1">Processing 4,300 requests/sec</div>
                        <div className="h-1 bg-white/5 rounded-full w-48 mx-auto overflow-hidden">
                           <div className="h-full bg-indigo-500 animate-pulse w-3/4" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 bg-[#0a0a0c] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/5 to-transparent" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter">
              Ready to automate your <br />
              front desk?
            </h2>
            <p className="text-muted-foreground text-xl mb-12 max-w-2xl mx-auto">
              Join over 1,500+ SMBs who have regained 20+ hours a week by automating their reception tasks.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <Link 
                href="/register" 
                className="px-10 py-5 bg-primary text-primary-foreground rounded-2xl font-bold text-xl hover:scale-[1.05] transition-all shadow-[0_0_30px_rgba(209,188,255,0.4)]"
              >
                Start Your Free Trial
              </Link>
              <button 
                className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-xl hover:bg-white/10 transition-all backdrop-blur-xl"
              >
                Talk to Sales
              </button>
            </div>
            
            <p className="mt-8 text-xs text-muted-foreground font-medium uppercase tracking-widest">No credit card required. 14-day free trial.</p>
          </div>
        </section>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}

"use client";

import Link from "next/link";
import { 
  Users, 
  MessageSquare, 
  Tag, 
  Zap, 
  Shield, 
  Clock, 
  CheckCircle2, 
  Play, 
  AtSign, 
  Target,
  Activity,
  History,
  Lock,
  Sparkles,
  Phone,
  Mail,
  Instagram
} from "lucide-react";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/ChatWidget";

export default function TeamCollaborationPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-20 md:pt-32 md:pb-24 overflow-hidden bg-background">
          <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center gap-12">
            
            <div className="flex-1 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-xs font-semibold text-primary mb-6">
                <Users className="w-3 h-3" />
                BUILT FOR HIGH-GROWTH TEAMS
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight text-foreground">
                Your Entire Team, <br />
                <span className="text-primary">Working From One Inbox</span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
                Collaborate on customer conversations, assign chats, leave internal notes, 
                and work together seamlessly without ever switching tabs.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link 
                  href="/register" 
                  className="w-full sm:w-auto px-8 py-3 bg-primary text-primary-foreground rounded-lg font-bold text-base transition-all hover:bg-primary/90 text-center shadow-lg shadow-primary/20"
                >
                  Get Started Free
                </Link>
                <Link 
                  href="/demo" 
                  className="w-full sm:w-auto px-8 py-3 bg-card/80 backdrop-blur-xl border border-border/50 text-foreground rounded-lg font-bold text-base transition-all hover:bg-[#222] flex items-center justify-center gap-2"
                >
                  Book a Demo
                </Link>
              </div>
            </div>

            {/* Shared Inbox Mockup */}
            <div className="flex-1 w-full max-w-2xl relative">
              <div className="bg-card/80 backdrop-blur-xl rounded-2xl border border-border/50 overflow-hidden shadow-2xl relative">
                {/* Header */}
                <div className="h-10 border-b border-border/50 flex items-center justify-between px-4 bg-card/80 backdrop-blur-xl">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                  </div>
                  <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Shared Inbox</div>
                </div>
                
                <div className="flex h-[400px]">
                  {/* Sidebar */}
                  <div className="w-1/3 border-r border-border/50 p-3 space-y-4 bg-muted/30">
                    <div className="space-y-1">
                      <div className="p-2 rounded-lg bg-primary/20 text-primary flex items-center gap-2 text-xs font-medium">
                         <div className="w-1.5 h-1.5 rounded-full bg-primary"></div> Open (32)
                      </div>
                      <div className="p-2 rounded-lg hover:bg-white/5 text-muted-foreground flex items-center gap-2 text-xs font-medium transition-colors">
                         <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></div> Mine (8)
                      </div>
                      <div className="p-2 rounded-lg hover:bg-white/5 text-muted-foreground flex items-center gap-2 text-xs font-medium transition-colors">
                         <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Resolved
                      </div>
                    </div>

                    <div className="space-y-2">
                       <div className="text-[9px] font-bold text-foreground0 uppercase px-2">Recent Chats</div>
                       <div className="p-2 rounded-lg bg-white/5 border border-border/50">
                          <div className="flex justify-between items-center mb-1">
                             <span className="text-[10px] font-bold text-foreground">Arjun K.</span>
                             <span className="text-[8px] text-muted-foreground">2m ago</span>
                          </div>
                          <p className="text-[9px] text-muted-foreground truncate">How do I track my delivery order #42...</p>
                          <div className="flex gap-1 mt-1">
                             <span className="text-[8px] px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400">Shipping</span>
                             <span className="text-[8px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400">Urgent</span>
                          </div>
                       </div>
                       <div className="p-2 rounded-lg">
                          <div className="flex justify-between items-center mb-1">
                             <span className="text-[10px] font-bold text-foreground">Deepika R.</span>
                             <span className="text-[8px] text-muted-foreground">11m ago</span>
                          </div>
                          <p className="text-[9px] text-muted-foreground truncate">I&apos;d like to upgrade my current plan...</p>
                       </div>
                    </div>
                  </div>

                  {/* Chat Area */}
                  <div className="flex-1 p-4 bg-background flex flex-col">
                    <div className="flex justify-center mb-4">
                       <span className="text-[9px] bg-muted/50 px-2 py-1 rounded text-muted-foreground uppercase font-bold tracking-widest">Today</span>
                    </div>
                    
                    <div className="space-y-4">
                       <div className="flex justify-end">
                          <div className="bg-muted/80 text-foreground rounded-xl rounded-tr-none p-3 text-[10px] max-w-[80%] border border-border/50">
                             Hi, I&apos;m looking for the status of my recent order #P42921.
                          </div>
                       </div>
                       
                       <div className="flex gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground shrink-0">S</div>
                          <div className="bg-primary/10 border border-primary/20 text-foreground rounded-xl rounded-tl-none p-3 text-[10px] max-w-[80%]">
                             <div className="text-[8px] text-primary font-bold mb-1">AI Agent</div>
                             Checking that for you right now, Arjun! One moment...
                          </div>
                       </div>

                       {/* Internal Note */}
                       <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-3 flex gap-2">
                          <AtSign className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
                          <div className="space-y-1">
                             <div className="text-[8px] text-amber-500 font-bold uppercase tracking-widest">Internal Note • Rahul</div>
                             <p className="text-[9px] text-amber-500/80 leading-relaxed italic">
                                &quot;@Neha I&apos;ve checked the warehouse, the item is out of stock in Bangalore but available in Chennai.&quot;
                             </p>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 z-20 bg-emerald-500/10 backdrop-blur-xl border border-emerald-500/30 px-3 py-1.5 rounded-full flex items-center gap-2 animate-bounce-slow">
                   <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                   <span className="text-[10px] font-bold text-emerald-400">Assigned to Rahul Verma</span>
                   <div className="flex -space-x-2">
                      <div className="w-5 h-5 rounded-full border border-border bg-slate-600 overflow-hidden relative">
                        <Image src="https://i.pravatar.cc/100?u=4" alt="User" fill className="object-cover" />
                      </div>
                      <div className="w-5 h-5 rounded-full border border-border bg-slate-700 overflow-hidden relative">
                        <Image src="https://i.pravatar.cc/100?u=5" alt="User" fill className="object-cover" />
                      </div>
                   </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* The Collaborative Command Center */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">The Collaborative Command Center</h2>
              <p className="text-muted-foreground text-lg">
                Powering seamless handoffs and real-time coordination for Indian SMBs moving at high speed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 max-w-6xl mx-auto">
              
              {/* Omnichannel Shared Inbox */}
              <div className="lg:col-span-7 bg-card/80 backdrop-blur-xl rounded-3xl border border-border/50 p-8 flex flex-col relative overflow-hidden group">
                <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center mb-6">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Omnichannel Shared Inbox</h3>
                <p className="text-muted-foreground text-sm mb-10 max-w-sm">
                  Centralize WhatsApp, Instagram, and Email into a single feed that your whole team can manage together without stepping on toes.
                </p>
                
                <div className="flex gap-3 mt-auto">
                   <div className="flex-1 p-4 rounded-2xl bg-muted/50 border border-border/50 flex flex-col items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-500 flex items-center justify-center"><Phone className="w-4 h-4" /></div>
                      <span className="text-[10px] font-bold text-foreground uppercase tracking-widest">WhatsApp</span>
                   </div>
                   <div className="flex-1 p-4 rounded-2xl bg-muted/50 border border-border/50 flex flex-col items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-500 flex items-center justify-center"><Instagram className="w-4 h-4" /></div>
                      <span className="text-[10px] font-bold text-foreground uppercase tracking-widest">Instagram DM</span>
                   </div>
                   <div className="flex-1 p-4 rounded-2xl bg-muted/50 border border-border/50 flex flex-col items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-500 flex items-center justify-center"><Mail className="w-4 h-4" /></div>
                      <span className="text-[10px] font-bold text-foreground uppercase tracking-widest">Business Email</span>
                   </div>
                </div>
              </div>

              {/* Private Internal Notes */}
              <div className="lg:col-span-5 bg-card/80 backdrop-blur-xl rounded-3xl border border-border/50 p-8 flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center mb-6">
                   <AtSign className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Private Internal Notes</h3>
                <p className="text-muted-foreground text-sm mb-8">
                  Discuss issues behind the scenes with internal-only threads. Keep the customer experience clean while staying aligned.
                </p>
                
                <div className="space-y-3">
                   <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                      <div className="text-[9px] text-amber-500 font-bold mb-1">@Sandeep</div>
                      <p className="text-[10px] text-amber-500/80">Is this item in stock for Jaipur?</p>
                   </div>
                   <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                      <div className="text-[9px] text-purple-500 font-bold mb-1">@Meera</div>
                      <p className="text-[10px] text-purple-500/80">Yes, 3 units left in warehouse.</p>
                   </div>
                </div>
              </div>

              {/* Mentions & Tags */}
              <div className="lg:col-span-4 bg-card/80 backdrop-blur-xl rounded-3xl border border-border/50 p-8 flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-500 flex items-center justify-center mb-6">
                  <Tag className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Mentions & Tags</h3>
                <p className="text-muted-foreground text-sm">
                  Loop in specialists with @mentions, and organize queries with custom high-priority or department tags.
                </p>
              </div>

              {/* AI-Assisted Handoffs */}
              <div className="lg:col-span-8 bg-card/80 backdrop-blur-xl rounded-3xl border border-border/50 p-8 flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">AI-Assisted Handoffs</h3>
                  <p className="text-muted-foreground text-sm">
                    When an agent takes over a long chat, AI provides a 3-sentence summary of the entire context automatically. No more scrolling back.
                  </p>
                </div>
                
                <div className="flex-1 bg-muted/50 rounded-2xl border border-border/50 p-5 space-y-3 relative overflow-hidden">
                   <div className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                      <Sparkles className="w-3 h-3" /> AI Context Summary
                   </div>
                   <ul className="space-y-2">
                      <li className="text-[10px] text-muted-foreground flex gap-2">
                         <div className="w-1 h-1 rounded-full bg-indigo-500 shrink-0 mt-1.5"></div>
                         Customer seeking refund for damaged order #122.
                      </li>
                      <li className="text-[10px] text-muted-foreground flex gap-2">
                         <div className="w-1 h-1 rounded-full bg-indigo-500 shrink-0 mt-1.5"></div>
                         Previous agent verified photos but needs approval.
                      </li>
                      <li className="text-[10px] text-muted-foreground flex gap-2">
                         <div className="w-1 h-1 rounded-full bg-indigo-500 shrink-0 mt-1.5"></div>
                         High priority: Customer has been waiting 4 hours.
                      </li>
                   </ul>
                   <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-indigo-500/10 rounded-full blur-2xl"></div>
                </div>
              </div>

              {/* Small Feature Cards */}
              <div className="lg:col-span-4 bg-card/80 backdrop-blur-xl rounded-2xl border border-border/50 p-6 flex flex-col items-center text-center">
                 <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
                    <Target className="w-4 h-4" />
                 </div>
                 <h4 className="text-sm font-bold text-foreground mb-1">Smart Assignments</h4>
                 <p className="text-[11px] text-muted-foreground">Round-robin or manual. Every chat gets an owner instantly.</p>
              </div>
              <div className="lg:col-span-4 bg-card/80 backdrop-blur-xl rounded-2xl border border-border/50 p-6 flex flex-col items-center text-center">
                 <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center mb-4">
                    <History className="w-4 h-4" />
                 </div>
                 <h4 className="text-sm font-bold text-foreground mb-1">Activity History</h4>
                 <p className="text-[11px] text-muted-foreground">A perfect paper trail of who said what and when.</p>
              </div>
              <div className="lg:col-span-4 bg-card/80 backdrop-blur-xl rounded-2xl border border-border/50 p-6 flex flex-col items-center text-center">
                 <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
                    <Shield className="w-4 h-4" />
                 </div>
                 <h4 className="text-sm font-bold text-foreground mb-1">Role Permissions</h4>
                 <p className="text-[11px] text-muted-foreground">Granular control: Admins, Agents, and Viewers.</p>
              </div>

            </div>
          </div>
        </section>

        {/* Eliminate Collision */}
        <section className="py-24 bg-background border-y border-border/50 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
                Eliminate Collision with <br />
                <span className="text-primary">Real-time Presence</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-10 max-w-xl leading-relaxed">
                Never double-reply again. See exactly who is viewing a chat and who is typing in real-time, just like in your favorite chat apps.
              </p>
              
              <ul className="space-y-4">
                {[
                  { icon: Activity, text: "Live Viewer Presence Indicators" },
                  { icon: Clock, text: '"Agent is typing" feedback' },
                  { icon: Lock, text: "Auto-lock on active response" }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                    <item.icon className="w-5 h-5 text-primary" />
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex-1 w-full max-w-md space-y-4">
               <div className="bg-card/80 backdrop-blur-xl border border-border/50 p-4 rounded-2xl flex items-center gap-4 animate-float shadow-xl">
                  <div className="w-12 h-12 rounded-full border-2 border-primary overflow-hidden relative">
                     <Image src="https://i.pravatar.cc/100?u=12" alt="Anjali" fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                     <div className="text-sm font-bold text-foreground">Anjali P.</div>
                     <div className="text-xs text-muted-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div> Viewing 2 chat sessions
                     </div>
                  </div>
               </div>
               
               <div className="bg-card/80 backdrop-blur-xl border border-border/50 p-4 rounded-2xl flex items-center gap-4 animate-float delay-700 ml-12 shadow-xl">
                  <div className="w-12 h-12 rounded-full border-2 border-indigo-500 overflow-hidden relative">
                     <Image src="https://i.pravatar.cc/100?u=13" alt="Vikram" fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                     <div className="text-sm font-bold text-foreground">Vikram S.</div>
                     <div className="text-xs text-muted-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Typing a response...
                     </div>
                  </div>
               </div>
            </div>
          </div>
          
          {/* Subtle Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-background px-4">
          <div className="container mx-auto max-w-5xl text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-8">
              Ready to turn your team into a <br />
              <span className="text-primary">collaborative engine?</span>
            </h2>
            <p className="text-muted-foreground text-xl mb-12 max-w-2xl mx-auto">
              Join 1,200+ Indian SMBs scaling their customer support with SaarthiDesk&apos;s team-first tools.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/register" 
                className="px-10 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
              >
                Start Collaborating Today
              </Link>
              <Link 
                href="/demo" 
                className="px-10 py-4 bg-secondary/20 text-foreground border border-border/50 rounded-xl font-bold text-lg hover:bg-secondary/40 transition-all backdrop-blur-sm"
              >
                Talk to Sales
              </Link>
            </div>
            
            <p className="mt-8 text-xs text-muted-foreground uppercase tracking-widest font-bold">
               No credit card required • 14-day free trial • Set up in 5 minutes
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <ChatWidget />

      <style jsx global>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-15px) translateX(5px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

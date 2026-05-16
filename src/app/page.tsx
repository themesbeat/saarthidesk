"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bot, Database, CheckCircle2, Play, Sparkles, FileText, Link as LinkIcon, Users, Quote } from "lucide-react";
import { ChatWidget } from "@/components/ChatWidget";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-20 md:pt-32 md:pb-24 overflow-hidden bg-background">
          <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center gap-12">
            
            <div className="flex-1 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-xs font-semibold text-primary mb-6">
                <Sparkles className="w-3 h-3" />
                10X CUSTOMER ENGAGEMENT
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight text-foreground">
                Your AI Employee for <span className="text-primary">Customer Conversations</span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
                Unify WhatsApp, Instagram, and Email into one intelligent inbox. 
                Automate 80% of queries with AI that understands your brand.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link 
                  href="/register" 
                  className="w-full sm:w-auto px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold text-base transition-all hover:bg-primary/90 text-center"
                >
                  Start Free Trial
                </Link>
                <Link 
                  href="/demo" 
                  className="w-full sm:w-auto px-6 py-3 bg-card/80 backdrop-blur-xl border border-border/50 text-foreground rounded-lg font-bold text-base transition-all hover:bg-[#222] flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 fill-white" /> Book Demo
                </Link>
              </div>
            </div>

            {/* Chat Mockup */}
            <div className="flex-1 w-full max-w-xl">
              <div className="bg-card/80 backdrop-blur-xl rounded-2xl border border-border/50 overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="h-12 border-b border-border/50 flex items-center justify-between px-4 bg-card/80 backdrop-blur-xl">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  </div>
                  <div className="text-xs text-muted-foreground font-medium">Active Agent: ChatSaarthi AI</div>
                </div>
                {/* Chat Area */}
                <div className="p-6 space-y-6 bg-background">
                  {/* User Message */}
                  <div className="flex gap-4">
                    <div className="bg-muted/80 backdrop-blur-lg text-foreground rounded-2xl rounded-tl-sm p-4 text-sm w-5/6 shadow-sm border border-border/50">
                      Hi there, have the blue linen shirt in size XL in stock at your Indiranagar store?
                    </div>
                  </div>
                  {/* AI Message */}
                  <div className="flex gap-4 flex-row-reverse">
                    <div className="w-8 h-8 rounded-full bg-primary shrink-0 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-foreground" />
                    </div>
                    <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm p-4 text-sm w-5/6 shadow-sm">
                      <div className="flex items-center gap-2 mb-2 text-xs font-medium text-primary-foreground/80">
                        <Sparkles className="w-3 h-3" /> Checking inventory...
                      </div>
                      Yes! We have 2 units left. Would you like me to set one aside for you for the next 2 hours?
                    </div>
                  </div>
                  {/* User Message */}
                  <div className="flex gap-4">
                    <div className="bg-muted/80 backdrop-blur-lg text-foreground rounded-2xl rounded-tl-sm p-4 text-sm shadow-sm border border-border/50 max-w-fit">
                      That would be great! My name is Neha.
                    </div>
                  </div>
                </div>
                {/* Footer */}
                <div className="p-4 border-t border-border/50 bg-card/80 backdrop-blur-xl flex justify-between items-center text-xs text-foreground0">
                  <div className="flex gap-2">
                    <span className="w-4 h-4 bg-red-500/20 rounded flex items-center justify-center"><div className="w-1.5 h-1.5 bg-red-500 rounded-sm"></div></span>
                    <span className="w-4 h-4 bg-green-500/20 rounded flex items-center justify-center"><div className="w-1.5 h-1.5 bg-green-500 rounded-sm"></div></span>
                  </div>
                  <div className="flex items-center gap-1 font-medium text-muted-foreground">
                    <ArrowRight className="w-3 h-3" /> Response Rate: 99.8%
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Brands */}
        <section className="py-12 border-y border-border/50 bg-background">
          <div className="container mx-auto px-4">
            <p className="text-center text-[10px] font-bold text-foreground0 tracking-[0.2em] uppercase mb-8">
              Powering conversations for India&apos;s fastest growing brands
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale">
              <span className="text-xl font-serif italic text-foreground">Lumina Clinic</span>
              <span className="text-xl font-bold tracking-widest text-foreground">AETHER</span>
              <span className="text-xl font-serif text-foreground">Velvet & Co.</span>
              <span className="text-xl font-bold lowercase text-foreground">urbanroot</span>
              <span className="text-xl font-black uppercase tracking-widest text-foreground">ZENITH</span>
            </div>
          </div>
        </section>

        {/* Features Bento */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              
              {/* Feature 1: Unified Inbox */}
              <div className="md:col-span-2 bg-card/80 backdrop-blur-xl rounded-3xl border border-border/50 p-8 flex flex-col md:flex-row gap-8 overflow-hidden relative">
                <div className="flex-1 z-10">
                  <h3 className="text-2xl font-bold text-foreground mb-4">The Unified Inbox</h3>
                  <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                    Stop switching tabs. Every WhatsApp ping, Instagram DM, and Support Email flows into one seamless workspace.
                  </p>
                </div>
                {/* Mockup */}
                <div className="flex-1 w-full bg-muted/80 backdrop-blur-lg rounded-xl border border-border/50 p-4 shadow-xl z-10 flex flex-col justify-center">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg border border-border/50">
                      <div className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-xs shrink-0">P</div>
                      <div className="overflow-hidden">
                        <div className="text-sm font-medium text-foreground truncate">Priya S.</div>
                        <div className="text-xs text-muted-foreground truncate">How much for the festive hamper?</div>
                      </div>
                      <div className="ml-auto text-[10px] text-primary font-medium whitespace-nowrap">Just now</div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-transparent rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">D</div>
                      <div className="overflow-hidden">
                        <div className="text-sm font-medium text-foreground truncate">Dr. Arvind</div>
                        <div className="text-xs text-muted-foreground truncate">Rescheduling my 4 PM appt...</div>
                      </div>
                      <div className="ml-auto text-[10px] text-foreground0 whitespace-nowrap">2m ago</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 2: Knowledge Base */}
              <div className="bg-card/80 backdrop-blur-xl rounded-3xl border border-border/50 p-8 flex flex-col relative overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center mb-6">
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Knowledge Base Training</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Upload PDFs, link your website, or paste FAQs. Your AI learns in minutes, not months.
                </p>
                {/* Mockup */}
                <div className="bg-muted/80 backdrop-blur-lg rounded-xl border border-border/50 p-3 space-y-2 mt-auto">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground p-2 bg-muted rounded border border-border/50">
                    <FileText className="w-3 h-3 text-red-400 shrink-0" /> <span className="truncate">Product_Catalog_2024.pdf</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground p-2 bg-muted rounded border border-border/50">
                    <LinkIcon className="w-3 h-3 text-blue-400 shrink-0" /> <span className="truncate">https://yoursite.com/faq</span>
                  </div>
                  <div className="text-right text-[10px] text-primary font-medium mt-2">Training: 85%</div>
                </div>
              </div>

              {/* Feature 3: Smart CRM */}
              <div className="bg-card/80 backdrop-blur-xl rounded-3xl border border-border/50 p-8 flex flex-col relative overflow-hidden">
                <h3 className="text-xl font-bold text-foreground mb-3">Smart CRM</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Automatically tag leads, score intent, and trigger follow-ups.
                </p>
                {/* Mockup */}
                <div className="bg-muted/80 backdrop-blur-lg rounded-xl border border-border/50 p-4 mt-auto">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-[10px]">A</div>
                      <span className="text-xs font-medium text-foreground">Amit Sharma</span>
                    </div>
                    <span className="text-[9px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded uppercase tracking-wider">Hot Lead</span>
                  </div>
                  <div className="flex gap-1.5 h-10 items-end">
                    <div className="flex-1 bg-white/10 rounded-sm h-1/3"></div>
                    <div className="flex-1 bg-white/10 rounded-sm h-1/2"></div>
                    <div className="flex-1 bg-white/10 rounded-sm h-2/3"></div>
                    <div className="flex-1 bg-white/10 rounded-sm h-3/4"></div>
                    <div className="flex-1 bg-primary rounded-sm h-full shadow-[0_0_10px_rgba(209,188,255,0.3)]"></div>
                  </div>
                </div>
              </div>

              {/* Feature 4: Human Handoff */}
              <div className="md:col-span-2 bg-card/80 backdrop-blur-xl rounded-3xl border border-border/50 p-8 flex flex-col md:flex-row gap-8 overflow-hidden relative items-center">
                <div className="flex-1 z-10">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Graceful Human Handoff</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    AI handles the routine. When a human touch is needed, your team is notified instantly with full context.
                  </p>
                  <div className="flex items-center gap-3 mt-6">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full border-2 border-border bg-slate-400 overflow-hidden"><Image src="https://i.pravatar.cc/100?u=4" alt="Agent" width={32} height={32} className="w-full h-full object-cover" /></div>
                      <div className="w-8 h-8 rounded-full border-2 border-border bg-slate-500 overflow-hidden"><Image src="https://i.pravatar.cc/100?u=5" alt="Agent" width={32} height={32} className="w-full h-full object-cover" /></div>
                      <div className="w-8 h-8 rounded-full border-2 border-border bg-slate-600 overflow-hidden"><Image src="https://i.pravatar.cc/100?u=6" alt="Agent" width={32} height={32} className="w-full h-full object-cover" /></div>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">Agents Online: 3</span>
                  </div>
                </div>
                {/* Mockup */}
                <div className="flex-1 w-full bg-muted/80 backdrop-blur-lg rounded-xl border border-border/50 p-4 shadow-xl z-10 flex flex-col gap-2 justify-center">
                  <div className="flex items-center gap-3 bg-muted p-3 rounded-lg border border-border/50">
                    <Users className="w-4 h-4 text-orange-400 shrink-0" />
                    <span className="text-xs text-foreground truncate">Transferring to human agent...</span>
                    <span className="ml-auto text-[9px] font-bold text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded tracking-wider uppercase">Routed</span>
                  </div>
                  <div className="h-2 bg-muted rounded w-1/3 mt-2"></div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-24 border-t border-border/50 relative overflow-hidden bg-background">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">Scale your communication</h2>
              <p className="text-muted-foreground text-lg">Simple, transparent pricing for businesses of all sizes.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Starter */}
              <div className="p-8 rounded-3xl bg-card border border-border/50 flex flex-col">
                <h3 className="text-xl font-medium text-muted-foreground mb-2">Starter</h3>
                <div className="text-4xl font-bold mb-6 text-foreground">Free<span className="text-lg text-foreground0 font-normal">/mo</span></div>
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-center gap-3 text-muted-foreground"><CheckCircle2 className="w-5 h-5 text-primary" /> 1 User</li>
                  <li className="flex items-center gap-3 text-muted-foreground"><CheckCircle2 className="w-5 h-5 text-primary" /> 100 AI Replies/mo</li>
                  <li className="flex items-center gap-3 text-muted-foreground"><CheckCircle2 className="w-5 h-5 text-primary" /> WhatsApp Integration</li>
                </ul>
                <Link href="/register" className="block w-full py-3 text-center rounded-xl bg-white/10 text-foreground hover:bg-white/20 transition-colors font-medium">
                  Get Started
                </Link>
              </div>
              
              {/* Pro */}
              <div className="p-8 rounded-3xl bg-gradient-to-b from-indigo-900/40 to-slate-900 border border-primary/50 flex flex-col relative transform md:-translate-y-4 shadow-2xl shadow-primary/20">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-t-3xl"></div>
                <div className="absolute top-4 right-4 bg-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider text-foreground">Popular</div>
                <h3 className="text-xl font-medium text-muted-foreground mb-2">Pro</h3>
                <div className="text-4xl font-bold mb-6 text-foreground">₹1,999<span className="text-lg text-foreground0 font-normal">/mo</span></div>
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-center gap-3 text-muted-foreground"><CheckCircle2 className="w-5 h-5 text-primary" /> 5 Users</li>
                  <li className="flex items-center gap-3 text-muted-foreground"><CheckCircle2 className="w-5 h-5 text-primary" /> Unlimited AI Replies</li>
                  <li className="flex items-center gap-3 text-muted-foreground"><CheckCircle2 className="w-5 h-5 text-primary" /> All Integrations</li>
                  <li className="flex items-center gap-3 text-muted-foreground"><CheckCircle2 className="w-5 h-5 text-primary" /> Advanced Knowledge Base</li>
                </ul>
                <Link href="/register" className="block w-full py-3 text-center rounded-xl bg-primary hover:bg-primary/90 transition-colors font-medium text-primary-foreground shadow-lg shadow-indigo-500/25">
                  Start Free Trial
                </Link>
              </div>
              
              {/* Growth */}
              <div className="p-8 rounded-3xl bg-card border border-border/50 flex flex-col">
                <h3 className="text-xl font-medium text-muted-foreground mb-2">Growth</h3>
                <div className="text-4xl font-bold mb-6 text-foreground">₹4,999<span className="text-lg text-foreground0 font-normal">/mo</span></div>
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-center gap-3 text-muted-foreground"><CheckCircle2 className="w-5 h-5 text-primary" /> Unlimited Users</li>
                  <li className="flex items-center gap-3 text-muted-foreground"><CheckCircle2 className="w-5 h-5 text-primary" /> Custom AI Models</li>
                  <li className="flex items-center gap-3 text-muted-foreground"><CheckCircle2 className="w-5 h-5 text-primary" /> Dedicated Account Manager</li>
                </ul>
                <Link href="/contact" className="block w-full py-3 text-center rounded-xl bg-white/10 text-foreground hover:bg-white/20 transition-colors font-medium">
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-background border-t border-border/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">Loved by business owners</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              
              <div className="bg-card/80 backdrop-blur-xl p-6 rounded-2xl border border-border/50 relative">
                <Quote className="absolute top-6 right-6 w-8 h-8 text-foreground/5" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-xs overflow-hidden">
                    <Image src="https://i.pravatar.cc/150?u=1" alt="Avatar" width={40} height={40} className="w-full h-full object-cover opacity-80" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">Neha Mehta</div>
                    <div className="text-xs text-muted-foreground">Founder, Velvet & Co.</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground italic leading-relaxed">
                  &quot;ChatSaarthi has practically automated our entire Instagram sales funnel. We saw a 40% increase in conversion within the first month.&quot;
                </p>
              </div>

              <div className="bg-card/80 backdrop-blur-xl p-6 rounded-2xl border border-border/50 relative">
                <Quote className="absolute top-6 right-6 w-8 h-8 text-foreground/5" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-xs overflow-hidden">
                    <Image src="https://i.pravatar.cc/150?u=2" alt="Avatar" width={40} height={40} className="w-full h-full object-cover opacity-80" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">Dr. Rohan Mehta</div>
                    <div className="text-xs text-muted-foreground">Director, Lumina Clinic</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground italic leading-relaxed">
                  &quot;Managing patient appointments via WhatsApp was a nightmare. Now, the AI handles scheduling while I focus on surgery.&quot;
                </p>
              </div>

              <div className="bg-card/80 backdrop-blur-xl p-6 rounded-2xl border border-border/50 relative">
                <Quote className="absolute top-6 right-6 w-8 h-8 text-foreground/5" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-xs overflow-hidden">
                    <Image src="https://i.pravatar.cc/150?u=3" alt="Avatar" width={40} height={40} className="w-full h-full object-cover opacity-80" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">Siddharth K.</div>
                    <div className="text-xs text-muted-foreground">CEO, urbanroot</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground italic leading-relaxed">
                  &quot;The human handoff feature is genius. My team only steps in for complex orders, saving us hours every single day.&quot;
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-background px-4">
          <div className="container mx-auto max-w-5xl bg-gradient-to-br from-primary/30 to-secondary/30 rounded-[2rem] p-12 md:p-20 text-center relative overflow-hidden shadow-[0_0_50px_rgba(209,188,255,0.15)]">
            <div className="absolute inset-0 bg-muted pointer-events-none mix-blend-overlay"></div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 relative z-10">
              Ready to automate customer conversations?
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto relative z-10">
              Join 500+ businesses scaling their growth with ChatSaarthi AI today. No credit card required to start.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
              <Link 
                href="/register" 
                className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg"
              >
                Start Free Trial
              </Link>
              <Link 
                href="/demo" 
                className="px-8 py-4 bg-secondary/20 text-foreground border border-border/50 rounded-xl font-bold text-lg hover:bg-secondary/40 transition-all backdrop-blur-sm"
              >
                Book Demo
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

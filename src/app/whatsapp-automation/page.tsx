"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  MessageCircle, Sparkles, Zap, Target, 
  Calendar, CheckCircle2, Layout, 
  ArrowRight, FileText, Send, MoreHorizontal,
  Phone, UserPlus, Search, Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function WhatsAppAutomationPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-[#0a0510] text-foreground font-sans selection:bg-[#C3B5FD]/30">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-green-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-[20%] left-[-10%] w-[30%] h-[40%] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          <div className="flex-1 text-left max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-8 backdrop-blur-md"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Official WhatsApp API v2.0
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8 leading-[1.05]"
            >
              Turn WhatsApp <br />
              Into An <span className="text-white italic">AI Employee</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-white/60 mb-12 leading-relaxed max-w-lg font-medium"
            >
              Automatically reply, qualify leads, book appointments, and follow up with customers on WhatsApp—24/7, without lifting a finger.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-6"
            >
              <Button size="lg" className="w-full sm:w-auto bg-[#C3B5FD] text-[#0a0510] hover:bg-[#b2a4f0] rounded-xl px-10 h-14 text-base font-bold transition-all shadow-[0_10px_40px_-10px_rgba(195,181,253,0.3)]">
                Book Demo <ArrowRight size={18} className="ml-2" />
              </Button>
              <Button size="lg" variant="ghost" className="w-full sm:w-auto text-white font-bold h-14 px-10 border border-white/10 rounded-xl hover:bg-white/5 transition-all">
                Start Free Trial
              </Button>
            </motion.div>
          </div>

          {/* Hero Interaction Mockup */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="flex-1 relative w-full"
          >
            <div className="relative z-10 w-full max-w-[580px] mx-auto p-1 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-transparent border border-white/10 shadow-2xl backdrop-blur-3xl overflow-hidden">
              <div className="bg-[#121221] rounded-[1.4rem] overflow-hidden">
                {/* Header */}
                <div className="p-4 border-b border-white/5 flex justify-between items-center bg-[#075e54]/20 backdrop-blur-xl">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-[#128c7e] flex items-center justify-center text-white font-bold">
                       RS
                     </div>
                     <div>
                       <div className="text-sm font-bold text-white">Rahul Sharma</div>
                       <div className="flex items-center gap-1">
                         <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                         <span className="text-[10px] text-emerald-400/80 font-medium">Online</span>
                       </div>
                     </div>
                   </div>
                   <div className="flex items-center gap-4 text-white/60">
                     <Phone size={18} />
                     <MoreHorizontal size={18} />
                   </div>
                </div>
                
                {/* Content */}
                <div className="p-6 space-y-6 min-h-[380px] bg-black/20">
                  {/* Customer Message */}
                  <div className="flex gap-4">
                    <div className="bg-[#1a1a2e] p-4 rounded-2xl rounded-tl-none border border-white/5 text-sm text-white/80 leading-relaxed shadow-lg max-w-[85%]">
                      Hi, I&apos;m interested in your real estate services. Can you share pricing for 2BHKs in Mumbai?
                    </div>
                  </div>

                  {/* AI Suggestion */}
                  <div className="flex flex-col items-end gap-2">
                    <div className="relative w-full max-w-[85%]">
                      <div className="absolute -top-3 right-4 z-20 px-2 py-0.5 rounded-md bg-[#25D366] text-black text-[9px] font-black uppercase tracking-tighter">
                        AI Reply
                      </div>
                      <div className="bg-[#056162] p-5 rounded-2xl rounded-tr-none border border-emerald-500/30 text-sm text-white/90 leading-relaxed shadow-lg relative overflow-hidden group">
                        Hello Rahul! I&apos;d love to help. We have options starting from ₹1.5Cr. Are you looking for immediate possession or an under-construction project?
                      </div>
                    </div>
                  </div>

                  {/* Qualification Widget */}
                  <div className="mt-8 p-5 rounded-2xl bg-[#1a1a2e] border border-emerald-500/20 shadow-2xl relative overflow-hidden">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <Target className="text-emerald-400" size={16} />
                        <span className="text-[11px] font-bold text-white/80">Qualifying Lead...</span>
                      </div>
                      <span className="text-[10px] font-black text-emerald-400">60% COMPLETE</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-6">
                      <div className="w-[60%] h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold hover:bg-emerald-500/20 transition-all">
                        Book site visit
                      </button>
                      <button className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/60 text-[10px] font-bold hover:bg-white/10 transition-all">
                        Get catalog
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Section Header */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-6">
          <motion.h2 
            {...fadeIn}
            className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight"
          >
            Master Your Conversations
          </motion.h2>
          <motion.p 
            {...fadeIn}
            className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Scale your business without scaling your team. Our AI agents handle the heavy lifting while you focus on closing deals.
          </motion.p>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="pb-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Instant AI Replies */}
            <motion.div 
              {...fadeIn}
              className="p-10 rounded-[2.5rem] bg-[#161624] border border-white/5 flex flex-col"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-8">
                <Zap size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Instant AI Replies</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-10 font-medium">
                Human-like responses delivered in milliseconds. No more waiting times for your customers.
              </p>
              
              <div className="mt-auto p-5 rounded-2xl bg-[#0a0510] border border-white/5 space-y-4">
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20 mt-1.5" />
                  <p className="text-[10px] text-white/40 italic">Customer: Where are you based?</p>
                </div>
                <div className="bg-[#C3B5FD] p-3 rounded-xl text-[10px] font-bold text-[#0a0510] relative">
                  At the moment, we are based in Bangalor...
                  <div className="absolute bottom-1 right-2 text-[8px] opacity-60">10:15</div>
                </div>
              </div>
            </motion.div>

            {/* Smart Tagging */}
            <motion.div 
              {...fadeIn}
              className="p-10 rounded-[2.5rem] bg-[#161624] border border-white/5 flex flex-col"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-8">
                <Target size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Smart Tagging</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-10 font-medium">
                Automatically segment leads based on conversation sentiment and intent.
              </p>
              
              <div className="mt-auto space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#0a0510] border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[10px] font-bold">AK</div>
                    <span className="text-[10px] font-bold text-white/80">Ankit Kapoor</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[8px] font-black text-emerald-400 uppercase tracking-widest">High Intent</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#0a0510] border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-[10px] font-bold">SJ</div>
                    <span className="text-[10px] font-bold text-white/80">Sara Jain</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[8px] font-black text-white/40 uppercase tracking-widest">Qualified</span>
                </div>
              </div>
            </motion.div>

            {/* Instant Booking */}
            <motion.div 
              {...fadeIn}
              className="p-10 rounded-[2.5rem] bg-[#161624] border border-white/5 flex flex-col"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-8">
                <Calendar size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Instant Booking</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-10 font-medium">
                Connect your calendar and let the AI book site visits and calls directly in the chat.
              </p>
              
              <div className="mt-auto p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-1">Booking Confirmed</p>
                  <p className="text-[11px] font-bold text-white/80 mb-0.5">Discovery Call w/ SaarthiDesk</p>
                  <p className="text-[10px] text-white/40">Tomorrow, 4:00 PM</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Funnel Builder Section */}
      <section className="py-32 relative bg-[#0a0510]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            {/* Visual Flow */}
            <motion.div 
              {...fadeIn}
              className="lg:w-1/2 space-y-6"
            >
              <div className="relative pl-12 border-l-2 border-white/5 space-y-12 py-4">
                {[
                  { icon: MessageCircle, title: 'Trigger: New Message', desc: 'Customer asks about pricing or services.', color: 'purple' },
                  { icon: Zap, title: 'AI Processing & Qualification', desc: 'Extract intent, budget, and contact info.', color: 'emerald' },
                  { icon: CheckCircle2, title: 'Goal: Book & Notify', desc: 'Appointment added to calendar, lead saved to CRM.', color: 'indigo' },
                ].map((step, idx) => (
                  <div key={idx} className="relative group">
                    {/* Circle on line */}
                    <div className="absolute -left-[57px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#161624] border-2 border-white/20 group-hover:border-white/60 transition-all" />
                    
                    <div className="p-6 rounded-2xl bg-[#161624] border border-white/5 hover:border-white/10 transition-all flex items-center gap-6">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${
                        step.color === 'purple' ? 'bg-purple-500/10 text-purple-400' : 
                        step.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400' : 
                        'bg-indigo-500/10 text-indigo-400'
                      }`}>
                        <step.icon size={24} />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white mb-1">{step.title}</h4>
                        <p className="text-white/40 text-xs font-medium">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div 
              {...fadeIn}
              className="lg:w-1/2"
            >
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-10 tracking-tight leading-tight">
                Visually Build Your <br /> <span className="text-emerald-400">Conversational Funnel</span>
              </h2>
              <p className="text-white/50 text-lg mb-12 leading-relaxed font-medium">
                Create sophisticated logic flows with our drag-and-drop builder. No coding required—just pure business intelligence applied to every WhatsApp thread.
              </p>
              
              <div className="space-y-6">
                {[
                  'Auto-reply outside business hours',
                  'Smart handover to human agents for high-value leads',
                  'Integration with 2,000+ apps via Zapier',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <CheckCircle2 size={12} />
                    </div>
                    <span className="text-sm font-bold text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Summary Section */}
      <section className="py-32 relative bg-[#0a0510]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <motion.div 
              {...fadeIn}
              className="lg:w-1/2"
            >
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-10 tracking-tight leading-tight">
                Never Read 50 <br /> Messages Again
              </h2>
              <p className="text-white/50 text-lg mb-12 leading-relaxed font-medium max-w-xl">
                Get the gist in seconds. Our AI Conversation Summary condenses long-winded WhatsApp threads into actionable bullet points for your sales team.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 w-full"
            >
              <div className="p-8 rounded-[2.5rem] bg-[#161624] border border-white/5 relative overflow-hidden group">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3 text-purple-400">
                    <Sparkles size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Smart Summary</span>
                  </div>
                  <span className="text-white/20 text-[9px] font-bold uppercase tracking-widest">Generated 2m ago</span>
                </div>
                
                <ul className="space-y-6 mb-12">
                  {[
                    'Client is interested in the Premium Plan for 5 users.',
                    'Budget confirmed around $200/mo with seasonal flexibility.',
                    'Requested a demo for Monday at 10:00 AM.',
                  ].map((bullet, idx) => (
                    <li key={idx} className="flex gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500/40 mt-1.5" />
                      <p className="text-white/70 text-sm font-medium leading-relaxed">{bullet}</p>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between pt-8 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Sentiment: Positive</span>
                  </div>
                  <button className="text-[9px] font-black text-white/40 hover:text-white uppercase tracking-widest transition-colors">
                    Copy to CRM
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative bg-[#0a0510]">
        <div className="container mx-auto px-6">
          <motion.div 
            {...fadeIn}
            className="relative p-16 md:p-32 rounded-[4rem] bg-gradient-to-br from-[#121221] via-[#1a1a2e] to-[#0a0510] border border-white/5 overflow-hidden text-center shadow-[0_20px_100px_rgba(0,0,0,0.5)]"
          >
            {/* Texture/Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/5 to-transparent pointer-events-none" />
            
            <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-12 tracking-tighter leading-[1.05] relative z-10">
              Ready to put your WhatsApp <br className="hidden md:block" /> on <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C3B5FD] to-emerald-400">autopilot?</span>
            </h2>
            
            <p className="text-white/50 text-lg mb-12 max-w-2xl mx-auto font-medium relative z-10">
              Join 500+ businesses automating their growth with SaarthiDesk AI Agents.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 relative z-10">
              <Button size="lg" className="w-full sm:w-auto bg-[#C3B5FD] text-[#0a0510] hover:bg-white rounded-2xl px-14 h-16 text-lg font-black transition-all shadow-2xl">
                Start Free Trial
              </Button>
              <Button size="lg" variant="ghost" className="w-full sm:w-auto text-white hover:bg-white/10 rounded-2xl px-14 h-16 text-lg font-black border border-white/10 transition-all">
                Contact Sales
              </Button>
            </div>
            
            <p className="text-white/30 text-[10px] font-bold tracking-[0.1em] uppercase relative z-10">No credit card required. Official WhatsApp API costs may apply.</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

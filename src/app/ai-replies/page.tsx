"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Sparkles, Zap, Play, FileText, 
  Settings2, Languages, LineChart, 
  ShieldCheck, ArrowRight, UserPlus,
  MessageSquare, Sliders, CheckCircle2,
  Smile, Languages as LanguagesIcon,
  Clock, Headset, MoreHorizontal, X, Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function AIRepliesPage() {
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
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[30%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          <div className="flex-1 text-left max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[#C3B5FD] text-[10px] font-bold tracking-[0.2em] uppercase mb-8 backdrop-blur-md"
            >
              <Sparkles className="w-3 h-3" /> New: Smart Replies v2.0
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8 leading-[1.05]"
            >
              AI Replies That <br />
              <span className="text-white">Sound Human</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-white/60 mb-12 leading-relaxed max-w-lg"
            >
              Respond instantly to customer questions with AI-powered smart replies trained on your business knowledge.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-6 mb-20"
            >
              <Button size="lg" className="w-full sm:w-auto bg-[#C3B5FD] text-[#0a0510] hover:bg-[#b2a4f0] rounded-xl px-10 h-14 text-base font-bold transition-all shadow-[0_10px_40px_-10px_rgba(195,181,253,0.3)]">
                Try AI Replies
              </Button>
              <button className="flex items-center gap-3 text-white/80 font-bold hover:text-white transition-colors group">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/5 transition-all">
                  <Play size={18} className="fill-white/80 group-hover:fill-white ml-1" />
                </div>
                See it in action
              </button>
            </motion.div>
          </div>

          {/* Hero Interaction Mockup */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="flex-1 relative w-full"
          >
            {/* The main chat window mockup */}
            <div className="relative z-10 w-full max-w-[580px] mx-auto p-1 rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 shadow-2xl backdrop-blur-3xl overflow-hidden">
              <div className="bg-[#121221] rounded-[1.4rem] overflow-hidden">
                {/* Header */}
                <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                   <div className="flex items-center gap-3">
                     <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                     <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                     <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                   </div>
                   <div className="text-[10px] text-white/30 font-medium uppercase tracking-widest">Chat Interface</div>
                   <div className="w-10" />
                </div>
                
                {/* Content */}
                <div className="p-6 space-y-6 min-h-[360px]">
                  {/* Customer Message */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">AS</div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-white/40">Arjun Sharma <span className="font-medium opacity-50">via WhatsApp</span></p>
                      <div className="bg-[#1a1a2e] p-4 rounded-2xl rounded-tl-none border border-white/5 text-sm text-white/80 leading-relaxed shadow-lg max-w-[85%]">
                        Hi, I&apos;m looking for your delivery timelines for South Mumbai. Do you deliver on Sundays?
                      </div>
                    </div>
                  </div>

                  {/* AI Suggestion */}
                  <div className="flex flex-col items-end gap-2">
                    <div className="relative w-full max-w-[85%]">
                      {/* Confidence Badge */}
                      <div className="absolute -top-3 right-4 z-20 px-2 py-0.5 rounded-md bg-[#C3B5FD] text-[#0a0510] text-[9px] font-black uppercase tracking-tighter shadow-xl">
                        98% Confidence
                      </div>
                      <div className="bg-[#1a1a2e] p-5 rounded-2xl rounded-tr-none border border-purple-500/30 text-sm text-white/90 leading-relaxed shadow-[0_0_30px_rgba(168,85,247,0.15)] relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none" />
                        Namaste Arjun! Yes, we deliver across South Mumbai within 24-48 hours. We do deliver on Sundays for all prepaid orders placed before Saturday noon.
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 rounded-lg bg-[#C3B5FD] text-[#0a0510] text-xs font-bold hover:bg-[#b2a4f0] transition-colors flex items-center gap-2">
                        Deliver this <Send size={14} />
                      </button>
                      <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/60 text-xs font-bold hover:bg-white/10 transition-colors">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-white/5 bg-white/[0.01]">
                   <div className="bg-[#0a0510]/50 rounded-xl p-3 flex items-center border border-white/5">
                     <div className="flex-1 text-white/20 text-xs font-medium">Type your reply...</div>
                     <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/30">
                       <Send size={14} />
                     </div>
                   </div>
                </div>
              </div>
            </div>

            {/* Time Saved Card Overlay */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 md:-left-12 z-20 p-5 rounded-2xl bg-[#1a1a2e]/90 border border-white/10 backdrop-blur-xl shadow-2xl flex items-center gap-4 max-w-[200px]"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-[#C3B5FD]">
                <Zap className="w-6 h-6 fill-current" />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1">Time Saved</p>
                <p className="text-xl font-bold text-white tracking-tight">142 Hours</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 relative bg-[#0a0510]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Smart Suggestion Cards */}
            <motion.div 
              {...fadeIn}
              className="lg:col-span-8 p-10 rounded-[2rem] bg-[#161624] border border-white/5 flex flex-col relative overflow-hidden group min-h-[400px]"
            >
              <div className="flex justify-between items-start mb-12">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6">
                    <Sparkles size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">Smart Suggestion Cards</h3>
                </div>
                <div className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em]">Real-time Generation</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-auto">
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all group/card">
                  <p className="text-[10px] font-black text-indigo-400 mb-4 italic uppercase tracking-wider">Option 1: Friendly</p>
                  <p className="text-white/60 text-sm mb-8 leading-relaxed font-medium">
                    &ldquo;Hey! Glad you asked. We can certainly help with that...&rdquo;
                  </p>
                  <Button variant="outline" className="w-full rounded-xl border-white/10 text-white/80 hover:bg-white/10 hover:text-white text-[11px] font-bold py-5">
                    Use Suggestion
                  </Button>
                </div>
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all group/card">
                  <p className="text-[10px] font-black text-cyan-400 mb-4 italic uppercase tracking-wider">Option 2: Concise</p>
                  <p className="text-white/60 text-sm mb-8 leading-relaxed font-medium">
                    &ldquo;Yes, we support that. Here is the link to documentation...&rdquo;
                  </p>
                  <Button variant="outline" className="w-full rounded-xl border-white/10 text-white/80 hover:bg-white/10 hover:text-white text-[11px] font-bold py-5">
                    Use Suggestion
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Business Trained */}
            <motion.div 
              {...fadeIn}
              className="lg:col-span-4 p-10 rounded-[2rem] bg-[#161624] border border-white/5 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-400 mb-8">
                  <FileText size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Business Trained</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-10 font-medium">
                  Upload your PDFs, website URLs, and Docs. Our AI learns your specific brand voice and data.
                </p>
              </div>
              
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded bg-orange-500/20 flex items-center justify-center text-orange-400">
                    <FileText size={16} />
                  </div>
                  <span className="text-[10px] font-bold text-white/60 tracking-tight">Training on Knowledge_Base_v2.pdf...</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "75%" }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]" 
                  />
                </div>
              </div>
            </motion.div>

            {/* Tone Control */}
            <motion.div 
              {...fadeIn}
              className="lg:col-span-4 p-10 rounded-[2rem] bg-[#161624] border border-white/5"
            >
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-400 mb-8">
                <Sliders size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-10">Tone Control</h3>
              
              <div className="space-y-10">
                <div className="relative px-2">
                  <div className="flex justify-between text-[9px] font-black text-white/30 uppercase tracking-[0.2em] mb-4">
                    <span>Professional</span>
                    <span>Friendly</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full relative">
                    <div className="absolute top-1/2 left-[70%] -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.4)] border-[3px] border-indigo-600" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {[
                    { label: 'Concise', active: false },
                    { label: 'Elaborate', active: false },
                    { label: 'Empathetic', active: true }
                  ].map((tone) => (
                    <span key={tone.label} className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300 border ${tone.active ? 'bg-[#C3B5FD] border-[#C3B5FD] text-[#0a0510]' : 'bg-white/5 border-white/10 text-white/40'}`}>
                      {tone.label}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Local Intelligence */}
            <motion.div 
              {...fadeIn}
              className="lg:col-span-4 p-10 rounded-[2rem] bg-[#161624] border border-white/5"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-8">
                <LanguagesIcon size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">Local Intelligence</h3>
              
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { name: 'Hinglish', flag: '🇮🇳' },
                  { name: 'English', flag: '🇺🇸' },
                  { name: 'Hindi', flag: '🇮🇳' },
                  { name: 'Tamil', flag: '🇮🇳' },
                ].map(lang => (
                  <div key={lang.name} className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-all cursor-default">
                    <span className="text-lg">{lang.flag}</span>
                    <span className="text-[11px] font-black text-white/70 uppercase tracking-tight">{lang.name}</span>
                  </div>
                ))}
              </div>
              <p className="text-white/40 text-xs leading-relaxed font-medium">
                Switch languages instantly without losing the nuance of your message.
              </p>
            </motion.div>

            {/* Efficiency Score */}
            <motion.div 
              {...fadeIn}
              className="lg:col-span-4 p-10 rounded-[2rem] bg-[#161624] border border-white/5"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-8">
                <LineChart size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Efficiency Score</h3>
              
              <div className="flex items-end justify-between gap-6 h-32 mt-4">
                <div className="shrink-0">
                  <div className="text-6xl font-black text-white mb-2 tracking-tighter leading-none">84%</div>
                  <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.2em]">Automation Rate</p>
                </div>
                <div className="flex items-end gap-1.5 h-full pb-1">
                  {[40, 60, 45, 95, 75, 85].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className={`w-2.5 rounded-t-full ${i === 3 ? 'bg-[#C3B5FD]' : 'bg-white/10'}`} 
                    />
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Handoff Section */}
      <section className="py-24 relative bg-[#0a0510]">
        <div className="container mx-auto px-6">
          <div className="p-12 md:p-20 rounded-[3rem] bg-[#161624] border border-white/5 relative overflow-hidden flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            {/* Background Light */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
            
            <motion.div 
              {...fadeIn}
              className="lg:w-1/2 relative z-10"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
                Safety First
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-10 tracking-tight leading-tight">
                Seamless Human <br /> Handoff
              </h2>
              <p className="text-white/50 text-lg mb-12 leading-relaxed max-w-xl font-medium">
                When things get complex or high-stakes, the AI automatically detects the need for a human agent. No more frustrated customers stuck in infinite bot loops.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: 'Sentiment Analysis', active: true },
                  { title: 'Complexity Detection', active: true },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#C3B5FD]">
                      <CheckCircle2 size={12} />
                    </div>
                    <span className="text-sm font-bold text-white/80">{item.title}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 relative z-10 w-full"
            >
              <div className="p-8 rounded-[2.5rem] bg-[#0a0510] border border-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.15)] relative overflow-hidden group">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-black text-red-400 uppercase tracking-widest">Complexity detected (92%)</span>
                </div>
                
                <p className="text-white/70 text-base italic leading-relaxed mb-10 font-medium">
                  &ldquo;This is my third time calling and I still don&apos;t have my refund. I&apos;m very upset and need to speak with a manager right now.&rdquo;
                </p>

                <Button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold h-14 rounded-2xl flex items-center gap-3 transition-all group/btn">
                  <Headset size={20} className="group-hover/btn:scale-110 transition-transform" />
                  Request Human Agent
                </Button>
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
            className="relative p-16 md:p-32 rounded-[4rem] bg-gradient-to-br from-indigo-600 via-purple-700 to-indigo-900 overflow-hidden text-center shadow-[0_20px_100px_rgba(79,70,229,0.3)]"
          >
            {/* Texture/Pattern */}
            <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            
            <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-12 tracking-tighter leading-[1.05] relative z-10">
              Like having an AI support <br className="hidden md:block" /> employee available 24/7.
            </h2>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 relative z-10">
              <Button size="lg" className="w-full sm:w-auto bg-[#C3B5FD] text-[#0a0510] hover:bg-white rounded-2xl px-14 h-16 text-lg font-black transition-all shadow-2xl">
                Start Your Free Trial
              </Button>
              <Button size="lg" variant="ghost" className="w-full sm:w-auto text-white hover:bg-white/10 rounded-2xl px-14 h-16 text-lg font-black border border-white/20 transition-all">
                Talk to Sales
              </Button>
            </div>
            
            <p className="text-white/50 text-xs font-bold tracking-[0.1em] uppercase relative z-10">No credit card required &bull; 14-day free trial &bull; Cancel anytime</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

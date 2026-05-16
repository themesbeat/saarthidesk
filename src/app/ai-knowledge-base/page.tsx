"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Brain, FileText, Globe, Youtube, 
  RefreshCw, ShieldCheck, Search, 
  ExternalLink, CheckCircle2, ArrowRight,
  Database, Upload, Zap, Lock,
  MessageSquare, FileCode, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function AIKnowledgeBasePage() {
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
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[30%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          <div className="flex-1 text-left max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-8 backdrop-blur-md"
            >
              <Database className="w-3 h-3" /> Secure AI Infrastructure
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8 leading-[1.05]"
            >
              Train AI On Your <br />
              <span className="text-white italic">Business Brain</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-white/60 mb-12 leading-relaxed max-w-lg font-medium"
            >
              No more generic bots. Upload your docs, links, and text to create an AI agent that knows your business inside out.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-6"
            >
              <Button size="lg" className="w-full sm:w-auto bg-[#C3B5FD] text-[#0a0510] hover:bg-[#b2a4f0] rounded-xl px-10 h-14 text-base font-bold transition-all shadow-[0_10px_40px_-10px_rgba(195,181,253,0.3)]">
                Get Started <ArrowRight size={18} className="ml-2" />
              </Button>
              <Button size="lg" variant="ghost" className="w-full sm:w-auto text-white font-bold h-14 px-10 border border-white/10 rounded-xl hover:bg-white/5 transition-all">
                See Demo
              </Button>
            </motion.div>
          </div>

          {/* Knowledge Base Interface Mockup */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="flex-1 relative w-full"
          >
            <div className="relative z-10 w-full max-w-[640px] mx-auto p-1 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 shadow-2xl backdrop-blur-3xl overflow-hidden">
              <div className="bg-[#121221] rounded-[2.2rem] overflow-hidden flex h-[460px]">
                {/* Sidebar */}
                <div className="w-20 border-r border-white/5 flex flex-col items-center py-8 gap-8 bg-white/[0.02]">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <Database size={20} />
                  </div>
                  <div className="w-10 h-10 rounded-xl text-white/30 flex items-center justify-center">
                    <RefreshCw size={20} />
                  </div>
                  <div className="w-10 h-10 rounded-xl text-white/30 flex items-center justify-center">
                    <ShieldCheck size={20} />
                  </div>
                  <div className="mt-auto w-10 h-10 rounded-xl text-white/30 flex items-center justify-center">
                    <ArrowRight size={20} />
                  </div>
                </div>
                
                {/* Main Content */}
                <div className="flex-1 p-8 flex flex-col">
                  <div className="flex justify-between items-center mb-8">
                    <h4 className="text-sm font-bold text-white tracking-tight">Active Knowledge Sources</h4>
                    <Button variant="outline" size="sm" className="h-8 rounded-lg border-white/10 text-[10px] font-bold">
                      + Add Source
                    </Button>
                  </div>
                  
                  <div className="space-y-4 flex-1">
                    {[
                      { name: 'Product_Sheet_2024.pdf', status: 'Synced', size: '2.4 MB', icon: FileText, color: 'text-blue-400' },
                      { name: 'Website_FAQ.html', status: 'Synced', size: '156 KB', icon: Globe, color: 'text-emerald-400' },
                      { name: 'Company_Guidelines.docx', status: 'Processing', size: '890 KB', icon: FileText, color: 'text-white/40' },
                    ].map((file, i) => (
                      <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-white/5 ${file.color}`}>
                            <file.icon size={16} />
                          </div>
                          <div>
                            <p className="text-[11px] font-bold text-white/90">{file.name}</p>
                            <p className="text-[9px] text-white/40">{file.size}</p>
                          </div>
                        </div>
                        <span className={`text-[9px] font-black uppercase tracking-widest ${file.status === 'Synced' ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {file.status}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                           <RefreshCw size={14} />
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-1">AI Brain Health</p>
                        <p className="text-sm font-bold text-white">94.2% Accuracy Rate</p>
                      </div>
                    </div>
                    <Button variant="ghost" className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 text-[10px] font-bold">
                      View Insights
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid Header */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-6">
          <motion.h2 
            {...fadeIn}
            className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight"
          >
            The More You Feed It, <br /> The Smarter It Gets
          </motion.h2>
          <motion.p 
            {...fadeIn}
            className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Our neural engine processes your data to build a deep semantic understanding of your business operations.
          </motion.p>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="pb-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Multi-Source Sync */}
            <motion.div 
              {...fadeIn}
              className="p-10 rounded-[2.5rem] bg-[#161624] border border-white/5 flex flex-col"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-8">
                <Upload size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Multi-Source Sync</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-10 font-medium">
                Import from PDF, Docx, Notion, Website URLs, and even YouTube videos effortlessly.
              </p>
              
              <div className="mt-auto grid grid-cols-3 gap-2">
                {[FileText, Globe, Youtube, Database, FileCode, MessageSquare].map((Icon, i) => (
                  <div key={i} className="aspect-square rounded-xl bg-[#0a0510] border border-white/5 flex items-center justify-center text-white/30 hover:text-blue-400 transition-colors">
                    <Icon size={20} />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Auto-Updating */}
            <motion.div 
              {...fadeIn}
              className="p-10 rounded-[2.5rem] bg-[#161624] border border-white/5 flex flex-col"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-8">
                <RefreshCw size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Auto-Updating</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-10 font-medium">
                AI automatically re-trains whenever you update your website or documentation.
              </p>
              
              <div className="mt-auto p-5 rounded-2xl bg-[#0a0510] border border-white/5">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Next Sync</span>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">In 12 minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  {[1, 1, 1, 0, 0, 0, 0, 0].map((v, i) => (
                    <div key={i} className={`flex-1 h-8 rounded-sm ${v ? 'bg-emerald-500/20 border border-emerald-500/40' : 'bg-white/5'}`} />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Secure & Private */}
            <motion.div 
              {...fadeIn}
              className="p-10 rounded-[2.5rem] bg-[#161624] border border-white/5 flex flex-col"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-8">
                <Lock size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Secure & Private</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-10 font-medium">
                Your data is encrypted and used only to train your private AI model. Never shared.
              </p>
              
              <div className="mt-auto space-y-3">
                {[
                  'AES-256 Encryption',
                  'SOC2 Type II Compliant',
                  'GDPR & HIPAA Ready',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-[#0a0510] border border-white/5">
                    <ShieldCheck size={14} className="text-indigo-400" />
                    <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Advanced Citation Section */}
      <section className="py-32 relative bg-[#0a0510]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            {/* Text Content */}
            <motion.div 
              {...fadeIn}
              className="lg:w-1/2"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
                Trust, But Verify
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-10 tracking-tight leading-tight">
                Advanced Citation <br /> <span className="text-indigo-400">Mechanism</span>
              </h2>
              <p className="text-white/50 text-lg mb-12 leading-relaxed font-medium max-w-xl">
                Every response generated by the AI comes with clickable citations, linking back to the exact source and page in your documentation.
              </p>
              
              <div className="space-y-6">
                {[
                  'Source transparency for every reply',
                  'One-click verification for human agents',
                  'Eliminate AI hallucinations instantly',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-5 h-5 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <Check size={10} strokeWidth={3} />
                    </div>
                    <span className="text-sm font-bold text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Citation Mockup */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 w-full"
            >
              <div className="p-8 rounded-[2.5rem] bg-[#161624] border border-white/5 relative overflow-hidden group">
                <div className="bg-[#0a0510]/80 p-6 rounded-2xl border border-white/5 mb-6">
                  <p className="text-sm text-white/90 leading-relaxed mb-6 italic">
                    &ldquo;Our standard delivery for Mumbai takes 24-48 hours, including weekends for prepaid orders.&rdquo;
                  </p>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500/20 border border-indigo-500/30 w-fit">
                    <FileText size={12} className="text-indigo-400" />
                    <span className="text-[10px] font-bold text-indigo-400">Source: Pricing_Manual_v2.pdf (Page 4)</span>
                    <ExternalLink size={10} className="text-indigo-400 ml-1" />
                  </div>
                </div>
                <div className="flex gap-3">
                   <div className="flex-1 h-2 rounded-full bg-white/5" />
                   <div className="flex-1 h-2 rounded-full bg-white/5" />
                   <div className="flex-1 h-2 rounded-full bg-white/5" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Semantic Search Section */}
      <section className="py-32 relative bg-[#0a0510]">
        <div className="container mx-auto px-6 text-center">
          <motion.h2 
            {...fadeIn}
            className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight"
          >
            Understand Intent, <br /> Not Just Keywords
          </motion.h2>
          <motion.p 
            {...fadeIn}
            className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed font-medium mb-20"
          >
            Our Semantic Search engine maps queries to meaning, ensuring your AI finds the right answer even when keywords don&apos;t match.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full opacity-30" />
            <div className="p-10 rounded-[3rem] bg-[#161624] border border-white/5 relative z-10 overflow-hidden">
               <div className="flex flex-col md:flex-row items-center gap-12">
                 <div className="flex-1 space-y-4">
                   <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-4">Natural Language Query</p>
                   <div className="p-4 rounded-xl bg-[#0a0510] border border-blue-500/30 text-white text-sm font-bold text-left shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                     &ldquo;Do you have any fast shipping options?&rdquo;
                   </div>
                 </div>
                 <div className="shrink-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                      <Zap size={32} />
                    </div>
                 </div>
                 <div className="flex-1 space-y-4">
                   <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-4">Semantic Meaning</p>
                   <div className="p-4 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-100 text-sm font-bold text-left">
                     Query maps to: <span className="text-white">Delivery_Express_Service</span>
                   </div>
                 </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative bg-[#0a0510]">
        <div className="container mx-auto px-6">
          <motion.div 
            {...fadeIn}
            className="relative p-16 md:p-32 rounded-[4rem] bg-gradient-to-br from-[#1e1b4b] via-[#111827] to-[#0a0510] border border-white/5 overflow-hidden text-center shadow-[0_20px_100px_rgba(0,0,0,0.5)]"
          >
            {/* Texture/Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 to-transparent pointer-events-none" />
            
            <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-12 tracking-tighter leading-[1.05] relative z-10">
              Ready to build your <br className="hidden md:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#C3B5FD]">AI Brain?</span>
            </h2>
            
            <p className="text-white/50 text-lg mb-12 max-w-2xl mx-auto font-medium relative z-10">
              Transform your business documentation into a conversational powerhouse in minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
              <Button size="lg" className="w-full sm:w-auto bg-[#C3B5FD] text-[#0a0510] hover:bg-white rounded-2xl px-14 h-16 text-lg font-black transition-all shadow-2xl">
                Get Started For Free
              </Button>
              <Button size="lg" variant="ghost" className="w-full sm:w-auto text-white hover:bg-white/10 rounded-2xl px-14 h-16 text-lg font-black border border-white/10 transition-all">
                Talk to Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

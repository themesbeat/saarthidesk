"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { 
  Play, 
  ArrowRight, 
  Bot, 
  Check, 
  Zap, 
  Settings, 
  MessageSquare,
  Database,
  TrendingUp,
  MapPin,
  RefreshCw,
  FileText,
  Plus,
  Sparkles,
  Globe
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/ChatWidget";

// Framer Motion Animation Variants (Type-Safe)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export default function LeadManagementSolutionPage() {
  return (
    <div className="min-h-screen bg-[#0a0c10] text-foreground font-sans selection:bg-primary/30 overflow-x-hidden">
      {/* Global Navigation Header */}
      <Header />

      <main className="relative">
        {/* Decorative Background Blur Blobs */}
        <div className="absolute top-[10%] left-[-15%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[160px] pointer-events-none -z-10"></div>
        <div className="absolute top-[40%] right-[-10%] w-[550px] h-[550px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none -z-10"></div>
        <div className="absolute top-[70%] left-[-5%] w-[500px] h-[500px] bg-[#c59dff]/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>

        {/* 1. HERO SECTION */}
        <section className="relative pt-20 pb-24 md:pt-28 md:pb-32 border-b border-white/5">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Copy & Actions */}
              <motion.div 
                className="lg:col-span-6 flex flex-col items-start text-left"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                {/* Announcement Badge */}
                <motion.div 
                  variants={itemVariants}
                  className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full bg-primary/10 border border-primary/20 text-[10px] md:text-xs font-bold text-primary mb-8 tracking-widest uppercase italic shadow-[0_0_15px_rgba(209,188,255,0.08)]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
                  LEAD MANAGEMENT 2.0
                </motion.div>
                
                {/* Title */}
                <motion.h1 
                  variants={itemVariants}
                  className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.08] text-white"
                >
                  Capture, Qualify, <br />
                  And <span className="bg-gradient-to-r from-primary via-secondary to-[#c59dff] bg-clip-text text-transparent italic pr-2">
                    Convert Leads
                  </span> With AI
                </motion.h1>
                
                {/* Subheading */}
                <motion.p 
                  variants={itemVariants}
                  className="text-base md:text-lg text-[#cbc4d2]/70 mb-10 max-w-xl leading-relaxed font-medium"
                >
                  Automate your sales pipeline with AI that identifies high-intent leads and handles follow-ups 24/7. Built for the modern Indian SMB landscape.
                </motion.p>
                
                {/* CTA Buttons */}
                <motion.div 
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10"
                >
                  <Link 
                    href="/register" 
                    className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-base transition-all hover:bg-primary/90 text-center flex items-center justify-center gap-2 shadow-[0_10px_35px_rgba(209,188,255,0.25)] hover:scale-[1.02]"
                  >
                    Start Free Trial <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link 
                    href="/demo" 
                    className="w-full sm:w-auto px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-xl font-bold text-base transition-all hover:bg-white/10 text-center flex items-center justify-center gap-2 hover:scale-[1.02]"
                  >
                    <Play className="w-4 h-4 text-primary fill-current" /> Watch Demo
                  </Link>
                </motion.div>
                
                {/* Social Proof */}
                <motion.div 
                  variants={itemVariants}
                  className="flex items-center gap-4"
                >
                  <div className="flex -space-x-3">
                    <div className="w-9 h-9 rounded-full border-2 border-[#0a0c10] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] font-black text-white">R</div>
                    <div className="w-9 h-9 rounded-full border-2 border-[#0a0c10] bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-[10px] font-black text-white">A</div>
                    <div className="w-9 h-9 rounded-full border-2 border-[#0a0c10] bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-[10px] font-black text-white">V</div>
                  </div>
                  <div>
                    <div className="flex text-amber-400 gap-0.5 mb-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4.5 h-4.5 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-xs text-[#cbc4d2]/50 font-semibold tracking-wide">Trusted by 5,000+ growing SMBs</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Column: High-fidelity interactive Lead Pipeline console mockup */}
              <motion.div 
                className="lg:col-span-6 w-full max-w-2xl relative"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
              >
                {/* Radiant Glow Behind Mockup */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] bg-primary/10 rounded-full blur-[100px] -z-10"></div>
                
                {/* Console Container */}
                <div className="bg-[#141218] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl p-6 relative">
                  
                  {/* Console Top Window Bar */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-[0_0_8px_rgba(255,95,86,0.3)]"></span>
                      <span className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-[0_0_8px_rgba(255,189,46,0.3)]"></span>
                      <span className="w-3 h-3 rounded-full bg-[#27c93f] shadow-[0_0_8px_rgba(39,201,63,0.3)]"></span>
                    </div>
                    <div className="text-[10px] md:text-xs text-white/50 font-bold bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
                      Lead Pipeline
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-black text-primary uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                      Real-Time Sync
                    </div>
                  </div>

                  {/* Console Content: Active Lead Cards Stack */}
                  <div className="flex flex-col gap-4">
                    
                    {/* Rajesh Kumar Lead Card */}
                    <div className="bg-[#1b1921] border border-white/5 rounded-2xl p-4.5 flex justify-between items-center shadow-lg">
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center font-bold text-xs text-[#1a122c] shrink-0 shadow-lg">
                          RK
                        </div>
                        <div className="text-left">
                          <h4 className="text-sm font-bold text-white leading-tight">Rajesh Kumar</h4>
                          <span className="text-[10px] font-semibold text-white/40">WhatsApp Inquiry</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span className="text-[9px] font-black text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                          Hot Lead
                        </span>
                        <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                          98% Score
                        </span>
                      </div>
                    </div>

                    {/* Timeline Action Message - Follow-Up Panel */}
                    <div className="relative pl-10">
                      <div className="absolute top-0 bottom-0 left-5.5 w-0.5 border-l-2 border-dashed border-white/10"></div>
                      
                      <div className="bg-[#141218] border border-dashed border-primary/30 rounded-2xl p-4 flex gap-3 text-left relative z-10">
                        <div className="w-8 h-8 rounded-xl bg-primary/20 border border-primary/35 flex items-center justify-center shrink-0 shadow-md">
                          <Bot className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[9px] font-black text-primary uppercase tracking-widest">
                            Automated WhatsApp Follow-up
                          </span>
                          <p className="text-xs text-white/80 leading-relaxed font-semibold">
                            &quot;Namaste Rajesh! I noticed you were looking at our premium agency plan. Would you like a quick quote for your monthly volume?&quot;
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Ananya Sharma Lead Card */}
                    <div className="bg-[#1b1921]/60 border border-white/5 rounded-2xl p-4.5 flex justify-between items-center opacity-70">
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xs text-white/60 shrink-0">
                          AS
                        </div>
                        <div className="text-left">
                          <h4 className="text-sm font-bold text-white/80 leading-tight">Ananya Sharma</h4>
                          <span className="text-[10px] font-semibold text-white/30">Web Form</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black text-white/40 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                          Cold Lead
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Float Metric overlay card */}
                  <div className="absolute bottom-6 right-6 bg-[#1a122c]/90 backdrop-blur-xl border border-primary/30 rounded-2xl p-4.5 shadow-2xl flex items-center gap-3.5 hover:scale-105 transition-transform duration-300">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary shrink-0 shadow-lg shadow-primary/5">
                      <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <span className="text-[8px] font-black text-white/40 tracking-widest uppercase">Conversions</span>
                      <div className="text-lg font-black text-white leading-tight">+42%</div>
                    </div>
                  </div>

                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* 2. INTELLIGENT QUALIFICATION SECTION */}
        <section className="relative py-24 md:py-32 border-b border-white/5">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              
              {/* Left Column: Vikram Mehta Lead Details Panel */}
              <div className="lg:col-span-6 w-full relative">
                
                {/* Accent Blob */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-indigo-500/5 rounded-full blur-[100px] -z-10"></div>
                
                {/* Mock Card */}
                <div className="bg-[#14171c] border border-white/10 rounded-[2.5rem] p-7 md:p-9 shadow-2xl relative overflow-hidden">
                  
                  {/* Lead Info Header */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center font-bold text-xs text-indigo-400 shrink-0 shadow-lg shadow-indigo-500/5">
                        VM
                      </div>
                      <div className="text-left">
                        <h4 className="text-sm md:text-base font-bold text-white leading-tight">Vikram Mehta</h4>
                        <span className="text-[10px] md:text-xs font-semibold text-white/40">Real Estate Developer</span>
                      </div>
                    </div>
                    <button className="text-white/40 hover:text-white/80 transition-colors p-2 bg-white/5 rounded-xl border border-white/10">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>

                  {/* AI Insights Header */}
                  <div className="flex justify-between items-center mb-5">
                    <div className="text-[10px] font-black text-primary tracking-widest uppercase flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 fill-current text-primary" /> AI Insights
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#1b1921] border border-white/10 text-[9px] font-black text-white/50 tracking-wider">
                      Analyzing...
                    </span>
                  </div>

                  {/* Two-Column Stat Panel */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-[#0a0c10]/40 border border-white/5 rounded-2xl p-4.5 text-left">
                      <span className="text-[9px] font-black text-white/40 tracking-wider uppercase mb-1 block">Likely to Buy</span>
                      <div className="text-xl font-black text-primary uppercase">High</div>
                    </div>
                    <div className="bg-[#0a0c10]/40 border border-white/5 rounded-2xl p-4.5 text-left">
                      <span className="text-[9px] font-black text-white/40 tracking-wider uppercase mb-1 block">Engagement</span>
                      <div className="text-xl font-black text-white">8/10</div>
                    </div>
                  </div>

                  {/* Recommended Next Step Sub-card */}
                  <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex gap-3.5 text-left">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 shadow-md">
                      <MapPin className="w-4.5 h-4.5 text-primary" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h5 className="text-[10px] font-black text-primary uppercase tracking-widest">Recommended Next Step</h5>
                      <p className="text-xs text-white/85 leading-relaxed font-semibold">
                        Send Pricing for &apos;Emerald Terraces&apos; project. Lead has viewed the floor plan 3 times in 24 hours.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Right Column: Qualification Copy */}
              <div className="lg:col-span-6 text-left flex flex-col justify-center">
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
                  Intelligent <br />
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent italic pr-2">
                    Qualification
                  </span>
                </h2>
                
                <p className="text-xs md:text-sm text-[#cbc4d2]/50 leading-relaxed font-semibold mb-10 max-w-xl">
                  Stop wasting time on tyre-kickers. SaarthiDesk AI analyzes sentiment, interaction frequency, and historical patterns to score leads in real-time.
                </p>

                {/* Feature Checkmarks list */}
                <div className="flex flex-col gap-4.5">
                  {[
                    "90% reduction in manual qualification time",
                    "Sentiment analysis for WhatsApp & Email",
                    "Behavioral tracking across multiple touchpoints"
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3.5">
                      <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 shadow-md">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="text-xs md:text-sm font-bold text-white/80">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3. ONE PIPELINE, EVERY CHANNEL SECTION */}
        <section className="relative py-24 md:py-32 bg-[#0a0c10]/40 border-b border-white/5">
          <div className="container mx-auto px-4 max-w-7xl">
            
            {/* Centered Headers */}
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
                One Pipeline, Every Channel
              </h2>
              <p className="text-[#cbc4d2]/50 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-semibold">
                Whether they DM you on WhatsApp, fill a Facebook lead form, or browse your website—every lead lands in your unified AI-powered pipeline.
              </p>
            </div>

            {/* Bento Channel Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6.5">
              
              {/* Card 1: WhatsApp First */}
              <div className="bg-[#14171c] border border-white/5 rounded-[2.5rem] p-8 hover:border-primary/25 transition-all duration-300 flex flex-col justify-between group shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent pointer-events-none"></div>
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-8 shadow-lg shadow-emerald-500/5 group-hover:scale-105 transition-transform duration-300">
                    <MessageSquare className="w-5.5 h-5.5 text-emerald-400 fill-current" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-4">WhatsApp First</h3>
                  <p className="text-xs md:text-sm text-[#cbc4d2]/50 leading-relaxed font-semibold">
                    The #1 channel for India. Native integration with Official WhatsApp API to handle thousands of leads.
                  </p>
                </div>
              </div>

              {/* Card 2: Intelligent Forms */}
              <div className="bg-[#14171c] border border-white/5 rounded-[2.5rem] p-8 hover:border-primary/25 transition-all duration-300 flex flex-col justify-between group shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-orange-500/[0.02] to-transparent pointer-events-none"></div>
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-8 shadow-lg shadow-orange-500/5 group-hover:scale-105 transition-transform duration-300">
                    <FileText className="w-5.5 h-5.5 text-orange-400" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-4">Intelligent Forms</h3>
                  <p className="text-xs md:text-sm text-[#cbc4d2]/50 leading-relaxed font-semibold">
                    Replace static forms with conversational AI that captures deeper details without frustrating the user.
                  </p>
                </div>
              </div>

              {/* Card 3: Social Sync */}
              <div className="bg-[#14171c] border border-white/5 rounded-[2.5rem] p-8 hover:border-primary/25 transition-all duration-300 flex flex-col justify-between group shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.02] to-transparent pointer-events-none"></div>
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-8 shadow-lg shadow-blue-500/5 group-hover:scale-105 transition-transform duration-300">
                    <RefreshCw className="w-5.5 h-5.5 text-blue-400" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-4">Social Sync</h3>
                  <p className="text-xs md:text-sm text-[#cbc4d2]/50 leading-relaxed font-semibold">
                    Auto-import leads from Instagram DMs and Facebook Lead Ads directly into your active sales pipelines.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 4. WORKFLOW BUILDER SECTION */}
        <section className="relative py-24 max-w-7xl mx-auto px-4">
          
          <div className="bg-[#14171c] border border-white/5 rounded-[3rem] p-10 md:p-16 shadow-2xl relative overflow-hidden group hover:border-primary/10 transition-all duration-300">
            {/* Ambient background blob within workflow box */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
            
            {/* Header with pill */}
            <div className="flex justify-between items-start mb-16">
              <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">
                Workflow Builder
              </h2>
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] md:text-[10px] font-black text-emerald-400 tracking-widest uppercase">
                ACTIVE
              </span>
            </div>

            {/* Visual Timeline Nodes Map */}
            <div className="relative mb-14 py-8">
              {/* Connector line */}
              <div className="absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-primary/30 via-primary to-primary/30 -translate-y-1/2 hidden md:block"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                
                {/* Node 1: New Lead */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#0a0c10] border border-white/10 flex items-center justify-center text-white/70 shadow-lg">
                    <FileText className="w-6 h-6 text-white/70" />
                  </div>
                  <span className="mt-4 text-xs font-bold text-white/50 tracking-wider uppercase">Node 01</span>
                  <h4 className="mt-1.5 text-sm md:text-base font-black text-white">New Lead</h4>
                </div>

                {/* Node 2: AI Follow-up (Personalized) */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/15 border border-primary/35 flex items-center justify-center text-primary shadow-xl shadow-primary/5 relative">
                    <Bot className="w-7 h-7 text-primary" />
                    {/* Ring highlight animation */}
                    <span className="absolute -inset-1 rounded-2xl border-2 border-primary/40 animate-pulse"></span>
                  </div>
                  <span className="mt-4 text-xs font-bold text-primary tracking-wider uppercase">Node 02</span>
                  <h4 className="mt-1.5 text-sm md:text-base font-black text-white">AI Follow-up (Personalized)</h4>
                </div>

                {/* Node 3: CRM Sync */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#0a0c10] border border-white/10 flex items-center justify-center text-white/70 shadow-lg">
                    <Database className="w-6 h-6 text-white/70" />
                  </div>
                  <span className="mt-4 text-xs font-bold text-white/50 tracking-wider uppercase">Node 03</span>
                  <h4 className="mt-1.5 text-sm md:text-base font-black text-white">CRM Sync</h4>
                </div>

              </div>
            </div>

            {/* Quote slogan */}
            <p className="text-sm md:text-base text-white/50 italic font-semibold text-center border-t border-white/5 pt-8 max-w-xl mx-auto">
              &quot;Human-like persistence without the manual work.&quot;
            </p>

          </div>
        </section>

        {/* 5. LIGHTWEIGHT CRM OR ENTERPRISE SYNC SECTION */}
        <section className="relative py-24 md:py-32 border-b border-white/5">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              
              {/* Left Column: Feature Stats */}
              <div className="lg:col-span-5 text-left flex flex-col justify-center">
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
                  Your Lightweight CRM <br />
                  Or <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent italic">
                    Enterprise Sync
                  </span>
                </h2>
                
                <p className="text-xs md:text-sm text-[#cbc4d2]/50 leading-relaxed font-semibold mb-10 max-w-lg">
                  Whether you&apos;re a startup needing your first CRM or an enterprise syncing with Salesforce or HubSpot, SaarthiDesk fits perfectly into your stack.
                </p>

                {/* Two stats boxes side-by-side or stacked */}
                <div className="flex flex-col gap-4">
                  <div className="bg-[#14171c] border border-white/5 rounded-2xl p-5.5 flex items-center gap-4.5 hover:border-primary/20 transition-all cursor-pointer">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 shadow-lg shadow-primary/5">
                      <Zap className="w-5 h-5 text-primary fill-current" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-sm font-bold text-white">Instant Sync</h4>
                      <p className="text-[10px] md:text-xs text-white/40 mt-0.5">Zero-latency updates across all platforms.</p>
                    </div>
                  </div>

                  <div className="bg-[#14171c] border border-white/5 rounded-2xl p-5.5 flex items-center gap-4.5 hover:border-primary/20 transition-all cursor-pointer">
                    <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 shadow-lg shadow-indigo-500/5">
                      <Settings className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-sm font-bold text-white">History Log</h4>
                      <p className="text-[10px] md:text-xs text-white/40 mt-0.5">Full audit trails for transparent handoffs.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: 3x2 integrations logo grid mockup */}
              <div className="lg:col-span-7 w-full relative">
                
                {/* Subtle backlighting */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4.5">
                  
                  {/* HubSpot */}
                  <div className="bg-[#14171c] border border-white/5 hover:border-primary/20 transition-all duration-300 rounded-3xl p-6.5 flex flex-col items-center justify-center text-center shadow-lg relative group overflow-hidden">
                    <div className="w-11 h-11 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex items-center justify-center mb-3">
                      <Sparkles className="w-5 h-5 text-orange-400" />
                    </div>
                    <span className="text-xs font-bold text-white/70">HubSpot</span>
                  </div>

                  {/* Salesforce */}
                  <div className="bg-[#14171c] border border-white/5 hover:border-primary/20 transition-all duration-300 rounded-3xl p-6.5 flex flex-col items-center justify-center text-center shadow-lg relative group overflow-hidden">
                    <div className="w-11 h-11 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center mb-3">
                      <Globe className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className="text-xs font-bold text-white/70">Salesforce</span>
                  </div>

                  {/* Zapier */}
                  <div className="bg-[#14171c] border border-white/5 hover:border-primary/20 transition-all duration-300 rounded-3xl p-6.5 flex flex-col items-center justify-center text-center shadow-lg relative group overflow-hidden">
                    <div className="w-11 h-11 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center mb-3">
                      <Zap className="w-5 h-5 text-amber-400" />
                    </div>
                    <span className="text-xs font-bold text-white/70">Zapier</span>
                  </div>

                  {/* Zoho */}
                  <div className="bg-[#14171c] border border-white/5 hover:border-primary/20 transition-all duration-300 rounded-3xl p-6.5 flex flex-col items-center justify-center text-center shadow-lg relative group overflow-hidden">
                    <div className="w-11 h-11 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mb-3">
                      <RefreshCw className="w-5 h-5 text-red-400" />
                    </div>
                    <span className="text-xs font-bold text-white/70">Zoho</span>
                  </div>

                  {/* Google Sheets */}
                  <div className="bg-[#14171c] border border-white/5 hover:border-primary/20 transition-all duration-300 rounded-3xl p-6.5 flex flex-col items-center justify-center text-center shadow-lg relative group overflow-hidden">
                    <div className="w-11 h-11 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mb-3">
                      <Database className="w-5 h-5 text-emerald-400" />
                    </div>
                    <span className="text-xs font-bold text-white/70">Sheets</span>
                  </div>

                  {/* Custom Webhooks */}
                  <div className="bg-[#14171c]/40 border border-dashed border-white/10 hover:border-primary/20 transition-all duration-300 rounded-3xl p-6.5 flex flex-col items-center justify-center text-center shadow-inner group overflow-hidden cursor-pointer">
                    <div className="w-11 h-11 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-350">
                      <Plus className="w-5 h-5 text-white/40" />
                    </div>
                    <span className="text-xs font-bold text-white/40">+ Webhooks</span>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 6. CALL TO ACTION SECTION */}
        <section className="py-24 px-4 bg-[#0a0c10]/30">
          <div className="container mx-auto max-w-6xl">
            
            {/* Deep Violet Card Wrapper */}
            <div className="bg-gradient-to-br from-[#2c1356]/40 via-[#18112a]/30 to-[#0a0c10] border border-primary/10 rounded-[3.5rem] p-16 md:p-24 text-center relative overflow-hidden shadow-[0_20px_50px_rgba(209,188,255,0.05)]">
              
              {/* Backlighting glow effects */}
              <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[160px] pointer-events-none -z-10"></div>
              <div className="absolute -bottom-32 -left-32 w-[450px] h-[450px] bg-indigo-500/5 rounded-full blur-[130px] pointer-events-none -z-10"></div>

              <h2 className="text-3xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
                Ready to supercharge your sales pipeline?
              </h2>
              
              <p className="text-[#cbc4d2]/60 text-base md:text-lg mb-12 max-w-xl mx-auto leading-relaxed font-semibold">
                Join 5,000+ Indian SMBs using SaarthiDesk to automate their lead management and close deals faster.
              </p>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
                <Link 
                  href="/demo" 
                  className="w-full sm:w-auto px-10 py-4.5 bg-primary text-[#1a122c] rounded-2xl font-black text-base transition-all hover:bg-primary/95 text-center shadow-[0_15px_35px_rgba(209,188,255,0.22)] hover:scale-[1.02]"
                >
                  Book a Demo
                </Link>
                <Link 
                  href="/contact" 
                  className="w-full sm:w-auto px-10 py-4.5 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-base transition-all hover:bg-white/10 text-center hover:scale-[1.02]"
                >
                  Talk to Sales
                </Link>
              </div>

            </div>

          </div>
        </section>

      </main>

      {/* Global Page Footer & Chat Widget */}
      <Footer />
      <ChatWidget />
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { 
  Play, 
  ArrowRight, 
  Bot, 
  MessageSquare, 
  Mail, 
  ThumbsUp, 
  Check, 
  Zap, 
  Settings, 
  MessageCircle,
  Paperclip,
  Send
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/ChatWidget";

// Framer Motion Animation Variants
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

export default function CustomerSupportSolutionPage() {
  return (
    <div className="min-h-screen bg-[#0a0c10] text-foreground font-sans selection:bg-primary/30 overflow-x-hidden">
      {/* Global Navigation Header */}
      <Header />

      <main className="relative">
        {/* Background Blur Blobs */}
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none -z-10"></div>
        <div className="absolute top-[50%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[180px] pointer-events-none -z-10"></div>

        {/* 1. HERO SECTION */}
        <section className="relative pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Copy & Actions */}
              <motion.div 
                className="lg:col-span-6 flex flex-col items-start text-left"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                {/* Purple Announcement Badge */}
                <motion.div 
                  variants={itemVariants}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] md:text-xs font-bold text-primary mb-8 tracking-widest uppercase italic shadow-[0_0_15px_rgba(209,188,255,0.1)]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                  NEW: GPT-4O POWERED AUTOMATION
                </motion.div>
                
                {/* Title */}
                <motion.h1 
                  variants={itemVariants}
                  className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.08] text-white"
                >
                  AI Customer Support <br />
                  <span className="bg-gradient-to-r from-primary via-secondary to-[#c59dff] bg-clip-text text-transparent italic pr-2">
                    That Never Sleeps
                  </span>
                </motion.h1>
                
                {/* Subheading */}
                <motion.p 
                  variants={itemVariants}
                  className="text-base md:text-lg text-[#cbc4d2]/70 mb-10 max-w-xl leading-relaxed font-medium"
                >
                  Automate 80% of support queries with human-like intelligence. Boost CSAT, reduce response times to seconds, and scale your support without scaling your headcount.
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
                
                {/* Trusted By Block */}
                <motion.div 
                  variants={itemVariants}
                  className="flex items-center gap-4"
                >
                  <div className="flex -space-x-3">
                    <div className="w-9 h-9 rounded-full border-2 border-[#0a0c10] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] font-black text-white">S</div>
                    <div className="w-9 h-9 rounded-full border-2 border-[#0a0c10] bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-[10px] font-black text-white">D</div>
                    <div className="w-9 h-9 rounded-full border-2 border-[#0a0c10] bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-[10px] font-black text-white">B</div>
                  </div>
                  <div>
                    <div className="flex text-amber-400 gap-0.5 mb-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4.5 h-4.5 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-xs text-[#cbc4d2]/50 font-semibold tracking-wide">Trusted by 2,000+ growing SMBs</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Column: Interactive Chat Mockup Window */}
              <motion.div 
                className="lg:col-span-6 w-full max-w-2xl relative"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
              >
                {/* Glow behind mockup */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] bg-primary/10 rounded-full blur-[100px] -z-10"></div>
                
                {/* Tablet/OS Window */}
                <div className="bg-[#141218] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl p-6 relative">
                  
                  {/* Window Bar */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                    <div className="flex gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-[0_0_8px_rgba(255,95,86,0.3)]"></span>
                      <span className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-[0_0_8px_rgba(255,189,46,0.3)]"></span>
                      <span className="w-3 h-3 rounded-full bg-[#27c93f] shadow-[0_0_8px_rgba(39,201,63,0.3)]"></span>
                    </div>
                    <div className="text-[10px] md:text-xs text-white/50 font-bold bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
                      Active Thread: #7245 - Delivery Status
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-black text-primary uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                      AI Agent Active
                    </div>
                  </div>

                  {/* Chat Area */}
                  <div className="flex flex-col gap-6 min-h-[300px]">
                    
                    {/* User Query Message */}
                    <div className="flex gap-3 items-start">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-black text-xs text-white shrink-0 shadow-lg shadow-indigo-500/10">
                        JD
                      </div>
                      <div className="flex flex-col gap-1.5 max-w-[80%]">
                        <div className="bg-white/5 border border-white/10 rounded-3xl rounded-tl-none p-4 text-xs md:text-sm text-white/90 leading-relaxed font-medium">
                          Hi, I ordered a Saarthi Pro kit yesterday and haven&apos;t received a tracking number. Can you help?
                        </div>
                        <span className="text-[9px] text-white/40 ml-1">Sent 10:42</span>
                      </div>
                    </div>

                    {/* AI Response Message */}
                    <div className="flex gap-3 items-start">
                      <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0 shadow-lg shadow-primary/5">
                        <Bot className="w-4.5 h-4.5 text-primary" />
                      </div>
                      <div className="flex flex-col gap-1.5 max-w-[85%]">
                        <div className="bg-primary text-[#1a122c] rounded-3xl rounded-tl-none p-4 text-xs md:text-sm leading-relaxed font-semibold shadow-xl shadow-primary/5">
                          Hello! I&apos;ve just checked our system. Your order #SD-8821 was processed this morning. It&apos;s currently being picked by our logistics partner. You should receive a tracking link via email within the next 2 hours. Is there anything else I can assist with?
                        </div>
                        <div className="flex justify-between items-center px-1 text-[9px] font-black text-primary uppercase tracking-widest mt-1">
                          <span className="flex items-center gap-1">
                            <Zap className="w-3 h-3 fill-current" />
                            AI Response - handed off in 0.4s
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Handoff State Indicator */}
                    <div className="py-2.5 px-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center gap-2 text-amber-400 text-[10px] md:text-xs font-black uppercase tracking-widest animate-pulse mt-4">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                      </span>
                      🔄 HANDOFF: TRANSITIONING TO SENIOR AGENT
                    </div>

                  </div>

                  {/* Chat Input Bar Mock */}
                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-3.5 mt-6">
                    <input 
                      type="text" 
                      placeholder="Agent is joining the chat..." 
                      disabled 
                      className="flex-1 bg-transparent text-xs md:text-sm text-white/30 outline-none cursor-not-allowed font-medium pl-2"
                    />
                    <button disabled className="text-white/20 hover:text-white/40 transition-colors cursor-not-allowed">
                      <Paperclip className="w-5 h-5" />
                    </button>
                    <button disabled className="bg-primary/20 text-primary/40 p-2.5 rounded-xl cursor-not-allowed">
                      <Send className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* 2. BENTO GRID SECTION */}
        <section className="relative py-24 bg-[#0a0c10]/40 border-t border-white/5">
          <div className="container mx-auto px-4 max-w-7xl">
            
            {/* Centered Headers */}
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
                Supercharge Your Support Workflow
              </h2>
              <p className="text-[#cbc4d2]/50 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-semibold">
                Everything you need to automate your customer interactions across every channel, with the precision of a human and the speed of light.
              </p>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Card 1: Instant Replies (md:col-span-4) */}
              <div className="md:col-span-4 bg-[#14171c] border border-white/5 rounded-[2.5rem] p-8 hover:border-primary/25 transition-all duration-300 flex flex-col justify-between group shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent pointer-events-none"></div>
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-8 shadow-lg shadow-primary/5 group-hover:scale-105 transition-transform duration-300">
                    <Zap className="w-5.5 h-5.5 text-primary fill-current" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-4">Instant Replies</h3>
                  <p className="text-xs md:text-sm text-[#cbc4d2]/50 leading-relaxed font-semibold">
                    Reduce wait times from minutes to milliseconds with our edge-optimized AI.
                  </p>
                </div>
                <div className="mt-12 pt-8 border-t border-white/5">
                  <div className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2 flex items-baseline">
                    0.8
                    <span className="text-lg md:text-xl text-primary font-black ml-1.5 uppercase tracking-wide">sec</span>
                  </div>
                  <div className="text-[9px] md:text-[10px] text-white/40 tracking-widest font-black uppercase">
                    Average Response Time
                  </div>
                </div>
              </div>

              {/* Card 2: True Automation (md:col-span-8) */}
              <div className="md:col-span-8 bg-[#14171c] border border-white/5 rounded-[2.5rem] p-8 hover:border-primary/25 transition-all duration-300 flex flex-col justify-between group shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/[0.02] to-transparent pointer-events-none"></div>
                
                {/* Header elements inside Card */}
                <div>
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shadow-lg shadow-amber-500/5 group-hover:scale-105 transition-transform duration-300">
                      <Settings className="w-5.5 h-5.5 text-amber-400" />
                    </div>
                    <div className="px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[9px] md:text-[10px] font-black text-primary uppercase tracking-widest">
                      ✨ 82% Tickets Resolved
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-4">True Automation</h3>
                  <p className="text-xs md:text-sm text-[#cbc4d2]/50 leading-relaxed font-semibold max-w-2xl">
                    Our AI doesn&apos;t just suggest—it resolves. Handle ticket deflection with ease.
                  </p>
                </div>

                {/* Automation Performance Widget */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-6 items-end pt-8 border-t border-white/5">
                  
                  {/* Left Side: Deflection comparison bars */}
                  <div className="md:col-span-7 bg-[#0a0c10]/50 rounded-2xl border border-white/5 p-5 flex flex-col justify-between h-36 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/[0.03] to-transparent"></div>
                    <div className="w-full h-20 flex items-end justify-around px-2 z-10 relative">
                      {/* Before bar */}
                      <div className="flex flex-col items-center gap-1.5 w-1/3">
                        <div className="w-full bg-white/10 rounded-t-lg h-7 group-hover:bg-white/15 transition-all duration-500"></div>
                      </div>
                      {/* After bar */}
                      <div className="flex flex-col items-center gap-1.5 w-1/3">
                        <div className="w-full bg-gradient-to-b from-primary to-primary/80 rounded-t-lg h-20 shadow-[0_0_20px_rgba(209,188,255,0.4)] transition-all duration-500"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-[9px] font-black text-white/30 px-2 mt-3 z-10 uppercase tracking-widest">
                      <span>Before AI</span>
                      <span>After AI</span>
                    </div>
                  </div>

                  {/* Right Side: Deflection stats */}
                  <div className="md:col-span-5 flex flex-col gap-3.5">
                    <div className="bg-[#0a0c10]/40 rounded-2xl border border-white/5 p-4 flex justify-between items-center hover:border-emerald-500/20 transition-colors">
                      <span className="text-[11px] md:text-xs text-[#cbc4d2]/60 font-semibold uppercase tracking-wider">Ops Savings</span>
                      <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full flex items-center gap-0.5">
                        64% <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 13l-7 7-7-7" /></svg>
                      </span>
                    </div>
                    <div className="bg-[#0a0c10]/40 rounded-2xl border border-white/5 p-4 flex justify-between items-center hover:border-primary/20 transition-colors">
                      <span className="text-[11px] md:text-xs text-[#cbc4d2]/60 font-semibold uppercase tracking-wider">Team Productivity</span>
                      <span className="text-xs font-black text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full flex items-center gap-0.5">
                        3.5x <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 11l7-7 7 7M5 19l7-7 7 7" /></svg>
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Card 3: Omnichannel Unified (md:col-span-7) */}
              <div className="md:col-span-7 bg-[#14171c] border border-white/5 rounded-[2.5rem] p-8 hover:border-primary/25 transition-all duration-300 flex flex-col justify-between group shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.02] to-transparent pointer-events-none"></div>
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-8 shadow-lg shadow-blue-500/5 group-hover:scale-105 transition-transform duration-300">
                    <MessageSquare className="w-5.5 h-5.5 text-blue-400" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-4">Omnichannel Unified</h3>
                  <p className="text-xs md:text-sm text-[#cbc4d2]/50 leading-relaxed font-semibold">
                    WhatsApp, Instagram, Email, and WebChat—all flowing into one intelligent AI-powered stream.
                  </p>
                </div>
                
                {/* Interactive Channel Buttons Grid */}
                <div className="mt-12 grid grid-cols-2 gap-3.5 pt-8 border-t border-white/5">
                  <div className="bg-[#0a0c10]/40 border border-white/5 rounded-2xl p-4 flex items-center gap-3.5 hover:border-emerald-500/30 transition-all hover:scale-[1.01] cursor-pointer">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                      <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.458L0 24zm6.59-4.846c1.6.95 3.16 1.455 4.71 1.456 5.48 0 9.94-4.456 9.94-9.932C21.3 5.21 17.18 1.1 12.01 1.1c-5.18 0-9.4 4.108-9.4 9.584-.002 1.848.52 3.654 1.508 5.217l-1.01 3.693 3.94-.958z" /></svg>
                    </div>
                    <span className="text-xs md:text-sm font-bold text-white/80">WhatsApp</span>
                  </div>

                  <div className="bg-[#0a0c10]/40 border border-white/5 rounded-2xl p-4 flex items-center gap-3.5 hover:border-pink-500/30 transition-all hover:scale-[1.01] cursor-pointer">
                    <div className="w-9 h-9 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shrink-0">
                      <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                    </div>
                    <span className="text-xs md:text-sm font-bold text-white/80">Instagram</span>
                  </div>

                  <div className="bg-[#0a0c10]/40 border border-white/5 rounded-2xl p-4 flex items-center gap-3.5 hover:border-purple-500/30 transition-all hover:scale-[1.01] cursor-pointer">
                    <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                      <Mail className="w-4.5 h-4.5" />
                    </div>
                    <span className="text-xs md:text-sm font-bold text-white/80">Email</span>
                  </div>

                  <div className="bg-[#0a0c10]/40 border border-white/5 rounded-2xl p-4 flex items-center gap-3.5 hover:border-primary/30 transition-all hover:scale-[1.01] cursor-pointer">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                      <MessageCircle className="w-4.5 h-4.5" />
                    </div>
                    <span className="text-xs md:text-sm font-bold text-white/80">Web Chat</span>
                  </div>
                </div>
              </div>

              {/* Card 4: Customer Love (md:col-span-5) */}
              <div className="md:col-span-5 bg-[#14171c] border border-white/5 rounded-[2.5rem] p-8 hover:border-primary/25 transition-all duration-300 flex flex-col justify-between group shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-orange-500/[0.02] to-transparent pointer-events-none"></div>
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-8 shadow-lg shadow-orange-500/5 group-hover:scale-105 transition-transform duration-300">
                    <ThumbsUp className="w-5.5 h-5.5 text-orange-400" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-4">Customer Love</h3>
                  <p className="text-xs md:text-sm text-[#cbc4d2]/50 leading-relaxed font-semibold">
                    Efficiency doesn&apos;t mean compromising on quality. In fact, it improves it.
                  </p>
                </div>
                
                {/* Rating & Testimonial Widget */}
                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col gap-5">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl md:text-5xl font-black text-white tracking-tight">4.9</span>
                    <div className="flex flex-col gap-1">
                      <div className="flex text-amber-400 gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-[9px] md:text-[10px] text-white/40 tracking-wider font-semibold uppercase">
                        CSAT Customer Rating
                      </span>
                    </div>
                  </div>
                  
                  {/* Quote block */}
                  <p className="text-[11px] md:text-xs text-white/60 italic leading-relaxed pl-3.5 border-l-2 border-primary/40 font-medium">
                    &quot;The AI assistant is remarkably human-like. Our customers are happier than ever!&quot;
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 3. HUMAN HANDOFF SECTION */}
        <section className="relative py-24 max-w-7xl mx-auto px-4">
          
          {/* Section Container Card */}
          <div className="bg-[#14171c] border border-white/5 rounded-[3rem] p-10 md:p-16 shadow-2xl relative overflow-hidden group hover:border-primary/10 transition-all duration-300">
            {/* Background Blob decoration within card */}
            <div className="absolute top-1/2 right-[-5%] -translate-y-1/2 w-[350px] h-[350px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Details */}
              <div className="lg:col-span-6 text-left">
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6 leading-[1.1]">
                  Human Handoff, <br />
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent italic">
                    Perfectly Synced
                  </span>
                </h2>
                
                <p className="text-xs md:text-sm text-[#cbc4d2]/50 leading-relaxed font-semibold mb-10 max-w-xl">
                  When the conversation gets complex, SaarthiDesk transitions smoothly to your agents. No repetition required—the agent gets the full AI transcript and customer sentiment instantly.
                </p>
                
                {/* Feature checklist */}
                <div className="flex flex-col gap-4.5">
                  {[
                    "Context-aware agent onboarding",
                    "Sentiment analysis triggers",
                    "Seamless cross-department routing"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3.5">
                      <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 shadow-md">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="text-xs md:text-sm font-bold text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Agent Vikram Handoff Preview Screen */}
              <div className="lg:col-span-6 w-full relative">
                {/* Tiny screen wrapper */}
                <div className="bg-[#0a0c10] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                  
                  {/* Agent Header bar */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-5">
                    <div className="flex items-center gap-3.5">
                      <div className="w-9 h-9 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-black text-xs shrink-0 shadow-lg shadow-indigo-500/5">
                        V
                      </div>
                      <div className="text-left">
                        <div className="text-xs md:text-sm font-bold text-white leading-tight">Agent Vikram</div>
                        <div className="text-[9px] md:text-[10px] text-white/40 font-semibold tracking-wide">Senior Support Specialist</div>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black text-emerald-400 tracking-widest uppercase">
                      ONLINE
                    </span>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-[#14171c] border border-white/5 rounded-2xl p-4.5 mb-5 shadow-inner">
                    <div className="text-[9px] font-black text-primary tracking-widest uppercase mb-2 flex items-center gap-1.5">
                      <Bot className="w-3.5 h-3.5 fill-current" /> AI SUPPORT SUMMARY
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed font-semibold text-left">
                      Customer is frustrated with delay in order #SD-8821. AI explained processing, but customer requested human clarification on refund policy.
                    </p>
                  </div>

                  {/* Vikram's active message response */}
                  <div className="flex gap-3.5 items-start mt-6 text-left">
                    <div className="w-9 h-9 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-black text-xs shrink-0 shadow-lg">
                      V
                    </div>
                    <div className="flex flex-col gap-1.5 max-w-[85%]">
                      <div className="bg-white/5 border border-white/10 rounded-3xl rounded-tl-none p-4 text-xs md:text-sm text-white/80 leading-relaxed italic font-semibold shadow-md">
                        &quot;Hi there, Vikram here. I&apos;ve read your chat with our AI assistant. I&apos;m looking into the refund window for you right now...&quot;
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 4. CALL TO ACTION SECTION */}
        <section className="py-24 px-4 bg-[#0a0c10]/30 border-t border-white/5">
          <div className="container mx-auto max-w-6xl">
            
            {/* Deep Violet Card Wrapper */}
            <div className="bg-gradient-to-br from-[#2c1356]/40 via-[#18112a]/30 to-[#0a0c10] border border-primary/10 rounded-[3.5rem] p-16 md:p-24 text-center relative overflow-hidden shadow-[0_20px_50px_rgba(209,188,255,0.05)]">
              
              {/* Radiant glows inside card */}
              <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[160px] pointer-events-none -z-10"></div>
              <div className="absolute -bottom-32 -left-32 w-[450px] h-[450px] bg-indigo-500/5 rounded-full blur-[130px] pointer-events-none -z-10"></div>

              <h2 className="text-3xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
                Ready to wake up your support team?
              </h2>
              
              <p className="text-[#cbc4d2]/60 text-base md:text-lg mb-12 max-w-xl mx-auto leading-relaxed font-semibold">
                Start your AI-powered support journey today and see the difference in 24 hours.
              </p>

              {/* Lavender action links */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
                <Link 
                  href="/demo" 
                  className="w-full sm:w-auto px-10 py-4.5 bg-primary text-[#1a122c] rounded-2xl font-black text-base transition-all hover:bg-primary/95 text-center shadow-[0_15px_35px_rgba(209,188,255,0.22)] hover:scale-[1.02]"
                >
                  Book a Demo
                </Link>
                <Link 
                  href="/case-studies" 
                  className="w-full sm:w-auto px-10 py-4.5 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-base transition-all hover:bg-white/10 text-center hover:scale-[1.02]"
                >
                  View Case Studies
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

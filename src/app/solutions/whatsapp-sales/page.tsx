"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { 
  Play, 
  ArrowRight, 
  MessageSquare, 
  Sparkles, 
  CheckCircle2, 
  CheckCircle,
  Bot,
  User,
  ChevronRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  ShoppingBag,
  CreditCard,
  BarChart3,
  Percent,
  Check,
  Calendar,
  Layers,
  Sparkle
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
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { y: 25, opacity: 0 },
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

export default function WhatsAppSalesSolutionPage() {
  const [isDemoPlaying, setIsDemoPlaying] = useState<boolean>(false);
  const [chatStep, setChatStep] = useState<number>(0);

  // Auto-progress WhatsApp chat simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setChatStep((prev) => (prev < 3 ? prev + 1 : 0));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#07090e] text-foreground font-sans selection:bg-primary/30 overflow-x-hidden">
      {/* Global Navigation Header */}
      <Header />

      <main className="relative">
        {/* Decorative Background Blur Blobs */}
        <div className="absolute top-[8%] left-[-10%] w-[550px] h-[550px] bg-primary/10 rounded-full blur-[130px] pointer-events-none -z-10 animate-pulse"></div>
        <div className="absolute top-[35%] right-[-15%] w-[650px] h-[650px] bg-purple-500/5 rounded-full blur-[160px] pointer-events-none -z-10"></div>
        <div className="absolute top-[70%] left-[15%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none -z-10"></div>

        {/* 1. HERO SECTION */}
        <section className="relative pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Headline and Call to Actions */}
              <motion.div 
                className="lg:col-span-6 flex flex-col items-start text-left"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                {/* Glowing Badge */}
                <motion.div 
                  variants={itemVariants}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] md:text-xs font-bold text-primary mb-8 tracking-widest uppercase italic shadow-[0_0_15px_rgba(209,188,255,0.08)]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                  WhatsApp Sales Engine v2.0
                </motion.div>
                
                {/* H1 Main Title */}
                <motion.h1 
                  variants={itemVariants}
                  className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.08] text-white"
                >
                  Turn WhatsApp Into A <br />
                  <span className="bg-gradient-to-r from-primary via-purple-400 to-[#c59dff] bg-clip-text text-transparent italic pr-2">
                    Sales Machine
                  </span>
                </motion.h1>
                
                {/* Subtext explanation */}
                <motion.p 
                  variants={itemVariants}
                  className="text-base md:text-lg text-[#cbc4d2]/70 mb-10 max-w-xl leading-relaxed font-medium"
                >
                  Automate your sales funnel on the world&apos;s most popular messaging app. Capture leads, qualify with AI, and close deals 24/7 without lifting a finger.
                </motion.p>
                
                {/* Action Buttons */}
                <motion.div 
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10"
                >
                  <Link 
                    href="/register" 
                    className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-base transition-all hover:bg-primary/95 text-center flex items-center justify-center gap-2 shadow-[0_10px_35px_rgba(209,188,255,0.25)] hover:scale-[1.02]"
                  >
                    Get Started Free <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button 
                    onClick={() => setIsDemoPlaying(!isDemoPlaying)}
                    className="w-full sm:w-auto px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-xl font-bold text-base transition-all hover:bg-white/10 text-center flex items-center justify-center gap-2 hover:scale-[1.02] cursor-pointer"
                  >
                    <Play className={`w-4 h-4 text-primary ${isDemoPlaying ? 'animate-pulse' : 'fill-current'}`} /> 
                    {isDemoPlaying ? "Playing Demo" : "Watch Demo"}
                  </button>
                </motion.div>
              </motion.div>

              {/* Right Column: Hero Sales Pipeline Mockup */}
              <motion.div 
                className="lg:col-span-6 w-full max-w-2xl relative"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
              >
                {/* Purple radial behind the panel */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] bg-primary/10 rounded-full blur-[110px] -z-10"></div>
                
                {/* Sales Pipeline Mockup Panel */}
                <div className="bg-[#111318] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl p-6 relative">
                  
                  {/* Top Bar */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center border border-green-500/20">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      </div>
                      <span className="text-sm font-black text-white">Sales Pipeline</span>
                    </div>
                    <div className="text-[10px] text-white/50 font-bold bg-white/5 px-4 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping"></span>
                      Live Now
                    </div>
                  </div>

                  {/* Top Row: Pipeline Statistics */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-[#181a20] border border-white/5 rounded-2xl p-4 text-left">
                      <div className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">New Leads</div>
                      <div className="text-2xl font-black text-white">128</div>
                    </div>
                    <div className="bg-[#181a20] border border-white/5 rounded-2xl p-4 text-left">
                      <div className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Qualified</div>
                      <div className="text-2xl font-black text-white">42</div>
                    </div>
                    <div className="bg-[#181a20] border border-white/5 rounded-2xl p-4 text-left">
                      <div className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Revenue</div>
                      <div className="text-2xl font-black text-primary flex items-baseline">
                        ₹4.2L
                      </div>
                    </div>
                  </div>

                  {/* Pipeline Notification Stream */}
                  <div className="flex flex-col gap-3">
                    
                    {/* Activity 1: Anand Kumar (Qualified) */}
                    <div className="bg-[#181a20]/90 border border-white/5 rounded-2xl p-4 flex items-center justify-between relative overflow-hidden transition-all hover:bg-[#181a20]">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-400"></div>
                      <div className="flex items-center gap-3 pl-2">
                        <div className="w-9 h-9 rounded-full bg-[#128c7e] text-white font-bold text-xs flex items-center justify-center shrink-0">
                          AK
                        </div>
                        <div className="text-left">
                          <h4 className="text-xs font-bold text-white">Anand Kumar</h4>
                          <span className="text-[9px] font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full inline-block mt-1">
                            qualified by AI
                          </span>
                        </div>
                      </div>
                      <span className="text-[9px] font-bold text-white/30 mr-1">Just now</span>
                    </div>

                    {/* Activity 2: Priya Sharma (Purchased) */}
                    <div className="bg-[#181a20]/90 border border-white/5 rounded-2xl p-4 flex items-center justify-between relative overflow-hidden transition-all hover:bg-[#181a20]">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                      <div className="flex items-center gap-3 pl-2">
                        <div className="w-9 h-9 rounded-full bg-primary/20 text-primary font-bold text-xs flex items-center justify-center shrink-0 border border-primary/20">
                          PS
                        </div>
                        <div className="text-left">
                          <h4 className="text-xs font-bold text-white">Priya Sharma</h4>
                          <span className="text-[9px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full inline-block mt-1">
                            bought subscription
                          </span>
                        </div>
                      </div>
                      <span className="text-[9px] font-bold text-white/30 mr-1">9m ago</span>
                    </div>

                  </div>

                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* 2. CAPTURE & CONVERT SECTION (Dual Column with WA Shop Mockup) */}
        <section className="relative py-24 border-t border-b border-white/5 bg-[#07090e]/60">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
              
              {/* Left Column: Smart WhatsApp shopping phone mockup */}
              <div className="lg:col-span-5 w-full flex justify-center order-2 lg:order-1 relative">
                
                {/* Purple backing glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] bg-primary/5 rounded-full blur-[100px] -z-10"></div>
                
                {/* Phone Frame */}
                <div className="w-[310px] h-[620px] bg-black border-[8px] border-[#25232a] rounded-[3.2rem] shadow-[0_25px_50px_rgba(0,0,0,0.8)] overflow-hidden relative flex flex-col">
                  
                  {/* Speaker and Camera notch */}
                  <div className="absolute top-0 inset-x-0 h-6 bg-black flex justify-center items-center z-50">
                    <div className="w-20 h-4 bg-black rounded-b-xl flex justify-center items-end pb-0.5">
                      <span className="w-1.5 h-1.5 bg-[#100f13] rounded-full"></span>
                    </div>
                  </div>

                  {/* WA Header */}
                  <div className="bg-[#075e54] text-white pt-8 pb-3 px-4 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-black flex items-center gap-0.5">
                          State of Spark
                          <CheckCircle2 className="w-3 h-3 text-[#25d366] fill-[#25d366] stroke-[#075e54] shrink-0" />
                        </div>
                        <div className="text-[8px] text-white/80 font-bold">AI Shop Agent</div>
                      </div>
                    </div>
                    <span className="text-[8px] font-black uppercase text-[#25d366] bg-[#25d366]/10 px-2 py-0.5 rounded border border-[#25d366]/20">
                      Shop
                    </span>
                  </div>

                  {/* Chat Area */}
                  <div className="flex-1 bg-[#efeae2] p-4 flex flex-col gap-3 overflow-y-auto relative min-h-0 select-none">
                    
                    {/* Message 1: Welcome message */}
                    <div className="bg-[#d9fdd3] text-black rounded-xl rounded-tl-none p-3 max-w-[85%] self-end text-left shadow-sm border border-emerald-100">
                      <p className="text-[10px] leading-relaxed font-semibold">
                        "Welcome to Luxury Decor! 🛋️ Are you looking for our summer catalog or Custom Consultation?"
                      </p>
                      <span className="text-[6px] text-black/40 block text-right mt-1 font-bold">11:15 AM</span>
                    </div>

                    {/* Message 2: Click response trigger (step >= 1) */}
                    {chatStep >= 1 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white text-black rounded-xl rounded-tr-none p-2.5 max-w-[80%] self-start text-left shadow-sm border border-black/5"
                      >
                        <p className="text-[9px] leading-relaxed font-bold text-primary">
                          "Click here to see the Catalog styles."
                        </p>
                        <span className="text-[6px] text-black/40 block text-right mt-0.5 font-bold">11:15 AM</span>
                      </motion.div>
                    )}

                    {/* Message 3: Product Card rendering (step >= 2) */}
                    {chatStep >= 2 && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-xl overflow-hidden max-w-[88%] self-end text-left shadow-md border border-black/5 flex flex-col"
                      >
                        {/* High Fidelity Sofa Visual using gradient styling */}
                        <div className="h-28 bg-gradient-to-br from-[#2c244c] to-[#120d20] relative flex items-center justify-center p-3">
                          {/* sofa shape representation in premium layout */}
                          <div className="w-20 h-10 bg-amber-600/30 rounded-t-lg relative border border-amber-600/20 shadow-inner flex items-center justify-center">
                            <span className="text-[10px] font-black text-amber-300">🛋️ Sofa V1</span>
                          </div>
                          <span className="absolute top-2 right-2 bg-black/40 backdrop-blur-md text-[8px] font-black text-[#c59dff] px-2 py-0.5 rounded-full">
                            Featured
                          </span>
                        </div>
                        <div className="p-3">
                          <h4 className="text-[10px] font-black text-slate-800">Premium Interior Luxury</h4>
                          <p className="text-[8px] text-slate-500 font-semibold mt-1">Italian style luxury linen, robust frame, high density comfort cushioning.</p>
                          <div className="mt-2.5 flex items-center justify-between border-t border-slate-100 pt-2">
                            <span className="text-[10px] font-black text-slate-800">₹42,000</span>
                            <button className="text-[8px] font-black bg-primary text-primary-foreground py-1 px-2.5 rounded hover:bg-primary/95 transition-all">
                              Buy luxury Sofa v1
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Message 4: Confirmation (step >= 3) */}
                    {chatStep >= 3 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#d9fdd3] text-black rounded-xl rounded-tl-none p-3 max-w-[85%] self-end text-left shadow-sm border border-emerald-100 mt-1"
                      >
                        <div className="flex items-center gap-1.5 mb-1 pb-1 border-b border-emerald-100">
                          <CheckCircle className="w-3 h-3 text-[#25d366]" />
                          <span className="text-[8px] font-black text-emerald-800 uppercase tracking-wider">Cart Added</span>
                        </div>
                        <p className="text-[10px] leading-relaxed font-bold text-slate-800">
                          "Excellent choice! I&apos;ve added the Luxury Sofa v1 to your cart. Click below to complete checkout securely."
                        </p>
                      </motion.div>
                    )}

                  </div>

                  {/* Input Block */}
                  <div className="bg-[#f0f2f5] p-3 flex items-center gap-2 shrink-0 select-none">
                    <div className="flex-1 bg-white rounded-full py-1.5 px-3 border border-black/5 text-[9px] text-slate-400 font-bold">
                      Type a message...
                    </div>
                    <div className="w-7 h-7 rounded-full bg-[#128c7e] flex items-center justify-center shrink-0">
                      <SendIcon className="w-3 h-3 text-white" />
                    </div>
                  </div>

                </div>
              </div>

              {/* Right Column: "Capture & Convert in One Tap" Text Details */}
              <div className="lg:col-span-7 text-left order-1 lg:order-2">
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
                  Capture & Convert <br />
                  <span className="bg-gradient-to-r from-primary via-purple-400 to-[#c59dff] bg-clip-text text-transparent italic pr-2">
                    in One Tap
                  </span>
                </h2>
                
                <p className="text-base md:text-lg text-[#cbc4d2]/70 leading-relaxed font-semibold mb-10 max-w-xl">
                  Stop losing leads to slow responses. Our AI agents engage instantly, qualify potential buyers based on their intent, and serve product catalogs or payment links directly inside the chat interface.
                </p>

                {/* Point Cards */}
                <div className="flex flex-col gap-6">
                  
                  {/* Point 1: Sub-2s Response */}
                  <div className="bg-[#111318] border border-white/5 rounded-2xl p-5 flex items-start gap-4 transition-all hover:border-primary/20">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 text-primary">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-white mb-1">Sub-2s Response Time</h4>
                      <p className="text-xs text-[#cbc4d2]/50 font-medium">Instant engagement when the purchase intent is highest, reducing bounce rates to nearly zero.</p>
                    </div>
                  </div>

                  {/* Point 2: In-Chat Checkout */}
                  <div className="bg-[#111318] border border-white/5 rounded-2xl p-5 flex items-start gap-4 transition-all hover:border-primary/20">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0 text-purple-400">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-white mb-1">In-Chat Checkout</h4>
                      <p className="text-xs text-[#cbc4d2]/50 font-medium">Collect payments via UPI, Credit Cards, or Netbanking natively without users having to exit the chat.</p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3. SEQUENCE SECTION: "Human-Like Follow-ups, Machine Precision" */}
        <section className="relative py-24 bg-[#07090e]/40">
          <div className="container mx-auto px-4 max-w-7xl text-center">
            
            {/* Header Text */}
            <div className="max-w-3xl mx-auto mb-20">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
                Human-Like Follow-ups, <br />
                <span className="bg-gradient-to-r from-primary to-[#c59dff] bg-clip-text text-transparent italic">
                  Machine Precision
                </span>
              </h2>
              <p className="text-[#cbc4d2]/50 text-base md:text-lg max-w-2xl mx-auto font-semibold leading-relaxed">
                Don&apos;t let leads go cold. SaarthiDesk automatically re-engages prospects across days, weeks, or months with contextually aware messaging.
              </p>
            </div>

            {/* Grid layout containing sequence timeline cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              
              {/* Drip Card 1: Day 1 */}
              <div className="bg-[#111318] border border-white/5 rounded-3xl p-6 text-left flex flex-col justify-between group transition-all hover:border-primary/10 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/[0.01] rounded-bl-full pointer-events-none"></div>
                <div>
                  {/* Badge & Icon */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-[10px] font-black text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
                      Day 1
                    </span>
                    <Calendar className="w-5 h-5 text-primary/60" />
                  </div>
                  {/* Message Bubble Container */}
                  <div className="bg-[#181a20] border border-white/5 rounded-2xl p-4 mb-6 shadow-sm">
                    <p className="text-xs text-white/80 leading-relaxed font-semibold">
                      "Hi Rahul, just checking if you had any questions about the solar inverter quote I sent?"
                    </p>
                  </div>
                </div>
                {/* Status Indicator */}
                <div className="flex items-center gap-2 text-[10px] font-bold text-green-400/80 bg-green-400/5 px-3 py-1.5 rounded-xl border border-green-500/10">
                  <span className="flex gap-0.5 text-green-400">✓✓</span>
                  <span>Delivered & Read</span>
                </div>
              </div>

              {/* Drip Card 2: Day 3 */}
              <div className="bg-[#111318] border border-white/5 rounded-3xl p-6 text-left flex flex-col justify-between group transition-all hover:border-primary/10 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/[0.01] rounded-bl-full pointer-events-none"></div>
                <div>
                  {/* Badge & Icon */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-[10px] font-black text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full uppercase tracking-wider">
                      Day 3
                    </span>
                    <Sparkles className="w-5 h-5 text-purple-400/60" />
                  </div>
                  {/* Message Bubble */}
                  <div className="bg-[#181a20] border border-white/5 rounded-2xl p-4 mb-6 shadow-sm">
                    <p className="text-xs text-white/80 leading-relaxed font-semibold">
                      "Hey Rahul, we just introduced a free installation offer for today. Interested?"
                    </p>
                  </div>
                </div>
                {/* Status Indicator */}
                <div className="flex items-center gap-2 text-[10px] font-bold text-purple-400 bg-purple-500/5 px-3 py-1.5 rounded-xl border border-purple-500/10">
                  <Sparkle className="w-3.5 h-3.5 animate-pulse" />
                  <span>Active re-engagement</span>
                </div>
              </div>

              {/* Drip Card 3: Day 7 */}
              <div className="bg-[#111318] border border-white/5 rounded-3xl p-6 text-left flex flex-col justify-between group transition-all hover:border-primary/10 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/[0.01] rounded-bl-full pointer-events-none"></div>
                <div>
                  {/* Badge & Icon */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-[10px] font-black text-indigo-400 bg-indigo-400/10 px-3 py-1 rounded-full uppercase tracking-wider">
                      Day 7
                    </span>
                    <Layers className="w-5 h-5 text-indigo-400/60" />
                  </div>
                  {/* Message Bubble */}
                  <div className="bg-[#181a20] border border-white/5 rounded-2xl p-4 mb-6 shadow-sm">
                    <p className="text-xs text-white/80 leading-relaxed font-semibold">
                      "Last call for the 10% discount code, Rahul! It expires at midnight."
                    </p>
                  </div>
                </div>
                {/* Status Indicator */}
                <div className="flex items-center gap-2 text-[10px] font-bold text-indigo-400 bg-indigo-400/5 px-3 py-1.5 rounded-xl border border-indigo-500/10">
                  <CheckCircle className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Discount activated</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 4. STOREFRONT SECTION: "Sell Directly Where Your Customers Are" */}
        <section className="relative py-24 border-t border-white/5 bg-[#07090e]/30">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              
              {/* Left Column: Title, Description, Capability indicators */}
              <div className="lg:col-span-5 text-left">
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
                  Sell Directly Where <br />
                  Your Customers Are
                </h2>
                
                <p className="text-base md:text-lg text-[#cbc4d2]/70 leading-relaxed font-semibold mb-10 max-w-md">
                  Turn your WhatsApp Business profile into a high-converting storefront. Seamlessly integrate your Shopify or Custom Catalog to browse, add to cart, and buy—all within the chat.
                </p>

                {/* Capability lists */}
                <div className="flex flex-col gap-5">
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-white">Dynamic Catalog</h4>
                      <p className="text-xs text-[#cbc4d2]/40 font-semibold mt-0.5">Live inventory sync checks stock counts instantly inside WhatsApp chat interface.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-white">One-Link Checkout</h4>
                      <p className="text-xs text-[#cbc4d2]/40 font-semibold mt-0.5">Simplified direct payments natively configured within the catalog message.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Two Product Catalog Cards side-by-side */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
                
                {/* Product Card 1: Aero-Pulse Running Shoes */}
                <div className="bg-[#111318] border border-white/5 rounded-3xl overflow-hidden shadow-xl flex flex-col group transition-all hover:border-primary/20">
                  {/* Visual mockup of the product */}
                  <div className="h-44 bg-gradient-to-br from-red-950 via-[#181216] to-[#0c0d12] relative flex items-center justify-center p-6">
                    <div className="w-24 h-12 bg-red-500/20 rounded-full blur-[20px] absolute"></div>
                    {/* Stylized shoes */}
                    <div className="text-red-400 transform group-hover:scale-105 transition-transform duration-300 flex flex-col items-center gap-1.5 relative">
                      <span className="text-4xl">👟</span>
                      <span className="text-[9px] font-black text-red-400 bg-red-400/10 px-2 py-0.5 rounded uppercase tracking-wider">Aero Sport</span>
                    </div>
                  </div>
                  {/* Details */}
                  <div className="p-5 text-left flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-black text-white mb-1">Aero-Pulse Running</h3>
                      <span className="text-base font-black text-white">₹2,599</span>
                    </div>
                    <button className="w-full bg-primary text-primary-foreground font-black text-xs py-3 rounded-xl transition-all hover:bg-primary/95 mt-6 tracking-wider shadow-md hover:scale-[1.02]">
                      BUY NOW
                    </button>
                  </div>
                </div>

                {/* Product Card 2: Chronos Classic Watch */}
                <div className="bg-[#111318] border border-white/5 rounded-3xl overflow-hidden shadow-xl flex flex-col group transition-all hover:border-primary/20">
                  {/* Visual mockup of watch */}
                  <div className="h-44 bg-gradient-to-br from-slate-800 via-[#12161a] to-[#0a0c10] relative flex items-center justify-center p-6">
                    <div className="w-24 h-12 bg-slate-400/10 rounded-full blur-[20px] absolute"></div>
                    {/* Stylized Watch */}
                    <div className="text-white transform group-hover:scale-105 transition-transform duration-300 flex flex-col items-center gap-1.5 relative">
                      <span className="text-4xl">⌚</span>
                      <span className="text-[9px] font-black text-slate-300 bg-slate-300/10 px-2 py-0.5 rounded uppercase tracking-wider">Titanium</span>
                    </div>
                  </div>
                  {/* Details */}
                  <div className="p-5 text-left flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-black text-white mb-1">Chronos Classic</h3>
                      <span className="text-base font-black text-white">₹3,499</span>
                    </div>
                    <button className="w-full bg-primary text-primary-foreground font-black text-xs py-3 rounded-xl transition-all hover:bg-primary/95 mt-6 tracking-wider shadow-md hover:scale-[1.02]">
                      BUY NOW
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* 5. METRIC SECTION: "Analytics That Drive Action" */}
        <section className="relative py-24 border-t border-white/5 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left part: text details */}
            <div className="lg:col-span-5 text-left">
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
                Analytics That <br />
                <span className="bg-gradient-to-r from-primary via-purple-400 to-[#c59dff] bg-clip-text text-transparent italic pr-2">
                  Drive Action
                </span>
              </h2>
              <p className="text-base md:text-lg text-[#cbc4d2]/70 leading-relaxed font-semibold max-w-md">
                Real-time data at your fingertips. Monitor every message, track conversion lifts, and refine your sales strategy with deep behavioral insights.
              </p>
            </div>

            {/* Right part: Big Metrics Rows */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
              
              {/* Metric 1 */}
              <div className="bg-[#111318] border border-white/5 rounded-3xl p-6 text-center shadow-lg relative overflow-hidden transition-all hover:border-primary/20">
                <div className="absolute inset-x-0 bottom-0 h-1 bg-primary"></div>
                <div className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2">98%</div>
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Open Rate</span>
              </div>

              {/* Metric 2 */}
              <div className="bg-[#111318] border border-white/5 rounded-3xl p-6 text-center shadow-lg relative overflow-hidden transition-all hover:border-primary/20">
                <div className="absolute inset-x-0 bottom-0 h-1 bg-purple-500"></div>
                <div className="text-4xl md:text-5xl font-black text-purple-400 tracking-tighter mb-2">&lt;2m</div>
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Resp. Time</span>
              </div>

              {/* Metric 3 */}
              <div className="bg-[#111318] border border-white/5 rounded-3xl p-6 text-center shadow-lg relative overflow-hidden transition-all hover:border-primary/20">
                <div className="absolute inset-x-0 bottom-0 h-1 bg-indigo-500"></div>
                <div className="text-4xl md:text-5xl font-black text-emerald-400 tracking-tighter mb-2">+35%</div>
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Conv. Rate</span>
              </div>

            </div>

          </div>
        </section>

        {/* 6. CALL TO ACTION SECTION */}
        <section className="py-24 px-4 bg-[#07090e]/30 border-t border-white/5">
          <div className="container mx-auto max-w-6xl">
            
            {/* Deep Violet Gradient Card Wrapper */}
            <div className="bg-gradient-to-br from-[#27104e]/40 via-[#150e26]/30 to-[#07090e] border border-primary/10 rounded-[3.5rem] p-16 md:p-24 text-center relative overflow-hidden shadow-[0_20px_50px_rgba(209,188,255,0.04)]">
              
              {/* Glowing decorative blobs inside */}
              <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none -z-10 animate-pulse"></div>
              <div className="absolute -bottom-32 -left-32 w-[450px] h-[450px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

              <h2 className="text-3xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
                Ready to supercharge your sales?
              </h2>
              
              <p className="text-[#cbc4d2]/60 text-base md:text-lg mb-12 max-w-xl mx-auto font-semibold leading-relaxed">
                Join over 5,000+ businesses growing their revenue with SaarthiDesk&apos;s AI-powered WhatsApp engine.
              </p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-5 mb-6">
                <Link 
                  href="/register" 
                  className="w-full sm:w-auto px-10 py-4.5 bg-primary text-[#170e28] rounded-2xl font-black text-base transition-all hover:bg-primary/95 text-center shadow-[0_15px_35px_rgba(209,188,255,0.22)] hover:scale-[1.02]"
                >
                  Start Free Trial
                </Link>
                <Link 
                  href="/demo" 
                  className="w-full sm:w-auto px-10 py-4.5 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-base transition-all hover:bg-white/10 text-center hover:scale-[1.02]"
                >
                  Talk to an Expert
                </Link>
              </div>

              {/* Details text */}
              <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest">
                No credit card required • 14-day free trial
              </span>

            </div>

          </div>
        </section>

      </main>

      {/* Page Footer & Chat Widget */}
      <Footer />
      <ChatWidget />
    </div>
  );
}

// Inline SendIcon SVG helper
function SendIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  );
}

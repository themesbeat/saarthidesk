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
  Award,
  Gift,
  Heart,
  BarChart3,
  Percent,
  Check,
  Calendar,
  Layers,
  AlertTriangle,
  RotateCcw
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

export default function CustomerEngagementSolutionPage() {
  const [isDemoPlaying, setIsDemoPlaying] = useState<boolean>(false);
  const [personalizationStep, setPersonalizationStep] = useState<number>(0);
  const [activeWorkflowProgress, setActiveWorkflowProgress] = useState<number>(68);

  // Auto-progress personalization simulation steps
  useEffect(() => {
    const timer = setInterval(() => {
      setPersonalizationStep((prev) => (prev < 3 ? prev + 1 : 0));
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Soft progress pulse for the loyalty workflow
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveWorkflowProgress((prev) => {
        if (prev >= 100) return 30;
        return prev + 1;
      });
    }, 200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#06080c] text-foreground font-sans selection:bg-primary/30 overflow-x-hidden">
      {/* Global Navigation Header */}
      <Header />

      <main className="relative">
        {/* Decorative Background Blur Blobs */}
        <div className="absolute top-[8%] left-[-15%] w-[550px] h-[550px] bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse"></div>
        <div className="absolute top-[40%] right-[-10%] w-[650px] h-[650px] bg-purple-500/5 rounded-full blur-[160px] pointer-events-none -z-10"></div>
        <div className="absolute top-[75%] left-[10%] w-[550px] h-[550px] bg-indigo-500/5 rounded-full blur-[130px] pointer-events-none -z-10"></div>

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
                  AI-powered Engagement
                </motion.div>
                
                {/* H1 Main Title */}
                <motion.h1 
                  variants={itemVariants}
                  className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.08] text-white"
                >
                  Keep Customers <br />
                  <span className="bg-gradient-to-r from-primary via-purple-400 to-[#c59dff] bg-clip-text text-transparent italic pr-2">
                    Engaged
                  </span>
                  With AI
                </motion.h1>
                
                {/* Subtext explanation */}
                <motion.p 
                  variants={itemVariants}
                  className="text-base md:text-lg text-[#cbc4d2]/70 mb-10 max-w-xl leading-relaxed font-medium"
                >
                  Automate your retention strategy with AI agents that build loyalty, re-engage cold leads, and personalize every customer interaction at scale.
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
                    Start Free Trial <ArrowRight className="w-4 h-4" />
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

              {/* Right Column: Hero Retention Overview Panel */}
              <motion.div 
                className="lg:col-span-6 w-full max-w-2xl relative"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
              >
                {/* Back glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] bg-primary/10 rounded-full blur-[110px] -z-10"></div>
                
                {/* Retention Dashboard Container */}
                <div className="bg-[#101217] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl p-6 relative">
                  
                  {/* Top Header dots */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-5">
                    <span className="text-sm font-black text-white">Retention Overview</span>
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></span>
                    </div>
                  </div>

                  {/* LTV & Churn Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-[#16181f] border border-white/5 rounded-2xl p-4 text-left">
                      <div className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Total LTV</div>
                      <div className="text-2xl font-black text-white flex items-baseline gap-2">
                        ₹4.2M
                        <span className="text-[9px] font-bold text-green-400">▲ 12.4%</span>
                      </div>
                    </div>
                    <div className="bg-[#16181f] border border-white/5 rounded-2xl p-4 text-left">
                      <div className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Churn Rate</div>
                      <div className="text-2xl font-black text-white flex items-baseline gap-2">
                        1.8%
                        <span className="text-[9px] font-bold text-green-400">▼ 4.5%</span>
                      </div>
                    </div>
                  </div>

                  {/* Active Loyalty Workflow section */}
                  <div className="bg-[#16181f] border border-white/5 rounded-2xl p-4 text-left relative">
                    <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-3">Active Loyalty Workflow</h4>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                        <Award className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-bold text-white">Re-engaging &quot;Dormant&quot; Segment</span>
                          <span className="text-[10px] font-black text-primary">LTV: +₹2.4L</span>
                        </div>
                        {/* Interactive dynamic progress bar */}
                        <div className="h-1.5 bg-[#101217] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary transition-all duration-200" 
                            style={{ width: `${activeWorkflowProgress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Overlapping Winback Bubble */}
                    <div className="absolute -bottom-8 -right-4 bg-gradient-to-r from-primary to-[#c59dff] text-[#130b24] p-3 rounded-2xl rounded-tr-none shadow-xl border border-primary/20 flex items-center gap-2 max-w-[240px] z-10 animate-bounce">
                      <MessageSquare className="w-4 h-4 shrink-0 fill-current" />
                      <div className="text-left">
                        <span className="text-[9px] font-black uppercase tracking-wider block opacity-70">New Winback Message</span>
                        <p className="text-[10px] font-bold mt-0.5 leading-tight">
                          &quot;Anand, long time no see! We missed you...&quot;
                        </p>
                      </div>
                    </div>

                  </div>

                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* 2. PROACTIVE AI ENGAGEMENT GRID (Three Columns) */}
        <section className="relative py-24 border-t border-b border-white/5 bg-[#06080c]/60">
          <div className="container mx-auto px-4 max-w-7xl text-center">
            
            {/* Header Text */}
            <div className="max-w-3xl mx-auto mb-20">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
                Proactive AI Engagement
              </h2>
              <p className="text-[#cbc4d2]/50 text-base md:text-lg max-w-2xl mx-auto font-semibold leading-relaxed">
                SaarthiDesk doesn&apos;t wait for customers to leave. It listens to behavior and acts instantly.
              </p>
            </div>

            {/* Three cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Card 1: Behavioral Triggers */}
              <div className="bg-[#111318] border border-white/5 rounded-3xl p-8 text-left transition-all hover:border-primary/20 hover:bg-[#15171d] shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/[0.01] rounded-bl-full pointer-events-none"></div>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-8 transition-transform group-hover:scale-105">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-white mb-4">Behavioral Triggers</h3>
                <p className="text-xs md:text-sm text-[#cbc4d2]/50 leading-relaxed font-semibold">
                  Detect patterns when customers slow down activity and trigger gentle check-ins.
                </p>
              </div>

              {/* Card 2: Omnichannel Reach */}
              <div className="bg-[#111318] border border-white/5 rounded-3xl p-8 text-left transition-all hover:border-primary/20 hover:bg-[#15171d] shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/[0.01] rounded-bl-full pointer-events-none"></div>
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-8 transition-transform group-hover:scale-105">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-white mb-4">Omnichannel Reach</h3>
                <p className="text-xs md:text-sm text-[#cbc4d2]/50 leading-relaxed font-semibold">
                  Communicate via WhatsApp, Email, or SMS based on where your user is most active.
                </p>
              </div>

              {/* Card 3: Instant Response */}
              <div className="bg-[#111318] border border-white/5 rounded-3xl p-8 text-left transition-all hover:border-primary/20 hover:bg-[#15171d] shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/[0.01] rounded-bl-full pointer-events-none"></div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-8 transition-transform group-hover:scale-105">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-white mb-4">Instant Response</h3>
                <p className="text-xs md:text-sm text-[#cbc4d2]/50 leading-relaxed font-semibold">
                  AI answers questions in milliseconds, keeping the momentum high during critical moments.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* 3. STOP CHURN SECTION (Radar and checklist) */}
        <section className="relative py-24 bg-[#06080c]/40">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
              
              {/* Left Column: Sonar/Radar Animation Mockup */}
              <div className="lg:col-span-6 w-full flex justify-center order-2 lg:order-1 relative">
                
                {/* Background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
                
                {/* Radar Layout Wrapper */}
                <div className="w-[340px] h-[340px] md:w-[400px] md:h-[400px] rounded-[3rem] bg-[#111318] border border-white/5 p-8 relative flex items-center justify-center overflow-hidden shadow-2xl">
                  
                  {/* Glowing radar rings */}
                  <div className="w-[85%] h-[85%] rounded-full border border-dashed border-white/10 flex items-center justify-center animate-spin-slow">
                    <div className="w-[70%] h-[70%] rounded-full border border-dashed border-primary/25 flex items-center justify-center">
                      <div className="w-[50%] h-[50%] rounded-full border border-white/10 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40 relative">
                          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping absolute"></span>
                          <Bot className="w-4 h-4 text-primary" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sonar sweep overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/[0.04] to-transparent rounded-full transform rotate-45 pointer-events-none animate-pulse"></div>

                  {/* Top-Left Risk Indicator */}
                  <div className="absolute top-6 left-6 bg-[#ffb4ab]/15 border border-[#ff5f56]/30 backdrop-blur-md px-3.5 py-2.5 rounded-2xl flex items-start gap-2.5 max-w-[240px] shadow-lg">
                    <AlertTriangle className="w-4.5 h-4.5 text-[#ff5f56] shrink-0 mt-0.5" />
                    <div className="text-left">
                      <span className="text-[8px] font-black text-[#ff5f56] uppercase tracking-wider block">Warning: High Churn Risk</span>
                      <p className="text-[10px] font-extrabold text-white mt-0.5 leading-tight">
                        Client #902 has not logged in for 10 days
                      </p>
                    </div>
                  </div>

                  {/* Bottom-Right AI Action Tag */}
                  <div className="absolute bottom-6 right-6 bg-[#d9fdd3]/10 border border-green-500/20 backdrop-blur-md px-3.5 py-2.5 rounded-2xl flex items-start gap-2.5 max-w-[220px] shadow-lg">
                    <CheckCircle className="w-4.5 h-4.5 text-green-400 shrink-0 mt-0.5" />
                    <div className="text-left">
                      <span className="text-[8px] font-black text-green-400 uppercase tracking-wider block">AI Action Triggered</span>
                      <p className="text-[10px] font-extrabold text-white mt-0.5 leading-tight">
                        Personal Winback Sequence sent
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Right Column: Copy & Checklist */}
              <div className="lg:col-span-6 text-left order-1 lg:order-2">
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
                  Stop Churn <br />
                  <span className="bg-gradient-to-r from-primary via-purple-400 to-[#c59dff] bg-clip-text text-transparent italic pr-2">
                    Before It Starts
                  </span>
                </h2>
                
                <p className="text-base md:text-lg text-[#cbc4d2]/70 leading-relaxed font-semibold mb-10 max-w-xl">
                  Our AI monitors every customer&apos;s health score in real-time. When a &quot;cold&quot; signal is detected, the Retention Flywheel activates automatically.
                </p>

                {/* Advanced Checklist */}
                <div className="flex flex-col gap-6">
                  
                  {/* Point 1 */}
                  <div className="flex gap-4 items-start group">
                    <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 shadow-md transition-colors group-hover:bg-primary/20">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-white mb-0.5">Predictive Risk Scoring</h4>
                      <p className="text-xs text-[#cbc4d2]/50 font-semibold">Analyzes transaction drops, usage slowing, or inactive milestones in real-time.</p>
                    </div>
                  </div>

                  {/* Point 2 */}
                  <div className="flex gap-4 items-start group">
                    <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 shadow-md transition-colors group-hover:bg-primary/20">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-white mb-0.5">Automated Win-back Sequences</h4>
                      <p className="text-xs text-[#cbc4d2]/50 font-semibold">Initiates highly custom re-engagement drips automatically across chosen triggers.</p>
                    </div>
                  </div>

                  {/* Point 3 */}
                  <div className="flex gap-4 items-start group">
                    <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 shadow-md transition-colors group-hover:bg-primary/20">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-white mb-0.5">Dynamic Re-engagement Offers</h4>
                      <p className="text-xs text-[#cbc4d2]/50 font-semibold">Generates precise, target discount offerings computed to win back the segment.</p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 4. THE PERSONALIZATION ENGINE (Split Bento) */}
        <section className="relative py-24 border-t border-white/5 bg-[#06080c]/30">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="bg-[#111318] border border-white/5 rounded-[3.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left side copy */}
                <div className="lg:col-span-5 text-left">
                  <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
                    The Personalization <br />
                    <span className="bg-gradient-to-r from-primary via-purple-400 to-[#c59dff] bg-clip-text text-transparent italic pr-2">
                      Engine
                    </span>
                  </h2>
                  
                  <p className="text-base text-[#cbc4d2]/70 leading-relaxed font-semibold mb-10 max-w-md">
                    AI doesn&apos;t just send templates, it crafts unique messages using active customer context—past purchases, preferred timing, and brand affinity.
                  </p>

                  <div className="flex flex-col gap-4">
                    <div className="flex gap-3 items-center text-xs font-bold text-white/80">
                      <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center text-primary text-[10px] shrink-0 border border-primary/20">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <span>Syncs with CRM & LMS Data</span>
                    </div>
                    <div className="flex gap-3 items-center text-xs font-bold text-white/80">
                      <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center text-primary text-[10px] shrink-0 border border-primary/20">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <span>Sentiment Analysis per Interaction</span>
                    </div>
                  </div>
                </div>

                {/* Right side AI generation panel mockup */}
                <div className="lg:col-span-7 w-full max-w-2xl">
                  <div className="bg-[#16181f] border border-white/5 rounded-3xl overflow-hidden shadow-xl p-5 relative">
                    
                    {/* Panel Header */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-3.5 mb-4 select-none">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">
                          AI Generating Message...
                        </span>
                      </div>
                      <div className="text-[9px] font-bold text-white/30 bg-white/5 px-2 py-0.5 rounded">
                        Model: Saarthi_LTV_v4
                      </div>
                    </div>

                    {/* Simulation Steps Details (displays contextually active state) */}
                    <div className="flex flex-col gap-3.5 text-left">
                      
                      {/* Step trackers */}
                      <div className="flex flex-wrap gap-2 text-[9px] font-extrabold select-none">
                        <span className={`px-2.5 py-1 rounded-full border transition-all duration-300 ${
                          personalizationStep >= 0 ? "bg-primary/15 border-primary/30 text-primary" : "bg-transparent border-white/5 text-white/20"
                        }`}>
                          1. CRM Scan Active
                        </span>
                        <span className={`px-2.5 py-1 rounded-full border transition-all duration-300 ${
                          personalizationStep >= 1 ? "bg-primary/15 border-primary/30 text-primary" : "bg-transparent border-white/5 text-white/20"
                        }`}>
                          2. Affinity Match: Ethiopian Coffee
                        </span>
                        <span className={`px-2.5 py-1 rounded-full border transition-all duration-300 ${
                          personalizationStep >= 2 ? "bg-primary/15 border-primary/30 text-primary" : "bg-transparent border-white/5 text-white/20"
                        }`}>
                          3. Computed Discount (15%)
                        </span>
                      </div>

                      {/* Generative Text Output Block */}
                      <div className="bg-[#111318] border border-white/5 rounded-2xl p-4.5 min-h-[110px] flex flex-col justify-between shadow-inner relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.01] to-transparent pointer-events-none"></div>
                        <p className="text-xs text-white/90 leading-relaxed font-semibold italic">
                          {personalizationStep >= 3 ? (
                            `"Hi Rahul! We noticed you enjoyed the Ethiopian roast last month. We just got a fresh batch today—want 15% off to try the new Monsoon blend? ☕"`
                          ) : (
                            <span className="flex items-center gap-1.5 text-white/35 font-bold not-italic">
                              <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce"></span>
                              <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce delay-100"></span>
                              <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce delay-200"></span>
                              Formulating personalized discount campaign...
                            </span>
                          )}
                        </p>
                        <div className="mt-4 pt-3.5 border-t border-white/5 flex items-center justify-between text-[9px] font-black text-white/30 select-none uppercase tracking-widest">
                          <span>Confidence Score: 98%</span>
                          <span>Context: Previous Purchase</span>
                        </div>
                      </div>

                    </div>

                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* 5. AUTOMATED LOYALTY PROGRAMS SECTION */}
        <section className="relative py-24 border-t border-white/5 max-w-7xl mx-auto px-4">
          <div className="container mx-auto max-w-6xl text-center">
            
            {/* Header Text */}
            <div className="max-w-3xl mx-auto mb-20">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
                Automated Loyalty Programs
              </h2>
              <p className="text-[#cbc4d2]/50 text-base md:text-lg max-w-2xl mx-auto font-semibold leading-relaxed">
                Turn casual shoppers into brand advocates by rewarding them exactly when it matters.
              </p>
            </div>

            {/* Loyalty cards split side-by-side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              
              {/* Loyalty Card 1: VIP Automated Access */}
              <div className="bg-[#111318] border border-white/5 rounded-3xl overflow-hidden shadow-2xl p-6 md:p-8 flex flex-col justify-between group transition-all hover:border-primary/20 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.01] to-transparent pointer-events-none"></div>
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-3">VIP Automated Access</h3>
                  <p className="text-xs md:text-sm text-[#cbc4d2]/50 leading-relaxed font-semibold mb-8">
                    AI identifies top 5% spenders and sends early-access links to new collections via WhatsApp instantly.
                  </p>
                </div>

                {/* Smartphone chassis gold VIP card render */}
                <div className="h-52 bg-gradient-to-br from-amber-950/20 via-[#14120f] to-[#070605] border border-amber-900/10 rounded-2xl flex items-center justify-center p-6 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/[0.02] to-transparent pointer-events-none"></div>
                  
                  {/* Golden Card layout design */}
                  <div className="w-[220px] h-[130px] bg-gradient-to-br from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] rounded-2xl shadow-2xl p-3 flex flex-col justify-between relative overflow-hidden transform group-hover:rotate-2 group-hover:scale-105 transition-all duration-300">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
                    
                    {/* Card details */}
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <span className="text-[7px] font-black uppercase text-[#1a1202] tracking-wider">Premium Access</span>
                        <span className="text-sm font-black text-[#1a1202] uppercase tracking-widest mt-1">V6 COUPON</span>
                      </div>
                      <span className="text-[10px] font-black text-[#1a1202]">👑</span>
                    </div>

                    <div className="flex justify-between items-end border-t border-[#1a1202]/10 pt-2">
                      <div className="flex flex-col">
                        <span className="text-[6px] font-black text-[#1a1202]/50 uppercase tracking-widest">Early Access ID</span>
                        <span className="text-[8px] font-bold text-[#1a1202] tracking-wider mt-0.5">SAARTHI_VIP_902</span>
                      </div>
                      <span className="text-[7px] font-black bg-[#1a1202] text-amber-300 px-1.5 py-0.5 rounded uppercase tracking-wider">
                        Active
                      </span>
                    </div>

                  </div>
                </div>
              </div>

              {/* Loyalty Card 2: Milestone Rewards */}
              <div className="bg-[#111318] border border-white/5 rounded-3xl overflow-hidden shadow-2xl p-6 md:p-8 flex flex-col justify-between group transition-all hover:border-primary/20 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-500/[0.01] to-transparent pointer-events-none"></div>
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-3">Milestone Rewards</h3>
                  <p className="text-xs md:text-sm text-[#cbc4d2]/50 leading-relaxed font-semibold mb-8">
                    Celebrate customer birthdays or purchase anniversaries with auto-generated coupons that expire to drive urgency.
                  </p>
                </div>

                {/* Exploding Gift Boxes Render in CSS */}
                <div className="h-52 bg-gradient-to-br from-indigo-950/20 via-[#100f16] to-[#07060a] border border-indigo-950/15 rounded-2xl flex items-center justify-center p-6 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/[0.02] to-transparent pointer-events-none"></div>
                  
                  {/* Floating gift cards */}
                  <div className="relative w-full max-w-[240px] h-[130px] flex items-center justify-center">
                    
                    {/* Voucher Card back */}
                    <div className="w-[180px] h-[90px] bg-gradient-to-br from-indigo-900/60 to-[#0e1017] border border-indigo-500/20 rounded-xl p-3 flex flex-col justify-between shadow-2xl absolute -rotate-6 transform -translate-x-3 -translate-y-2 group-hover:-rotate-12 transition-transform duration-300">
                      <span className="text-[6px] font-black text-white/30 uppercase tracking-widest">Happy Birthday</span>
                      <span className="text-xs font-black text-white">🎁 20% OFF GIFT</span>
                      <span className="text-[6px] text-white/40 block border-t border-white/5 pt-1 mt-1">Exp: 3 days</span>
                    </div>

                    {/* Voucher Card front */}
                    <div className="w-[180px] h-[90px] bg-gradient-to-br from-primary to-[#8554ff] rounded-xl p-3 flex flex-col justify-between shadow-2xl absolute rotate-6 transform translate-x-3 translate-y-2 group-hover:rotate-12 transition-transform duration-300">
                      <div className="flex justify-between items-start">
                        <span className="text-[6px] font-black text-[#1c0e35] uppercase tracking-widest">Milestone Reward</span>
                        <Gift className="w-3.5 h-3.5 text-[#1c0e35]" />
                      </div>
                      <span className="text-sm font-black text-[#1c0e35] uppercase tracking-wider">ANNIVERSARY</span>
                      <span className="text-[6px] text-[#1c0e35]/50 block border-t border-[#1c0e35]/10 pt-1 mt-1">
                        SAARTHI_MILESTONE_3
                      </span>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 6. CALL TO ACTION DEEP GRADIENT BANNER */}
        <section className="py-24 px-4 bg-[#06080c]/30 border-t border-white/5">
          <div className="container mx-auto max-w-6xl">
            
            {/* Deep Violet Gradient Card Wrapper */}
            <div className="bg-gradient-to-br from-[#260f4c]/40 via-[#140d25]/30 to-[#06080c] border border-primary/10 rounded-[3.5rem] p-16 md:p-24 text-center relative overflow-hidden shadow-[0_20px_50px_rgba(209,188,255,0.04)]">
              
              {/* Inner glowing radial rings */}
              <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none -z-10 animate-pulse"></div>
              <div className="absolute -bottom-32 -left-32 w-[450px] h-[450px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

              <h2 className="text-3xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
                Ready to build lasting relationships?
              </h2>
              
              <p className="text-[#cbc4d2]/60 text-base md:text-lg mb-12 max-w-xl mx-auto font-semibold leading-relaxed">
                Join 2,500+ businesses using SaarthiDesk to automate their customer success and grow revenue.
              </p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-5 mb-6">
                <Link 
                  href="/register" 
                  className="w-full sm:w-auto px-10 py-4.5 bg-primary text-[#160d28] rounded-2xl font-black text-base transition-all hover:bg-primary/95 text-center shadow-[0_15px_35px_rgba(209,188,255,0.22)] hover:scale-[1.02]"
                >
                  Get Started Now
                </Link>
                <Link 
                  href="/demo" 
                  className="w-full sm:w-auto px-10 py-4.5 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-base transition-all hover:bg-white/10 text-center hover:scale-[1.02]"
                >
                  Talk to Sales
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

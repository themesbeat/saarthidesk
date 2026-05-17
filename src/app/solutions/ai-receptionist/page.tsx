"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { 
  Play, 
  ArrowRight, 
  Bot, 
  Check, 
  Calendar, 
  MessageSquare,
  PhoneCall,
  PhoneMissed,
  Bell,
  Sparkles,
  CheckCircle2,
  Mic,
  CalendarCheck
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

export default function AIReceptionistSolutionPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-foreground font-sans selection:bg-primary/30 overflow-x-hidden">
      {/* Global Navigation Header */}
      <Header />

      <main className="relative">
        {/* Decorative Background Blur Blobs */}
        <div className="absolute top-[8%] left-[-15%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[160px] pointer-events-none -z-10"></div>
        <div className="absolute top-[35%] right-[-10%] w-[550px] h-[550px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none -z-10"></div>
        <div className="absolute top-[65%] left-[-5%] w-[500px] h-[500px] bg-[#c59dff]/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>

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
                {/* Outlined Capsule Badge */}
                <motion.div 
                  variants={itemVariants}
                  className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] md:text-xs font-bold text-[#c59dff] mb-8 tracking-widest uppercase italic shadow-[0_0_15px_rgba(197,157,255,0.08)]"
                >
                  <span className="text-sm">🛎️</span>
                  AI RECEPTIONIST FOR SMBS
                </motion.div>
                
                {/* Title */}
                <motion.h1 
                  variants={itemVariants}
                  className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.08] text-white"
                >
                  Your AI Receptionist <br />
                  <span className="bg-gradient-to-r from-[#c59dff] via-indigo-400 to-[#b58bfd] bg-clip-text text-transparent italic pr-2">
                    Available 24/7
                  </span>
                </motion.h1>
                
                {/* Subheading */}
                <motion.p 
                  variants={itemVariants}
                  className="text-base md:text-lg text-[#cbc4d2]/70 mb-10 max-w-xl leading-relaxed font-medium"
                >
                  Stop losing customers to missed calls. Our AI receptionist handles bookings, answers queries, and manages your front desk while you focus on growing your business.
                </motion.p>
                
                {/* CTA Buttons */}
                <motion.div 
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10"
                >
                  <Link 
                    href="/register" 
                    className="w-full sm:w-auto px-8 py-4 bg-[#c59dff] text-[#0a0a0c] rounded-xl font-bold text-base transition-all hover:bg-[#b58bfd] text-center flex items-center justify-center gap-2 shadow-[0_10px_35px_rgba(197,157,255,0.25)] hover:scale-[1.02]"
                  >
                    Start Free Trial <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </Link>
                  <Link 
                    href="/demo" 
                    className="w-full sm:w-auto px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-xl font-bold text-base transition-all hover:bg-white/10 text-center flex items-center justify-center gap-2 hover:scale-[1.02]"
                  >
                    <Play className="w-4 h-4 fill-white" /> Watch Demo
                  </Link>
                </motion.div>
                
                {/* Value Checkbox Checklist */}
                <motion.div 
                  variants={itemVariants}
                  className="flex items-center gap-6"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="text-xs text-[#cbc4d2]/50 font-bold tracking-wider uppercase">NO CREDIT CARD</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="text-xs text-[#cbc4d2]/50 font-bold tracking-wider uppercase">QUICK SETUP</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Column: Receptionist Bot Interactive Console Mockup */}
              <motion.div 
                className="lg:col-span-6 w-full max-w-2xl relative"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
              >
                {/* Radiant Glow Behind Mockup */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] bg-purple-500/10 rounded-full blur-[100px] -z-10"></div>
                
                {/* Outer Console Card */}
                <div className="bg-[#111318] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl p-6 relative">
                  
                  {/* Console Header Bar */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-[#c59dff]">
                        <Bot className="w-5.5 h-5.5 text-[#c59dff]" />
                      </div>
                      <div className="text-left">
                        <h4 className="text-sm font-bold text-white leading-tight">Receptionist Bot</h4>
                        <div className="text-[10px] text-emerald-400 flex items-center gap-1.5 font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          Online & Active
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50">
                      <Mic className="w-4.5 h-4.5" />
                    </div>
                  </div>

                  {/* Core Console Content: Columns Split */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    
                    {/* Left Column: Smart Calendar */}
                    <div className="bg-[#0c0d10] border border-white/5 rounded-2xl p-4.5 text-left flex flex-col justify-between h-[230px]">
                      <div>
                        <div className="flex items-center justify-between mb-3.5">
                          <span className="text-[10px] font-black text-white/40 tracking-wider uppercase">Smart Calendar</span>
                          <span className="text-[8px] font-semibold text-white/30 lowercase">syncing with google...</span>
                        </div>
                        
                        <div className="flex flex-col gap-2.5">
                          {/* Slot 1 Confirmed */}
                          <div className="bg-[#c59dff]/10 border border-[#c59dff]/30 rounded-xl p-3">
                            <div className="text-xs font-extrabold text-white leading-none">10:00 AM - Laser Skin Care</div>
                            <div className="text-[9px] text-[#c59dff] font-semibold mt-1 flex items-center gap-1">
                              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400 fill-current" /> Confirmed by AI via WhatsApp
                            </div>
                          </div>
                          
                          {/* Slot 2 Auto-filled */}
                          <div className="bg-[#111318]/70 border border-white/5 rounded-xl p-3">
                            <div className="text-xs font-bold text-white/80 leading-none">11:30 AM - Consultation</div>
                            <div className="text-[9px] text-white/40 font-semibold mt-1">Auto-filled Slot</div>
                          </div>
                        </div>
                      </div>

                      <div className="text-[10px] text-purple-400/70 font-bold italic tracking-wide animate-pulse">
                        + AI looking for bookings...
                      </div>
                    </div>

                    {/* Right Column: WhatsApp Preview */}
                    <div className="bg-[#0c0d10] border border-white/5 rounded-2xl p-4.5 flex flex-col gap-3 justify-between h-[230px]">
                      <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="text-[10px] font-black text-white/50 tracking-wider uppercase">WhatsApp</span>
                      </div>

                      <div className="flex flex-col gap-2.5 overflow-y-auto pr-1 flex-1 py-1 scrollbar-thin">
                        {/* Bubble 1 User */}
                        <div className="bg-[#1a1c23] text-gray-200 border border-white/5 rounded-2xl rounded-tl-none px-3.5 py-2.5 text-[11px] font-semibold max-w-[90%] self-start leading-relaxed shadow-sm">
                          I want to book an appointment tomorrow at 4pm
                        </div>

                        {/* Bubble 2 Bot */}
                        <div className="bg-[#7c3aed] text-white rounded-2xl rounded-tr-none px-3.5 py-2.5 text-[11px] font-semibold max-w-[90%] self-end leading-relaxed shadow-lg">
                          Perfect! Dr. Sharma is available at 4 PM. Should I book it for you?
                        </div>

                        {/* Bubble 3 User */}
                        <div className="bg-[#1a1c23] text-gray-200 border border-white/5 rounded-2xl rounded-tl-none px-3.5 py-2.5 text-[11px] font-semibold max-w-[90%] self-start leading-relaxed shadow-sm">
                          Yes, please!
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Bottom Strip: Missed Call Recovery */}
                  <div className="bg-gradient-to-r from-red-500/10 via-purple-500/10 to-indigo-500/5 border border-red-500/20 rounded-2xl p-4 mt-5.5 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
                        <PhoneCall className="w-5 h-5 text-rose-400" />
                      </div>
                      <div>
                        <h5 className="text-xs font-black text-white leading-tight">Missed Call Recovery</h5>
                        <p className="text-[10px] text-white/50 leading-normal mt-0.5 max-w-[340px]">
                          Incoming call from +91 9000X XXXXX was missed. AI responded via WhatsApp instantly.
                        </p>
                      </div>
                    </div>
                    
                    <span className="px-3.5 py-1.5 bg-purple-500/20 border border-purple-500/30 text-[#c59dff] text-[10px] font-black rounded-lg uppercase tracking-wider shrink-0 shadow-md">
                      RECOVERED
                    </span>
                  </div>

                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* 2. DESIGNED FOR GROWTH SECTION */}
        <section className="relative py-24 md:py-32 bg-[#0a0a0c]/40 border-b border-white/5">
          <div className="container mx-auto px-4 max-w-7xl">
            
            {/* Centered Headers */}
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
                Designed for Growth
              </h2>
              <p className="text-[#cbc4d2]/50 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-semibold">
                Modern AI tools that work as hard as you do. Automate the mundane and focus on the exceptional.
              </p>
            </div>

            {/* Bento feature cards grid (12-columns bento layout) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6.5">
              
              {/* Card 1: Automated Appointment Booking */}
              <div className="lg:col-span-8 bg-[#121216] border border-white/5 rounded-[2.5rem] p-8 hover:border-purple-500/25 transition-all duration-300 flex flex-col md:flex-row gap-8 items-center justify-between group shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-500/[0.02] to-transparent pointer-events-none"></div>
                
                {/* Left part copy */}
                <div className="flex-1 text-left">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-8 shadow-lg shadow-purple-500/5 group-hover:scale-105 transition-transform duration-300">
                    <CalendarCheck className="w-5.5 h-5.5 text-purple-400" />
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-black text-white mb-4">Automated Appointment Booking</h3>
                  <p className="text-xs md:text-sm text-[#cbc4d2]/50 leading-relaxed font-semibold max-w-md">
                    Sync seamlessly with Google or Outlook. Your AI handles rescheduling, cancellations, and complex booking logic without a single human touchpoint.
                  </p>
                </div>

                {/* Right part: perspective 3D tablet dashboard mockup */}
                <div className="flex-1 w-full md:w-auto h-[230px] flex items-center justify-center relative mt-6 md:mt-0">
                  <div className="relative w-[300px] h-[190px] rounded-2xl bg-[#09090b] border-2 border-white/10 shadow-2xl p-3 overflow-hidden transition-all duration-500 group-hover:scale-[1.03] group-hover:border-purple-500/30 transform [perspective:1000px] [rotateY:-18deg] [rotateX:12deg] [skewY:3deg]">
                    
                    {/* Tablet screen content */}
                    <div className="flex flex-col gap-2 h-full justify-between">
                      {/* Grid Top header */}
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <span className="text-[9px] font-black text-white/50 uppercase tracking-widest">Dashboard</span>
                        <div className="flex gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400/50"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400/50"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/50"></span>
                        </div>
                      </div>

                      {/* Scheduling Analytics charts / grid mockup */}
                      <div className="flex gap-2 items-end justify-between px-1 flex-1 py-1.5">
                        <div className="w-[15%] bg-purple-500/20 rounded-t-lg h-[40%] group-hover:h-[60%] transition-all duration-700"></div>
                        <div className="w-[15%] bg-indigo-500/20 rounded-t-lg h-[70%] group-hover:h-[85%] transition-all duration-700"></div>
                        <div className="w-[15%] bg-[#c59dff]/30 rounded-t-lg h-[50%] group-hover:h-[70%] transition-all duration-700"></div>
                        <div className="w-[15%] bg-purple-500/40 rounded-t-lg h-[90%] group-hover:h-[95%] transition-all duration-700 relative">
                          <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[8px] font-bold text-[#c59dff]">92%</span>
                        </div>
                        <div className="w-[15%] bg-indigo-500/20 rounded-t-lg h-[30%] group-hover:h-[45%] transition-all duration-700"></div>
                        <div className="w-[15%] bg-[#c59dff]/20 rounded-t-lg h-[60%] group-hover:h-[80%] transition-all duration-700"></div>
                      </div>

                      {/* Small mock metric box */}
                      <div className="bg-white/5 border border-white/10 rounded-xl p-2 flex items-center justify-between text-left">
                        <div>
                          <span className="text-[7px] text-white/30 uppercase tracking-widest">Growth Rate</span>
                          <div className="text-xs font-black text-emerald-400 leading-none mt-0.5">+48.2%</div>
                        </div>
                        <div className="w-7 h-4 bg-emerald-500/20 rounded-full flex items-center justify-center text-[7px] text-emerald-400 font-bold">
                          active
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

              {/* Card 2: 24/7 Support */}
              <div className="lg:col-span-4 bg-[#121216] border border-white/5 rounded-[2.5rem] p-8 hover:border-purple-500/25 transition-all duration-300 flex flex-col justify-between group shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/[0.02] to-transparent pointer-events-none"></div>
                
                <div className="text-left">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-8 shadow-lg shadow-indigo-500/5 group-hover:scale-105 transition-transform duration-300">
                    <MessageSquare className="w-5.5 h-5.5 text-indigo-400" />
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-black text-white mb-4">24/7 Support</h3>
                  <p className="text-xs md:text-sm text-[#cbc4d2]/50 leading-relaxed font-semibold mb-10">
                    Instant answers for pricing, hours, and services on WhatsApp and Web. Never keep a customer waiting.
                  </p>
                </div>

                {/* Overlapping customer avatars row with dynamic stat capsule */}
                <div className="flex items-center gap-4.5 mt-auto pt-6 border-t border-white/5">
                  <div className="flex -space-x-3.5">
                    <div className="w-9 h-9 rounded-full border-2 border-[#121216] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] font-black text-white">R</div>
                    <div className="w-9 h-9 rounded-full border-2 border-[#121216] bg-gradient-to-br from-[#c59dff] to-indigo-400 flex items-center justify-center text-[10px] font-black text-[#121216]">P</div>
                    <div className="w-9 h-9 rounded-full border-2 border-[#121216] bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-[10px] font-black text-white">M</div>
                  </div>
                  
                  <div className="px-3.5 py-1.5 bg-[#c59dff]/10 border border-[#c59dff]/20 text-[#c59dff] text-xs font-black rounded-full shadow-md uppercase tracking-wider flex items-center gap-1.5">
                    +5k Clients
                  </div>
                </div>

              </div>

              {/* Card 3: Zero Missed Calls */}
              <div className="lg:col-span-4 bg-[#121216] border border-white/5 rounded-[2.5rem] p-8 hover:border-purple-500/25 transition-all duration-300 flex flex-col justify-between group shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-rose-500/[0.02] to-transparent pointer-events-none"></div>
                
                <div className="text-left">
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-8 shadow-lg shadow-rose-500/5 group-hover:scale-105 transition-transform duration-300">
                    <PhoneMissed className="w-5.5 h-5.5 text-rose-400" />
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-black text-white mb-4">Zero Missed Calls</h3>
                  <p className="text-xs md:text-sm text-[#cbc4d2]/50 leading-relaxed font-semibold mb-10">
                    Missed call to text automation. Triggers immediate AI-powered engagement when you're busy.
                  </p>
                </div>

                {/* Sub-widget alert notification simulator */}
                <div className="bg-[#09090b] border border-white/10 rounded-2xl p-4 text-left shadow-lg w-full mt-auto">
                  <div className="flex items-center gap-3.5 mb-2.5">
                    <div className="w-8 h-8 rounded-lg bg-rose-500/15 flex items-center justify-center text-rose-400 border border-rose-500/20 shadow-inner">
                      <PhoneMissed className="w-4 h-4 text-rose-400" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-white leading-tight">Missed Call</span>
                      <span className="text-[8px] text-white/30 mt-0.5 leading-none">2m ago</span>
                    </div>
                  </div>
                  
                  <div className="bg-[#111318] rounded-xl px-3.5 py-2.5 text-xs text-white/80 font-bold border border-white/5 shadow-inner">
                    "Hi! We missed your call. How can we help you today?"
                  </div>
                </div>

              </div>

              {/* Card 4: Smart Reminders */}
              <div className="lg:col-span-8 bg-[#121216] border border-white/5 rounded-[2.5rem] p-8 hover:border-purple-500/25 transition-all duration-300 flex flex-col md:flex-row gap-8 items-center justify-between group shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-amber-500/[0.02] to-transparent pointer-events-none"></div>
                
                {/* Left side: WhatsApp Notification bubble */}
                <div className="flex-1 w-full md:w-auto h-[230px] flex items-center justify-center relative">
                  <div className="bg-[#09090b] border border-white/10 rounded-2xl p-4.5 shadow-xl w-full max-w-[340px] text-left transition-all duration-300 group-hover:scale-[1.02]">
                    
                    {/* Header bubble notification */}
                    <div className="flex items-center gap-3.5 mb-4">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white text-base font-bold shadow-lg shadow-emerald-500/15 shrink-0">
                        W
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-extrabold text-white">Glow Salon Reminder</span>
                        <span className="text-[8px] text-white/30 leading-none mt-0.5">WhatsApp Message</span>
                      </div>
                    </div>

                    {/* Notification content text bubble */}
                    <p className="text-xs text-white/80 leading-relaxed font-bold mb-4.5 bg-[#111318] p-3.5 rounded-xl border border-white/5">
                      "Reminder: Your appointment at Glow Salon is tomorrow at 11 AM."
                    </p>

                    {/* Confirm Reschedule action buttons */}
                    <div className="flex gap-2.5">
                      <button className="flex-1 py-2 bg-[#7c3aed] text-white rounded-lg text-[10px] font-black hover:bg-[#6d28d9] transition-colors shadow-md shadow-purple-500/10">
                        Confirm
                      </button>
                      <button className="flex-1 py-2 bg-[#111318] border border-white/10 text-white/70 rounded-lg text-[10px] font-black hover:bg-white/5 transition-colors">
                        Reschedule
                      </button>
                    </div>

                  </div>
                </div>

                {/* Right side copy */}
                <div className="flex-1 text-left">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-8 shadow-lg shadow-amber-500/5 group-hover:scale-105 transition-transform duration-300">
                    <Bell className="w-5.5 h-5.5 text-amber-400" />
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-black text-white mb-4">Smart Reminders</h3>
                  <p className="text-xs md:text-sm text-[#cbc4d2]/50 leading-relaxed font-semibold max-w-md">
                    Reduce no-shows by 40% with automated WhatsApp reminders. Customers can confirm or reschedule with one tap.
                  </p>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* 3. CALL TO ACTION SECTION */}
        <section className="py-24 px-4 bg-[#0a0a0c]/30">
          <div className="container mx-auto max-w-6xl">
            
            {/* Deep Violet Card Wrapper */}
            <div className="bg-gradient-to-br from-[#2c1356]/40 via-[#18112a]/30 to-[#0a0a0c] border border-primary/10 rounded-[3.5rem] p-16 md:p-24 text-center relative overflow-hidden shadow-[0_20px_50px_rgba(209,188,255,0.05)]">
              
              {/* Backlighting glow effects */}
              <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[160px] pointer-events-none -z-10"></div>
              <div className="absolute -bottom-32 -left-32 w-[450px] h-[450px] bg-[#c59dff]/5 rounded-full blur-[130px] pointer-events-none -z-10"></div>

              <h2 className="text-3xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
                Ready to automate your front desk?
              </h2>
              
              <p className="text-[#cbc4d2]/60 text-base md:text-lg mb-12 max-w-xl mx-auto leading-relaxed font-semibold">
                Join hundreds of Indian businesses using SaarthiDesk to provide 24/7 world-class service without increasing headcount.
              </p>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
                <Link 
                  href="/register" 
                  className="w-full sm:w-auto px-10 py-4.5 bg-[#c59dff] text-[#0a0a0c] rounded-2xl font-black text-base transition-all hover:bg-[#b58bfd] text-center shadow-[0_15px_35px_rgba(197,157,255,0.22)] hover:scale-[1.02]"
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

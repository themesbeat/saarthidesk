"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { 
  Play, 
  ArrowRight, 
  Calendar, 
  Clock, 
  Check, 
  Sparkles, 
  MessageSquare, 
  Bell, 
  Smartphone, 
  CheckCircle2, 
  CheckCircle,
  HelpCircle,
  CalendarDays,
  Bot,
  User,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Zap,
  Globe
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
      staggerChildren: 0.12,
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
      stiffness: 90,
      damping: 14
    }
  }
};

export default function AppointmentBookingSolutionPage() {
  const [activeSlot, setActiveSlot] = useState<string>("10:30");
  const [isDemoPlaying, setIsDemoPlaying] = useState<boolean>(false);
  const [chatStep, setChatStep] = useState<number>(0);

  // Auto-progress WhatsApp simulation for visual engagement
  useEffect(() => {
    const timer = setInterval(() => {
      setChatStep((prev) => (prev < 3 ? prev + 1 : 0));
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0c10] text-foreground font-sans selection:bg-primary/30 overflow-x-hidden">
      {/* Global Navigation Header */}
      <Header />

      <main className="relative">
        {/* Decorative Background Blur Blobs */}
        <div className="absolute top-[10%] left-[-15%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>
        <div className="absolute top-[40%] right-[-15%] w-[600px] h-[600px] bg-secondary/80 opacity-[0.04] rounded-full blur-[180px] pointer-events-none -z-10"></div>
        <div className="absolute top-[80%] left-[20%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>

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
                {/* Purplish Announcement Badge */}
                <motion.div 
                  variants={itemVariants}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] md:text-xs font-bold text-primary mb-8 tracking-widest uppercase italic shadow-[0_0_15px_rgba(209,188,255,0.1)]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                  AI APPOINTMENT SCHEDULER
                </motion.div>
                
                {/* Title */}
                <motion.h1 
                  variants={itemVariants}
                  className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.08] text-white"
                >
                  AI Appointment Booking <br />
                  <span className="bg-gradient-to-r from-primary via-secondary to-[#c59dff] bg-clip-text text-transparent italic pr-2">
                    For Modern Businesses
                  </span>
                </motion.h1>
                
                {/* Subheading */}
                <motion.p 
                  variants={itemVariants}
                  className="text-base md:text-lg text-[#cbc4d2]/70 mb-10 max-w-xl leading-relaxed font-medium"
                >
                  Eliminate the back-and-forth. Let your AI assistant handle the entire scheduling lifecycle across WhatsApp, Web, and Calendar 24/7.
                </motion.p>
                
                {/* CTA Buttons */}
                <motion.div 
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10"
                >
                  <Link 
                    href="/register" 
                    className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-base transition-all hover:bg-primary/95 text-center flex items-center justify-center gap-2 shadow-[0_10px_35px_rgba(209,188,255,0.25)] hover:scale-[1.02]"
                  >
                    Book a Demo <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button 
                    onClick={() => setIsDemoPlaying(!isDemoPlaying)}
                    className="w-full sm:w-auto px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-xl font-bold text-base transition-all hover:bg-white/10 text-center flex items-center justify-center gap-2 hover:scale-[1.02] cursor-pointer"
                  >
                    <Play className={`w-4 h-4 text-primary ${isDemoPlaying ? 'animate-ping' : 'fill-current'}`} /> 
                    {isDemoPlaying ? "Pause Demo" : "Watch Demo"}
                  </button>
                </motion.div>
              </motion.div>

              {/* Right Column: Hero Dashboard Visual Mockup */}
              <motion.div 
                className="lg:col-span-6 w-full max-w-2xl relative"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
              >
                {/* Soft purple glow behind mockup */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] bg-primary/10 rounded-full blur-[100px] -z-10"></div>
                
                {/* Live Dashboard Container */}
                <div className="bg-[#141218] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl p-6 relative">
                  
                  {/* Top Header Bar */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-5">
                    <div className="flex gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#ff5f56]"></span>
                      <span className="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
                      <span className="w-3 h-3 rounded-full bg-[#27c93f]"></span>
                    </div>
                    <div className="text-[10px] md:text-xs text-white/50 font-bold bg-white/5 px-4 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                      Live Dashboard • syncs active
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 relative">
                    
                    {/* Left Part: Calendar slots view (md:col-span-7) */}
                    <div className="md:col-span-7 bg-[#1c1a22] border border-white/5 rounded-2xl p-4 flex flex-col gap-4">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="w-4 h-4 text-primary" />
                          <span className="text-xs font-extrabold text-white">Friday, Oct 24</span>
                        </div>
                        <span className="text-[9px] font-black text-white/40 uppercase tracking-wider">Today</span>
                      </div>

                      {/* Time Slots */}
                      <div className="flex flex-col gap-2.5">
                        
                        {/* Slot 1: Booked */}
                        <div className="bg-[#141218]/80 border border-white/5 rounded-xl p-3 flex items-center justify-between opacity-50 relative overflow-hidden">
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/20"></div>
                          <div className="pl-2">
                            <div className="text-[11px] font-extrabold text-white">09:00 AM</div>
                            <div className="text-[9px] font-semibold text-white/60">Clinic Appointment</div>
                          </div>
                          <span className="text-[9px] font-bold bg-white/10 px-2 py-0.5 rounded-full text-white/70">
                            Booked
                          </span>
                        </div>

                        {/* Slot 2: Available */}
                        <div 
                          className={`border rounded-xl p-3 flex items-center justify-between transition-all duration-300 relative overflow-hidden cursor-pointer ${
                            activeSlot === "10:00" 
                              ? "bg-primary/10 border-primary shadow-[0_0_15px_rgba(209,188,255,0.15)]" 
                              : "bg-transparent border-dashed border-white/10 hover:border-white/20"
                          }`}
                          onClick={() => setActiveSlot("10:00")}
                        >
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary/55"></div>
                          <div className="pl-2">
                            <div className="text-[11px] font-extrabold text-white">10:00 AM</div>
                            <div className="text-[9px] font-semibold text-white/40">Open Window</div>
                          </div>
                          <span className="text-[9px] font-extrabold text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">
                            Available
                          </span>
                        </div>

                        {/* Slot 3: New Booking Active Slot */}
                        <div 
                          className={`border rounded-xl p-3 flex items-center justify-between transition-all duration-300 relative overflow-hidden cursor-pointer ${
                            activeSlot === "10:30" 
                              ? "bg-primary/10 border-primary shadow-[0_0_15px_rgba(209,188,255,0.15)]" 
                              : "bg-transparent border-dashed border-white/10 hover:border-white/20"
                          }`}
                          onClick={() => setActiveSlot("10:30")}
                        >
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                          <div className="pl-2">
                            <div className="text-[11px] font-extrabold text-white">10:30 AM</div>
                            <div className="text-[9px] font-semibold text-primary">New Booking Slot</div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                            </span>
                            <span className="text-[9px] font-extrabold text-primary bg-primary/20 px-2 py-0.5 rounded-full">
                              Active
                            </span>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Right Part: Overlapping WhatsApp Business Card Mockup (md:col-span-5) */}
                    <div className="md:col-span-5 flex flex-col gap-4 justify-between h-full">
                      
                      {/* WhatsApp Mini Chat Panel */}
                      <div className="bg-[#121b22] border border-[#232d36] rounded-2xl p-3 flex flex-col gap-2.5 shadow-xl">
                        
                        {/* WA Header */}
                        <div className="flex items-center gap-2 border-b border-[#232d36] pb-2">
                          <div className="w-6 h-6 rounded-full bg-[#128c7e] flex items-center justify-center shrink-0 text-white font-bold text-[9px]">
                            WA
                          </div>
                          <div className="text-left">
                            <div className="text-[9px] font-bold text-white flex items-center gap-0.5">
                              WhatsApp Business
                              <CheckCircle2 className="w-3 h-3 text-[#25d366] fill-[#25d366] stroke-white shrink-0" />
                            </div>
                            <div className="text-[7px] text-[#8696a0]">AI Assistant</div>
                          </div>
                        </div>

                        {/* Customer Message Bubble */}
                        <div className="bg-[#202c33] rounded-lg p-2 max-w-[90%] self-start relative">
                          <div className="text-[9px] text-[#e9edef] leading-tight font-medium">
                            "Hi! I&apos;d like to book a slot for 10 AM"
                          </div>
                          <span className="text-[6px] text-[#8696a0] block text-right mt-1">10:41 AM</span>
                        </div>

                        {/* AI Active Success Alert */}
                        <div className="bg-[#005c4b] rounded-lg p-2 max-w-[90%] self-end relative border-l-2 border-[#25d366] shadow-[0_4px_12px_rgba(37,211,102,0.15)]">
                          <div className="flex items-center gap-1 mb-1 border-b border-[#00735e] pb-1">
                            <Check className="w-3 h-3 text-[#25d366] stroke-[3]" />
                            <span className="text-[8px] font-extrabold text-[#25d366] uppercase tracking-wider">Booking Confirmed</span>
                          </div>
                          <div className="text-[9px] text-[#e9edef] font-semibold leading-tight">
                            Booking confirmed for 10:00 AM today
                          </div>
                          <div className="mt-2 flex gap-1">
                            <button className="text-[7px] font-extrabold bg-[#00735e] text-white py-1 px-2 rounded hover:bg-[#008c72] transition-colors w-full cursor-pointer">
                              Reschedule
                            </button>
                          </div>
                        </div>

                      </div>

                      {/* Small Quick Stat Card */}
                      <div className="bg-[#1c1a22] border border-white/5 rounded-2xl p-4 flex flex-col justify-between shadow-lg">
                        <div className="text-[9px] font-black text-white/40 tracking-wider uppercase mb-1">
                          Booking Efficiency
                        </div>
                        <div className="text-2xl font-black text-white flex items-baseline">
                          99.4%
                          <span className="text-[9px] text-[#25d366] font-bold ml-1.5 uppercase flex items-center">
                            ▲ +4.2%
                          </span>
                        </div>
                        <div className="text-[8px] text-[#cbc4d2]/50 font-semibold mt-1">
                          No double bookings detected
                        </div>
                      </div>

                    </div>

                  </div>

                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* 2. TRUSTED BY LOGOS ROW */}
        <section className="relative py-12 border-t border-b border-white/5 bg-[#0a0c10]/60">
          <div className="container mx-auto px-4 max-w-7xl text-center">
            <p className="text-xs md:text-sm font-semibold tracking-widest text-[#cbc4d2]/40 uppercase mb-8">
              Trusted by 5,000+ modern service businesses in India
            </p>
            
            {/* Logo Grid */}
            <div className="flex flex-wrap items-center justify-center gap-x-12 md:gap-x-20 gap-y-6 opacity-60">
              
              {/* Logo 1: URBANSPACE */}
              <div className="flex items-center gap-2 group transition-all duration-300 hover:scale-105 hover:opacity-100">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0 group-hover:border-primary/40 group-hover:bg-primary/5 transition-all">
                  <span className="font-extrabold text-sm text-primary">U</span>
                </div>
                <span className="text-base font-black text-white tracking-widest uppercase">UrbanSpace</span>
              </div>

              {/* Logo 2: ZENWELL */}
              <div className="flex items-center gap-2 group transition-all duration-300 hover:scale-105 hover:opacity-100">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0 group-hover:border-primary/40 group-hover:bg-primary/5 transition-all">
                  <span className="font-extrabold text-sm text-secondary">Z</span>
                </div>
                <span className="text-base font-black text-white tracking-widest uppercase">ZenWell</span>
              </div>

              {/* Logo 3: HEALCO */}
              <div className="flex items-center gap-2 group transition-all duration-300 hover:scale-105 hover:opacity-100">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0 group-hover:border-primary/40 group-hover:bg-primary/5 transition-all">
                  <span className="font-extrabold text-sm text-[#c59dff]">H</span>
                </div>
                <span className="text-base font-black text-white tracking-widest uppercase">HealCo</span>
              </div>

              {/* Logo 4: GLAMUP */}
              <div className="flex items-center gap-2 group transition-all duration-300 hover:scale-105 hover:opacity-100">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0 group-hover:border-primary/40 group-hover:bg-primary/5 transition-all">
                  <span className="font-extrabold text-sm text-pink-300">G</span>
                </div>
                <span className="text-base font-black text-white tracking-widest uppercase">GlamUp</span>
              </div>

            </div>
          </div>
        </section>

        {/* 3. BENTO GRID SECTION: "The Smartest Way to Fill Your Calendar" */}
        <section className="relative py-24 bg-[#0a0c10]/40">
          <div className="container mx-auto px-4 max-w-7xl">
            
            {/* Header Text */}
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
                The Smartest Way to Fill Your Calendar
              </h2>
              <p className="text-[#cbc4d2]/50 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-semibold">
                Intelligent scheduling that works for you, not the other way around.
              </p>
            </div>

            {/* Three Cards Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              
              {/* Card 1: Automated Scheduling */}
              <div className="md:col-span-4 bg-[#14171c]/80 border border-white/5 rounded-[2.5rem] p-8 hover:border-primary/20 hover:bg-[#181b22] transition-all duration-300 flex flex-col justify-between group shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent pointer-events-none"></div>
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-8 shadow-lg shadow-primary/5 group-hover:scale-105 transition-transform duration-300">
                    <Sparkles className="w-5.5 h-5.5 text-primary fill-current" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-4">Automated Scheduling</h3>
                  <p className="text-xs md:text-sm text-[#cbc4d2]/50 leading-relaxed font-semibold">
                    AI understands natural language intent and finds the perfect slot. No manual coordination needed.
                  </p>
                </div>
                <div className="mt-12 pt-8 border-t border-white/5">
                  <div className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2 flex items-baseline">
                    100%
                  </div>
                  <div className="text-[9px] md:text-[10px] text-white/40 tracking-widest font-black uppercase">
                    Coordination déflection rate
                  </div>
                </div>
              </div>

              {/* Card 2: WhatsApp Bookings */}
              <div className="md:col-span-4 bg-[#14171c]/80 border border-white/5 rounded-[2.5rem] p-8 hover:border-primary/20 hover:bg-[#181b22] transition-all duration-300 flex flex-col justify-between group shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-secondary/[0.02] to-transparent pointer-events-none"></div>
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#25d366]/10 border border-[#25d366]/20 flex items-center justify-center mb-8 shadow-lg shadow-[#25d366]/5 group-hover:scale-105 transition-transform duration-300">
                    <MessageSquare className="w-5.5 h-5.5 text-[#25d366] fill-current" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-4">WhatsApp Bookings</h3>
                  <p className="text-xs md:text-sm text-[#cbc4d2]/50 leading-relaxed font-semibold">
                    Native integration with WhatsApp Business API for frictionless booking where your customers already are.
                  </p>
                </div>
                <div className="mt-12 pt-8 border-t border-white/5">
                  <div className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2 flex items-baseline">
                    3.8x
                  </div>
                  <div className="text-[9px] md:text-[10px] text-white/40 tracking-widest font-black uppercase">
                    Higher Conversion than Web Forms
                  </div>
                </div>
              </div>

              {/* Card 3: Smart Reminders */}
              <div className="md:col-span-4 bg-[#14171c]/80 border border-white/5 rounded-[2.5rem] p-8 hover:border-primary/20 hover:bg-[#181b22] transition-all duration-300 flex flex-col justify-between group shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#c59dff]/[0.02] to-transparent pointer-events-none"></div>
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#c59dff]/10 border border-[#c59dff]/20 flex items-center justify-center mb-8 shadow-lg shadow-[#c59dff]/5 group-hover:scale-105 transition-transform duration-300">
                    <Bell className="w-5.5 h-5.5 text-[#c59dff] fill-current" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-4">Smart Reminders</h3>
                  <p className="text-xs md:text-sm text-[#cbc4d2]/50 leading-relaxed font-semibold">
                    Automated multi-channel reminders (WhatsApp/SMS) that reduce no-shows by up to 40%.
                  </p>
                </div>
                <div className="mt-12 pt-8 border-t border-white/5">
                  <div className="text-4xl md:text-5xl font-black text-[#ffb4ab] tracking-tight mb-2 flex items-baseline">
                    -40%
                  </div>
                  <div className="text-[9px] md:text-[10px] text-[#ffb4ab]/60 tracking-widest font-black uppercase">
                    Drop in Appointment No-shows
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 4. SYNC WITH THE TOOLS YOU LOVE SECTION */}
        <section className="relative py-24 border-t border-white/5 bg-[#0a0c10]/30">
          <div className="container mx-auto px-4 max-w-7xl text-center">
            
            {/* Header Text */}
            <div className="max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
                Syncs with the Tools You Love
              </h2>
              <p className="text-[#cbc4d2]/50 text-base md:text-lg font-semibold max-w-xl mx-auto">
                Seamless connectivity with your existing ecosystem.
              </p>
            </div>

            {/* Sync Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
              
              {/* Tool 1: Google Calendar */}
              <div className="bg-[#14171c]/60 border border-white/5 rounded-3xl p-8 flex flex-col items-center justify-between shadow-xl relative overflow-hidden group hover:border-primary/20 transition-all">
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 via-red-500 to-green-500"></div>
                <div className="flex flex-col items-center gap-6">
                  {/* Google Calendar Stylized Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-white flex flex-col overflow-hidden shadow-lg border border-white/20 transform group-hover:scale-105 transition-transform duration-300">
                    <div className="bg-[#4285f4] text-white py-1 text-[10px] font-black uppercase text-center tracking-widest">
                      OCT
                    </div>
                    <div className="flex-1 flex items-center justify-center font-black text-2xl text-[#34a853]">
                      24
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white mb-2">Google Calendar</h3>
                    <p className="text-xs text-[#cbc4d2]/50 font-medium">Auto-reads conflict slots instantly.</p>
                  </div>
                </div>
                <span className="text-[9px] font-extrabold text-[#25d366] bg-[#25d366]/10 px-3 py-1 rounded-full mt-6 uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25d366] animate-ping"></span>
                  Keep in sync
                </span>
              </div>

              {/* Tool 2: Outlook */}
              <div className="bg-[#14171c]/60 border border-white/5 rounded-3xl p-8 flex flex-col items-center justify-between shadow-xl relative overflow-hidden group hover:border-primary/20 transition-all">
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#0078d4] to-blue-600"></div>
                <div className="flex flex-col items-center gap-6">
                  {/* Outlook Stylized Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-[#0078d4] flex items-center justify-center shadow-lg border border-[#0078d4]/40 transform group-hover:scale-105 transition-transform duration-300 text-white relative">
                    <Calendar className="w-8 h-8 stroke-[2.5]" />
                    <div className="absolute bottom-2 right-2 bg-white rounded-md w-4 h-4 flex items-center justify-center">
                      <span className="text-[8px] font-black text-[#0078d4]">O</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white mb-2">Outlook</h3>
                    <p className="text-xs text-[#cbc4d2]/50 font-medium">Enterprise scheduling integration.</p>
                  </div>
                </div>
                <span className="text-[9px] font-extrabold text-secondary bg-secondary/10 px-3 py-1 rounded-full mt-6 uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                  Outlook
                </span>
              </div>

              {/* Tool 3: Apple Calendar */}
              <div className="bg-[#14171c]/60 border border-white/5 rounded-3xl p-8 flex flex-col items-center justify-between shadow-xl relative overflow-hidden group hover:border-primary/20 transition-all">
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-red-500 to-amber-500"></div>
                <div className="flex flex-col items-center gap-6">
                  {/* Apple Calendar Stylized Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-white border border-white/20 flex flex-col overflow-hidden shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                    <div className="bg-[#ff3b30] text-white py-1.5 text-[8px] font-black uppercase text-center tracking-widest">
                      FRIDAY
                    </div>
                    <div className="flex-1 flex items-center justify-center font-black text-2xl text-black">
                      24
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white mb-2">Apple Calendar</h3>
                    <p className="text-xs text-[#cbc4d2]/50 font-medium">Syncs events to iOS ecosystem.</p>
                  </div>
                </div>
                <span className="text-[9px] font-extrabold text-[#cbc4d2]/60 bg-white/5 px-3 py-1 rounded-full mt-6 uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#cbc4d2] opacity-50"></span>
                  Apple Calendar
                </span>
              </div>

            </div>

          </div>
        </section>

        {/* 5. THE AI SCHEDULING ASSISTANT (Dual Column with Smartphone Mockup) */}
        <section className="relative py-24 border-t border-white/5 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            
            {/* Left Column: Highly polished WhatsApp Smartphone Mockup */}
            <div className="lg:col-span-5 w-full flex justify-center order-2 lg:order-1 relative">
              
              {/* Radiant glows behind phone */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-primary/10 rounded-full blur-[110px] -z-10 animate-pulse"></div>
              
              {/* Smartphone Frame Mockup */}
              <div className="w-[320px] h-[640px] bg-black border-[8px] border-[#2d2b33] rounded-[3.2rem] shadow-[0_25px_50px_rgba(0,0,0,0.8)] overflow-hidden relative flex flex-col">
                
                {/* Smartphone Notch/Camera Island */}
                <div className="absolute top-0 inset-x-0 h-6 bg-black flex justify-center items-center z-50">
                  <div className="w-24 h-4 bg-black rounded-b-xl flex justify-center items-end pb-0.5">
                    <span className="w-3 h-1 bg-[#1a191d] rounded-full mr-2"></span>
                    <span className="w-1.5 h-1.5 bg-[#100f13] rounded-full"></span>
                  </div>
                </div>

                {/* WhatsApp Chat App Header */}
                <div className="bg-[#075e54] text-white pt-8 pb-3 px-4 flex items-center justify-between shrink-0 shadow-md">
                  <div className="flex items-center gap-2">
                    {/* Back Chevron / Photo */}
                    <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                      <Bot className="w-4.5 h-4.5 text-primary" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-black flex items-center gap-0.5">
                        Saarthi AI Scheduler
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#25d366] fill-[#25d366] stroke-[#075e54] shrink-0" />
                      </div>
                      <div className="text-[8px] text-white/70 font-semibold tracking-wide flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-[#25d366] animate-ping"></span>
                        online
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] text-white/50 font-bold bg-white/5 px-2.5 py-1 rounded-full">
                    24/7 Auto
                  </span>
                </div>

                {/* Simulated WhatsApp Wallpaper and Messages */}
                <div className="flex-1 bg-[#efeae2] p-4 flex flex-col gap-3.5 overflow-y-auto relative min-h-0 select-none">
                  
                  {/* Subtle WhatsApp style patterns overlay in CSS */}
                  <div className="absolute inset-0 bg-repeat opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'80\' height=\'80\' viewBox=\'0 0 80 80\'%3E%3Cpath d=\'M10 20h20v20H10zM50 50h20v20H50z\' fill=\'%23000\' fill-opacity=\'.1\'/%3E%3C/svg%3E")' }}></div>

                  {/* Date Badge */}
                  <div className="self-center bg-[#e1f3fc] text-[#53bdeb] px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-wider shadow-sm z-10">
                    Friday
                  </div>

                  {/* Message 1: User Message (appears at step >= 0) */}
                  {chatStep >= 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white text-black rounded-xl rounded-tr-none p-3 max-w-[85%] self-start text-left shadow-sm border border-black/5 z-10"
                    >
                      <p className="text-[10px] leading-relaxed font-semibold">
                        "Yes, do you have any openings on Friday morning?"
                      </p>
                      <span className="text-[6px] text-black/40 block text-right mt-1 font-bold">10:41 AM</span>
                    </motion.div>
                  )}

                  {/* Message 2: AI reply (appears at step >= 1) */}
                  {chatStep >= 1 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-[#d9fdd3] text-black rounded-xl rounded-tl-none p-3 max-w-[85%] self-end text-left shadow-sm z-10"
                    >
                      <p className="text-[10px] leading-relaxed font-semibold">
                        "Yes! I have 9:00 AM and 10:30 AM available. Which one works for you?"
                      </p>
                      <span className="text-[6px] text-black/40 block text-right mt-1 font-bold">10:41 AM</span>
                    </motion.div>
                  )}

                  {/* Message 3: User replies (appears at step >= 2) */}
                  {chatStep >= 2 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-white text-black rounded-xl rounded-tr-none p-3 max-w-[85%] self-start text-left shadow-sm border border-black/5 z-10"
                    >
                      <p className="text-[10px] leading-relaxed font-semibold">
                        "10:30 works."
                      </p>
                      <span className="text-[6px] text-black/40 block text-right mt-1 font-bold">10:42 AM</span>
                    </motion.div>
                  )}

                  {/* Message 4: AI confirms (appears at step >= 3) */}
                  {chatStep >= 3 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="bg-[#d9fdd3] text-black rounded-xl rounded-tl-none p-3.5 max-w-[90%] self-end text-left shadow-md border-l-4 border-emerald-500 z-10"
                    >
                      <div className="flex items-center gap-1.5 mb-1.5 border-b border-black/5 pb-1">
                        <CheckCircle className="w-3.5 h-3.5 text-[#25d366]" />
                        <span className="text-[9px] font-black text-emerald-700 uppercase tracking-widest">
                          Booking Confirmed
                        </span>
                      </div>
                      <p className="text-[10px] leading-relaxed font-bold text-slate-800">
                        "Great! You&apos;re booked for Friday at 10:30 AM. I&apos;ve sent the calendar invite to your email."
                      </p>
                      <div className="mt-2.5 bg-white/50 border border-black/5 rounded-lg p-2 flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-[8px] font-bold text-slate-800">Friday, Oct 24 • 10:30 AM</span>
                          <span className="text-[7px] text-slate-500 font-semibold">Saarthi Workspace Sync</span>
                        </div>
                        <span className="text-[7px] font-black bg-emerald-500 text-white px-2 py-0.5 rounded uppercase">
                          Synced
                        </span>
                      </div>
                      <span className="text-[6px] text-black/40 block text-right mt-1.5 font-bold">10:42 AM</span>
                    </motion.div>
                  )}

                </div>

                {/* Chat Input Bar */}
                <div className="bg-[#f0f2f5] p-3 flex items-center gap-2 border-t border-black/5 shrink-0 select-none">
                  <div className="flex-1 bg-white rounded-full py-1.5 px-3 border border-black/5 text-[10px] text-slate-400 font-medium text-left">
                    Type a message...
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#128c7e] flex items-center justify-center text-white shrink-0 shadow-md">
                    <SendIcon className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: AI Scheduling Details checklist */}
            <div className="lg:col-span-7 text-left order-1 lg:order-2">
              
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6 leading-[1.1]">
                The AI Scheduling <br />
                <span className="bg-gradient-to-r from-primary via-secondary to-[#c59dff] bg-clip-text text-transparent italic">
                  Assistant
                </span>
              </h2>
              
              <p className="text-base md:text-lg text-[#cbc4d2]/70 leading-relaxed font-semibold mb-10 max-w-xl">
                Provide a 5-star experience without lifting a finger. Our AI mimics human conversation patterns while ensuring 100% accuracy in calendar management.
              </p>

              {/* Advanced Checklist with visual badges */}
              <div className="flex flex-col gap-6">
                
                {/* Point 1 */}
                <div className="flex gap-4 items-start group">
                  <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 shadow-md transition-colors group-hover:bg-primary/20">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="text-sm md:text-base font-extrabold text-white mb-1">
                      Handles rescheduling and cancellations automatically
                    </h4>
                    <p className="text-xs text-[#cbc4d2]/50 font-medium max-w-lg leading-relaxed">
                      If a customer requests to move their appointment, the AI coordinates a slot in seconds, updates the database, sends the trigger link, and alerts your calendar in real-time.
                    </p>
                  </div>
                </div>

                {/* Point 2 */}
                <div className="flex gap-4 items-start group">
                  <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 shadow-md transition-colors group-hover:bg-primary/20">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="text-sm md:text-base font-extrabold text-white mb-1">
                      Recognizes Indian English and regional context
                    </h4>
                    <p className="text-xs text-[#cbc4d2]/50 font-medium max-w-lg leading-relaxed">
                      Trained to understand conversational subtleties like "kal subah", "shift to next Friday", or "around 10 o'clock". Ensures seamless regional support across diverse demographics.
                    </p>
                  </div>
                </div>

                {/* Point 3 */}
                <div className="flex gap-4 items-start group">
                  <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 shadow-md transition-colors group-hover:bg-primary/20">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="text-sm md:text-base font-extrabold text-white mb-1">
                      Directly syncs with CRM for lead capture
                    </h4>
                    <p className="text-xs text-[#cbc4d2]/50 font-medium max-w-lg leading-relaxed">
                      Every booking triggers immediate sync to Salesforce, HubSpot, or Zoho, creating new contacts, tagging customer records, and logging communication transcripts.
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* 6. CALL TO ACTION DEEP GRADIENT BANNER */}
        <section className="py-24 px-4 bg-[#0a0c10]/30 border-t border-white/5">
          <div className="container mx-auto max-w-6xl">
            
            {/* Deep Violet Gradient Card Wrapper */}
            <div className="bg-gradient-to-br from-[#2c1356]/40 via-[#18112a]/30 to-[#0a0c10] border border-primary/10 rounded-[3.5rem] p-16 md:p-24 text-center relative overflow-hidden shadow-[0_20px_50px_rgba(209,188,255,0.05)]">
              
              {/* Radiant glows inside card */}
              <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[160px] pointer-events-none -z-10"></div>
              <div className="absolute -bottom-32 -left-32 w-[450px] h-[450px] bg-indigo-500/5 rounded-full blur-[130px] pointer-events-none -z-10"></div>

              <h2 className="text-3xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
                Ready to automate your schedule?
              </h2>
              
              <p className="text-[#cbc4d2]/60 text-base md:text-lg mb-12 max-w-xl mx-auto leading-relaxed font-semibold">
                Join thousands of modern businesses that have regained their time with SaarthiDesk AI.
              </p>

              {/* Action Links */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-5 mb-6">
                <Link 
                  href="/register" 
                  className="w-full sm:w-auto px-10 py-4.5 bg-primary text-[#1a122c] rounded-2xl font-black text-base transition-all hover:bg-primary/95 text-center shadow-[0_15px_35px_rgba(209,188,255,0.22)] hover:scale-[1.02]"
                >
                  Start Free Trial
                </Link>
                <Link 
                  href="/demo" 
                  className="w-full sm:w-auto px-10 py-4.5 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-base transition-all hover:bg-white/10 text-center hover:scale-[1.02]"
                >
                  Talk to Sales
                </Link>
              </div>

              {/* Trial details text */}
              <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest">
                No credit card required • 14-day free trial
              </span>

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

// Inline SendIcon SVG for chat input button
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

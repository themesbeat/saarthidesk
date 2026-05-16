"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  MessageCircle, Instagram, Mail, Globe, 
  Zap, Shield, BarChart3, Bot, 
  ArrowRight, CheckCircle2, Star,
  Smartphone, Laptop, MessageSquare,
  Clock, TrendingUp, Users
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function UnifiedInboxPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const stagger = {
    whileInView: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0510] text-foreground font-sans selection:bg-primary/30">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 rounded-full blur-[120px] opacity-20 pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-left">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-md"
            >
              <Zap className="w-3.5 h-3.5" /> Introducing Unified Inbox 2.0
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-8 leading-[1.1]"
            >
              One Inbox For Every <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-400 to-cyan-400 font-extrabold italic">Customer Conversation</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-white/60 max-w-xl mb-12 leading-relaxed"
            >
              Manage WhatsApp, Instagram, email, and website chats from a single AI-powered workspace. Stop switching tabs, start closing deals.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 mb-20"
            >
              <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-10 h-14 text-base font-bold shadow-[0_0_30px_rgba(129,140,248,0.4)]">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/10 text-white hover:bg-white/5 rounded-xl px-10 h-14 text-base font-bold backdrop-blur-md">
                Book Demo
              </Button>
            </motion.div>
          </div>

          {/* Hero Image / Mockup */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="flex-1 relative"
          >
            <div className="absolute inset-0 bg-primary/20 rounded-[2.5rem] blur-[80px] -z-10" />
            <div className="p-2 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent border border-white/10 shadow-2xl backdrop-blur-3xl overflow-hidden">
              <Image 
                src="/images/unified-hero.png" 
                width={800} 
                height={600} 
                alt="Unified Inbox Interface Mockup" 
                className="rounded-[2rem] w-full"
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Connection Grid */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">The World&apos;s Most Connected Inbox</h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">Connect with your customers where they spend most of their time.</p>
          </div>

          <motion.div 
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { 
                icon: <MessageCircle className="text-emerald-400" />, 
                title: "WhatsApp Business", 
                desc: "Official API integration for bulk messaging and instant support with verified badges.",
                color: "emerald"
              },
              { 
                icon: <Instagram className="text-rose-400" />, 
                title: "Instagram DMs", 
                desc: "Manage comments, story mentions, and direct messages in a single streamlined thread.",
                color: "rose"
              },
              { 
                icon: <Globe className="text-blue-400" />, 
                title: "Unified Email & Web", 
                desc: "Sync Gmail, Outlook, and your custom domains results alongside your live website chat.",
                color: "blue"
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                variants={fadeIn}
                className="group p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 flex flex-col items-start"
              >
                <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-inner`}>
                  {React.cloneElement(feature.icon as React.ReactElement, { size: 28 })}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-white/40 leading-relaxed text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 3: AI Prioritization */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <motion.div 
              {...fadeIn}
              className="lg:w-1/2"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-[10px] font-bold tracking-[0.2em] text-primary mb-8 uppercase">
                SMART INTELLIGENCE
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 tracking-tight">AI-Powered Prioritization</h2>
              
              <div className="space-y-12">
                {[
                  { 
                    num: "1", 
                    title: "Urgent Query Detection", 
                    desc: "Our AI automatically flags frustrated customers or refund requests for immediate attention."
                  },
                  { 
                    num: "2", 
                    title: "Team Assignment", 
                    desc: "Intelligently route chats to agents based on their workload and language expertise."
                  },
                  { 
                    num: "3", 
                    title: "Internal Collaboration", 
                    desc: "Tag teammates and leave private notes within customer threads for seamless handovers."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-8 group">
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 font-bold text-xs shrink-0 group-hover:bg-primary/20 group-hover:text-primary group-hover:border-primary/30 transition-all duration-300">
                      {item.num}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-3 tracking-tight">{item.title}</h4>
                      <p className="text-white/40 leading-relaxed text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 relative"
            >
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full opacity-30" />
              <div className="relative p-2 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl">
                <Image 
                  src="/images/ai-preview.png" 
                  width={600} 
                  height={450} 
                  alt="AI Smart Prioritization UI" 
                  className="rounded-[2rem] w-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 4: Measure Success in Real-Time */}
      <section className="py-32">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-24 tracking-tight">Measure Success in Real-Time</h2>
          
          <motion.div 
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { label: "Avg. Response Time", value: "1m 24s", change: "+ 23% from last week", trend: "up" },
              { label: "Resolution Rate", value: "94.2%", change: "+ 4% from last week", trend: "up" },
              { label: "Active Agents", value: "12 / 15", change: "3 on break right now", trend: "neutral" },
              { label: "Daily Chat Vol.", value: "1,482", change: "Highest vol. 2-3 PM", trend: "neutral" }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                variants={fadeIn}
                className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all duration-300 group"
              >
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-6">{stat.label}</p>
                <h4 className="text-5xl font-bold text-white mb-6 tracking-tighter group-hover:scale-105 transition-transform duration-300">{stat.value}</h4>
                <p className="text-primary text-[10px] font-bold uppercase tracking-widest">{stat.change}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 5: Loved by Indian SMBs */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Loved by Indian SMBs</h2>
            <p className="text-white/50 text-lg">Join 5,000+ businesses growing with SaarthiDesk.</p>
          </div>

          <motion.div 
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                text: "SaarthiDesk transformed our customer support. We used to miss so many Instagram DMs, but now everything is in one place. Our response time dropped from 4 hours to 10 minutes.",
                name: "Vikram Khanna",
                role: "Owner, Zen Threads",
                avatar: "VK"
              },
              {
                text: "The AI reply suggestions are scary good. It understands our complex queries perfectly and saves my agents hours of typing repetitive answers every single day.",
                name: "Priya Mehta",
                role: "Founder, Luxe Boutique",
                avatar: "PM"
              },
              {
                text: "Managing a team of 10 was hard before SaarthiDesk. Now I can see exactly who is handling what, and we use internal notes to solve complex queries together.",
                name: "Ankit Jain",
                role: "CEO, TechStack India",
                avatar: "AJ"
              }
            ].map((t, idx) => (
              <motion.div 
                key={idx}
                variants={fadeIn}
                className="p-12 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.03] transition-all duration-500 flex flex-col shadow-2xl"
              >
                <p className="text-white/70 text-base leading-relaxed mb-12 flex-1 italic font-medium">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-5 pt-8 border-t border-white/5">
                  <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 font-bold text-sm shadow-xl">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg tracking-tight">{t.name}</p>
                    <p className="text-white/40 text-xs font-bold uppercase tracking-wider">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 6: CTA Section */}
      <section className="py-40">
        <div className="container mx-auto px-6">
          <motion.div 
            {...fadeIn}
            className="relative p-16 md:p-32 rounded-[4rem] bg-gradient-to-br from-indigo-900/40 via-purple-950/40 to-[#0a0510] border border-white/10 overflow-hidden text-center shadow-[0_0_100px_rgba(99,102,241,0.1)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 to-transparent pointer-events-none" />
            
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-10 tracking-tighter leading-[1.1]">
              Start Automating Customer <br className="hidden md:block" /> Conversations Today
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto mb-16 leading-relaxed">
              Unlock the power of unified messaging and AI for your team. Join the future of customer experience.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
              <Button size="lg" className="w-full sm:w-auto bg-white text-black hover:bg-white/90 rounded-2xl px-14 h-16 text-lg font-extrabold shadow-2xl">
                Start Free Trial
              </Button>
              <Button size="lg" variant="ghost" className="w-full sm:w-auto text-white hover:bg-white/5 rounded-2xl px-14 h-16 text-lg font-extrabold border border-white/10">
                Talk to Sales
              </Button>
            </div>
            
            <p className="text-white/30 text-xs font-medium tracking-wide">No credit card required. 14-day free trial of all premium features.</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

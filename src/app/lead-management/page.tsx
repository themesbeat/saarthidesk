"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Users, Target, Layout, Bell, 
  Tag, 
  CheckCircle2, ShieldCheck, Zap, 
  Mail, Instagram, 
  Phone, UserPlus, Layers, Lock,
  RefreshCw, Globe, Headset
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function LeadManagementPage() {
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
        
        <div className="container mx-auto px-6 relative z-10 text-center max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-8 backdrop-blur-md mx-auto"
          >
            <Target className="w-3 h-3" /> AI-Powered CRM Integration
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8 leading-[1.05]"
          >
            Convert More <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C3B5FD] to-blue-400">Conversations</span> Into Customers
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/60 mb-12 leading-relaxed max-w-2xl mx-auto font-medium"
          >
            Automatically capture, organize, and manage leads from every channel. Personalize across WhatsApp, Email, and Instagram.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20"
          >
            <Button size="lg" className="w-full sm:w-auto bg-[#C3B5FD] text-[#0a0510] hover:bg-[#b2a4f0] rounded-xl px-10 h-14 text-base font-bold transition-all shadow-[0_10px_40px_-10px_rgba(195,181,253,0.3)]">
              Start Free Trial
            </Button>
            <Button size="lg" variant="ghost" className="w-full sm:w-auto text-white font-bold h-14 px-10 border border-white/10 rounded-xl hover:bg-white/5 transition-all">
              Book a Demo
            </Button>
          </motion.div>

          {/* Kanban Board Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="relative w-full max-w-4xl mx-auto p-1 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 shadow-2xl backdrop-blur-3xl overflow-hidden"
          >
            <div className="bg-[#121221] rounded-[2.2rem] p-8 overflow-hidden">
              <div className="flex gap-6 text-left">
                {/* Column 1 */}
                <div className="flex-1 min-w-[280px]">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest">New Leads (12)</h4>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-white/30">+</Button>
                  </div>
                  <div className="space-y-4">
                    <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
                      <div className="flex justify-between items-start mb-3">
                        <p className="text-sm font-bold text-white">Rajesh Kumar</p>
                        <span className="text-[9px] px-2 py-1 rounded bg-blue-500/20 text-blue-400 font-black uppercase tracking-tighter">Hot Lead</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-white/40">
                         <Phone size={10} /> WhatsApp
                      </div>
                    </div>
                    <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 relative">
                      <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
                      <p className="text-sm font-bold text-white mb-3">Ankita Singh</p>
                      <div className="flex items-center gap-2 text-[10px] text-white/40">
                         <Mail size={10} /> Email
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="flex-1 min-w-[280px]">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest">Qualified (08)</h4>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-white/30">+</Button>
                  </div>
                  <div className="space-y-4 opacity-50">
                    <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 relative">
                      <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
                      <p className="text-sm font-bold text-white mb-3">Siddharth M.</p>
                      <div className="flex items-center gap-2 text-[10px] text-white/40">
                         <Instagram size={10} /> Instagram
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intelligent Lead Workflow Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <motion.h2 
              {...fadeIn}
              className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight"
            >
              Intelligent Lead Workflow
            </motion.h2>
            <motion.p 
              {...fadeIn}
              className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed font-medium"
            >
              Everything you need to turn a greeting into a transaction, powered by the fastest AI automation.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Automatic Lead Capture */}
            <motion.div 
              {...fadeIn}
              className="lg:col-span-2 p-10 rounded-[2.5rem] bg-[#161624] border border-white/5 relative overflow-hidden group"
            >
              <div className="flex flex-col h-full">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-8">
                  <UserPlus size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Automatic Lead Capture</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-10 font-medium">
                  Incoming queries from WhatsApp, Instagram, and Email automatically indexed. No manual entry required.
                </p>
                <div className="mt-auto flex items-center gap-6">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-white/60">
                    <Phone size={24} />
                  </div>
                  <div className="p-4 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-400">
                    <Mail size={24} />
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-white/60">
                    <Instagram size={24} />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* AI Lead Scoring */}
            <motion.div 
              {...fadeIn}
              className="p-10 rounded-[2.5rem] bg-[#161624] border border-white/5 flex flex-col"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-8">
                <Target size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">AI Lead Scoring</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-10 font-medium">
                Find the high-intent leads before the human ever reads the chat.
              </p>
              <div className="mt-auto flex items-center justify-center relative h-32">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-[spin_3s_linear_infinite]" />
                </div>
                <span className="text-2xl font-black text-white">92%</span>
              </div>
            </motion.div>

            {/* Kanban Pipeline */}
            <motion.div 
              {...fadeIn}
              className="p-10 rounded-[2.5rem] bg-[#161624] border border-white/5 flex flex-col"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-8">
                <Layout size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Kanban Pipeline</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-10 font-medium">
                Drag-and-drop lead stages with customized sales stages.
              </p>
              <div className="mt-auto space-y-3">
                 <div className="h-4 rounded-full bg-white/5 w-full" />
                 <div className="h-4 rounded-full bg-white/5 w-3/4" />
                 <div className="h-4 rounded-full bg-white/5 w-1/2 opacity-50" />
              </div>
            </motion.div>

            {/* Smart Reminders */}
            <motion.div 
              {...fadeIn}
              className="p-10 rounded-[2.5rem] bg-[#161624] border border-white/5 flex flex-col"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-8">
                <Bell size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Smart Reminders</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-10 font-medium">
                AI reminds you to follow up based on customer intent.
              </p>
              <div className="mt-auto p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
                  <Bell size={14} />
                </div>
                <span className="text-[10px] font-bold text-white">Follow-up: 10:00 AM</span>
              </div>
            </motion.div>

            {/* Smart Categorization */}
            <motion.div 
              {...fadeIn}
              className="p-10 rounded-[2.5rem] bg-[#161624] border border-white/5 flex flex-col"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-8">
                <Tag size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Smart Categorization</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-10 font-medium">
                Automated tags like &quot;Wholesale&quot; or &quot;High Intent&quot; based on context.
              </p>
              <div className="mt-auto flex flex-wrap gap-2">
                <span className="px-3 py-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest">Hot Lead</span>
                <span className="px-3 py-1.5 rounded-lg bg-white/5 text-white/40 text-[10px] font-black uppercase tracking-widest">Qualified</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Omnichannel History & Analytics */}
      <section className="py-24 relative bg-[#0a0510]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20">
            {/* Left: History */}
            <div className="lg:w-1/2 space-y-12">
               <motion.div {...fadeIn} className="p-8 rounded-[2.5rem] bg-[#161624] border border-white/5">
                  <div className="flex items-center gap-4 mb-8">
                     <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                        <Users size={20} />
                     </div>
                     <h3 className="text-2xl font-bold text-white">Omnichannel Thread History</h3>
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed mb-10 font-medium">
                    Stop switching tabs. View every email, WhatsApp message, and call log in a single unified timeline. Know exactly what your customer wants before you even say hello.
                  </p>
                  <ul className="space-y-4">
                    {[
                      'Cross-channel message syncing',
                      'Unified client interaction history',
                      'Continuous activity logs',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-bold text-white/80">
                        <div className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                          <CheckCircle2 size={12} />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
               </motion.div>

               <motion.div {...fadeIn} className="flex gap-4">
                  <div className="flex-1 p-8 rounded-[2rem] bg-[#161624] border border-white/5">
                     <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">Conversion Rate</p>
                     <p className="text-3xl font-black text-emerald-400 tracking-tight">+24%</p>
                  </div>
                  <div className="flex-1 p-8 rounded-[2rem] bg-[#161624] border border-white/5">
                     <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">Sales Cycle</p>
                     <p className="text-3xl font-black text-white tracking-tight">3.2 Days</p>
                  </div>
               </motion.div>
            </div>

            {/* Right: Analytics Graph */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="lg:w-1/2 p-10 rounded-[2.5rem] bg-[#161624] border border-white/5 flex flex-col h-full"
            >
               <h3 className="text-xl font-bold text-white mb-10">Advanced Lead Analytics</h3>
               <div className="flex-1 flex items-end gap-3 h-64">
                  {[40, 60, 30, 90, 70, 50, 80].map((h, i) => (
                    <div key={i} className="flex-1 bg-gradient-to-t from-blue-500/20 to-blue-400 rounded-t-lg transition-all hover:to-[#C3B5FD]" style={{ height: `${h}%` }} />
                  ))}
               </div>
               <div className="mt-6 pt-6 border-t border-white/5 flex justify-between text-[10px] font-black text-white/20 uppercase tracking-widest">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Qualify Leads Section */}
      <section className="py-24 relative bg-[#0a0510]">
        <div className="container mx-auto px-6 text-center">
          <motion.h2 
            {...fadeIn}
            className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight"
          >
            Qualify Leads Without Lifting a Finger
          </motion.h2>
          <motion.p 
            {...fadeIn}
            className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed font-medium mb-20"
          >
            Our AI engine works 24/7 to categorize prospects using industry-standard BANT frameworks.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div {...fadeIn} className="p-10 rounded-[2.5rem] bg-[#161624] border border-white/5 flex flex-col items-start text-left">
               <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6">
                 <RefreshCw size={20} />
               </div>
               <h4 className="text-xl font-bold text-white mb-4">Automated BANT Filtering</h4>
               <p className="text-white/40 text-sm font-medium mb-10">
                 Our AI automatically extracts Budget, Authority, Need, and Timeline from conversations to prioritize sales focus.
               </p>
               <div className="w-full space-y-4">
                  <div className="p-4 rounded-xl bg-[#0a0510] border border-blue-500/20 flex justify-between items-center">
                    <span className="text-xs font-bold text-white/80">SQL - Real estate investment</span>
                    <CheckCircle2 size={14} className="text-blue-400" />
                  </div>
               </div>
            </motion.div>

            <motion.div {...fadeIn} className="p-10 rounded-[2.5rem] bg-[#161624] border border-white/5 flex flex-col items-start text-left">
               <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6">
                 <Layers size={20} />
               </div>
               <h4 className="text-xl font-bold text-white mb-4">Structured Data Entry</h4>
               <p className="text-white/40 text-sm font-medium mb-10">
                 Summarizes chat context and automatically populates CRM data fields for perfect segmentation.
               </p>
               <div className="w-full p-4 rounded-xl bg-[#0a0510] border border-purple-500/20">
                  <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Industry: E-commerce</span>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Built for Teams Section */}
      <section className="py-24 relative bg-[#0a0510]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
             <motion.div {...fadeIn} className="lg:w-1/2 w-full p-1 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent border border-white/5 shadow-2xl">
               <div className="bg-[#121221] rounded-[2.2rem] p-8 overflow-hidden">
                  <div className="flex justify-between items-center mb-10">
                    <h4 className="text-sm font-black text-white/40 uppercase tracking-widest">Team Overview</h4>
                    <div className="flex -space-x-2">
                       {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-[#121221] bg-blue-500/20" />)}
                    </div>
                  </div>
                  <div className="space-y-6">
                     <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/5">
                        <div>
                          <p className="text-xs font-bold text-white">Siddharth Kapoor</p>
                          <p className="text-[10px] text-white/40">Last Action: Replied to WhatsApp</p>
                        </div>
                        <span className="text-[9px] px-2 py-1 rounded bg-blue-500/20 text-blue-400 font-bold uppercase">Assign Ticket</span>
                     </div>
                     <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/5 opacity-50">
                        <div>
                          <p className="text-xs font-bold text-white">Sara Jain</p>
                          <p className="text-[10px] text-white/40">Active in Unified Inbox</p>
                        </div>
                        <span className="text-[9px] px-2 py-1 rounded bg-white/5 text-white/40 font-bold uppercase">Assigned</span>
                     </div>
                  </div>
               </div>
             </motion.div>

             <motion.div {...fadeIn} className="lg:w-1/2">
                <h2 className="text-4xl font-extrabold text-white mb-10 tracking-tight leading-tight">
                  Built for Teams <br /> That Win
                </h2>
                <p className="text-white/50 text-lg mb-12 leading-relaxed font-medium">
                  Empower your sales force with a control room that prevents duplicates and ensures every lead is touched instantly.
                </p>
                <div className="space-y-8">
                  {[
                    { title: 'Smart Lead Assignment', desc: 'Automatically distribute leads to the best agent for the task.', icon: UserPlus },
                    { title: 'Collision Detection', desc: 'Alerts when two agents are responding to the same conversation.', icon: Zap },
                    { title: 'Private Internal Notes', desc: 'Collaborate behind the scenes without customers seeing.', icon: Lock },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                        <item.icon size={20} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                        <p className="text-xs text-white/40 leading-relaxed font-medium">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
             </motion.div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-24 relative bg-[#0a0510]">
        <div className="container mx-auto px-6 text-center">
          <motion.div {...fadeIn} className="max-w-4xl mx-auto p-16 rounded-[3rem] bg-[#161624] border border-white/5 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-black text-white/20 border border-white/10 -rotate-12">
                   SECURE
                </div>
             </div>
             <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mx-auto mb-8">
                <ShieldCheck size={24} />
             </div>
             <h2 className="text-3xl font-extrabold text-white mb-6">Your Data, Secured at Every Step</h2>
             <p className="text-white/40 text-base max-w-xl mx-auto mb-16 font-medium">
                We process millions of messages with military-grade security. Your customer trust is our highest priority.
             </p>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                   <Lock className="w-8 h-8 text-indigo-400 mx-auto mb-4" />
                   <h4 className="text-sm font-bold text-white mb-2">256-bit Encryption</h4>
                   <p className="text-[10px] text-white/30 font-medium">All data encrypted at rest and in transit.</p>
                </div>
                <div>
                   <Globe className="w-8 h-8 text-indigo-400 mx-auto mb-4" />
                   <h4 className="text-sm font-bold text-white mb-2">Role-based Access</h4>
                   <p className="text-[10px] text-white/30 font-medium">Fine-grained control over sensitive lead data.</p>
                </div>
                <div>
                   <ShieldCheck className="w-8 h-8 text-indigo-400 mx-auto mb-4" />
                   <h4 className="text-sm font-bold text-white mb-2">GDPR Compliant</h4>
                   <p className="text-[10px] text-white/30 font-medium">Strict adherence to global data privacy laws.</p>
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Enterprise Feature Grid */}
      <section className="py-24 relative bg-[#0a0510]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-extrabold text-white mb-4">Powerful Engineering for Scale</h2>
            <p className="text-white/40 text-lg font-medium">Robust infrastructure built to integrate seamlessly with your existing tech stack.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => {
              const feature = [
                { title: 'Custom API Access', desc: 'Full REST API documentation for custom integrations.', icon: RefreshCw },
                { title: 'CRM Sync', desc: 'Native sync for Salesforce, Hubspot, and Zoho.', icon: RefreshCw },
                { title: '24/7 Support', desc: 'Dedicated support for enterprise users.', icon: Headset },
                { title: 'Dedicated Manager', desc: 'Strategic account support for large teams.', icon: Users },
                { title: 'Custom Lead Fields', desc: 'Create unique data points for your leads.', icon: Layers },
                { title: 'Automated Lead Enrichment', desc: 'Auto-find LinkedIn profiles and details.', icon: Zap },
              ][i];
              return (
                <div key={feature.title} className="p-8 rounded-[2rem] bg-[#161624] border border-white/5 hover:border-blue-500/20 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-500/20 transition-all">
                    <feature.icon size={20} />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2">{feature.title}</h4>
                  <p className="text-xs text-white/40 leading-relaxed font-medium">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative bg-[#0a0510]">
        <div className="container mx-auto px-6">
          <motion.div 
            {...fadeIn}
            className="text-center"
          >
            <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-12 tracking-tight">
              Ready to Modernize <br /> Your Sales Pipeline?
            </h2>
            <p className="text-white/50 text-xl mb-12 font-medium max-w-2xl mx-auto">
              Join 2,000+ SMBs using SaarthiDesk to capture more revenue and automate their customer relationships.
            </p>
            <Button size="lg" className="bg-[#C3B5FD] text-[#0a0510] hover:bg-white rounded-2xl px-16 h-16 text-lg font-black transition-all shadow-2xl">
              Get Started Now
            </Button>
            <p className="text-white/30 text-sm mt-8 font-medium">
               No credit card required • 14 day free trial • Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, Bot, Database, CheckCircle2, Play, Sparkles, 
  FileText, Link as LinkIcon, Users, Quote, MessageSquare, 
  Clock, Shield, Settings, Calendar, UserCheck, ChevronDown, 
  Check, Loader2, Sparkle, Laptop, Smartphone, HelpCircle
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// Sleek FAQ item structure
interface FaqItemProps {
  question: string;
  answer: string;
}

function FaqAccordionItem({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-border/50 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left font-bold text-lg text-foreground hover:text-primary transition-colors py-2 outline-none"
      >
        <span>{question}</span>
        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40 mt-2" : "max-h-0"}`}>
        <p className="text-muted-foreground text-sm leading-relaxed pb-4">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function BookDemoPage() {
  // Form states
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [businessType, setBusinessType] = useState("ecommerce");
  const [teamSize, setTeamSize] = useState("2-10");
  const [volume, setVolume] = useState("");
  const [message, setMessage] = useState("");

  // UI Flow states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  
  // Interactive calendar mockup states
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [tourOpen, setTourOpen] = useState(false);

  // Generate calendar days for mockup (May 2026 as per local time context)
  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);
  const timeSlots = ["09:30 AM", "11:00 AM", "01:30 PM", "03:00 PM", "04:30 PM", "06:00 PM"];

  // Handle Form Submission & DB Lead Logging + Calendly Popup
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) {
      setSubmitError("Please provide both your Full Name and Email Address.");
      return;
    }
    setSubmitError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          businessName,
          businessType,
          teamSize,
          volume,
          message: message || `Selected Mockup Date: May ${selectedDate || "20"}, Slot: ${selectedTimeSlot || "11:00 AM"}`
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to submit demo request.");
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setSubmitError(err.message || "An error occurred while scheduling.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Construct URL for real Calendly redirect inside the popup iframe
  // Pre-fills Calendly standard details based on our personalized contact form inputs
  const getCalendlyIframeUrl = () => {
    const defaultCalendly = "https://calendly.com/saarthidesk/15min";
    const nameParam = encodeURIComponent(fullName);
    const emailParam = encodeURIComponent(email);
    const phoneParam = encodeURIComponent(phone);
    const bizParam = encodeURIComponent(businessName);
    
    return `${defaultCalendly}?hide_landing_page_details=1&hide_gdpr_banner=1&name=${nameParam}&email=${emailParam}&phone_number=${phoneParam}&a1=${bizParam}`;
  };

  return (
    <div className="min-h-screen bg-[#0a0510] text-foreground font-sans selection:bg-primary/30 relative">
      <Header />

      {/* Background ambient neon glow filters */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-[800px] right-1/4 w-[600px] h-[600px] bg-secondary/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      
      {/* 1. Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12 max-w-6xl">
          <div className="flex-1 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-xs font-semibold text-primary mb-6">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              EXCLUSIVE VIP ACCESS
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight text-white">
              See How AI Can Handle Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-300 to-cyan-300">Customer Conversations</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
              Automate up to 80% of routine inquiries across WhatsApp, Instagram, and website widgets. Witness our conversational AI answer your specific queries in a live, custom tailored demo environment.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a 
                href="#booking-panel"
                className="w-full sm:w-auto px-8 py-3.5 bg-primary text-primary-foreground rounded-xl font-bold text-base transition-all hover:opacity-90 text-center shadow-[0_0_30px_rgba(209,188,255,0.3)] hover:scale-[1.02]"
              >
                Book Your Demo
              </a>
              <button 
                onClick={() => setTourOpen(true)}
                className="w-full sm:w-auto px-8 py-3.5 bg-card/85 border border-border/80 text-foreground rounded-xl font-bold text-base transition-all hover:bg-muted/50 flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                <Play className="w-4 h-4 fill-white" /> Watch Product Tour
              </button>
            </div>
          </div>

          {/* Right Hero: Glassmorphic Inbox Mockup Dashboard */}
          <div className="flex-1 w-full max-w-xl relative">
            <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-2xl -z-10" />
            <div className="bg-card/70 backdrop-blur-xl rounded-2xl border border-border/50 overflow-hidden shadow-2xl transition-all hover:border-primary/30">
              
              {/* Fake Dashboard Top Header */}
              <div className="h-12 border-b border-border/50 flex items-center justify-between px-4 bg-muted/30">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="text-xs text-muted-foreground font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Live Simulator: Active
                </div>
              </div>

              {/* Chat Stream mockup */}
              <div className="p-6 space-y-4 bg-background/50 h-[320px] overflow-y-auto flex flex-col justify-end">
                {/* Incoming Client message */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-xs shrink-0">
                    C
                  </div>
                  <div className="bg-muted/80 backdrop-blur-lg text-foreground rounded-2xl rounded-tl-sm p-4 text-sm max-w-[80%] border border-border/50 shadow-sm">
                    Is the WhatsApp Business integration automated, and can I trigger custom drip campaigns?
                  </div>
                </div>

                {/* AI responding real-time */}
                <div className="flex gap-3 flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs shrink-0 shadow-lg shadow-primary/20">
                    🤖
                  </div>
                  <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm p-4 text-sm max-w-[80%] shadow-lg">
                    <div className="flex items-center gap-1.5 mb-1 text-[10px] font-bold tracking-wider uppercase opacity-90">
                      <Sparkle className="w-3 h-3 animate-spin" /> SAARTHI AI
                    </div>
                    Yes, absolutely! SaarthiDesk connects directly with the official WhatsApp Business Cloud API. You can automate replies, set up custom drip campaigns, and tag leads based on intent!
                  </div>
                </div>

                {/* Simulated CRM Tags updating */}
                <div className="flex justify-center py-2">
                  <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                    <Check className="w-3 h-3" /> INTENT CATEGORY: WhatsApp Automation Added
                  </div>
                </div>
              </div>

              {/* Mockup footer */}
              <div className="p-4 border-t border-border/50 bg-muted/20 flex justify-between items-center text-xs">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-primary" /> Auto-reply time: 0.8s
                </span>
                <span className="text-primary font-bold">SaarthiDesk CRM v1.4</span>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 2. Bento Grid Features Section ("What You'll See") */}
      <section className="py-20 border-t border-border/50 bg-background/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What You&apos;ll Witness in the Live Demo
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We tailor each demo specifically to your business niche. Here are the core modules our customer experience experts will walkthrough with you:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Unified Inbox Card */}
            <div className="p-8 bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl hover:border-primary/40 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center mb-6">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">1. Unified Inbox Workspace</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Connect WhatsApp, Instagram, Email, and live web chats in one streamlined grid interface. Never lose track of a hot client query.
              </p>
            </div>

            {/* AI Auto Replies Card */}
            <div className="p-8 bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl hover:border-primary/40 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">2. AI Auto-Replies</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Watch the agent generate context-aware, hyper-personalized responses using custom trained semantic similarity data models.
              </p>
            </div>

            {/* WhatsApp Automation Card */}
            <div className="p-8 bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl hover:border-primary/40 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
                <Sparkle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">3. WhatsApp Campaigns</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Demonstrate bulk broadcasting, utility messages, automated appointment reminders, and direct marketing sequences.
              </p>
            </div>

            {/* Lead Management Card */}
            <div className="p-8 bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl hover:border-primary/40 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-6">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">4. Automatic Lead Enrichment</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Watch the system capture custom fields, score lead warmness index, assign priority tags, and record logs automatically inside CRM.
              </p>
            </div>

            {/* Knowledge Base Card */}
            <div className="p-8 bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl hover:border-primary/40 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-6">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">5. AI Agent Training</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Upload PDFs, sync websites via real web crawling, and immediately observe the AI answer brand-specific details with absolute precision.
              </p>
            </div>

            {/* Analytics Card */}
            <div className="p-8 bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl hover:border-primary/40 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">6. Advanced SLA Analytics</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Examine response dashboards, auto-resolution rates, CSAT reports, agent performance stats, and peak conversation loads.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Stats & Partners Banner */}
      <section className="py-12 border-y border-border/50 bg-[#0d0715]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8 border-b border-border/30 pb-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-white">The Automation Numbers</h3>
              <p className="text-muted-foreground text-xs uppercase tracking-wider mt-1">Real impact reported by our scaling beta users</p>
            </div>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              <div className="text-center">
                <div className="text-3xl font-extrabold text-primary">0.8s</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Avg AI Response Speed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-extrabold text-indigo-400">82%</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">First-Contact Resolution</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-extrabold text-cyan-400">4.9/5</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Average CSAT rating</div>
              </div>
            </div>
          </div>

          <p className="text-center text-[10px] font-bold text-muted-foreground tracking-[0.2em] uppercase mb-6">
            Trusted by customer operations leaders across sectors:
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-60">
            <span className="font-serif italic text-white text-lg tracking-wider hover:text-primary transition-colors hover:opacity-100 cursor-default">LOGO_CLINIC</span>
            <span className="font-bold text-white text-lg tracking-widest hover:text-indigo-400 transition-colors hover:opacity-100 cursor-default">SPA_HUB</span>
            <span className="font-black text-white text-base uppercase tracking-widest hover:text-emerald-400 transition-colors hover:opacity-100 cursor-default">FIT_TRANSFORM</span>
            <span className="font-mono text-white text-sm tracking-wider hover:text-cyan-400 transition-colors hover:opacity-100 cursor-default">AUTO_EXPORT</span>
            <span className="font-sans font-bold text-white text-lg tracking-tight hover:text-purple-400 transition-colors hover:opacity-100 cursor-default">GLAM_SALON</span>
          </div>
        </div>
      </section>

      {/* 4. Dual Column Personalization Form & Scheduling Panel */}
      <section id="booking-panel" className="py-20 relative">
        <div className="container mx-auto px-4 max-w-6xl">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Schedule & Personalize Your Demo
            </h2>
            <p className="text-muted-foreground text-sm">
              Provide details about your business volume so our expert specialists can customize a functional sandbox dashboard for you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Contact & Personalization Form */}
            <div className="lg:col-span-6 bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6 md:p-8 relative">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs">1</span>
                Personalize Your Setup
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Error Banner */}
                {submitError && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-xs text-red-400">
                    {submitError}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground uppercase mb-1.5">Full Name *</label>
                    <input 
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Amit Sharma"
                      className="w-full px-4 py-2.5 bg-background/50 border border-border/80 rounded-lg focus:border-primary text-sm text-white focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground uppercase mb-1.5">Business Name</label>
                    <input 
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="e.g. Velvet & Co."
                      className="w-full px-4 py-2.5 bg-background/50 border border-border/80 rounded-lg focus:border-primary text-sm text-white focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground uppercase mb-1.5">Work Email *</label>
                    <input 
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. amit@velvet.in"
                      className="w-full px-4 py-2.5 bg-background/50 border border-border/80 rounded-lg focus:border-primary text-sm text-white focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground uppercase mb-1.5">Phone Number</label>
                    <input 
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-4 py-2.5 bg-background/50 border border-border/80 rounded-lg focus:border-primary text-sm text-white focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground uppercase mb-1.5">Business Type</label>
                    <select 
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      className="w-full px-4 py-2.5 bg-muted/80 border border-border/80 rounded-lg focus:border-primary text-sm text-white focus:outline-none transition-all"
                    >
                      <option value="ecommerce">E-commerce / Retail</option>
                      <option value="clinics">Healthcare / Clinics</option>
                      <option value="salons">Wellness / Salons</option>
                      <option value="gyms">Gyms & Fitness</option>
                      <option value="coaching">Coaching / EdTech</option>
                      <option value="real-estate">Real Estate / Agents</option>
                      <option value="agencies">Marketing / Agencies</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground uppercase mb-1.5">Team Size</label>
                    <select 
                      value={teamSize}
                      onChange={(e) => setTeamSize(e.target.value)}
                      className="w-full px-4 py-2.5 bg-muted/80 border border-border/80 rounded-lg focus:border-primary text-sm text-white focus:outline-none transition-all"
                    >
                      <option value="1">1 Person Shop</option>
                      <option value="2-10">2 - 10 people</option>
                      <option value="11-50">11 - 50 people</option>
                      <option value="50+">50+ people</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase mb-1.5">Monthly Conversation Volume</label>
                  <input 
                    type="text"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    placeholder="e.g. ~5,000 inquiries / month"
                    className="w-full px-4 py-2.5 bg-background/50 border border-border/80 rounded-lg focus:border-primary text-sm text-white focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase mb-1.5">What challenges can we help you solve?</label>
                  <textarea 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    placeholder="e.g. Want to automate support on WhatsApp Business and route complicated questions to agents..."
                    className="w-full px-4 py-2.5 bg-background/50 border border-border/80 rounded-lg focus:border-primary text-sm text-white focus:outline-none transition-all resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-xl transition-all shadow-lg hover:opacity-95 text-center flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Saving details...
                    </>
                  ) : (
                    <>
                      Request Access & Book Demo <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                <p className="text-[10px] text-muted-foreground text-center mt-2 leading-relaxed">
                  By clicking above, you agree to record details in our database. We will immediately proceed to Calendly configuration.
                </p>
              </form>
            </div>

            {/* Right Column: Dynamic Scheduler Picker Mockup */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              
              <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6 relative">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs">2</span>
                  Select Preferred Date & Time
                </h3>

                {/* Mockup Interactive Calendar */}
                <div className="bg-background/40 border border-border/40 rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-between mb-4 border-b border-border/30 pb-2">
                    <span className="text-sm font-bold text-white">May 2026</span>
                    <span className="text-xs text-muted-foreground">Standard timezone (IST)</span>
                  </div>

                  <div className="grid grid-cols-7 gap-1.5 text-center text-xs text-muted-foreground font-bold mb-2">
                    <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                  </div>

                  <div className="grid grid-cols-7 gap-1.5 text-center">
                    {/* Render standard visual calendar grids */}
                    {calendarDays.map((day) => {
                      const isSelected = selectedDate === day;
                      const isAvailable = day > 18; // Mock available dates in current period
                      return (
                        <button
                          key={day}
                          onClick={() => isAvailable && setSelectedDate(day)}
                          disabled={!isAvailable}
                          className={`py-1.5 rounded-md font-medium text-xs transition-all ${
                            isSelected 
                              ? "bg-primary text-primary-foreground font-bold scale-105 shadow-md shadow-primary/20" 
                              : isAvailable 
                                ? "bg-muted/30 text-white hover:bg-primary/20 hover:text-white" 
                                : "text-muted-foreground/30 cursor-not-allowed"
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slot Picker */}
                {selectedDate && (
                  <div className="mb-2 transition-all duration-300">
                    <p className="text-xs font-bold text-muted-foreground uppercase mb-3">Available Slots for May {selectedDate}:</p>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((slot) => {
                        const isSelectedSlot = selectedTimeSlot === slot;
                        return (
                          <button
                            key={slot}
                            onClick={() => setSelectedTimeSlot(slot)}
                            className={`py-2 px-1 text-center rounded-lg text-xs font-semibold border transition-all ${
                              isSelectedSlot
                                ? "bg-primary border-primary text-primary-foreground shadow-md shadow-primary/10"
                                : "bg-background/50 border-border/80 text-foreground hover:border-primary/50"
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {!selectedDate && (
                  <div className="py-8 text-center text-sm text-muted-foreground flex flex-col items-center justify-center gap-2 border border-dashed border-border/40 rounded-xl bg-background/20">
                    <Calendar className="w-8 h-8 text-muted-foreground/40 animate-pulse" />
                    <span>Select an available calendar date to view slots</span>
                  </div>
                )}

              </div>

              {/* Specialist Testimonial Card */}
              <div className="bg-gradient-to-r from-card/80 to-[#12091c] border border-border/50 rounded-2xl p-6 flex items-center gap-4 transition-all hover:border-primary/30">
                <div className="w-16 h-16 rounded-full bg-slate-800 overflow-hidden shrink-0 border-2 border-primary/30 shadow-lg relative">
                  {/* Visual Avatar fallback (high quality abstract persona) */}
                  <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                    PS
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Priya Sharma</h4>
                  <p className="text-xs text-primary font-semibold mb-1">Product Specialist, SaarthiDesk</p>
                  <p className="text-xs text-muted-foreground italic leading-relaxed">
                    &quot;Our personalized demos let you see real text-scraping and custom CRM agents in action using your actual business website details!&quot;
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 5. FAQs Accordion */}
      <section className="py-20 bg-background/20 border-t border-border/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-2">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-sm">Everything you need to know before booking your conversation demonstration.</p>
          </div>

          <div className="bg-card/30 backdrop-blur-md rounded-2xl border border-border/50 p-6 md:p-8">
            <FaqAccordionItem 
              question="How long does the demonstration session take?"
              answer="A standard custom product demonstration lasts between 15 and 20 minutes. We focus exclusively on your primary support challenges, illustrating how to crawl your website, set up replies, and link WhatsApp Business configurations in real-time."
            />
            <FaqAccordionItem 
              question="Does SaarthiDesk support the official WhatsApp Business Cloud API?"
              answer="Yes! SaarthiDesk is an authorized Meta Business Solution Partner. We deploy your verified WhatsApp Business profiles using the official Cloud API, supporting bulk messaging, custom templates, green verified badges, and active interactive quick-reply menus."
            />
            <FaqAccordionItem 
              question="Can we customize or train the AI using our specific domain documentation?"
              answer="Absolutely. You can import documents (PDFs, docs), sync public site URLs, or write internal brand instructions in free-form markdown. The AI learns your support rules instantly, preserving brand guidelines and escalating edge cases cleanly to human agents."
            />
            <FaqAccordionItem 
              question="Are there setup fees or long-term contracts?"
              answer="No setup fees whatsoever! You can start on our 14-day free trial or select from our month-to-month subscription tiers (Starter, Pro, Growth). Demos are completely free, and we also provide a dedicated onboarding specialist for Pro and Growth clients."
            />
          </div>
        </div>
      </section>

      {/* 6. Call to Action Banner Panel */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="relative p-8 md:p-12 bg-gradient-to-br from-primary/20 via-indigo-950/20 to-card border border-primary/30 rounded-3xl overflow-hidden text-center shadow-[0_0_50px_rgba(209,188,255,0.1)]">
            <div className="absolute inset-0 bg-muted/5 pointer-events-none mix-blend-overlay" />
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              Ready to automate customer conversations?
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto mb-8">
              Witness how custom CRM pipelines and AI receipt templates increase lead capture speeds. Reserve your session or launch your workspace immediately!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="#booking-panel"
                className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl text-sm transition-all hover:opacity-95 shadow-md"
              >
                Book My Free Demo
              </a>
              <Link 
                href="/register"
                className="px-8 py-3 bg-secondary/10 border border-border/80 text-white font-bold rounded-xl text-sm transition-all hover:bg-secondary/20"
              >
                Start 14-Day Free Trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. DYNAMIC CALENDLY OVERLAY IFRAME MODAL */}
      {isSubmitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
          <div className="bg-card border border-border/80 w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl animate-in fade-in-50 zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-border/50 bg-muted/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Lead Saved! Schedule on Calendly</h4>
                  <p className="text-xs text-muted-foreground">Select a date and time slot below to finalize</p>
                </div>
              </div>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="text-xs text-muted-foreground hover:text-white bg-muted/50 px-3 py-1 rounded-lg border border-border/60 transition-all font-semibold"
              >
                Close Window
              </button>
            </div>

            {/* Calendly Inline Widget Iframe Content */}
            <div className="bg-white p-2 h-[550px] relative">
              <iframe 
                src={getCalendlyIframeUrl()}
                className="w-full h-full border-0"
                title="Calendly Scheduler"
              />
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-border/50 bg-muted/30 flex justify-between items-center text-xs">
              <span className="text-muted-foreground">Logged prospect: <strong className="text-white">{email}</strong></span>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="text-xs text-primary font-bold hover:underline"
              >
                Skip scheduling & go to landing page
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 8. PRODUCT TOUR MODAL */}
      {tourOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-md">
          <div className="bg-card border border-border/80 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl p-6 relative">
            <button 
              onClick={() => setTourOpen(false)}
              className="absolute top-4 right-4 text-xs text-muted-foreground hover:text-white bg-muted/80 border border-border/80 rounded-lg px-3 py-1"
            >
              Close Tour
            </button>
            
            <h3 className="text-xl font-bold text-white mb-4">SaarthiDesk Core Tour Simulator</h3>
            <p className="text-muted-foreground text-sm mb-6">Take a quick visual look at our workspace features before booking a call!</p>
            
            {/* Tour Slides Carousel simulation */}
            <div className="aspect-video w-full rounded-2xl bg-muted/50 border border-border/50 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
              <div className="absolute top-4 left-4 flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
              </div>

              <Laptop className="w-16 h-16 text-primary mb-4 animate-bounce" />
              <h4 className="text-lg font-bold text-white mb-2">Simulated Live Dashboard Workspace</h4>
              <p className="text-xs text-muted-foreground max-w-sm mb-4">
                Watch how DMs and WhatsApp comments are automatically grouped. In the real demo, we will show you live replies generated by your website data.
              </p>
              
              <div className="flex gap-2">
                <button className="px-4 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-lg hover:opacity-90">
                  Next slide
                </button>
                <button 
                  onClick={() => { setTourOpen(false); }}
                  className="px-4 py-1.5 bg-muted text-foreground text-xs font-bold rounded-lg border border-border/80"
                >
                  Schedule Demo Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  Calendar, 
  MessageSquare, 
  Bell, 
  Search, 
  Inbox, 
  FileText, 
  Sparkles, 
  ClipboardList,
  CheckCircle2,
  Bot,
  Shield,
  Clock,
  TrendingUp,
  UserCheck,
  Star,
  Tag,
  Megaphone,
  Users,
  Zap,
  Scissors
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/ChatWidget";

export default function SalonsSolutionPage() {
  return (
    <div className="min-h-screen bg-[#0a0c10] text-foreground font-sans selection:bg-primary/30">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-20 md:pt-32 md:pb-24 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center gap-16">
            
            <div className="flex-1 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary mb-8 tracking-wider uppercase">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                The Future of Salon Management
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-white">
                AI Customer <br />
                Communication For <br />
                <span className="text-primary italic">Modern Salons</span>
              </h1>
              
              <p className="text-lg text-white/60 mb-10 max-w-xl leading-relaxed">
                Automate bookings, customer support, WhatsApp replies, and follow-ups with AI. Scale your luxury experience without hiring more desk staff.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-5 mb-12">
                <Link 
                  href="/demo" 
                  className="w-full sm:w-auto px-10 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg transition-all hover:bg-primary/90 text-center shadow-[0_0_30px_rgba(209,188,255,0.2)]"
                >
                  Book Demo
                </Link>
                <Link 
                  href="/register" 
                  className="w-full sm:w-auto px-10 py-4 bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-xl font-bold text-lg transition-all hover:bg-white/10 text-center"
                >
                  Start Free Trial
                </Link>
              </div>

              <div className="flex items-center gap-4">
                 <div className="flex -space-x-3">
                    {[1, 2, 3].map(i => (
                       <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0a0c10] bg-slate-700 overflow-hidden relative">
                          <Image src={`https://i.pravatar.cc/100?u=salon_trust_${i}`} alt="Avatar" fill className="object-cover" />
                       </div>
                    ))}
                 </div>
                 <p className="text-xs font-medium text-white/40 italic">
                    <span className="text-white font-bold not-italic">500+ Luxury Salons</span> already trust SaarthiDesk
                 </p>
              </div>
            </div>

            {/* Hero Mockup (Dashboard View) */}
            <div className="flex-1 w-full max-w-2xl relative">
              <div className="bg-[#14171c] rounded-[2.5rem] border border-white/10 p-8 shadow-2xl relative overflow-hidden group">
                <div className="flex items-center gap-1.5 mb-8">
                   <div className="w-2.5 h-2.5 rounded-full bg-rose-500/50"></div>
                   <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50"></div>
                   <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50"></div>
                   <span className="ml-4 text-[10px] text-white/20 font-bold tracking-widest uppercase">SaarthiDesk Dashboard • Elevate Salon Spa</span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                   <div className="bg-[#0a0c10] rounded-2xl p-4 border border-white/5">
                      <div className="text-[9px] text-white/30 font-bold uppercase tracking-widest mb-1">Total Bookings</div>
                      <div className="text-xl font-bold text-white">1,284</div>
                      <div className="text-[9px] text-emerald-400 mt-1">+12% from last month</div>
                   </div>
                   <div className="bg-[#0a0c10] rounded-2xl p-4 border border-white/5">
                      <div className="text-[9px] text-white/30 font-bold uppercase tracking-widest mb-1">AI Reply Rate</div>
                      <div className="text-xl font-bold text-white">94%</div>
                      <div className="text-[9px] text-white/40 mt-1">0.5s avg. response</div>
                   </div>
                   <div className="bg-[#0a0c10] rounded-2xl p-4 border border-white/5">
                      <div className="text-[9px] text-white/30 font-bold uppercase tracking-widest mb-1">Revenue Up</div>
                      <div className="text-xl font-bold text-white">₹4.2L</div>
                      <div className="text-[9px] text-primary mt-1 font-bold">Via automated up-sells</div>
                   </div>
                </div>

                <div className="space-y-4">
                   <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden relative border border-white/10">
                         <Image src="https://i.pravatar.cc/100?u=customer_salon" alt="Customer" fill className="object-cover" />
                      </div>
                      <div className="bg-white/5 rounded-2xl rounded-tl-none p-4 text-[11px] text-white/80 max-w-[80%] border border-white/5">
                         Hi! Can I book a hair coloring for tomorrow at 2 PM?
                      </div>
                   </div>
                   <div className="flex items-start gap-4 flex-row-reverse">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center border border-white/10 shadow-lg shadow-primary/20">
                         <Bot className="w-4 h-4 text-foreground" />
                      </div>
                      <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-none p-4 text-[11px] max-w-[80%] shadow-xl shadow-primary/10 relative">
                         Of course! Our Master Colorist Priya is available. Would you like to add an Olaplex treatment for an extra shine? ✨
                         <div className="mt-3 flex gap-2">
                            <div className="px-2 py-1 bg-white/10 rounded-md text-[9px] font-bold border border-white/20">Suggesting Upsell</div>
                            <div className="px-2 py-1 bg-white/10 rounded-md text-[9px] font-bold border border-white/20">Checking Availability</div>
                         </div>
                         <div className="absolute -right-2 top-0 w-5 h-5 bg-primary rounded-full flex items-center justify-center border-2 border-[#14171c]">
                            <Zap className="w-3 h-3" />
                         </div>
                      </div>
                   </div>
                </div>
              </div>

              {/* Background Glows */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 rounded-full blur-[120px] -z-10"></div>
            </div>

          </div>
        </section>

        {/* Features Section */}
        <section className="py-32 relative">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight leading-tight">Concierge-Grade AI Features</h2>
              <p className="text-white/40 text-lg leading-relaxed">Designed to integrate seamlessly into high-end salon operations, managing everything from first contact to client loyalty.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              
              {/* Card 1: AI Booking Assistant (Wide) */}
              <div className="lg:col-span-2 bg-[#14171c] rounded-[2rem] border border-white/5 p-10 hover:border-primary/30 transition-all group relative overflow-hidden flex flex-col justify-between min-h-[350px]">
                <div className="absolute inset-0 z-0">
                   <Image 
                      src="/luxury_salon_interior_blurred_1778941593750.png" 
                      alt="Salon Interior" 
                      fill 
                      className="object-cover opacity-20 group-hover:scale-105 transition-transform duration-700" 
                   />
                   <div className="absolute inset-0 bg-gradient-to-r from-[#14171c] via-[#14171c]/80 to-transparent"></div>
                </div>
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-8 border border-primary/20 group-hover:scale-110 transition-all">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">AI Booking Assistant</h3>
                  <p className="text-base text-white/40 leading-relaxed max-w-sm">
                    Intelligent conversational booking that understands treatments, duration, and stylist preferences.
                  </p>
                </div>

                <div className="relative z-10 w-full max-w-md bg-[#0a0c10]/60 backdrop-blur-md rounded-2xl p-5 border border-white/10 mt-8">
                   <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Luxury Hair Treatment</span>
                      <span className="text-[10px] font-bold text-primary">90 MINS</span>
                   </div>
                   <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[90%] rounded-full shadow-[0_0_10px_rgba(209,188,255,0.5)]"></div>
                   </div>
                   <div className="mt-3 text-[9px] text-white/20 font-medium">Confirmed with: Stylist Rhea</div>
                </div>
              </div>

              {/* Card 2: WhatsApp Support */}
              <div className="bg-[#14171c] rounded-[2rem] border border-white/5 p-10 hover:border-blue-400/30 transition-all group relative overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-400/10 text-blue-400 flex items-center justify-center mb-8 border border-blue-400/20 group-hover:scale-110 transition-all">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">WhatsApp Support</h3>
                  <p className="text-sm text-white/40 leading-relaxed">
                    Engage clients where they are. 24/7 automated responses for every query.
                  </p>
                </div>
                
                <div className="mt-10 space-y-3">
                   <div className="bg-white/5 rounded-xl p-3 text-[10px] text-white/60 ml-auto max-w-[80%] border border-white/5">
                      Price for Balayage?
                   </div>
                   <div className="bg-blue-400/10 rounded-xl p-3 text-[10px] text-blue-400 max-w-[80%] border border-blue-400/20">
                      Starts from ₹4,000. Interested?
                   </div>
                </div>
              </div>

              {/* Card 3: Automated Reminders */}
              <div className="bg-[#14171c] rounded-[2rem] border border-white/5 p-10 hover:border-amber-500/30 transition-all group relative overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-8 border border-amber-500/20 group-hover:scale-110 transition-all">
                    <Bell className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Automated Reminders</h3>
                  <p className="text-sm text-white/40 leading-relaxed">
                    Slash no-shows with elegant, timed reminders and confirmation requests.
                  </p>
                </div>
                <div className="mt-10">
                   <div className="bg-[#0a0c10] rounded-xl p-4 border border-white/5 flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                         <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      </div>
                      <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Confirmation Sent</span>
                   </div>
                </div>
              </div>

              {/* Card 4: Promotion Campaigns */}
              <div className="bg-[#14171c] rounded-[2rem] border border-white/5 p-10 hover:border-primary/30 transition-all group relative overflow-hidden flex flex-col justify-between">
                <div className="flex justify-between items-start mb-6">
                   <div className="w-10 h-10 rounded-xl bg-white/5 text-white/40 flex items-center justify-center border border-white/5">
                      <Megaphone className="w-5 h-5" />
                   </div>
                   <div className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">+245% Reach</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Promotion Campaigns</h3>
                
                <div className="mt-4 flex items-end gap-1.5 h-20">
                   {[30, 45, 60, 80, 50, 40].map((h, i) => (
                      <div 
                         key={i} 
                         className={`flex-1 rounded-sm transition-all duration-500 ${i === 3 ? 'bg-primary' : 'bg-white/10'}`} 
                         style={{ height: `${h}%` }}
                      ></div>
                   ))}
                </div>
                <div className="mt-3 text-center">
                   <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Festival Offer ROI Tracking</span>
                </div>
              </div>

              {/* Card 5: AI Knowledge Base & Team Scheduling (Vertical Column Stack) */}
              <div className="space-y-6">
                 {/* Knowledge Base */}
                 <div className="bg-[#14171c] rounded-[2rem] border border-white/5 p-8 hover:border-purple-400/30 transition-all group">
                    <h4 className="text-sm font-bold text-white mb-4">AI Knowledge Base</h4>
                    <div className="flex flex-wrap gap-2">
                       {['Opening Hours', 'Service Menu', 'Membership', 'Location'].map(tag => (
                          <div key={tag} className="px-3 py-1.5 bg-primary/10 rounded-full border border-primary/20 text-[9px] font-bold text-primary">
                             {tag}
                          </div>
                       ))}
                    </div>
                 </div>
                 {/* Team Scheduling */}
                 <div className="bg-[#14171c] rounded-[2rem] border border-white/5 p-8 hover:border-primary/30 transition-all group">
                    <h4 className="text-sm font-bold text-white mb-6">Team Scheduling</h4>
                    <div className="space-y-4">
                       <div className="flex justify-between items-center">
                          <span className="text-[11px] text-white/40 font-medium">Rohan (Stylist)</span>
                          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-md border border-emerald-400/20">Available</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="text-[11px] text-white/40 font-medium">Simran (Stylist)</span>
                          <span className="text-[10px] font-bold text-rose-400 bg-rose-400/10 px-2 py-0.5 rounded-md border border-rose-400/20">Booked</span>
                       </div>
                    </div>
                 </div>
              </div>

            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 bg-[#0a0c10] border-y border-white/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
               <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Success in Numbers</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-6xl mx-auto">
              <div className="text-center space-y-4">
                 <div className="text-6xl font-black text-white tracking-tighter">3.5x</div>
                 <p className="text-sm text-white/40 font-medium">Average Booking Growth</p>
              </div>
              <div className="text-center space-y-4">
                 <div className="text-6xl font-black text-white tracking-tighter">85%</div>
                 <p className="text-sm text-white/40 font-medium">Support Overheads Saved</p>
              </div>
              <div className="text-center space-y-4">
                 <div className="text-6xl font-black text-white tracking-tighter">24/7</div>
                 <p className="text-sm text-white/40 font-medium">Automated Engagement</p>
              </div>
              <div className="text-center space-y-4">
                 <div className="text-6xl font-black text-white tracking-tighter">98%</div>
                 <p className="text-sm text-white/40 font-medium">Client Satisfaction</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-4 bg-[#0a0c10]">
          <div className="container mx-auto max-w-6xl bg-gradient-to-br from-[#1a1d23] to-[#0a0c10] rounded-[3rem] p-16 md:p-24 text-center relative overflow-hidden border border-white/5 shadow-2xl">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] -mr-64 -mt-64"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[150px] -ml-64 -mb-64"></div>
            
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 relative z-10 tracking-tight leading-[1.1]">
              Ready to Elevate Your Salon?
            </h2>
            <p className="text-white/40 text-xl mb-14 max-w-3xl mx-auto relative z-10 leading-relaxed">
              Join the league of premium salons using AI to deliver exceptional customer journeys while maximizing efficiency.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
              <Link 
                href="/demo" 
                className="px-12 py-5 bg-primary text-primary-foreground rounded-2xl font-black text-xl hover:bg-primary/90 transition-all shadow-[0_20px_40px_rgba(209,188,255,0.15)] flex items-center justify-center gap-3"
              >
                Request a Personalized Demo
              </Link>
              <Link 
                href="/pricing" 
                className="px-12 py-5 bg-white/5 text-white border border-white/10 rounded-2xl font-bold text-xl hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}

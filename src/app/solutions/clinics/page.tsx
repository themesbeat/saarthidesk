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
  Tag
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/ChatWidget";

export default function ClinicsSolutionPage() {
  return (
    <div className="min-h-screen bg-[#0a0c10] text-foreground font-sans selection:bg-primary/30">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-20 md:pt-32 md:pb-24 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center gap-16">
            
            <div className="flex-1 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary mb-8 tracking-wider">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                AI-POWERED PATIENT OPS
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-white">
                Your AI Receptionist For <br />
                <span className="text-primary">Modern Clinics</span>
              </h1>
              
              <p className="text-lg text-white/60 mb-10 max-w-xl leading-relaxed">
                Automate patient inquiries, appointment booking, follow-ups, and WhatsApp communication using high-fidelity clinical AI.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-5">
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
            </div>

            {/* Hero Mockup */}
            <div className="flex-1 w-full max-w-2xl relative">
              <div className="bg-[#14171c] rounded-[2.5rem] border border-white/10 p-6 shadow-2xl relative overflow-hidden group">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Calendar View */}
                  <div className="bg-[#0a0c10] rounded-3xl p-5 border border-white/5 space-y-5">
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <span className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em]">Calendar</span>
                      <Calendar className="w-4 h-4 text-white/20" />
                    </div>
                    <div className="space-y-3">
                      <div className="p-3 bg-primary/10 rounded-xl border-l-4 border-primary">
                        <div className="text-[11px] text-primary font-bold mb-1">09:00 - Dental Cleaning</div>
                        <div className="text-[10px] text-white/40">Priya S.</div>
                      </div>
                      <div className="p-3 bg-amber-500/10 rounded-xl border-l-4 border-amber-500/40">
                        <div className="text-[11px] text-amber-400 font-bold mb-1">11:30 - Consultation</div>
                        <div className="text-[10px] text-white/40">Rahul M.</div>
                      </div>
                      <div className="h-16 border-2 border-dashed border-white/5 rounded-2xl flex items-center justify-center">
                         <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                            <span className="text-white/20 text-lg">+</span>
                         </div>
                      </div>
                    </div>
                  </div>

                  {/* AI Agent Chat */}
                  <div className="bg-[#0a0c10] rounded-3xl overflow-hidden border border-white/5 flex flex-col">
                    <div className="p-4 border-b border-white/5 bg-primary/5 flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                        <Bot className="w-4 h-4 text-foreground" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-white block">AI Agent</span>
                        <span className="text-[9px] text-emerald-400 font-medium flex items-center gap-1">
                           <div className="w-1 h-1 rounded-full bg-emerald-400"></div> Online
                        </span>
                      </div>
                    </div>
                    <div className="p-5 space-y-4 flex-1">
                      <div className="bg-white/5 rounded-2xl rounded-tl-none p-3 text-[10px] text-white/80 max-w-[85%] border border-white/5">
                        Hello, I'd like to book an appointment for tomorrow.
                      </div>
                      <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-none p-3 text-[10px] ml-auto max-w-[85%] shadow-lg shadow-primary/10">
                        Sure! We have slots at 10 AM and 2 PM tomorrow. Which one works for you?
                      </div>
                      <div className="bg-white/5 rounded-2xl rounded-tl-none p-3 text-[10px] text-white/80 max-w-[85%] border border-white/5">
                         10 AM please.
                      </div>
                      <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-none p-3 text-[10px] ml-auto max-w-[85%] shadow-lg shadow-primary/10">
                        Confirmed! You're booked for 10:00 AM. I've sent a reminder.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Stats Row (In Mockup) */}
                <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Daily Efficiency</div>
                      <div className="text-sm font-bold text-white">+32% Booking Rate</div>
                    </div>
                  </div>
                  <div className="w-32 h-10 bg-white/5 rounded-xl border border-white/5 relative overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
                     <div className="flex items-center justify-center h-full gap-2">
                        <div className="w-1 h-4 bg-primary/40 rounded-full"></div>
                        <div className="w-1 h-6 bg-primary/60 rounded-full"></div>
                        <div className="w-1 h-3 bg-primary/20 rounded-full"></div>
                        <div className="w-1 h-5 bg-primary/80 rounded-full"></div>
                        <div className="w-1 h-4 bg-primary/50 rounded-full"></div>
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
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight">Intelligent Solutions for Busy Clinics</h2>
              <p className="text-white/40 text-lg">Everything you need to scale your patient engagement without adding staff.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              
              {/* Card 1: AI Appointment Booking (Span 2) */}
              <div className="lg:col-span-2 bg-[#14171c] rounded-[2rem] border border-white/5 p-10 hover:border-primary/30 transition-all group relative overflow-hidden flex flex-col justify-between min-h-[280px]">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-8 border border-primary/20 group-hover:scale-110 transition-all">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">AI Appointment Booking</h3>
                  <p className="text-base text-white/40 leading-relaxed max-w-md">
                    Synchronized with clinical calendars. Zero overlap, total control.
                  </p>
                </div>
              </div>

              {/* Card 2: 24/7 WhatsApp */}
              <div className="bg-[#14171c] rounded-[2rem] border border-white/5 p-10 hover:border-blue-400/30 transition-all group relative overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-400/10 text-blue-400 flex items-center justify-center mb-8 border border-blue-400/20 group-hover:scale-110 transition-all">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">24/7 WhatsApp</h3>
                  <p className="text-base text-white/40 leading-relaxed">
                    Instant automated replies for queries.
                  </p>
                </div>
              </div>

              {/* Card 3: Proactive Reminders (Row Span 2) */}
              <div className="lg:row-span-2 bg-[#14171c] rounded-[2rem] border border-primary/20 p-10 hover:border-primary/40 transition-all group relative overflow-hidden flex flex-col justify-between shadow-2xl">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-8 border border-primary/20 group-hover:scale-110 transition-all">
                    <Bell className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Proactive Reminders</h3>
                  <p className="text-base text-white/40 leading-relaxed">
                    Reduce no-shows by up to 80% with AI-driven follow-up sequences.
                  </p>
                </div>
                
                <div className="mt-20">
                   <div className="bg-[#0a0c10]/80 backdrop-blur-xl rounded-2xl p-5 border border-white/10 space-y-3 transform group-hover:-translate-y-2 transition-transform">
                      <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Notification Sent</div>
                      <p className="text-[11px] text-white/80 italic">"Don't forget your 3 PM checkup!"</p>
                   </div>
                </div>
              </div>

              {/* Card 4: Lead Recovery */}
              <div className="bg-[#14171c] rounded-[2rem] border border-white/5 p-10 hover:border-orange-400/30 transition-all group relative overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-orange-400/10 text-orange-400 flex items-center justify-center mb-8 border border-orange-400/20 group-hover:scale-110 transition-all">
                    <Search className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Lead Recovery</h3>
                  <p className="text-base text-white/40 leading-relaxed">
                    Never lose an after-hours inquiry.
                  </p>
                </div>
              </div>

              {/* Card 5: Shared Clinic Inbox (Span 2) */}
              <div className="lg:col-span-2 bg-[#14171c] rounded-[2rem] border border-white/5 p-10 hover:border-purple-400/30 transition-all group relative overflow-hidden flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-purple-400/10 text-purple-400 flex items-center justify-center mb-8 border border-purple-400/20 group-hover:scale-110 transition-all">
                      <Bot className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Shared Clinic Inbox</h3>
                    <p className="text-base text-white/40 leading-relaxed">
                      Collaborate on patient threads. Doctors and staff on one page.
                    </p>
                  </div>
                  <div className="flex gap-2">
                     {['DR', 'NS', 'AD'].map(initial => (
                        <div key={initial} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold text-white/40">
                           {initial}
                        </div>
                     ))}
                  </div>
                </div>
              </div>

              {/* Card 6: Clinical FAQs */}
              <div className="bg-[#14171c] rounded-[2rem] border border-white/5 p-10 hover:border-blue-400/30 transition-all group relative overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-400/10 text-blue-400 flex items-center justify-center mb-8 border border-blue-400/20 group-hover:scale-110 transition-all">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Clinical FAQs</h3>
                  <p className="text-base text-white/40 leading-relaxed">
                    Instant answers on procedures.
                  </p>
                </div>
              </div>

              {/* Card 7: Post-Treatment Feedback (Span 2) */}
              <div className="lg:col-span-2 bg-[#14171c] rounded-[2rem] border border-white/5 p-10 hover:border-orange-400/30 transition-all group relative overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-orange-400/10 text-orange-400 flex items-center justify-center mb-8 border border-orange-400/20 group-hover:scale-110 transition-all">
                    <Tag className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Post-Treatment Feedback</h3>
                  <p className="text-base text-white/40 leading-relaxed">
                    Automated loops for better care and online reviews.
                  </p>
                </div>
              </div>

              {/* Card 8: Task Delegation */}
              <div className="bg-[#14171c] rounded-[2rem] border border-white/5 p-10 hover:border-emerald-400/30 transition-all group relative overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-8 border border-emerald-400/20 group-hover:scale-110 transition-all">
                    <ClipboardList className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Task Delegation</h3>
                  <p className="text-base text-white/40 leading-relaxed">
                    Assign leads to specific departments.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 bg-[#0a0c10] border-y border-white/5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
              <div className="text-center space-y-4">
                 <div className="text-[11px] font-black text-primary uppercase tracking-[0.3em] mb-6">SAVINGS BOOST</div>
                 <div className="text-7xl font-black text-white tracking-tighter">45%</div>
                 <p className="text-sm text-white/40 font-medium">No-show reduction</p>
              </div>
              <div className="text-center space-y-4 border-x border-white/5 px-12">
                 <div className="text-[11px] font-black text-blue-400 uppercase tracking-[0.3em] mb-6">PATIENT HAPPINESS</div>
                 <div className="text-7xl font-black text-white tracking-tighter">9.8<span className="text-3xl text-white/20">/10</span></div>
                 <p className="text-sm text-white/40 font-medium">Satisfaction score via AI</p>
              </div>
              <div className="text-center space-y-4">
                 <div className="text-[11px] font-black text-orange-400 uppercase tracking-[0.3em] mb-6">AUTOMATED GROWTH</div>
                 <div className="text-7xl font-black text-white tracking-tighter">72%</div>
                 <p className="text-sm text-white/40 font-medium">Bookings handled via AI</p>
              </div>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="py-32 bg-[#0a0c10] relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center gap-24">
            <div className="flex-1">
               <div className="w-16 h-16 rounded-[1.5rem] bg-primary/10 text-primary flex items-center justify-center mb-10 border border-primary/20 shadow-2xl shadow-primary/10">
                  <Shield className="w-8 h-8" />
               </div>
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-10 leading-[1.1] tracking-tight">
                The Future of <br />
                Patient Care is <span className="text-primary">Secure.</span>
              </h2>
              <p className="text-white/50 text-xl mb-12 max-w-xl leading-relaxed">
                SaarthiDesk is built with strict privacy protocols. Our AI is HIPAA-Ready, ensuring every patient interaction, data point, and communication flow is encrypted and compliant with global healthcare standards.
              </p>
              
              <ul className="space-y-6">
                {[
                  "End-to-End Encrypted Patient Chats",
                  "HIPAA-Ready Architecture",
                  "Strict Access Control for Clinic Staff"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-white font-medium text-lg">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                       <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex-1 relative">
               <div className="relative w-full max-w-lg mx-auto">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
                  <div className="relative z-10 rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(209,188,255,0.1)] aspect-square group">
                     <Image 
                        src="/clinic_security_visual_1778938372434.png" 
                        alt="Secure Clinical Data" 
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10] via-transparent to-transparent opacity-60"></div>
                  </div>
                  {/* Decorative circular element around image */}
                  <div className="absolute -inset-8 border border-white/5 rounded-full -z-10 animate-spin-slow"></div>
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
              Ready to modernize your front desk?
            </h2>
            <p className="text-white/40 text-xl mb-14 max-w-3xl mx-auto relative z-10 leading-relaxed">
              Join 500+ clinics using SaarthiDesk to automate their patient interactions and grow their practice efficiently.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
              <Link 
                href="/register" 
                className="px-12 py-5 bg-primary text-primary-foreground rounded-2xl font-black text-xl hover:bg-primary/90 transition-all shadow-[0_20px_40px_rgba(209,188,255,0.15)] flex items-center justify-center gap-3"
              >
                Get Started Now <Bot className="w-6 h-6" />
              </Link>
              <Link 
                href="/demo" 
                className="px-12 py-5 bg-white/5 text-white border border-white/10 rounded-2xl font-bold text-xl hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                Talk to Sales
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <ChatWidget />

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}

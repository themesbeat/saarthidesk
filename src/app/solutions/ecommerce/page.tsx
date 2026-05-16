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
  Play,
  ArrowRight,
  Activity,
  BarChart3,
  ShoppingCart,
  ShoppingBag,
  Instagram,
  RefreshCw,
  Globe,
  Plus
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/ChatWidget";

export default function EcommerceSolutionPage() {
  return (
    <div className="min-h-screen bg-[#0a0c10] text-foreground font-sans selection:bg-primary/30">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-20 md:pt-32 md:pb-24 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center gap-16">
            
            <div className="flex-1 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-white/60 mb-8 tracking-widest uppercase">
                <div className="w-1 h-1 rounded-full bg-primary"></div> FOR ECOMMERCE BRANDS
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-white">
                AI Customer Support For <br />
                <span className="text-primary italic">Ecommerce</span> Brands
              </h1>
              
              <p className="text-lg text-white/60 mb-10 max-w-xl leading-relaxed">
                Automate support, recover abandoned customers, and manage conversations across WhatsApp, Instagram, and email.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-5 mb-10">
                <Link 
                  href="/register" 
                  className="w-full sm:w-auto px-10 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg transition-all hover:bg-primary/90 text-center shadow-[0_10px_30px_rgba(209,188,255,0.2)]"
                >
                  Start Free Trial
                </Link>
                <Link 
                  href="/demo" 
                  className="w-full sm:w-auto px-10 py-4 bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-xl font-bold text-lg transition-all hover:bg-white/10 text-center"
                >
                  Book Demo
                </Link>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-4">
                 <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                       <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0a0c10] overflow-hidden relative">
                          <Image src={`https://i.pravatar.cc/100?u=${i+10}`} alt="User" fill className="object-cover" />
                       </div>
                    ))}
                 </div>
                 <p className="text-xs text-white/40 font-medium">Trusted by <span className="text-white font-bold">2,500+ D2C brands</span></p>
              </div>
            </div>

            {/* Hero Visual (Watch Mockup) */}
            <div className="flex-1 w-full max-w-2xl relative">
              <div className="relative z-10 group">
                <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#0a0c10]">
                   <Image 
                      src="/ecommerce_hero_watch_mockup_1778944943341.png" 
                      alt="Ecommerce Support Mockup" 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-1000 opacity-90" 
                   />
                </div>
              </div>
              {/* Background Glows */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 rounded-full blur-[120px] -z-10"></div>
            </div>

          </div>
        </section>

        {/* Bento Grid Title */}
        <section className="pt-20 pb-10">
           <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">The OS for Ecommerce Growth</h2>
              <p className="text-white/40 text-lg">Scale your D2C brand without scaling your headcount.</p>
           </div>
        </section>

        {/* Bento Grid Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-7xl mx-auto">
              
              {/* Card 1: AI Customer Support (8 cols wide) */}
              <div className="md:col-span-8 bg-[#14171c] rounded-[2.5rem] border border-white/5 p-10 hover:border-primary/30 transition-all group overflow-hidden flex flex-col justify-between min-h-[400px]">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-8 border border-primary/20">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 leading-tight">AI Customer Support</h3>
                  <p className="text-base text-white/40 leading-relaxed mb-10 max-w-md">
                    Neural agents resolving 70% of common queries using live Shopify data. They don't just chat; they solve.
                  </p>
                </div>
                
                {/* Visual Content: Stats */}
                <div className="grid grid-cols-3 gap-4">
                   <div className="bg-[#0a0c10]/50 rounded-2xl p-6 border border-white/5 text-center">
                      <div className="text-3xl font-black text-white italic mb-1">70%</div>
                      <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Automation Rate</div>
                   </div>
                   <div className="bg-[#0a0c10]/50 rounded-2xl p-6 border border-white/5 text-center">
                      <div className="text-3xl font-black text-white italic mb-1">~2s</div>
                      <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Response Time</div>
                   </div>
                   <div className="bg-[#0a0c10]/50 rounded-2xl p-6 border border-white/5 text-center">
                      <div className="text-3xl font-black text-white italic mb-1">24/7</div>
                      <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Availability</div>
                   </div>
                </div>
              </div>

              {/* Card 2: Order Automation (4 cols) */}
              <div className="md:col-span-4 bg-[#14171c] rounded-[2.5rem] border border-white/5 p-10 hover:border-blue-400/30 transition-all group flex flex-col justify-between min-h-[400px]">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-400/10 text-blue-400 flex items-center justify-center mb-8 border border-blue-400/20">
                    <RefreshCw className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 leading-tight">Order Automation</h3>
                  <p className="text-sm text-white/40 leading-relaxed">
                    Real-time tracking and "Where is my order?" resolution directly in chat.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                   <Globe className="w-3 h-3" /> Integrated with 100+ Carriers
                </div>
              </div>

              {/* Card 3: WhatsApp Commerce (4 cols) */}
              <div className="md:col-span-4 bg-[#14171c] rounded-[2.5rem] border border-white/5 p-10 hover:border-emerald-500/30 transition-all group flex flex-col justify-between min-h-[300px]">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-6 border border-emerald-500/20">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3 leading-tight">WhatsApp Commerce</h3>
                  <p className="text-sm text-white/40 leading-relaxed">
                    Enable customers to browse catalogs and checkout entirely within WhatsApp.
                  </p>
                </div>
              </div>

              {/* Card 4: Cart Recovery (4 cols) */}
              <div className="md:col-span-4 bg-[#14171c] rounded-[2.5rem] border border-white/5 p-10 hover:border-orange-400/30 transition-all group flex flex-col justify-between min-h-[300px]">
                <div className="w-12 h-12 rounded-2xl bg-orange-400/10 text-orange-400 flex items-center justify-center mb-6 border border-orange-400/20">
                  <ShoppingCart className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3 leading-tight">Cart Recovery</h3>
                  <p className="text-sm text-white/40 leading-relaxed">
                    Automated recovery with +12% conversion lift through personalized AI follow-ups.
                  </p>
                </div>
              </div>

              {/* Card 5: Instagram Sync (4 cols) */}
              <div className="md:col-span-4 bg-[#14171c] rounded-[2.5rem] border border-white/5 p-10 hover:border-pink-500/30 transition-all group flex flex-col justify-between min-h-[300px]">
                <div className="w-12 h-12 rounded-2xl bg-pink-500/10 text-pink-500 flex items-center justify-center mb-6 border border-pink-500/20">
                  <Instagram className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3 leading-tight">Instagram Sync</h3>
                  <p className="text-sm text-white/40 leading-relaxed">
                    Turn story replies and DMs into support tickets instantly without losing context.
                  </p>
                </div>
              </div>

              {/* Card 6: Customer Analytics (8 cols) */}
              <div className="md:col-span-8 bg-[#14171c] rounded-[2.5rem] border border-white/5 p-10 hover:border-primary/30 transition-all group overflow-hidden flex flex-col md:flex-row gap-10 min-h-[400px]">
                <div className="flex-1 flex flex-col justify-center">
                   <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 border border-primary/20">
                      <BarChart3 className="w-6 h-6" />
                   </div>
                   <h3 className="text-2xl font-bold text-white mb-4 leading-tight">Customer Analytics</h3>
                   <p className="text-base text-white/40 leading-relaxed max-w-xs">
                      High-fidelity charts showing ROI and response times.
                   </p>
                </div>
                
                {/* Visual Content: Bar Chart */}
                <div className="flex-1 flex items-end gap-2 h-48 mt-auto">
                   {[30, 55, 40, 75, 95, 80, 50].map((h, i) => (
                      <div 
                         key={i} 
                         className={`flex-1 rounded-sm transition-all duration-700 delay-${i * 100} ${i === 4 ? 'bg-primary' : 'bg-white/10'}`} 
                         style={{ height: `${h}%` }}
                      ></div>
                   ))}
                </div>
              </div>

              {/* Card 7: Shared Support Inbox (4 cols) */}
              <div className="md:col-span-4 bg-[#14171c] rounded-[2.5rem] border border-white/5 p-10 hover:border-indigo-400/30 transition-all group flex flex-col justify-between min-h-[400px]">
                 <div>
                    <div className="w-12 h-12 rounded-2xl bg-indigo-400/10 text-indigo-400 flex items-center justify-center mb-8 border border-indigo-400/20">
                       <Inbox className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 leading-tight">Shared Support Inbox</h3>
                    <p className="text-sm text-white/40 leading-relaxed">
                       One place for WhatsApp, Instagram, and Email with advanced team collaboration features.
                    </p>
                 </div>
                 
                 <div className="flex flex-wrap gap-2 mt-8">
                    {["#Sales", "#Refunds", "#Priority"].map(tag => (
                       <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-white/40 border border-white/10">{tag}</span>
                    ))}
                 </div>
              </div>

            </div>
          </div>
        </section>

        {/* Knowledge Base Section */}
        <section className="py-24 relative overflow-hidden bg-[#0d0f14]">
           <div className="container mx-auto px-4 max-w-6xl">
              <div className="flex flex-col lg:flex-row items-center gap-20">
                 <div className="flex-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[9px] font-black text-orange-500 mb-6 tracking-widest uppercase italic">
                       YOUR BRAND BRAIN
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white tracking-tight leading-[1.1]">AI Knowledge Base</h2>
                    <p className="text-white/40 text-lg mb-10 leading-relaxed max-w-xl">
                       Train your AI agents in minutes. Just upload your store PDFs, link your help docs, or paste your FAQ. SaarthiDesk creates a cognitive model of your brand voice and policy.
                    </p>
                    <Link href="#" className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all group">
                       Learn how training works <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                 </div>

                 <div className="flex-1 w-full max-w-xl">
                    <div className="space-y-4">
                       <div className="p-6 bg-[#14171c] rounded-3xl border border-white/5 flex items-center justify-between group hover:border-primary/30 transition-all">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                                <FileText className="w-5 h-5 text-orange-500" />
                             </div>
                             <div>
                                <div className="text-xs font-bold text-white mb-1">Return_Policy_2024.pdf</div>
                                <div className="h-1 w-48 bg-white/5 rounded-full overflow-hidden">
                                   <div className="h-full bg-emerald-500 w-full animate-pulse"></div>
                                </div>
                             </div>
                          </div>
                          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Synced</span>
                       </div>
                       <div className="p-6 bg-[#14171c] rounded-3xl border border-white/5 flex items-center justify-between group hover:border-primary/30 transition-all opacity-50">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                <Globe className="w-5 h-5 text-blue-500" />
                             </div>
                             <div>
                                <div className="text-xs font-bold text-white mb-1">https://help.yourstore.com</div>
                                <div className="h-1 w-48 bg-white/5 rounded-full overflow-hidden">
                                   <div className="h-full bg-primary w-[85%]"></div>
                                </div>
                             </div>
                          </div>
                          <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">85%</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Integration Logos */}
        <section className="py-20 border-y border-white/5">
           <div className="container mx-auto px-4">
              <p className="text-[10px] font-bold text-white/20 text-center uppercase tracking-[0.3em] mb-12 italic">Integrated with your favorite platforms</p>
              <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                 <div className="flex items-center gap-3">
                    <ShoppingCart className="w-5 h-5" /> <span className="text-xl font-black italic">Shopify</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <ShoppingBag className="w-5 h-5" /> <span className="text-xl font-black italic">WooCommerce</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5" /> <span className="text-xl font-black italic">Magento</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5" /> <span className="text-xl font-black italic">BigCommerce</span>
                 </div>
              </div>
           </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-4 bg-[#0a0c10]">
          <div className="container mx-auto max-w-6xl bg-gradient-to-br from-[#1a1d23] to-[#0a0c10] rounded-[3rem] p-16 md:p-24 text-center relative overflow-hidden border border-white/5 shadow-2xl">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] -mr-64 -mt-64"></div>
            
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 relative z-10 tracking-tight leading-[1.1]">
              Ready to automate your support?
            </h2>
            <p className="text-white/40 text-xl mb-14 max-w-3xl mx-auto relative z-10 leading-relaxed">
              Join 2,500+ brands using SaarthiDesk to drive more revenue through conversations + AI.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
              <Link 
                href="/register" 
                className="px-12 py-5 bg-primary text-primary-foreground rounded-2xl font-black text-xl hover:bg-primary/90 transition-all shadow-[0_20px_40px_rgba(209,188,255,0.15)] flex items-center justify-center gap-3"
              >
                Start 14-day free trial
              </Link>
              <Link 
                href="/sales" 
                className="px-12 py-5 bg-white/5 text-white border border-white/10 rounded-2xl font-bold text-xl hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                Talk to an expert
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

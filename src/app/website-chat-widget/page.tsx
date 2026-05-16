"use client";

import Link from "next/link";
import { 
  ArrowRight, 
  Bot, 
  Sparkles, 
  Play, 
  Zap, 
  MessageSquare,
  UserCheck,
  MousePointer2,
  BarChart3,
  Settings,
  Bell,
  Smartphone,
  Globe,
  RefreshCw,
  CheckCircle2,
  Lock,
  History,
  Phone,
  Mail,
  Instagram
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/ChatWidget";

export default function WebsiteChatWidgetPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-foreground font-sans selection:bg-primary/30">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden">
          {/* Background Glows */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full -mr-64 -mt-32 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full -ml-64 -mb-32 pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-bold text-indigo-400 mb-8 tracking-wider uppercase">
                <Sparkles className="w-3 h-3" /> Next Generation AI Widget
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-white">
                Add An <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">AI Assistant</span> To Your Website
              </h1>
              
              <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Capture leads, answer questions, and engage visitors instantly with an AI-powered 
                website chat widget. Trained on your business knowledge in seconds.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                <Link 
                  href="/register" 
                  className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(209,188,255,0.3)] text-center"
                >
                  Start 14-day Free Trial
                </Link>
                <Link 
                  href="/demo" 
                  className="w-full sm:w-auto px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-xl font-bold text-lg transition-all hover:bg-white/10 flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5 fill-white" /> See it in action
                </Link>
              </div>
            </div>

            {/* Widget Preview Mockup */}
            <div className="max-w-6xl mx-auto relative mt-20">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Chat Interface Mockup */}
                <div className="lg:col-span-7 relative group">
                   <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                   <div className="relative bg-[#16161a] rounded-3xl border border-white/10 shadow-2xl overflow-hidden aspect-[16/10]">
                      {/* Top Bar */}
                      <div className="h-10 border-b border-white/5 bg-white/5 flex items-center px-4">
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                        </div>
                      </div>
                      
                      <div className="p-8 h-full flex flex-col gap-6">
                        {/* Chat Bubbles */}
                        <div className="flex flex-col gap-4 max-w-md">
                          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none text-sm text-foreground">
                            Hello! How can I help you explore SaarthiDesk today?
                          </div>
                          <div className="bg-indigo-600/20 border border-indigo-500/20 p-4 rounded-2xl rounded-tr-none text-sm text-indigo-100 ml-auto text-right">
                            I'm looking for pricing details for my small agency.
                          </div>
                          <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-[10px] font-bold">S</div>
                            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none text-sm text-foreground">
                              <div className="flex items-center gap-2 text-indigo-400 text-[10px] font-bold mb-1 uppercase tracking-wider">
                                <Sparkles className="w-3 h-3" /> AI AGENT
                              </div>
                              We have a specific Agency plan starting at ₹2,499/mo. It includes up to 5 agent seats and 10,000 automated resolutions per month. Would you like me to send the full comparison table to your email?
                              <div className="mt-4 flex gap-2">
                                <button className="px-3 py-1.5 bg-indigo-500/20 border border-indigo-500/30 rounded-lg text-xs font-bold text-indigo-300">Yes, send it</button>
                                <button className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-muted-foreground">Tell me more</button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Input Area */}
                        <div className="mt-auto relative">
                           <div className="bg-[#0d0d0f] border border-white/10 p-4 rounded-2xl flex items-center justify-between text-muted-foreground text-sm">
                              Ask anything...
                              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                                <ArrowRight className="w-4 h-4" />
                              </div>
                           </div>
                        </div>
                      </div>
                   </div>
                </div>

                {/* Mobile Mockup */}
                <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
                   <div className="relative w-[280px] h-[580px] bg-[#0a0a0c] border-[8px] border-[#1a1a1f] rounded-[3rem] shadow-2xl overflow-hidden">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1a1a1f] rounded-b-2xl z-20"></div>
                      <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-purple-500/5"></div>
                      
                      <div className="h-full flex flex-col p-6 pt-12">
                         <div className="flex items-center gap-3 mb-8">
                            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-xs font-bold">S</div>
                            <span className="font-bold text-white tracking-tight">SaarthiDesk</span>
                         </div>
                         
                         <div className="mt-auto mb-4">
                            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-4">
                               <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                  <MessageSquare className="w-5 h-5" />
                               </div>
                               <div>
                                  <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Chat with us</div>
                                  <div className="text-xs font-bold text-white">Online: AI Assistant Active</div>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Floating Elements */}
                   <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-2xl animate-bounce-slow">
                      <MessageSquare className="w-6 h-6" />
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Engineered for Engagement */}
        <section className="py-24 bg-[#0a0a0c]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Engineered for Engagement</h2>
              <p className="text-muted-foreground text-lg">Everything you need to turn website visitors into loyal customers.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {/* Feature 1 */}
              <div className="lg:col-span-2 bg-[#121216] rounded-3xl border border-white/5 p-8 relative overflow-hidden group">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
                  <Bot className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">24/7 AI Chat Assistant</h3>
                <p className="text-muted-foreground text-sm max-w-sm">
                  Our AI understands context and intent, providing instant support even while your team sleeps. No more "We'll get back to you in 24 hours."
                </p>
                {/* Visual Element */}
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/2 h-full opacity-30 pointer-events-none">
                   <div className="w-full h-full bg-gradient-to-l from-indigo-500/20 to-transparent flex items-center justify-center">
                      <div className="relative">
                         <div className="w-32 h-32 rounded-full border border-indigo-500/20 animate-ping"></div>
                         <div className="absolute inset-0 flex items-center justify-center">
                            <Bot className="w-12 h-12 text-indigo-400" />
                         </div>
                      </div>
                   </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-[#121216] rounded-3xl border border-white/5 p-8 flex flex-col relative overflow-hidden group">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Lead Capture</h3>
                <p className="text-muted-foreground text-sm">
                  Automated forms integrated within chat flows to qualify leads effortlessly.
                </p>
                {/* Visual Form Preview */}
                <div className="mt-8 bg-black/40 rounded-2xl border border-white/5 p-4 space-y-3">
                   <div className="h-2 bg-white/5 rounded w-3/4"></div>
                   <div className="h-8 bg-white/5 rounded-lg border border-white/10"></div>
                   <div className="h-8 bg-indigo-600/20 rounded-lg border border-indigo-500/20"></div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="bg-[#121216] rounded-3xl border border-white/5 p-8 flex flex-col group">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mb-6">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Human Handoff</h3>
                <p className="text-muted-foreground text-sm">
                  Complex queries are seamlessly routed to your live agents with full conversation context.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="lg:col-span-2 bg-[#121216] rounded-3xl border border-white/5 p-8 flex flex-col relative overflow-hidden group">
                <div className="flex flex-col md:flex-row gap-8">
                   <div className="flex-1">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6">
                        <BarChart3 className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Visitor Analytics</h3>
                      <p className="text-muted-foreground text-sm max-w-sm">
                        Track engagement, conversion rates, and chat volume with real-time dashboards that reveal user intent.
                      </p>
                   </div>
                   <div className="flex-1 flex items-end gap-1 h-32">
                      {[30, 50, 40, 70, 90, 60, 80].map((h, i) => (
                        <div key={i} className="flex-1 bg-indigo-500/20 border border-indigo-500/30 rounded-t-lg group-hover:bg-indigo-500/40 transition-all" style={{ height: `${h}%` }}></div>
                      ))}
                   </div>
                </div>
              </div>
            </div>

            {/* Small Cards Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: 'Smart Replies', desc: 'AI-suggested responses', icon: Zap, color: 'text-indigo-400' },
                { title: 'Customization', desc: 'Colors & icons to match brand', icon: Settings, color: 'text-orange-400' },
                { title: 'Real-time Alerts', desc: 'Get notified instantly on Slack', icon: Bell, color: 'text-purple-400' },
                { title: 'Responsive UI', desc: 'Mobile-first design for any screen', icon: Smartphone, color: 'text-blue-400' }
              ].map((item, i) => (
                <div key={i} className="bg-[#121216] border border-white/5 p-6 rounded-2xl flex flex-col gap-4">
                   <item.icon className={`w-5 h-5 ${item.color}`} />
                   <div>
                      <div className="text-sm font-bold text-white mb-1">{item.title}</div>
                      <div className="text-[10px] text-muted-foreground">{item.desc}</div>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Train Your AI in Seconds */}
        <section className="py-24 bg-[#0a0a0c]">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-br from-indigo-900/10 to-purple-900/10 border border-white/5 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">Train Your AI in Seconds</h2>
                    <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
                      Simply paste your website URL or upload your help documentation. SaarthiDesk crawls your data to build a custom knowledge base for your AI Agent.
                    </p>
                    
                    <ul className="space-y-4">
                       {[
                         "No-code setup — just copy-paste one script",
                         "Multi-language support (English, Hindi, and more)",
                         "Auto-sync with your latest website updates"
                       ].map((item, i) => (
                         <li key={i} className="flex items-center gap-3 text-white/80">
                            <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                            <span className="text-sm">{item}</span>
                         </li>
                       ))}
                    </ul>
                  </div>

                  <div className="relative">
                     <div className="bg-[#1a1a1f] border border-white/10 rounded-3xl p-8 shadow-2xl">
                        <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6">
                           <Globe className="w-4 h-4" /> Source URL
                        </div>
                        
                        <div className="relative mb-8">
                           <input 
                             type="text" 
                             readOnly 
                             value="https://www.yourbusiness.com/docs" 
                             className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground outline-none"
                           />
                           <div className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400">
                              <CheckCircle2 className="w-5 h-5" />
                           </div>
                        </div>

                        <div className="space-y-6">
                           <div>
                              <div className="flex justify-between items-center mb-2">
                                 <span className="text-xs text-muted-foreground">Processing Knowledge Base...</span>
                                 <span className="text-xs font-bold text-white">85%</span>
                              </div>
                              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                 <div className="h-full bg-indigo-500 w-[85%] rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                              </div>
                           </div>

                           <div className="grid grid-cols-2 gap-4">
                              <div className="bg-white/5 border border-white/5 p-4 rounded-xl">
                                 <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Pages Found</div>
                                 <div className="text-xl font-bold text-white">124</div>
                              </div>
                              <div className="bg-white/5 border border-white/5 p-4 rounded-xl">
                                 <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Topics Identified</div>
                                 <div className="text-xl font-bold text-white">42</div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 bg-[#0a0a0c] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/5 to-transparent" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter">
              Ready to boost your <br />
              website conversion?
            </h2>
            <p className="text-muted-foreground text-xl mb-12 max-w-2xl mx-auto">
              Join 5,000+ Indian SMBs using SaarthiDesk to provide premium support and capture leads 24/7.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <Link 
                href="/register" 
                className="px-10 py-5 bg-primary text-primary-foreground rounded-2xl font-bold text-xl hover:scale-[1.05] transition-all shadow-[0_0_30px_rgba(209,188,255,0.4)]"
              >
                Start Your Free Trial
              </Link>
              <button 
                className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-xl hover:bg-white/10 transition-all backdrop-blur-xl"
              >
                Talk to Sales
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ChatWidget />

      {/* Custom Styles for Animations */}
      <style jsx global>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

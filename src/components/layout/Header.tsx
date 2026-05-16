"use client";

import Link from "next/link";
import { ChevronDown, LogOut, LayoutDashboard, Sparkles } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export function Header() {
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center font-bold text-foreground shadow-[0_0_15px_rgba(99,102,241,0.5)]">
              S
            </div>
            <span className="font-bold text-xl tracking-tight">SaarthiDesk</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground ml-auto mr-8">
          
          {/* Products Mega Menu */}
          <div className="relative group py-4">
            <button className="flex items-center gap-1 hover:text-foreground transition-colors outline-none cursor-pointer">
              Products <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-[700px] z-50">
              <div className="bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl p-6">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { title: 'Unified Inbox', desc: 'All channels in one place', href: '/unified-inbox' },
                    { title: 'AI Replies', desc: 'Automate responses instantly', href: '/ai-replies' },
                    { title: 'WhatsApp Automation', desc: 'Broadcasts & drip campaigns', href: '/whatsapp-automation' },
                    { title: 'AI Knowledge Base', desc: 'Train AI on your data', href: '/ai-knowledge-base' },
                    { title: 'Lead Management', desc: 'Capture & qualify leads', href: '/lead-management' },
                    { title: 'Analytics', desc: 'Detailed insights & reporting', href: '/analytics' },
                    { title: 'Team Collaboration', desc: 'Assign & manage tickets', href: '/team-collaboration' },
                    { title: 'Website Chat Widget', desc: 'Convert visitors directly', href: '/website-chat-widget' },
                    { title: 'AI Receptionist', desc: 'Handle calls intelligently', href: '#' },
                  ].map(item => (
                    <Link key={item.title} href={item.href} className="flex flex-col gap-1 p-3 rounded-xl hover:bg-muted/80 transition-colors">
                      <span className="text-foreground font-semibold text-sm">{item.title}</span>
                      <span className="text-xs text-muted-foreground">{item.desc}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Solutions Mega Menu */}
          <div className="relative group py-4">
            <button className="flex items-center gap-1 hover:text-foreground transition-colors outline-none cursor-pointer">
              Solutions <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-[800px] z-50">
              <div className="bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl p-6">
                <div className="grid grid-cols-3 gap-8">
                  <div>
                    <h4 className="text-xs font-bold text-foreground0 uppercase tracking-wider mb-4 px-2">By Industry</h4>
                    <div className="flex flex-col space-y-1">
                      {['Clinics', 'Salons', 'Gyms', 'Real Estate', 'Ecommerce', 'Coaching Institutes', 'Agencies'].map(item => (
                        <Link key={item} href="#" className="text-sm hover:text-foreground transition-colors py-2 px-2 hover:bg-muted/80 rounded-lg">{item}</Link>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-foreground0 uppercase tracking-wider mb-4 px-2">By Use Case</h4>
                    <div className="flex flex-col space-y-1">
                      {['Customer Support', 'Lead Management', 'AI Receptionist', 'Appointment Booking', 'WhatsApp Sales', 'Customer Engagement'].map(item => (
                        <Link key={item} href="#" className="text-sm hover:text-foreground transition-colors py-2 px-2 hover:bg-muted/80 rounded-lg">{item}</Link>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-primary/10 to-transparent rounded-xl p-6 flex flex-col items-start justify-center border border-primary/20">
                    <h4 className="text-lg font-bold text-foreground mb-2">Enterprise</h4>
                    <p className="text-sm text-muted-foreground mb-6">Custom AI models, dedicated support, and advanced security for large scale operations.</p>
                    <Link href="#" className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors w-full text-center">
                      Contact Sales
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Resources Mega Menu */}
          <div className="relative group py-4">
            <button className="flex items-center gap-1 hover:text-foreground transition-colors outline-none cursor-pointer">
              Resources <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-[500px] z-50">
              <div className="bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl p-6">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {['Blog', 'Customer Stories', 'Case Studies', 'ROI Calculator', 'Help Center', 'API Docs', 'Integrations', 'Product Updates', 'Templates', 'Free Tools'].map(item => (
                    <Link key={item} href="#" className="text-sm hover:text-foreground transition-colors py-2 px-3 hover:bg-muted/80 rounded-lg flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div>
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Link href="#pricing" className="hover:text-foreground transition-colors py-4">Pricing</Link>
          <Link href="#demo" className="hover:text-foreground transition-colors py-4">Demo</Link>
        </nav>
        <div className="flex items-center gap-4">
          {!isPending && (
            <>
              {session ? (
                <>
                  <Link 
                    href="/dashboard" 
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="text-sm font-medium bg-secondary text-secondary-foreground px-5 py-2 rounded-lg hover:bg-secondary/80 transition-all flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    Login
                  </Link>
                  <Link 
                    href="/register" 
                    className="text-sm font-medium bg-primary text-primary-foreground px-5 py-2 rounded-lg hover:bg-primary/90 transition-all"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}

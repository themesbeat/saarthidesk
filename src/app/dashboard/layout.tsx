import Link from "next/link";
import Image from "next/image";
import { 
  LayoutDashboard, Inbox, Users, BookOpen, Bot, 
  Workflow, BarChart3, Settings, Bell, Search, 
  ChevronDown, Activity
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  const user = session?.user;
  const initials = user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'JD';

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden font-sans">
      {/* Left Sidebar */}
      <aside className="w-64 border-r border-border/50 bg-background/80 backdrop-blur-xl flex flex-col flex-shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-border/50">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image 
              src="/saarthi-desk-logo.png" 
              alt="SaarthiDesk Logo" 
              width={182} 
              height={47} 
              className="h-9 w-auto"
            />
          </Link>
        </div>
        
        <div className="p-4">
          <button className="flex items-center justify-between w-full px-3 py-2 text-sm bg-muted border border-border/50 rounded-lg hover:bg-muted-foreground/20 transition-colors">
            <span className="font-medium text-foreground">Acme Corp</span>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          <SidebarItem href="/dashboard" icon={<LayoutDashboard size={18} />} label="Dashboard" active />
          <SidebarItem href="/dashboard/inbox" icon={<Inbox size={18} />} label="Inbox" badge="12" />
          <SidebarItem href="/dashboard/leads" icon={<Users size={18} />} label="Leads" />
          <SidebarItem href="/dashboard/knowledge" icon={<BookOpen size={18} />} label="Knowledge Base" />
          <SidebarItem href="/dashboard/ai-agent" icon={<Bot size={18} />} label="AI Agent" />
          <SidebarItem href="/dashboard/automations" icon={<Workflow size={18} />} label="Automations" />
          <SidebarItem href="/dashboard/analytics" icon={<BarChart3 size={18} />} label="Analytics" />
          <SidebarItem href="/dashboard/settings" icon={<Settings size={18} />} label="Settings" />
        </nav>
        
        <div className="p-4 border-t border-border/50">
          <div className="flex items-center gap-3 bg-muted p-3 rounded-xl border border-border/50">
            <div className="relative">
              <Avatar className="w-10 h-10 border border-border/50">
                <AvatarImage src={user?.image || undefined} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-background shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate text-foreground">{user?.name || "User"}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email || "No email"}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-border/50 bg-background/80 backdrop-blur-xl z-10 shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search conversations, contacts, or knowledge..." 
                className="pl-9 bg-input border-border/50 text-foreground placeholder:text-muted-foreground h-9 rounded-full focus-visible:ring-primary shadow-sm"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* AI Status */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 text-xs font-medium shadow-[0_0_10px_rgba(52,211,153,0.1)]">
              <Activity className="w-3.5 h-3.5" />
              <span>AI Active</span>
            </div>
            
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors">
              <Bell className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-background relative">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
          <div className="relative z-10 h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

function SidebarItem({ href, icon, label, badge, active }: { href: string; icon: React.ReactNode; label: string; badge?: string; active?: boolean }) {
  return (
    <Link href={href} className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-all ${active ? 'bg-primary/20 text-primary shadow-[0_2px_10px_rgba(209,188,255,0.1)]' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-medium text-sm">{label}</span>
      </div>
      {badge && (
        <span className="bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full shadow-[0_0_8px_rgba(209,188,255,0.5)]">
          {badge}
        </span>
      )}
    </Link>
  );
}

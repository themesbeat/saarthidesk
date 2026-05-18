import Link from "next/link";
import Image from "next/image";
import { 
  Bell, Search, ChevronDown, Activity
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import SidebarNav from "./sidebar-nav";
import UserCard from "./user-card";
import { getOrCreateActiveWorkspace } from "@/lib/workspace";

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

  let workspaceName = "Acme Corp";
  if (user?.id) {
    try {
      const workspace = await getOrCreateActiveWorkspace(user.id);
      workspaceName = workspace.name;
    } catch (err) {
      console.error("[DashboardLayout] Error auto-provisioning workspace:", err);
    }
  }

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
            <span className="font-medium text-foreground">{workspaceName}</span>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
        
        <SidebarNav />
        
        <div className="p-4 border-t border-border/50">
          <UserCard
            name={user?.name || "User"}
            email={user?.email || "No email"}
            image={user?.image || undefined}
            initials={initials}
          />
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



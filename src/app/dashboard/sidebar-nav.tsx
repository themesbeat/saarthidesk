"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Inbox, Users, BookOpen, Bot, 
  Workflow, BarChart3, Settings, Calendar, Megaphone,
  Link2, UserCheck, CreditCard, Shield, HelpCircle
} from "lucide-react";
import React from "react";

export default function SidebarNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", icon: <LayoutDashboard size={16} />, label: "Dashboard" },
    { href: "/dashboard/inbox", icon: <Inbox size={16} />, label: "Inbox", badge: "12" },
    { href: "/dashboard/ai-agent", icon: <Bot size={16} />, label: "AI Agents" },
    { href: "/dashboard/automations", icon: <Workflow size={16} />, label: "Automations" },
    { href: "/dashboard/leads", icon: <Users size={16} />, label: "Contacts / CRM" },
    { href: "/dashboard/appointments", icon: <Calendar size={16} />, label: "Appointments" },
    { href: "/dashboard/campaigns", icon: <Megaphone size={16} />, label: "Campaigns" },
    { href: "/dashboard/knowledge", icon: <BookOpen size={16} />, label: "Knowledge Base" },
    { href: "/dashboard/analytics", icon: <BarChart3 size={16} />, label: "Analytics" },
    { href: "/dashboard/integrations", icon: <Link2 size={16} />, label: "Integrations" },
    { href: "/dashboard/team", icon: <UserCheck size={16} />, label: "Team" },
    { href: "/dashboard/billing", icon: <CreditCard size={16} />, label: "Billing" },
    { href: "/dashboard/settings", icon: <Settings size={16} />, label: "Settings" },
    { href: "/dashboard/admin", icon: <Shield size={16} />, label: "Admin Panel" },
    { href: "/dashboard/help", icon: <HelpCircle size={16} />, label: "Help Center" }
  ];

  return (
    <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
      {navItems.map((item) => {
        // Precise path matching: Dashboard is active only if exact match, others if subpath starts
        const isActive = item.href === "/dashboard" 
          ? pathname === "/dashboard"
          : pathname.startsWith(item.href);

        return (
          <Link 
            key={item.href}
            href={item.href} 
            className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-300 ${
              isActive 
                ? "bg-primary/20 text-primary shadow-[0_2px_10px_rgba(209,188,255,0.08)] border border-primary/10" 
                : "text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent"
            }`}
          >
            <div className="flex items-center gap-3">
              {React.cloneElement(item.icon, {
                className: isActive ? "text-primary" : "text-muted-foreground"
              })}
              <span className="font-medium text-sm">{item.label}</span>
            </div>
            {item.badge && (
              <span className="bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full shadow-[0_0_8px_rgba(209,188,255,0.4)]">
                {item.badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

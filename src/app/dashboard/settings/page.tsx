"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, Users, UserPlus, Key, Link as LinkIcon, 
  Check, Mail, MessageSquare, Instagram, Globe, 
  MessageCircle, AlertCircle, Sparkles, UserCheck 
} from "lucide-react";

interface Teammate {
  id: string;
  name: string;
  email: string;
  role: "admin" | "agent" | "ai";
  status: "active" | "invited";
}

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  connected: boolean;
  type: string;
}

export default function SettingsPage() {
  // Teammates State
  const [teammates, setTeammates] = useState<Teammate[]>([
    { id: "1", name: "Amit Sharma", email: "amit@acmecorp.com", role: "admin", status: "active" },
    { id: "2", name: "Kavita Nair", email: "kavita@acmecorp.com", role: "agent", status: "active" },
    { id: "3", name: "Saarthi AI", email: "ai-agent@saarthidesk.com", role: "ai", status: "active" },
    { id: "4", name: "Rohan Roy", email: "rohan@acmecorp.com", role: "agent", status: "invited" }
  ]);

  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [inviteRole, setInviteRole] = useState<"admin" | "agent" | "ai">("agent");
  const [inviteSent, setInviteSent] = useState(false);

  // Integrations State
  const [integrations, setIntegrations] = useState<Integration[]>([
    { 
      id: "whatsapp", 
      name: "WhatsApp Business API", 
      description: "Send templates and converse with clients via WhatsApp.",
      icon: <MessageCircle className="w-5 h-5 text-emerald-400" />, 
      connected: true,
      type: "WhatsApp"
    },
    { 
      id: "instagram", 
      name: "Instagram Direct Messages", 
      description: "Answer client comments and DMs automatically via AI replies.",
      icon: <Instagram className="w-5 h-5 text-rose-400" />, 
      connected: true,
      type: "Social"
    },
    { 
      id: "web-widget", 
      name: "Embed Web Chat Widget", 
      description: "Deploy an interactive floating chat bubble directly on your website.",
      icon: <Globe className="w-5 h-5 text-sky-400" />, 
      connected: true,
      type: "Web"
    },
    { 
      id: "email", 
      name: "Email Support Helpdesk", 
      description: "Forward customer emails directly into SaarthiDesk for auto-replies.",
      icon: <Mail className="w-5 h-5 text-zinc-400" />, 
      connected: false,
      type: "Inbox"
    }
  ]);

  const [connectingId, setConnectingId] = useState<string | null>(null);

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim() || !inviteName.trim()) return;

    const newTeammate: Teammate = {
      id: Date.now().toString(),
      name: inviteName.trim(),
      email: inviteEmail.trim(),
      role: inviteRole,
      status: "invited"
    };

    setTeammates((prev) => [...prev, newTeammate]);
    setInviteEmail("");
    setInviteName("");
    setInviteSent(true);
    setTimeout(() => setInviteSent(false), 2500);
  };

  const handleToggleIntegration = (id: string) => {
    const item = integrations.find(i => i.id === id);
    if (!item) return;

    if (item.connected) {
      // Disconnect
      setIntegrations((prev) => prev.map(i => i.id === id ? { ...i, connected: false } : i));
    } else {
      // Trigger connecting loader
      setConnectingId(id);
      setTimeout(() => {
        setIntegrations((prev) => prev.map(i => i.id === id ? { ...i, connected: true } : i));
        setConnectingId(null);
      }, 1500);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 h-full flex flex-col overflow-auto">
      {/* Header */}
      <div className="flex-shrink-0">
        <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Settings className="w-6 h-6 text-primary" /> Settings & Collaboration
        </h1>
        <p className="text-muted-foreground">Configure team operational roles and connect messaging support integration channels.</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 items-start flex-grow">
        {/* Left Side: Teammate Invitation & Roster */}
        <div className="lg:col-span-6 space-y-6">
          {/* Invite Form */}
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-foreground text-base flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-primary" /> Teammate Invitation Portal
              </CardTitle>
              <CardDescription className="text-muted-foreground text-xs">Invite staff members or virtual receptionists to join your workspace layout.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSendInvite} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground">Full Name</label>
                    <Input 
                      value={inviteName}
                      onChange={(e) => setInviteName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="bg-background border-border/50 text-xs h-9"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground">Work Email</label>
                    <Input 
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      placeholder="e.g. rahul@acmecorp.com"
                      className="bg-background border-border/50 text-xs h-9"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">Access Privilege Role</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "admin", label: "Admin", desc: "Full controls" },
                      { id: "agent", label: "Support Agent", desc: "Converse with leads" },
                      { id: "ai", label: "AI-Only Bot", desc: "Automated routing" }
                    ].map((role) => (
                      <button
                        type="button"
                        key={role.id}
                        onClick={() => setInviteRole(role.id as Teammate["role"])}
                        className={`p-2.5 rounded-lg border text-center transition-all flex flex-col items-center justify-center ${
                          inviteRole === role.id 
                            ? "bg-primary/20 border-primary text-primary" 
                            : "bg-background/40 border-border/50 text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        <span className="text-xs font-bold">{role.label}</span>
                        <span className="text-[9px] text-muted-foreground/80 mt-0.5">{role.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <Button type="submit" className="bg-primary hover:bg-primary/80 text-foreground shadow-[0_0_15px_rgba(209,188,255,0.3)] gap-1.5 text-xs">
                    {inviteSent ? <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Invited!</span> : "Send Invitation"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Roster Listing */}
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-foreground text-sm flex items-center justify-between">
                <span className="flex items-center gap-2"><Users className="w-4 h-4 text-primary" /> Teammate Roles & Status</span>
                <Badge className="bg-primary/10 text-primary border-primary/20 text-[9px] font-bold">{teammates.length} users registered</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {teammates.map((member) => (
                <div key={member.id} className="p-3 rounded-xl bg-background/30 border border-border/30 flex items-center justify-between hover:bg-muted/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${
                      member.role === "ai" 
                        ? "bg-primary/20 text-primary border border-primary/30 shadow-[0_0_10px_rgba(209,188,255,0.2)] animate-pulse" 
                        : "bg-muted text-foreground"
                    }`}>
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        {member.name}
                        {member.role === "ai" && (
                          <Badge className="bg-primary/15 text-primary border-primary/20 text-[8px] font-bold px-1 py-0">Virtual Receptionist</Badge>
                        )}
                      </div>
                      <div className="text-[10px] text-muted-foreground">{member.email}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Badge className={`text-[8px] uppercase tracking-wider font-bold ${
                      member.role === "admin" ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                      member.role === "ai" ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" :
                      "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    }`}>
                      {member.role === "ai" ? "AI Agent" : member.role}
                    </Badge>
                    
                    <span className="flex items-center gap-1 text-[10px]">
                      <span className={`w-1.5 h-1.5 rounded-full ${member.status === "active" ? "bg-emerald-400 animate-pulse" : "bg-zinc-500"}`}></span>
                      <span className={member.status === "active" ? "text-emerald-400 font-bold" : "text-muted-foreground"}>
                        {member.status === "active" ? "Active" : "Invited"}
                      </span>
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Channel Connections Hub */}
        <div className="lg:col-span-6 space-y-6">
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-foreground text-base flex items-center gap-2">
                <LinkIcon className="w-5 h-5 text-primary" /> Channel Integrations Hub
              </CardTitle>
              <CardDescription className="text-muted-foreground text-xs">Authorize, sync, and deploy Saarthi replies automatically across channels.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {integrations.map((item) => (
                <div key={item.id} className="p-4 rounded-xl bg-background/20 border border-border/30 space-y-3 hover:bg-muted/10 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-lg bg-black/40 border border-border/50 flex items-center justify-center shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-2">
                          {item.name}
                          <Badge className="bg-zinc-800 text-zinc-300 text-[8px] px-1 py-0">{item.type}</Badge>
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">{item.description}</p>
                      </div>
                    </div>

                    <Button
                      onClick={() => handleToggleIntegration(memberId(item.id))}
                      disabled={connectingId === item.id}
                      className={`text-[10px] h-7 px-3 rounded-lg flex items-center gap-1.5 shrink-0 ${
                        item.connected 
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/20 transition-all font-semibold" 
                          : "bg-primary text-foreground hover:bg-primary/80 font-bold"
                      }`}
                      variant={item.connected ? "outline" : "default"}
                    >
                      {connectingId === item.id ? (
                        <span className="flex items-center gap-1 animate-pulse"><Sparkles className="w-3 h-3 animate-spin" /> Syncing...</span>
                      ) : item.connected ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Connected</span>
                        </>
                      ) : (
                        "Connect"
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  // Helper helper
  function memberId(id: string): string {
    return id;
  }
}

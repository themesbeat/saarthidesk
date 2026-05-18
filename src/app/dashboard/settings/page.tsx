"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, Users, UserPlus, Key, Link as LinkIcon, 
  Check, Mail, MessageSquare, Instagram, Globe, 
  MessageCircle, AlertCircle, Sparkles, UserCheck, Send, Copy, X
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
  const [teammates, setTeammates] = useState<Teammate[]>([]);
  const [loadingTeam, setLoadingTeam] = useState(true);

  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [inviteRole, setInviteRole] = useState<"admin" | "agent" | "ai">("agent");
  const [inviteSent, setInviteSent] = useState(false);

  // Webhook URLs returned from the server
  const [webhookUrls, setWebhookUrls] = useState<Record<string, string>>({});

  // Integrations State
  const [integrations, setIntegrations] = useState<Integration[]>([
    { 
      id: "telegram", 
      name: "Telegram Bot Integration", 
      description: "Connect your Telegram Bot to instantly route user messages into your Saarthi Desk.",
      icon: <Send className="w-5 h-5 text-sky-400" />, 
      connected: false,
      type: "Telegram"
    },
    { 
      id: "whatsapp", 
      name: "WhatsApp Business API", 
      description: "Send templates and converse with clients via WhatsApp.",
      icon: <MessageCircle className="w-5 h-5 text-emerald-400" />, 
      connected: false,
      type: "WhatsApp"
    },
    { 
      id: "instagram", 
      name: "Instagram Direct Messages", 
      description: "Answer client comments and DMs automatically via AI replies.",
      icon: <Instagram className="w-5 h-5 text-rose-400" />, 
      connected: false,
      type: "Social"
    },
    { 
      id: "web-widget", 
      name: "Embed Web Chat Widget", 
      description: "Deploy an interactive floating chat bubble directly on your website.",
      icon: <Globe className="w-5 h-5 text-sky-400" />, 
      connected: false,
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

  // Telegram Credentials Modal State
  const [isTelegramModalOpen, setIsTelegramModalOpen] = useState(false);
  const [telegramToken, setTelegramToken] = useState("");
  const [telegramSaving, setTelegramSaving] = useState(false);
  const [copiedWebhook, setCopiedWebhook] = useState(false);
  const [copiedRegistrationUrl, setCopiedRegistrationUrl] = useState(false);
  const [isLocalhost, setIsLocalhost] = useState(false);

  // Fetch Team & Channel Configurations
  useEffect(() => {
    async function loadSettings() {
      try {
        // Fetch teammates
        const teamRes = await fetch("/api/team");
        const teamData = await teamRes.json();
        if (teamData.success && teamData.members) {
          const mappedTeam: Teammate[] = teamData.members.map((m: any) => ({
            id: m.id,
            name: m.user?.name || m.user?.email.split("@")[0] || "Support Staff",
            email: m.user?.email || "",
            role: m.role.toLowerCase() as Teammate["role"],
            status: "active"
          }));
          // Add default virtual receptionist if not exists
          if (!mappedTeam.some(t => t.role === "ai")) {
            mappedTeam.push({
              id: "saarthi-ai",
              name: "Saarthi AI",
              email: "ai-agent@saarthidesk.com",
              role: "ai",
              status: "active"
            });
          }
          setTeammates(mappedTeam);
        }

        // Fetch channels
        const channelRes = await fetch("/api/channels");
        const channelData = await channelRes.json();
        if (channelData.success) {
          setWebhookUrls(channelData.webhookUrls || {});
          
          // Map DB channel connections to integration statuses
          const activeChannels = channelData.channels || [];
          setIntegrations((prev) => 
            prev.map((item) => {
              const dbMatch = activeChannels.find((c: any) => c.type.toLowerCase() === item.id.toLowerCase());
              return {
                ...item,
                connected: dbMatch ? dbMatch.isActive : false
              };
            })
          );

          // Get bot token if telegram is connected
          const telegramDb = activeChannels.find((c: any) => c.type === "TELEGRAM");
          if (telegramDb?.credentials?.botToken) {
            setTelegramToken(telegramDb.credentials.botToken);
          }
        }
        setLoadingTeam(false);
      } catch (err) {
        console.error("Failed to load settings data:", err);
        setLoadingTeam(false);
      }
    }

    loadSettings();

    // Check environment
    if (typeof window !== "undefined") {
      setIsLocalhost(window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");
    }
  }, []);

  const handleSendInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim() || !inviteName.trim()) return;

    try {
      const res = await fetch("/api/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: inviteEmail.trim(), role: inviteRole }),
      });
      const data = await res.json();
      if (data.success) {
        const newTeammate: Teammate = {
          id: data.member.id,
          name: inviteName.trim(),
          email: inviteEmail.trim(),
          role: inviteRole,
          status: "active"
        };
        setTeammates((prev) => [...prev, newTeammate]);
        setInviteEmail("");
        setInviteName("");
        setInviteSent(true);
        setTimeout(() => setInviteSent(false), 2500);
      } else {
        alert(data.error || "Failed to invite teammate");
      }
    } catch (err) {
      console.error("[InviteTeammate] Error:", err);
    }
  };

  const handleToggleIntegration = async (id: string) => {
    const item = integrations.find(i => i.id === id);
    if (!item) return;

    if (id === "telegram") {
      // Open the credentials dialog for Telegram Bot Token entry
      setIsTelegramModalOpen(true);
      return;
    }

    // Default simulation for WhatsApp, Instagram, Email, Web widget
    if (item.connected) {
      // Disconnect channel
      setConnectingId(id);
      try {
        const res = await fetch("/api/channels", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: id.toUpperCase(), credentials: {}, isActive: false }),
        });
        const data = await res.json();
        if (data.success) {
          setIntegrations((prev) => prev.map(i => i.id === id ? { ...i, connected: false } : i));
        }
      } catch (err) {
        console.error("Disconnect channel error:", err);
      } finally {
        setConnectingId(null);
      }
    } else {
      // Trigger connecting loader simulation
      setConnectingId(id);
      setTimeout(async () => {
        try {
          const res = await fetch("/api/channels", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type: id.toUpperCase(), credentials: { mockKey: "demo_val" }, isActive: true }),
          });
          const data = await res.json();
          if (data.success) {
            setIntegrations((prev) => prev.map(i => i.id === id ? { ...i, connected: true } : i));
          }
        } catch (err) {
          console.error("Connect channel error:", err);
        } finally {
          setConnectingId(null);
        }
      }, 1500);
    }
  };

  // Telegram Credentials Saver
  const handleSaveTelegram = async () => {
    if (!telegramToken.trim()) return;
    setTelegramSaving(true);

    try {
      const res = await fetch("/api/channels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "TELEGRAM",
          credentials: { botToken: telegramToken.trim() },
          isActive: true
        }),
      });
      const data = await res.json();
      if (data.success) {
        // Toggle connected state in integration list
        setIntegrations((prev) => prev.map(i => i.id === "telegram" ? { ...i, connected: true } : i));
        setIsTelegramModalOpen(false);

        // Notify registration webhook result
        if (data.webhookRegistered) {
          alert("Telegram Bot connected successfully! Webhook registered automatically.");
        } else if (data.telegramError) {
          alert(`Bot Token saved, but failed to auto-register webhook with Telegram: ${data.telegramError}`);
        } else {
          alert("Telegram credentials saved! Since you are on localhost, you will need to manually set the webhook.");
        }
      } else {
        alert(data.error || "Failed to save Telegram credentials");
      }
    } catch (err) {
      console.error("[TelegramSave] Error:", err);
      alert("An unexpected error occurred while saving credentials.");
    } finally {
      setTelegramSaving(false);
    }
  };

  const handleDisconnectTelegram = async () => {
    setTelegramSaving(true);
    try {
      const res = await fetch("/api/channels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "TELEGRAM",
          credentials: {},
          isActive: false
        }),
      });
      const data = await res.json();
      if (data.success) {
        setIntegrations((prev) => prev.map(i => i.id === "telegram" ? { ...i, connected: false } : i));
        setTelegramToken("");
        setIsTelegramModalOpen(false);
        alert("Telegram Bot disconnected.");
      }
    } catch (err) {
      console.error("[TelegramDisconnect] Error:", err);
    } finally {
      setTelegramSaving(false);
    }
  };

  const copyToClipboard = (text: string, stateSetter: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    stateSetter(true);
    setTimeout(() => stateSetter(false), 2000);
  };

  // Helper values
  const tgWebhookUrl = webhookUrls.telegram || `https://your-deployment-domain.com/api/webhooks/telegram`;
  const tgRegistrationUrl = `https://api.telegram.org/bot${telegramToken || "<bot-token>"}/setWebhook?url=${tgWebhookUrl}`;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 h-full flex flex-col overflow-auto relative">
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
                <Badge className="bg-primary/10 text-primary border-primary/20 text-[9px] font-bold">
                  {loadingTeam ? "Loading..." : `${teammates.length} users registered`}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {loadingTeam ? (
                <div className="py-4 text-center text-xs text-muted-foreground animate-pulse">Retrieving roster database...</div>
              ) : (
                teammates.map((member) => (
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
                ))
              )}
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
                      onClick={() => handleToggleIntegration(item.id)}
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

      {/* Telegram Connection overlay Modal */}
      {isTelegramModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
          <div className="w-full max-w-xl bg-zinc-950 border border-border/80 rounded-2xl shadow-2xl p-6 relative flex flex-col gap-5 text-foreground animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button 
              onClick={() => setIsTelegramModalOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                <Send className="w-6 h-6 text-sky-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Telegram Integration Settings</h3>
                <p className="text-xs text-muted-foreground">Configure the Bot Token credentials for your Telegram customer support channel.</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Bot Token Entry */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300">Telegram Bot Token (HTTP API Key)</label>
                <Input 
                  type="password"
                  value={telegramToken}
                  onChange={(e) => setTelegramToken(e.target.value)}
                  placeholder="e.g. 123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ"
                  className="bg-zinc-900 border-zinc-800 text-xs font-mono h-10 tracking-widest text-white"
                />
              </div>

              {/* Steps Instructions */}
              <Card className="bg-zinc-900/60 border-zinc-800/80 p-3.5 rounded-xl space-y-2 text-[11px] text-zinc-300">
                <div className="font-bold text-white text-xs mb-1 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-sky-400" /> How to connect your Telegram Bot:
                </div>
                <ul className="list-decimal list-inside space-y-1.5 leading-relaxed pl-1">
                  <li>Open Telegram and search for <a href="https://t.me/BotFather" target="_blank" rel="noreferrer" className="text-sky-400 font-semibold underline">@BotFather</a>.</li>
                  <li>Type <code className="bg-black px-1 py-0.5 rounded text-sky-400 text-[10px]">/newbot</code> and follow the prompts to create your support bot.</li>
                  <li>Copy the resulting **HTTP API token** and paste it in the field above.</li>
                  <li>Save below. Saarthi Desk will handle messages received by this bot.</li>
                </ul>
              </Card>

              {/* Webhook Configuration Section */}
              <div className="space-y-2 bg-zinc-900/40 border border-zinc-800/60 rounded-xl p-3.5 text-[11px] leading-relaxed">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-emerald-400" /> Webhook Setup Options
                </div>
                <p className="text-muted-foreground">Your workspace-isolated webhook receiver endpoint is:</p>
                <div className="flex items-center gap-2 bg-black/60 p-2 rounded-lg border border-zinc-900 font-mono text-[10px] text-zinc-300 overflow-x-auto justify-between">
                  <span className="truncate pr-2">{tgWebhookUrl}</span>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-6 w-6 text-zinc-400 hover:text-white shrink-0 hover:bg-zinc-800"
                    onClick={() => copyToClipboard(tgWebhookUrl, setCopiedWebhook)}
                  >
                    {copiedWebhook ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </Button>
                </div>

                {isLocalhost ? (
                  <div className="mt-2.5 p-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-lg">
                    ⚠️ <strong>Local Development Notice:</strong> Telegram cannot deliver messages to <code>localhost</code> directly. Use a public tunnel like <strong>ngrok</strong> (e.g. <code>ngrok http 3000</code>) and set the bot webhook by pasting your tunnel URL in the clipboard copy option below, then navigate to it in your web browser:
                    <div className="mt-2 flex items-center gap-2 bg-black/60 p-2 rounded-lg font-mono text-[9px] text-zinc-300 justify-between overflow-x-auto">
                      <span className="truncate pr-2">{tgRegistrationUrl}</span>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-5 w-5 text-zinc-400 hover:text-white shrink-0 hover:bg-zinc-800"
                        onClick={() => copyToClipboard(tgRegistrationUrl, setCopiedRegistrationUrl)}
                      >
                        {copiedRegistrationUrl ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold mt-1">
                    ✓ Saarthi will automatically register this webhook with Telegram upon clicking Save.
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              {telegramToken ? (
                <Button 
                  onClick={handleDisconnectTelegram} 
                  disabled={telegramSaving}
                  variant="ghost" 
                  className="text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 text-xs px-3"
                >
                  {telegramSaving ? "Processing..." : "Disconnect Bot"}
                </Button>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  onClick={() => setIsTelegramModalOpen(false)}
                  className="text-muted-foreground hover:text-white text-xs h-9"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSaveTelegram} 
                  disabled={telegramSaving || !telegramToken.trim()}
                  className="bg-primary hover:bg-primary/80 text-foreground text-xs font-bold gap-1 h-9 shadow-[0_0_15px_rgba(209,188,255,0.25)]"
                >
                  {telegramSaving ? (
                    <span className="flex items-center gap-1"><Sparkles className="w-3 h-3 animate-spin" /> Activating...</span>
                  ) : (
                    "Save & Activate Bot"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

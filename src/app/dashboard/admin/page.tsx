"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ShieldAlert, Settings, Sparkles, Terminal, 
  CheckCircle2, AlertTriangle, Play, RefreshCw,
  Server, Cpu, Activity, ShieldCheck, HelpCircle,
  Eye, ToggleLeft, Megaphone, Send, Globe
} from "lucide-react";

interface TenantWorkspace {
  id: string;
  name: string;
  plan: "Starter" | "Pro" | "Enterprise";
  domain: string;
  chatsResolved: number;
  fraudStatus: "Passed" | "Flagged";
  healthScore: number;
}

interface BetaFlag {
  id: string;
  name: string;
  description: string;
  enabledGlobal: boolean;
}

export default function AdminPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Alert composer states
  const [alertTitle, setAlertTitle] = useState<string>("Scheduled Database Checkup");
  const [alertBody, setAlertBody] = useState<string>("SaarthiDesk will undergo a scheduled database checkup at 2:00 AM UTC. Expect minor latency spikes.");
  const [alertType, setAlertType] = useState<string>("Maintenance");

  const [tenants, setTenants] = useState<TenantWorkspace[]>([
    { id: "1", name: "Delhi Dental Clinic", plan: "Pro", domain: "delhiclinics.com", chatsResolved: 412, fraudStatus: "Passed", healthScore: 98 },
    { id: "2", name: "Tenth Gym & Spa Group", plan: "Starter", domain: "tenthgyms.com", chatsResolved: 184, fraudStatus: "Passed", healthScore: 95 },
    { id: "3", name: "Bengaluru E-Commerce Hub", plan: "Enterprise", domain: "bengalurustore.in", chatsResolved: 1056, fraudStatus: "Passed", healthScore: 100 },
    { id: "4", name: "Royal Realty Agents", plan: "Pro", domain: "royalrealty.com", chatsResolved: 280, fraudStatus: "Flagged", healthScore: 82 }
  ]);

  const [betaFlags, setBetaFlags] = useState<BetaFlag[]>([
    { id: "1", name: "Voice-to-Voice AI Receptionist", description: "Audio streaming pipelines for automated phone calling shifts", enabledGlobal: false },
    { id: "2", name: "Slack Native Collaboration Channel", description: "Brings Saarthi helpdesk directly inside client Slack apps", enabledGlobal: true },
    { id: "3", name: "Deep Zoho CRM Roster Integration", description: "Sync contacts, custom filters and CRM cards automatically", enabledGlobal: false }
  ]);

  const toggleBetaFlag = (id: string, name: string) => {
    setBetaFlags(betaFlags.map((f) => {
      if (f.id === id) {
        const next = !f.enabledGlobal;
        setToastMessage(`Beta feature flag "${name}" is now ${next ? "Enabled Globally" : "Disabled"}.`);
        setTimeout(() => setToastMessage(null), 3500);
        return { ...f, enabledGlobal: next };
      }
      return f;
    }));
  };

  const dispatchAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertTitle.trim()) return;

    setToastMessage(`Global system announcement "${alertTitle}" dispatched to all workspaces header buffers!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const impersonateWorkspace = (workspaceName: string) => {
    setToastMessage(`Launching secure impersonation session. Entering "${workspaceName}" workspace in spectator mode...`);
    setTimeout(() => setToastMessage(null), 4500);
  };

  return (
    <div className="p-6 space-y-6 text-foreground">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-popover border border-primary/20 backdrop-blur-md rounded-xl p-4 shadow-[0_10px_30px_rgba(209,188,255,0.15)] flex items-start gap-3 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
          <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold">SaaS Supervisor Control</h4>
            <p className="text-xs text-muted-foreground mt-1">{toastMessage}</p>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-muted-foreground hover:text-foreground text-xs font-semibold ml-auto pl-2">×</button>
        </div>
      )}

      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">SaaS Admin Panel</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Supervisor control center. Audit multi-tenant workspaces, analyze platform diagnostic capacities, rollout beta flags, and broadcast announcements.
          </p>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3 py-2 rounded-xl flex items-center gap-2 font-semibold shadow-[0_2px_10px_rgba(16,185,129,0.1)]">
          <Server className="w-3.5 h-3.5 animate-pulse" /> Platform Core: 99.98% Uptime
        </div>
      </div>

      {/* platform diagnostics stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card/40 border-border/40 backdrop-blur-md p-4">
          <div className="flex justify-between items-center text-xs font-bold text-muted-foreground uppercase tracking-wider">
            <span>Global Tenants</span>
            <Globe className="w-4 h-4 text-primary" />
          </div>
          <div className="text-2xl font-black mt-2">284 Workspaces</div>
          <p className="text-[10px] text-muted-foreground mt-1">Multi-tenant routing active</p>
        </Card>
        <Card className="bg-card/40 border-border/40 backdrop-blur-md p-4">
          <div className="flex justify-between items-center text-xs font-bold text-muted-foreground uppercase tracking-wider">
            <span>Platform MRR</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black mt-2">$14,840</div>
          <p className="text-[10px] text-emerald-400 font-bold mt-1">+14.2% MRR growth</p>
        </Card>
        <Card className="bg-card/40 border-border/40 backdrop-blur-md p-4">
          <div className="flex justify-between items-center text-xs font-bold text-muted-foreground uppercase tracking-wider">
            <span>User Sessions</span>
            <Cpu className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black mt-2">84 Live Users</div>
          <p className="text-[10px] text-muted-foreground mt-1">Distributed across clusters</p>
        </Card>
        <Card className="bg-card/40 border-border/40 backdrop-blur-md p-4">
          <div className="flex justify-between items-center text-xs font-bold text-muted-foreground uppercase tracking-wider">
            <span>Database latency</span>
            <Server className="w-4 h-4 text-yellow-400" />
          </div>
          <div className="text-2xl font-black mt-2">24 ms</div>
          <p className="text-[10px] text-emerald-400 mt-1">Redis memory cache optimized</p>
        </Card>
      </div>

      {/* Diagnostic progress metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <DiagnosticMeter title="Server Memory Usage" value="4.2 GB / 10 GB (42%)" percentage={42} />
        <DiagnosticMeter title="CPU core clusters" value="18% average spikes" percentage={18} />
        <DiagnosticMeter title="Outgoing Error Rates" value="0.02% (No anomalies)" percentage={2} />
      </div>

      {/* Main Grid splits */}
      <div className="grid gap-6 lg:grid-cols-7 items-start">
        
        {/* Multi-Tenant supervisor (Left Column - 4 grids) */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-card/45 border-border/40 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Workspace Supervisor Directory</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">List of active customer portals, security metrics, and health scores</p>
            </CardHeader>
            <CardContent className="px-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border/30 text-[10px] text-muted-foreground tracking-wider uppercase bg-muted/20">
                      <th className="py-2.5 px-4">Workspace Title</th>
                      <th className="py-2.5 px-4 text-center">Plan Tier</th>
                      <th className="py-2.5 px-4">Mapped Domain</th>
                      <th className="py-2.5 px-4 text-center">Fraud check</th>
                      <th className="py-2.5 px-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/20 text-xs">
                    {tenants.map((t) => (
                      <tr key={t.id} className="hover:bg-muted/10 transition-colors">
                        <td className="py-3 px-4 font-bold text-foreground">
                          <div>
                            <span>{t.name}</span>
                            <span className="block text-[9px] text-muted-foreground font-mono">ID: tenant_ws_{t.id}092</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                            t.plan === 'Enterprise' ? 'bg-primary/20 text-primary border-primary/20' : t.plan === 'Pro' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/10' : 'bg-muted border-border/40 text-muted-foreground'
                          }`}>
                            {t.plan}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono text-[10px] text-primary">{t.domain}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center justify-center gap-1 mx-auto max-w-[80px] ${
                            t.fraudStatus === 'Passed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400 animate-pulse'
                          }`}>
                            <ShieldCheck className="w-3 h-3" /> {t.fraudStatus}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button 
                            onClick={() => impersonateWorkspace(t.name)}
                            className="px-2.5 py-1 text-[10px] bg-primary/20 hover:bg-primary/30 text-primary border border-primary/20 font-semibold rounded-md transition-colors flex items-center gap-1 mx-auto"
                          >
                            <Eye className="w-3.5 h-3.5" /> Impersonate
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Beta Feature rollouts */}
          <Card className="bg-card/45 border-border/40 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Global Feature Rollout Flags</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Toggle advanced developer features release schedules globally</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {betaFlags.map((f) => (
                <div key={f.id} className="bg-muted/20 border border-border/30 p-3.5 rounded-xl flex items-center justify-between gap-4 hover:border-primary/20 transition-all">
                  <div>
                    <h4 className="text-xs font-bold text-foreground">{f.name}</h4>
                    <p className="text-[10px] text-muted-foreground mt-1">{f.description}</p>
                  </div>
                  <button 
                    onClick={() => toggleBetaFlag(f.id, f.name)}
                    className={`px-3 py-1.5 text-[9px] font-bold rounded-lg border transition-all ${
                      f.enabledGlobal 
                        ? 'bg-primary text-primary-foreground border-transparent' 
                        : 'bg-muted/60 border-border/40 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {f.enabledGlobal ? "Enabled Globally" : "Rollout Beta"}
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Global Alert Composer (Right Column - 3 grids) */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="bg-card/45 border-border/40 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Global Platform Broadcast</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Write alert banners immediately visible on customer dashboard headers</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={dispatchAnnouncement} className="space-y-4">
                
                {/* Alert Category */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Announcement Category</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Maintenance", "System Alert", "Feature Promo"].map((t) => (
                      <button 
                        key={t}
                        type="button"
                        onClick={() => setAlertType(t)}
                        className={`py-2 text-[9px] font-semibold rounded-lg border transition-all ${
                          alertType === t 
                            ? 'bg-primary/20 text-primary border-primary/25 shadow-sm' 
                            : 'bg-muted/40 border-border/40 text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Announcement Title</label>
                  <input 
                    type="text"
                    required
                    value={alertTitle}
                    onChange={(e) => setAlertTitle(e.target.value)}
                    placeholder="Scheduled maintenance"
                    className="w-full bg-muted border border-border/40 text-xs px-3 py-2 rounded-lg text-foreground focus:outline-none focus:border-primary/50 font-bold"
                  />
                </div>

                {/* Message Body */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Announcement Content Banner</label>
                  <textarea 
                    value={alertBody}
                    onChange={(e) => setAlertBody(e.target.value)}
                    rows={4}
                    placeholder="Enter detailed notice banner text..."
                    className="w-full bg-muted border border-border/40 text-xs p-3 rounded-lg text-foreground focus:outline-none focus:border-primary/50 font-sans resize-none"
                  />
                </div>

                <div className="p-3 bg-muted/20 border border-border/30 rounded-xl space-y-2 text-[10px] text-muted-foreground">
                  <div className="flex items-center gap-1.5 font-bold text-foreground">
                    <Megaphone className="w-3.5 h-3.5 text-primary" /> Multi-Tenant Alert scope
                  </div>
                  <p className="leading-relaxed">
                    Broadcasting this announcement displays a prominent warning bar on the dashboard layout of every single active customer tenant.
                  </p>
                </div>

                <button 
                  type="submit"
                  className="w-full py-2.5 bg-primary text-primary-foreground font-bold hover:shadow-[0_0_12px_rgba(209,188,255,0.4)] rounded-lg transition-all text-xs flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> Broadcast Announcement
                </button>
              </form>
            </CardContent>
          </Card>
        </div>

      </div>

    </div>
  );
}

function DiagnosticMeter({ 
  title, value, percentage 
}: { 
  title: string; value: string; percentage: number 
}) {
  return (
    <Card className="bg-card/40 border-border/40 backdrop-blur-md p-4 space-y-3">
      <div className="flex justify-between items-center text-xs">
        <h4 className="font-bold text-muted-foreground">{title}</h4>
        <span className="font-mono text-foreground font-semibold text-[10px]">{value}</span>
      </div>
      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-700 ${
          percentage > 70 ? 'bg-rose-500' : percentage > 40 ? 'bg-yellow-500' : 'bg-emerald-500'
        }`} style={{ width: `${percentage}%` }}></div>
      </div>
    </Card>
  );
}

"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Link2, Key, Globe, Plus, Play, Sparkles, 
  CheckCircle2, AlertCircle, Copy, Check, Trash,
  ShoppingBag, CreditCard, Layers, Slack, Terminal
} from "lucide-react";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
  status: "Active" | "Revoked";
}

interface Webhook {
  id: string;
  url: string;
  events: string[];
  status: "Active" | "Inactive";
}

export default function IntegrationsPage() {
  const [activeTab, setActiveTab] = useState<"apps" | "keys" | "webhooks">("apps");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  
  // Apps Connection State
  const [appStates, setAppStates] = useState({
    shopify: true,
    stripe: true,
    hubspot: false,
    slack: true,
    zapier: false,
    razorpay: false
  });

  // API Keys state
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    { id: "1", name: "Production CRM Webhook Key", key: "sk_live_saarthi_8d2f10b98e3c4a", created: "2026-05-10", status: "Active" },
    { id: "2", name: "Staging sandbox key", key: "sk_test_saarthi_e5a2c4b8109d3f", created: "2026-05-15", status: "Active" }
  ]);

  // Webhooks state
  const [webhooks, setWebhooks] = useState<Webhook[]>([
    { id: "1", url: "https://api.mycompany.com/saarthi-inbound", events: ["lead.created", "chat.assigned"], status: "Active" }
  ]);
  const [webhookUrl, setWebhookUrl] = useState<string>("");
  const [selectedEvents, setSelectedEvents] = useState<string[]>(["lead.created"]);
  
  // Webhook Test trigger states
  const [isTestingWebhook, setIsTestingWebhook] = useState<boolean>(false);
  const [webhookTestResult, setWebhookTestResult] = useState<string | null>(null);

  const toggleApp = (app: keyof typeof appStates, label: string) => {
    setAppStates((prev) => {
      const next = { ...prev, [app]: !prev[app] };
      setToastMessage(`${label} integration is now ${next[app] ? "Connected & Synchronized" : "Disconnected"}.`);
      setTimeout(() => setToastMessage(null), 3500);
      return next;
    });
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKeyId(id);
    setToastMessage("API key copied to clipboard!");
    setTimeout(() => {
      setCopiedKeyId(null);
      setToastMessage(null);
    }, 3000);
  };

  const generateApiKey = () => {
    const randomHex = Math.random().toString(16).substring(2, 16);
    const newKey: ApiKey = {
      id: String(apiKeys.length + 1),
      name: `Developer Key Created ${new Date().toISOString().split("T")[0]}`,
      key: `sk_live_saarthi_${randomHex}`,
      created: new Date().toISOString().split("T")[0],
      status: "Active"
    };
    setApiKeys([...apiKeys, newKey]);
    setToastMessage("New developer REST API Key successfully generated!");
    setTimeout(() => setToastMessage(null), 3500);
  };

  const revokeKey = (id: string) => {
    setApiKeys(apiKeys.map((k) => k.id === id ? { ...k, status: "Revoked" } : k));
    setToastMessage("API Key revoked. Active developer threads will fail authentication.");
    setTimeout(() => setToastMessage(null), 3500);
  };

  const addWebhook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!webhookUrl.trim()) return;

    const newWebhook: Webhook = {
      id: String(webhooks.length + 1),
      url: webhookUrl,
      events: selectedEvents,
      status: "Active"
    };
    setWebhooks([...webhooks, newWebhook]);
    setWebhookUrl("");
    setToastMessage("Outbound Webhook endpoint added successfully!");
    setTimeout(() => setToastMessage(null), 3500);
  };

  const testWebhookPayload = () => {
    setIsTestingWebhook(true);
    setWebhookTestResult(null);

    setTimeout(() => {
      setIsTestingWebhook(false);
      setWebhookTestResult(JSON.stringify({
        status: 200,
        statusText: "OK",
        responseTimeMs: 242,
        delivered: true,
        payloadReceived: {
          event: selectedEvents[0] || "lead.created",
          timestamp: Date.now(),
          saarthiWorkspaceId: "ws_49820a1",
          data: {
            lead: { name: "Rahul Sharma", phone: "+91 98765 43210", category: "High Intent" }
          }
        }
      }, null, 2));
    }, 1500);
  };

  return (
    <div className="p-6 space-y-6 text-foreground">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-popover border border-primary/20 backdrop-blur-md rounded-xl p-4 shadow-[0_10px_30px_rgba(209,188,255,0.15)] flex items-start gap-3 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
          <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold">Integrations Vault</h4>
            <p className="text-xs text-muted-foreground mt-1">{toastMessage}</p>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-muted-foreground hover:text-foreground text-xs font-semibold ml-auto pl-2">×</button>
        </div>
      )}

      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Integrations & API keys</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage payment gates, global customer CRMs, outbound developer webhooks, and secure REST API authorization keys.
          </p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center border-b border-border/40 gap-6">
        <button 
          onClick={() => setActiveTab("apps")}
          className={`pb-3 text-sm font-semibold transition-all relative ${activeTab === 'apps' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
        >
          {activeTab === 'apps' && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-primary"></span>}
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4" /> Connected Apps
          </div>
        </button>
        <button 
          onClick={() => setActiveTab("keys")}
          className={`pb-3 text-sm font-semibold transition-all relative ${activeTab === 'keys' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
        >
          {activeTab === 'keys' && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-primary"></span>}
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4" /> Developer API Keys
          </div>
        </button>
        <button 
          onClick={() => setActiveTab("webhooks")}
          className={`pb-3 text-sm font-semibold transition-all relative ${activeTab === 'webhooks' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
        >
          {activeTab === 'webhooks' && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-primary"></span>}
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4" /> Outbound Webhooks
          </div>
        </button>
      </div>

      {/* Grid split */}
      <div className="grid gap-6 lg:grid-cols-7 items-start">
        
        {/* Main Workspace (Left Column - 4 grids) */}
        <div className="lg:col-span-4 space-y-6">
          
          {activeTab === "apps" && (
            <Card className="bg-card/45 border-border/40 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-base font-semibold">Integrations Directory</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">Toggle connections to synchronize customer databases and sales logs</p>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <IntegrationCard 
                  name="Shopify Engine" 
                  icon={<ShoppingBag className="w-5 h-5 text-emerald-400" />} 
                  description="Synchronize shop catalogs and capture abandoned checkouts to fire drip reminder campaigns."
                  isConnected={appStates.shopify}
                  onToggle={() => toggleApp("shopify", "Shopify")}
                />
                <IntegrationCard 
                  name="Stripe Portals" 
                  icon={<CreditCard className="w-5 h-5 text-cyan-400" />} 
                  description="Capture checkout billing success metrics and tie customer transactions directly to chat funnels."
                  isConnected={appStates.stripe}
                  onToggle={() => toggleApp("stripe", "Stripe")}
                />
                <IntegrationCard 
                  name="Slack Workspace" 
                  icon={<Slack className="w-5 h-5 text-purple-400" />} 
                  description="Notify team channels immediately on high-intent lead signups or critical SLA breaches."
                  isConnected={appStates.slack}
                  onToggle={() => toggleApp("slack", "Slack")}
                />
                <IntegrationCard 
                  name="HubSpot Portal" 
                  icon={<Link2 className="w-5 h-5 text-orange-400" />} 
                  description="Push chat-qualified leads, CSAT ratings, and appointment passes straight to standard contact pipelines."
                  isConnected={appStates.hubspot}
                  onToggle={() => toggleApp("hubspot", "HubSpot")}
                />
              </CardContent>
            </Card>
          )}

          {activeTab === "keys" && (
            <Card className="bg-card/45 border-border/40 backdrop-blur-md">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div>
                  <CardTitle className="text-base font-semibold">REST API Authorization Keys</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Secure keys to communicate with SaarthiDesk from your server code</p>
                </div>
                <button 
                  onClick={generateApiKey}
                  className="px-2.5 py-1 text-[10px] bg-primary text-primary-foreground font-bold hover:shadow-[0_0_12px_rgba(209,188,255,0.4)] rounded-lg transition-all flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Generate Key
                </button>
              </CardHeader>
              <CardContent className="space-y-4">
                {apiKeys.map((k) => (
                  <div key={k.id} className="bg-muted/20 border border-border/40 p-3.5 rounded-xl space-y-2 relative group hover:border-primary/20 transition-all">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-foreground">{k.name}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        k.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                      }`}>
                        {k.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between bg-muted/60 border border-border/20 px-3 py-1.5 rounded-lg font-mono text-xs">
                      <span className="text-muted-foreground select-all">{k.key}</span>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => copyToClipboard(k.key, k.id)}
                          className="p-1 hover:bg-muted text-muted-foreground hover:text-foreground rounded transition-colors"
                        >
                          {copiedKeyId === k.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                        {k.status === 'Active' && (
                          <button 
                            onClick={() => revokeKey(k.id)}
                            className="p-1 hover:bg-rose-500/10 text-rose-400 rounded transition-colors"
                            title="Revoke Key"
                          >
                            <Trash className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <p className="text-[10px] text-muted-foreground">Created on: {k.created}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {activeTab === "webhooks" && (
            <Card className="bg-card/45 border-border/40 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-base font-semibold">Dynamic Outbound Webhooks</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">Register HTTP POST targets to stream workspace logs in real-time</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={addWebhook} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Payload Endpoint URL</label>
                    <input 
                      type="url"
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      placeholder="https://api.yoursite.com/webhook-listener"
                      className="w-full bg-muted border border-border/40 text-xs px-3 py-2 rounded-lg text-foreground focus:outline-none focus:border-primary/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Triggering Workspace Events</label>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      {["lead.created", "chat.assigned", "ticket.resolved", "appointment.booked"].map((ev) => (
                        <label key={ev} className="flex items-center gap-2 bg-muted/20 border border-border/30 rounded-lg p-2.5 cursor-pointer hover:bg-muted/30">
                          <input 
                            type="checkbox"
                            checked={selectedEvents.includes(ev)}
                            onChange={() => {
                              setSelectedEvents(prev => 
                                prev.includes(ev) ? prev.filter(x => x !== ev) : [...prev, ev]
                              );
                            }}
                            className="accent-primary" 
                          />
                          <span className="font-mono text-[11px] text-foreground">{ev}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-2 bg-primary text-primary-foreground font-bold hover:shadow-lg rounded-lg text-xs"
                  >
                    Add Webhook Target
                  </button>
                </form>

                {/* Existing Webhooks */}
                <div className="border-t border-border/40 pt-4 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Registered Listeners</h4>
                  {webhooks.map((w) => (
                    <div key={w.id} className="bg-muted/30 border border-border/30 rounded-xl p-3.5 flex justify-between items-center gap-4">
                      <div className="space-y-1">
                        <span className="font-mono text-xs text-primary truncate block max-w-sm sm:max-w-md">{w.url}</span>
                        <div className="flex gap-1.5 flex-wrap">
                          {w.events.map(ev => (
                            <span key={ev} className="text-[9px] font-mono bg-muted border border-border/30 px-1.5 py-0.5 rounded text-muted-foreground">{ev}</span>
                          ))}
                        </div>
                      </div>
                      <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 border border-emerald-500/10 rounded-full">
                        {w.status}
                      </span>
                    </div>
                  ))}
                </div>

              </CardContent>
            </Card>
          )}

        </div>

        {/* Webhooks payload tester (Right Column - 3 grids) */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="bg-card/45 border-border/40 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-foreground">Webhook Payload Tester</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Fire simulated triggers and analyze raw network status logs</p>
            </CardHeader>
            <CardContent className="space-y-4">
              
              <div className="bg-muted border border-border/40 rounded-xl p-3 font-mono text-[10px] text-muted-foreground overflow-x-auto relative">
                <span className="absolute top-2 right-2 text-[8px] bg-primary/20 text-primary border border-primary/10 px-1 rounded uppercase font-bold font-sans">
                  Target: {selectedEvents[0] || "lead.created"}
                </span>
                <pre className="text-foreground leading-relaxed">
{`{
  "event": "${selectedEvents[0] || "lead.created"}",
  "timestamp": ${Date.now().toString().substring(0, 10)},
  "lead": {
    "name": "Rahul Sharma",
    "phone": "+91 98765 43210",
    "category": "High Intent"
  }
}`}
                </pre>
              </div>

              <button 
                onClick={testWebhookPayload}
                disabled={isTestingWebhook}
                className="w-full py-2 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/20 font-bold rounded-lg transition-all text-xs flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5" /> {isTestingWebhook ? "Sending Payload..." : "Test Dispatch Endpoint"}
              </button>

              {/* Webhook tester JSON results */}
              {webhookTestResult && (
                <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-3 space-y-3 animate-in fade-in duration-300">
                  <div className="flex justify-between items-center text-xs font-bold text-emerald-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> 🟢 Response: 200 OK
                    </span>
                    <span className="font-mono text-[10px]">242 ms</span>
                  </div>
                  
                  <div className="font-mono text-[9px] text-zinc-300 bg-black/40 border border-border/20 p-2.5 rounded-lg overflow-x-auto">
                    <pre>{webhookTestResult}</pre>
                  </div>
                </div>
              )}

            </CardContent>
          </Card>
        </div>

      </div>

    </div>
  );
}

function IntegrationCard({ 
  name, icon, description, isConnected, onToggle 
}: { 
  name: string; icon: React.ReactNode; description: string; isConnected: boolean; onToggle: () => void 
}) {
  return (
    <div className="bg-muted/30 border border-border/40 p-4 rounded-xl flex flex-col justify-between gap-4 hover:border-primary/20 transition-all">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-card/60 border border-border/60 flex items-center justify-center">
              {icon}
            </div>
            <h4 className="text-xs font-bold text-foreground">{name}</h4>
          </div>
          <button 
            onClick={onToggle}
            className={`px-2.5 py-1 text-[9px] font-bold rounded-full transition-all border ${
              isConnected 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/10 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/10' 
                : 'bg-muted/60 border-border/40 text-muted-foreground hover:text-foreground'
            }`}
          >
            {isConnected ? "Connected" : "Connect"}
          </button>
        </div>
        <p className="text-[10px] text-muted-foreground leading-relaxed">{description}</p>
      </div>
      <div className="text-[9px] text-muted-foreground flex items-center justify-between border-t border-border/20 pt-3">
        <span>Status: <span className={isConnected ? "text-emerald-400 font-semibold" : "text-zinc-500"}>{isConnected ? "Active Syncing" : "Idle"}</span></span>
        {isConnected && <span className="text-primary font-bold">Configure &rarr;</span>}
      </div>
    </div>
  );
}

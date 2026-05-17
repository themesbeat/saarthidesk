"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  CreditCard, Sparkles, CheckCircle2, ChevronRight, 
  HelpCircle, Settings, ShoppingBag, Terminal, 
  DollarSign, ArrowUpRight, Plus, Eye
} from "lucide-react";

interface Addon {
  id: string;
  name: string;
  price: number;
  description: string;
  active: boolean;
}

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: "Paid" | "Pending" | "Failed";
}

export default function BillingPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activePlan, setActivePlan] = useState<"free" | "pro" | "enterprise">("pro");
  const [basePrice, setBasePrice] = useState<number>(49);
  
  const [addons, setAddons] = useState<Addon[]>([
    { id: "1", name: "White-label Custom Domains", price: 15, description: "Remove Saarthi branding logo and map your personal domain mapping", active: true },
    { id: "2", name: "Real-time Voice-to-Voice AI", price: 25, description: "Unlocks fully responsive audio streams for phone receptionist automation", active: false },
    { id: "3", name: "Dedicated WhatsApp Dedicated IP", price: 10, description: "Ensure ultimate message throughput speed on high-frequency blasts", active: false }
  ]);

  const [invoices] = useState<Invoice[]>([
    { id: "INV-9283", date: "2026-05-01", amount: 64, status: "Paid" },
    { id: "INV-8120", date: "2026-04-01", amount: 64, status: "Paid" },
    { id: "INV-7091", date: "2026-03-01", amount: 49, status: "Paid" }
  ]);

  const toggleAddon = (id: string, name: string) => {
    setAddons(addons.map((a) => {
      if (a.id === id) {
        const nextState = !a.active;
        setToastMessage(`Add-on "${name}" is now ${nextState ? "Added" : "Removed"}. Recalculating recurring total...`);
        setTimeout(() => setToastMessage(null), 3500);
        return { ...a, active: nextState };
      }
      return a;
    }));
  };

  const changeSubscription = (plan: "free" | "pro" | "enterprise", price: number) => {
    setActivePlan(plan);
    setBasePrice(price);
    setToastMessage(`Your subscription has been switched to the ${plan.toUpperCase()} Tier. Auto-adjusting credit thresholds...`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const totalAddonsPrice = addons.filter((a) => a.active).reduce((sum, a) => sum + a.price, 0);
  const monthlyTotal = basePrice + totalAddonsPrice;

  return (
    <div className="p-6 space-y-6 text-foreground">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-popover border border-primary/20 backdrop-blur-md rounded-xl p-4 shadow-[0_10px_30px_rgba(209,188,255,0.15)] flex items-start gap-3 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
          <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold">Billing Ledger</h4>
            <p className="text-xs text-muted-foreground mt-1">{toastMessage}</p>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-muted-foreground hover:text-foreground text-xs font-semibold ml-auto pl-2">×</button>
        </div>
      )}

      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Plan Billing & AI Credits</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Coordinate subscription levels, monitor active monthly AI credits quotas, toggle marketplace features, and download invoices.
          </p>
        </div>
        <div className="bg-muted/30 border border-border/30 rounded-xl px-4 py-2.5 flex items-center gap-3 shrink-0">
          <div className="text-right">
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block">Estimated Monthly Billing</span>
            <span className="text-lg font-black text-foreground">${monthlyTotal} <span className="text-xs font-normal text-muted-foreground">/ month</span></span>
          </div>
        </div>
      </div>

      {/* Usage meters - Section 12 Specs */}
      <div className="grid gap-4 md:grid-cols-3">
        <UsageCard 
          title="AI Reply Credits used" 
          value="84,200 / 100,000" 
          percentage={84.2} 
          subtitle="Auto-recharges on 1st of month"
          color="bg-primary shadow-[0_0_8px_#a855f7]"
        />
        <UsageCard 
          title="Omnichannel Message Quota" 
          value="12,480 / 15,000" 
          percentage={83.2} 
          subtitle="All WhatsApp, SMS & Email text count"
          color="bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
        />
        <UsageCard 
          title="Connected WhatsApp templates" 
          value="4 / 5 slots" 
          percentage={80.0} 
          subtitle="Roster templates verified by Meta API"
          color="bg-emerald-400 shadow-[0_0_8px_#34d399]"
        />
      </div>

      {/* Main Grid: Plan comparison & Addons */}
      <div className="grid gap-6 lg:grid-cols-7 items-start">
        
        {/* Tier Selector (Left Column - 4 grids) */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-card/45 border-border/40 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Choose Subscription Tier</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Toggle tier access packages to unlock team capacities</p>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              
              {/* Free Tier */}
              <PlanCard 
                name="Starter Plan" 
                price="$0" 
                active={activePlan === 'free'}
                onClick={() => changeSubscription("free", 0)}
                features={["100 AI credits / mo", "Website Widget only", "Single staff member", "Standard logs"]}
              />

              {/* Pro Tier */}
              <PlanCard 
                name="Pro Business" 
                price="$49" 
                active={activePlan === 'pro'}
                onClick={() => changeSubscription("pro", 49)}
                features={["100k AI credits / mo", "WhatsApp & Omnichannel", "Unlimited active Staff", "SLA alerts dashboard", "Calendar synchronizations"]}
                popular={true}
              />

              {/* Enterprise */}
              <PlanCard 
                name="Enterprise Scale" 
                price="$199" 
                active={activePlan === 'enterprise'}
                onClick={() => changeSubscription("enterprise", 199)}
                features={["1M AI credits / mo", "White-labeled dashboards", "Outbound webhooks console", "Dedicated business IPs", "Multi-tenant routing"]}
              />

            </CardContent>
          </Card>

          {/* Transactions Ledger */}
          <Card className="bg-card/45 border-border/40 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Commission Invoices Ledger</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Download transactions history logs and receipt PDFs</p>
            </CardHeader>
            <CardContent className="px-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border/30 text-[10px] text-muted-foreground tracking-wider uppercase bg-muted/20">
                      <th className="py-2.5 px-4">Invoice Reference</th>
                      <th className="py-2.5 px-4 font-mono">Date</th>
                      <th className="py-2.5 px-4 text-right">Amount billed</th>
                      <th className="py-2.5 px-4 text-center">Status</th>
                      <th className="py-2.5 px-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/20 text-xs">
                    {invoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-muted/10 transition-colors">
                        <td className="py-3 px-4 font-bold text-foreground">{inv.id}</td>
                        <td className="py-3 px-4 font-mono text-[10px] text-muted-foreground">{inv.date}</td>
                        <td className="py-3 px-4 text-right font-mono font-medium text-foreground">${inv.amount}.00</td>
                        <td className="py-3 px-4 text-center">
                          <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 border border-emerald-500/10 rounded-full">
                            {inv.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button 
                            onClick={() => setToastMessage(`Simulating download for receipt PDF ${inv.id}...`)}
                            className="px-2.5 py-1 text-[10px] bg-muted/50 border border-border/50 hover:bg-muted hover:text-foreground text-muted-foreground font-semibold rounded-md transition-colors"
                          >
                            Receipt PDF
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Addon Marketplace (Right Column - 3 grids) */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="bg-card/45 border-border/40 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Optional Add-ons Marketplace</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Toggle advanced developer add-ons directly on your dashboard</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {addons.map((a) => (
                <div key={a.id} className="bg-muted/20 border border-border/40 p-4 rounded-xl flex flex-col justify-between gap-3 relative group hover:border-primary/20 transition-all">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="text-xs font-bold text-foreground">{a.name}</h5>
                      <span className="text-[10px] text-primary font-mono font-bold block mt-0.5">+${a.price}/mo billing</span>
                    </div>
                    <button 
                      onClick={() => toggleAddon(a.id, a.name)}
                      className={`px-3 py-1 text-[9px] font-bold rounded-full transition-all border ${
                        a.active 
                          ? 'bg-primary/20 text-primary border-primary/20 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/10' 
                          : 'bg-muted/60 border-border/40 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {a.active ? "Added" : "Add Features"}
                    </button>
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed mt-1">{a.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

      </div>

    </div>
  );
}

function UsageCard({ 
  title, value, percentage, subtitle, color 
}: { 
  title: string; value: string; percentage: number; subtitle: string; color: string 
}) {
  return (
    <Card className="bg-card/40 border-border/40 backdrop-blur-md p-4 space-y-3 hover:bg-card/65 transition-colors">
      <div className="flex justify-between items-center text-xs">
        <h4 className="font-bold text-muted-foreground uppercase tracking-wider">{title}</h4>
        <span className="font-mono text-foreground font-black">{value}</span>
      </div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${percentage}%` }}></div>
      </div>
      <p className="text-[10px] text-muted-foreground font-medium">{subtitle}</p>
    </Card>
  );
}

function PlanCard({ 
  name, price, active, onClick, features, popular = false 
}: { 
  name: string; price: string; active: boolean; onClick: () => void; features: string[]; popular?: boolean 
}) {
  return (
    <div className={`bg-muted/30 border p-4 rounded-xl flex flex-col justify-between gap-4 relative transition-all group ${
      active 
        ? 'border-primary shadow-[0_0_12px_rgba(209,188,255,0.2)] bg-primary/5' 
        : 'border-border/40 hover:border-primary/20'
    }`}>
      {popular && (
        <span className="absolute -top-2.5 left-4 text-[8px] bg-primary text-primary-foreground border border-primary/20 px-2 py-0.5 rounded-full font-black uppercase tracking-wider shadow-[0_2px_8px_rgba(209,188,255,0.4)]">
          Recommended
        </span>
      )}
      <div>
        <h5 className="text-xs font-black text-foreground">{name}</h5>
        <div className="mt-2 flex items-baseline gap-0.5">
          <span className="text-xl font-black text-foreground">{price}</span>
          <span className="text-[10px] text-muted-foreground">/mo</span>
        </div>

        <ul className="mt-4 space-y-2 text-[10px] text-muted-foreground">
          {features.map((f, i) => (
            <li key={i} className="flex items-center gap-1.5 font-medium leading-relaxed">
              <CheckCircle2 className="w-3 h-3 text-primary shrink-0" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>

      <button 
        onClick={onClick}
        disabled={active}
        className={`w-full py-1.5 rounded-lg text-[10px] font-bold transition-all border ${
          active 
            ? 'bg-primary text-primary-foreground border-transparent cursor-default' 
            : 'bg-muted/60 border-border/40 text-muted-foreground hover:bg-primary/20 hover:text-primary hover:border-primary/25 active:scale-95'
        }`}
      >
        {active ? "Active Plan" : "Choose Level"}
      </button>
    </div>
  );
}

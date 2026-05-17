"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, MoreHorizontal, Calendar, MessageSquare, IndianRupee, Loader2, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Contact {
  id: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  avatar: string | null;
}

interface Lead {
  id: string;
  contactId: string;
  stage: "NEW" | "INTERESTED" | "FOLLOW_UP" | "CONVERTED" | "CLOSED";
  source: string | null;
  value: number | null;
  notes: string | null;
  updatedAt: string;
  contact: Contact;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Lead insertion form states
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLeadName, setNewLeadName] = useState("");
  const [newLeadEmail, setNewLeadEmail] = useState("");
  const [newLeadPhone, setNewLeadPhone] = useState("");
  const [newLeadStage, setNewLeadStage] = useState<"NEW" | "INTERESTED" | "FOLLOW_UP" | "CONVERTED" | "CLOSED">("NEW");
  const [newLeadValue, setNewLeadValue] = useState("");
  const [newLeadSource, setNewLeadSource] = useState("");
  const [newLeadNotes, setNewLeadNotes] = useState("");

  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/inbox/lead");
      const data = await res.json();
      if (data.leads) {
        setLeads(data.leads);
      }
    } catch (err) {
      console.error("Failed to load CRM leads:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleUpdateStage = async (contactId: string, currentStage: string) => {
    const stages: ("NEW" | "INTERESTED" | "FOLLOW_UP" | "CONVERTED" | "CLOSED")[] = [
      "NEW",
      "INTERESTED",
      "FOLLOW_UP",
      "CONVERTED",
      "CLOSED"
    ];
    const currentIndex = stages.indexOf(currentStage as any);
    const nextIndex = (currentIndex + 1) % stages.length;
    const targetStage = stages[nextIndex];

    try {
      const res = await fetch("/api/inbox/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactId,
          stage: targetStage
        })
      });

      if (res.ok) {
        setToastMessage(`Moved lead to stage ${targetStage}!`);
        await fetchLeads();
      }
    } catch (err) {
      console.error("Failed to cycle lead stage:", err);
    }
  };

  const handleAddLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName) return;

    try {
      const res = await fetch("/api/inbox/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newLeadName,
          email: newLeadEmail || undefined,
          phone: newLeadPhone || undefined,
          stage: newLeadStage,
          value: newLeadValue ? parseFloat(newLeadValue) : 0,
          source: newLeadSource || "Direct Sales",
          notes: newLeadNotes || ""
        })
      });

      if (res.ok) {
        setToastMessage(`Successfully registered new CRM Lead "${newLeadName}"!`);
        setShowAddModal(false);
        setNewLeadName("");
        setNewLeadEmail("");
        setNewLeadPhone("");
        setNewLeadStage("NEW");
        setNewLeadValue("");
        setNewLeadSource("");
        setNewLeadNotes("");
        await fetchLeads();
      }
    } catch (err) {
      console.error("Failed to register lead:", err);
    }
  };

  const filteredLeads = leads.filter(l => 
    l.contact.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.source?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.notes?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getLeadsByStage = (stage: string) => {
    return filteredLeads.filter(l => l.stage === stage);
  };

  return (
    <div className="h-full flex flex-col p-6 overflow-hidden text-foreground">
      
      {/* Toast Alert Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-popover border border-primary/20 backdrop-blur-md rounded-xl p-4 shadow-[0_10px_30px_rgba(209,188,255,0.15)] flex items-start gap-3 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
          <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
            <IndianRupee className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold">CRM Updates</h4>
            <p className="text-xs text-muted-foreground mt-1">{toastMessage}</p>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-muted-foreground hover:text-foreground text-xs font-semibold ml-auto pl-2">×</button>
        </div>
      )}

      {/* Top Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Lead Management</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Track and convert your prospects dynamically through the pipeline stages.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-64 hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/80" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search leads..." 
              className="pl-9 bg-card border border-border/50 text-xs text-foreground focus:outline-none w-full h-9 rounded-md focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/50"
            />
          </div>
          <Button 
            onClick={() => setShowAddModal(true)}
            className="bg-primary hover:bg-primary/80 text-foreground gap-2 shadow-[0_0_15px_rgba(209,188,255,0.3)] text-xs h-9"
          >
            <Plus className="w-4 h-4" /> Add Lead
          </Button>
        </div>
      </div>

      {/* Kanban Columns Grid */}
      {isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-2 text-muted-foreground">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
          <span className="text-xs">Querying PostgreSQL CRM pipelines...</span>
        </div>
      ) : (
        <div className="flex-1 overflow-x-auto pb-4">
          <div className="flex gap-6 h-full min-w-max items-start">
            
            <KanbanColumn 
              title="New Lead" 
              count={getLeadsByStage("NEW").length} 
              color="bg-slate-500"
            >
              {getLeadsByStage("NEW").map(lead => (
                <LeadCard 
                  key={lead.id} 
                  lead={lead} 
                  onCycleStage={() => handleUpdateStage(lead.contactId, lead.stage)} 
                />
              ))}
            </KanbanColumn>

            <KanbanColumn 
              title="Interested" 
              count={getLeadsByStage("INTERESTED").length} 
              color="bg-primary"
            >
              {getLeadsByStage("INTERESTED").map(lead => (
                <LeadCard 
                  key={lead.id} 
                  lead={lead} 
                  onCycleStage={() => handleUpdateStage(lead.contactId, lead.stage)} 
                />
              ))}
            </KanbanColumn>

            <KanbanColumn 
              title="Follow Up" 
              count={getLeadsByStage("FOLLOW_UP").length} 
              color="bg-amber-500"
            >
              {getLeadsByStage("FOLLOW_UP").map(lead => (
                <LeadCard 
                  key={lead.id} 
                  lead={lead} 
                  onCycleStage={() => handleUpdateStage(lead.contactId, lead.stage)} 
                />
              ))}
            </KanbanColumn>

            <KanbanColumn 
              title="Converted" 
              count={getLeadsByStage("CONVERTED").length} 
              color="bg-emerald-500"
            >
              {getLeadsByStage("CONVERTED").map(lead => (
                <LeadCard 
                  key={lead.id} 
                  lead={lead} 
                  onCycleStage={() => handleUpdateStage(lead.contactId, lead.stage)} 
                />
              ))}
            </KanbanColumn>

            <KanbanColumn 
              title="Closed" 
              count={getLeadsByStage("CLOSED").length} 
              color="bg-rose-500"
            >
              {getLeadsByStage("CLOSED").map(lead => (
                <LeadCard 
                  key={lead.id} 
                  lead={lead} 
                  onCycleStage={() => handleUpdateStage(lead.contactId, lead.stage)} 
                />
              ))}
            </KanbanColumn>

          </div>
        </div>
      )}

      {/* Add Lead Dialog Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-card border border-border/50 rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="border-b border-border/30 p-4 flex items-center justify-between">
              <h3 className="font-bold text-sm text-foreground">Create Brand New CRM Lead</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-muted-foreground hover:text-foreground text-lg font-bold"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleAddLead} className="p-4 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Contact Name</label>
                <Input 
                  placeholder="e.g. Vikram Singh" 
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                  required
                  className="bg-background border-border/40 text-xs h-8 focus:ring-1 focus:ring-primary" 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Email ID</label>
                  <Input 
                    type="email"
                    placeholder="vikram@example.com" 
                    value={newLeadEmail}
                    onChange={(e) => setNewLeadEmail(e.target.value)}
                    className="bg-background border-border/40 text-xs h-8 focus:ring-1 focus:ring-primary" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Phone Number</label>
                  <Input 
                    placeholder="+91 99999 88888" 
                    value={newLeadPhone}
                    onChange={(e) => setNewLeadPhone(e.target.value)}
                    className="bg-background border-border/40 text-xs h-8 focus:ring-1 focus:ring-primary" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Initial Funnel Stage</label>
                  <select 
                    value={newLeadStage}
                    onChange={(e) => setNewLeadStage(e.target.value as any)}
                    className="w-full bg-background border border-border/40 rounded-md px-2 text-xs h-8 focus:ring-1 focus:ring-primary outline-none"
                  >
                    <option value="NEW">New Lead</option>
                    <option value="INTERESTED">Interested</option>
                    <option value="FOLLOW_UP">Follow Up</option>
                    <option value="CONVERTED">Converted</option>
                    <option value="CLOSED">Closed</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Lead Source</label>
                  <Input 
                    placeholder="e.g. Website Chat" 
                    value={newLeadSource}
                    onChange={(e) => setNewLeadSource(e.target.value)}
                    className="bg-background border-border/40 text-xs h-8 focus:ring-1 focus:ring-primary" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Pipeline Value (INR)</label>
                  <Input 
                    type="number"
                    placeholder="e.g. 4999" 
                    value={newLeadValue}
                    onChange={(e) => setNewLeadValue(e.target.value)}
                    className="bg-background border-border/40 text-xs h-8 focus:ring-1 focus:ring-primary" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Internal Agent Notes</label>
                  <Input 
                    placeholder="Needs demo of dashboard..." 
                    value={newLeadNotes}
                    onChange={(e) => setNewLeadNotes(e.target.value)}
                    className="bg-background border-border/40 text-xs h-8 focus:ring-1 focus:ring-primary" 
                  />
                </div>
              </div>

              <Button 
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-foreground font-bold text-xs h-9 mt-4 shadow-sm"
              >
                Register & Seed Lead
              </Button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

function KanbanColumn({ title, count, color, children }: { title: string; count: number; color: string; children: React.ReactNode }) {
  return (
    <div className="w-80 flex flex-col h-full shrink-0">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${color} shadow-[0_0_8px_currentColor] opacity-80`}></div>
          <h3 className="font-bold text-xs text-foreground tracking-tight">{title}</h3>
          <Badge variant="secondary" className="bg-white/10 text-muted-foreground/80 px-2 py-0.5 text-[9px] font-bold">{count}</Badge>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
        {children}
        {count === 0 && (
          <div className="flex flex-col items-center justify-center h-24 border border-dashed border-border/30 rounded-xl text-muted-foreground/60 text-[10px] italic">
            No active leads here
          </div>
        )}
      </div>
    </div>
  );
}

function LeadCard({ lead, onCycleStage }: { lead: Lead; onCycleStage: () => void }) {
  const needsFollowUp = lead.stage === "FOLLOW_UP";
  const displayVal = lead.value ? `₹${lead.value.toLocaleString("en-IN")}` : "Pending";
  const formattedDate = new Date(lead.updatedAt).toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric"
  });

  return (
    <div className={`bg-card border ${needsFollowUp ? 'border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.05)]' : 'border-border/40'} rounded-xl p-4 cursor-pointer hover:border-primary/50 hover:shadow-[0_0_20px_rgba(209,188,255,0.15)] transition-all group`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8 border border-border/45 shrink-0">
            {lead.contact.avatar && <AvatarImage src={lead.contact.avatar} />}
            <AvatarFallback className="bg-indigo-950 text-primary-foreground text-[10px] font-bold">
              {(lead.contact.name || "LD").substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <h4 className="font-bold text-foreground text-xs leading-none truncate group-hover:text-primary transition-colors">{lead.contact.name || "Unnamed Contact"}</h4>
            <p className="text-[9px] text-muted-foreground/80 mt-1 truncate">{lead.source || "Website Chat"}</p>
          </div>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onCycleStage();
          }}
          title="Move to Next Pipeline Stage"
          className="text-muted-foreground/60 hover:text-primary hover:bg-primary/10 h-7 w-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all ml-2"
        >
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
      
      {lead.notes && (
        <p className="text-[10px] text-muted-foreground/75 leading-relaxed bg-muted/20 border border-border/30 rounded-lg p-2 mb-3">
          {lead.notes}
        </p>
      )}
      
      <div className="flex items-center justify-between pt-3 border-t border-border/30 text-[10px] text-muted-foreground">
        <div className="flex items-center gap-1 text-emerald-400 font-bold">
          <IndianRupee className="w-3 h-3" /> {displayVal}
        </div>
        <div className="flex items-center gap-3 font-semibold text-[9px]">
          <div className="flex items-center gap-1 hover:text-foreground">
            <MessageSquare className="w-3 h-3 text-muted-foreground/85" />
            <span>Active</span>
          </div>
          <div className={`flex items-center gap-1 ${needsFollowUp ? 'text-amber-400' : 'text-muted-foreground/85'}`}>
            <Calendar className="w-3 h-3" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

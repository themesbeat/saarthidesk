"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Calendar as CalendarIcon, Clock, Users, Link2, 
  CheckCircle, Plus, AlertCircle, Trash, RefreshCw,
  Sparkles, Sliders, ListOrdered
} from "lucide-react";

interface WaitlistEntry {
  id: string;
  name: string;
  phone: string;
  service: string;
  priority: "High" | "Medium" | "Low";
}

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState<"calendar" | "rules" | "packages">("calendar");
  const [selectedStaff, setSelectedStaff] = useState<string>("All Staff");
  const [bufferTime, setBufferTime] = useState<number>(15);
  const [cancelWindow, setCancelWindow] = useState<number>(24);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([
    { id: "1", name: "Vikram Malhotra", phone: "+91 98765 43210", service: "Premium AI Setup Review", priority: "High" },
    { id: "2", name: "Amelie Dubois", phone: "+33 6 1234 5678", service: "Automated Consultation", priority: "Medium" },
    { id: "3", name: "Caleb Vance", phone: "+1 (555) 019-2834", service: "Enterprise Strategy Desk", priority: "Low" }
  ]);

  const dispatchWaitlistAlert = (entryName: string) => {
    setToastMessage(`Dispatched SMS waitlist alert to ${entryName}! Simulating slot reserve sequence...`);
    setTimeout(() => setToastMessage(null), 4500);
  };

  const removeWaitlist = (id: string) => {
    setWaitlist(waitlist.filter((w) => w.id !== id));
  };

  const syncCalendars = () => {
    setToastMessage("Re-syncing with Google Calendar and Microsoft Outlook accounts...");
    setTimeout(() => setToastMessage(null), 3000);
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
            <h4 className="text-sm font-semibold">Scheduler Notice</h4>
            <p className="text-xs text-muted-foreground mt-1">{toastMessage}</p>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-muted-foreground hover:text-foreground text-xs font-semibold ml-auto pl-2">×</button>
        </div>
      )}

      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Appointments & Scheduling</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Coordinate appointment scheduling calendar rules, connected email integrations, cancellation waitlists, and service catalogs.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button 
            onClick={syncCalendars}
            className="flex items-center gap-2 px-3 py-2 text-xs bg-muted/60 border border-border/50 hover:bg-muted/80 rounded-lg transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Sync Accounts
          </button>
          <button 
            onClick={() => setToastMessage("Opening booking creation assistant modal...")}
            className="flex items-center gap-1.5 px-3 py-2 text-xs bg-primary text-primary-foreground font-bold hover:shadow-[0_0_12px_rgba(209,188,255,0.4)] rounded-lg transition-all"
          >
            <Plus className="w-4 h-4" /> New Booking
          </button>
        </div>
      </div>

      {/* Calendar Synchronization Status Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-card/40 border-border/40 backdrop-blur-md p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <Link2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Google Calendar</h4>
              <span className="text-sm font-bold text-foreground">Synced (Active)</span>
            </div>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
        </Card>
        <Card className="bg-card/40 border-border/40 backdrop-blur-md p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
              <Link2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Outlook Calendar</h4>
              <span className="text-sm font-bold text-foreground">Synced (Active)</span>
            </div>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
        </Card>
        <Card className="bg-card/40 border-border/40 backdrop-blur-md p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">External Booking Widget</h4>
              <span className="text-sm font-bold text-foreground">Active (Embed code synced)</span>
            </div>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
        </Card>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center border-b border-border/40 gap-6">
        <button 
          onClick={() => setActiveTab("calendar")}
          className={`pb-3 text-sm font-semibold transition-all relative ${activeTab === 'calendar' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
        >
          {activeTab === 'calendar' && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-primary"></span>}
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" /> Bookings Calendar
          </div>
        </button>
        <button 
          onClick={() => setActiveTab("rules")}
          className={`pb-3 text-sm font-semibold transition-all relative ${activeTab === 'rules' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
        >
          {activeTab === 'rules' && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-primary"></span>}
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4" /> Booking Rules
          </div>
        </button>
        <button 
          onClick={() => setActiveTab("packages")}
          className={`pb-3 text-sm font-semibold transition-all relative ${activeTab === 'packages' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
        >
          {activeTab === 'packages' && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-primary"></span>}
          <div className="flex items-center gap-2">
            <ListOrdered className="w-4 h-4" /> Service Packages
          </div>
        </button>
      </div>

      {/* Dynamic Views */}
      <div className="grid gap-6 lg:grid-cols-7 items-start">
        
        {/* Main Work Area (Left Column - 4 sections) */}
        <div className="lg:col-span-4 space-y-6">
          {activeTab === "calendar" && (
            <Card className="bg-card/45 border-border/40 backdrop-blur-md">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div>
                  <CardTitle className="text-base font-semibold text-foreground">Interactive Bookings Grid</CardTitle>
                  <p className="text-xs text-muted-foreground">Select staff slots to inspect cancellation pipelines</p>
                </div>
                <select 
                  value={selectedStaff}
                  onChange={(e) => setSelectedStaff(e.target.value)}
                  className="bg-muted border border-border/50 text-xs font-semibold px-3 py-1.5 rounded-lg text-foreground focus:outline-none"
                >
                  <option>All Staff</option>
                  <option>Dr. Sarah Miller</option>
                  <option>Rohan Sen</option>
                  <option>AI Assistant Roster</option>
                </select>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-7 border border-border/40 rounded-xl overflow-hidden text-center text-xs divide-x divide-border/20">
                  {["Mon 18", "Tue 19", "Wed 20", "Thu 21", "Fri 22", "Sat 23", "Sun 24"].map((day, idx) => (
                    <div key={idx} className={`p-3 ${idx === 1 ? 'bg-primary/10 text-primary border-b border-primary/20' : 'hover:bg-muted/10'}`}>
                      <span className="font-semibold block">{day.split(" ")[0]}</span>
                      <span className="text-sm font-black block mt-0.5">{day.split(" ")[1]}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Active Bookings for Tuesday, May 19</h4>
                  <BookingItem 
                    time="10:00 AM - 10:45 AM" 
                    staff="Dr. Sarah Miller" 
                    client="Ananya Sen" 
                    type="Patient Intake Session" 
                    status="Confirmed" 
                    color="border-primary"
                  />
                  <BookingItem 
                    time="01:30 PM - 02:00 PM" 
                    staff="Rohan Sen" 
                    client="John Doe" 
                    type="General Health Consultation" 
                    status="Confirmed" 
                    color="border-cyan-400"
                  />
                  <BookingItem 
                    time="04:00 PM - 04:30 PM" 
                    staff="AI Assistant Roster" 
                    client="Pranav Rao" 
                    type="AI Reception Setup Review" 
                    status="Automated Pre-Check" 
                    color="border-emerald-400"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "rules" && (
            <Card className="bg-card/45 border-border/40 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-base font-semibold">Configuration of Booking Rules</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">Control buffers, reservation boundaries, and cancel triggers</p>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Buffer Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-foreground">Buffer Between Bookings</span>
                    <span className="font-mono text-primary">{bufferTime} minutes</span>
                  </div>
                  <input 
                    type="range" min="5" max="60" step="5"
                    value={bufferTime}
                    onChange={(e) => setBufferTime(Number(e.target.value))}
                    className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <p className="text-[10px] text-muted-foreground mt-1">Prevents back-to-back appointment fatigue. Auto-blocks hours on calendar.</p>
                </div>

                {/* Cancel Trigger */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-foreground">Cancellation & Reschedule Window</span>
                    <span className="font-mono text-primary">{cancelWindow} hours ahead</span>
                  </div>
                  <input 
                    type="range" min="12" max="72" step="12"
                    value={cancelWindow}
                    onChange={(e) => setCancelWindow(Number(e.target.value))}
                    className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <p className="text-[10px] text-muted-foreground mt-1">Disallows cancel requests when inside this buffer period to prevent loss.</p>
                </div>

                {/* Notification dispatches */}
                <div className="border-t border-border/40 pt-4 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Automated Notification Reminders</h4>
                  <div className="flex items-center justify-between bg-muted/20 border border-border/30 rounded-lg p-3">
                    <div>
                      <h5 className="text-xs font-semibold text-foreground">24-Hour Reminders</h5>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Dispatch WhatsApp and Email message 24 hours prior</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary" />
                  </div>
                  <div className="flex items-center justify-between bg-muted/20 border border-border/30 rounded-lg p-3">
                    <div>
                      <h5 className="text-xs font-semibold text-foreground">1-Hour Instant Pushes</h5>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Sends automated WhatsApp checkin alert with directions link</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary" />
                  </div>
                </div>

              </CardContent>
            </Card>
          )}

          {activeTab === "packages" && (
            <Card className="bg-card/45 border-border/40 backdrop-blur-md">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div>
                  <CardTitle className="text-base font-semibold">Service Package Catalogs</CardTitle>
                  <p className="text-xs text-muted-foreground">Display purchase bundles, subscriptions, or gift passes</p>
                </div>
                <button 
                  onClick={() => setToastMessage("Opening package template customizer...")}
                  className="px-2.5 py-1 text-[10px] bg-primary text-primary-foreground font-semibold rounded-md shadow-md"
                >
                  Create Package
                </button>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <PackageCard 
                  title="Premium AI Launch Review" 
                  price="$120" 
                  hours="3 hours included" 
                  description="Complete review of automated tone prompts, active web integration widgets, and customized sitemap catalogs."
                  badge="Popular"
                />
                <PackageCard 
                  title="General Health Consultation" 
                  price="$75" 
                  hours="45 minutes intake" 
                  description="Initial medical consultation sync with Dr. Sarah Miller, matching custom clinic patient portals."
                  badge="Standard"
                />
              </CardContent>
            </Card>
          )}
        </div>

        {/* Cancellation Waitlist Management (Right Column - 3 sections) */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="bg-card/45 border-border/40 backdrop-blur-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CardTitle className="text-base font-semibold text-foreground">Cancellation Waitlists</CardTitle>
                <span className="bg-primary/20 text-primary text-[10px] px-1.5 py-0.5 rounded font-bold">{waitlist.length} Queued</span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">Automatically dispatch WhatsApp notification to priority list if slots open</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {waitlist.length === 0 ? (
                <div className="text-center py-6 border border-dashed border-border/30 rounded-xl text-muted-foreground text-xs">
                  Waitlist is currently empty.
                </div>
              ) : (
                waitlist.map((entry) => (
                  <div key={entry.id} className="bg-muted/30 border border-border/40 rounded-xl p-3 flex flex-col justify-between gap-3 relative group">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="text-xs font-bold text-foreground">{entry.name}</h5>
                        <p className="text-[10px] text-muted-foreground">{entry.phone}</p>
                      </div>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        entry.priority === 'High' ? 'bg-rose-500/20 text-rose-400' : entry.priority === 'Medium' ? 'bg-amber-500/20 text-amber-400' : 'bg-cyan-500/20 text-cyan-400'
                      }`}>
                        {entry.priority} Priority
                      </span>
                    </div>

                    <div className="text-[11px] font-medium text-foreground bg-muted/40 border border-border/20 px-2 py-1 rounded">
                      Service: <span className="text-primary font-semibold">{entry.service}</span>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => dispatchWaitlistAlert(entry.name)}
                        className="flex-1 py-1 text-[10px] bg-primary/20 hover:bg-primary/30 text-primary font-bold border border-primary/20 rounded-md transition-all flex items-center justify-center gap-1"
                      >
                        <CheckCircle className="w-3 h-3" /> Auto-Dispatch Alert
                      </button>
                      <button 
                        onClick={() => removeWaitlist(entry.id)}
                        className="p-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-md transition-all"
                      >
                        <Trash className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

      </div>

    </div>
  );
}

function BookingItem({ 
  time, staff, client, type, status, color 
}: { 
  time: string; staff: string; client: string; type: string; status: string; color: string 
}) {
  return (
    <div className={`p-3 bg-muted/20 border-l-4 ${color} border border-border/40 rounded-r-xl flex items-center justify-between gap-4 hover:bg-muted/30 transition-all`}>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-muted-foreground font-bold">{time}</span>
          <span className="text-[10px] bg-primary/10 text-primary border border-primary/10 px-1.5 py-0.5 rounded font-medium">{staff}</span>
        </div>
        <h5 className="text-xs font-bold text-foreground">{client}</h5>
        <p className="text-[10px] text-muted-foreground">{type}</p>
      </div>
      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
        {status}
      </span>
    </div>
  );
}

function PackageCard({ 
  title, price, hours, description, badge 
}: { 
  title: string; price: string; hours: string; description: string; badge: string 
}) {
  return (
    <div className="bg-muted/30 border border-border/40 p-4 rounded-xl flex flex-col justify-between gap-3 relative group hover:border-primary/30 transition-all">
      <div>
        <div className="flex justify-between items-start">
          <span className="text-lg font-black text-foreground">{price}</span>
          <span className="text-[9px] font-bold px-1.5 py-0.5 bg-primary/20 text-primary rounded-full border border-primary/10">{badge}</span>
        </div>
        <h5 className="text-xs font-bold text-foreground mt-2">{title}</h5>
        <p className="text-[10px] text-muted-foreground mt-1.5 leading-relaxed">{description}</p>
      </div>
      <div className="flex items-center justify-between text-[10px] text-muted-foreground mt-2 border-t border-border/30 pt-3">
        <span className="font-semibold">{hours}</span>
        <span className="text-primary font-bold">Details &rarr;</span>
      </div>
    </div>
  );
}

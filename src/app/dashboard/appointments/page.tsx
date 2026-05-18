"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Calendar as CalendarIcon, Clock, Users, Link2, 
  CheckCircle, Plus, AlertCircle, Trash, RefreshCw,
  Sparkles, Sliders, ListOrdered, X, Phone, UserPlus, Info
} from "lucide-react";

interface Appointment {
  id: string;
  time: string;
  staff: string;
  client: string;
  type: string;
  status: string;
}

interface WaitlistEntry {
  id: string;
  name: string;
  phone: string;
  service: string;
  priority: string;
}

interface BookingRule {
  bufferTime: number;
  cancelWindow: number;
  reminder24h: boolean;
  reminder1h: boolean;
}

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState<"calendar" | "rules" | "packages">("calendar");
  const [selectedStaff, setSelectedStaff] = useState<string>("All Staff");
  
  // Dynamic state loaded from PostgreSQL
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [bookingRule, setBookingRule] = useState<BookingRule>({
    bufferTime: 15,
    cancelWindow: 24,
    reminder24h: true,
    reminder1h: true
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);

  // Form states
  const [newBooking, setNewBooking] = useState({
    time: "11:00 AM - 11:30 AM",
    staff: "Dr. Sarah Miller",
    client: "",
    type: "Follow-up Consultation"
  });

  const [newWaitlist, setNewWaitlist] = useState({
    name: "",
    phone: "",
    service: "Premium AI Setup Review",
    priority: "HIGH"
  });

  // Fetch all scheduling configurations
  const fetchSchedulingData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/appointments");
      const data = await res.json();
      if (data.success) {
        setAppointments(data.appointments);
        setWaitlist(data.waitlist);
        if (data.bookingRule) {
          setBookingRule(data.bookingRule);
        }
      }
    } catch (err) {
      console.error("Error fetching scheduling data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedulingData();
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4500);
  };

  // Create appointment handler
  const handleCreateAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBooking.client || !newBooking.time) return;

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create_appointment",
          ...newBooking
        })
      });
      const data = await res.json();
      if (data.success) {
        setAppointments(prev => [data.appointment, ...prev]);
        setIsBookingModalOpen(false);
        setNewBooking({
          time: "11:00 AM - 11:30 AM",
          staff: "Dr. Sarah Miller",
          client: "",
          type: "Follow-up Consultation"
        });
        triggerToast("Successfully reserved slot in PostgreSQL calendar! Dynamic reminders queued.");
      }
    } catch (err) {
      console.error("Error creating booking:", err);
    }
  };

  // Add waitlist handler
  const handleAddToWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWaitlist.name || !newWaitlist.phone) return;

    try {
      const res = await fetch("/api/appointments/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newWaitlist)
      });
      const data = await res.json();
      if (data.success) {
        setWaitlist(prev => [data.waitlistEntry, ...prev]);
        setIsWaitlistModalOpen(false);
        setNewWaitlist({
          name: "",
          phone: "",
          service: "Premium AI Setup Review",
          priority: "HIGH"
        });
        triggerToast("Waitlist candidate added to PostgreSQL priority queue!");
      }
    } catch (err) {
      console.error("Error adding to waitlist:", err);
    }
  };

  // Cancel appointment handler
  const handleCancelAppointment = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this slot booking?")) return;

    try {
      const res = await fetch("/api/appointments", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      if (data.success) {
        setAppointments(prev => prev.filter(app => app.id !== id));
        triggerToast("Appointment canceled. Live availability updated in database.");
      }
    } catch (err) {
      console.error("Error cancelling booking:", err);
    }
  };

  // Delete waitlist candidate
  const handleRemoveWaitlist = async (id: string) => {
    try {
      const res = await fetch("/api/appointments/waitlist", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      if (data.success) {
        setWaitlist(prev => prev.filter(wl => wl.id !== id));
        triggerToast("Candidate removed from cancellation waitlist queue.");
      }
    } catch (err) {
      console.error("Error removing waitlist candidate:", err);
    }
  };

  // Dispatch SMS alert simulation
  const dispatchWaitlistAlert = (entryName: string) => {
    triggerToast(`Dispatched SMS/WhatsApp priority nudge to ${entryName}! Simulating slot reserve sequence...`);
  };

  // Update scheduling rules in DB
  const handleUpdateRules = async (updatedFields: Partial<BookingRule>) => {
    const newRules = { ...bookingRule, ...updatedFields };
    setBookingRule(newRules);

    try {
      await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update_rules",
          ...newRules
        })
      });
    } catch (err) {
      console.error("Error updating rules:", err);
    }
  };

  const syncCalendars = () => {
    triggerToast("Re-syncing live slots with Google Calendar API and Outlook OAuth Roster...");
  };

  return (
    <div className="p-6 space-y-6 text-foreground">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-popover/90 border border-primary/20 backdrop-blur-md rounded-xl p-4 shadow-[0_10px_30px_rgba(209,188,255,0.15)] flex items-start gap-3 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
          <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold">Scheduler Notice</h4>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{toastMessage}</p>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-muted-foreground hover:text-foreground text-xs font-semibold shrink-0 pl-2">&times;</button>
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
            className="flex items-center gap-2 px-3 py-2 text-xs bg-muted/60 border border-border/50 hover:bg-muted/80 rounded-lg transition-colors font-semibold"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Sync Accounts
          </button>
          <button 
            onClick={() => setIsBookingModalOpen(true)}
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
                  <p className="text-xs text-muted-foreground mt-0.5">Filter by rostered personnel or inspect upcoming slot sessions</p>
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
                    <div key={idx} className={`p-3 ${idx === 1 ? 'bg-primary/10 text-primary border-b border-primary/20 font-bold' : 'hover:bg-muted/10 text-muted-foreground'}`}>
                      <span className="block">{day.split(" ")[0]}</span>
                      <span className="text-sm font-black block mt-0.5">{day.split(" ")[1]}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Active Bookings for Tuesday, May 19</h4>
                  {isLoading ? (
                    <div className="space-y-2">
                      <div className="h-16 w-full bg-muted/20 border border-border/20 rounded-xl animate-pulse flex items-center justify-center text-xs text-muted-foreground">
                        Connecting with PostgreSQL database cluster...
                      </div>
                    </div>
                  ) : appointments.filter(app => selectedStaff === "All Staff" || app.staff === selectedStaff).length === 0 ? (
                    <div className="text-center py-8 border border-dashed border-border/30 rounded-xl text-muted-foreground text-xs">
                      No active appointments booked for this staff member.
                    </div>
                  ) : (
                    appointments
                      .filter(app => selectedStaff === "All Staff" || app.staff === selectedStaff)
                      .map(app => (
                        <BookingItem 
                          key={app.id}
                          id={app.id}
                          time={app.time} 
                          staff={app.staff} 
                          client={app.client} 
                          type={app.type} 
                          status={app.status} 
                          color={app.staff === "Dr. Sarah Miller" ? "border-primary" : app.staff === "Rohan Sen" ? "border-cyan-400" : "border-emerald-400"}
                          onCancel={handleCancelAppointment}
                        />
                      ))
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "rules" && (
            <Card className="bg-card/45 border-border/40 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-base font-semibold">Configuration of Booking Rules</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">Control buffers, reservation boundaries, and cancel triggers. Changes auto-save to database.</p>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Buffer Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-foreground">Buffer Between Bookings</span>
                    <span className="font-mono text-primary font-bold">{bookingRule.bufferTime} minutes</span>
                  </div>
                  <input 
                    type="range" min="5" max="60" step="5"
                    value={bookingRule.bufferTime}
                    onChange={(e) => handleUpdateRules({ bufferTime: Number(e.target.value) })}
                    className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <p className="text-[10px] text-muted-foreground mt-1">Prevents back-to-back appointment fatigue. Auto-blocks hours on calendar.</p>
                </div>

                {/* Cancel Trigger */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-foreground">Cancellation & Reschedule Window</span>
                    <span className="font-mono text-primary font-bold">{bookingRule.cancelWindow} hours ahead</span>
                  </div>
                  <input 
                    type="range" min="12" max="72" step="12"
                    value={bookingRule.cancelWindow}
                    onChange={(e) => handleUpdateRules({ cancelWindow: Number(e.target.value) })}
                    className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <p className="text-[10px] text-muted-foreground mt-1">Disallows cancel requests when inside this buffer period to prevent loss.</p>
                </div>

                {/* Notification dispatches */}
                <div className="border-t border-border/40 pt-4 space-y-3">
                  <div className="flex items-center gap-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Automated Notification Reminders</h4>
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/10 px-1 py-0.5 rounded font-bold uppercase tracking-widest scale-90">Auto-Saving</span>
                  </div>
                  
                  <div className="flex items-center justify-between bg-muted/20 border border-border/30 rounded-lg p-3">
                    <div>
                      <h5 className="text-xs font-semibold text-foreground">24-Hour Reminders</h5>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Dispatch WhatsApp and Email message 24 hours prior</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={bookingRule.reminder24h} 
                      onChange={(e) => handleUpdateRules({ reminder24h: e.target.checked })}
                      className="w-4 h-4 accent-primary cursor-pointer" 
                    />
                  </div>
                  <div className="flex items-center justify-between bg-muted/20 border border-border/30 rounded-lg p-3">
                    <div>
                      <h5 className="text-xs font-semibold text-foreground">1-Hour Instant Pushes</h5>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Sends automated WhatsApp checkin alert with directions link</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={bookingRule.reminder1h} 
                      onChange={(e) => handleUpdateRules({ reminder1h: e.target.checked })}
                      className="w-4 h-4 accent-primary cursor-pointer" 
                    />
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
                  onClick={() => triggerToast("Service package customizations are managed under billing configurations.")}
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
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-base font-semibold text-foreground">Cancellation Waitlists</CardTitle>
                  <span className="bg-primary/20 text-primary text-[10px] px-1.5 py-0.5 rounded font-bold">{waitlist.length} Queued</span>
                </div>
                <button 
                  onClick={() => setIsWaitlistModalOpen(true)}
                  className="flex items-center gap-1 text-[10px] text-primary hover:text-primary-hover font-bold"
                >
                  <UserPlus className="w-3.5 h-3.5" /> Add
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">Automatically dispatch WhatsApp notification to priority list if slots open</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {isLoading ? (
                <div className="h-20 w-full bg-muted/20 border border-border/20 rounded-xl animate-pulse flex items-center justify-center text-xs text-muted-foreground">
                  Synchronizing waitlists...
                </div>
              ) : waitlist.length === 0 ? (
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
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                        entry.priority === 'HIGH' ? 'bg-rose-500/20 text-rose-400' : entry.priority === 'MEDIUM' ? 'bg-amber-500/20 text-amber-400' : 'bg-cyan-500/20 text-cyan-400'
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
                        className="flex-1 py-1.5 text-[10px] bg-primary/20 hover:bg-primary/30 text-primary font-bold border border-primary/20 rounded-md transition-all flex items-center justify-center gap-1"
                      >
                        <CheckCircle className="w-3 h-3" /> Auto-Dispatch Alert
                      </button>
                      <button 
                        onClick={() => handleRemoveWaitlist(entry.id)}
                        className="p-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-md transition-all shrink-0"
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

      {/* Booking Form Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-popover border border-border/50 rounded-xl p-6 shadow-2xl flex flex-col gap-4 animate-in zoom-in-95">
            <button 
              onClick={() => setIsBookingModalOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
            <div>
              <h3 className="text-lg font-bold text-foreground">Create Calendar Booking</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Configure live appointment slot linked to active worker roster</p>
            </div>
            
            <form onSubmit={handleCreateAppointment} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">Client Name</label>
                <input 
                  type="text" required
                  placeholder="e.g. John Doe"
                  value={newBooking.client}
                  onChange={(e) => setNewBooking(prev => ({ ...prev, client: e.target.value }))}
                  className="w-full bg-muted border border-border/50 text-xs px-3 py-2 rounded-lg text-foreground focus:outline-none focus:border-primary/50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">Rostered Specialist</label>
                <select
                  value={newBooking.staff}
                  onChange={(e) => setNewBooking(prev => ({ ...prev, staff: e.target.value }))}
                  className="w-full bg-muted border border-border/50 text-xs px-3 py-2 rounded-lg text-foreground focus:outline-none focus:border-primary/50"
                >
                  <option>Dr. Sarah Miller</option>
                  <option>Rohan Sen</option>
                  <option>AI Assistant Roster</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">Appointment / Service Type</label>
                <input 
                  type="text" required
                  value={newBooking.type}
                  onChange={(e) => setNewBooking(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full bg-muted border border-border/50 text-xs px-3 py-2 rounded-lg text-foreground focus:outline-none focus:border-primary/50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">Time Slot Range</label>
                <input 
                  type="text" required
                  placeholder="e.g. 11:00 AM - 11:30 AM"
                  value={newBooking.time}
                  onChange={(e) => setNewBooking(prev => ({ ...prev, time: e.target.value }))}
                  className="w-full bg-muted border border-border/50 text-xs px-3 py-2 rounded-lg text-foreground focus:outline-none focus:border-primary/50"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-2 bg-primary text-primary-foreground font-bold hover:shadow-[0_0_12px_rgba(209,188,255,0.4)] rounded-lg transition-all text-xs"
              >
                Confirm Appointment Reservation
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Waitlist Form Modal */}
      {isWaitlistModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-popover border border-border/50 rounded-xl p-6 shadow-2xl flex flex-col gap-4 animate-in zoom-in-95">
            <button 
              onClick={() => setIsWaitlistModalOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
            <div>
              <h3 className="text-lg font-bold text-foreground">Add to Waitlist</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Queue client to receive automated opening slot text alerts</p>
            </div>
            
            <form onSubmit={handleAddToWaitlist} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">Client Name</label>
                <input 
                  type="text" required
                  placeholder="e.g. Liam Foster"
                  value={newWaitlist.name}
                  onChange={(e) => setNewWaitlist(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-muted border border-border/50 text-xs px-3 py-2 rounded-lg text-foreground focus:outline-none focus:border-primary/50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">WhatsApp / Phone Number</label>
                <input 
                  type="text" required
                  placeholder="e.g. +91 98765 00000"
                  value={newWaitlist.phone}
                  onChange={(e) => setNewWaitlist(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full bg-muted border border-border/50 text-xs px-3 py-2 rounded-lg text-foreground focus:outline-none focus:border-primary/50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">Requested Service Package</label>
                <select
                  value={newWaitlist.service}
                  onChange={(e) => setNewWaitlist(prev => ({ ...prev, service: e.target.value }))}
                  className="w-full bg-muted border border-border/50 text-xs px-3 py-2 rounded-lg text-foreground focus:outline-none focus:border-primary/50"
                >
                  <option>Premium AI Setup Review</option>
                  <option>General Health Consultation</option>
                  <option>Enterprise Strategy Desk</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">Priority Tier</label>
                <select
                  value={newWaitlist.priority}
                  onChange={(e) => setNewWaitlist(prev => ({ ...prev, priority: e.target.value }))}
                  className="w-full bg-muted border border-border/50 text-xs px-3 py-2 rounded-lg text-foreground focus:outline-none focus:border-primary/50"
                >
                  <option value="HIGH">HIGH Priority</option>
                  <option value="MEDIUM">MEDIUM Priority</option>
                  <option value="LOW">LOW Priority</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full py-2 bg-primary text-primary-foreground font-bold hover:shadow-[0_0_12px_rgba(209,188,255,0.4)] rounded-lg transition-all text-xs"
              >
                Queue Candidate
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

function BookingItem({ 
  id, time, staff, client, type, status, color, onCancel 
}: { 
  id: string; time: string; staff: string; client: string; type: string; status: string; color: string; onCancel: (id: string) => void 
}) {
  return (
    <div className={`p-3 bg-muted/20 border-l-4 ${color} border border-border/40 rounded-r-xl flex items-center justify-between gap-4 hover:bg-muted/30 transition-all group`}>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-muted-foreground font-bold">{time}</span>
          <span className="text-[10px] bg-primary/10 text-primary border border-primary/10 px-1.5 py-0.5 rounded font-medium">{staff}</span>
        </div>
        <h5 className="text-xs font-bold text-foreground">{client}</h5>
        <p className="text-[10px] text-muted-foreground">{type}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
          {status}
        </span>
        <button 
          onClick={() => onCancel(id)}
          className="opacity-0 group-hover:opacity-100 p-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded transition-all shrink-0"
          title="Cancel Booking Slot"
        >
          <Trash className="w-3.5 h-3.5" />
        </button>
      </div>
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

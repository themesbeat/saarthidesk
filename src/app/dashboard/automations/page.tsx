"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Workflow, MessageSquare, Bot, Calendar, Sparkles, 
  Copy, Check, Layout, Palette, Code, Bell, 
  Smartphone, MessageCircle, AlertCircle 
} from "lucide-react";

export default function AutomationsPage() {
  const [activeTab, setActiveTab] = useState("whatsapp");

  // WhatsApp template state
  const [reminderText, setReminderText] = useState(
    "Hi {{client_name}}! 🌟 Your appointment with Acme Corp is confirmed for {{time}} on {{date}}. Need to reschedule? Just reply 'reschedule' here!"
  );
  const [send24h, setSend24h] = useState(true);
  const [send1h, setSend1h] = useState(true);
  const [savedWhatsapp, setSavedWhatsapp] = useState(false);

  // Widget Customizer State
  const [widgetColor, setWidgetColor] = useState("#d1bcff"); // default purple
  const [position, setPosition] = useState<"right" | "left">("right");
  const [welcomeText, setWelcomeText] = useState("Hey there! Have any questions? Let's chat!");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [copied, setCopied] = useState(false);
  const [savedWidget, setSavedWidget] = useState(false);

  const integrationCode = `<!-- SaarthiDesk Live Widget Embed Code -->
<script>
  window.SaarthiDeskConfig = {
    widgetId: "sd_98b50e2ddc",
    themeColor: "${widgetColor}",
    position: "${position}",
    welcomeMessage: "${welcomeText}",
    enableSound: ${soundEnabled}
  };
</script>
<script src="https://cdn.saarthidesk.com/widget.v1.js" async></script>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(integrationCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveWhatsapp = () => {
    setSavedWhatsapp(true);
    setTimeout(() => setSavedWhatsapp(false), 2500);
  };

  const handleSaveWidget = () => {
    setSavedWidget(true);
    setTimeout(() => setSavedWidget(false), 2500);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 h-full flex flex-col overflow-auto">
      {/* Header */}
      <div className="flex-shrink-0">
        <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Workflow className="w-6 h-6 text-primary" /> Automations & Widget
        </h1>
        <p className="text-muted-foreground">Manage automatic WhatsApp workflows and customize your embeddable live web widget.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 flex-1 flex flex-col">
        <TabsList className="bg-muted/50 border border-border/50 p-1 w-full max-w-md grid grid-cols-2 rounded-xl flex-shrink-0">
          <TabsTrigger value="whatsapp" className="rounded-lg data-[state=active]:bg-primary/20 data-[state=active]:text-primary font-medium transition-all text-xs py-2 flex items-center gap-2">
            <MessageCircle className="w-4 h-4" /> WhatsApp Templates
          </TabsTrigger>
          <TabsTrigger value="widget" className="rounded-lg data-[state=active]:bg-primary/20 data-[state=active]:text-primary font-medium transition-all text-xs py-2 flex items-center gap-2">
            <Layout className="w-4 h-4" /> Web Chat Widget
          </TabsTrigger>
        </TabsList>

        {/* WhatsApp Panel */}
        <TabsContent value="whatsapp" className="space-y-6 flex-1 focus-visible:outline-none">
          <div className="grid lg:grid-cols-12 gap-6 items-start">
            {/* Left side settings */}
            <div className="lg:col-span-7 space-y-6">
              <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-foreground text-lg flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" /> Appointment Confirmations & Reminders
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">Define messages dispatched automatically to lead cell phones upon bookings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-semibold text-muted-foreground">WhatsApp Reminder Template</label>
                      <Badge className="bg-primary/10 text-primary border-primary/20 text-[9px] font-bold">Approved Category</Badge>
                    </div>
                    <textarea 
                      value={reminderText} 
                      onChange={(e) => setReminderText(e.target.value)}
                      className="w-full h-32 bg-background border border-border/50 rounded-lg p-3 text-sm text-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-primary focus:border-primary outline-none resize-none"
                    />
                    <p className="text-[10px] text-muted-foreground/80">Available tokens: <code className="text-primary font-mono">{`{{client_name}}`}</code>, <code className="text-primary font-mono">{`{{time}}`}</code>, <code className="text-primary font-mono">{`{{date}}`}</code>.</p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <label className="text-sm font-semibold text-muted-foreground">Automated Notification Cadence</label>
                    
                    <label className="flex items-center justify-between p-3 rounded-xl bg-background/30 border border-border/30 hover:bg-muted cursor-pointer transition-colors">
                      <div className="flex flex-col">
                        <span className="text-xs text-foreground font-semibold">24-Hour Reminder</span>
                        <span className="text-[10px] text-muted-foreground">Send a WhatsApp notification 24 hours prior to slot time.</span>
                      </div>
                      <input 
                        type="checkbox"
                        checked={send24h}
                        onChange={(e) => setSend24h(e.target.checked)}
                        className="rounded border-border text-primary focus:ring-primary focus:ring-offset-background bg-background w-4.5 h-4.5 cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-xl bg-background/30 border border-border/30 hover:bg-muted cursor-pointer transition-colors">
                      <div className="flex flex-col">
                        <span className="text-xs text-foreground font-semibold">1-Hour Final Alert</span>
                        <span className="text-[10px] text-muted-foreground">Send a reminder alert exactly 1 hour before appointment check-in.</span>
                      </div>
                      <input 
                        type="checkbox"
                        checked={send1h}
                        onChange={(e) => setSend1h(e.target.checked)}
                        className="rounded border-border text-primary focus:ring-primary focus:ring-offset-background bg-background w-4.5 h-4.5 cursor-pointer"
                      />
                    </label>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <Button onClick={handleSaveWhatsapp} className="bg-primary hover:bg-primary/80 text-foreground shadow-[0_0_15px_rgba(209,188,255,0.3)]">
                      {savedWhatsapp ? <span className="flex items-center gap-1.5"><Check className="w-4 h-4 animate-bounce" /> Saved!</span> : "Save Workflow Settings"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Automated Qualification Flow */}
              <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-foreground text-sm flex items-center gap-2">
                    <Bot className="w-4 h-4 text-primary" /> Conversational Qualification Sequences
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-xs">AI Agent leads prospects through these sequential stages automatically to save support hours.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative border-l-2 border-border/80 pl-6 ml-2 space-y-4 py-2">
                    {[
                      { title: "Stage 1: Greet & Captivate", desc: "Instantly reply to incoming client WhatsApp texts with custom greeting and introduction." },
                      { title: "Stage 2: Capture Lead Contact", desc: "Confirm the prospective client&apos;s name and business email address for CRM logging." },
                      { title: "Stage 3: Service Intent Matching", desc: "Ask specific questions to deduce their interests and qualification tier." },
                      { title: "Stage 4: Automated Booking Dispatch", desc: "Suggest appropriate booking time slots directly from calendar, completing transaction." }
                    ].map((step, idx) => (
                      <div key={idx} className="relative">
                        <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-primary/20 border border-primary flex items-center justify-center text-[8px] font-bold text-primary shadow-[0_0_8px_rgba(209,188,255,0.3)]">
                          {idx + 1}
                        </span>
                        <div className="flex flex-col">
                          <span className="text-xs text-foreground font-semibold">{step.title}</span>
                          <span className="text-[10px] text-muted-foreground">{step.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right side interactive smartphone preview */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-[300px] h-[580px] bg-slate-900 rounded-[40px] p-3 border-4 border-slate-700 shadow-2xl relative flex flex-col">
                {/* Speaker/Camera notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-700 rounded-full flex items-center justify-center gap-2 z-20">
                  <div className="w-2.5 h-2.5 rounded-full bg-black"></div>
                  <div className="w-10 h-1 bg-black/60 rounded-full"></div>
                </div>

                {/* WhatsApp Chat Window Container */}
                <div className="bg-[#0b141a] w-full h-full rounded-[32px] overflow-hidden flex flex-col pt-6 font-sans relative">
                  {/* Status Bar */}
                  <div className="bg-[#1f2c34] px-4 py-2 flex items-center justify-between text-[10px] text-[#8696a0] font-semibold flex-shrink-0">
                    <span>9:41 AM</span>
                    <div className="flex items-center gap-1.5">
                      <span>4G</span>
                      <span>🔋 85%</span>
                    </div>
                  </div>

                  {/* WhatsApp Contact Header */}
                  <div className="bg-[#1f2c34] p-3 flex items-center gap-2.5 border-b border-black/10 flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-emerald-600/30 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold text-xs shrink-0">
                      AC
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Acme Corp Helpdesk</div>
                      <div className="text-[9px] text-emerald-400 font-medium">Online</div>
                    </div>
                  </div>

                  {/* Chat Bubbles Scroll Area */}
                  <div className="flex-1 p-3 space-y-3 overflow-y-auto bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat bg-contain">
                    <div className="bg-[#202c33] text-white p-3 rounded-2xl rounded-tl-sm text-[11px] leading-relaxed max-w-[85%] border border-[#2c3d49]/30">
                      Hi, I&apos;d like to confirm my consultation booking tomorrow!
                      <div className="text-right text-[8px] text-[#8696a0] mt-1">9:41 AM</div>
                    </div>

                    <div className="bg-[#005c4b] text-white p-3 rounded-2xl rounded-tr-sm text-[11px] leading-relaxed max-w-[85%] self-end ml-auto border border-[#007f68]/30">
                      {reminderText.replace("{{client_name}}", "Rahul Sharma").replace("{{time}}", "11:30 AM").replace("{{date}}", "Tomorrow")}
                      <div className="text-right text-[8px] text-[#aebac1] mt-1">9:42 AM</div>
                    </div>
                  </div>

                  {/* Footer message bar */}
                  <div className="bg-[#1f2c34] p-2 flex items-center gap-2 flex-shrink-0">
                    <div className="bg-[#2a3942] rounded-full px-3 py-1.5 text-[10px] text-muted-foreground flex-1">
                      Type a response...
                    </div>
                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white cursor-pointer hover:bg-emerald-600 shrink-0">
                      <Smartphone className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Web Widget Customizer Panel */}
        <TabsContent value="widget" className="space-y-6 flex-1 focus-visible:outline-none">
          <div className="grid lg:grid-cols-12 gap-6 items-start">
            {/* Left settings */}
            <div className="lg:col-span-7 space-y-6">
              <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-foreground text-lg flex items-center gap-2">
                    <Palette className="w-5 h-5 text-primary" /> Visual Customization
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">Style your web floating chat widget to fit seamlessly into your site layout.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Theme Colors */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-foreground">Widget Theme Accent Color</label>
                    <div className="flex items-center gap-4">
                      <div className="flex gap-2">
                        {[
                          { value: "#d1bcff", label: "Lavender" },
                          { value: "#10b981", label: "Emerald" },
                          { value: "#0ea5e9", label: "Ocean Blue" },
                          { value: "#f43f5e", label: "Rose Red" }
                        ].map((color) => (
                          <button
                            key={color.value}
                            onClick={() => setWidgetColor(color.value)}
                            className={`w-8 h-8 rounded-full border-2 transition-all relative flex items-center justify-center ${
                              widgetColor === color.value ? "border-white ring-2 ring-primary" : "border-transparent hover:scale-105"
                            }`}
                            style={{ backgroundColor: color.value }}
                            title={color.label}
                          >
                            {widgetColor === color.value && <Check className="w-4 h-4 text-black shrink-0 font-bold" />}
                          </button>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 border border-border/50 rounded-lg px-3 py-1 bg-background">
                        <span className="text-xs text-muted-foreground font-mono">{widgetColor}</span>
                      </div>
                    </div>
                  </div>

                  {/* Positioning */}
                  <div className="space-y-2 pt-2">
                    <label className="text-sm font-semibold text-muted-foreground">Desktop Alignment Position</label>
                    <div className="grid grid-cols-2 gap-3 max-w-sm">
                      <button
                        onClick={() => setPosition("right")}
                        className={`py-2 px-4 rounded-xl border text-xs font-semibold transition-all ${
                          position === "right" 
                            ? "bg-primary/20 border-primary text-primary" 
                            : "bg-background/40 border-border/50 text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        Right Aligned (Bottom-Right)
                      </button>
                      <button
                        onClick={() => setPosition("left")}
                        className={`py-2 px-4 rounded-xl border text-xs font-semibold transition-all ${
                          position === "left" 
                            ? "bg-primary/20 border-primary text-primary" 
                            : "bg-background/40 border-border/50 text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        Left Aligned (Bottom-Left)
                      </button>
                    </div>
                  </div>

                  {/* Welcome Message */}
                  <div className="space-y-2 pt-2">
                    <label className="text-sm font-semibold text-muted-foreground">Chat Welcome Bubble Message</label>
                    <Input 
                      value={welcomeText} 
                      onChange={(e) => setWelcomeText(e.target.value)}
                      className="bg-background border-border/50 focus-visible:ring-primary text-foreground"
                    />
                  </div>

                  {/* Sound Switch */}
                  <label className="flex items-center justify-between p-3 rounded-xl bg-background/30 border border-border/30 hover:bg-muted cursor-pointer transition-colors max-w-md pt-2">
                    <div className="flex flex-col">
                      <span className="text-xs text-foreground font-semibold">Enable Welcome Sound Alert</span>
                      <span className="text-[10px] text-muted-foreground">Play a subtle ding when the bubble greeting renders on website.</span>
                    </div>
                    <input 
                      type="checkbox"
                      checked={soundEnabled}
                      onChange={(e) => setSoundEnabled(e.target.checked)}
                      className="rounded border-border text-primary focus:ring-primary focus:ring-offset-background bg-background w-4.5 h-4.5 cursor-pointer"
                    />
                  </label>

                  <div className="pt-2 flex justify-end">
                    <Button onClick={handleSaveWidget} className="bg-primary hover:bg-primary/80 text-foreground shadow-[0_0_15px_rgba(209,188,255,0.3)]">
                      {savedWidget ? <span className="flex items-center gap-1.5"><Check className="w-4 h-4 animate-bounce" /> Saved!</span> : "Save Custom Design"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Code Integration Script */}
              <Card className="bg-[#121216]/80 border border-border/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-foreground text-sm flex items-center justify-between">
                    <span className="flex items-center gap-2"><Code className="w-4 h-4 text-primary" /> Embed Script Code</span>
                    <Button variant="outline" size="sm" onClick={handleCopyCode} className="border-border/50 hover:bg-white/5 h-8 gap-1.5 text-xs text-foreground bg-black/40">
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Script</span>
                        </>
                      )}
                    </Button>
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-xs">Copy and paste this HTML tag directly before the closing <code className="text-primary font-mono">{`</body>`}</code> tag on your website pages.</CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="bg-black/50 p-4 rounded-xl border border-border/40 text-[10px] text-zinc-300 font-mono overflow-x-auto whitespace-pre leading-relaxed">
                    {integrationCode}
                  </pre>
                </CardContent>
              </Card>
            </div>

            {/* Right side live website container simulator */}
            <div className="lg:col-span-5">
              <div className="bg-[#1a1a24] rounded-3xl border border-border/50 shadow-2xl overflow-hidden flex flex-col relative h-[520px]">
                {/* Mock Browser Header */}
                <div className="bg-[#14141b] border-b border-border/50 px-4 py-3 flex items-center gap-2 flex-shrink-0">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  </div>
                  <div className="bg-black/30 border border-border/40 rounded-lg text-[10px] text-muted-foreground px-4 py-1 flex-1 text-center font-mono">
                    https://my-awesome-site.com
                  </div>
                </div>

                {/* Mock Website Canvas Grid */}
                <div className="flex-1 p-6 relative flex flex-col justify-between bg-black/15 overflow-hidden">
                  <div className="space-y-4">
                    <div className="h-6 w-32 bg-white/10 rounded-md"></div>
                    <div className="space-y-2">
                      <div className="h-10 w-full bg-white/5 rounded-lg border border-white/5"></div>
                      <div className="h-28 w-full bg-white/5 rounded-lg border border-white/5 p-4 space-y-2">
                        <div className="h-3 w-3/4 bg-white/10 rounded"></div>
                        <div className="h-3 w-1/2 bg-white/10 rounded"></div>
                        <div className="h-3 w-5/6 bg-white/10 rounded"></div>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Reactive Widget Floating State */}
                  <div 
                    className={`absolute bottom-6 flex flex-col items-end gap-3 max-w-[220px] transition-all duration-300 ${
                      position === "right" ? "right-6" : "left-6 items-start"
                    }`}
                  >
                    {/* Floating greeting card bubbles */}
                    <div className="bg-[#1e1e24] p-3 rounded-2xl shadow-xl border border-white/5 text-[10px] leading-relaxed text-white relative animate-bounce">
                      {welcomeText}
                      <span 
                        className={`absolute bottom-[-5px] w-2.5 h-2.5 bg-[#1e1e24] rotate-45 border-r border-b border-white/5 ${
                          position === "right" ? "right-4.5" : "left-4.5"
                        }`}
                      ></span>
                    </div>

                    {/* Chat Bubble Toggle Button */}
                    <div 
                      className="w-12 h-12 rounded-full cursor-pointer flex items-center justify-center text-black font-bold shadow-lg transition-transform hover:scale-105"
                      style={{ 
                        backgroundColor: widgetColor, 
                        boxShadow: `0 0 20px \${widgetColor}40`
                      }}
                    >
                      <MessageSquare className="w-5 h-5 text-[#0c0c0e]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, Sparkles, Shield, Smile, Heart, Zap, Mail, Phone, Globe, RotateCcw, 
  Send, User, CheckCircle2, Loader2, Info
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  confidence?: number;
  source?: string;
}

export default function AIAgentConfigPage() {
  // Configuration State
  const [agentName, setAgentName] = useState("Saarthi AI");
  const [systemPrompt, setSystemPrompt] = useState(
    "You are Saarthi, a virtual receptionist for Acme Corp. You are helpful, polite, and focused on booking appointments and answering general questions about our services. If a customer is frustrated or asks for human assistance, transfer them immediately."
  );
  const [selectedTone, setSelectedTone] = useState<"professional" | "casual" | "empathetic" | "enthusiastic">("professional");
  const [escalateEmail, setEscalateEmail] = useState("support@acmecorp.com");
  const [escalatePhone, setEscalatePhone] = useState("+91 98765 43210");
  
  // DB AutoReply feature toggle
  const [autoReply, setAutoReply] = useState(true);

  const [languages, setLanguages] = useState({
    english: true,
    hindi: true,
    hinglish: true,
    spanish: false,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Playground Chat State
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: "Namaste! I am your AI Receptionist. I can help you answer questions about our pricing, business hours, and services, or book an appointment. How can I assist you today?",
      timestamp: "10:00 AM",
      confidence: 100
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load from database on mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/ai-settings");
        const data = await res.json();
        if (data.settings) {
          const s = data.settings;
          
          if (s.agentName) setAgentName(s.agentName);
          if (s.systemPrompt) setSystemPrompt(s.systemPrompt);
          if (s.escalateEmail) setEscalateEmail(s.escalateEmail);
          if (s.escalatePhone) setEscalatePhone(s.escalatePhone);
          
          // Map DB tone (e.g. "PROFESSIONAL", "CASUAL", etc.) to UI selections
          if (s.tone) {
            const mappedTone = s.tone.toLowerCase();
            if (["professional", "casual", "empathetic", "enthusiastic"].includes(mappedTone)) {
              setSelectedTone(mappedTone as "professional" | "casual" | "empathetic" | "enthusiastic");
            }
          }
          
          setAutoReply(s.autoReply);

          // Map language arrays to checkboxes
          const dbLangs = s.languages || [];
          setLanguages({
            english: dbLangs.includes("en"),
            hindi: dbLangs.includes("hi"),
            hinglish: dbLangs.includes("hinglish"),
            spanish: dbLangs.includes("es"),
          });
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // Save brain config back to database
  const handleSaveConfig = async () => {
    setIsSaving(true);
    try {
      const languageArray: string[] = [];
      if (languages.english) languageArray.push("en");
      if (languages.hindi) languageArray.push("hi");
      if (languages.hinglish) languageArray.push("hinglish");
      if (languages.spanish) languageArray.push("es");

      const res = await fetch("/api/ai-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tone: selectedTone.toUpperCase(),
          autoReply,
          languages: languageArray,
          agentName,
          systemPrompt,
          escalateEmail,
          escalatePhone,
        }),
      });

      if (res.ok) {
        alert("Saarthi AI Brain Configuration Saved and Synced persistently with PostgreSQL database!");
      }
    } catch (err) {
      console.error("Error saving settings:", err);
    } finally {
      setIsSaving(false);
    }
  };

  // Auto-scroll playground chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsgText = inputValue.trim();
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: userMsgText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      // Query our new backend AI playground endpoint for a real grounding test!
      const res = await fetch("/api/ai-settings/playground", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsgText }),
      });

      const data = await res.json();
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: data.text || "I have received your request. Let me look into that.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        confidence: data.confidence || 85,
        source: data.source || "System_Prompt_Instructions"
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("Playground simulation error:", err);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: "Apologies, there was an issue retrieving the response from my brain database. Please try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        confidence: 0,
        source: "Error_Recovery_Fallback"
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "1",
        sender: "ai",
        text: `Namaste! I am ${agentName}, your AI Receptionist. I can help you answer questions about our pricing, business hours, and services, or book an appointment. How can I assist you today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        confidence: 100
      }
    ]);
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center gap-2 text-muted-foreground bg-background">
        <Loader2 className="w-5 h-5 animate-spin text-primary" />
        <span>Loading AI brain configurations...</span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 h-full flex flex-col overflow-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Bot className="w-6 h-6 text-primary" /> AI Receptionist Config
          </h1>
          <p className="text-muted-foreground">Train and style your AI assistant to handle client queries 24/7.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleResetChat} className="border-border/50 bg-card text-foreground gap-2">
            <RotateCcw className="w-4 h-4" /> Reset Simulator
          </Button>
          <Button 
            disabled={isSaving}
            onClick={handleSaveConfig} 
            className="bg-primary hover:bg-primary/80 text-foreground gap-2 shadow-[0_0_15px_rgba(209,188,255,0.3)] disabled:opacity-50"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            Save Brain Config
          </Button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="grid lg:grid-cols-12 gap-6 items-start flex-1">
        {/* Left Column: Config Forms */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-foreground text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" /> Core Personality
              </CardTitle>
              <CardDescription className="text-muted-foreground">Configure the foundational guidelines for the receptionist&apos;s behavior.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground">Agent Display Name</label>
                <Input 
                  value={agentName} 
                  onChange={(e) => setAgentName(e.target.value)} 
                  className="bg-background border-border/50 focus-visible:ring-primary text-foreground"
                  placeholder="e.g. Saarthi AI, Kareena"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground">System Instructions (Prompt)</label>
                <textarea 
                  value={systemPrompt} 
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  className="w-full h-32 bg-background border border-border/50 rounded-lg p-3 text-sm text-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-primary focus:border-primary outline-none resize-none"
                  placeholder="Instructions guiding what the AI receptionist should and should not do..."
                />
                <p className="text-[10px] text-muted-foreground/80">Pro-tip: Include detail about your refund policy, fallback rules, and appointment booking parameters.</p>
              </div>

              {/* Tone Selection */}
              <div className="space-y-2 pt-2">
                <label className="text-sm font-semibold text-muted-foreground">Communication Tone</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: "professional", label: "Professional", icon: <Shield className="w-4 h-4" /> },
                    { id: "casual", label: "Casual", icon: <Smile className="w-4 h-4" /> },
                    { id: "empathetic", label: "Empathetic", icon: <Heart className="w-4 h-4" /> },
                    { id: "enthusiastic", label: "Enthusiastic", icon: <Zap className="w-4 h-4" /> }
                  ].map((tone) => (
                    <button
                      key={tone.id}
                      onClick={() => setSelectedTone(tone.id as "professional" | "casual" | "empathetic" | "enthusiastic")}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl border text-center transition-all ${
                        selectedTone === tone.id 
                          ? "bg-primary/20 border-primary text-primary shadow-[0_0_12px_rgba(209,188,255,0.1)]" 
                          : "bg-background/40 border-border/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      {tone.icon}
                      <span className="text-xs font-semibold">{tone.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Handover, Multilingual & Switch Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Handover & Toggle Card */}
            <div className="space-y-6">
              <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-foreground text-sm flex items-center gap-2">
                    <Bot className="w-4 h-4 text-primary" /> Auto-Responder State
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-xs">Enable instant AI support.</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <label className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/20 cursor-pointer hover:bg-primary/10 transition-colors">
                    <input 
                      type="checkbox"
                      checked={autoReply}
                      onChange={(e) => setAutoReply(e.target.checked)}
                      className="rounded border-border text-primary focus:ring-primary focus:ring-offset-background bg-background w-4.5 h-4.5 cursor-pointer"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs text-foreground font-bold">Auto-Reply Enabled</span>
                      <span className="text-[10px] text-muted-foreground">AI drafts replies instantly in Inbox</span>
                    </div>
                  </label>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-foreground text-sm flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" /> Smart Escalation
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-xs">Human transfer contact info.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Escalation Email</span>
                    <Input 
                      value={escalateEmail}
                      onChange={(e) => setEscalateEmail(e.target.value)}
                      className="bg-background border-border/50 text-xs h-8 text-foreground"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Escalation Phone (WhatsApp)</span>
                    <Input 
                      value={escalatePhone}
                      onChange={(e) => setEscalatePhone(e.target.value)}
                      className="bg-background border-border/50 text-xs h-8 text-foreground"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Languages Card */}
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground text-sm flex items-center gap-2">
                  <Globe className="w-4 h-4 text-primary" /> Language Support
                </CardTitle>
                <CardDescription className="text-muted-foreground text-xs">Configure client interactions.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { key: "english" as const, label: "English" },
                  { key: "hindi" as const, label: "Hindi (हिंदी)" },
                  { key: "hinglish" as const, label: "Hinglish (Hindi written in English)" },
                  { key: "spanish" as const, label: "Spanish (Español)" }
                ].map((lang) => (
                  <label key={lang.key} className="flex items-center gap-3 p-2 rounded-lg bg-background/30 border border-border/30 hover:bg-muted cursor-pointer transition-colors">
                    <input 
                      type="checkbox"
                      checked={languages[lang.key]}
                      onChange={(e) => setLanguages({ ...languages, [lang.key]: e.target.checked })}
                      className="rounded border-border text-primary focus:ring-primary focus:ring-offset-background bg-background w-4 h-4 cursor-pointer"
                    />
                    <span className="text-xs text-foreground font-medium">{lang.label}</span>
                  </label>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column: Interactive Chat Playground */}
        <div className="lg:col-span-5">
          <Card className="bg-[#121216]/90 border border-primary/20 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 blur-3xl rounded-full pointer-events-none" />
            
            {/* Header */}
            <div className="p-4 border-b border-border/50 bg-[#16161c] flex items-center justify-between z-10 relative">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(209,188,255,0.2)]">
                  <Bot className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    {agentName}
                    <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[8px] font-bold px-1.5 py-0">Active</Badge>
                  </div>
                  <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Testing Playground
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={handleResetChat} className="text-muted-foreground hover:text-white rounded-full hover:bg-white/5">
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>

            {/* Chat area */}
            <div className="h-[360px] overflow-y-auto p-4 space-y-4 bg-black/20 flex flex-col scrollbar-thin">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex items-start gap-2.5 max-w-[85%] ${msg.sender === "user" ? "self-end flex-row-reverse" : ""}`}
                >
                  <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs ${
                    msg.sender === "user" 
                      ? "bg-primary text-primary-foreground font-bold shadow-[0_0_10px_rgba(209,188,255,0.4)]" 
                      : "bg-[#202026] text-primary border border-primary/20"
                  }`}>
                    {msg.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>
                  <div className="space-y-1">
                    <div className={`px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === "user" 
                        ? "bg-primary/95 text-foreground font-medium rounded-tr-sm shadow-md" 
                        : "bg-card border border-border/50 text-foreground rounded-tl-sm shadow-sm"
                    }`}>
                      {msg.text}
                    </div>
                    {msg.sender === "ai" && msg.confidence && (
                      <div className="flex items-center gap-2 mt-1 ml-1 text-[9px] text-muted-foreground/80">
                        <span className="flex items-center gap-0.5 text-emerald-400 font-bold">
                          <CheckCircle2 className="w-2.5 h-2.5" /> {msg.confidence}% confidence
                        </span>
                        <span>•</span>
                        <span>Source: <span className="font-semibold text-primary/80">{msg.source}</span></span>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start gap-2.5 max-w-[85%]">
                  <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center bg-[#202026] text-primary border border-primary/20">
                    <Bot className="w-3.5 h-3.5 animate-pulse" />
                  </div>
                  <div className="bg-card border border-border/50 px-4 py-2.5 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1.5 h-8">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/80 animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/80 animate-bounce delay-200"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/80 animate-bounce delay-300"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-border/50 bg-[#16161c] flex gap-2">
              <Input 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about pricing, booking a slot, timings..." 
                className="bg-black/30 border-border/50 text-xs h-9 rounded-full px-4 focus-visible:ring-primary text-foreground placeholder:text-muted-foreground/80"
              />
              <Button type="submit" size="icon" className="bg-primary text-primary-foreground rounded-full h-9 w-9 flex-shrink-0 shadow-[0_0_10px_rgba(209,188,255,0.3)]">
                <Send className="w-3.5 h-3.5" />
              </Button>
            </form>
          </Card>
          
          <div className="mt-4 flex items-start gap-2 p-3 rounded-xl bg-card/30 border border-border/30">
            <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              <strong>Interactive AI Link</strong>: Adjusting and saving options here dynamically updates the underlying customer support receptionist rules. Go to the <a href="/dashboard/inbox" className="text-primary hover:underline font-semibold">Unified Inbox</a>, switch a chat to <em>Simulate Inbound</em> mode, send a customer query, and observe how the auto-reply shifts tones matching this selection!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

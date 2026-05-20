"use client";

import { useState, useEffect, useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Filter,
  MoreVertical,
  Phone,
  Paperclip,
  Smile,
  Send,
  Bot,
  CheckCheck,
  Globe,
  MessageCircle,
  Mail,
  Smartphone,
  Loader2,
  AlertCircle,
  HelpCircle,
  Lock,
  Sparkles,
  Zap,
  X,
  RotateCw
} from "lucide-react";

interface Message {
  id: string;
  sender: "USER" | "CUSTOMER" | "AI";
  content: string;
  createdAt: string | Date;
  isAiGenerated?: boolean;
  messageType?: "TEXT" | "INTERNAL_NOTE";
}

interface Lead {
  id: string;
  stage: "NEW" | "INTERESTED" | "FOLLOW_UP" | "CONVERTED" | "CLOSED";
  value: number;
  notes: string;
}

interface Contact {
  id: string;
  name: string;
  email: string | null;
  lead?: Lead | null;
}

interface Conversation {
  id: string;
  channel: "WHATSAPP" | "TELEGRAM" | "EMAIL" | "SMS" | "WEB";
  status: "OPEN" | "CLOSED";
  contact: Contact;
  messages: Message[];
}

export default function InboxPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTab, setFilterTab] = useState("all");
  
  // CRM Lead settings
  const [leadStage, setLeadStage] = useState("NEW");
  const [leadValue, setLeadValue] = useState(0);
  const [leadNotes, setLeadNotes] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isUpdatingLead, setIsUpdatingLead] = useState(false);
  const [simulationRole, setSimulationRole] = useState<"USER" | "CUSTOMER">("USER");
  const [messageMode, setMessageMode] = useState<"REPLY" | "NOTE">("REPLY");

  // AI Copilot dynamic states
  const [copilotSuggestion, setCopilotSuggestion] = useState<{
    text: string;
    confidence: number;
    source: string;
    triggerQuery: string;
  } | null>(null);
  const [isCopilotLoading, setIsCopilotLoading] = useState(false);

  const fetchConversations = useCallback(async (autoSelectFirst = false) => {
    try {
      const res = await fetch("/api/inbox/conversations");
      const data = await res.json();
      if (data.conversations) {
        setConversations(data.conversations);
        if ((autoSelectFirst || !selectedConversationId) && data.conversations.length > 0) {
          setSelectedConversationId(data.conversations[0].id);
        }
      }
    } catch (err) {
      console.error("Failed to load conversations:", err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedConversationId]);

  useEffect(() => {
    fetchConversations(true);
  }, [fetchConversations]);

  // Real-time synchronization fallback polling: pulls fresh database records every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchConversations(false);
    }, 4000);
    return () => clearInterval(interval);
  }, [fetchConversations]);

  const activeConversation = conversations.find(
    (c) => c.id === selectedConversationId
  );

  // Sync active CRM metrics when conversation selection changes
  useEffect(() => {
    if (activeConversation) {
      setLeadStage(activeConversation.contact.lead?.stage || "NEW");
      setLeadValue(activeConversation.contact.lead?.value || 0);
      setLeadNotes(activeConversation.contact.lead?.notes || "");
    }
  }, [selectedConversationId, activeConversation]);

  // AI Copilot fetcher
  const fetchCopilotSuggestion = useCallback(async (id: string) => {
    if (!id) return;
    setIsCopilotLoading(true);
    try {
      const res = await fetch("/api/inbox/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId: id }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.suggestion) {
          setCopilotSuggestion(data.suggestion);
        } else {
          setCopilotSuggestion(null);
        }
      } else {
        setCopilotSuggestion(null);
      }
    } catch (err) {
      console.error("Error fetching copilot suggestion:", err);
      setCopilotSuggestion(null);
    } finally {
      setIsCopilotLoading(false);
    }
  }, []);

  // Sync AI Copilot suggested replies when conversation selection changes
  useEffect(() => {
    if (selectedConversationId) {
      fetchCopilotSuggestion(selectedConversationId);
    } else {
      setCopilotSuggestion(null);
    }
  }, [selectedConversationId, fetchCopilotSuggestion]);

  // Dispatch agent or simulated customer message
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!selectedConversationId || !messageInput.trim()) return;

    setIsSending(true);
    const content = messageInput;
    setMessageInput(""); // Clear immediately for instant feeling response

    try {
      const res = await fetch("/api/inbox/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId: selectedConversationId,
          content,
          sender: simulationRole,
          messageType: simulationRole === "USER" && messageMode === "NOTE" ? "INTERNAL_NOTE" : "TEXT",
        }),
      });

      if (res.ok) {
        // Trigger a fresh database reload to retrieve agent message & triggered AI auto-replies
        await fetchConversations();
        
        // Reactively update AI Copilot suggestion status
        if (simulationRole === "CUSTOMER") {
          setTimeout(() => {
            fetchCopilotSuggestion(selectedConversationId);
          }, 1500);
        } else {
          setCopilotSuggestion(null);
        }
      }
    } catch (err) {
      console.error("Error dispatching message:", err);
    } finally {
      setIsSending(false);
    }
  };

  // Save CRM pipeline updates
  const handleUpdateLead = async () => {
    if (!activeConversation) return;

    setIsUpdatingLead(true);
    try {
      const res = await fetch("/api/inbox/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactId: activeConversation.contact.id,
          stage: leadStage,
          value: leadValue,
          notes: leadNotes,
        }),
      });

      if (res.ok) {
        await fetchConversations();
      }
    } catch (err) {
      console.error("Error saving CRM lead data:", err);
    } finally {
      setIsUpdatingLead(false);
    }
  };

  // Helpers to fetch dynamic channels
  const getChannelDetails = (channel: string) => {
    switch (channel) {
      case "WHATSAPP":
        return { icon: <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />, label: "WhatsApp", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" };
      case "TELEGRAM":
        return { icon: <Send className="w-3.5 h-3.5 text-sky-400" />, label: "Telegram", color: "bg-sky-500/10 text-sky-400 border-sky-500/20" };
      case "EMAIL":
        return { icon: <Mail className="w-3.5 h-3.5 text-amber-400" />, label: "Email", color: "bg-amber-500/10 text-amber-400 border-amber-500/20" };
      case "SMS":
        return { icon: <Smartphone className="w-3.5 h-3.5 text-rose-400" />, label: "SMS", color: "bg-rose-500/10 text-rose-400 border-rose-500/20" };
      default:
        return { icon: <Globe className="w-3.5 h-3.5 text-indigo-400" />, label: "Web Chat", color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" };
    }
  };

  // Filtering filter logic
  const filteredConversations = conversations.filter((c) => {
    const matchesSearch =
      c.contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.messages[c.messages.length - 1]?.content
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());

    if (filterTab === "unread") {
      return matchesSearch && c.status === "OPEN";
    }
    if (filterTab === "ai") {
      return matchesSearch && c.messages.some((m: Message) => m.isAiGenerated);
    }
    return matchesSearch;
  });

  return (
    <div className="h-full flex overflow-hidden">
      {/* LEFT PANEL: Conversation List */}
      <div className="w-80 flex-shrink-0 border-r border-border/50 flex flex-col bg-background/50 backdrop-blur-sm min-h-0">
        <div className="p-4 border-b border-border/50 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">Inbox</h2>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:bg-muted"
              onClick={() => fetchConversations()}
            >
              <Filter className="w-4 h-4" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/80" />
            <Input
              placeholder="Search conversations..."
              className="pl-9 bg-card border-border/50 focus-visible:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Tabs value={filterTab} onValueChange={setFilterTab} className="w-full">
            <TabsList className="w-full grid grid-cols-3 bg-card border border-border/50">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Open</TabsTrigger>
              <TabsTrigger value="ai">AI active</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <ScrollArea className="flex-1 min-h-0">
          <div className="flex flex-col">
            {isLoading ? (
              <div className="flex items-center justify-center p-8 gap-2 text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                <span>Loading threads...</span>
              </div>
            ) : filteredConversations.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground space-y-2">
                <AlertCircle className="w-8 h-8 text-muted-foreground/50" />
                <span className="text-sm">No conversations found</span>
              </div>
            ) : (
              filteredConversations.map((c) => {
                const lastMsg = c.messages[c.messages.length - 1];
                const channelInfo = getChannelDetails(c.channel);
                const initials = c.contact.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .slice(0, 2);

                const isSelected = c.id === selectedConversationId;

                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedConversationId(c.id)}
                    className={`flex items-start gap-3 p-4 border-b border-border/30 text-left transition-colors relative ${
                      isSelected
                        ? "bg-primary/10 border-l-4 border-l-primary"
                        : "hover:bg-muted bg-transparent"
                    }`}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarFallback className="bg-primary/20 text-primary-foreground font-semibold">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 bg-slate-950 rounded-full p-0.5 border border-border">
                        {channelInfo.icon}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <span className="font-semibold text-foreground truncate">
                          {c.contact.name}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {lastMsg ? new Date(lastMsg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Active"}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate leading-relaxed">
                        {lastMsg ? lastMsg.content : "No messages yet"}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        <Badge variant="outline" className={`text-[9px] px-1.5 py-0 ${channelInfo.color}`}>
                          {channelInfo.label}
                        </Badge>
                        {c.contact.lead?.stage && (
                          <Badge variant="outline" className="text-[9px] bg-primary/5 text-primary border-primary/20 px-1.5 py-0">
                            {c.contact.lead.stage}
                          </Badge>
                        )}
                        {c.messages.some((m: Message) => m.isAiGenerated) && (
                          <Badge variant="outline" className="text-[9px] bg-indigo-500/10 text-indigo-300 border-indigo-500/20 px-1.5 py-0 flex items-center gap-0.5">
                            <Bot className="w-2.5 h-2.5" /> AI active
                          </Badge>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </ScrollArea>
      </div>

      {/* CENTER: Chat Area */}
      <div className="flex-1 flex flex-col bg-background relative min-h-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-slate-950 to-slate-950 pointer-events-none" />

        {activeConversation ? (
          <>
            {/* Chat Header */}
            <div className="h-16 border-b border-border/50 px-6 flex items-center justify-between bg-background/80 backdrop-blur-sm z-10">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-primary/20 text-primary-foreground font-semibold">
                    {activeConversation.contact.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {activeConversation.contact.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      {getChannelDetails(activeConversation.channel).icon}
                      {getChannelDetails(activeConversation.channel).label}
                    </span>
                    <span>•</span>
                    <span className="text-emerald-400 font-medium">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1 min-h-0 p-6 relative z-10">
              <div className="space-y-6 flex flex-col justify-end min-h-full">
                <div className="flex justify-center">
                  <Badge variant="outline" className="bg-card border-border/50 text-muted-foreground/80 text-[10px]">
                    Live Conversation Stream
                  </Badge>
                </div>

                {activeConversation.messages.map((message: Message) => {
                  const isAgent = message.sender === "USER";
                  const isAI = message.sender === "AI";
                  const isInternal = message.messageType === "INTERNAL_NOTE";
                  const initials = activeConversation.contact.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")
                    .slice(0, 2);

                  return (
                    <div
                      key={message.id}
                      className={`flex items-end gap-2.5 max-w-[80%] ${
                        isAgent || isAI || isInternal ? "self-end flex-row-reverse" : "self-start"
                      }`}
                    >
                      {!isAgent && !isAI && !isInternal ? (
                        <Avatar className="w-8 h-8 mb-1 border border-border">
                          <AvatarFallback className="bg-muted text-muted-foreground text-xs font-bold">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                      ) : isAI ? (
                        <div className="w-8 h-8 mb-1 shrink-0 bg-indigo-500/10 text-indigo-400 rounded-full flex items-center justify-center border border-indigo-500/30">
                          <Bot className="w-4 h-4 animate-pulse" />
                        </div>
                      ) : isInternal ? (
                        <div className="w-8 h-8 mb-1 shrink-0 bg-amber-500/15 text-amber-400 rounded-full flex items-center justify-center border border-amber-500/30">
                          <Lock className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 mb-1 shrink-0 bg-primary text-foreground rounded-full flex items-center justify-center border border-primary/20">
                          <span className="text-xs font-bold">ME</span>
                        </div>
                      )}
                      <div>
                        {isAI && (
                          <span className="text-[10px] text-indigo-400 flex items-center gap-1 mb-1 font-medium select-none justify-end">
                            <Bot className="w-3 h-3" /> AI Auto-Responder
                          </span>
                        )}
                        {isInternal && (
                          <span className="text-[10px] text-amber-400 flex items-center gap-1 mb-1 font-semibold select-none justify-end">
                            <Lock className="w-2.5 h-2.5" /> Private Internal Note
                          </span>
                        )}
                        {isAgent && !isInternal && (
                          <span className="text-[10px] text-primary flex items-center gap-1 mb-1 font-medium select-none justify-end">
                            Agent Response
                          </span>
                        )}

                        <div
                          className={`px-4 py-2.5 rounded-2xl text-sm relative group leading-relaxed ${
                            isInternal
                              ? "bg-amber-500/10 border border-amber-500/30 text-amber-200 rounded-br-sm shadow-[0_0_15px_rgba(245,158,11,0.05)]"
                              : isAgent
                              ? "bg-primary text-foreground rounded-br-sm shadow-md"
                              : isAI
                              ? "bg-indigo-500/10 text-indigo-200 border border-indigo-500/20 rounded-br-sm"
                              : "bg-card border border-border/30 text-foreground rounded-bl-sm"
                          }`}
                        >
                          {message.content}
                        </div>
                        <div className="text-[10px] text-muted-foreground/80 mt-1.5 ml-1">
                          {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 bg-background/80 backdrop-blur-md border-t border-border/50 z-10">
              {/* AI Copilot Suggestion Box */}
              {isCopilotLoading && (
                <div className="mb-4 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 border border-indigo-500/10 rounded-2xl p-4 animate-pulse">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-indigo-400 animate-spin" />
                    <span className="text-xs font-semibold text-indigo-300">Saarthi Copilot drafting response...</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded-full w-1/2"></div>
                </div>
              )}

              {!isCopilotLoading && copilotSuggestion && (
                <div className="mb-4 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-slate-950 border border-indigo-500/30 rounded-2xl p-4 shadow-[0_0_20px_rgba(99,102,241,0.1)] relative overflow-hidden group">
                  <div className="absolute top-3 right-3 p-1 opacity-55 hover:opacity-100 transition-opacity">
                    <button 
                      type="button" 
                      onClick={() => setCopilotSuggestion(null)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="bg-indigo-500/20 rounded-lg p-1">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                      </div>
                      <span className="text-xs font-bold text-indigo-300">Saarthi AI Suggested Draft</span>
                      <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] px-1.5 py-0">
                        Confidence {copilotSuggestion.confidence}%
                      </Badge>
                    </div>
                    <span className="text-[10px] text-muted-foreground mr-6 truncate max-w-[200px]">
                      Grounded on: <strong className="text-indigo-200">{copilotSuggestion.source}</strong>
                    </span>
                  </div>

                  <p className="text-xs text-foreground/90 bg-slate-950/40 p-3 rounded-xl border border-border/20 mb-3 italic">
                    "{copilotSuggestion.text}"
                  </p>

                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setMessageInput(copilotSuggestion.text)}
                      className="h-8 text-xs font-semibold hover:bg-primary/20 text-indigo-300 border-indigo-500/30 hover:border-indigo-500/60"
                    >
                      <Zap className="w-3.5 h-3.5 mr-1" /> Use as Draft
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      onClick={async () => {
                        setIsSending(true);
                        try {
                          const res = await fetch("/api/inbox/message", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              conversationId: selectedConversationId,
                              content: copilotSuggestion.text,
                              sender: "USER",
                              messageType: "TEXT",
                            }),
                          });
                          if (res.ok) {
                            setCopilotSuggestion(null);
                            await fetchConversations();
                          }
                        } catch (err) {
                          console.error("Error sending copilot response:", err);
                        } finally {
                          setIsSending(false);
                        }
                      }}
                      className="h-8 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20"
                    >
                      Send Instantly
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => fetchCopilotSuggestion(selectedConversationId!)}
                      className="w-8 h-8 rounded-full text-muted-foreground hover:text-foreground"
                      title="Regenerate suggested reply"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              )}

              <form onSubmit={handleSendMessage} className="bg-card border border-border/50 rounded-2xl p-2 focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all">
                {simulationRole === "USER" && (
                  <div className="flex items-center gap-1.5 mb-2 px-2 border-b border-border/10 pb-2">
                    <button
                      type="button"
                      onClick={() => setMessageMode("REPLY")}
                      className={`px-3 py-1 text-xs font-medium rounded-full transition-all flex items-center gap-1.5 ${
                        messageMode === "REPLY"
                          ? "bg-primary/20 text-primary border border-primary/30"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Send className="w-3 h-3" /> Customer Reply
                    </button>
                    <button
                      type="button"
                      onClick={() => setMessageMode("NOTE")}
                      className={`px-3 py-1 text-xs font-medium rounded-full transition-all flex items-center gap-1.5 ${
                        messageMode === "NOTE"
                          ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Lock className="w-3 h-3" /> Team Note (Private)
                    </button>
                  </div>
                )}

                <textarea
                  className="w-full bg-transparent resize-none border-none focus:ring-0 text-sm text-foreground placeholder:text-muted-foreground/80 p-2 min-h-[60px] outline-none"
                  placeholder={
                    simulationRole === "CUSTOMER"
                      ? `Type message to simulate inbound channel response...`
                      : messageMode === "NOTE"
                      ? `Add a private internal note for the team (hidden from user)...`
                      : `Reply to ${activeConversation.contact.name}...`
                  }
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/30">
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className={`h-8 rounded-full px-3 gap-1.5 text-xs font-semibold ${
                        simulationRole === "USER"
                          ? "bg-primary/20 text-primary border border-primary/30"
                          : "bg-muted text-muted-foreground border border-border"
                      }`}
                      onClick={() => {
                        setSimulationRole("USER");
                        setMessageMode("REPLY");
                      }}
                    >
                      Agent Mode
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className={`h-8 rounded-full px-3 gap-1.5 text-xs font-semibold ${
                        simulationRole === "CUSTOMER"
                          ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          : "bg-muted text-muted-foreground border border-border"
                      }`}
                      onClick={() => {
                        setSimulationRole("CUSTOMER");
                        setMessageMode("REPLY");
                      }}
                    >
                      Simulate Inbound
                    </Button>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1 select-none">
                      <HelpCircle className="w-3 h-3 text-primary" /> press Enter to send
                    </span>
                  </div>
                  <Button
                    type="submit"
                    disabled={isSending || !messageInput.trim()}
                    className={`h-8 rounded-full text-foreground px-4 gap-2 disabled:opacity-50 transition-all ${
                      messageMode === "NOTE" && simulationRole === "USER"
                        ? "bg-amber-600 hover:bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)] text-amber-50 animate-pulse"
                        : "bg-primary/95 hover:bg-primary shadow-[0_0_15px_rgba(209,188,255,0.3)]"
                    }`}
                  >
                    {isSending ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <>
                        {messageMode === "NOTE" && simulationRole === "USER" ? "Add Note" : "Send"}{" "}
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-muted-foreground z-10">
            <Bot className="w-12 h-12 text-primary/50 animate-pulse mb-3" />
            <p className="text-base font-semibold text-foreground">Select a thread</p>
            <p className="text-xs max-w-sm mt-1 leading-relaxed">
              Choose a messaging conversation from the inbox pane to inspect chat context and update CRM settings.
            </p>
          </div>
        )}
      </div>

      {/* RIGHT PANEL: Lead & CRM Details */}
      <div className="w-80 flex-shrink-0 border-l border-border/50 bg-background/50 backdrop-blur-sm hidden lg:flex flex-col min-h-0">
        <div className="h-16 border-b border-border/50 flex items-center justify-between px-6">
          <h2 className="font-semibold text-foreground">CRM Profile</h2>
          {activeConversation && (
            <Button
              size="sm"
              variant="outline"
              className="text-[11px] h-7 px-2.5 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
              disabled={isUpdatingLead}
              onClick={handleUpdateLead}
            >
              {isUpdatingLead ? (
                <Loader2 className="w-3 h-3 animate-spin mr-1" />
              ) : (
                "Save Changes"
              )}
            </Button>
          )}
        </div>

        <ScrollArea className="flex-1 min-h-0 p-6">
          {activeConversation ? (
            <div className="space-y-6">
              {/* Contact Info */}
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-16 h-16 mb-3 border border-border">
                  <AvatarFallback className="bg-primary/20 text-primary-foreground text-lg font-bold">
                    {activeConversation.contact.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-base font-bold text-foreground">
                  {activeConversation.contact.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {activeConversation.contact.email || "No email available"}
                </p>
              </div>

              {/* Dynamic AI Summary */}
              <div className="bg-card border border-border/50 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-primary text-xs font-semibold">
                  <Bot className="w-3.5 h-3.5" />
                  AI Lead Synthesis
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Active contact is connecting from a <strong>{getChannelDetails(activeConversation.channel).label}</strong> gateway. Currently labeled as a pipeline lead.
                </p>
              </div>

              {/* Assigned Agent Profile */}
              <div className="bg-card/40 border border-border/30 rounded-xl p-4 space-y-3">
                <label className="text-[10px] text-muted-foreground/80 font-bold uppercase tracking-wider block">
                  Assigned Agent
                </label>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="w-9 h-9 border border-border/50">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                        AG
                      </AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-950" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">Active Agent (You)</p>
                    <p className="text-[10px] text-muted-foreground">saarthi-support-desk</p>
                  </div>
                </div>
              </div>

              {/* CRM Live Controls */}
              <div className="space-y-4 pt-2">
                <div>
                  <label className="text-[10px] text-muted-foreground/80 font-bold mb-1.5 uppercase tracking-wider block">
                    Pipeline Stage
                  </label>
                  <select
                    className="w-full bg-card border border-border/50 rounded-lg text-xs text-foreground px-3 py-2 focus:ring-1 focus:ring-primary outline-none"
                    value={leadStage}
                    onChange={(e) => setLeadStage(e.target.value)}
                  >
                    <option value="NEW">New Lead</option>
                    <option value="INTERESTED">Interested</option>
                    <option value="FOLLOW_UP">Follow Up</option>
                    <option value="CONVERTED">Converted</option>
                    <option value="CLOSED">Closed</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-muted-foreground/80 font-bold mb-1.5 uppercase tracking-wider block">
                    Est. Value ($ USD)
                  </label>
                  <Input
                    type="number"
                    className="bg-card border-border/50 focus-visible:ring-primary text-xs h-9"
                    value={leadValue}
                    onChange={(e) => setLeadValue(parseFloat(e.target.value) || 0)}
                  />
                </div>

                <div>
                  <label className="text-[10px] text-muted-foreground/80 font-bold mb-1.5 uppercase tracking-wider block">
                    Private Notes
                  </label>
                  <textarea
                    className="w-full bg-card border border-border/50 rounded-lg text-xs text-muted-foreground px-3 py-2 min-h-[100px] focus:ring-1 focus:ring-primary outline-none resize-none"
                    placeholder="Enter sales context, client requests, next actions..."
                    value={leadNotes}
                    onChange={(e) => setLeadNotes(e.target.value)}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center p-6 text-muted-foreground/80 text-xs">
              Select a thread to adjust CRM pipeline stats.
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}

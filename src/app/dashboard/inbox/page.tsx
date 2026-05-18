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
  HelpCircle
} from "lucide-react";

interface Message {
  id: string;
  sender: "USER" | "CUSTOMER" | "AI";
  content: string;
  createdAt: string | Date;
  isAiGenerated?: boolean;
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
        }),
      });

      if (res.ok) {
        // Trigger a fresh database reload to retrieve agent message & triggered AI auto-replies
        await fetchConversations();
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
      <div className="w-80 flex-shrink-0 border-r border-border/50 flex flex-col bg-background/50 backdrop-blur-sm">
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

        <ScrollArea className="flex-1">
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
      <div className="flex-1 flex flex-col bg-background relative">
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
                    {activeConversation.contact.name
                  }</h3>
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
            <ScrollArea className="flex-1 p-6 relative z-10">
              <div className="space-y-6 flex flex-col justify-end min-h-full">
                <div className="flex justify-center">
                  <Badge variant="outline" className="bg-card border-border/50 text-muted-foreground/80 text-[10px]">
                    Live Conversation Stream
                  </Badge>
                </div>

                {activeConversation.messages.map((message: Message) => {
                  const isAgent = message.sender === "USER";
                  const isAI = message.sender === "AI";
                  const initials = activeConversation.contact.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")
                    .slice(0, 2);

                  return (
                    <div
                      key={message.id}
                      className={`flex items-end gap-2.5 max-w-[80%] ${
                        isAgent || isAI ? "self-end flex-row-reverse" : "self-start"
                      }`}
                    >
                      {!isAgent && !isAI ? (
                        <Avatar className="w-8 h-8 mb-1 border border-border">
                          <AvatarFallback className="bg-muted text-muted-foreground text-xs font-bold">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                      ) : isAI ? (
                        <div className="w-8 h-8 mb-1 shrink-0 bg-indigo-500/10 text-indigo-400 rounded-full flex items-center justify-center border border-indigo-500/30">
                          <Bot className="w-4 h-4 animate-pulse" />
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
                        {isAgent && (
                          <span className="text-[10px] text-primary flex items-center gap-1 mb-1 font-medium select-none justify-end">
                            Agent Response
                          </span>
                        )}

                        <div
                          className={`px-4 py-2.5 rounded-2xl text-sm relative group leading-relaxed ${
                            isAgent
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
              <form onSubmit={handleSendMessage} className="bg-card border border-border/50 rounded-2xl p-2 focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all">
                <textarea
                  className="w-full bg-transparent resize-none border-none focus:ring-0 text-sm text-foreground placeholder:text-muted-foreground/80 p-2 min-h-[60px] outline-none"
                  placeholder={`Reply to ${activeConversation.contact.name} as ${
                    simulationRole === "USER" ? "Agent (You)" : "Customer (Simulate inbound)"
                  }...`}
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
                      onClick={() => setSimulationRole("USER")}
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
                      onClick={() => setSimulationRole("CUSTOMER")}
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
                    className="h-8 rounded-full bg-primary/95 hover:bg-primary text-foreground px-4 gap-2 shadow-[0_0_15px_rgba(209,188,255,0.3)] disabled:opacity-50"
                  >
                    {isSending ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <>
                        Send <Send className="w-3.5 h-3.5" />
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
      <div className="w-80 flex-shrink-0 border-l border-border/50 bg-background/50 backdrop-blur-sm hidden lg:flex flex-col">
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

        <ScrollArea className="flex-1 p-6">
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

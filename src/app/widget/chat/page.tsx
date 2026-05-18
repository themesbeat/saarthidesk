"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, Bot, RefreshCw, X, ArrowLeft } from "lucide-react";

interface Message {
  id: string;
  sender: "CUSTOMER" | "AI";
  content: string;
  createdAt: Date;
}

export default function WidgetChatPage() {
  const [widgetId, setWidgetId] = useState<string | null>(null);
  const [themeColor, setThemeColor] = useState<string>("#7c3aed");
  const [agentName, setAgentName] = useState<string>("Saarthi AI");
  const [welcomeMessage, setWelcomeMessage] = useState<string>("");

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Parse query params on load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const wId = params.get("widgetId");
      const theme = params.get("theme");
      const name = params.get("agentName");

      if (wId) {
        setWidgetId(wId);
        // Load saved session or conversation ID if it exists in local storage
        const savedConvId = localStorage.getItem(`saarthi_conv_${wId}`);
        if (savedConvId) {
          setConversationId(savedConvId);
        }
      }
      if (theme) setThemeColor(theme);
      if (name) setAgentName(name);
    }
  }, []);

  // Fetch settings once widgetId is resolved
  useEffect(() => {
    if (!widgetId) return;

    const fetchWidgetSettings = async () => {
      try {
        const response = await fetch(`/api/widget/settings?widgetId=${widgetId}`);
        const data = await response.json();
        if (data.success) {
          if (data.agentName) setAgentName(data.agentName);
          if (data.welcomeMessage) {
            setWelcomeMessage(data.welcomeMessage);
            
            // If no messages yet, seed the conversation with the welcome message
            const localMsgs = localStorage.getItem(`saarthi_msgs_${widgetId}`);
            if (localMsgs) {
              try {
                const parsed = JSON.parse(localMsgs) as Message[];
                // Map dates back to Date objects
                setMessages(parsed.map(m => ({ ...m, createdAt: new Date(m.createdAt) })));
              } catch (e) {
                // fallback seed
                setMessages([
                  {
                    id: "welcome",
                    sender: "AI",
                    content: data.welcomeMessage,
                    createdAt: new Date(),
                  },
                ]);
              }
            } else {
              setMessages([
                {
                  id: "welcome",
                  sender: "AI",
                  content: data.welcomeMessage,
                  createdAt: new Date(),
                },
              ]);
            }
          }
        }
      } catch (err) {
        console.error("Failed to load widget settings:", err);
      }
    };

    fetchWidgetSettings();
  }, [widgetId]);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Persist messages to LocalStorage whenever they change
  useEffect(() => {
    if (widgetId && messages.length > 1) {
      localStorage.setItem(`saarthi_msgs_${widgetId}`, JSON.stringify(messages));
    }
  }, [messages, widgetId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !widgetId) return;

    const userText = inputValue.trim();
    setInputValue("");

    // Create user message bubble
    const userMsg: Message = {
      id: `user_${Date.now()}`,
      sender: "CUSTOMER",
      content: userText,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const response = await fetch("/api/widget/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          widgetId,
          conversationId,
          content: userText,
        }),
      });

      const data = await response.json();
      if (data.success) {
        // Save conversation ID for future page reloads
        if (data.conversationId) {
          setConversationId(data.conversationId);
          localStorage.setItem(`saarthi_conv_${widgetId}`, data.conversationId);
        }

        // Add AI response message if it exists
        if (data.aiResponse) {
          const aiMsg: Message = {
            id: data.aiResponse.id,
            sender: "AI",
            content: data.aiResponse.content,
            createdAt: new Date(data.aiResponse.createdAt),
          };
          setMessages((prev) => [...prev, aiMsg]);
        }
      }
    } catch (err) {
      console.error("Failed to submit widget message:", err);
      
      // Fallback fallback response inside the UI on connection issues
      const errResponse: Message = {
        id: `err_${Date.now()}`,
        sender: "AI",
        content: "Oops! I encountered a temporary connection issue. Please check back shortly, or reach out to us directly.",
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, errResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleCloseWidget = () => {
    if (typeof window !== "undefined") {
      window.parent.postMessage({ type: "saarthi:widget-close" }, "*");
    }
  };

  const handleResetChat = () => {
    if (!widgetId) return;
    if (window.confirm("Do you want to reset your chat history?")) {
      localStorage.removeItem(`saarthi_conv_${widgetId}`);
      localStorage.removeItem(`saarthi_msgs_${widgetId}`);
      setConversationId(null);
      setMessages([
        {
          id: "welcome",
          sender: "AI",
          content: welcomeMessage || `Hello! I am ${agentName}. How can I assist you today?`,
          createdAt: new Date(),
        },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-slate-950 font-sans text-slate-100 selection:bg-purple-500/30">
      
      {/* Header Container */}
      <div 
        className="flex items-center justify-between px-4 py-3 shrink-0 shadow-lg border-b border-white/5 relative z-10 transition-colors duration-300"
        style={{ backgroundColor: `${themeColor}cc`, backdropFilter: "blur(12px)" }}
      >
        <div className="flex items-center gap-3">
          {/* Circular Avatar */}
          <div className="w-10 h-10 rounded-full border border-white/20 bg-white/10 flex items-center justify-center overflow-hidden shrink-0 shadow-inner relative">
            <Bot className="w-5.5 h-5.5 text-white" />
            {/* Active pulsing online status indicator */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border border-slate-900 rounded-full animate-pulse"></span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">{agentName}</h3>
            <span className="text-[10px] text-emerald-100 font-semibold opacity-90 flex items-center gap-1">
              Online Receptionist
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button 
            onClick={handleResetChat}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all"
            title="Reset Chat Session"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button 
            onClick={handleCloseWidget}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all"
            title="Close Widget"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      {/* Message Timeline */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
        
        {messages.map((msg) => (
          <div 
            key={msg.id}
            className={`flex items-start gap-2.5 max-w-[85%] animate-in fade-in slide-in-from-bottom-2 duration-300 ${
              msg.sender === "CUSTOMER" ? "ml-auto flex-row-reverse" : "mr-auto"
            }`}
          >
            {msg.sender === "AI" && (
              <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700/50 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-purple-400" />
              </div>
            )}

            <div className="space-y-1">
              <div 
                className={`text-xs px-4 py-3 rounded-2xl leading-relaxed shadow-sm break-words ${
                  msg.sender === "CUSTOMER" 
                    ? "rounded-tr-none text-white text-right"
                    : "rounded-tl-none bg-slate-900/90 border border-slate-800 text-slate-200"
                }`}
                style={msg.sender === "CUSTOMER" ? { backgroundColor: themeColor } : {}}
              >
                <p className="whitespace-pre-line text-left">{msg.content}</p>
              </div>
              <span 
                className={`text-[8.5px] text-slate-500 block ${
                  msg.sender === "CUSTOMER" ? "text-right" : "text-left"
                }`}
              >
                {msg.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}

        {/* Pulsing AI Typing Dots */}
        {isTyping && (
          <div className="flex items-start gap-2.5 max-w-[85%] animate-in fade-in duration-300">
            <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700/50 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-purple-400" />
            </div>
            <div className="bg-slate-900 border border-slate-800 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-100"></span>
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-200"></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Footer Text Submission Bar */}
      <div className="p-3 border-t border-white/5 bg-slate-900/50 shrink-0">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 bg-slate-950 border border-white/10 text-xs px-4 py-2.5 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-white/20 transition-all font-sans"
          />
          <button 
            type="submit"
            disabled={!inputValue.trim()}
            className="w-9 h-9 rounded-xl bg-purple-600 hover:opacity-90 disabled:opacity-40 disabled:hover:opacity-40 text-white flex items-center justify-center transition-all shadow-md active:scale-95 shrink-0"
            style={{ backgroundColor: themeColor }}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        
        {/* Elegant branding bar */}
        <div className="text-center mt-2.5">
          <span className="text-[9px] text-slate-600 font-medium select-none tracking-wider">
            POWERED BY <strong className="text-slate-500">SAARTHIDESK</strong>
          </span>
        </div>
      </div>

    </div>
  );
}

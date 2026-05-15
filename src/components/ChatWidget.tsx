"use client";

import { useState } from "react";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";
import { Button } from "./ui/button";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: "ai", text: "Hi there! Welcome to SaarthiDesk. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { id: Date.now(), sender: "user", text: input }]);
    setInput("");

    // Mock AI reply
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        sender: "ai",
        text: "Thanks for reaching out! One of our human agents will be with you shortly. In the meantime, you can check out our pricing page for more details."
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Widget Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-[0_4px_24px_rgba(209,188,255,0.4)] hover:bg-primary/90 hover:scale-105 transition-all focus:outline-none focus:ring-4 focus:ring-primary/30"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[350px] sm:w-[400px] h-[550px] max-h-[80vh] bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-200">
          {/* Header */}
          <div className="h-16 bg-primary/20 border-b border-border/50 px-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Saarthi Support</h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
                  <span className="text-xs text-muted-foreground">Usually replies instantly</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 text-muted-foreground hover:text-foreground hover:bg-white/10 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-background/50">
            <div className="text-center text-xs text-muted-foreground my-4">Today</div>

            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center ${msg.sender === "user" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                  {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`px-4 py-2 text-sm max-w-[75%] shadow-sm ${msg.sender === "user"
                  ? "bg-primary text-primary-foreground rounded-2xl rounded-br-sm shadow-[0_2px_10px_rgba(209,188,255,0.2)]"
                  : "bg-muted/80 backdrop-blur-md text-foreground border border-border/50 rounded-2xl rounded-bl-sm shadow-sm"
                  }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-card/80 backdrop-blur-md border-t border-border/50">
            <form onSubmit={handleSend} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-input/50 backdrop-blur-sm border border-border/50 rounded-full px-4 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
              <Button type="submit" disabled={!input.trim()} size="icon" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shrink-0 shadow-[0_2px_10px_rgba(209,188,255,0.3)]">
                <Send className="w-4 h-4" />
              </Button>
            </form>
            <div className="text-center mt-3">
              <a href="https://saarthidesk.com" target="_blank" className="text-[10px] text-muted-foreground/80 hover:text-muted-foreground flex items-center justify-center gap-1 transition-colors">
                Powered by Saarthi AI <Bot className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

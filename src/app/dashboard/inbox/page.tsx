import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search, Filter, MoreVertical, Phone,
  Paperclip, Smile, Send, Bot, CheckCheck,
  Camera, MessageCircle, Globe
} from "lucide-react";

export default function InboxPage() {
  return (
    <div className="h-full flex overflow-hidden">
      {/* LEFT PANEL: Conversation List */}
      <div className="w-80 flex-shrink-0 border-r border-border/50 flex flex-col bg-background/50 backdrop-blur-sm">
        <div className="p-4 border-b border-border/50 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">Inbox</h2>
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/80" />
            <Input 
              placeholder="Search messages..." 
              className="pl-9 bg-card border-border/50 focus-visible:ring-primary"
            />
          </div>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full grid grid-cols-3 bg-card border border-border/50">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="ai">AI Active</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="flex flex-col">
            {/* Mock Conversation 1 */}
            <button className="flex items-start gap-3 p-4 border-b border-border/30 bg-primary/10 text-left hover:bg-muted transition-colors">
              <div className="relative">
                <Avatar>
                  <AvatarFallback className="bg-primary/20 text-primary-foreground">AS</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-0.5 border-2 border-slate-950">
                  <MessageCircle className="w-2.5 h-2.5 text-foreground" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="font-semibold text-foreground truncate">Arjun Sharma</span>
                  <span className="text-xs text-primary font-medium">10:42 AM</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">Do you have the premium package available?</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-1.5 py-0">High Intent</Badge>
                  <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20 px-1.5 py-0 flex items-center gap-1">
                    <Bot className="w-3 h-3" /> Replying
                  </Badge>
                </div>
              </div>
            </button>

            {/* Mock Conversation 2 */}
            <button className="flex items-start gap-3 p-4 border-b border-border/30 text-left hover:bg-muted transition-colors opacity-70">
              <div className="relative">
                <Avatar>
                  <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                  <AvatarFallback>P</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 bg-rose-500 rounded-full p-0.5 border-2 border-slate-950">
                  <Camera className="w-2.5 h-2.5 text-foreground" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="font-medium text-foreground truncate">Priya Patel</span>
                  <span className="text-xs text-muted-foreground/80">Yesterday</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">Thanks for the information.</p>
              </div>
            </button>
            
            {/* Mock Conversation 3 */}
            <button className="flex items-start gap-3 p-4 border-b border-border/30 text-left hover:bg-muted transition-colors opacity-70">
              <div className="relative">
                <Avatar>
                  <AvatarFallback className="bg-muted text-muted-foreground">RK</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-0.5 border-2 border-slate-950">
                  <Globe className="w-2.5 h-2.5 text-foreground" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="font-medium text-foreground truncate">Rahul Kumar</span>
                  <span className="text-xs text-muted-foreground/80">Mon</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">What are the clinic timings?</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline" className="text-[10px] bg-muted text-muted-foreground border-border px-1.5 py-0 flex items-center gap-1">
                    <CheckCheck className="w-3 h-3" /> AI Handled
                  </Badge>
                </div>
              </div>
            </button>
          </div>
        </ScrollArea>
      </div>

      {/* CENTER: Chat Area */}
      <div className="flex-1 flex flex-col bg-background relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-slate-950 to-slate-950 pointer-events-none" />
        
        {/* Chat Header */}
        <div className="h-16 border-b border-border/50 px-6 flex items-center justify-between bg-background/80 backdrop-blur-sm z-10">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="bg-primary/20 text-primary-foreground">AS</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-foreground">Arjun Sharma</h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3 text-emerald-500" /> WhatsApp</span>
                <span>•</span>
                <span className="text-emerald-400">Online</span>
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
              <Badge variant="outline" className="bg-card border-border/50 text-muted-foreground/80 text-xs">Today</Badge>
            </div>
            
            {/* Incoming Message */}
            <div className="flex items-end gap-2 max-w-[80%]">
              <Avatar className="w-8 h-8 mb-1">
                <AvatarFallback className="bg-primary/20 text-primary-foreground text-xs">AS</AvatarFallback>
              </Avatar>
              <div>
                <div className="bg-card border border-border/30 text-foreground px-4 py-3 rounded-2xl rounded-bl-sm text-sm">
                  Hi, I saw your ad on Instagram.
                </div>
                <div className="text-[10px] text-muted-foreground/80 mt-1 ml-1">10:40 AM</div>
              </div>
            </div>
            
            {/* Incoming Message 2 */}
            <div className="flex items-end gap-2 max-w-[80%]">
              <Avatar className="w-8 h-8 mb-1 opacity-0">
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <div>
                <div className="bg-card border border-border/30 text-foreground px-4 py-3 rounded-2xl rounded-bl-sm text-sm">
                  Do you have the premium package available for my salon business?
                </div>
                <div className="text-[10px] text-muted-foreground/80 mt-1 ml-1">10:42 AM</div>
              </div>
            </div>
            
            {/* AI Suggestion Bubble */}
            <div className="flex justify-center my-4">
              <div className="bg-primary/10 border border-primary/20 px-4 py-2 rounded-full flex items-center gap-3 shadow-lg shadow-primary/5 backdrop-blur-md">
                <Bot className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-xs text-primary/80 font-medium">AI generated a suggested reply (98% confidence)</span>
                <div className="flex gap-2 border-l border-primary/20 pl-3">
                  <button className="text-xs font-bold text-primary hover:text-primary/80">Insert</button>
                  <button className="text-xs font-bold text-muted-foreground hover:text-muted-foreground">Discard</button>
                </div>
              </div>
            </div>
            
            {/* Outgoing Message (AI Draft) */}
            <div className="flex items-end gap-2 max-w-[80%] self-end flex-row-reverse">
              <div className="w-8 h-8 mb-1 shrink-0 bg-primary/90 rounded-full flex items-center justify-center border border-primary">
                <span className="text-xs font-bold text-foreground">You</span>
              </div>
              <div>
                <div className="bg-primary/90 text-primary-foreground px-4 py-3 rounded-2xl rounded-br-sm text-sm shadow-lg shadow-primary/20 relative group">
                  Yes Arjun! We do have the Premium Package available. It&apos;s perfectly suited for salon businesses like yours, offering unlimited AI replies and advanced knowledge base integration. Would you like me to send you the pricing details?
                  <div className="absolute top-2 -left-24 opacity-0 group-hover:opacity-100 transition-opacity bg-card text-xs px-2 py-1 rounded border border-border/50 text-muted-foreground">
                    Draft by AI
                  </div>
                </div>
                <div className="flex items-center justify-end gap-1 mt-1 mr-1">
                  <span className="text-[10px] text-muted-foreground/80">Not sent yet</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 bg-background/80 backdrop-blur-md border-t border-border/50 z-10">
          <div className="bg-card border border-border/50 rounded-2xl p-2 focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all">
            <textarea 
              className="w-full bg-transparent resize-none border-none focus:ring-0 text-sm text-foreground placeholder:text-muted-foreground/80 p-2 min-h-[60px]"
              placeholder="Type your message..."
              defaultValue="Yes Arjun! We do have the Premium Package available. It&apos;s perfectly suited for salon businesses like yours, offering unlimited AI replies and advanced knowledge base integration. Would you like me to send you the pricing details?"
            />
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/30">
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted">
                  <Smile className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 text-primary hover:text-primary/80 hover:bg-primary/10 rounded-full px-3 gap-1">
                  <Bot className="w-3.5 h-3.5" /> Tone: Professional
                </Button>
              </div>
              <Button className="h-8 rounded-full bg-primary/90 hover:bg-primary/80 text-foreground px-4 gap-2 shadow-[0_0_15px_rgba(209,188,255,0.3)]">
                Send <Send className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: Details */}
      <div className="w-80 flex-shrink-0 border-l border-border/50 bg-background/50 backdrop-blur-sm hidden lg:flex flex-col">
        <div className="h-16 border-b border-border/50 flex items-center px-6">
          <h2 className="font-semibold text-foreground">Details</h2>
        </div>
        
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="flex flex-col items-center text-center">
              <Avatar className="w-20 h-20 mb-3 border-2 border-border/50">
                <AvatarFallback className="bg-primary/20 text-primary-foreground text-xl">AS</AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-bold text-foreground">Arjun Sharma</h3>
              <p className="text-sm text-muted-foreground">+91 98765 43210</p>
            </div>

            {/* AI Summary */}
            <div className="bg-card border border-border/50 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-primary text-sm font-medium">
                <Bot className="w-4 h-4" />
                AI Summary
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Customer is a salon owner interested in the Premium package. Discovered via Instagram ad. Looking for pricing details.
              </p>
            </div>

            {/* CRM Data */}
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground/80 font-medium mb-1.5 uppercase tracking-wider">Lead Stage</p>
                <select className="w-full bg-card border border-border/50 rounded-lg text-sm text-foreground px-3 py-2 focus:ring-1 focus:ring-primary outline-none">
                  <option>New Lead</option>
                  <option>Interested</option>
                  <option>Follow Up</option>
                  <option>Converted</option>
                </select>
              </div>
              
              <div>
                <p className="text-xs text-muted-foreground/80 font-medium mb-1.5 uppercase tracking-wider">Tags</p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-primary/20 text-primary/80 hover:bg-primary/30 border-none">Salon</Badge>
                  <Badge className="bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border-none">High Value</Badge>
                  <Badge variant="outline" className="border-border/50 text-muted-foreground border-dashed hover:bg-muted cursor-pointer">+ Add</Badge>
                </div>
              </div>
              
              <div>
                <p className="text-xs text-muted-foreground/80 font-medium mb-1.5 uppercase tracking-wider">Notes</p>
                <textarea 
                  className="w-full bg-card border border-border/50 rounded-lg text-sm text-muted-foreground px-3 py-2 min-h-[100px] focus:ring-1 focus:ring-primary outline-none resize-none"
                  placeholder="Add private notes here..."
                  defaultValue="Follow up with the salon specific pitch deck."
                />
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

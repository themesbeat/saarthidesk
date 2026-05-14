import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, MoreHorizontal, Calendar, MessageSquare, IndianRupee } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function LeadsPage() {
  return (
    <div className="h-full flex flex-col p-6 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Lead Management</h1>
          <p className="text-muted-foreground">Track and convert your prospects through the pipeline.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-64 hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/80" />
            <Input 
              placeholder="Search leads..." 
              className="pl-9 bg-card border-border/50 focus-visible:ring-primary"
            />
          </div>
          <Button variant="outline" className="border-border/50 bg-card hover:bg-muted text-foreground">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
          <Button className="bg-primary/90 hover:bg-primary/80 text-foreground gap-2 shadow-[0_0_15px_rgba(209,188,255,0.3)]">
            <Plus className="w-4 h-4" /> Add Lead
          </Button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-6 h-full min-w-max items-start">
          
          {/* Column: New Lead */}
          <KanbanColumn title="New Lead" count={3} color="bg-slate-500">
            <LeadCard 
              name="Arjun Sharma" 
              source="Instagram Ad" 
              value="₹4,999" 
              daysAgo="Today" 
              tags={["Salon", "High Intent"]} 
            />
            <LeadCard 
              name="Priya Patel" 
              source="Website Chat" 
              value="Pending" 
              daysAgo="Today" 
              tags={["Question"]} 
            />
            <LeadCard 
              name="Rahul Kumar" 
              source="WhatsApp" 
              value="₹1,999" 
              daysAgo="Yesterday" 
              tags={["Clinic"]} 
            />
          </KanbanColumn>

          {/* Column: Interested */}
          <KanbanColumn title="Interested" count={2} color="bg-primary">
            <LeadCard 
              name="Sneha Gupta" 
              source="Email" 
              value="₹9,999" 
              daysAgo="2 days ago" 
              tags={["Agency", "Enterprise"]} 
            />
            <LeadCard 
              name="Vikram Singh" 
              source="WhatsApp" 
              value="₹1,999" 
              daysAgo="3 days ago" 
              tags={["Gym"]} 
            />
          </KanbanColumn>

          {/* Column: Follow Up */}
          <KanbanColumn title="Follow Up" count={1} color="bg-amber-500">
            <LeadCard 
              name="Neha Desai" 
              source="Instagram DM" 
              value="₹4,999" 
              daysAgo="1 week ago" 
              tags={["Creator", "Needs Demo"]} 
              needsFollowUp={true}
            />
          </KanbanColumn>

          {/* Column: Converted */}
          <KanbanColumn title="Converted" count={4} color="bg-emerald-500">
            <LeadCard 
              name="Amit Patel" 
              source="Website Chat" 
              value="₹1,999" 
              daysAgo="Just now" 
              tags={["Paid"]} 
            />
          </KanbanColumn>

          {/* Column: Closed/Lost */}
          <KanbanColumn title="Closed" count={0} color="bg-rose-500">
            {/* Empty state */}
            <div className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-border/30 rounded-xl text-muted-foreground/80 text-sm">
              No leads here
            </div>
          </KanbanColumn>

        </div>
      </div>
    </div>
  );
}

function KanbanColumn({ title, count, color, children }: { title: string; count: number; color: string; children: React.ReactNode }) {
  return (
    <div className="w-80 flex flex-col h-full shrink-0">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${color} shadow-[0_0_8px_currentColor] opacity-80`}></div>
          <h3 className="font-semibold text-foreground">{title}</h3>
          <Badge variant="secondary" className="bg-white/10 text-muted-foreground px-2 py-0">{count}</Badge>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground/80 hover:text-foreground">
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
        {children}
      </div>
    </div>
  );
}

function LeadCard({ name, source, value, daysAgo, tags, needsFollowUp = false }: any) {
  return (
    <div className={`bg-card border ${needsFollowUp ? 'border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.1)]' : 'border-border/50'} rounded-xl p-4 cursor-pointer hover:border-primary/50 hover:shadow-[0_0_20px_rgba(209,188,255,0.15)] transition-all group`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8 border border-border/50">
            <AvatarFallback className="bg-indigo-950 text-primary-foreground text-xs">{name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">{name}</h4>
            <p className="text-[10px] text-muted-foreground/80">{source}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground/80 opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-1.5 mb-4">
        {tags.map((tag: string, i: number) => (
          <Badge key={i} variant="outline" className="text-[10px] bg-muted border-border/50 text-muted-foreground font-normal px-1.5 py-0">
            {tag}
          </Badge>
        ))}
      </div>
      
      <div className="flex items-center justify-between pt-3 border-t border-border/30 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5 text-emerald-400/80 font-medium">
          <IndianRupee className="w-3.5 h-3.5" /> {value}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 hover:text-foreground">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>2</span>
          </div>
          <div className={`flex items-center gap-1 ${needsFollowUp ? 'text-amber-400' : ''}`}>
            <Calendar className="w-3.5 h-3.5" />
            <span>{daysAgo}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

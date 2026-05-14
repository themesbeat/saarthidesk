import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MessageSquare, Users, Clock, TrendingUp, 
  ArrowUpRight, ArrowDownRight, Bot
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Here's what's happening with your customer conversations today.</p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard 
          title="Total Conversations" 
          value="1,248" 
          change="+12.5%" 
          isPositive={true}
          icon={<MessageSquare className="w-4 h-4 text-primary" />} 
        />
        <MetricCard 
          title="AI Handled" 
          value="84.2%" 
          change="+4.1%" 
          isPositive={true}
          icon={<Bot className="w-4 h-4 text-emerald-400" />} 
        />
        <MetricCard 
          title="Avg. Response Time" 
          value="1m 24s" 
          change="-18.2%" 
          isPositive={true}
          icon={<Clock className="w-4 h-4 text-cyan-400" />} 
        />
        <MetricCard 
          title="New Leads" 
          value="342" 
          change="+8.4%" 
          isPositive={true}
          icon={<Users className="w-4 h-4 text-rose-400" />} 
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Main Chart Mock */}
        <Card className="col-span-4 bg-card/50 border-border/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground">Conversation Volume</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full flex items-end justify-between px-4 pb-2 gap-2">
              {/* Mock Bar Chart */}
              {[40, 55, 35, 70, 45, 90, 60, 85, 50, 75, 65, 100].map((height, i) => (
                <div key={i} className="w-full flex flex-col items-center gap-2 group relative">
                  {/* Tooltip mock */}
                  <div className="absolute -top-10 bg-popover text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-foreground border border-border/50">
                    {height * 12} messages
                  </div>
                  <div 
                    className="w-full bg-primary/20 hover:bg-primary/40 rounded-t-sm transition-all border-t border-primary/50 relative overflow-hidden"
                    style={{ height: `${height}%` }}
                  >
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/40 to-transparent h-1/2"></div>
                  </div>
                  <span className="text-[10px] text-muted-foreground/80">{i * 2}:00</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity Mock */}
        <Card className="col-span-3 bg-card/50 border-border/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground">AI Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">High intent detected</p>
                  <p className="text-xs text-muted-foreground mt-1">3 customers asked about the Pro pricing plan in the last hour. AI recommended starting a free trial.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Follow-up reminder</p>
                  <p className="text-xs text-muted-foreground mt-1">You have 5 leads from WhatsApp that need human intervention today.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Knowledge base utilized</p>
                  <p className="text-xs text-muted-foreground mt-1">AI successfully answered 42 questions using the recently uploaded "Shipping Policy" document.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({ title, value, change, isPositive, icon }: { title: string; value: string; change: string; isPositive: boolean; icon: React.ReactNode }) {
  return (
    <Card className="bg-card/50 border-border/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <p className={`text-xs mt-1 flex items-center gap-1 ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
          {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {change} from last month
        </p>
      </CardContent>
    </Card>
  );
}

import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { Shell } from "@/components/layout/Shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from "recharts";
import { Award, FileEdit, Zap, ArrowUpRight, Clock, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";
import { Link } from "wouter";

export default function Home() {
  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      // Mock stats for dashboard
      return {
        totalTemplates: 12,
        totalGenerated: 1450,
        successRate: 98.5,
        recentActivity: [
          { id: 1, action: "Certificate Generated", recipient: "Alice Smith", date: new Date().toISOString(), status: "success" },
          { id: 2, action: "Template Updated", recipient: "Course Completion v2", date: new Date(Date.now() - 3600000).toISOString(), status: "info" },
          { id: 3, action: "Certificate Generated", recipient: "Bob Jones", date: new Date(Date.now() - 7200000).toISOString(), status: "failed" },
          { id: 4, action: "API Key Created", recipient: "Marketing Team", date: new Date(Date.now() - 86400000).toISOString(), status: "success" },
        ],
        chartData: [
          { name: 'Mon', value: 40 },
          { name: 'Tue', value: 30 },
          { name: 'Wed', value: 20 },
          { name: 'Thu', value: 65 },
          { name: 'Fri', value: 80 },
          { name: 'Sat', value: 45 },
          { name: 'Sun', value: 30 },
        ]
      };
    }
  });

  if (!stats) return null;

  return (
    <Shell>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-1">Overview of your certificate generation system</p>
        </div>
        <Link href="/templates">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2">
            <FileEdit className="w-4 h-4" />
            Create Template
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Templates" 
          value={stats.totalTemplates} 
          icon={FileEdit} 
          trend="+2 this week"
          color="bg-blue-500" 
        />
        <StatCard 
          title="Certificates Generated" 
          value={stats.totalGenerated.toLocaleString()} 
          icon={Award} 
          trend="+12% vs last month"
          color="bg-indigo-500" 
        />
        <StatCard 
          title="Success Rate" 
          value={`${stats.successRate}%`} 
          icon={Zap} 
          trend="Stable"
          color="bg-emerald-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle>Generation Volume</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.chartData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {stats.chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 4 ? '#6366f1' : '#cbd5e1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {stats.recentActivity.map((item: any) => (
                <div key={item.id} className="flex items-start gap-4">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1",
                    item.status === 'success' && "bg-emerald-100 text-emerald-600",
                    item.status === 'failed' && "bg-red-100 text-red-600",
                    item.status === 'info' && "bg-blue-100 text-blue-600",
                  )}>
                    {item.status === 'success' && <CheckCircle className="w-4 h-4" />}
                    {item.status === 'failed' && <XCircle className="w-4 h-4" />}
                    {item.status === 'info' && <Clock className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900">{item.action}</p>
                    <p className="text-xs text-slate-500 truncate">{item.recipient}</p>
                  </div>
                  <div className="text-xs text-slate-400 whitespace-nowrap">
                    {format(new Date(item.date), 'MMM d, h:mm a')}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Shell>
  );
}

function StatCard({ title, value, icon: Icon, trend, color }: any) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="text-2xl font-bold font-display text-slate-900 mt-2">{value}</h3>
        </div>
        <div className={cn("p-2 rounded-lg text-white shadow-lg shadow-opacity-20", color)}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="mt-4 flex items-center text-xs font-medium text-emerald-600">
        <ArrowUpRight className="w-3 h-3 mr-1" />
        {trend}
      </div>
    </div>
  );
}

function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ");
}

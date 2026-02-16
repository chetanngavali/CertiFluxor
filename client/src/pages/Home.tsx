import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { Shell } from "@/components/layout/Shell";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { LogOut, Award, FileEdit, Zap, History as HistoryIcon } from "lucide-react";
import { Link } from "wouter";
import { StatCard } from "@/components/dashboard/StatCard";
import { BarChartSection } from "@/components/dashboard/BarChartSection";
import { ActivityList } from "@/components/dashboard/ActivityList";

export default function Home() {
  const { user, logoutMutation } = useAuth();

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      // Mock stats for dashboard
      return {
        totalTemplates: 12,
        totalGenerated: 1450,
        successRate: 98.5,
        recentActivity: [
          { id: 1, action: "Certificate Generated", recipient: "Alice Smith", date: new Date().toISOString(), status: "success" as const },
          { id: 2, action: "Template Updated", recipient: "Course Completion v2", date: new Date(Date.now() - 3600000).toISOString(), status: "info" as const },
          { id: 3, action: "Certificate Generated", recipient: "Bob Jones", date: new Date(Date.now() - 7200000).toISOString(), status: "failed" as const },
          { id: 4, action: "API Key Created", recipient: "Marketing Team", date: new Date(Date.now() - 86400000).toISOString(), status: "success" as const },
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
    },
    enabled: user?.role === 'admin'
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  if (!user) return null;

  // === USER DASHBOARD ===
  if (user.role !== 'admin') {
    return (
      <Shell>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-display text-slate-900">
              Welcome, {user.username}!
            </h1>
            <p className="text-slate-500 mt-1">Manage your certificates and templates.</p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            className="w-full sm:w-auto"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/templates">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer group active:scale-[0.98]">
              <div className="h-12 w-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-600 transition-colors">
                <FileEdit className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">My Templates</h3>
              <p className="text-slate-600">Create and design new certificate templates.</p>
            </div>
          </Link>

          <Link href="/history">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer group active:scale-[0.98]">
              <div className="h-12 w-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-600 transition-colors">
                <HistoryIcon className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Generation History</h3>
              <p className="text-slate-600">View past certificates and download copies.</p>
            </div>
          </Link>
        </div>
      </Shell>
    );
  }

  // === ADMIN DASHBOARD ===
  return (
    <Shell>
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-display text-slate-900">
            Admin Dashboard
          </h1>
          <p className="text-slate-600 mt-1 text-sm md:text-base">
            System-wide overview for {user.username}
          </p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Link href="/templates" className="flex-1 sm:flex-none">
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white px-5 py-2.5 rounded-lg font-semibold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all flex items-center justify-center gap-2">
              <FileEdit className="w-4 h-4" />
              <span className="hidden sm:inline">Create Template</span>
              <span className="sm:hidden">New</span>
            </button>
          </Link>
          <Button
            variant="outline"
            size="icon"
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            className="hover:bg-slate-100 active:scale-95 transition-all"
            aria-label="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Stats Cards Grid - Responsive: 1 col mobile, 2 cols tablet, 3 cols desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <StatCard
          title="Total Templates"
          value={stats?.totalTemplates || 0}
          icon={FileEdit}
          trend={stats ? "+2 this week" : undefined}
          color="bg-blue-500"
          loading={statsLoading}
        />
        <StatCard
          title="Certificates Generated"
          value={stats?.totalGenerated.toLocaleString() || "0"}
          icon={Award}
          trend={stats ? "+12% vs last month" : undefined}
          color="bg-indigo-500"
          loading={statsLoading}
        />
        <StatCard
          title="Success Rate"
          value={stats ? `${stats.successRate}%` : "0%"}
          icon={Zap}
          trend={stats ? "Stable" : undefined}
          color="bg-emerald-500"
          loading={statsLoading}
        />
      </div>

      {/* Charts Section - Stacks on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <BarChartSection
          data={stats?.chartData || []}
          loading={statsLoading}
        />
        <ActivityList
          activities={stats?.recentActivity || []}
          loading={statsLoading}
        />
      </div>
    </Shell>
  );
}

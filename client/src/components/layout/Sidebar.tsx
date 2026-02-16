import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Award, LayoutDashboard, FileEdit, Key, History, Settings, LogOut } from "lucide-react";

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Templates', href: '/templates', icon: FileEdit },
  { name: 'API Keys', href: '/api-keys', icon: Key },
  { name: 'History', href: '/history', icon: History },
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="hidden lg:flex h-screen w-64 flex-col fixed inset-y-0 z-50 bg-slate-900 text-white border-r border-slate-800">
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-slate-800 bg-slate-950">
        <Award className="h-6 w-6 text-primary mr-2" />
        <span className="font-display font-black text-xl tracking-tighter uppercase text-white">CertiFluxor</span>
      </div>

      <nav className="flex-1 flex flex-col gap-1 p-4">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2">
          Menu
        </div>

        {navigation.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <div
                className={cn(
                  "group flex items-center gap-x-3 rounded-lg p-3 text-sm font-medium transition-all duration-200 cursor-pointer",
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5 shrink-0 transition-colors",
                    isActive ? "text-white" : "text-slate-400 group-hover:text-white"
                  )}
                />
                {item.name}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 bg-slate-950">
        <div className="flex items-center gap-x-3 rounded-lg p-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer transition-colors">
          <div className="h-8 w-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold">
            AD
          </div>
          <div className="flex flex-col">
            <span className="text-white text-sm font-medium">Admin User</span>
            <span className="text-xs text-slate-500">admin@fluxcert.io</span>
          </div>
          <LogOut className="ml-auto h-4 w-4" />
        </div>
      </div>
    </div>
  );
}

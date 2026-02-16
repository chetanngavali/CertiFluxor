import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    color: string;
    loading?: boolean;
}

export function StatCard({ title, value, icon: Icon, trend, color, loading = false }: StatCardProps) {
    if (loading) {
        return (
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                        <div className="h-4 bg-slate-200 rounded animate-pulse w-24" />
                        <div className="h-8 bg-slate-200 rounded animate-pulse w-20" />
                    </div>
                    <div className="h-12 w-12 bg-slate-100 rounded-lg animate-pulse" />
                </div>
                <div className="mt-4 h-3 bg-slate-100 rounded animate-pulse w-28" />
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 group cursor-default">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-semibold text-slate-600">{title}</p>
                    <h3 className="text-3xl font-bold font-display text-slate-900 mt-2 group-hover:text-indigo-600 transition-colors">
                        {value}
                    </h3>
                </div>
                <div className={cn(
                    "p-3 rounded-lg text-white shadow-lg transition-transform group-hover:scale-110",
                    color
                )}>
                    <Icon className="w-6 h-6" />
                </div>
            </div>
            {trend && (
                <div className="mt-4 flex items-center text-xs font-semibold">
                    <svg className="w-4 h-4 mr-1 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span className="text-emerald-700">{trend}</span>
                </div>
            )}
        </div>
    );
}

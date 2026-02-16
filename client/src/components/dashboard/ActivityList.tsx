import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Activity {
    id: number;
    action: string;
    recipient: string;
    date: string;
    status: 'success' | 'failed' | 'info';
}

interface ActivityListProps {
    activities: Activity[];
    loading?: boolean;
}

export function ActivityList({ activities, loading = false }: ActivityListProps) {
    if (loading) {
        return (
            <Card className="shadow-sm border-slate-200">
                <CardHeader>
                    <div className="h-6 bg-slate-200 rounded animate-pulse w-32" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-slate-200 rounded animate-pulse w-40" />
                                    <div className="h-3 bg-slate-100 rounded animate-pulse w-24" />
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    }

    const getStatusIcon = (status: Activity['status']) => {
        switch (status) {
            case 'success':
                return <CheckCircle className="w-4 h-4" />;
            case 'failed':
                return <XCircle className="w-4 h-4" />;
            case 'info':
                return <Clock className="w-4 h-4" />;
        }
    };

    const getStatusColor = (status: Activity['status']) => {
        switch (status) {
            case 'success':
                return "bg-emerald-100 text-emerald-600";
            case 'failed':
                return "bg-red-100 text-red-600";
            case 'info':
                return "bg-blue-100 text-blue-600";
        }
    };

    return (
        <Card className="shadow-sm border-slate-200 hover:shadow-md transition-shadow">
            <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-1">
                    {activities.map((item, index) => (
                        <div
                            key={item.id}
                            className={cn(
                                "flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors",
                                index % 2 === 0 ? "bg-transparent" : "bg-slate-50/50"
                            )}
                        >
                            <div className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1",
                                getStatusColor(item.status)
                            )}>
                                {getStatusIcon(item.status)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-slate-900">{item.action}</p>
                                <p className="text-xs text-slate-500 truncate mt-0.5">{item.recipient}</p>
                            </div>
                            <div className="text-xs text-slate-400 whitespace-nowrap font-medium">
                                {format(new Date(item.date), 'MMM d, h:mm a')}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

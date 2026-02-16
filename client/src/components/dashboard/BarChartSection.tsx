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

interface ChartData {
    name: string;
    value: number;
}

interface BarChartSectionProps {
    data: ChartData[];
    loading?: boolean;
}

export function BarChartSection({ data, loading = false }: BarChartSectionProps) {
    if (loading) {
        return (
            <Card className="shadow-sm border-slate-200">
                <CardHeader>
                    <div className="h-6 bg-slate-200 rounded animate-pulse w-40" />
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                    <div className="text-slate-400">Loading chart data...</div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="shadow-sm border-slate-200 hover:shadow-md transition-shadow">
            <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900">Generation Volume</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#64748b' }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#64748b' }}
                        />
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{
                                borderRadius: '8px',
                                border: 'none',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                fontSize: '14px'
                            }}
                        />
                        <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={index === 4 ? '#6366f1' : '#cbd5e1'}
                                    className="hover:opacity-80 transition-opacity cursor-pointer"
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

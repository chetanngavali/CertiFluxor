import { useCertificateHistory } from "@/hooks/use-certificates";
import { Shell } from "@/components/layout/Shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { FileText, CheckCircle, XCircle, Clock } from "lucide-react";

export default function History() {
  const { data: history, isLoading } = useCertificateHistory();

  return (
    <Shell>
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-display text-slate-900">History</h1>
        <p className="text-slate-500 mt-1">Audit log of all generated certificates</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="text-left p-4 font-medium text-sm text-slate-500">Status</th>
                <th className="text-left p-4 font-medium text-sm text-slate-500">Recipient</th>
                <th className="text-left p-4 font-medium text-sm text-slate-500">Template ID</th>
                <th className="text-left p-4 font-medium text-sm text-slate-500">Date</th>
                <th className="text-right p-4 font-medium text-sm text-slate-500">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {isLoading ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-500">Loading...</td></tr>
              ) : history?.map((item) => (
                <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="p-4">
                    <Badge variant={
                      item.status === 'completed' ? 'default' : 
                      item.status === 'failed' ? 'destructive' : 'secondary'
                    } className={
                      item.status === 'completed' ? 'bg-emerald-500 hover:bg-emerald-600' : ''
                    }>
                      {item.status}
                    </Badge>
                  </td>
                  <td className="p-4 font-medium text-slate-900">{item.recipientName || 'Unknown'}</td>
                  <td className="p-4 text-sm text-slate-500 font-mono">{item.templateId}</td>
                  <td className="p-4 text-sm text-slate-500">
                    {format(new Date(item.createdAt || new Date()), 'MMM d, yyyy HH:mm')}
                  </td>
                  <td className="p-4 text-right">
                    {item.fileUrl && (
                      <a href={item.fileUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline text-sm font-medium">
                        Download
                      </a>
                    )}
                  </td>
                </tr>
              ))}
              {history?.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-slate-500">
                    No generation history found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </Shell>
  );
}

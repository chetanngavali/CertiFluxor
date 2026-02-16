import { useApiKeys, useCreateApiKey } from "@/hooks/use-api-keys";
import { Shell } from "@/components/layout/Shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Copy, Key as KeyIcon, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";

export default function ApiKeys() {
  const { data: keys, isLoading } = useApiKeys();
  const createKey = useCreateApiKey();
  const { toast } = useToast();
  const [newOwner, setNewOwner] = useState("");
  const [open, setOpen] = useState(false);

  const handleCreate = () => {
    createKey.mutate({
      key: `sk_live_${crypto.randomUUID().replace(/-/g, '')}`,
      ownerName: newOwner,
      permissions: ["generate", "read_templates"],
      isActive: true,
    }, {
      onSuccess: () => {
        setOpen(false);
        setNewOwner("");
      }
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied", description: "API Key copied to clipboard" });
  };

  return (
    <Shell>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold font-display text-slate-900">API Keys</h1>
          <p className="text-slate-500 mt-1">Manage access tokens for programmatic generation</p>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <Plus className="w-4 h-4 mr-2" /> Create New Key
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create API Key</DialogTitle>
              <DialogDescription>
                Enter a name for the owner of this key (e.g., "Marketing Dept" or "Zapier Integration").
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Label htmlFor="owner">Key Owner / Name</Label>
              <Input 
                id="owner" 
                value={newOwner} 
                onChange={(e) => setNewOwner(e.target.value)} 
                placeholder="e.g. Production Server"
                className="mt-2"
              />
            </div>
            <DialogFooter>
              <Button onClick={handleCreate} disabled={!newOwner || createKey.isPending}>
                {createKey.isPending ? "Creating..." : "Create Key"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {isLoading ? (
          <div>Loading keys...</div>
        ) : keys?.map((key) => (
          <Card key={key.id} className="overflow-hidden border-slate-200">
            <CardHeader className="bg-slate-50 border-b border-slate-100 py-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <KeyIcon className="w-4 h-4 text-slate-400" />
                  <span className="font-semibold text-slate-700">{key.ownerName}</span>
                  {key.isActive && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium border border-emerald-200">
                      Active
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-500">
                  Created {format(new Date(key.createdAt || new Date()), 'MMM d, yyyy')}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex gap-4 items-center">
                <div className="flex-1 bg-slate-100 p-3 rounded-lg font-mono text-sm text-slate-600 truncate">
                  {key.key}
                </div>
                <Button variant="outline" onClick={() => copyToClipboard(key.key)}>
                  <Copy className="w-4 h-4 mr-2" /> Copy
                </Button>
              </div>
              <div className="mt-4 text-xs text-slate-500">
                Last used: {key.lastUsedAt ? format(new Date(key.lastUsedAt), 'MMM d, h:mm a') : 'Never'}
              </div>
            </CardContent>
          </Card>
        ))}
        
        {keys?.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <KeyIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="font-medium text-slate-900">No API Keys</h3>
            <p className="text-slate-500 text-sm mt-1">Create a key to use the API</p>
          </div>
        )}
      </div>
    </Shell>
  );
}

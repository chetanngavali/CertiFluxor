import { useTemplates, useCreateTemplate, useDeleteTemplate } from "@/hooks/use-templates";
import { Shell } from "@/components/layout/Shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Trash2, Edit, Copy, MoreHorizontal, FileEdit } from "lucide-react";
import { Link, useLocation } from "wouter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

export default function TemplateList() {
  const { data: templates, isLoading } = useTemplates();
  const createTemplate = useCreateTemplate();
  const deleteTemplate = useDeleteTemplate();
  const [, setLocation] = useLocation();

  const handleCreate = () => {
    createTemplate.mutate({
      id: `template-${Date.now()}`,
      name: "New Untitled Template",
      width: 800,
      height: 600,
      elements: [],
    }, {
      onSuccess: (data: any) => {
        setLocation(`/templates/${data.id}`);
      }
    });
  };

  return (
    <Shell>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold font-display text-slate-900">Templates</h1>
          <p className="text-slate-500 mt-1">Manage your certificate designs</p>
        </div>
        <Button onClick={handleCreate} disabled={createTemplate.isPending} className="bg-indigo-600 hover:bg-indigo-700">
          {createTemplate.isPending ? "Creating..." : <><Plus className="w-4 h-4 mr-2" /> New Template</>}
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-[300px] w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates?.map((template: any) => (
            <Card key={template.id} className="group overflow-hidden border-slate-200 hover:border-indigo-200 hover:shadow-lg transition-all duration-300">
              {/* Preview Area */}
              <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden border-b">
                {template.thumbnailUrl ? (
                  <img src={template.thumbnailUrl} alt={template.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-slate-300 font-display text-4xl font-bold opacity-20">
                    PREVIEW
                  </div>
                )}

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Link href={`/templates/${template.id}`}>
                    <Button variant="secondary" className="font-semibold">
                      <Edit className="w-4 h-4 mr-2" /> Edit Design
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Footer Info */}
              <div className="p-4 bg-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-slate-900 truncate pr-4">{template.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Updated {format(new Date(template.updatedAt || new Date()), 'MMM d, yyyy')}
                    </p>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => { /* Duplicate logic */ }}>
                        <Copy className="w-4 h-4 mr-2" /> Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-600 focus:bg-red-50"
                        onClick={() => deleteTemplate.mutate(template.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </Card>
          ))}

          {/* Empty State */}
          {templates?.length === 0 && (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileEdit className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">No templates yet</h3>
              <p className="text-slate-500 max-w-sm mx-auto mt-2 mb-6">
                Create your first certificate template to get started. You can customize layout, fonts, and dynamic fields.
              </p>
              <Button onClick={handleCreate}>Create Template</Button>
            </div>
          )}
        </div>
      )}
    </Shell>
  );
}

import { useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { useTemplate, useUpdateTemplate } from "@/hooks/use-templates";
import { useGenerateCertificate } from "@/hooks/use-certificates";
import { Shell } from "@/components/layout/Shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TemplateDesigner } from "@/components/TemplateDesigner";
import { ExcelUploader } from "@/components/ExcelUploader";
import { ChevronLeft, Save, Download, Eye, Play } from "lucide-react";
import { TemplateElement } from "@shared/schema";
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

export default function TemplateEditor() {
  const [, params] = useRoute("/templates/:id");
  const [, setLocation] = useLocation();
  const id = params?.id || "";

  const { data: template, isLoading } = useTemplate(id);
  const updateTemplate = useUpdateTemplate();
  const generateCertificate = useGenerateCertificate();
  const { toast } = useToast();

  const [elements, setElements] = useState<TemplateElement[]>([]);
  const [name, setName] = useState("");
  const [excelData, setExcelData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [previewRowIndex, setPreviewRowIndex] = useState(0);

  useEffect(() => {
    if (template) {
      setElements(template.elements);
      setName(template.name);
    }
  }, [template]);

  // Preview elements with substituted data
  const previewElements = elements.map(el => {
    if (el.type === "dynamicText" && el.bindingField && excelData.length > 0) {
      const row = excelData[previewRowIndex];
      return {
        ...el,
        text: row[el.bindingField] || `{${el.bindingField}}`
      };
    }
    return el;
  });

  const handleSave = () => {
    updateTemplate.mutate({
      id,
      name,
      elements,
    });
  };

  const handleGenerate = () => {
    if (excelData.length === 0) {
      toast({ title: "No Data", description: "Upload an Excel file first", variant: "destructive" });
      return;
    }

    generateCertificate.mutate({
      templateId: id,
      rows: excelData,
      format: "pdf"
    });
  };

  if (isLoading) return <div className="p-20 text-center">Loading editor...</div>;
  if (!template) return <div className="p-20 text-center">Template not found</div>;

  return (
    <Shell>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => setLocation("/templates")}>
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <Input
          className="text-xl font-display font-bold border-none shadow-none focus-visible:ring-0 px-0 h-auto w-auto min-w-[300px]"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" onClick={handleSave} disabled={updateTemplate.isPending}>
            <Save className="w-4 h-4 mr-2" />
            {updateTemplate.isPending ? "Saving..." : "Save Draft"}
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <Play className="w-4 h-4 mr-2" />
                Generate Certificates
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Generate Certificates</DialogTitle>
                <DialogDescription>
                  This will generate {excelData.length} certificates based on your uploaded data.
                </DialogDescription>
              </DialogHeader>

              <div className="py-4">
                {excelData.length > 0 ? (
                  <div className="p-4 bg-emerald-50 text-emerald-800 rounded-lg text-sm">
                    Ready to generate for {excelData.length} recipients.
                  </div>
                ) : (
                  <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg text-sm">
                    Please upload Excel data in the "Data Source" tab first.
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button onClick={handleGenerate} disabled={excelData.length === 0 || generateCertificate.isPending}>
                  {generateCertificate.isPending ? "Generating..." : "Start Generation"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="design" className="space-y-6">
        <TabsList className="grid w-[400px] grid-cols-2">
          <TabsTrigger value="design">Design Template</TabsTrigger>
          <TabsTrigger value="data">Data Source</TabsTrigger>
        </TabsList>

        <TabsContent value="design" className="space-y-4">
          <div className="flex items-center justify-between bg-white p-2 rounded-lg border shadow-sm mb-4">
            <div className="flex items-center gap-2 text-sm text-slate-500 pl-2">
              <Eye className="w-4 h-4" />
              <span>Preview Mode: {excelData.length > 0 ? `Row ${previewRowIndex + 1} of ${excelData.length}` : "Default"}</span>
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                disabled={previewRowIndex === 0}
                onClick={() => setPreviewRowIndex(i => i - 1)}
              >Previous</Button>
              <Button
                variant="ghost"
                size="sm"
                disabled={previewRowIndex >= excelData.length - 1}
                onClick={() => setPreviewRowIndex(i => i + 1)}
              >Next</Button>
            </div>
          </div>

          <TemplateDesigner
            elements={excelData.length > 0 ? previewElements : elements}
            onChange={setElements}
            width={template.width}
            height={template.height}
            headers={headers}
            scale={0.8}
          />
        </TabsContent>

        <TabsContent value="data">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <ExcelUploader
                onDataParsed={(data, headers) => {
                  setExcelData(data);
                  setHeaders(headers);
                }}
                hasData={excelData.length > 0}
                onClear={() => {
                  setExcelData([]);
                  setHeaders([]);
                }}
              />
            </div>

            <div className="lg:col-span-2">
              <Card>
                <div className="p-4 border-b">
                  <h3 className="font-semibold">Data Preview</h3>
                </div>
                <div className="overflow-auto max-h-[500px]">
                  {excelData.length > 0 ? (
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 sticky top-0">
                        <tr>
                          {headers.map(h => (
                            <th key={h} className="text-left p-3 font-medium text-slate-500 border-b">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {excelData.slice(0, 10).map((row, i) => (
                          <tr key={i} className="border-b last:border-0 hover:bg-slate-50">
                            {headers.map(h => (
                              <td key={`${i}-${h}`} className="p-3 text-slate-700">{row[h]}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="p-12 text-center text-slate-400">
                      No data loaded. Upload an Excel file to see preview.
                    </div>
                  )}
                </div>
                {excelData.length > 10 && (
                  <div className="p-2 text-center text-xs text-slate-400 bg-slate-50 border-t">
                    Showing first 10 rows of {excelData.length}
                  </div>
                )}
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Shell>
  );
}

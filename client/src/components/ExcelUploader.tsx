import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import { Upload, FileSpreadsheet, X, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ExcelUploaderProps {
  onDataParsed: (data: any[], headers: string[]) => void;
  className?: string;
  hasData?: boolean;
  onClear?: () => void;
}

export function ExcelUploader({ onDataParsed, className, hasData, onClear }: ExcelUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      const headers = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0] as string[];
      
      onDataParsed(jsonData, headers);
    };

    reader.readAsArrayBuffer(file);
  }, [onDataParsed]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
      'text/csv': ['.csv']
    },
    maxFiles: 1
  });

  if (hasData) {
    return (
      <div className={cn(
        "bg-emerald-50 border-2 border-emerald-200 rounded-xl p-6 flex items-center justify-between",
        className
      )}>
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
            <CheckCircle className="h-6 w-6 text-emerald-600" />
          </div>
          <div>
            <h3 className="font-semibold text-emerald-900">Data Loaded</h3>
            <p className="text-sm text-emerald-700">Excel file parsed successfully</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onClear} className="text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100">
          <X className="h-4 w-4 mr-2" />
          Clear Data
        </Button>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-xl p-8 transition-all duration-200 cursor-pointer text-center",
        isDragActive 
          ? "border-primary bg-primary/5 scale-[0.99]" 
          : "border-slate-200 hover:border-primary/50 hover:bg-slate-50",
        className
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-3">
        <div className={cn(
          "h-16 w-16 rounded-full flex items-center justify-center transition-colors",
          isDragActive ? "bg-primary/20" : "bg-slate-100"
        )}>
          {isDragActive ? (
            <Upload className="h-8 w-8 text-primary" />
          ) : (
            <FileSpreadsheet className="h-8 w-8 text-slate-400" />
          )}
        </div>
        <div className="space-y-1">
          <p className="font-medium text-lg text-slate-900">
            {isDragActive ? "Drop the file here" : "Upload recipient data"}
          </p>
          <p className="text-sm text-muted-foreground">
            Drag & drop an Excel or CSV file, or click to select
          </p>
        </div>
      </div>
    </div>
  );
}

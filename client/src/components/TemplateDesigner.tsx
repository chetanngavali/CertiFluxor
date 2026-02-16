// Enhanced Template Designer with UX improvements
import React, { useState, useRef } from "react";
import { Rnd } from "react-rnd";
import { TemplateElement } from "@shared/schema";
import { cn } from "@/lib/utils";
import {
  Type,
  Image as ImageIcon,
  Square,
  Trash2,
  Move,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  ZoomIn,
  ZoomOut,
  Info,
  FilePlus,
  Grid3x3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { TopToolbar } from "@/components/TopToolbar";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface TemplateDesignerProps {
  elements: TemplateElement[];
  onChange: (elements: TemplateElement[]) => void;
  width: number;
  height: number;
  scale?: number;
  headers: string[]; // For dynamic binding
}

export function TemplateDesigner({
  elements,
  onChange,
  width,
  height,
  scale: initialScale = 1,
  headers = []
}: TemplateDesignerProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [scale, setScale] = useState(initialScale);
  const [pageSize, setPageSize] = useState<"a4-landscape" | "a4-portrait">("a4-landscape");
  const [showGrid, setShowGrid] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedElement = elements.find(el => el.id === selectedId);

  const handleAddElement = (type: TemplateElement["type"], label: string) => {
    const newElement: TemplateElement = {
      id: crypto.randomUUID(),
      type,
      x: 50,
      y: 50,
      width: type === "shape" ? 100 : 200,
      height: type === "shape" ? 100 : 50,
      text: type === "staticText" ? "Double click to edit" : type === "dynamicText" ? "{Field}" : undefined,
      backgroundColor: type === "shape" ? "#e2e8f0" : undefined,
      fontSize: 16,
      fontFamily: "Inter",
      color: "#000000",
      textAlign: "left",
      scaleX: 1,
      scaleY: 1,
      locked: false,
    };
    onChange([...elements, newElement]);
    setSelectedId(newElement.id);
    toast.success(`${label} added to canvas`);
  };

  const handleUpdateElement = (id: string, updates: Partial<TemplateElement>) => {
    onChange(elements.map(el => el.id === id ? { ...el, ...updates } : el));
  };

  const handleDeleteElement = (id: string) => {
    onChange(elements.filter(el => el.id !== id));
    if (selectedId === id) setSelectedId(null);
    toast.success("Element deleted");
  };

  const handleDuplicate = () => {
    if (!selectedElement) return;
    const newElement = {
      ...selectedElement,
      id: crypto.randomUUID(),
      x: selectedElement.x + 20,
      y: selectedElement.y + 20,
    };
    onChange([...elements, newElement]);
    setSelectedId(newElement.id);
    toast.success("Element duplicated");
  };

  const handleLock = () => {
    if (!selectedElement) return;
    handleUpdateElement(selectedElement.id, { locked: !selectedElement.locked });
    toast.success(selectedElement.locked ? "Element unlocked" : "Element locked");
  };

  const handleZoomIn = () => {
    const newScale = Math.min(scale + 0.1, 2);
    setScale(newScale);
    toast.success(`Zoomed to ${Math.round(newScale * 100)}%`);
  };

  const handleZoomOut = () => {
    const newScale = Math.max(scale - 0.1, 0.3);
    setScale(newScale);
    toast.success(`Zoomed to ${Math.round(newScale * 100)}%`);
  };

  const handleResetZoom = () => {
    setScale(1);
    toast.success("Zoom reset to 100%");
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col h-[800px] border rounded-xl overflow-hidden bg-white shadow-sm">
        {/* Top Toolbar */}
        <TopToolbar
          selectedElement={selectedElement || null}
          elements={elements}
          onUpdateElement={(updates) => selectedElement && handleUpdateElement(selectedElement.id, updates)}
          onDuplicate={handleDuplicate}
          onDelete={() => selectedElement && handleDeleteElement(selectedElement.id)}
          onLock={handleLock}
          canvasWidth={width}
          canvasHeight={height}
        />

        {/* Data Source Info Bar */}
        {headers.length > 0 && (
          <div className="bg-indigo-50 border-b border-indigo-100 px-4 py-2 flex items-center gap-2 text-sm">
            <Info className="w-4 h-4 text-indigo-600" />
            <span className="text-indigo-900">
              Data Source connected with <Badge variant="secondary" className="ml-1">{headers.length} fields</Badge>
            </span>
            <span className="text-indigo-700 ml-2">
              Available: {headers.slice(0, 3).map(h => `{{${h}}}`).join(", ")}
              {headers.length > 3 && ` +${headers.length - 3} more`}
            </span>
          </div>
        )}

        <div className="flex flex-1 overflow-hidden">
          {/* Left Toolbar with Tooltips */}
          <div className="w-16 border-r bg-slate-50 flex flex-col items-center py-4 gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleAddElement("staticText", "Static Text")}
                  className="w-12 h-12 flex flex-col items-center justify-center rounded-lg hover:bg-indigo-100 active:bg-indigo-200 transition-colors text-slate-700 hover:text-indigo-700 group"
                >
                  <Type className="w-5 h-5" />
                  <span className="text-[10px] mt-0.5 font-medium">Text</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Add Static Text</p>
                <p className="text-xs text-muted-foreground">Fixed text on all certificates</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleAddElement("dynamicText", "Dynamic Field")}
                  className="w-12 h-12 flex flex-col items-center justify-center rounded-lg hover:bg-emerald-100 active:bg-emerald-200 transition-colors text-emerald-700 hover:text-emerald-800 group"
                >
                  <FilePlus className="w-5 h-5" />
                  <span className="text-[10px] mt-0.5 font-medium">Field</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Add Dynamic Field</p>
                <p className="text-xs text-muted-foreground">Binds to Excel data (Name, Course, etc.)</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleAddElement("image", "Image")}
                  className="w-12 h-12 flex flex-col items-center justify-center rounded-lg hover:bg-blue-100 active:bg-blue-200 transition-colors text-blue-700 hover:text-blue-800"
                >
                  <ImageIcon className="w-5 h-5" />
                  <span className="text-[10px] mt-0.5 font-medium">Image</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Add Image</p>
                <p className="text-xs text-muted-foreground">Upload logo, signature, or icon</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleAddElement("shape", "Shape")}
                  className="w-12 h-12 flex flex-col items-center justify-center rounded-lg hover:bg-purple-100 active:bg-purple-200 transition-colors text-purple-700 hover:text-purple-800"
                >
                  <Square className="w-5 h-5" />
                  <span className="text-[10px] mt-0.5 font-medium">Shape</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Add Shape</p>
                <p className="text-xs text-muted-foreground">Rectangle, circle, or border</p>
              </TooltipContent>
            </Tooltip>

            <Separator className="my-2" />

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setShowGrid(!showGrid)}
                  className={cn(
                    "w-12 h-12 flex flex-col items-center justify-center rounded-lg transition-colors",
                    showGrid
                      ? "bg-slate-200 text-slate-900"
                      : "hover:bg-slate-100 text-slate-600"
                  )}
                >
                  <Grid3x3 className="w-5 h-5" />
                  <span className="text-[10px] mt-0.5 font-medium">Grid</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Toggle Grid</p>
                <p className="text-xs text-muted-foreground">Show alignment guides</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Canvas Area */}
          <div className="flex-1 bg-slate-100/50 overflow-auto p-8 flex flex-col items-center justify-start relative">
            {/* Page Size Selector */}
            <div className="mb-4 flex items-center gap-3">
              <Select value={pageSize} onValueChange={(val: any) => setPageSize(val)}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a4-landscape">A4 — Landscape</SelectItem>
                  <SelectItem value="a4-portrait">A4 — Portrait</SelectItem>
                </SelectContent>
              </Select>
              <Badge variant="outline" className="text-xs">
                {width} × {height} px
              </Badge>
            </div>

            <div
              ref={containerRef}
              className={cn(
                "bg-white shadow-2xl relative transition-all",
                showGrid && "bg-grid-pattern"
              )}
              style={{
                width: width * scale,
                height: height * scale,
                transformOrigin: "center top",
                border: "2px solid #cbd5e1"
              }}
              onClick={() => setSelectedId(null)}
            >
              {elements.map((el) => (
                <Rnd
                  key={el.id}
                  size={{ width: el.width * scale, height: el.height * scale }}
                  position={{ x: el.x * scale, y: el.y * scale }}
                  onDragStop={(_: any, d: any) => handleUpdateElement(el.id, { x: d.x / scale, y: d.y / scale })}
                  onResizeStop={(_: any, __: any, ref: any, ___: any, position: any) => {
                    handleUpdateElement(el.id, {
                      width: parseInt(ref.style.width) / scale,
                      height: parseInt(ref.style.height) / scale,
                      x: position.x / scale,
                      y: position.y / scale,
                    });
                  }}
                  bounds="parent"
                  scale={scale}
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    setSelectedId(el.id);
                  }}
                  className={cn(
                    "group border-2 border-transparent hover:border-indigo-300 transition-colors",
                    selectedId === el.id && "border-indigo-600 z-10"
                  )}
                  disableDragging={el.locked}
                  enableResizing={!el.locked}
                >
                  <div
                    className="w-full h-full flex items-center overflow-hidden"
                    style={{
                      fontSize: (el.fontSize || 16) * scale,
                      fontFamily: el.fontFamily,
                      color: el.color,
                      backgroundColor: el.backgroundColor,
                      justifyContent: el.textAlign === "center" ? "center" : el.textAlign === "right" ? "flex-end" : "flex-start",
                      fontWeight: el.fontWeight,
                      opacity: el.opacity,
                    }}
                  >
                    {el.type === "image" ? (
                      el.src ? (
                        <img src={el.src} alt="" className="w-full h-full object-cover pointer-events-none" />
                      ) : (
                        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                          <ImageIcon className="w-8 h-8" />
                        </div>
                      )
                    ) : (
                      <span className="pointer-events-none px-2 w-full truncate">
                        {el.type === "dynamicText" && el.bindingField ? `{${el.bindingField}}` : el.text}
                      </span>
                    )}

                    {selectedId === el.id && !el.locked && (
                      <div
                        className="absolute -top-3 -right-3 z-50"
                        onMouseDown={(e) => e.stopPropagation()}
                        onTouchStart={(e) => e.stopPropagation()}
                      >
                        <button
                          className="bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            handleDeleteElement(el.id);
                          }}
                          type="button"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </Rnd>
              ))}
            </div>

            {/* Zoom Controls */}
            <div className="mt-4 flex items-center gap-2 bg-white border rounded-lg px-3 py-2 shadow-sm">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleZoomOut}
                className="h-8 w-8 p-0"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <button
                onClick={handleResetZoom}
                className="px-3 py-1 text-sm font-medium hover:bg-slate-100 rounded transition-colors min-w-[60px]"
              >
                {Math.round(scale * 100)}%
              </button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleZoomIn}
                className="h-8 w-8 p-0"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Right Properties Panel */}
          <div className="w-80 border-l bg-white flex flex-col">
            <div className="p-4 border-b bg-slate-50">
              <h3 className="font-semibold text-sm text-slate-900">Properties</h3>
            </div>

            <div className="p-4 flex-1 overflow-y-auto space-y-6">
              {selectedElement ? (
                <>
                  {/* Content Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-indigo-600"></div>
                      <h4 className="text-sm font-semibold text-slate-900">Content</h4>
                    </div>

                    {selectedElement.type === "staticText" && (
                      <div className="space-y-2">
                        <Label>Text Content</Label>
                        <Input
                          value={selectedElement.text}
                          onChange={(e) => handleUpdateElement(selectedElement.id, { text: e.target.value })}
                        />
                      </div>
                    )}
                  </div>

                  {/* Binding Section */}
                  {selectedElement.type === "dynamicText" && (
                    <>
                      <Separator />
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-600"></div>
                          <h4 className="text-sm font-semibold text-slate-900">Data Binding</h4>
                        </div>

                        <div className="space-y-2">
                          <Label>Excel Field</Label>
                          <Select
                            value={selectedElement.bindingField}
                            onValueChange={(val: string) => handleUpdateElement(selectedElement.id, { bindingField: val })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select field" />
                            </SelectTrigger>
                            <SelectContent>
                              {headers.length > 0 ? (
                                headers.map(h => (
                                  <SelectItem key={h} value={h}>{h}</SelectItem>
                                ))
                              ) : (
                                <SelectItem value="none" disabled>Upload Excel in Data Source step</SelectItem>
                              )}
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-muted-foreground">
                            This field will populate from your uploaded Excel
                          </p>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Typography Section */}
                  {(selectedElement.type === "staticText" || selectedElement.type === "dynamicText") && (
                    <>
                      <Separator />
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                          <h4 className="text-sm font-semibold text-slate-900">Typography</h4>
                        </div>

                        <div className="space-y-2">
                          <Label>Font Size</Label>
                          <Slider
                            min={8}
                            max={120}
                            step={1}
                            value={[selectedElement.fontSize || 16]}
                            onValueChange={(val: number[]) => handleUpdateElement(selectedElement.id, { fontSize: val[0] })}
                          />
                          <div className="text-right text-xs text-muted-foreground">{selectedElement.fontSize}px</div>
                        </div>

                        <div className="flex items-center justify-between gap-2">
                          <div className="flex border rounded-md overflow-hidden">
                            <Button
                              variant="ghost"
                              size="sm"
                              className={cn("h-8 px-2 rounded-none", selectedElement.textAlign === "left" && "bg-slate-100")}
                              onClick={() => handleUpdateElement(selectedElement.id, { textAlign: "left" })}
                            >
                              <AlignLeft className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={cn("h-8 px-2 rounded-none", selectedElement.textAlign === "center" && "bg-slate-100")}
                              onClick={() => handleUpdateElement(selectedElement.id, { textAlign: "center" })}
                            >
                              <AlignCenter className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={cn("h-8 px-2 rounded-none", selectedElement.textAlign === "right" && "bg-slate-100")}
                              onClick={() => handleUpdateElement(selectedElement.id, { textAlign: "right" })}
                            >
                              <AlignRight className="w-4 h-4" />
                            </Button>
                          </div>

                          <Button
                            variant="outline"
                            size="sm"
                            className={cn("h-8", selectedElement.fontWeight === "bold" && "bg-slate-100 border-slate-400")}
                            onClick={() => handleUpdateElement(selectedElement.id, { fontWeight: selectedElement.fontWeight === "bold" ? "normal" : "bold" })}
                          >
                            <Bold className="w-4 h-4" />
                          </Button>

                          <Popover>
                            <PopoverTrigger asChild>
                              <button
                                className="w-8 h-8 rounded border shadow-sm"
                                style={{ backgroundColor: selectedElement.color }}
                              />
                            </PopoverTrigger>
                            <PopoverContent className="w-64">
                              <div className="grid grid-cols-5 gap-2">
                                {["#000000", "#ffffff", "#ef4444", "#f97316", "#f59e0b", "#84cc16", "#10b981", "#06b6d4", "#3b82f6", "#6366f1", "#8b5cf6", "#d946ef", "#f43f5e", "#64748b", "#334155"].map(c => (
                                  <button
                                    key={c}
                                    className="w-8 h-8 rounded-full border shadow-sm hover:scale-110 transition-transform"
                                    style={{ backgroundColor: c }}
                                    onClick={() => handleUpdateElement(selectedElement.id, { color: c })}
                                  />
                                ))}
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Layout Section */}
                  <Separator />
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-purple-600"></div>
                      <h4 className="text-sm font-semibold text-slate-900">Layout</h4>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>X Position</Label>
                        <Input
                          type="number"
                          value={Math.round(selectedElement.x)}
                          onChange={(e) => handleUpdateElement(selectedElement.id, { x: Number(e.target.value) })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Y Position</Label>
                        <Input
                          type="number"
                          value={Math.round(selectedElement.y)}
                          onChange={(e) => handleUpdateElement(selectedElement.id, { y: Number(e.target.value) })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Width</Label>
                        <Input
                          type="number"
                          value={Math.round(selectedElement.width)}
                          onChange={(e) => handleUpdateElement(selectedElement.id, { width: Number(e.target.value) })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Height</Label>
                        <Input
                          type="number"
                          value={Math.round(selectedElement.height)}
                          onChange={(e) => handleUpdateElement(selectedElement.id, { height: Number(e.target.value) })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Image Upload Section */}
                  {selectedElement.type === "image" && (
                    <>
                      <Separator />
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                          <h4 className="text-sm font-semibold text-slate-900">Image Source</h4>
                        </div>

                        <div className="space-y-2">
                          <Label>Upload Image</Label>
                          <input
                            type="file"
                            accept="image/png,image/jpeg,image/jpg,image/webp"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  const base64 = event.target?.result as string;
                                  handleUpdateElement(selectedElement.id, { src: base64 });
                                  toast.success("Image uploaded successfully");
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                          />
                          <p className="text-xs text-muted-foreground">Upload PNG, JPG, or WebP</p>
                        </div>

                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                          </div>
                          <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-muted-foreground">Or</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Image URL</Label>
                          <Input
                            placeholder="https://..."
                            value={selectedElement.src || ""}
                            onChange={(e) => handleUpdateElement(selectedElement.id, { src: e.target.value })}
                          />
                          <p className="text-xs text-muted-foreground">Paste a public image URL</p>
                        </div>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 p-6">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
                    <Move className="w-8 h-8 text-slate-400" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-slate-900">No Element Selected</h4>
                    <p className="text-sm text-slate-600">
                      Click on any element on the canvas to edit its properties
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddElement("staticText", "Static Text")}
                  >
                    Add Your First Element
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

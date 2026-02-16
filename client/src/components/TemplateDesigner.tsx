// Forced IDE refresh 
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
  Bold
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { TopToolbar } from "@/components/TopToolbar";

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
  scale = 1,
  headers = []
}: TemplateDesignerProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedElement = elements.find(el => el.id === selectedId);

  const handleAddElement = (type: TemplateElement["type"]) => {
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
  };

  const handleUpdateElement = (id: string, updates: Partial<TemplateElement>) => {
    onChange(elements.map(el => el.id === id ? { ...el, ...updates } : el));
  };

  const handleDeleteElement = (id: string) => {
    onChange(elements.filter(el => el.id !== id));
    if (selectedId === id) setSelectedId(null);
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
  };

  const handleLock = () => {
    if (!selectedElement) return;
    handleUpdateElement(selectedElement.id, { locked: !selectedElement.locked });
  };

  return (
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

      <div className="flex flex-1">
        {/* Left Toolbar */}
        <div className="w-16 border-r bg-slate-50 flex flex-col items-center py-4 gap-4">
          <TooltipButton icon={Type} label="Text" onClick={() => handleAddElement("staticText")} />
          <TooltipButton icon={Type} label="Dynamic Field" className="text-indigo-600" onClick={() => handleAddElement("dynamicText")} />
          <TooltipButton icon={ImageIcon} label="Image" onClick={() => handleAddElement("image")} />
          <TooltipButton icon={Square} label="Shape" onClick={() => handleAddElement("shape")} />
        </div>

        {/* Canvas Area */}
        <div className="flex-1 bg-slate-100/50 overflow-auto p-8 flex items-center justify-center relative">
          <div
            ref={containerRef}
            className="bg-white shadow-2xl relative transition-all"
            style={{
              width: width * scale,
              height: height * scale,
              transformOrigin: "center top"
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

                  {selectedId === el.id && (
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
        </div>

        {/* Right Properties Panel */}
        <div className="w-80 border-l bg-white flex flex-col">
          <div className="p-4 border-b bg-slate-50">
            <h3 className="font-semibold text-sm text-slate-900">Properties</h3>
          </div>

          <div className="p-4 flex-1 overflow-y-auto space-y-6">
            {selectedElement ? (
              <>
                {/* Common Position Controls */}
                <div className="space-y-4">
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
                  </div>
                </div>

                <Separator />

                {/* Text Controls */}
                {(selectedElement.type === "staticText" || selectedElement.type === "dynamicText") && (
                  <div className="space-y-4">
                    {selectedElement.type === "staticText" ? (
                      <div className="space-y-2">
                        <Label>Content</Label>
                        <Input
                          value={selectedElement.text}
                          onChange={(e) => handleUpdateElement(selectedElement.id, { text: e.target.value })}
                        />
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Label>Dynamic Field</Label>
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
                              <SelectItem value="none" disabled>Upload Excel first</SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground mt-1">Populates from uploaded Excel</p>
                      </div>
                    )}

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
                )}

                {/* Shape Controls */}
                {selectedElement.type === "shape" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Background Color</Label>
                      <div className="flex gap-2 items-center">
                        <Popover>
                          <PopoverTrigger asChild>
                            <button
                              className="w-full h-8 rounded border shadow-sm"
                              style={{ backgroundColor: selectedElement.backgroundColor }}
                            />
                          </PopoverTrigger>
                          <PopoverContent className="w-64">
                            <div className="grid grid-cols-5 gap-2">
                              {["#000000", "#ffffff", "#ef4444", "#f97316", "#f59e0b", "#84cc16", "#10b981", "#06b6d4", "#3b82f6", "#6366f1", "#8b5cf6", "#d946ef", "#f43f5e", "#64748b", "#334155", "transparent"].map(c => (
                                <button
                                  key={c}
                                  className="w-8 h-8 rounded-full border shadow-sm hover:scale-110 transition-transform relative"
                                  style={{ backgroundColor: c === "transparent" ? undefined : c }}
                                  onClick={() => handleUpdateElement(selectedElement.id, { backgroundColor: c })}
                                >
                                  {c === "transparent" && <div className="absolute inset-0 flex items-center justify-center text-[8px]">NONE</div>}
                                </button>
                              ))}
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </div>
                )}

                {/* Image Controls */}
                {selectedElement.type === "image" && (
                  <div className="space-y-4">
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
                )}

              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground space-y-2">
                <Move className="w-12 h-12 opacity-20" />
                <p>Select an element to edit properties</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TooltipButton({ icon: Icon, label, onClick, className }: { icon: any, label: string, onClick: () => void, className?: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-200 transition-colors text-slate-600",
        className
      )}
      title={label}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Type,
    Image as ImageIcon,
    Circle,
    Square,
    Star,
    Upload,
    Trash2,
    Copy,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Bold,
    Italic,
    Underline,
    QrCode
} from "lucide-react";
import { TemplateElement } from "@shared/schema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EnhancedDesignerProps {
    elements: TemplateElement[];
    onElementsChange: (elements: TemplateElement[]) => void;
    width: number;
    height: number;
    selectedId: string | null;
    onSelectElement: (id: string | null) => void;
}

const FONTS = [
    "Arial",
    "Times New Roman",
    "Georgia",
    "Verdana",
    "Courier New",
    "Comic Sans MS",
    "Impact",
    "Trebuchet MS"
];

const FONT_SIZES = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72];

export function EnhancedDesignerToolbar({
    elements,
    onElementsChange,
    selectedId,
    onSelectElement
}: EnhancedDesignerProps) {
    const [activeTab, setActiveTab] = useState("text");

    const selectedElement = elements.find(e => e.id === selectedId);

    const addElement = (type: TemplateElement['type'], defaults: Partial<TemplateElement> = {}) => {
        const newElement: TemplateElement = {
            id: `element-${Date.now()}`,
            type,
            x: 100,
            y: 100,
            width: type === 'staticText' ? 200 : 100,
            height: type === 'staticText' ? 50 : 100,
            zIndex: elements.length,
            ...defaults,
        };

        if (type === 'staticText' || type === 'dynamicText') {
            Object.assign(newElement, {
                text: type === 'staticText' ? 'New Text' : '{field}',
                fontSize: 16,
                fontFamily: 'Arial',
                color: '#000000',
                textAlign: 'left' as const,
                fontWeight: 'normal' as const,
            });
        } else if (type === 'shape') {
            Object.assign(newElement, {
                shapeType: 'rectangle' as const,
                fill: '#3b82f6',
                stroke: '#000000',
                strokeWidth: 2,
            });
        }

        onElementsChange([...elements, newElement]);
        onSelectElement(newElement.id);
    };

    const updateSelectedElement = (updates: Partial<TemplateElement>) => {
        if (!selectedId) return;
        onElementsChange(
            elements.map(el => el.id === selectedId ? { ...el, ...updates } : el)
        );
    };

    const deleteSelectedElement = () => {
        if (!selectedId) return;
        onElementsChange(elements.filter(el => el.id !== selectedId));
        onSelectElement(null);
    };

    const duplicateSelectedElement = () => {
        if (!selectedId) return;
        const element = elements.find(e => e.id === selectedId);
        if (!element) return;

        const newElement = {
            ...element,
            id: `element-${Date.now()}`,
            x: element.x + 20,
            y: element.y + 20,
        };

        onElementsChange([...elements, newElement]);
        onSelectElement(newElement.id);
    };

    return (
        <div className="w-80 bg-white border-l border-slate-200 overflow-y-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="text">Text</TabsTrigger>
                    <TabsTrigger value="elements">Elements</TabsTrigger>
                    <TabsTrigger value="properties">Properties</TabsTrigger>
                </TabsList>

                {/* TEXT TAB */}
                <TabsContent value="text" className="p-4 space-y-4">
                    <div className="space-y-2">
                        <Label className="text-sm font-semibold">Add Text</Label>
                        <Button
                            onClick={() => addElement('staticText')}
                            className="w-full justify-start"
                            variant="outline"
                        >
                            <Type className="w-4 h-4 mr-2" />
                            Add Static Text
                        </Button>
                        <Button
                            onClick={() => addElement('dynamicText', { bindingField: 'name' })}
                            className="w-full justify-start"
                            variant="outline"
                        >
                            <Type className="w-4 h-4 mr-2" />
                            Add Dynamic Field
                        </Button>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                        <Label className="text-sm font-semibold">Text Presets</Label>
                        <Button
                            onClick={() => addElement('staticText', {
                                text: 'CERTIFICATE',
                                fontSize: 48,
                                fontWeight: 'bold',
                                textAlign: 'center'
                            })}
                            className="w-full justify-start text-xs"
                            variant="ghost"
                        >
                            Title
                        </Button>
                        <Button
                            onClick={() => addElement('staticText', {
                                text: 'Of Appreciation',
                                fontSize: 24,
                                fontStyle: 'italic'
                            })}
                            className="w-full justify-start text-xs"
                            variant="ghost"
                        >
                            Subtitle
                        </Button>
                        <Button
                            onClick={() => addElement('staticText', {
                                text: 'This certificate is presented to',
                                fontSize: 14
                            })}
                            className="w-full justify-start text-xs"
                            variant="ghost"
                        >
                            Body Text
                        </Button>
                    </div>
                </TabsContent>

                {/* ELEMENTS TAB */}
                <TabsContent value="elements" className="p-4 space-y-4">
                    <div className="space-y-2">
                        <Label className="text-sm font-semibold">Shapes</Label>
                        <div className="grid grid-cols-3 gap-2">
                            <Button
                                onClick={() => addElement('shape', { shapeType: 'rectangle' })}
                                variant="outline"
                                className="h-16 flex-col"
                            >
                                <Square className="w-6 h-6 mb-1" />
                                <span className="text-xs">Rectangle</span>
                            </Button>
                            <Button
                                onClick={() => addElement('shape', { shapeType: 'circle' })}
                                variant="outline"
                                className="h-16 flex-col"
                            >
                                <Circle className="w-6 h-6 mb-1" />
                                <span className="text-xs">Circle</span>
                            </Button>
                            <Button
                                onClick={() => addElement('shape', { shapeType: 'star' })}
                                variant="outline"
                                className="h-16 flex-col"
                            >
                                <Star className="w-6 h-6 mb-1" />
                                <span className="text-xs">Star</span>
                            </Button>
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                        <Label className="text-sm font-semibold">Media</Label>
                        <Button
                            onClick={() => addElement('image', { src: 'https://via.placeholder.com/150' })}
                            className="w-full justify-start"
                            variant="outline"
                        >
                            <ImageIcon className="w-4 h-4 mr-2" />
                            Add Image
                        </Button>
                        <Button
                            onClick={() => addElement('image', { src: '/qr-placeholder.png' })}
                            className="w-full justify-start"
                            variant="outline"
                        >
                            <QrCode className="w-4 h-4 mr-2" />
                            Add QR Code
                        </Button>
                    </div>
                </TabsContent>

                {/* PROPERTIES TAB */}
                <TabsContent value="properties" className="p-4 space-y-4">
                    {!selectedElement ? (
                        <div className="text-center text-slate-500 py-8">
                            <p className="text-sm">Select an element to edit its properties</p>
                        </div>
                    ) : (
                        <>
                            {/* Element Actions */}
                            <div className="flex gap-2">
                                <Button
                                    onClick={duplicateSelectedElement}
                                    variant="outline"
                                    size="sm"
                                    className="flex-1"
                                >
                                    <Copy className="w-4 h-4 mr-1" />
                                    Duplicate
                                </Button>
                                <Button
                                    onClick={deleteSelectedElement}
                                    variant="destructive"
                                    size="sm"
                                    className="flex-1"
                                >
                                    <Trash2 className="w-4 h-4 mr-1" />
                                    Delete
                                </Button>
                            </div>

                            <Separator />

                            {/* Position & Size */}
                            <div className="space-y-3">
                                <Label className="text-sm font-semibold">Position & Size</Label>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <Label className="text-xs">X</Label>
                                        <Input
                                            type="number"
                                            value={selectedElement.x}
                                            onChange={(e) => updateSelectedElement({ x: Number(e.target.value) })}
                                            className="h-8"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-xs">Y</Label>
                                        <Input
                                            type="number"
                                            value={selectedElement.y}
                                            onChange={(e) => updateSelectedElement({ y: Number(e.target.value) })}
                                            className="h-8"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-xs">Width</Label>
                                        <Input
                                            type="number"
                                            value={selectedElement.width}
                                            onChange={(e) => updateSelectedElement({ width: Number(e.target.value) })}
                                            className="h-8"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-xs">Height</Label>
                                        <Input
                                            type="number"
                                            value={selectedElement.height}
                                            onChange={(e) => updateSelectedElement({ height: Number(e.target.value) })}
                                            className="h-8"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Text Properties */}
                            {(selectedElement.type === 'staticText' || selectedElement.type === 'dynamicText') && (
                                <>
                                    <Separator />
                                    <div className="space-y-3">
                                        <Label className="text-sm font-semibold">Text Properties</Label>

                                        {selectedElement.type === 'staticText' && (
                                            <div>
                                                <Label className="text-xs">Text Content</Label>
                                                <Input
                                                    value={selectedElement.text || ''}
                                                    onChange={(e) => updateSelectedElement({ text: e.target.value })}
                                                    className="h-8"
                                                />
                                            </div>
                                        )}

                                        <div>
                                            <Label className="text-xs">Font Family</Label>
                                            <Select
                                                value={selectedElement.fontFamily || 'Arial'}
                                                onValueChange={(value) => updateSelectedElement({ fontFamily: value })}
                                            >
                                                <SelectTrigger className="h-8">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {FONTS.map(font => (
                                                        <SelectItem key={font} value={font}>{font}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label className="text-xs">Font Size</Label>
                                            <Select
                                                value={String(selectedElement.fontSize || 16)}
                                                onValueChange={(value) => updateSelectedElement({ fontSize: Number(value) })}
                                            >
                                                <SelectTrigger className="h-8">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {FONT_SIZES.map(size => (
                                                        <SelectItem key={size} value={String(size)}>{size}px</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label className="text-xs">Color</Label>
                                            <Input
                                                type="color"
                                                value={selectedElement.color || '#000000'}
                                                onChange={(e) => updateSelectedElement({ color: e.target.value })}
                                                className="h-8"
                                            />
                                        </div>

                                        <div className="flex gap-2">
                                            <Button
                                                variant={selectedElement.fontWeight === 'bold' ? 'default' : 'outline'}
                                                size="sm"
                                                onClick={() => updateSelectedElement({
                                                    fontWeight: selectedElement.fontWeight === 'bold' ? 'normal' : 'bold'
                                                })}
                                            >
                                                <Bold className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant={selectedElement.fontStyle === 'italic' ? 'default' : 'outline'}
                                                size="sm"
                                                onClick={() => updateSelectedElement({
                                                    fontStyle: selectedElement.fontStyle === 'italic' ? 'normal' : 'italic'
                                                })}
                                            >
                                                <Italic className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant={selectedElement.textDecoration === 'underline' ? 'default' : 'outline'}
                                                size="sm"
                                                onClick={() => updateSelectedElement({
                                                    textDecoration: selectedElement.textDecoration === 'underline' ? 'none' : 'underline'
                                                })}
                                            >
                                                <Underline className="w-4 h-4" />
                                            </Button>
                                        </div>

                                        <div className="flex gap-2">
                                            <Button
                                                variant={selectedElement.textAlign === 'left' ? 'default' : 'outline'}
                                                size="sm"
                                                onClick={() => updateSelectedElement({ textAlign: 'left' })}
                                            >
                                                <AlignLeft className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant={selectedElement.textAlign === 'center' ? 'default' : 'outline'}
                                                size="sm"
                                                onClick={() => updateSelectedElement({ textAlign: 'center' })}
                                            >
                                                <AlignCenter className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant={selectedElement.textAlign === 'right' ? 'default' : 'outline'}
                                                size="sm"
                                                onClick={() => updateSelectedElement({ textAlign: 'right' })}
                                            >
                                                <AlignRight className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Shape Properties */}
                            {selectedElement.type === 'shape' && (
                                <>
                                    <Separator />
                                    <div className="space-y-3">
                                        <Label className="text-sm font-semibold">Shape Properties</Label>

                                        <div>
                                            <Label className="text-xs">Fill Color</Label>
                                            <Input
                                                type="color"
                                                value={selectedElement.fill || '#3b82f6'}
                                                onChange={(e) => updateSelectedElement({ fill: e.target.value })}
                                                className="h-8"
                                            />
                                        </div>

                                        <div>
                                            <Label className="text-xs">Border Color</Label>
                                            <Input
                                                type="color"
                                                value={selectedElement.stroke || '#000000'}
                                                onChange={(e) => updateSelectedElement({ stroke: e.target.value })}
                                                className="h-8"
                                            />
                                        </div>

                                        <div>
                                            <Label className="text-xs">Border Width</Label>
                                            <Input
                                                type="number"
                                                value={selectedElement.strokeWidth || 2}
                                                onChange={(e) => updateSelectedElement({ strokeWidth: Number(e.target.value) })}
                                                className="h-8"
                                                min="0"
                                                max="20"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Image Properties */}
                            {selectedElement.type === 'image' && (
                                <>
                                    <Separator />
                                    <div className="space-y-3">
                                        <Label className="text-sm font-semibold">Image Properties</Label>

                                        <div>
                                            <Label className="text-xs">Image URL</Label>
                                            <Input
                                                value={selectedElement.src || ''}
                                                onChange={(e) => updateSelectedElement({ src: e.target.value })}
                                                placeholder="https://example.com/image.png"
                                                className="h-8"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Layer Control */}
                            <Separator />
                            <div className="space-y-2">
                                <Label className="text-sm font-semibold">Layer</Label>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => updateSelectedElement({
                                            zIndex: Math.max(0, (selectedElement.zIndex || 0) - 1)
                                        })}
                                    >
                                        Send Back
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => updateSelectedElement({
                                            zIndex: (selectedElement.zIndex || 0) + 1
                                        })}
                                    >
                                        Bring Forward
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}

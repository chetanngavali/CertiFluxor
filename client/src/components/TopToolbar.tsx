import { Button } from "@/components/ui/button";
import {
    Edit3,
    Eraser,
    Layers,
    Crop,
    FlipHorizontal,
    FlipVertical,
    Sparkles,
    Move,
    MoreHorizontal,
    AlignVerticalJustifyCenter,
    AlignHorizontalJustifyCenter,
    ArrowUp,
    ArrowDown,
    Palette,
    Image as ImageIcon,
    Copy,
    Trash2,
    Lock,
    Unlock
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TemplateElement } from "@shared/schema";
import { Separator } from "@/components/ui/separator";

interface TopToolbarProps {
    selectedElement: TemplateElement | null;
    elements: TemplateElement[];
    onUpdateElement: (updates: Partial<TemplateElement>) => void;
    onDuplicate: () => void;
    onDelete: () => void;
    onLock: () => void;
    canvasWidth: number;
    canvasHeight: number;
}

export function TopToolbar({
    selectedElement,
    elements,
    onUpdateElement,
    onDuplicate,
    onDelete,
    onLock,
    canvasWidth,
    canvasHeight
}: TopToolbarProps) {

    const handleFlipHorizontal = () => {
        if (!selectedElement) return;
        // Toggle horizontal flip by rotating 180 on Y axis or using scale
        const currentScale = selectedElement.scaleX || 1;
        onUpdateElement({ scaleX: currentScale * -1 });
    };

    const handleFlipVertical = () => {
        if (!selectedElement) return;
        const currentScale = selectedElement.scaleY || 1;
        onUpdateElement({ scaleY: currentScale * -1 });
    };

    const handleCrop = () => {
        if (!selectedElement || selectedElement.type !== 'image') return;
        // Enable crop mode
        onUpdateElement({ cropMode: true });
    };

    const handleAlignCenter = () => {
        if (!selectedElement) return;
        onUpdateElement({
            x: (canvasWidth - selectedElement.width) / 2,
            y: (canvasHeight - selectedElement.height) / 2
        });
    };

    const handleAlignHorizontalCenter = () => {
        if (!selectedElement) return;
        onUpdateElement({
            x: (canvasWidth - selectedElement.width) / 2
        });
    };

    const handleAlignVerticalCenter = () => {
        if (!selectedElement) return;
        onUpdateElement({
            y: (canvasHeight - selectedElement.height) / 2
        });
    };

    const handleBringToFront = () => {
        if (!selectedElement) return;
        const maxZIndex = Math.max(...elements.map(el => el.zIndex || 0));
        onUpdateElement({ zIndex: maxZIndex + 1 });
    };

    const handleSendToBack = () => {
        if (!selectedElement) return;
        const minZIndex = Math.min(...elements.map(el => el.zIndex || 0));
        onUpdateElement({ zIndex: minZIndex - 1 });
    };

    const handleBringForward = () => {
        if (!selectedElement) return;
        onUpdateElement({ zIndex: (selectedElement.zIndex || 0) + 1 });
    };

    const handleSendBackward = () => {
        if (!selectedElement) return;
        onUpdateElement({ zIndex: (selectedElement.zIndex || 0) - 1 });
    };

    const disabled = !selectedElement;

    return (
        <div className="h-14 bg-slate-900 border-b border-slate-700 flex items-center px-4 gap-2">
            {/* Edit Button */}
            <Button
                variant="ghost"
                size="sm"
                disabled={disabled}
                className="text-white hover:bg-slate-800 gap-2"
            >
                <Edit3 className="w-4 h-4" />
                Edit
            </Button>

            <Separator orientation="vertical" className="h-6 bg-slate-700" />

            {/* BG Remover - Only for images */}
            <Button
                variant="ghost"
                size="sm"
                disabled={disabled || selectedElement?.type !== 'image'}
                className="text-white hover:bg-slate-800 gap-2"
                title="Background remover (Pro feature)"
            >
                <ImageIcon className="w-4 h-4" />
                BG Remover
            </Button>

            {/* Eraser */}
            <Button
                variant="ghost"
                size="sm"
                disabled={disabled}
                onClick={onDelete}
                className="text-white hover:bg-slate-800 gap-2"
            >
                <Eraser className="w-4 h-4" />
                Eraser
            </Button>

            <Separator orientation="vertical" className="h-6 bg-slate-700" />

            {/* Color Palette - For shapes and text */}
            {selectedElement?.type !== 'image' && (
                <>
                    <div className="flex gap-1">
                        <input
                            type="color"
                            value={selectedElement?.fill || selectedElement?.color || '#000000'}
                            onChange={(e) => {
                                if (selectedElement?.type === 'shape') {
                                    onUpdateElement({ fill: e.target.value });
                                } else {
                                    onUpdateElement({ color: e.target.value });
                                }
                            }}
                            disabled={disabled}
                            className="w-8 h-8 rounded cursor-pointer border-2 border-slate-600"
                            title="Fill color"
                        />
                        {selectedElement?.type === 'shape' && (
                            <input
                                type="color"
                                value={selectedElement?.stroke || '#000000'}
                                onChange={(e) => onUpdateElement({ stroke: e.target.value })}
                                disabled={disabled}
                                className="w-8 h-8 rounded cursor-pointer border-2 border-slate-600"
                                title="Border color"
                            />
                        )}
                    </div>
                    <Separator orientation="vertical" className="h-6 bg-slate-700" />
                </>
            )}

            {/* Arrange Menu */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        disabled={disabled}
                        className="text-white hover:bg-slate-800 gap-2"
                    >
                        <Layers className="w-4 h-4" />
                        Arrange
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                    <DropdownMenuItem onClick={handleBringToFront}>
                        <ArrowUp className="w-4 h-4 mr-2" />
                        Bring to Front
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleBringForward}>
                        <ArrowUp className="w-4 h-4 mr-2" />
                        Bring Forward
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSendBackward}>
                        <ArrowDown className="w-4 h-4 mr-2" />
                        Send Backward
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSendToBack}>
                        <ArrowDown className="w-4 h-4 mr-2" />
                        Send to Back
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleAlignHorizontalCenter}>
                        <AlignHorizontalJustifyCenter className="w-4 h-4 mr-2" />
                        Center Horizontally
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleAlignVerticalCenter}>
                        <AlignVerticalJustifyCenter className="w-4 h-4 mr-2" />
                        Center Vertically
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleAlignCenter}>
                        <Move className="w-4 h-4 mr-2" />
                        Center on Page
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Crop - Only for images */}
            <Button
                variant="ghost"
                size="sm"
                disabled={disabled || selectedElement?.type !== 'image'}
                onClick={handleCrop}
                className="text-white hover:bg-slate-800 gap-2"
            >
                <Crop className="w-4 h-4" />
                Crop
            </Button>

            {/* Flip Menu */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        disabled={disabled}
                        className="text-white hover:bg-slate-800 gap-2"
                    >
                        <FlipHorizontal className="w-4 h-4" />
                        Flip
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={handleFlipHorizontal}>
                        <FlipHorizontal className="w-4 h-4 mr-2" />
                        Flip Horizontal
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleFlipVertical}>
                        <FlipVertical className="w-4 h-4 mr-2" />
                        Flip Vertical
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Separator orientation="vertical" className="h-6 bg-slate-700" />

            {/* Animate - Placeholder */}
            <Button
                variant="ghost"
                size="sm"
                disabled={disabled}
                className="text-white hover:bg-slate-800 gap-2"
                title="Animation (Coming soon)"
            >
                <Sparkles className="w-4 h-4" />
                Animate
            </Button>

            {/* Position */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        disabled={disabled}
                        className="text-white hover:bg-slate-800 gap-2"
                    >
                        <Move className="w-4 h-4" />
                        Position
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <div className="p-3 space-y-3">
                        <div className="text-sm font-semibold">Position</div>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="text-xs text-slate-500">X</label>
                                <input
                                    type="number"
                                    value={Math.round(selectedElement?.x || 0)}
                                    onChange={(e) => onUpdateElement({ x: Number(e.target.value) })}
                                    className="w-full px-2 py-1 text-sm border rounded"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-slate-500">Y</label>
                                <input
                                    type="number"
                                    value={Math.round(selectedElement?.y || 0)}
                                    onChange={(e) => onUpdateElement({ y: Number(e.target.value) })}
                                    className="w-full px-2 py-1 text-sm border rounded"
                                />
                            </div>
                        </div>
                        <div className="text-sm font-semibold">Size</div>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="text-xs text-slate-500">Width</label>
                                <input
                                    type="number"
                                    value={Math.round(selectedElement?.width || 0)}
                                    onChange={(e) => onUpdateElement({ width: Number(e.target.value) })}
                                    className="w-full px-2 py-1 text-sm border rounded"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-slate-500">Height</label>
                                <input
                                    type="number"
                                    value={Math.round(selectedElement?.height || 0)}
                                    onChange={(e) => onUpdateElement({ height: Number(e.target.value) })}
                                    className="w-full px-2 py-1 text-sm border rounded"
                                />
                            </div>
                        </div>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>

            <Separator orientation="vertical" className="h-6 bg-slate-700" />

            {/* More Options */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        disabled={disabled}
                        className="text-white hover:bg-slate-800"
                    >
                        <MoreHorizontal className="w-4 h-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={onDuplicate}>
                        <Copy className="w-4 h-4 mr-2" />
                        Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onLock}>
                        {selectedElement?.locked ? (
                            <>
                                <Unlock className="w-4 h-4 mr-2" />
                                Unlock
                            </>
                        ) : (
                            <>
                                <Lock className="w-4 h-4 mr-2" />
                                Lock
                            </>
                        )}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onDelete} className="text-red-600">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Right side - Element info */}
            <div className="ml-auto text-xs text-slate-400">
                {selectedElement ? (
                    <span className="flex items-center gap-2">
                        <span className="capitalize">{selectedElement.type}</span>
                        <span className="text-slate-600">•</span>
                        <span>{Math.round(selectedElement.width)} × {Math.round(selectedElement.height)}</span>
                    </span>
                ) : (
                    <span>No element selected</span>
                )}
            </div>
        </div>
    );
}

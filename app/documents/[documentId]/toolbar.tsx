'use client'

import { useEditorStore } from '@/app/store/use-editor-store';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useEditorState } from '@tiptap/react';
import { LucideIcon, Undo2, Redo2, PrinterIcon, SpellCheckIcon, Bold, Italic, Underline, MessageSquarePlusIcon, ListTodoIcon, RemoveFormattingIcon, ChevronDownIcon, HighlighterIcon, PaintBucketIcon, CheckIcon, CirclePlusIcon, PipetteIcon, Link2Icon, ImageIcon, UploadIcon, GlobeIcon, AlignLeftIcon, AlignCenterIcon, AlignRightIcon, AlignJustifyIcon, MinusIcon, PlusIcon } from 'lucide-react';
import { type Level } from '@tiptap/extension-heading'
import { useState } from 'react';
interface ToolbarButtonProps {
    icon: LucideIcon,
    onClick?: () => void,
    isActive?: boolean,
    disabled?: boolean
}

const ToolbarButton = ({ icon: Icon, onClick, isActive, disabled }: ToolbarButtonProps) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "text-sm h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
                isActive && "bg-neutral-200/80",
                disabled && "opacity-50 pointer-events-none"
            )}
        >
            <Icon className='size-4' />
        </button>
    )
}

const fonts = [
    { label: "Arial", value: "Arial", className: "font-arial" },
    { label: "Times New Roman", value: "Times New Roman", className: "font-times" },
    { label: "Courier New", value: "Courier New", className: "font-courier" },
    { label: "Georgia", value: "Georgia", className: "font-georgia" },
    { label: "Verdana", value: "Verdana", className: "font-verdana" },
    { label: "Trebuchet MS", value: "Trebuchet MS", className: "font-trebuchet" },
    { label: "Comic Sans MS", value: "Comic Sans MS", className: "font-comic" },
    { label: "Impact", value: "Impact", className: "font-impact" },
];

const FontFamilyButton = () => {
    const { editor } = useEditorStore();

    const currentFont = useEditorState({
        editor,
        selector: ({ editor }) =>
            editor?.getAttributes("textStyle").fontFamily ?? "Arial",
    });

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="h-7 w-32 shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                <span className="truncate">{currentFont}</span>
                <ChevronDownIcon className="ml-2 size-4 shrink-0" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1 w-40">
                {fonts.map(({ label, value, className }) => (
                    <DropdownMenuItem
                        key={value}
                        onClick={() => editor?.chain().focus().setFontFamily(value).run()}
                        className={cn(
                            "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                            currentFont === value && "bg-neutral-200/80",
                            className
                        )}
                    >
                        <span className="text-sm">{label}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const headings = [
    { label: "Normal text", value: 0, fontSize: "16px" },
    { label: "Heading 1", value: 1, fontSize: "32px" },
    { label: "Heading 2", value: 2, fontSize: "24px" },
    { label: "Heading 3", value: 3, fontSize: "20px" },
    { label: "Heading 4", value: 4, fontSize: "18px" },
    { label: "Heading 5", value: 5, fontSize: "16px" },
];

const HeadingLevelButton = () => {
    const { editor } = useEditorStore();

    const currentLevel = useEditorState({
        editor,
        selector: ({ editor }) => {
            for (const { value } of headings) {
                if (value !== 0 && editor?.isActive("heading", { level: value })) {
                    return value;
                }
            }
            return 0;
        },
    });

    const currentLabel = headings.find(({ value }) => value === currentLevel)?.label ?? "Normal text";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="h-7 w-32 shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                <span className="truncate">{currentLabel}</span>
                <ChevronDownIcon className="ml-2 size-4 shrink-0" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1 w-auto min-w-(--anchor-width)">
                {headings.map(({ label, value, fontSize }) => (
                    <DropdownMenuItem
                        key={value}
                        onClick={() => {
                            if (value === 0) {
                                editor?.chain().focus().setParagraph().run();
                            } else {
                                editor?.chain().focus().setHeading({ level: value as Level }).run();
                            }
                        }}
                        className={cn(
                            "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80 whitespace-nowrap",
                            currentLevel === value && "bg-neutral-200/80"
                        )}
                        style={{ fontSize }}
                    >
                        {label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const fontSizes = ["8", "9", "10", "11", "12", "14", "18", "24", "30", "36", "48", "60", "72", "96"];

const FontSizeButton = () => {
    const { editor } = useEditorStore();

    const currentFontSize = useEditorState({
        editor,
        selector: ({ editor }) => {
            const fontSize = editor?.getAttributes("textStyle").fontSize as string | undefined;
            return fontSize ? fontSize.replace("px", "") : "16";
        },
    }) ?? "16";

    const [inputValue, setInputValue] = useState<string | null>(null);
    const [open, setOpen] = useState(false);

    const applyFontSize = (value: string) => {
        const size = parseInt(value, 10);
        setInputValue(null);
        setOpen(false);
        if (!isNaN(size) && size > 0) {
            editor?.chain().focus().setFontSize(`${size}px`).run();
        }
    };

    const stepFontSize = (delta: number) => {
        const size = parseInt(currentFontSize, 10) + delta;
        if (size > 0) {
            editor?.chain().focus().setFontSize(`${size}px`).run();
        }
    };

    return (
        <div className="relative flex shrink-0 items-center gap-x-0.5">
            <button
                title="Decrease font size"
                onClick={() => stepFontSize(-1)}
                className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
            >
                <MinusIcon className="size-4" />
            </button>
            <input
                title="Font size"
                value={inputValue ?? currentFontSize}
                onFocus={(e) => {
                    setInputValue(currentFontSize);
                    setOpen(true);
                    e.target.select();
                }}
                onChange={(e) => setInputValue(e.target.value)}
                onBlur={() => {
                    setInputValue(null);
                    setOpen(false);
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        applyFontSize(e.currentTarget.value);
                    }
                    if (e.key === "Escape") {
                        setInputValue(null);
                        setOpen(false);
                        e.currentTarget.blur();
                    }
                }}
                className="h-7 w-10 shrink-0 text-sm text-center border border-neutral-400 rounded-sm bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
                title="Increase font size"
                onClick={() => stepFontSize(1)}
                className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
            >
                <PlusIcon className="size-4" />
            </button>
            {open && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 z-50 w-14 max-h-[70vh] overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden rounded-lg bg-white py-1.5 shadow-[0_2px_10px_rgba(0,0,0,0.15)]">
                    {fontSizes.map((size) => (
                        <button
                            key={size}
                            onMouseDown={(e) => {
                                e.preventDefault();
                                applyFontSize(size);
                            }}
                            className={cn(
                                "w-full py-1 text-sm text-center hover:bg-neutral-100",
                                currentFontSize === size && "bg-neutral-200/80"
                            )}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

const highlightColors = [
    "#000000", "#434343", "#666666", "#999999", "#b7b7b7", "#cccccc", "#d9d9d9", "#efefef", "#f3f3f3", "#ffffff",
    "#980000", "#ff0000", "#ff9900", "#ffff00", "#00ff00", "#00ffff", "#4a86e8", "#0000ff", "#9900ff", "#ff00ff",
    "#e6b8af", "#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#c9daf8", "#cfe2f3", "#d9d2e9", "#ead1dc",
    "#dd7e6b", "#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#a4c2f4", "#9fc5e8", "#b4a7d6", "#d5a6bd",
    "#cc4125", "#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6d9eeb", "#6fa8dc", "#8e7cc3", "#c27ba0",
    "#a61c00", "#cc0000", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3c78d8", "#3d85c6", "#674ea7", "#a64d79",
    "#85200c", "#990000", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#1155cc", "#0b5394", "#351c75", "#741b47",
    "#5b0f00", "#660000", "#783f04", "#7f6000", "#274e13", "#0c343d", "#1c4587", "#073763", "#20124d", "#4c1130",
];

const isLightColor = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return 0.299 * r + 0.587 * g + 0.114 * b > 150;
};

const TextColorButton = () => {
    const { editor } = useEditorStore();
    const [open, setOpen] = useState(false);

    const currentColor = useEditorState({
        editor,
        selector: ({ editor }) =>
            (editor?.getAttributes("textStyle").color as string | undefined) ?? null,
    });

    const applyColor = (color: string) => {
        editor?.chain().focus().setColor(color).run();
        setOpen(false);
    };

    const pickWithEyeDropper = async () => {
        const EyeDropperCtor = (window as unknown as {
            EyeDropper?: new () => { open(): Promise<{ sRGBHex: string }> };
        }).EyeDropper;
        if (!EyeDropperCtor) return;
        setOpen(false);
        try {
            const { sRGBHex } = await new EyeDropperCtor().open();
            editor?.chain().focus().setColor(sRGBHex).run();
        } catch {
            // user cancelled the eyedropper
        }
    };

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center gap-y-0.5 rounded-sm hover:bg-neutral-200/80 px-1">
                <span className="size-4 flex items-center justify-center text-sm font-medium leading-none">A</span>
                <div
                    className="h-1 w-4 rounded-xs border border-neutral-300"
                    style={{ backgroundColor: currentColor ?? "#000000" }}
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-3 w-auto min-w-0">
                <button
                    onClick={() => {
                        editor?.chain().focus().unsetColor().run();
                        setOpen(false);
                    }}
                    className="w-full flex items-center gap-x-3 px-2 py-1.5 mb-2 rounded-sm hover:bg-neutral-200/80 text-sm"
                >
                    <PaintBucketIcon className="size-4" />
                    None
                </button>
                <div className="grid grid-cols-10 gap-1">
                    {highlightColors.map((color) => (
                        <button
                            key={color}
                            onClick={() => applyColor(color)}
                            title={color}
                            className="size-5 rounded-full border border-neutral-300 flex items-center justify-center hover:ring-2 hover:ring-neutral-400 hover:ring-offset-1"
                            style={{ backgroundColor: color }}
                        >
                            {currentColor?.toLowerCase() === color && (
                                <CheckIcon className={cn("size-3.5", isLightColor(color) ? "text-black" : "text-white")} />
                            )}
                        </button>
                    ))}
                </div>
                <div className="mt-3 px-1 text-xs font-medium tracking-widest text-neutral-600">
                    Custom
                </div>
                <div className="mt-1.5 flex items-center gap-x-2 px-1 pb-1">
                    <label
                        title="custom color"
                        className="relative size-6 flex items-center justify-center rounded-full hover:bg-neutral-200/80 cursor-pointer"
                    >
                        <CirclePlusIcon className="size-4.5" />
                        <input
                            type="color"
                            value={currentColor ?? "#000000"}
                            onChange={(e) => editor?.chain().focus().setColor(e.target.value).run()}
                            className="absolute inset-0 size-full opacity-0 cursor-pointer"
                        />
                    </label>
                    <button
                        onClick={pickWithEyeDropper}
                        title="Pick color from screen"
                        className="size-6 flex items-center justify-center rounded-full hover:bg-neutral-200/80"
                    >
                        <PipetteIcon className="size-4" />
                    </button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const HighlightColorButton = () => {
    const { editor } = useEditorStore();
    const [open, setOpen] = useState(false);

    const currentColor = useEditorState({
        editor,
        selector: ({ editor }) =>
            (editor?.getAttributes("highlight").color as string | undefined) ?? null,
    });

    const applyColor = (color: string) => {
        editor?.chain().focus().setHighlight({ color }).run();
        setOpen(false);
    };

    const pickWithEyeDropper = async () => {
        const EyeDropperCtor = (window as unknown as {
            EyeDropper?: new () => { open(): Promise<{ sRGBHex: string }> };
        }).EyeDropper;
        if (!EyeDropperCtor) return;
        setOpen(false);
        try {
            const { sRGBHex } = await new EyeDropperCtor().open();
            editor?.chain().focus().setHighlight({ color: sRGBHex }).run();
        } catch {
            // user cancelled the eyedropper
        }
    };

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center gap-y-0.5 rounded-sm hover:bg-neutral-200/80 px-1">
                <HighlighterIcon className="size-4" />
                <div
                    className="h-1 w-4 rounded-xs border border-neutral-300"
                    style={{ backgroundColor: currentColor ?? "#ffff00" }}
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-3 w-auto min-w-0">
                <button
                    onClick={() => {
                        editor?.chain().focus().unsetHighlight().run();
                        setOpen(false);
                    }}
                    className="w-full flex items-center gap-x-3 px-2 py-1.5 mb-2 rounded-sm hover:bg-neutral-200/80 text-sm"
                >
                    <PaintBucketIcon className="size-4" />
                    None
                </button>
                <div className="grid grid-cols-10 gap-1">
                    {highlightColors.map((color) => (
                        <button
                            key={color}
                            onClick={() => applyColor(color)}
                            title={color}
                            className="size-5 rounded-full border border-neutral-300 flex items-center justify-center hover:ring-2 hover:ring-neutral-400 hover:ring-offset-1"
                            style={{ backgroundColor: color }}
                        >
                            {currentColor?.toLowerCase() === color && (
                                <CheckIcon className={cn("size-3.5", isLightColor(color) ? "text-black" : "text-white")} />
                            )}
                        </button>
                    ))}
                </div>
                <div className="mt-3 px-1 text-xs font-medium tracking-widest text-neutral-600">
                    Custom
                </div>
                <div className="mt-1.5 flex items-center gap-x-2 px-1 pb-1">
                    <label
                        title="custom color"
                        className="relative size-6 flex items-center justify-center rounded-full hover:bg-neutral-200/80 cursor-pointer"
                    >
                        <CirclePlusIcon className="size-4.5" />
                        <input
                            type="color"
                            value={currentColor ?? "#ffff00"}
                            onChange={(e) => editor?.chain().focus().setHighlight({ color: e.target.value }).run()}
                            className="absolute inset-0 size-full opacity-0 cursor-pointer"
                        />
                    </label>
                    <button
                        onClick={pickWithEyeDropper}
                        title="Pick color from screen"
                        className="size-6 flex items-center justify-center rounded-full hover:bg-neutral-200/80"
                    >
                        <PipetteIcon className="size-4" />
                    </button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const LinkButton = () => {
    const { editor } = useEditorStore();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    const isActive = useEditorState({
        editor,
        selector: ({ editor }) => editor?.isActive("link") ?? false,
    });

    const onOpenChange = (open: boolean) => {
        if (open) {
            setValue(editor?.getAttributes("link").href ?? "");
        }
        setOpen(open);
    };

    const applyLink = () => {
        if (value.trim()) {
            editor?.chain().focus().extendMarkRange("link").setLink({ href: value.trim() }).run();
        } else {
            editor?.chain().focus().extendMarkRange("link").unsetLink().run();
        }
        setOpen(false);
    };

    const removeLink = () => {
        editor?.chain().focus().extendMarkRange("link").unsetLink().run();
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={onOpenChange}>
            <PopoverTrigger
                title="Insert link"
                className={cn(
                    "h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
                    isActive && "bg-neutral-200/80"
                )}
            >
                <Link2Icon className="size-4" />
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2.5 flex items-center gap-x-2">
                <Input
                    placeholder="https://example.com"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            applyLink();
                        }
                    }}
                    className="h-8 w-56"
                />
                <Button size="sm" onClick={applyLink}>Apply</Button>
                {isActive && (
                    <Button size="sm" variant="outline" onClick={removeLink}>Remove</Button>
                )}
            </PopoverContent>
        </Popover>
    );
};

const ImageButton = () => {
    const { editor } = useEditorStore();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const insertImage = (src: string) => {
        editor?.chain().focus().setImage({ src }).run();
    };

    const onUpload = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = () => {
            const file = input.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => insertImage(reader.result as string);
            reader.readAsDataURL(file);
        };
        input.click();
    };

    const handleUrlSubmit = () => {
        if (imageUrl.trim()) {
            insertImage(imageUrl.trim());
        }
        setImageUrl("");
        setIsDialogOpen(false);
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger
                    title="Insert image"
                    className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
                >
                    <ImageIcon className="size-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-1 w-auto min-w-0">
                    <DropdownMenuItem
                        onClick={onUpload}
                        className="flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80 text-sm whitespace-nowrap"
                    >
                        <UploadIcon className="size-4" />
                        Upload from computer
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => {
                            setImageUrl("");
                            setIsDialogOpen(true);
                        }}
                        className="flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80 text-sm whitespace-nowrap"
                    >
                        <GlobeIcon className="size-4" />
                        By URL
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Insert image by URL</DialogTitle>
                    </DialogHeader>
                    <Input
                        placeholder="https://example.com/image.png"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                handleUrlSubmit();
                            }
                        }}
                    />
                    <DialogFooter>
                        <Button onClick={handleUrlSubmit} disabled={!imageUrl.trim()}>Insert</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

const alignments = [
    { label: "Align left", value: "left", icon: AlignLeftIcon },
    { label: "Align center", value: "center", icon: AlignCenterIcon },
    { label: "Align right", value: "right", icon: AlignRightIcon },
    { label: "Justify", value: "justify", icon: AlignJustifyIcon },
];

const AlignButton = () => {
    const { editor } = useEditorStore();

    const currentAlignment = useEditorState({
        editor,
        selector: ({ editor }) =>
            alignments.find(({ value }) => editor?.isActive({ textAlign: value }))?.value ?? "left",
    });

    const CurrentIcon = alignments.find(({ value }) => value === currentAlignment)?.icon ?? AlignLeftIcon;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                title="Align"
                className="h-7 min-w-7 shrink-0 px-1 flex items-center justify-center gap-x-0.5 rounded-sm hover:bg-neutral-200/80"
            >
                <CurrentIcon className="size-4" />
                <ChevronDownIcon className="size-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-row items-center gap-x-0.5 w-auto min-w-0">
                {alignments.map(({ label, value, icon: Icon }) => (
                    <DropdownMenuItem
                        key={value}
                        title={label}
                        onClick={() => editor?.chain().focus().setTextAlign(value).run()}
                        className={cn(
                            "size-7 p-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
                            currentAlignment === value && "bg-neutral-200/80"
                        )}
                    >
                        <Icon className="size-4" />
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const Toolbar = () => {
    const { editor } = useEditorStore();

    const editorState = useEditorState({
        editor,
        selector: ({ editor }) => ({
            canUndo: editor?.can().undo() ?? false,
            canRedo: editor?.can().redo() ?? false,
            isBold: editor?.isActive("bold") ?? false,
            isItalic: editor?.isActive("italic") ?? false,
            isUnderline: editor?.isActive("underline") ?? false,
            isTaskList: editor?.isActive("taskList") ?? false,
            isComment: editor?.isActive("liveblocksCommentMark") ?? false
        }),
    });

    const sections = [
        [
            {
                label: "Undo",
                icon: Undo2,
                onClick: () => editor?.chain().focus().undo().run(),
                disabled: !editorState?.canUndo,
            },
            {
                label: "Redo",
                icon: Redo2,
                onClick: () => editor?.chain().focus().redo().run(),
                disabled: !editorState?.canRedo,
            },
            {
                label: "Print",
                icon: PrinterIcon,
                onClick: () => window.print(),
            },
            {
                label: "Spell Check",
                icon: SpellCheckIcon,
                onClick: () => {
                    const current = editor?.view.dom.getAttribute("spellcheck");
                    editor?.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "false");
                },
            }
        ],
        [
            {
                label: "Bold",
                icon: Bold,
                isActive: editorState?.isBold,
                onClick: () => editor?.chain().focus().toggleBold().run(),
            },
            {
                label: "Italic",
                icon: Italic,
                isActive: editorState?.isItalic,
                onClick: () => editor?.chain().focus().toggleItalic().run(),
            },
            {
                label: "Underline",
                icon: Underline,
                isActive: editorState?.isUnderline,
                onClick: () => editor?.chain().focus().toggleUnderline().run(),
            },
        ],
        [
            {
                label: "List Todo",
                icon: ListTodoIcon,
                isActive: editorState?.isTaskList,
                onClick: () => editor?.chain().focus().toggleTaskList().run(),
            },
            {
                label: "Remove Formatting",
                icon: RemoveFormattingIcon,
                onClick: () => editor?.chain().focus().unsetAllMarks().run(),
            },
            {
                label: "Comment",
                icon: MessageSquarePlusIcon,
                isActive: editorState?.isComment,
                onClick: () => editor?.chain().focus().addPendingComment(),
            },
        ]
    ]
    return (
        <div className="bg-[#f0f4f9] min-h-10 rounded-2xl flex items-center gap-x-0.5 px-4 max-lg:flex-wrap max-lg:justify-center max-lg:gap-y-1 max-lg:px-2 max-lg:py-1.5">
            {sections[0].map(item => (
                <ToolbarButton key={item.label} {...item} />
            ))}
            <Separator orientation='vertical' className="h-6 mx-0.5 shrink-0 data-vertical:self-center bg-neutral-300" />
            <FontFamilyButton />
            <Separator orientation='vertical' className="h-6 mx-0.5 shrink-0 data-vertical:self-center bg-neutral-300" />
            <HeadingLevelButton />
            <Separator orientation='vertical' className="h-6 mx-0.5 shrink-0 data-vertical:self-center bg-neutral-300" />
            <FontSizeButton />
            <Separator orientation='vertical' className="h-6 mx-0.5 shrink-0 data-vertical:self-center bg-neutral-300" />
            {sections[1].map(item => (
                <ToolbarButton key={item.label} {...item} />
            ))}
            <TextColorButton />
            <HighlightColorButton />
            <Separator orientation='vertical' className="h-6 mx-0.5 shrink-0 data-vertical:self-center bg-neutral-300" />
            <LinkButton />
            <ImageButton />
            <AlignButton />
            {sections[2].map(item => (
                <ToolbarButton key={item.label} {...item} />
            ))}
        </div>
    );
};

export default Toolbar;
'use client'

import { useEditorStore } from '@/app/store/use-editor-store';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useEditorState } from '@tiptap/react';
import { LucideIcon, Undo2, Redo2, PrinterIcon, SpellCheckIcon, Bold, Italic, Underline } from 'lucide-react';

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
                "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
                isActive && "bg-neutral-200/80",
                disabled && "opacity-50 pointer-events-none"
            )}
        >
            <Icon className='size-4' />
        </button>
    )
}

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
        ]
    ]
    return (
        <div className="bg-[#f0f4f9] min-h-10 rounded-2xl flex items-center px-4">
            {sections[0].map(item => (
                <ToolbarButton key={item.label} {...item} />
            ))}
            <Separator orientation='vertical' className="h-6 data-vertical:self-center bg-neutral-300" />
            {sections[1].map(item => (
                <ToolbarButton key={item.label} {...item} />
            ))}
        </div>
    );
};

export default Toolbar;
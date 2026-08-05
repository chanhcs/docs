'use client'
import { useEffect } from 'react'
import { useEditorStore } from '@/app/store/use-editor-store'
import { TaskItem, TaskList } from '@tiptap/extension-list'
import { useEditor, EditorContent } from '@tiptap/react'
import { Color, FontFamily, FontSize, TextStyle } from '@tiptap/extension-text-style'
import Highlight from '@tiptap/extension-highlight'
import ImageResize from 'tiptap-extension-resize-image'
import TextAlign from '@tiptap/extension-text-align'
import StarterKit from '@tiptap/starter-kit'
import Ruler from './ruler'
import { useLiveblocksExtension } from "@liveblocks/react-tiptap";
import { Threads } from './threads'

const editorAttributes = (leftMargin: number, rightMargin: number) => ({
    spellcheck: "false",
    style: `padding-left: ${leftMargin}px; padding-right: ${rightMargin}px`,
    class: "flex flex-col min-h-[1054px] w-204 pt-10 pb-10 cursor-text focus outline-none bg-white border border-[#C7C7C7] print:border-0"
})

const Editor = () => {
    const { setEditor, leftMargin, rightMargin } = useEditorStore();
    const liveblocks = useLiveblocksExtension();

    const editor = useEditor({
        onCreate({ editor }) {
            setEditor(editor)
        },
        onDestroy() {
            setEditor(null)
        },
        editorProps: {
            attributes: editorAttributes(leftMargin, rightMargin)
        },
        extensions: [
            liveblocks,
            StarterKit.configure({
                undoRedo: false,
                link: {
                    openOnClick: false,
                    autolink: true,
                    defaultProtocol: 'https',
                },
            }),
            TaskList,
            TextStyle,
            FontFamily,
            FontSize,
            Color,
            ImageResize,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Highlight.configure({
                multicolor: true,
            }),
            TaskItem.configure({
                nested: true,
            }),
        ],
        immediatelyRender: false
    })

    useEffect(() => {
        if (!editor) return
        editor.setOptions({
            editorProps: {
                attributes: editorAttributes(leftMargin, rightMargin)
            }
        })
    }, [editor, leftMargin, rightMargin])

    return (

        <div className='flex-1 min-h-0 overflow-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible'>
            <div className='min-w-max flex flex-col items-center mx-auto print:w-full print:min-w-0'>
                <Ruler />
                <div className='py-4 print:p-0'>
                    <EditorContent editor={editor} />
                    <Threads editor={editor} />
                </div>
            </div>
        </div>
    )
}

export default Editor
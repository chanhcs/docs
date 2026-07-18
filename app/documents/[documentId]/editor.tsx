'use client'
import { useEditorStore } from '@/app/store/use-editor-store'
import { TaskItem, TaskList } from '@tiptap/extension-list'
import { useEditor, EditorContent } from '@tiptap/react'
import { Color, FontFamily, TextStyle } from '@tiptap/extension-text-style'
import Highlight from '@tiptap/extension-highlight'
import StarterKit from '@tiptap/starter-kit'

const Editor = () => {
    const { setEditor } = useEditorStore();

    const editor = useEditor({
        onCreate({ editor }) {
            setEditor(editor)
        },
        onDestroy() {
            setEditor(null)
        },
        editorProps: {
            attributes: {
                spellcheck: "false",
                style: "padding-left: 56px; padding-right: 56px",
                class: "flex flex-col min-h-[1054px] w-204 pt-10 pr-14 pb-10 cursor-text focus outline-none bg-white border border-[#C7C7C7] print:border-0"
            }
        },
        extensions: [
            StarterKit,
            TaskList,
            TextStyle,
            FontFamily,
            Color,
            Highlight.configure({
                multicolor: true,
            }),
            TaskItem.configure({
                nested: true,
            }),
        ],
        immediatelyRender: false
    })

    return (

        <div className='size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible'>
            <div className='min-w-max flex justify-center py-4  mx-auto print:w-full print:min-w-0'>
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}

export default Editor
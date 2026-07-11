'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const Editor = () => {
    const editor = useEditor({
        editorProps: {
            attributes: {
                style: "padding-left: 56px; padding-right: 56px",
                class: "flex flex-col min-h-[1054px] w-204 pt-10 pr-14 pb-10 cursor-text focus outline-none bg-white border border-[#C7C7C7] print:border-0"
            }
        },
        extensions: [StarterKit],
        content: '<p>Hello World! 🌎️</p>',
        immediatelyRender: false
    })

    return (

        <div className='size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible'>
            <div className='min-w-max flex justify-center py-4 w-204 mx-auto print:w-full print:min-w-0'>
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}

export default Editor
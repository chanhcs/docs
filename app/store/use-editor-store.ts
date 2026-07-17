import { create } from "zustand";
import { type Editor } from "@tiptap/react"

interface EdittorState {
    editor: Editor | null;
    setEditor: (editor: Editor | null) => void;
}

export const useEditorStore = create<EdittorState>((set) => ({
    editor: null,
    setEditor: (editor) => set({ editor })
}))
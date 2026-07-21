import { create } from "zustand";
import { type Editor } from "@tiptap/react"

interface EdittorState {
    editor: Editor | null;
    setEditor: (editor: Editor | null) => void;
    leftMargin: number;
    rightMargin: number;
    setLeftMargin: (leftMargin: number) => void;
    setRightMargin: (rightMargin: number) => void;
}

export const useEditorStore = create<EdittorState>((set) => ({
    editor: null,
    setEditor: (editor) => set({ editor }),
    leftMargin: 96,
    rightMargin: 96,
    setLeftMargin: (leftMargin) => set({ leftMargin }),
    setRightMargin: (rightMargin) => set({ rightMargin })
}))
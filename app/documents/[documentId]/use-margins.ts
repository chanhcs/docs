'use client'

import { useMutation, useStorage } from "@liveblocks/react/suspense"

export const DEFAULT_MARGIN = 96

export const useMargins = () => {
    const leftMargin = useStorage((root) => root.leftMargin) ?? DEFAULT_MARGIN
    const rightMargin = useStorage((root) => root.rightMargin) ?? DEFAULT_MARGIN

    const setLeftMargin = useMutation(({ storage }, value: number) => {
        storage.set("leftMargin", value)
    }, [])

    const setRightMargin = useMutation(({ storage }, value: number) => {
        storage.set("rightMargin", value)
    }, [])

    return { leftMargin, rightMargin, setLeftMargin, setRightMargin }
}

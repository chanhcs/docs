'use client'

import { useEffect, useRef, useState } from 'react'
import { useMutation, useQuery } from 'convex/react'
import { useParams } from 'next/navigation'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'
import { getConvexErrorMessage } from '@/lib/errors'

const FALLBACK_TITLE = 'Untitled document'

export const DocumentInput = () => {
    const params = useParams()
    const documentId = params.documentId as Id<'documents'>
    const documentData = useQuery(api.documents.getById, { id: documentId })
    const update = useMutation(api.documents.updateById)

    const [isEditing, setIsEditing] = useState(false)
    const [value, setValue] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    const title = documentData?.title ?? FALLBACK_TITLE

    useEffect(() => {
        if (!isEditing) return
        inputRef.current?.focus()
        inputRef.current?.select()
    }, [isEditing])

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const nextTitle = value.trim() || FALLBACK_TITLE
        setIsEditing(false)
        if (nextTitle === title) return

        try {
            await update({ id: documentId, title: nextTitle })
        } catch (error) {
            console.error(error)
            toast.error(getConvexErrorMessage(error, "Couldn't rename the document."))
        }
    }

    if (documentData === undefined) {
        return <Skeleton className='h-6 w-40' />
    }

    if (isEditing) {
        return (
            <form onSubmit={handleSubmit} className='relative inline-grid items-center'>
                <span className='invisible col-start-1 row-start-1 whitespace-pre px-1.5 py-0.5'>
                    {value || ' '}
                </span>
                <input
                    ref={inputRef}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={(e) => e.currentTarget.form?.requestSubmit()}
                    onKeyDown={(e) => {
                        if (e.key === 'Escape') {
                            setIsEditing(false)
                        }
                    }}
                    className='col-start-1 row-start-1 min-w-24 rounded-sm px-1.5 py-0.5 outline-none ring-1 ring-[#4285F4] truncate'
                />
            </form>
        )
    }

    return (
        <button
            type='button'
            onClick={() => {
                setValue(title)
                setIsEditing(true)
            }}
            className='max-w-96 truncate rounded-sm px-1.5 py-0.5 text-left hover:ring-1 hover:ring-neutral-300 cursor-text'
        >
            {title}
        </button>
    )
}

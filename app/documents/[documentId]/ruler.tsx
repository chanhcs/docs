'use client'

import { useEffect, useRef, useState } from 'react'
import { DEFAULT_MARGIN, useMargins } from './use-margins'
import { cn } from '@/lib/utils'

const PAGE_WIDTH = 816
const MINIMUM_SPACE = 100
const UNIT = 96 / 2.54
const QUARTER = UNIT / 4

interface RulerMarkerProps {
    position: number
    isLeft?: boolean
    isDragging: boolean
    onMouseDown: () => void
    onDoubleClick: () => void
}

const RulerMarker = ({ position, isLeft, isDragging, onMouseDown, onDoubleClick }: RulerMarkerProps) => {
    return (
        <div
            className='absolute top-0 z-10 h-full w-3.5 -translate-x-1/2 cursor-ew-resize'
            style={{ left: position }}
            onMouseDown={onMouseDown}
            onDoubleClick={onDoubleClick}
        >
            {isLeft && (
                <div className='absolute left-1/2 top-0 h-0.75 w-3.5 -translate-x-1/2 bg-[#4285F4]' />
            )}
            <div className={cn(
                'absolute left-1/2 -translate-x-1/2 border-l-[7px] border-r-[7px] border-t-10 border-l-transparent border-r-transparent border-t-[#4285F4]',
                isLeft ? 'top-1.25' : 'top-0.5'
            )} />
            {isDragging && (
                <div className='absolute left-1/2 top-3 h-screen w-px -translate-x-1/2 bg-[#4285F4]/60' />
            )}
        </div>
    )
}

const Ruler = () => {
    const { leftMargin, rightMargin, setLeftMargin, setRightMargin } = useMargins()
    const [dragging, setDragging] = useState<'left' | 'right' | null>(null)
    const rulerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!dragging) return

        const handleMouseMove = (e: MouseEvent) => {
            const ruler = rulerRef.current
            if (!ruler) return

            const rect = ruler.getBoundingClientRect()
            const rawPosition = Math.max(0, Math.min(PAGE_WIDTH, e.clientX - rect.left))

            if (dragging === 'left') {
                const maxLeft = PAGE_WIDTH - rightMargin - MINIMUM_SPACE
                setLeftMargin(Math.min(rawPosition, maxLeft))
            } else {
                const maxRight = PAGE_WIDTH - leftMargin - MINIMUM_SPACE
                setRightMargin(Math.min(PAGE_WIDTH - rawPosition, maxRight))
            }
        }
        const handleMouseUp = () => setDragging(null)

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }
    }, [dragging, leftMargin, rightMargin, setLeftMargin, setRightMargin])

    const marks = []
    for (let k = -Math.floor(leftMargin / QUARTER); leftMargin + k * QUARTER <= PAGE_WIDTH; k++) {
        const position = leftMargin + k * QUARTER
        const isWhole = k % 4 === 0
        const isHalf = k % 2 === 0 && !isWhole
        marks.push(
            <div key={k} className='absolute bottom-0' style={{ left: position }}>
                {isWhole ? (
                    k !== 0 && (
                        <span className='absolute bottom-1 -translate-x-1/2 text-[10px] font-medium leading-none text-neutral-800'>
                            {Math.abs(k / 4)}
                        </span>
                    )
                ) : (
                    <div className={cn(
                        'absolute bottom-0.5 w-px -translate-x-1/2 bg-neutral-600',
                        isHalf ? 'h-1.5' : 'h-1'
                    )} />
                )}
            </div>
        )
    }

    return (
        <div className='sticky top-0 z-10 bg-[#F9FBFD] pt-1.5 print:hidden'>
            <div ref={rulerRef} className='relative h-5 w-204 select-none'>
                {marks}
                <RulerMarker
                    position={leftMargin}
                    isLeft
                    isDragging={dragging === 'left'}
                    onMouseDown={() => setDragging('left')}
                    onDoubleClick={() => setLeftMargin(DEFAULT_MARGIN)}
                />
                <RulerMarker
                    position={PAGE_WIDTH - rightMargin}
                    isDragging={dragging === 'right'}
                    onMouseDown={() => setDragging('right')}
                    onDoubleClick={() => setRightMargin(DEFAULT_MARGIN)}
                />
            </div>
        </div>
    )
}

export default Ruler

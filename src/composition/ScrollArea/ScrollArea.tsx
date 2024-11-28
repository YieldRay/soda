import './ScrollArea.scss'
import { useLayoutEffect, useRef } from 'react'
import { refCSSProperties, useMergeRefs } from '@/hooks/use-merge'

/**
 * Highly experimental!
 */
export const ScrollArea = ({
    color,
    children,
}: {
    color?: string
    children: React.ReactNode
}) => {
    const _wrapperRef = useRef<HTMLDivElement>(null)
    const wrapperRef = useMergeRefs(
        _wrapperRef,
        refCSSProperties({
            '--color': color,
        }),
    )

    const thumbRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const frameUpdateRef = useRef<number>(0)
    const lastDragPos = useRef<Point>({ x: 0, y: 0 })
    const originalBodyPointerEvents = useRef(
        typeof document === 'undefined'
            ? ''
            : document.body.style.pointerEvents,
    )

    useLayoutEffect(() => {
        const wrapperEl = _wrapperRef.current
        const contentEl = contentRef.current
        const thumbEl = thumbRef.current

        /** The total height of the scrollable content */
        let totalHeight = 0
        /** The visible height of the scrollable content */
        let visibleHeight = 0
        /** The current scrollTop */
        let scrollPos = 0
        /** How far we've scrolled on a scale of 0 to 1 */
        let scrollPosRatio = 0
        /** The ratio of scroll of visible area to total area on a scale of 0 to 1: */
        let visibleToTotalRatio = 0

        /** Keeps the thumb the right size and in the right position */
        function updateThumb() {
            if (contentEl && thumbEl && wrapperEl) {
                // Update our cached values:
                totalHeight = contentEl.scrollHeight
                visibleHeight = contentEl.clientHeight
                scrollPos = contentEl.scrollTop
                // Update calculated values:
                scrollPosRatio = scrollPos / totalHeight
                visibleToTotalRatio = visibleHeight / totalHeight

                if (visibleToTotalRatio >= 1) {
                    // We're at 100% visible area, no need to show the scroll thumb:
                    thumbEl.style.height = '0px'
                } else {
                    // Set the thumb top to the scroll percent:
                    thumbEl.style.top = scrollPosRatio * 100 + '%'
                    // Set the thumb size based on the scroll ratio:
                    thumbEl.style.height =
                        Math.max(visibleToTotalRatio * 100, 10) + '%'
                }
            }

            // Keep the updates coming:
            frameUpdateRef.current = requestAnimationFrame(updateThumb)
        }

        /** Caches a starting mouse position, wires up listeners for drag */
        function onDragStart(e: MouseEvent) {
            if (contentEl && thumbEl && wrapperEl) {
                // Prevent default text selection
                e.preventDefault()
                // Grab the starting mouse pos:
                lastDragPos.current = { x: e.clientX, y: e.clientY }
                // Add the dragging class to keep the thumb visible
                wrapperEl.classList.add('soda-is-dragging')
                // Add event listeners for drag and end:
                window.addEventListener('mousemove', onDragMove)
                window.addEventListener('mouseup', onDragEnd)
                // Remember current body style so overrides can be restored later
                originalBodyPointerEvents.current =
                    document.body.style.pointerEvents
                // Disable pointer events so element hovers aren't visible while dragging
                document.body.style.pointerEvents = 'none'
            }
        }

        /** Calculates the mouse move to scroll amount and applies it */
        function onDragMove(e: MouseEvent) {
            if (contentEl && thumbEl && wrapperEl) {
                // How much did we move?
                const delta: Vector = {
                    dx: lastDragPos.current.x - e.clientX,
                    dy: lastDragPos.current.y - e.clientY,
                }
                // Cache the new mouse position:
                lastDragPos.current = { x: e.clientX, y: e.clientY }

                // Update the scroll position of the content, amplifying the mouse movement by the amount of content hidden:
                contentEl.scrollTop -= Math.round(
                    delta.dy / visibleToTotalRatio,
                )
            }
        }

        /** Unwires the mouse listeners and pops the dragging class off the wrapper */
        function onDragEnd(_e: MouseEvent) {
            if (contentEl && thumbEl && wrapperEl) {
                // Add the dragging class to keep the thumb visible
                wrapperEl.classList.remove('soda-is-dragging')
                // Get rid of our drag move and end event listeners:
                window.removeEventListener('mousemove', onDragMove)
                window.removeEventListener('mouseup', onDragEnd)
                // Restore body pointer events style
                document.body.style.pointerEvents =
                    originalBodyPointerEvents.current
            }
        }

        // Listen for mousedown on the thumb:
        thumbRef.current?.addEventListener('mousedown', onDragStart)

        // Start updates every frame:
        frameUpdateRef.current = requestAnimationFrame(updateThumb)

        // Cancel the requestAnimationFrame and unbind potential listeners before leaving
        return () => {
            cancelAnimationFrame(frameUpdateRef.current)
            thumbEl?.removeEventListener('mousedown', onDragStart)
            window.removeEventListener('mousemove', onDragMove)
            window.removeEventListener('mouseup', onDragEnd)
        }
    }, [])

    return (
        <div ref={wrapperRef} className="sd-scrollarea-container">
            {/* Lock the content into its own zIndex */}
            <div
                data-scroll-content
                ref={contentRef}
                className="sd-scrollarea-content"
            >
                {children}
            </div>
            {/* Create the thumb on a higher zIndex */}
            <div
                ref={thumbRef}
                data-scroll-thumb
                className="sd-scrollarea-thumb"
            />
        </div>
    )
}

interface Point {
    x: number
    y: number
}

interface Vector {
    dx: number
    dy: number
}

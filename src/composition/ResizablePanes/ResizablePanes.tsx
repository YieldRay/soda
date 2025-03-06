import { useCallback, useMemo, useRef } from 'react'
import { mergeStyles } from '@/utils/style'
import { ExtendProps } from '@/utils/type'

function Divider({
    size,
    onSizeDelta,
    direction,
    style,
    ...props
}: ExtendProps<{
    size: string
    onSizeDelta: (delta: number) => void
    direction: 'horizontal' | 'vertical'
}>) {
    const isPointerDown = useRef(false)
    const pointerDownPosition = useRef({ x: 0, y: 0 })

    const onPointerDown = useCallback((e: React.PointerEvent) => {
        const target = e.target as HTMLDivElement
        target.setPointerCapture(e.pointerId)
        isPointerDown.current = true
        pointerDownPosition.current = { x: e.clientX, y: e.clientY }
    }, [])

    const onPointerUp = useCallback((e: React.PointerEvent) => {
        const target = e.target as HTMLDivElement
        target.releasePointerCapture(e.pointerId)
        isPointerDown.current = false
    }, [])

    const onPointerMove = useCallback(
        (e: React.PointerEvent) => {
            if (!isPointerDown.current) return

            const deltaX = e.clientX - pointerDownPosition.current.x
            const deltaY = e.clientY - pointerDownPosition.current.y
            const delta = direction === 'horizontal' ? deltaX : deltaY

            onSizeDelta(delta)
            pointerDownPosition.current = { x: e.clientX, y: e.clientY }
        },
        [onSizeDelta, direction],
    )

    const appliedStyle = useMemo<React.CSSProperties>(
        () =>
            mergeStyles(
                {
                    cursor:
                        direction === 'horizontal'
                            ? 'col-resize'
                            : 'row-resize',
                    width: direction === 'horizontal' ? size : '100%',
                    height: direction === 'vertical' ? size : '100%',
                    userSelect: 'none',
                    touchAction: 'none',
                },
                style,
            ),
        [style, direction, size],
    )

    return (
        <div
            style={appliedStyle}
            {...props}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerMove={onPointerMove}
        />
    )
}

/**
 * @internal
 */
function InternalResizablePanes({
    gridTemplate,
    onSizeDelta,
    direction,
    firstPane,
    firstPaneProps,
    secondPane,
    secondPaneProps,
    resizerSize,
    resizerProps,
    style,
    ...props
}: ExtendProps<
    Omit<ResizablePanesProps, 'onSizeChange' | 'direction'> & {
        direction: 'horizontal' | 'vertical'
        gridTemplate: string
        onSizeDelta: (delta: number) => void
    }
>) {
    return (
        <div
            {...props}
            style={{
                overflow: 'hidden',
                ...style,
                display: 'grid',
                [direction === 'horizontal'
                    ? 'gridTemplateColumns'
                    : 'gridTemplateRows']: gridTemplate,
            }}
        >
            <div {...firstPaneProps}>{firstPane}</div>
            <Divider
                direction={direction}
                size={resizerSize || '4px'}
                onSizeDelta={onSizeDelta}
                {...resizerProps}
            />
            <div {...secondPaneProps}>{secondPane}</div>
        </div>
    )
}

export interface ResizablePanesProps {
    size: number
    firstPane: React.ReactNode
    firstPaneProps?: React.HTMLAttributes<HTMLDivElement>
    secondPane: React.ReactNode
    secondPaneProps?: React.HTMLAttributes<HTMLDivElement>
    /**
     * @default "4px"
     */
    resizerSize?: string
    resizerProps?: React.HTMLAttributes<HTMLDivElement>
    onSizeChange: (size: number) => void
    /**
     * @default "left"
     */
    direction?: 'left' | 'right' | 'top' | 'bottom'
}

export function ResizablePanes({
    size,
    onSizeChange,
    direction = 'left',
    ...props
}: ResizablePanesProps) {
    const reversed = direction === 'right' || direction === 'bottom'
    const handleResizeDelta = useCallback(
        (delta: number) => onSizeChange(size + delta * (reversed ? -1 : 1)),
        [size, onSizeChange, reversed],
    )

    const innerDirection =
        direction === 'left' || direction === 'right'
            ? 'horizontal'
            : 'vertical'

    const gridTemplate =
        direction === 'left' || direction === 'top'
            ? `${size}px auto 1fr`
            : `1fr auto ${size}px`

    return (
        <InternalResizablePanes
            direction={innerDirection}
            size={size}
            onSizeDelta={handleResizeDelta}
            gridTemplate={gridTemplate}
            {...props}
        />
    )
}

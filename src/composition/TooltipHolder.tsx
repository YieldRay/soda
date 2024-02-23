import { forwardRef, useImperativeHandle, useState } from 'react'
import {
    autoUpdate,
    flip,
    offset,
    safePolygon,
    shift,
    useDismiss,
    useFloating,
    useFocus,
    useHover,
    useInteractions,
    useRole,
    useTransitionStyles,
} from '@floating-ui/react'
import type { Placement } from '@floating-ui/react'
import { useTransitionStylesProps } from '@/utils/floating-ui'

/**
 * This handle is always exists when component is mounted,
 * so you can always use `ref.current!.open = false`
 */
export interface TooltipHolderHandle {
    open: boolean
}

/**
 * Just a simple wrapper of `floating-ui` for convenience,
 * can use ref to manually toggle it.
 *
 * You may use `floating-ui` directly for better control.
 */
export const TooltipHolder = forwardRef<
    TooltipHolderHandle,
    {
        content?: React.ReactNode
        trigger?: React.ReactNode
        placement?: Placement
        zIndex?: number
    }
>(function TooltipHolder(
    { placement = 'top', zIndex = 2, trigger, content },
    ref,
) {
    const [isOpen, setIsOpen] = useState(false)

    const { refs, floatingStyles, update, context } = useFloating({
        whileElementsMounted: autoUpdate,
        placement,
        middleware: [offset(4), flip(), shift()],
        open: isOpen,
        onOpenChange: setIsOpen,
    })

    const { styles } = useTransitionStyles(context, useTransitionStylesProps)

    const hover = useHover(context, {
        move: false,
        handleClose: safePolygon({ blockPointerEvents: true }),
        delay: {
            open: 150,
            close: 0,
        },
    })
    const focus = useFocus(context)
    const dismiss = useDismiss(context)
    const role = useRole(context, { role: 'tooltip' })

    const { getReferenceProps, getFloatingProps } = useInteractions([
        hover,
        focus,
        dismiss,
        role,
    ])

    useImperativeHandle(ref, () => ({
        get open() {
            return isOpen
        },
        set open(v) {
            setIsOpen(v)
        },
    }))

    return (
        <div className="container">
            <div
                className="reference"
                ref={refs.setReference}
                onResize={update}
                {...getReferenceProps()}
            >
                {trigger}
            </div>

            <div
                className="floating"
                style={{
                    ...floatingStyles,
                    zIndex,
                    pointerEvents: isOpen ? undefined : 'none',
                }}
                ref={refs.setFloating}
                {...getFloatingProps()}
            >
                <div style={styles}>{content}</div>
            </div>

            <style jsx>{`
                .container {
                    position: relative;
                    display: inline-block;
                    vertical-align: middle;
                }
                .floating {
                    width: max-content;
                    transition: opacity 200ms;
                }
            `}</style>
        </div>
    )
})

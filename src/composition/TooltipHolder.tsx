import {
    useFloating,
    autoUpdate,
    offset,
    flip,
    shift,
    useHover,
    useInteractions,
    useFocus,
    useDismiss,
    useRole,
    safePolygon,
    useTransitionStyles,
} from '@floating-ui/react'
import type { Placement } from '@floating-ui/react'
import { useTransitionStylesProps } from '@/utils/floating-ui'
import { forwardRef, useImperativeHandle, useState } from 'react'

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
    }
>(function TooltipHolder(props, ref) {
    const [isOpen, setIsOpen] = useState(false)

    const { refs, floatingStyles, update, context } = useFloating({
        whileElementsMounted: autoUpdate,
        placement: props.placement || 'top',
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
                {props.trigger}
            </div>

            <div
                className="floating"
                style={floatingStyles}
                ref={refs.setFloating}
                {...getFloatingProps()}
            >
                <div style={styles}>{props.content}</div>
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

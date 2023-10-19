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
import { useState } from 'react'

/**
 * Just a simple wrapper of `floating-ui` for convenience.
 *
 * You may use `floating-ui` directly for better control.
 */
export function TooltipHolder(props: {
    content?: React.ReactNode
    trigger?: React.ReactNode
    placement?: Placement
}) {
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
}

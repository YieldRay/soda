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
} from '@floating-ui/react'
import type { Placement } from '@floating-ui/react'
import assign from 'lodash-es/assign'
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
        placement: props.placement || 'bottom-start',
        middleware: [offset(4), flip(), shift()],
        open: isOpen,
        onOpenChange: setIsOpen,
    })

    const hover = useHover(context, {
        move: false,
        handleClose: safePolygon({ blockPointerEvents: true }),
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
        <div className="trigger">
            <div
                ref={refs.setReference}
                onResize={update}
                {...getReferenceProps()}
            >
                {props.trigger}
            </div>

            <div
                className="content"
                ref={refs.setFloating}
                style={assign(
                    {
                        pointerEvents: isOpen ? 'auto' : 'none',
                        opacity: isOpen ? '1' : '0',
                    },
                    floatingStyles
                )}
                {...getFloatingProps()}
            >
                {props.content}
            </div>

            <style jsx>{`
                .trigger {
                    position: relative;
                    display: inline-block;
                    vertical-align: middle;
                }
                .content {
                    width: max-content;
                    transition: opacity 200ms;
                }
            `}</style>
        </div>
    )
}

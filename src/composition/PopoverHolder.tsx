import {
    useFloating,
    autoUpdate,
    offset,
    flip,
    shift,
    useInteractions,
    useDismiss,
    useRole,
    useClick,
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
export function PopoverHolder(props: {
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

    const click = useClick(context)
    const dismiss = useDismiss(context)
    const role = useRole(context)

    const { getReferenceProps, getFloatingProps } = useInteractions([
        click,
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
                ref={refs.setFloating}
                style={floatingStyles}
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

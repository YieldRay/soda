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
import { useState } from 'react'

/**
 * @ref https://floating-ui.com/docs/react
 */
export function FloatingTip(props: {
    content?: React.ReactNode
    trigger?: React.ReactNode
}) {
    const [isOpen, setIsOpen] = useState(false)

    const { refs, floatingStyles, update, context } = useFloating({
        whileElementsMounted: autoUpdate,
        placement: 'bottom-start',
        middleware: [offset(4), flip(), shift()],
        open: isOpen,
        onOpenChange: setIsOpen,
    })

    const hover = useHover(context, {
        delay: {
            open: 300,
            close: 100,
        },
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
            {isOpen && (
                <div
                    className="content"
                    ref={refs.setFloating}
                    style={floatingStyles}
                    {...getFloatingProps()}
                >
                    {props.content}
                </div>
            )}
            <style jsx>{`
                .trigger {
                    position: relative;
                    display: inline-block;
                    vertical-align: middle;
                }
                .content {
                    width: max-content;
                    animation: sd-fade-in 200ms;
                }
                @keyframes sd-fade-in {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    )
}

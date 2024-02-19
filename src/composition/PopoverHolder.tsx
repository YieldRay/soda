import { forwardRef, useImperativeHandle, useState } from 'react'
import {
    autoUpdate,
    flip,
    offset,
    shift,
    useClick,
    useDismiss,
    useFloating,
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
export interface PopoverHolderHandle {
    open: boolean
}

/**
 * Just a simple wrapper of `floating-ui` for convenience,
 * can use ref to manually toggle it.
 *
 * You may use `floating-ui` directly for better control.
 */
export const PopoverHolder = forwardRef<
    PopoverHolderHandle,
    {
        content?: React.ReactNode
        trigger?: React.ReactNode
        placement?: Placement
        zIndex?: number
    }
>(function PopoverHolder(
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

    const click = useClick(context)
    const dismiss = useDismiss(context)
    const role = useRole(context)

    const { getReferenceProps, getFloatingProps } = useInteractions([
        click,
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
                ref={refs.setFloating}
                style={{ ...floatingStyles, zIndex }}
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

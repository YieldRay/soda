import { forwardRef, useImperativeHandle, useState } from 'react'
import { css } from '@emotion/react'
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

export interface TooltipProps {
    content?: React.ReactNode
    trigger?: React.ReactNode
    placement?: Placement
    delay?:
        | number
        | {
              open?: number
              close?: number
          }
    zIndex?: number
}

/**
 * Just a simple wrapper of `floating-ui` for convenience,
 * can use ref to manually toggle it.
 *
 * You may use `floating-ui` directly for better control.
 */
export const TooltipHolder = forwardRef(function TooltipHolder(
    {
        placement = 'top',
        zIndex = 2,
        trigger,
        content,
        delay = {
            open: 150,
            close: 0,
        },
    }: TooltipProps,
    ref: React.ForwardedRef<TooltipHolderHandle>,
) {
    const [isOpen, setIsOpen] = useState(false)

    const { refs, floatingStyles, context } = useFloating({
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
        delay,
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
        <div
            css={css`
                position: relative;
                display: inline-block;
                vertical-align: middle;
            `}
        >
            <div ref={refs.setReference} {...getReferenceProps()}>
                {trigger}
            </div>

            <div
                css={css`
                    width: max-content;
                    transition: opacity 200ms;
                `}
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
        </div>
    )
})

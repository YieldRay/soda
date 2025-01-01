import {
    refCSSProperty,
    useMergeEventHandlers,
    useMergeRefs,
} from '@/hooks/use-merge'
import './Scrim.scss'
import clsx from 'clsx'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { ExtendProps } from '@/utils/type'

/**
 * The Scrim component serves as a background layer, designed to hold and enhance the visibility of its child components.
 *
 * Transition works for chrome>=117
 */
export const Scrim = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        open?: boolean
        /** set the transition-duration value in ms, by default is 250 */
        duration?: number
        onScrimClick?(e: React.MouseEvent<HTMLElement, MouseEvent>): void
        inset?: string
        zIndex?: number
        /** If only hold a single root child, `center` make the child centered position */
        center?: boolean
        /** If true, unmount the component when it is closed */
        unmountOnClose?: boolean
    }>
>(
    (
        {
            open,
            center,
            onScrimClick,
            zIndex,
            inset = '0',
            duration = 250,
            unmountOnClose = false,
            children,
            style,
            className,
            ...props
        },
        ref,
    ) => {
        const [shouldRender, setShouldRender] = useState(open)

        useEffect(() => {
            let timeoutId: ReturnType<typeof setTimeout>

            if (open) {
                setShouldRender(true)
            } else if (unmountOnClose) {
                timeoutId = setTimeout(() => setShouldRender(false), duration)
            }

            return () => {
                if (timeoutId) {
                    clearTimeout(timeoutId)
                }
            }
        }, [open, unmountOnClose, duration])

        const eRef = useRef<HTMLDivElement>()
        useEffect(() => {
            if (open) eRef.current?.focus()
        }, [open])

        const mergedRef = useMergeRefs(
            ref,
            refCSSProperty('--duration', `${duration}ms`),
            eRef,
        )
        const handleClick = useMergeEventHandlers(props.onClick, (e) => {
            const el = e.target as HTMLElement
            if (el.classList.contains('sd-scrim')) {
                onScrimClick?.(e)
            }
        })

        if (!shouldRender && unmountOnClose) {
            return null
        }

        return (
            <div
                {...props}
                ref={mergedRef}
                className={clsx(
                    'sd-scrim',
                    center && 'sd-scrim-center',
                    open && 'sd-scrim-open',
                    className,
                )}
                style={{ ...style, position: 'fixed', zIndex, inset }}
                onClick={handleClick}
            >
                {children}
            </div>
        )
    },
)

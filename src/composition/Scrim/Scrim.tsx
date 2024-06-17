import {
    useCSSProperty,
    useMergeEventHandlers,
    useMergeRefs,
} from '@/hooks/use-merge'
import './Scrim.scss'
import clsx from 'clsx'
import { forwardRef } from 'react'
import { ExtendProps } from '@/utils/type'

/**
 * Transition works for chrome>=117
 */
export const Scrim = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        open?: boolean
        /** css string value for transition-duration, by default 250ms */
        duration?: string | number
        onScrimClick?(e: React.MouseEvent<HTMLElement, MouseEvent>): void
        inset?: string
        zIndex?: number
        /**
         * If only hold a single root child, `center` make the child centered position
         */
        center?: boolean
    }>
>(
    (
        {
            open,
            center,
            onScrimClick,
            zIndex,
            inset = '0',
            duration,
            children,
            style,
            className,
            ...props
        },
        ref,
    ) => (
        <div
            {...props}
            ref={useMergeRefs(
                ref,
                useCSSProperty(
                    '--duration',
                    typeof duration === 'number' ? `${duration}ms` : duration,
                ),
            )}
            className={clsx(
                'sd-scrim',
                center && 'sd-scrim-center',
                open && 'sd-scrim-open',
                className,
            )}
            style={{ ...style, position: 'fixed', zIndex, inset }}
            onClick={useMergeEventHandlers(props.onClick, (e) => {
                const el = e.target as HTMLElement
                if (el.classList.contains('sd-scrim')) {
                    onScrimClick?.(e)
                }
            })}
        >
            {children}
        </div>
    ),
)

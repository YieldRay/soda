import { useMergeEventHandlers } from '@/hooks/use-merge'
import './Scrim.scss'
import { ExtendProps } from '@/utils/type'
import clsx from 'clsx'
import { forwardRef } from 'react'

/**
 * Transition works for chrome>=117
 */
export const Scrim = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        open?: boolean
        onScrimClick?(e: React.MouseEvent<HTMLElement, MouseEvent>): void
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
            children,
            style,
            className,
            ...props
        },
        ref
    ) => (
        <div
            {...props}
            ref={ref}
            className={clsx(
                'sd-scrim',
                center && 'sd-scrim-center',
                open && 'sd-scrim-open',
                className
            )}
            style={{ ...style, zIndex }}
            onClick={useMergeEventHandlers(props.onClick, (e) => {
                const el = e.target as HTMLElement
                if (el.classList.contains('sd-scrim')) {
                    onScrimClick?.(e)
                }
            })}
        >
            {children}
        </div>
    )
)

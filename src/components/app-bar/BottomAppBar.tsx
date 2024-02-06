import './app-bar.scss'
import { ExtendProps } from '@/utils/type'
import clsx from 'clsx'
import { forwardRef } from 'react'

/**
 * `<BottomAppBar>` has fixed style `height: 80px`
 * @specs https://m3.material.io/components/bottom-app-bar/specs
 */
export const BottomAppBar = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        /**
         * Place `<IconButton>` here
         */
        buttons?: React.ReactNode
        /**
         * Place `<Fab>` here
         */
        fab?: React.ReactNode
        /**
         * Fix the component to the bottom side,
         * if set to a number, it also become the zIndex
         */
        fixed?: boolean | number
    }>
>(function BottomAppBar(
    { buttons, fab, fixed, className, style, ...props },
    ref
) {
    return (
        <div
            {...props}
            ref={ref}
            className={clsx('sd-bottom_app_bar', className)}
            style={{
                ...(fixed === true
                    ? {
                          position: 'fixed',
                          bottom: '0',
                          zIndex: typeof fixed === 'boolean' ? 1 : fixed,
                          width: '100%',
                          boxSizing: 'border-box',
                      }
                    : undefined),
                ...style,
            }}
        >
            <div className="sd-bottom_app_bar-buttons">{buttons}</div>
            <div className="sd-bottom_app_bar-fab">{fab}</div>
        </div>
    )
})

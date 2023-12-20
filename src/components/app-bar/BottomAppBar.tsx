import './app-bar.scss'
import { ExtendProps } from '@/utils/type'
import clsx from 'clsx'
import { forwardRef } from 'react'
import { createPortal } from 'react-dom'

/**
 * `<BottonAppBar>` has fixed style `height: 80px`
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
        fixed?: boolean
    }>
>(function BottomAppBar(
    { buttons, fab, fixed, className, style, ...props },
    ref
) {
    const ele = (
        <div
            {...props}
            ref={ref}
            className={clsx('sd-bottom_app_bar', className)}
            style={{
                ...(fixed
                    ? { position: 'fixed', left: '0', bottom: '0' }
                    : undefined),
                ...style,
            }}
        >
            <div className="sd-bottom_app_bar-buttons">{buttons}</div>
            <div className="sd-bottom_app_bar-fab">{fab}</div>
        </div>
    )

    if (fixed) return createPortal(ele, document.body)
    return ele
})

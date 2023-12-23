import './app-bar.scss'
import { ExtendProps } from '@/utils/type'
import clsx from 'clsx'
import { forwardRef } from 'react'
import { Portal } from '@/utils/Portal'

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
        /**
         * Only works if `fixed` set to true
         */
        teleportTo?: Element | DocumentFragment
    }>
>(function BottomAppBar(
    { buttons, fab, fixed, teleportTo, className, style, ...props },
    ref
) {
    const bottomAppBar = (
        <div
            {...props}
            ref={ref}
            className={clsx('sd-bottom_app_bar', className)}
            style={{
                position: fixed ? 'fixed' : undefined,
                ...style,
            }}
        >
            <div className="sd-bottom_app_bar-buttons">{buttons}</div>
            <div className="sd-bottom_app_bar-fab">{fab}</div>
        </div>
    )

    if (fixed) return <Portal container={teleportTo}>{bottomAppBar}</Portal>
    return bottomAppBar
})

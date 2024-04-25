import { mergeStyles } from '@/utils/style'
import './app-bar.scss'
import clsx from 'clsx'
import { forwardRef } from 'react'
import { ExtendProps } from '@/utils/type'

/**
 * `<BottomAppBar>` has fixed style `height: 80px`
 *
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
         * Fix the component to the top side,
         *
         * See also `zIndex` `inset`
         */
        fixed?: boolean
        /**
         * CSS `z-index`, if `fixed` set to `true`
         *
         * @default 1
         */
        zIndex?: number
        /**
         * CSS `inset`, if `fixed` set to `true`
         */
        inset?: string
    }>
>(function BottomAppBar(
    {
        buttons,
        fab,
        fixed,
        zIndex = 1,
        inset = 'auto 0 0',
        className,
        style,
        ...props
    },
    ref,
) {
    return (
        <div
            {...props}
            ref={ref}
            className={clsx('sd-bottom_app_bar', className)}
            style={mergeStyles(
                fixed && {
                    position: 'fixed',
                    zIndex,
                    inset,
                },
                style,
            )}
        >
            <div className="sd-bottom_app_bar-buttons">{buttons}</div>
            <div className="sd-bottom_app_bar-fab">{fab}</div>
        </div>
    )
})

import { mergeStyles } from '@/utils/style'
import './toolbar.scss'
import clsx from 'clsx'
import { forwardRef } from 'react'
import { ExtendProps } from '@/utils/type'

/**
 * `<Toolbar>` displays frequently used actions relevant to the current page
 * 
 * Two expressive types: docked toolbar and floating toolbar
 * Use the vibrant color style for greater emphasis
 * Can display a wide variety of control types, like buttons, icon buttons, and text fields
 * Can be paired with FABs to emphasize certain actions
 * Don't show at the same time as a navigation bar
 *
 * @specs https://m3.material.io/components/toolbars
 */
export const Toolbar = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        /**
         * Toolbar variant
         * @default "docked"
         */
        variant?: 'docked' | 'floating'
        /**
         * Color scheme for the toolbar
         * @default "standard"
         */
        colorScheme?: 'standard' | 'vibrant'
        /**
         * Orientation for floating toolbars
         * @default "horizontal"
         */
        orientation?: 'horizontal' | 'vertical'
        /**
         * Actions to display in the toolbar (buttons, icon buttons, text fields, etc.)
         */
        actions?: React.ReactNode
        /**
         * FAB component for floating toolbar configurations
         */
        fab?: React.ReactNode
        /**
         * Fix the toolbar to a specific position
         * For docked: typically bottom or top
         * For floating: can be positioned anywhere
         */
        fixed?: boolean
        /**
         * CSS `z-index`, if `fixed` set to `true`
         * @default 1
         */
        zIndex?: number
        /**
         * CSS `inset`, if `fixed` set to `true`
         * For docked bottom: 'auto 0 0'
         * For docked top: '0 0 auto'
         */
        inset?: string
    }>
>(function Toolbar(
    {
        variant = 'docked',
        colorScheme = 'standard',
        orientation = 'horizontal',
        actions,
        fab,
        fixed,
        zIndex = 1,
        inset,
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
            className={clsx(
                'sd-toolbar',
                `sd-toolbar--${variant}`,
                `sd-toolbar--${colorScheme}`,
                variant === 'floating' && `sd-toolbar--${orientation}`,
                className
            )}
            style={mergeStyles(
                fixed && {
                    position: 'fixed',
                    zIndex,
                    inset: inset || (variant === 'docked' ? 'auto 0 0' : undefined),
                },
                style,
            )}
            data-sd={`${variant}-${colorScheme}-${orientation}`}
        >
            <div className="sd-toolbar-content">
                <div className="sd-toolbar-actions">{actions}</div>
                {fab && <div className="sd-toolbar-fab">{fab}</div>}
            </div>
        </div>
    )
})
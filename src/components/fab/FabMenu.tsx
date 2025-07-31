import './fab.scss'
import clsx from 'clsx'
import { forwardRef } from 'react'
import { ExtendProps } from '@/utils/type'

/**
 * FAB menu container that displays multiple related actions floating on screen.
 * Opens from a FAB to show 2-6 related actions.
 * 
 * @specs https://m3.material.io/components/floating-action-button/specs
 */
export const FabMenu = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        /**
         * Whether the menu is open
         */
        open?: boolean
        /**
         * Color variant of the menu
         * @default "primary"
         */
        variant?: 'primary' | 'secondary' | 'tertiary'
        /**
         * Position anchor for the menu animation
         * @default "bottom-right"
         */
        anchor?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
        /**
         * Menu items (should be FabMenuItem components)
         */
        children?: React.ReactNode
        /**
         * Callback when menu should be closed
         */
        onClose?: () => void
    }>
>(function FabMenu(
    {
        open = false,
        variant = 'primary',
        anchor = 'bottom-right',
        children,
        onClose,
        className,
        ...props
    },
    ref,
) {
    return (
        <div
            {...props}
            ref={ref}
            className={clsx('sd-fab-menu', className)}
            data-sd={variant}
            data-sd-anchor={anchor}
            data-sd-open={open}
            role="menu"
            aria-hidden={!open}
        >
            {/* Close button */}
            <button
                className="sd-fab-menu-close"
                onClick={onClose}
                aria-label="Close menu"
                role="menuitem"
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
            </button>

            {/* Menu items container */}
            <div className="sd-fab-menu-items">
                {children}
            </div>
        </div>
    )
})
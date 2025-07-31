import './fab.scss'
import clsx from 'clsx'
import { forwardRef } from 'react'
import {
    autoUpdate,
    flip,
    offset,
    shift,
    useFloating,
    useTransitionStyles,
} from '@floating-ui/react'
import { useTransitionStylesProps } from '@/utils/floating-ui'
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
         * Reference element (trigger FAB) to position relative to
         */
        reference?: Element | null
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
        reference,
        children,
        onClose,
        className,
        ...props
    },
    _ref,
) {
    const { refs, floatingStyles, context } = useFloating({
        whileElementsMounted: autoUpdate,
        placement: 'top-end', // Position above and aligned to trailing edge
        middleware: [
            offset(8), // 8px gap between FAB and menu
            flip(),
            shift({ padding: 16 }), // Respect 16dp margins
        ],
        open,
        elements: {
            reference,
        },
    })

    const { styles } = useTransitionStyles(context, {
        ...useTransitionStylesProps,
        common: () => ({
            transformOrigin: 'bottom right', // Always animate from bottom-right corner
        }),
    })

    if (!open) return null

    return (
        <div
            {...props}
            ref={refs.setFloating}
            className={clsx('sd-fab-menu', className)}
            data-sd={variant}
            role="menu"
            aria-hidden={!open}
            style={{
                ...floatingStyles,
                ...styles,
                zIndex: 1000,
            }}
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
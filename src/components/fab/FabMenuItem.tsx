import './fab.scss'
import clsx from 'clsx'
import { forwardRef } from 'react'
import { Ripple } from '@/ripple/Ripple'
import { ExtendProps } from '@/utils/type'

/**
 * Individual menu item for FAB menu.
 * Contains an icon and shares the same measurements as medium button.
 */
export const FabMenuItem = forwardRef<
    HTMLElement,
    ExtendProps<{
        /**
         * Icon for the menu item
         */
        icon?: React.ReactNode
        /**
         * Whether the item is disabled
         */
        disabled?: boolean
        /**
         * Additional content/label (optional)
         */
        children?: React.ReactNode
    }>
>(function FabMenuItem(
    {
        icon,
        disabled,
        children,
        className,
        ...props
    },
    ref,
) {
    return (
        <Ripple
            {...props}
            ref={ref}
            as="button"
            className={clsx('sd-fab-menu-item', className)}
            data-sd-disabled={disabled}
            aria-disabled={disabled}
            role="menuitem"
            tabIndex={disabled ? -1 : 0}
        >
            {icon && <div className="sd-fab-menu-item-icon">{icon}</div>}
            {children && <div className="sd-fab-menu-item-label">{children}</div>}
        </Ripple>
    )
})
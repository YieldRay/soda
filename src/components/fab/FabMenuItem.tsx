import './fab-menu.scss'
import clsx from 'clsx'
import { forwardRef } from 'react'
import { Ripple } from '@/ripple/Ripple'
import { ExtendProps } from '@/utils/type'

export interface FabMenuItemProps {
    /**
     * Icon for the menu item
     */
    icon?: React.ReactNode
    /**
     * Label text for the menu item
     */
    label?: string
    /**
     * Whether the item is disabled
     */
    disabled?: boolean
    /**
     * Click handler for the menu item
     */
    onClick?: () => void
    /**
     * Accessible label for the menu item
     */
    'aria-label'?: string
}

/**
 * FAB Menu Item component
 * Follows medium button specifications as per design guidelines
 */
export const FabMenuItem = forwardRef<
    HTMLElement,
    ExtendProps<FabMenuItemProps>
>(function FabMenuItem(
    {
        icon,
        label,
        disabled,
        onClick,
        className,
        'aria-label': ariaLabel,
        ...props
    },
    ref,
) {
    const handleClick = () => {
        if (!disabled && onClick) {
            onClick()
        }
    }

    return (
        <Ripple
            {...props}
            as="div"
            ref={ref}
            className={clsx('sd-fab-menu-item', className)}
            data-sd-disabled={disabled}
            onClick={handleClick}
            role="menuitem"
            tabIndex={disabled ? -1 : 0}
            aria-label={ariaLabel || label}
            aria-disabled={disabled}
        >
            {icon && <div className="sd-fab-menu-item-icon">{icon}</div>}
            {label && <div className="sd-fab-menu-item-label">{label}</div>}
        </Ripple>
    )
})

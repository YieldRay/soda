import './split-button.scss'
import clsx from 'clsx'
import { forwardRef } from 'react'
import { Ripple } from '@/ripple/Ripple'
import { getReversedRippleColor } from '@/ripple/ripple-color'
import { ExtendProps } from '@/utils/type'

/**
 * @specs https://m3.material.io/components/split-button/specs
 */
export const SplitButton = forwardRef<
    HTMLDivElement,
    ExtendProps<
        {
            /**
             * @default "filled"
             */
            variant?: 'outlined' | 'filled' | 'elevated' | 'tonal'
            /**
             * @default "M"
             */
            size?: 'XS' | 'S' | 'M' | 'L' | 'XL'
            disabled?: boolean
            /**
             * Icon to display before the label in the leading button
             */
            icon?: React.ReactNode
            /**
             * Label text for the leading button
             */
            label?: React.ReactNode
            /**
             * Click handler for the leading (action) button
             */
            onClick?: VoidFunction
            /**
             * Click handler for the trailing (menu) button
             */
            onMenuClick?: VoidFunction
            /**
             * Menu icon for the trailing button
             * @default chevron-down icon
             */
            menuIcon?: React.ReactNode
            /**
             * Whether the menu is currently open/selected
             */
            menuSelected?: boolean
            /**
             * Accessible label for the leading button
             */
            'aria-label'?: string
            /**
             * Accessible label for the trailing menu button
             */
            'aria-label-menu'?: string
        },
        HTMLDivElement
    >
>(function SplitButton(
    {
        variant = 'filled',
        size = 'M',
        disabled,
        icon,
        label,
        onClick,
        onMenuClick,
        menuIcon,
        menuSelected = false,
        className,
        'aria-label': ariaLabel,
        'aria-label-menu': ariaLabelMenu,
        ...props
    },
    ref,
) {
    // Default chevron down icon (simple SVG implementation)
    const defaultMenuIcon = (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M10 13L5 8h10l-5 5z" />
        </svg>
    )

    return (
        <div
            {...props}
            ref={ref}
            className={clsx(
                'sd-split_button',
                `sd-split_button-${variant}`,
                `sd-split_button-${size}`,
                className,
            )}
            data-sd-disabled={disabled}
        >
            <Ripple
                as="button"
                type="button"
                className="sd-split_button-leading"
                rippleColor={
                    variant === 'filled' ? getReversedRippleColor() : undefined
                }
                onClick={() => !disabled && onClick?.()}
                onKeyDown={(e) => !disabled && e.key === 'Enter' && onClick?.()}
                data-sd-disabled={disabled}
                aria-disabled={disabled}
                aria-label={ariaLabel}
            >
                <div className="sd-split_button-content">
                    {icon && (
                        <div className="sd-split_button-icon">{icon}</div>
                    )}
                    {label && (
                        <div className="sd-split_button-label">{label}</div>
                    )}
                </div>
            </Ripple>
            <div className="sd-split_button-divider" />
            <Ripple
                as="button"
                type="button"
                className="sd-split_button-trailing"
                rippleColor={
                    variant === 'filled' ? getReversedRippleColor() : undefined
                }
                onClick={() => !disabled && onMenuClick?.()}
                onKeyDown={(e) =>
                    !disabled && e.key === 'Enter' && onMenuClick?.()
                }
                data-sd-disabled={disabled}
                data-sd-selected={menuSelected}
                aria-disabled={disabled}
                aria-expanded={menuSelected}
                aria-haspopup="menu"
                aria-label={ariaLabelMenu || 'Open menu'}
            >
                <div className="sd-split_button-menu-icon">
                    {menuIcon || defaultMenuIcon}
                </div>
            </Ripple>
        </div>
    )
})

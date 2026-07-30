import './split-button.scss'
import clsx from 'clsx'
import { forwardRef, useState } from 'react'
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
             * @default "m"
             */
            size?: 'xs' | 's' | 'm' | 'l' | 'xl'
            disabled?: boolean
            /**
             * Leading icon shown before the label
             */
            leadingIcon?: React.ReactNode
            /**
             * Label text for the leading button
             */
            children?: React.ReactNode
            /**
             * Click handler for the leading button
             */
            onAction?: VoidFunction
            /**
             * Menu content shown when trailing button is clicked
             */
            menu?: React.ReactNode
            /**
             * Menu icon for the trailing button
             * @default arrow_drop_down icon
             */
            menuIcon?: React.ReactNode
            /**
             * Controlled selected state for trailing button
             */
            selected?: boolean
            /**
             * Handler called when trailing button is clicked
             */
            onMenuToggle?: (selected: boolean) => void
            /**
             * Accessible label for the leading button
             */
            'aria-label'?: string
            /**
             * Accessible label for the trailing button
             */
            'aria-label-menu'?: string
        },
        HTMLDivElement
    >
>(function SplitButton(
    {
        variant = 'filled',
        size = 'm',
        disabled,
        leadingIcon,
        children,
        onAction,
        menu,
        menuIcon,
        selected: controlledSelected,
        onMenuToggle,
        className,
        'aria-label': ariaLabel,
        'aria-label-menu': ariaLabelMenu,
        ...props
    },
    ref,
) {
    const [internalSelected, setInternalSelected] = useState(false)
    const selected =
        controlledSelected !== undefined ? controlledSelected : internalSelected

    const handleMenuToggle = () => {
        const newSelected = !selected
        if (controlledSelected === undefined) {
            setInternalSelected(newSelected)
        }
        onMenuToggle?.(newSelected)
    }

    const rippleColor =
        variant === 'filled' ? getReversedRippleColor() : undefined

    return (
        <div
            {...props}
            ref={ref}
            className={clsx(
                'sd-split_button',
                `sd-split_button-${variant}`,
                `sd-split_button-size-${size}`,
                className,
            )}
            data-sd-disabled={disabled}
        >
            <Ripple
                as="button"
                type="button"
                className="sd-split_button-leading"
                rippleColor={rippleColor}
                onClick={() => !disabled && onAction?.()}
                onKeyDown={(e) =>
                    !disabled &&
                    (e.key === 'Enter' || e.key === ' ') &&
                    onAction?.()
                }
                data-sd-disabled={disabled}
                aria-disabled={disabled}
                aria-label={ariaLabel}
            >
                {leadingIcon && (
                    <span className="sd-split_button-icon">{leadingIcon}</span>
                )}
                {children && (
                    <span className="sd-split_button-label">{children}</span>
                )}
            </Ripple>

            <div className="sd-split_button-divider" />

            <Ripple
                as="button"
                type="button"
                className="sd-split_button-trailing"
                rippleColor={rippleColor}
                onClick={() => !disabled && handleMenuToggle()}
                onKeyDown={(e) =>
                    !disabled &&
                    (e.key === 'Enter' || e.key === ' ') &&
                    handleMenuToggle()
                }
                data-sd-disabled={disabled}
                data-sd-selected={selected}
                aria-disabled={disabled}
                aria-pressed={selected}
                aria-label={ariaLabelMenu ?? 'Open menu'}
            >
                <span className="sd-split_button-menu_icon">
                    {menuIcon || (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="100%"
                            height="100%"
                        >
                            <path d="M7 10l5 5 5-5z" fill="currentColor" />
                        </svg>
                    )}
                </span>
            </Ripple>

            {menu && selected && (
                <div className="sd-split_button-menu">{menu}</div>
            )}
        </div>
    )
})

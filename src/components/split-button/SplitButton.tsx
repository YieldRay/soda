import './split-button.scss'
import { mdiMenuDown } from '@mdi/js'
import Icon from '@mdi/react'
import clsx from 'clsx'
import { forwardRef, useState } from 'react'
import {
    autoUpdate,
    flip,
    offset,
    shift,
    useClick,
    useDismiss,
    useFloating,
    useInteractions,
    useRole,
    useTransitionStyles,
} from '@floating-ui/react'
import type { Placement } from '@floating-ui/react'
import { Ripple } from '@/ripple/Ripple'
import { getReversedRippleColor } from '@/ripple/ripple-color'
import { useTransitionStylesProps } from '@/utils/floating-ui'
import { ExtendProps } from '@/utils/type'

/**
 * Split buttons open a menu to give people more options related to an action
 * 
 * @specs https://m3.material.io/components/buttons/specs
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
             * @default "medium"
             */
            size?: 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large'
            disabled?: boolean
            /**
             * Primary action handler for the leading button
             */
            onClick?: VoidFunction
            /**
             * Leading button content (icon, text, or both)
             */
            children?: React.ReactNode
            /**
             * Menu content to display when trailing button is clicked
             */
            menu?: React.ReactNode
            /**
             * Menu placement relative to the button
             * @default "bottom-start"
             */
            menuPlacement?: Placement
            /**
             * Accessible label for the button. Required when button contains only icons.
             */
            'aria-label'?: string
        },
        HTMLDivElement
    >
>(function SplitButton(
    {
        variant = 'filled',
        size = 'medium',
        disabled,
        onClick,
        children,
        menu,
        menuPlacement = 'bottom-start',
        className,
        'aria-label': ariaLabel,
        ...props
    },
    ref,
) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const { refs, floatingStyles, context } = useFloating({
        whileElementsMounted: autoUpdate,
        placement: menuPlacement,
        middleware: [offset(4), flip(), shift()],
        open: isMenuOpen,
        onOpenChange: setIsMenuOpen,
    })

    const { styles } = useTransitionStyles(context, useTransitionStylesProps)

    const click = useClick(context)
    const dismiss = useDismiss(context)
    const role = useRole(context)

    const { getReferenceProps, getFloatingProps } = useInteractions([
        click,
        dismiss,
        role,
    ])

    // Icon size based on component size
    const iconSize = {
        'extra-small': '16px',
        'small': '18px',
        'medium': '20px',
        'large': '24px',
        'extra-large': '24px',
    }[size]

    return (
        <>
            <div
                {...props}
                ref={ref}
                className={clsx(
                    'sd-split-button',
                    `sd-split-button-${variant}`,
                    `sd-split-button-${size}`,
                    className
                )}
                data-sd-disabled={disabled}
                aria-disabled={disabled}
            >
                {/* Leading button */}
                <Ripple
                    as="button"
                    type="button"
                    className="sd-split-button__leading"
                    rippleColor={
                        variant === 'filled' ? getReversedRippleColor() : undefined
                    }
                    onClick={() => onClick?.()}
                    onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
                    disabled={disabled}
                    aria-label={ariaLabel}
                >
                    {children}
                </Ripple>

                {/* Trailing button */}
                <Ripple
                    as="button"
                    type="button"
                    className="sd-split-button__trailing"
                    rippleColor={
                        variant === 'filled' ? getReversedRippleColor() : undefined
                    }
                    ref={refs.setReference}
                    {...getReferenceProps()}
                    disabled={disabled}
                    aria-label="Show more options"
                    data-selected={isMenuOpen}
                >
                    <Icon 
                        size={iconSize} 
                        path={mdiMenuDown}
                        className={clsx('sd-split-button__menu-icon', {
                            'sd-split-button__menu-icon--selected': isMenuOpen
                        })}
                    />
                </Ripple>
            </div>

            {/* Menu */}
            {menu && (
                <div
                    ref={refs.setFloating}
                    style={{
                        ...floatingStyles,
                        zIndex: 1000,
                        pointerEvents: isMenuOpen ? undefined : 'none',
                    }}
                    {...getFloatingProps()}
                >
                    <div style={styles}>{menu}</div>
                </div>
            )}
        </>
    )
})
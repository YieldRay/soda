import './button.scss'
import clsx from 'clsx'
import { forwardRef } from 'react'
import { Ripple } from '@/ripple/Ripple'
import { getReversedRippleColor } from '@/ripple/ripple-color'
import { ExtendProps } from '@/utils/type'

/**
 * @specs https://m3.material.io/components/buttons/specs
 */
export const Button = forwardRef<
    HTMLButtonElement,
    ExtendProps<
        {
            /**
             * @default "filled"
             */
            variant?: 'outlined' | 'filled' | 'elevated' | 'tonal' | 'text'
            disabled?: boolean
            /**
             * Delegate to both click and send enter key for convenience
             */
            onClick?: VoidFunction
            children?: React.ReactNode
            /**
             * Accessible label for the button. Required when button contains only icons.
             */
            'aria-label'?: string
        },
        HTMLButtonElement
    >
>(function Button(
    {
        variant = 'filled',
        type,
        disabled,
        onClick,
        className,
        children,
        'aria-label': ariaLabel,
        ...props
    },
    ref,
) {
    return (
        <Ripple
            {...props}
            as="button"
            ref={ref}
            type={type ?? 'button'}
            className={clsx('sd-button', `sd-button-${variant}`, className)}
            rippleColor={
                variant === 'filled' ? getReversedRippleColor() : undefined
            }
            onClick={() => onClick?.()}
            onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
            data-sd-disabled={disabled}
            aria-disabled={disabled}
            aria-label={ariaLabel}
        >
            {children}
        </Ripple>
    )
})

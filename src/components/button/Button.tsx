import './button.scss'
import clsx from 'clsx'
import { REVERSE_RIPPLE_COLOR } from '@/ripple/ripple-effect'
import { Ripple } from '@/ripple/Ripple'
import { ExtendProps } from '@/utils/type'
import { forwardRef } from 'react'

/**
 * @specs https://m3.material.io/components/buttons/specs
 */
export const Button = forwardRef<
    HTMLButtonElement,
    ExtendProps<
        {
            /**
             * @default filled
             */
            variant?: 'outlined' | 'filled' | 'elevated' | 'tonal' | 'text'
            disabled?: boolean
            /**
             * Delegate to both click and send enter key for convenience
             */
            onClick?: VoidFunction
            children?: React.ReactNode
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
        ...props
    },
    ref
) {
    return (
        <Ripple
            {...props}
            as="button"
            ref={ref}
            type={type ?? 'button'}
            className={clsx('sd-button', `sd-button-${variant}`, className)}
            rippleColor={
                variant === 'filled' ? REVERSE_RIPPLE_COLOR : undefined
            }
            onClick={() => onClick?.()}
            onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
            data-sd-disabled={disabled}
        >
            {children}
        </Ripple>
    )
})

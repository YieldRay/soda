import './button.scss'
import clsx from 'clsx'
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
            sd?: 'outlined' | 'filled' | 'elevated' | 'tonal' | 'text'
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
    { sd: initSd, className, disabled, onClick, children, type, ...props },
    ref
) {
    const sd = initSd || 'filled'

    return (
        <Ripple
            {...props}
            as="button"
            ref={ref}
            type={type ?? 'button'}
            className={clsx('sd-button', `sd-button-${sd}`, className)}
            onClick={() => onClick?.()}
            onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
            data-sd-disabled={disabled}
        >
            {children}
        </Ripple>
    )
})

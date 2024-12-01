import './chip.scss'
import clsx from 'clsx'
import { forwardRef } from 'react'
import { Ripple } from '@/ripple/Ripple'
import { ExtendProps } from '@/utils/type.ts'

/**
 * @specs https://m3.material.io/components/chips/specs
 */
export const Chip = forwardRef<
    HTMLElement,
    ExtendProps<{
        /**
         * @default "outlined"
         */
        variant?: 'outlined' | 'tonal'
        children: React.ReactNode
        className?: string
        leadingIcon?: React.ReactNode
        trailingIcon?: React.ReactNode
        disabled?: boolean
        onClick?: VoidFunction
    }>
>(function Chip(
    {
        variant = 'outlined',
        leadingIcon,
        trailingIcon,
        disabled,
        onClick,
        className,
        children,
        ...props
    },
    ref,
) {
    return (
        <Ripple
            {...props}
            ref={ref}
            as="div"
            className={clsx('sd-chip', `sd-chip-${variant}`, className)}
            onClick={onClick}
            role="button"
            data-sd-disabled={disabled}
            aria-disabled={disabled}
        >
            {leadingIcon && (
                <div className="sd-chip-leading_icon">{leadingIcon}</div>
            )}

            <div className="sd-chip-label_text">{children}</div>

            {trailingIcon && (
                <div className="sd-chip-trailing_icon">{trailingIcon}</div>
            )}
        </Ripple>
    )
})

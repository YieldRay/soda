import './chip.scss'
import clsx from 'clsx'
import { Ripple } from '@/ripple/Ripple'
import { forwardRef } from 'react'
import { ExtendProps } from '@/utils/type.ts'

/**
 * @specs https://m3.material.io/components/chips/specs
 */
export const Chip = forwardRef<
    HTMLElement,
    ExtendProps<{
        /**
         * @default outlined
         */
        sd?: 'outlined' | 'tonal'
        children: React.ReactNode
        className?: string
        leadingIcon?: React.ReactNode
        trailingIcon?: React.ReactNode
        disabled?: boolean
        onClick?: VoidFunction
    }>
>(function Chip(
    {
        sd: initSd,
        children,
        leadingIcon,
        trailingIcon,
        disabled,
        onClick,
        className,
        ...props
    },
    ref
) {
    const sd = initSd || 'outlined'
    return (
        <Ripple
            {...props}
            ref={ref}
            className={clsx('sd-chip', `sd-chip-${sd}`, className)}
            onClick={onClick}
            data-sd-disabled={disabled}
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

import './chip.scss'
import clsx from 'clsx'
import { Ripple } from '@/utils/Ripple'
import { forwardRef } from 'react'
import { ExtendProps, TagNameString } from '@/utils/type.ts'

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
        onClick?: () => void
        as?: TagNameString
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
        as,
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
            as={as}
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

import './badge.scss'
import clsx from 'clsx'
import { forwardRef } from 'react'
import { ExtendProps } from '@/utils/type'

/**
 * @specs https://m3.material.io/components/badges/specs
 */
export const Badge = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        children?: React.ReactNode
        label?: React.ReactNode
        /**
         * Do not need to specify this property in most cases, as it will automatically
         * choose small for empty label and large for none-empty label
         */
        variant?: 'none' | 'small' | 'large'
    }>
>(function Badge(
    { label, children, variant: initVariant, className, ...props },
    ref
) {
    const variant = initVariant || (label == undefined ? 'small' : 'large')

    return (
        <div
            {...props}
            className={clsx('sd-badge', className)}
            ref={ref}
            data-sd={variant}
        >
            {children}
            <div className="sd-badge-label">{label}</div>
        </div>
    )
})

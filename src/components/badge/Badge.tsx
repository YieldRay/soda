import './badge.scss'
import { forwardRef } from 'react'
import clsx from 'clsx'
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
        sd?: 'none' | 'small' | 'large'
    }>
>(function Badge({ label, children, sd: initSd, className, ...props }, ref) {
    const sd = initSd || (label == undefined ? 'small' : 'large')

    return (
        <div
            {...props}
            className={clsx('sd-badge', className)}
            ref={ref}
            data-sd={sd}
        >
            {children}
            <div className="sd-badge-label">{label}</div>
        </div>
    )
})

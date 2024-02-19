import './tooltip.scss'
import clsx from 'clsx'
import { forwardRef } from 'react'

/**
 * @specs https://m3.material.io/components/tooltips/specs
 */
export const PlainTooltip = forwardRef<
    HTMLDivElement,
    React.HTMLProps<HTMLDivElement>
>(function PlainTooltip({ className, children, ...props }, ref) {
    return (
        <div
            {...props}
            ref={ref}
            className={clsx('sd-plain_tooltip', className)}
        >
            {children}
        </div>
    )
})

import './progress-indicator.scss'
import { forwardRef } from 'react'
import isNumber from 'lodash-es/isNumber'
import { ExtendProps } from '@/utils/type'
import clsx from 'clsx'

/**
 * [notice]: This component has default `min-width: 5rem` and `width: 100%` for convenience.
 * You can manually set style property to override it if needed.
 * @specs https://m3.material.io/components/progress-indicators/specs#efada034-defe-401e-803a-e6ea2833a396
 */
export const LinearProgressIndicator = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        /**
         * Between 0 and 1, if is unset, act as indeterminate
         */
        value?: number
    }>
>(function LinearProgressIndicator({ value, className, ...props }, ref) {
    return (
        <div
            {...props}
            ref={ref}
            className={clsx('sd-linear_progress_indicator', className)}
            data-sd={
                typeof value !== 'undefined' ? 'determinate' : 'indeterminate'
            }
        >
            <div
                className="sd-linear_progress_indicator-track"
                style={{
                    width: isNumber(value)
                        ? `${Math.min(value, 1) * 100}%`
                        : '',
                }}
            ></div>
        </div>
    )
})

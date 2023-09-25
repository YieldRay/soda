import './progress-indicator.scss'
import { forwardRef } from 'react'

/**
 * @specs https://m3.material.io/components/progress-indicators/specs#efada034-defe-401e-803a-e6ea2833a396
 */
export const LinearProgressIndicator = forwardRef<
    HTMLDivElement,
    {
        /**
         * Between 0 and 1, if is unset, act as undeterminate
         */
        value?: number
    }
>(function LinearProgressIndicator(props, ref) {
    return (
        <div
            ref={ref}
            className="sd-linear_progress_indicator"
            data-sd={
                typeof props.value !== 'undefined'
                    ? 'determinate'
                    : 'undeterminate'
            }
        >
            <div
                className="sd-linear_progress_indicator-track"
                style={{
                    width:
                        typeof props.value !== 'undefined'
                            ? `${Math.min(props.value, 1) * 100}%`
                            : '',
                }}
            ></div>
        </div>
    )
})

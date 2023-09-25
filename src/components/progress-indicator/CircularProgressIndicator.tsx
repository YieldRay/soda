import './progress-indicator.scss'
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

/**
 * @specs https://m3.material.io/components/progress-indicators/specs#c1e48032-c857-45d6-af1d-c5b5b0022cf4
 */
export const CircularProgressIndicator = forwardRef<
    HTMLDivElement,
    {
        /**
         * Between 0 and 1, if is unset, act as undeterminate
         */
        value?: number
    }
>(function CircularProgressIndicator(props, ref) {
    const eRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(ref, () => eRef.current!)
    useEffect(() => {
        if (typeof props.value !== 'undefined') {
            eRef.current!.style.setProperty('--value', `${props.value! * 100}%`)
        }
    })

    return (
        <div
            className="sd-circular_progress_indicator"
            ref={eRef}
            data-sd={
                typeof props.value !== 'undefined'
                    ? 'determinate'
                    : 'undeterminate'
            }
        ></div>
    )
})

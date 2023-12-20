import { ExtendProps } from '@/utils/type'
import './progress-indicator.scss'
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import clsx from 'clsx'

/**
 * @specs https://m3.material.io/components/progress-indicators/specs#c1e48032-c857-45d6-af1d-c5b5b0022cf4
 */
export const CircularProgressIndicator = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        /**
         * Between 0 and 1, if is unset, act as undeterminate
         */
        value?: number
        /**
         * @default 36px
         */
        size?: string
    }>
>(function CircularProgressIndicator(
    { value, size, className, ...props },
    ref
) {
    const eRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(ref, () => eRef.current!)
    useEffect(() => {
        if (typeof size !== 'undefined') {
            eRef.current!.style.setProperty('--size', size)
        }
        if (typeof value !== 'undefined') {
            eRef.current!.style.setProperty('--value', `${value! * 100}%`)
        }
    }, [value, size])

    return (
        <div
            {...props}
            className={clsx('sd-circular_progress_indicator', className)}
            ref={eRef}
            data-sd={
                typeof value !== 'undefined' ? 'determinate' : 'undeterminate'
            }
        ></div>
    )
})

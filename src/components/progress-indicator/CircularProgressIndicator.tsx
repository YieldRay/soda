import { ExtendProps } from '@/utils/type'
import './progress-indicator.scss'
import clsx from 'clsx'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useCSSProperties, useMergeRefs } from '@/hooks/use-merge'

/**
 * @specs https://m3.material.io/components/progress-indicators/specs#c1e48032-c857-45d6-af1d-c5b5b0022cf4
 */
export const CircularProgressIndicator = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        /**
         * Between 0 and 1, if is unset, act as indeterminate
         */
        value?: number
        /**
         * @default 36px
         */
        size?: string
    }>
>(function CircularProgressIndicator(
    { value, size = '36px', className, ...props },
    ref,
) {
    const eRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(ref, () => eRef.current!)

    return (
        <div
            {...props}
            className={clsx('sd-circular_progress_indicator', className)}
            ref={useMergeRefs(
                eRef,
                useCSSProperties({
                    '--size': size,
                    '--value':
                        typeof value !== 'undefined'
                            ? `${value * 100}%`
                            : undefined,
                }),
            )}
            data-sd={
                typeof value !== 'undefined' ? 'determinate' : 'indeterminate'
            }
        ></div>
    )
})

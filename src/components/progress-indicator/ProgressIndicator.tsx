import { forwardRef } from 'react'
import { CircularProgressIndicator } from './CircularProgressIndicator'
import { LinearProgressIndicator } from './LinearProgressIndicator'

export const ProgressIndicator = forwardRef<
    HTMLDivElement,
    {
        variant: 'circular' | 'linear'
        /**
         * Between 0 and 1, if is unset, act as indeterminate
         */
        value?: number
    }
>(function ProgressIndicator({ variant = 'circular', value }, ref) {
    if (variant === 'linear')
        return <LinearProgressIndicator ref={ref} value={value} />
    else return <CircularProgressIndicator ref={ref} value={value} />
})

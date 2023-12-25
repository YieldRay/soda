import { LinearProgressIndicator } from './LinearProgressIndicator'
import { CircularProgressIndicator } from './CircularProgressIndicator'
import { forwardRef } from 'react'

export const ProgressIndicator = forwardRef<
    HTMLDivElement,
    {
        sd: 'circular' | 'linear'
        /**
         * Between 0 and 1, if is unset, act as indeterminate
         */
        value?: number
    }
>(function ProgressIndicator({ sd, value }, ref) {
    if (sd === 'linear')
        return <LinearProgressIndicator ref={ref} value={value} />
    else return <CircularProgressIndicator ref={ref} value={value} />
})

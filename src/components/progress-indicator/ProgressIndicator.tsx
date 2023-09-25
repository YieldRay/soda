import { LinearProgressIndicator } from './LinearProgressIndicator'
import { CircularProgressIndicator } from './CircularProgressIndicator'
import { forwardRef } from 'react'

export const ProgressIndicator = forwardRef<
    HTMLDivElement,
    {
        sd: 'circular' | 'linear'
        /**
         * Between 0 and 1, if is unset, act as undeterminate
         */
        value?: number
    }
>(function ProgressIndicator(props, ref) {
    if (props.sd === 'linear')
        return <LinearProgressIndicator ref={ref} value={props.value} />
    else return <CircularProgressIndicator ref={ref} value={props.value} />
})

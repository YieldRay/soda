import { LinearProgressIndicator } from './LinearProgressIndicator'
import { CircularProgressIndicator } from './CircularProgressIndicator'

export function ProgressIndicator(props: {
    sd: 'circular' | 'linear'
    /**
     * Between 0 and 1, if is unset, act as undeterminate
     */
    value?: number
}) {
    if (props.sd === 'linear')
        return <LinearProgressIndicator value={props.value} />
    else return <CircularProgressIndicator value={props.value} />
}

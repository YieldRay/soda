import { LinearProgressIndicator } from './LinearProgressIndicator'
import { CircularProgressIndicator } from './CircularProgressIndicator'

export function ProgressIndicator(props: {
    type: 'circular' | 'linear'
    value?: number
}) {
    if (props.type === 'linear')
        return <LinearProgressIndicator value={props.value} />
    else return <CircularProgressIndicator value={props.value} />
}

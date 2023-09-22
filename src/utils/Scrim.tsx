import assign from 'lodash-es/assign'
import omit from 'lodash-es/omit'
import { ExtendProps } from './type'

export function Scrim(props: ExtendProps<{ open?: boolean }>) {
    return (
        <div
            {...omit(props, ['open'])}
            style={assign(
                {
                    background: 'rgb(0 0 0 / 0.1)',
                    transition: 'all 200ms',
                    opacity: props.open ? '1' : '0',
                    pointerEvents: props.open ? 'auto' : 'none',
                    position: 'fixed',
                    inset: '0',
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                },
                props?.style
            )}
        ></div>
    )
}

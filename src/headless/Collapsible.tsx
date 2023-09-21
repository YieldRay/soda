import omit from 'lodash-es/omit'
import assign from 'lodash-es/assign'

export function Collapsible(props: {
    open: boolean
    children: React.ReactNode
    style?: React.CSSProperties
    className?: string
}) {
    return (
        <div
            {...omit(props, ['open', 'style', 'className'])}
            className={props.className}
            style={assign(
                {
                    transition: 'all 200ms',
                    overflow: 'hidden',
                    boxSizing: 'border-box',
                },
                props.style
            )}
            ref={(e) => {
                if (!e) return
                if (props.open) {
                    e.style.maxHeight = e.scrollHeight + 'px'
                } else {
                    e.style.maxHeight = 0 + 'px'
                }
            }}
        >
            {props.children}
        </div>
    )
}

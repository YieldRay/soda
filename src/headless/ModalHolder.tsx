import { createPortal } from 'react-dom'
import assign from 'lodash-es/assign'
import omit from 'lodash-es/omit'

export function ModalHolder(
    props: {
        open: boolean
        children: React.ReactNode
        style?: React.CSSProperties
        className?: string
    } & Record<string, any>,
) {
    return createPortal(
        <div
            {...omit(props, ['open', 'style', 'className'])}
            className={props.className}
            style={assign(
                {
                    transition: 'all 200ms',
                    pointerEvents: props.open ? 'auto' : 'none',
                    opacity: props.open ? '1' : '0',
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                },
                props.style,
            )}
        >
            {props.children}
        </div>,
        document.body,
    )
}

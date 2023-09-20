import { createPortal } from 'react-dom'
import assign from 'lodash-es/assign'
import omit from 'lodash-es/omit'

/**
 * provide a scrim to document.body and hold the children
 */
export function ModalHolder(
    props: {
        open: boolean
        children: React.ReactNode
        style?: React.CSSProperties
        className?: string
        portalTo?: Element | DocumentFragment
    } & React.HTMLProps<HTMLDivElement>
) {
    const portalTo = props.portalTo ?? document.body

    const ele = (
        <div
            {...omit(props, ['open', 'style', 'className'])}
            className={props.className}
            style={assign(
                {
                    pointerEvents: props.open ? 'auto' : 'none',
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                    background: 'rgb(0 0 0 / 0.2)',
                    transition: 'all 200ms',
                    opacity: props.open ? '1' : '0',
                },
                props.style
            )}
        >
            {props.children}
        </div>
    )

    return createPortal(ele, portalTo)
}

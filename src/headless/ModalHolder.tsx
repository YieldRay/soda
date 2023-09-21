import { createPortal } from 'react-dom'
import assign from 'lodash-es/assign'
import omit from 'lodash-es/omit'
import { Scrim } from '@/utils/Scrim'

/**
 * provide a scrim to document.body and hold the children
 */
export function ModalHolder(
    props: {
        open: boolean
        /**
         * children must has `position: fixed`
         */
        children: React.ReactNode
        style?: React.CSSProperties
        className?: string
        onScrimClick?: () => void
        portalTo?: Element | DocumentFragment
    } & Omit<React.HTMLProps<HTMLDivElement>, 'ref'>
) {
    const portalTo = props.portalTo ?? document.body

    const ele = (
        <div
            {...omit(props, ['open', 'style', 'className'])}
            className={props.className}
            style={assign(
                {
                    pointerEvents: 'none',
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
            <Scrim
                open={props.open}
                onClick={() => props.onScrimClick?.()}
            ></Scrim>
            {props.children}
        </div>
    )

    return createPortal(ele, portalTo)
}

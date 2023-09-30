import { createPortal } from 'react-dom'
import { Scrim } from '@/utils/Scrim'

/**
 * Provide a clickable scrim to document.body and hold the children.
 * Currently only a utility for `<Dialog>` component
 */
export function ModalHolder(props: {
    open?: boolean
    /**
     * Children must has `position: fixed`
     */
    children?: React.ReactNode
    onScrimClick?: () => void
    /**
     * @default document.body
     */
    portalTo?: Element | DocumentFragment
    zIndex?: number
}) {
    const portalTo = props.portalTo ?? document.body

    const ele = (
        <>
            <style jsx>
                {`
                    .sd-modal-holder {
                        position: fixed;
                        inset: 0;
                        box-sizing: border-box;
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: all 200ms;
                        background: transparent;
                    }
                `}
            </style>
            <Scrim open={props.open} />
            <div
                className="sd-modal-holder"
                style={{
                    pointerEvents: props.open ? 'auto' : 'none',
                    opacity: props.open ? '1' : '0',
                    zIndex: props.zIndex,
                }}
                onClick={(e) => {
                    if (
                        props.onScrimClick &&
                        (e.target as HTMLDivElement).classList.contains(
                            'sd-modal-holder'
                        )
                    )
                        props.onScrimClick()
                }}
            >
                {props.children}
            </div>
        </>
    )

    return createPortal(ele, portalTo)
}

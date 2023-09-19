import './dialog.scss'
import { createPortal } from 'react-dom'

/**
 * @specs https://m3.material.io/components/dialogs/specs
 */
export function Dialog(props: {
    headline?: React.ReactNode
    children?: React.ReactNode
    buttons?: React.ReactNode
    open?: boolean
    onScrimClick?: () => void
}) {
    return createPortal(
        <div
            style={{
                transition: 'all 200ms',
                pointerEvents: props.open ? 'auto' : 'none',
                opacity: props.open ? '1' : '0',
            }}
        >
            <div
                className="sd-dialog-scrim"
                onClick={(e) => {
                    if (
                        props.onScrimClick &&
                        (e.target as HTMLElement).classList.contains(
                            'sd-dialog-scrim'
                        )
                    ) {
                        props.onScrimClick()
                    }
                }}
            >
                <div className="sd-dialog">
                    {props.headline && (
                        <div className="sd-dialog-headline">
                            {props.headline}
                        </div>
                    )}
                    <div className="sd-dialog-body">{props.children}</div>
                    {props.buttons && (
                        <div className="sd-dialog-buttons">{props.buttons}</div>
                    )}
                </div>
            </div>
        </div>,
        document.body
    )
}

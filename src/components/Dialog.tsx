import { createPortal } from 'react-dom'
import { Button } from './Button'
import { Ripple } from '../utils/Ripple.tsx'
import { IconClose } from '../utils/icons'

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

export function FullScreenDialog(props: {
    headline?: React.ReactNode
    button?: React.ReactNode
    onButtonClick?: () => void
    onCloseClick: () => void
    open: boolean
    children?: React.ReactNode
}) {
    return createPortal(
        <div
            className="sd-dialog-fullscreen"
            style={{
                transition: 'all 200ms',
                pointerEvents: props.open ? 'auto' : 'none',
                opacity: props.open ? '1' : '0',
            }}
        >
            <div className="sd-dialog-fullscreen-header">
                <Ripple
                    className="sd-dialog-fullscreen-close"
                    onClick={props.onCloseClick}
                >
                    <IconClose />
                </Ripple>
                <div className="sd-dialog-fullscreen-headline">
                    {props.headline}
                </div>
                {props.button && (
                    <Button sd="text" onClick={props.onButtonClick}>
                        {props.button}
                    </Button>
                )}
            </div>
            <div className="sd-dialog-fullscreen-body">{props.children}</div>
        </div>,
        document.body
    )
}

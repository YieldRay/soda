import './dialog.scss'
import { createPortal } from 'react-dom'
import { Button } from '../button/Button.tsx'
import { Ripple } from '../../utils/Ripple.tsx'
import { IconClose } from '../../utils/icons.tsx'

export function FullScreenDialog(props: {
    headline?: React.ReactNode
    button?: React.ReactNode
    onButtonClick?: () => void
    onCloseClick?: () => void
    open?: boolean
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

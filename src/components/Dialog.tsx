import { createPortal } from 'react-dom'
import { Button } from './Button'
import { Ripple } from '../utils/Ripple.tsx'

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
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <title>close</title>
                        <path
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
                        />
                    </svg>
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

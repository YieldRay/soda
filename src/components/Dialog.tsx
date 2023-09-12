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
                    {/* 
                        MIT License
                        https://www.radix-ui.com/icons
                     */}
                    <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                        ></path>
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

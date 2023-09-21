import './dialog.scss'

/**
 * @specs https://m3.material.io/components/dialogs/specs
 */
export function Dialog(props: {
    headline?: React.ReactNode
    children?: React.ReactNode
    /**
     * Buttons area
     */
    buttons?: React.ReactNode
    /**
     * If you do not need any pre-defined slots, set noPadding to true and
     * do not use headline and buttons, as they contains default css style
     */
    noPadding?: boolean
}) {
    return (
        <div className="sd-dialog">
            {props.headline && (
                <div className="sd-dialog-headline">{props.headline}</div>
            )}
            <div
                className="sd-dialog-body"
                style={{ padding: props.noPadding ? '' : '0 1.5rem' }}
            >
                {props.children}
            </div>
            {props.buttons && (
                <div className="sd-dialog-buttons">{props.buttons}</div>
            )}
        </div>
    )
}

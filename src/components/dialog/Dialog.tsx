import './dialog.scss'

/**
 * @specs https://m3.material.io/components/dialogs/specs
 */
export function Dialog(props: {
    headline?: React.ReactNode
    children?: React.ReactNode
    buttons?: React.ReactNode
}) {
    return (
        <div className="sd-dialog-scrim">
            <div className="sd-dialog">
                {props.headline && (
                    <div className="sd-dialog-headline">{props.headline}</div>
                )}
                <div className="sd-dialog-body">{props.children}</div>
                {props.buttons && (
                    <div className="sd-dialog-buttons">{props.buttons}</div>
                )}
            </div>
        </div>
    )
}

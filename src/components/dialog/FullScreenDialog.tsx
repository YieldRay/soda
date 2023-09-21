import './dialog.scss'
import { Button } from '../button'
import { IconButton } from '../icon-button'
import { IconClose } from '@/utils/icons.tsx'

/**
 * @specs https://m3.material.io/components/dialogs/specs#bbf1acde-f8d2-4ae1-9d51-343e96c4ac20
 */
export function FullScreenDialog(props: {
    headline?: React.ReactNode
    /**
     * Action Button
     */
    button?: React.ReactNode
    onButtonClick?: () => void
    onCloseClick?: () => void
    open?: boolean
    children?: React.ReactNode
}) {
    return (
        <div className="sd-dialog-fullscreen">
            <div className="sd-dialog-fullscreen-header">
                <IconButton
                    className="sd-dialog-fullscreen-close"
                    onClick={props.onCloseClick}
                >
                    <IconClose />
                </IconButton>
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
        </div>
    )
}

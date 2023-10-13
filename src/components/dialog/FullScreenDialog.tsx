import './dialog.scss'
import { forwardRef } from 'react'
import clsx from 'clsx'
import { ExtendProps } from '@/utils/type'
import { Divider } from '../divider/Divider'
import { IconButton } from '../icon-button'
import { mdiClose } from '@mdi/js'

/**
 * @specs https://m3.material.io/components/dialogs/specs#bbf1acde-f8d2-4ae1-9d51-343e96c4ac20
 */
export const FullScreenDialog = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        headline?: React.ReactNode
        /**
         * The button's child node inside the top area
         */
        button?: React.ReactNode
        /**
         * Fires when the close icon button is click
         */
        onCloseClick?: () => void
        children?: React.ReactNode
        footer?: React.ReactNode
    }>
>(function FullScreenDialog(
    { headline, button, onCloseClick, children, footer, ...props },
    ref
) {
    return (
        <div
            {...props}
            ref={ref}
            className={clsx('sd-dialog-fullscreen', props.className)}
        >
            <div className="sd-dialog-fullscreen-header">
                <IconButton
                    className="sd-dialog-fullscreen-close"
                    onClick={onCloseClick}
                    path={mdiClose}
                />
                <div className="sd-dialog-fullscreen-headline">{headline}</div>
                {button}
            </div>
            <div className="sd-dialog-fullscreen-body">{children}</div>
            {footer && (
                <div className="sd-dialog-fullscreen-footer">
                    <Divider />
                    <div className="sd-dialog-fullscreen-footer_content">
                        {footer}
                    </div>
                </div>
            )}
        </div>
    )
})

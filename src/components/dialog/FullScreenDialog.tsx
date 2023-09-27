import './dialog.scss'
import { Button } from '../button'
import { IconButton } from '../icon-button'
import { IconClose } from '@/utils/icons.tsx'
import { forwardRef } from 'react'
import { ExtendProps } from '@/utils/type'
import clsx from 'clsx'

/**
 * @specs https://m3.material.io/components/dialogs/specs#bbf1acde-f8d2-4ae1-9d51-343e96c4ac20
 */
export const FullScreenDialog = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        headline?: React.ReactNode
        /**
         * Action Button
         */
        button?: React.ReactNode
        onButtonClick?: () => void
        onCloseClick?: () => void
        children?: React.ReactNode
    }>
>(function FullScreenDialog(
    { headline, button, onButtonClick, onCloseClick, children, ...props },
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
                >
                    <IconClose />
                </IconButton>
                <div className="sd-dialog-fullscreen-headline">{headline}</div>
                {button && (
                    <Button sd="text" onClick={onButtonClick}>
                        {button}
                    </Button>
                )}
            </div>
            <div className="sd-dialog-fullscreen-body">{children}</div>
        </div>
    )
})

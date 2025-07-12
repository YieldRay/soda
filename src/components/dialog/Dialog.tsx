import './dialog.scss'
import clsx from 'clsx'
import { forwardRef, useId } from 'react'
import { ExtendProps } from '@/utils/type'

/**
 * @specs https://m3.material.io/components/dialogs/specs
 */
export const Dialog = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        headline?: React.ReactNode
        children?: React.ReactNode
        /**
         * Buttons area
         */
        buttons?: React.ReactNode
        /**
         * Accessible label for the dialog. If headline is provided, it will be used automatically.
         */
        'aria-label'?: string
        /**
         * If you do not need any pre-defined slots, set noPadding to true and
         * do not use headline and buttons, as they contains default css style
         */
        noPadding?: boolean
    }>
>(function Dialog({ headline, children, buttons, noPadding, 'aria-label': ariaLabel, ...props }, ref) {
    const headlineId = useId()
    const bodyId = useId()
    
    return (
        <div
            {...props}
            ref={ref}
            className={clsx('sd-dialog', props.className)}
            role="dialog"
            aria-modal="true"
            aria-labelledby={headline ? headlineId : undefined}
            aria-label={!headline ? ariaLabel : undefined}
            aria-describedby={bodyId}
        >
            {headline && (
                <div className="sd-dialog-headline" id={headlineId}>
                    {headline}
                </div>
            )}
            <div
                className="sd-dialog-body"
                id={bodyId}
                style={{ padding: noPadding ? '' : '1.5rem 1.5rem' }}
            >
                {children}
            </div>
            {buttons && <div className="sd-dialog-buttons">{buttons}</div>}
        </div>
    )
})

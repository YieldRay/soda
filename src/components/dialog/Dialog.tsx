import './dialog.scss'
import clsx from 'clsx'
import { forwardRef } from 'react'
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
         * If you do not need any pre-defined slots, set noPadding to true and
         * do not use headline and buttons, as they contains default css style
         */
        noPadding?: boolean
    }>
>(function Dialog({ headline, children, buttons, noPadding, ...props }, ref) {
    return (
        <div
            {...props}
            ref={ref}
            className={clsx('sd-dialog', props.className)}
            role="dialog"
        >
            {headline && <div className="sd-dialog-headline">{headline}</div>}
            <div
                className="sd-dialog-body"
                style={{ padding: noPadding ? '' : '1.5rem 1.5rem' }}
            >
                {children}
            </div>
            {buttons && <div className="sd-dialog-buttons">{buttons}</div>}
        </div>
    )
})

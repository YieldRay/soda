import './dialog.scss'
import { forwardRef } from 'react'
import { ExtendProps } from '@/utils/type'
import clsx from 'clsx'
import omit from 'lodash-es/omit'

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
>(function Dialog(props, ref) {
    return (
        <div
            {...omit(props, 'headline', 'children', 'buttons', 'noPadding')}
            ref={ref}
            className={clsx('sd-dialog', props.className)}
        >
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
})

import './tooltip.scss'
import { ActionButton } from '@/composition/ActionButton'
import { ExtendProps } from '@/utils/type'
import clsx from 'clsx'
import omit from 'lodash-es/omit'
import { forwardRef } from 'react'

/**
 * @specs https://m3.material.io/components/tooltips/specs
 */
export const RichTooltip = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        children?: React.ReactNode
        subhead?: React.ReactNode
        action?: React.ReactNode
        onActionClick?: () => void
    }>
>(function RichTooltip(props, ref) {
    return (
        <div
            {...omit(props, [
                'className',
                'subhead',
                'children',
                'action',
                'onActionClick',
            ])}
            ref={ref}
            className={clsx('sd-rich_tooltip', props.className)}
        >
            {props.subhead && (
                <div className="sd-rich_tooltip-subhead">{props.subhead}</div>
            )}

            <div className="sd-rich_tooltip-body">{props.children}</div>

            {props.action && (
                <div className="sd-rich_tooltip-action">
                    <ActionButton onClick={() => props.onActionClick?.()}>
                        {props.action}
                    </ActionButton>
                </div>
            )}
        </div>
    )
})

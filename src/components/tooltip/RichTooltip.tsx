import './tooltip.scss'
import { ActionButton } from '@/composition/ActionButton'
import { ExtendProps } from '@/utils/type'
import clsx from 'clsx'
import omit from 'lodash-es/omit'

/**
 * @specs https://m3.material.io/components/tooltips/specs
 */
export function RichTooltip(
    props: ExtendProps<{
        children?: React.ReactNode
        subhead?: React.ReactNode
        action?: React.ReactNode
        onActionClick?: () => void
    }>
) {
    return (
        <div
            className={clsx('sd-rich_tooltip', props.className)}
            {...omit(props, [
                'className',
                'subhead',
                'children',
                'action',
                'onActionClick',
            ])}
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
}

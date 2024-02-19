import './tooltip.scss'
import clsx from 'clsx'
import { forwardRef } from 'react'
import { ActionButton } from '@/composition/ActionButton'
import { ExtendProps } from '@/utils/type'

/**
 * [tips]: You may consider manually add `<br />`
 * @specs https://m3.material.io/components/tooltips/specs
 */
export const RichTooltip = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        children?: React.ReactNode
        subhead?: React.ReactNode
        action?: React.ReactNode
        onActionClick?: VoidFunction
    }>
>(function RichTooltip(
    { className, subhead, children, action, onActionClick, ...props },
    ref,
) {
    return (
        <div
            {...props}
            ref={ref}
            className={clsx('sd-rich_tooltip', className)}
        >
            {subhead && (
                <div className="sd-rich_tooltip-subhead">{subhead}</div>
            )}

            <div className="sd-rich_tooltip-body">{children}</div>

            {action && (
                <div className="sd-rich_tooltip-action">
                    <ActionButton onClick={() => onActionClick?.()}>
                        {action}
                    </ActionButton>
                </div>
            )}
        </div>
    )
})

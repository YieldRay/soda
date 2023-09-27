import './snakebar.scss'
import clsx from 'clsx'
import { ActionButton } from '@/composition/ActionButton'
import { ExtendProps } from '@/utils/type'
import { forwardRef } from 'react'

// TODO: add position

/**
 * @specs https://m3.material.io/components/snackbar/specs
 */
export const Snakebar = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        children?: React.ReactNode
        action?: React.ReactNode
        icon?: React.ReactNode
        onActionClick?: () => void
    }>
>(function Snakebar(
    { action, icon, className, children, onActionClick, ...props },
    ref
) {
    return (
        <div {...props} ref={ref} className={clsx('sd-snakebar', className)}>
            <div className="sd-snakebar-supporting_text">{children}</div>
            {action && (
                <ActionButton
                    className="sd-snakebar-action"
                    inverse
                    onClick={() => onActionClick?.()}
                >
                    {action}
                </ActionButton>
            )}
            {icon && <div className="sd-snakebar-icon">{icon}</div>}
        </div>
    )
})

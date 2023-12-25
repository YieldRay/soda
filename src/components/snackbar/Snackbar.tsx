import './snackbar.scss'
import clsx from 'clsx'
import { ActionButton } from '@/composition/ActionButton'
import { ExtendProps } from '@/utils/type'
import { forwardRef } from 'react'
import { mdiClose } from '@mdi/js'
import Icon from '@mdi/react'

/**
 * @specs https://m3.material.io/components/snackbar/specs
 */
export const Snackbar = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        children?: React.ReactNode
        action?: React.ReactNode
        onCloseClick?: VoidFunction
        onActionClick?: VoidFunction
        thirdLine?: boolean
    }>
>(function Snackbar(
    {
        action,
        onCloseClick,
        className,
        children,
        onActionClick,
        thirdLine,
        ...props
    },
    ref
) {
    return (
        <div
            {...props}
            ref={ref}
            className={clsx('sd-snackbar', className)}
            data-sd-third_line={thirdLine}
        >
            <div className="sd-snackbar-supporting_text">{children}</div>
            {action && (
                <ActionButton
                    className="sd-snackbar-action"
                    inverse
                    onClick={() => onActionClick?.()}
                >
                    {action}
                </ActionButton>
            )}
            {onCloseClick && (
                <ActionButton
                    inverse
                    className="sd-snackbar-icon"
                    onClick={() => onCloseClick()}
                >
                    <Icon path={mdiClose} />
                </ActionButton>
            )}
        </div>
    )
})

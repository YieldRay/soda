import './snakebar.scss'
import clsx from 'clsx'
import omit from 'lodash-es/omit'
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
>(function Snakebar(props, ref) {
    return (
        <div
            {...omit(props, [
                'action',
                'icon',
                'className',
                'children',
                'onActionClick',
            ])}
            ref={ref}
            className={clsx('sd-snakebar', props.className)}
            style={props.style}
        >
            <div className="sd-snakebar-supporting_text">{props.children}</div>
            {props.action && (
                <ActionButton
                    className="sd-snakebar-action"
                    inverse
                    onClick={() => props.onActionClick?.()}
                >
                    {props.action}
                </ActionButton>
            )}
            {props.icon && <div className="sd-snakebar-icon">{props.icon}</div>}
        </div>
    )
})

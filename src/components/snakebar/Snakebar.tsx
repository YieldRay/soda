import './snakebar.scss'
import clsx from 'clsx'
import omit from 'lodash-es/omit'
import { ActionButton } from '@/composition/ActionButton'

// TODO: add position

/**
 * @specs https://m3.material.io/components/snackbar/specs
 */
export function Snakebar(props: {
    children?: React.ReactNode
    action?: React.ReactNode
    onActionClick?: () => void
    icon?: React.ReactNode
    className?: string
}) {
    return (
        <div
            className={clsx('sd-snakebar', props.className)}
            {...omit(props, [
                'action',
                'icon',
                'className',
                'children',
                'onActionClick',
            ])}
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
}

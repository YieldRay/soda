import './snakebar.scss'
import clsx from 'clsx'
import { Ripple } from '../../utils/Ripple.tsx'
import omit from 'lodash-es/omit'

// TODO: add position

export function Snakebar(props: {
    children?: React.ReactNode
    action?: React.ReactNode
    icon?: React.ReactNode
    className?: string
}) {
    return (
        <div
            className={clsx('sd-snakebar', props.className)}
            {...omit(props, ['action', 'icon', 'className'])}
        >
            <div className="sd-snakebar-supporting_text">{props.children}</div>
            {props.action && (
                <Ripple
                    className="sd-snakebar-action"
                    rippleColor="rgb(255 255 255 / 0.1)"
                >
                    {props.action}
                </Ripple>
            )}
            {props.icon && <div className="sd-snakebar-icon">{props.icon}</div>}
        </div>
    )
}

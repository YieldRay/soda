import clsx from 'clsx'
import { type CSSProperties } from 'react'

export function Switch(props: {
    checked?: boolean
    onChange?: (checked: boolean) => void
    children?: React.ReactNode
    disabled?: boolean
    className?: string
    style?: CSSProperties
}) {
    return (
        <div
            className={clsx('sd-switch', props.className)}
            style={props.style}
            data-sd={props.disabled ? 'disabled' : 'enabled'}
            data-sd-checked={props.checked ? 'true' : 'false'}
            onClick={() => props.onChange?.(!props.checked)}
        >
            <div className="sd-switch-thumb">
                <div className="sd-switch-icon">{props.children}</div>
            </div>
        </div>
    )
}

import { Ripple } from '../utils/Ripple.tsx'
import clsx from 'clsx'
import { type CSSProperties } from 'react'
import { IconChecked } from '../utils/icons'

export function Checkbox(props: {
    checked?: boolean
    onChange?: (checked: boolean) => void
    children?: React.ReactNode
    disabled?: boolean
    /**
     * this do not have any functional effect, just change the color
     */
    error?: boolean
    className?: string
    style?: CSSProperties
}) {
    const checkedIcon = props.children || <IconChecked />

    return (
        <Ripple
            style={props.style}
            className={clsx('sd-checkbox', props.className)}
            data-sd={props.disabled ? 'disabled' : 'enabled'}
            data-sd-checked={props.checked ? 'true' : 'false'}
            data-sd-error={props.error ? 'true' : 'false'}
            onClick={() => props.onChange?.(!props.checked)}
        >
            <div className="sd-checkbox-icon">
                {props.checked && checkedIcon}
            </div>
        </Ripple>
    )
}

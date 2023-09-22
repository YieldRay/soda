import './checkbox.scss'
import clsx from 'clsx'
import { Ripple } from '@/utils/Ripple.tsx'
import { IconChecked } from '@/utils/icons.tsx'

/**
 * @specs https://m3.material.io/components/checkbox/specs
 */
export function Checkbox(props: {
    checked?: boolean
    onChange?: (checked: boolean) => void
    children?: React.ReactNode
    disabled?: boolean
    /**
     * This do not have any functional effect, just change color to red
     */
    error?: boolean
    className?: string
    style?: React.CSSProperties
}) {
    const checkedIcon = props.children || <IconChecked />

    return (
        <Ripple
            style={props.style}
            className={clsx('sd-checkbox', props.className)}
            data-sd-disabled={props.disabled}
            data-sd-checked={props.checked}
            data-sd-error={props.error}
            onClick={() => props.onChange?.(!props.checked)}
        >
            <div className="sd-checkbox-icon">
                {props.checked && checkedIcon}
            </div>
        </Ripple>
    )
}

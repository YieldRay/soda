import { ExtendProps } from '@/utils/type'
import './switch.scss'
import clsx from 'clsx'
import { forwardRef, useState } from 'react'

/**
 * @specs https://m3.material.io/components/switch/specs
 */
export const Switch = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        checked?: boolean
        onChange?: (checked: boolean) => void
        defaultChecked?: boolean
        children?: React.ReactNode
        disabled?: boolean
    }>
>(function Switch(
    {
        checked: checked$co,
        defaultChecked = false,
        onChange,
        disabled,
        children,
        ...props
    },
    ref
) {
    const controlled = checked$co !== undefined
    const [checked$un, setChecked$un] = useState(defaultChecked)
    const checked = controlled ? checked$co : checked$un
    const dispatchChange = () => {
        onChange?.(!checked)
        if (!controlled) {
            setChecked$un(!checked$un)
        }
    }
    return (
        <div
            {...props}
            ref={ref}
            tabIndex={0}
            role="switch"
            className={clsx('sd-switch', props.className)}
            data-sd-disabled={disabled}
            data-sd-checked={checked}
            aria-checked={checked}
            onClick={dispatchChange}
            onKeyDown={(e) => {
                if (!disabled && e.key === 'Enter') {
                    dispatchChange()
                }
            }}
        >
            <div className="sd-switch-movable">
                <div className="sd-switch-thumb"></div>
                <div className="sd-switch-icon">{children}</div>
            </div>
        </div>
    )
})

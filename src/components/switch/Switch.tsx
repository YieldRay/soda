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
    { checked, onChange, defaultChecked, children, disabled, ...props },
    ref
) {
    const controlled = checked !== undefined
    const [checked$, setChecked$] = useState(!!defaultChecked)
    const isChecked = controlled ? checked : checked$
    const dispatchChange = () => {
        onChange?.(!checked)
        if (!controlled) {
            setChecked$(!checked$)
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
            data-sd-checked={isChecked}
            aria-checked={isChecked}
            onClick={dispatchChange}
            onKeyDown={(e) => {
                if (!disabled && e.key === 'Enter') {
                    dispatchChange()
                }
            }}
        >
            <div className="sd-switch-thumb">
                <div className="sd-switch-icon">{children}</div>
            </div>
        </div>
    )
})

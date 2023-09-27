import { ExtendProps } from '@/utils/type'
import './switch.scss'
import clsx from 'clsx'
import { forwardRef } from 'react'

export const Switch = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        checked?: boolean
        onChange?: (checked: boolean) => void
        children?: React.ReactNode
        disabled?: boolean
    }>
>(function Switch({ checked, onChange, children, disabled, ...props }, ref) {
    return (
        <div
            {...props}
            ref={ref}
            className={clsx('sd-switch', props.className)}
            data-sd-disabled={disabled}
            data-sd-checked={checked}
            onClick={() => onChange?.(!checked)}
            onKeyDown={(e) => {
                if (onChange && !disabled && e.key === 'Enter') {
                    onChange?.(!checked)
                }
            }}
        >
            <div className="sd-switch-thumb">
                <div className="sd-switch-icon">{children}</div>
            </div>
        </div>
    )
})

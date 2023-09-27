import { ExtendProps } from '@/utils/type'
import './switch.scss'
import clsx from 'clsx'
import { forwardRef } from 'react'

/**
 * @specs https://m3.material.io/components/switch/specs
 */
export const Switch = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        checked?: boolean
        onChange?: () => void
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
            onClick={() => onChange?.()}
            onKeyDown={(e) => {
                if (onChange && !disabled && e.key === 'Enter') {
                    onChange?.()
                }
            }}
        >
            <div className="sd-switch-thumb">
                <div className="sd-switch-icon">{children}</div>
            </div>
        </div>
    )
})

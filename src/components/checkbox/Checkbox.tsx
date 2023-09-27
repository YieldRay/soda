import './checkbox.scss'
import clsx from 'clsx'
import { Ripple } from '@/utils/Ripple'
import { IconChecked } from '@/utils/icons.tsx'
import { forwardRef } from 'react'
import { ExtendProps } from '@/utils/type'

/**
 * @specs https://m3.material.io/components/checkbox/specs
 */
export const Checkbox = forwardRef<
    HTMLElement,
    ExtendProps<{
        checked?: boolean
        onChange?: () => void
        children?: React.ReactNode
        disabled?: boolean
        /**
         * This do not have any functional effect, just change color to red
         */
        error?: boolean
    }>
>(function Checkbox(
    { checked, onChange, children, disabled, error, ...props },
    ref
) {
    const checkedIcon = children || <IconChecked />

    return (
        <Ripple
            ref={ref}
            className={clsx('sd-checkbox', props.className)}
            data-sd-disabled={disabled}
            data-sd-checked={checked}
            data-sd-error={error}
            onClick={() => onChange?.()}
            onKeyDown={(e) => {
                if (onChange && !disabled && e.key === 'Enter') {
                    onChange?.()
                }
            }}
        >
            <div className="sd-checkbox-icon">{checked && checkedIcon}</div>
        </Ripple>
    )
})

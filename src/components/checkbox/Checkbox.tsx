import './checkbox.scss'
import clsx from 'clsx'
import { Ripple } from '@/utils/Ripple'
import { forwardRef } from 'react'
import { ExtendProps } from '@/utils/type'
import { Icon } from '@mdi/react'
import { mdiCheck } from '@mdi/js'

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
    const checkedIcon = children || <Icon path={mdiCheck} />

    return (
        <Ripple
            ref={ref}
            className={clsx('sd-checkbox', props.className)}
            role="checkbox"
            data-sd-disabled={disabled}
            data-sd-checked={checked}
            aria-checked={checked}
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

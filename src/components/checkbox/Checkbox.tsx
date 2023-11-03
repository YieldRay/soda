import './checkbox.scss'
import clsx from 'clsx'
import { Ripple } from '@/utils/Ripple'
import { forwardRef, useState } from 'react'
import { ExtendProps } from '@/utils/type'
import { Icon } from '@mdi/react'
import { mdiCheck } from '@mdi/js'
import { SimpleSodaTransition } from '@/composition/SodaTransition'

/**
 * @specs https://m3.material.io/components/checkbox/specs
 */
export const Checkbox = forwardRef<
    HTMLElement,
    ExtendProps<{
        /**
         * This components is controlled if checked !== undefined
         */
        checked?: boolean
        onChange?: (checked: boolean) => void
        /**
         * For uncontrolled
         */
        defaultChecked?: boolean
        children?: React.ReactNode
        disabled?: boolean
        /**
         * This do not have any functional effect, just change color to red
         */
        error?: boolean
    }>
>(function Checkbox(
    { checked, onChange, defaultChecked, children, disabled, error, ...props },
    ref
) {
    const controlled = checked !== undefined
    const [checked$, setChecked$] = useState(!!defaultChecked)
    const isChecked = controlled ? checked : checked$
    const dispatchChange = () => {
        onChange?.(!isChecked)
        if (!controlled) {
            setChecked$(!checked$)
        }
    }
    const checkedIcon = children || <Icon path={mdiCheck} />

    return (
        <Ripple
            ref={ref}
            className={clsx('sd-checkbox', props.className)}
            role="checkbox"
            data-sd-disabled={disabled}
            data-sd-error={error}
            data-sd-checked={isChecked}
            aria-checked={isChecked}
            onClick={dispatchChange}
            onKeyDown={(e) => {
                if (onChange && !disabled && e.key === 'Enter') {
                    dispatchChange()
                }
            }}
        >
            <div className="sd-checkbox-icon">
                <SimpleSodaTransition state={isChecked}>
                    {checkedIcon}
                </SimpleSodaTransition>
            </div>
        </Ripple>
    )
})

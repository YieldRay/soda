import './radio-button.scss'
import clsx from 'clsx'
import { forwardRef, useContext, useState } from 'react'
import { useRippleRef } from '@/utils/ripple-effect'
import { ExtendProps } from '@/utils/type'
import { RadioGroupContext } from '@/composition/RadioGroup'

/**
 * @specs https://m3.material.io/components/radio-button/specs
 */
export const RadioButton = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        checked?: boolean
        /**
         * Must provide for grouped radio (`inside <RadioGroup>`)
         */
        value?: string
        /**
         * For uncontrolled
         */
        defaultChecked?: boolean
        disabled?: boolean
        onChange?(value?: string): void
        children?: React.ReactNode
    }>
>(function RadioButton(
    {
        checked: initChecked,
        defaultChecked,
        value,
        onChange,
        disabled,
        children,
        className,
        ...props
    },
    ref
) {
    const groupContext = useContext(RadioGroupContext)
    const checked = groupContext ? groupContext.value === value : initChecked
    // if groupContext provide a value, that's to say, current radio-button is in a group
    // so ignore the checked property

    const controlled = checked !== undefined
    const [checked$, setChecked$] = useState(!!defaultChecked)
    const isChecked = controlled ? checked : checked$
    const dispatchChange = () => {
        if (controlled) {
            onChange?.(value)
            groupContext?.onChange?.(value!)
        } else {
            setChecked$(!checked$)
        }
    }

    return (
        <div
            {...props}
            ref={ref}
            role="radio"
            className={clsx('sd-radio_button', className)}
            data-sd-checked={isChecked}
            aria-checked={isChecked}
            data-sd-disabled={disabled}
            onClick={dispatchChange}
            onKeyDown={(e) => {
                if (!disabled && e.key === 'Enter') {
                    dispatchChange()
                }
            }}
        >
            <div className="sd-radio_button-box" ref={useRippleRef()}></div>
            <div className="sd-radio_button-label">{children}</div>
        </div>
    )
})

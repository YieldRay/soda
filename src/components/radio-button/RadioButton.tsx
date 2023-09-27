import './radio-button.scss'
import clsx from 'clsx'
import { useRef, useEffect, forwardRef, useContext } from 'react'
import { rippleEffect } from '@/utils/ripple-effect'
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
        onChange?(value?: string): void
        children?: React.ReactNode
    }>
>(function RadioButton(
    { checked: initChecked, value, onChange, children, className, ...props },
    ref
) {
    const rippleRef = useRef<HTMLDivElement>(null)
    useEffect(() => rippleEffect(rippleRef.current!), [])

    const groupContext = useContext(RadioGroupContext)
    const checked = groupContext ? groupContext.value === value : initChecked
    // if groupContext provide a value, that's to say, current radio-button is in a group
    // so ignore the checked property

    return (
        <div
            {...props}
            ref={ref}
            data-sd-checked={checked}
            className={clsx('sd-radio_button', className)}
            onClick={() => {
                onChange?.(value)
                groupContext?.onChange?.(value!)
            }}
        >
            <div className="sd-radio_button-box" ref={rippleRef}></div>
            <div className="sd-radio_button-label">{children}</div>
        </div>
    )
})

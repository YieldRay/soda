import './radio-button.scss'
import clsx from 'clsx'
import { forwardRef, useContext, useRef, useState } from 'react'
import { ExtendProps } from '@/utils/type'
import { RadioGroupContext } from '@/components/radio-button/RadioGroup'
import { Ripple, type RippleHandle } from '@/ripple/Ripple'

/**
 * According to the official implementation, the ripple effect should not occupy space.
 * Therefore, if the parent container has `overflow: hidden`, make sure that there is enough area to show the ripple effect.
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
        checked: checked$init,
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
    const checked$co = groupContext
        ? groupContext.value === value
        : checked$init
    // if groupContext provide a value, that's to say, current radio-button is in a group
    // so ignore the checked property

    const controlled = checked$co !== undefined
    const [checked$un, setChecked$un] = useState(!!defaultChecked)
    const checked = controlled ? checked$co : checked$un
    const dispatchChange = () => {
        onChange?.(value)
        groupContext?.onChange?.(value!)
        if (!controlled) {
            setChecked$un(!checked$un)
        }
    }

    // for create ripple manually
    const rippleRef = useRef<RippleHandle>(null)

    return (
        <div
            {...props}
            ref={ref}
            tabIndex={disabled ? undefined : 0}
            className={clsx('sd-radio_button', className)}
            role="radio"
            aria-checked={checked}
            data-sd-checked={checked}
            data-sd-disabled={disabled}
            onClick={dispatchChange}
            onKeyDown={(e) => {
                if (!disabled && e.key === 'Enter') {
                    dispatchChange()
                }
            }}
        >
            <div className="sd-radio_button-box">
                <div className="sd-radio_button-circle" />
                <div className="sd-radio_button-ripple">
                    <Ripple ref={rippleRef} />
                </div>
            </div>
            <div
                className="sd-radio_button-label"
                ref={(el) => {
                    if (el) {
                        el.onpointerdown = (e) => {
                            // pointer capture is necessary here
                            el.setPointerCapture(e.pointerId)
                            const removeRipple = rippleRef.current?.rippleAt?.(
                                Infinity,
                                16
                            )
                            el.onpointerup = el.onpointercancel = () => {
                                el.releasePointerCapture(e.pointerId)
                                removeRipple?.()
                            }
                        }
                    }
                }}
            >
                {children}
            </div>
        </div>
    )
})

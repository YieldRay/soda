import './radio-button.scss'
import clsx from 'clsx'
import { forwardRef, useContext, useRef } from 'react'
import { RadioGroupContext } from '@/components/radio-button/RadioGroup'
import { useAutoState } from '@/hooks/use-auto-state'
import { Ripple, type RippleHandle } from '@/ripple/Ripple'
import { ExtendProps } from '@/utils/type'

/**
 * According to the official implementation, the ripple effect should not occupy space.
 * Therefore, if the parent container has `overflow: hidden`, make sure that there is enough area to show the ripple effect.
 *
 * @specs https://m3.material.io/components/radio-button/specs
 */
export const RadioButton = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        /**
         * Must provide for grouped radio (`inside <RadioGroup>`)
         */
        value?: string
        checked?: boolean
        /**
         * For uncontrolled
         */
        defaultChecked?: boolean
        onChange?(checked: boolean): void
        disabled?: boolean
        children?: React.ReactNode
    }>
>(function RadioButton(
    {
        checked: checked$init,
        defaultChecked = false,
        value,
        onChange,
        disabled,
        className,
        children,
        ...props
    },
    ref,
) {
    const groupContext = useContext(RadioGroupContext)
    const checked$co = groupContext
        ? groupContext.value === value
        : checked$init
    // if groupContext provide a value, that's to say, current radio-button is in a group
    // so ignore the checked property

    const [checked, setChecked] = useAutoState<boolean>(
        (v) => {
            onChange?.(v)
            // notify context to change value if current one is checked
            if (v) groupContext?.setValue?.(value!)
        },
        checked$co,
        defaultChecked,
    )

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
            onClick={() => setChecked(!checked)}
            onKeyDown={(e) => {
                if (!disabled && e.key === 'Enter') {
                    setChecked(!checked)
                }
            }}
        >
            <div className="sd-radio_button-box">
                <div className="sd-radio_button-circle" />
                <div className="sd-radio_button-ripple">
                    <Ripple as="div" ref={rippleRef} />
                </div>
            </div>
            <span
                className="sd-radio_button-label"
                ref={(el) => {
                    if (el) {
                        el.onpointerdown = (e) => {
                            // pointer capture is necessary here
                            el.setPointerCapture(e.pointerId)
                            const removeRipple = rippleRef.current?.rippleAt?.(
                                Infinity,
                                16,
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
            </span>
        </div>
    )
})

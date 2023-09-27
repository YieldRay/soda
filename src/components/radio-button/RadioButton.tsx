import './radio-button.scss'
import clsx from 'clsx'
import { useRef, useEffect, forwardRef } from 'react'
import { rippleEffect } from '@/utils/ripple-effect'
import { ExtendProps } from '@/utils/type'

/**
 * @specs https://m3.material.io/components/radio-button/specs
 */
export const RadioButton = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        checked?: boolean
        onChange?(checked: boolean): void
        children?: React.ReactNode
    }>
>(function RadioButton(
    { checked, onChange, children, className, ...props },
    ref
) {
    const rippleRef = useRef<HTMLDivElement>(null)
    useEffect(() => rippleEffect(rippleRef.current!), [])

    return (
        <div
            {...props}
            ref={ref}
            data-sd-checked={checked}
            className={clsx('sd-radio_button', className)}
            onClick={() => onChange?.(!checked)}
        >
            <div className="sd-radio_button-box" ref={rippleRef}></div>
            <div className="sd-radio_button-label">{children}</div>
        </div>
    )
})

import './radio-button.scss'
import clsx from 'clsx'
import omit from 'lodash-es/omit'
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
>(function RadioButton(props, ref) {
    const rippleRef = useRef<HTMLDivElement>(null)
    useEffect(() => rippleEffect(rippleRef.current!), [])

    return (
        <div
            {...omit(props, ['className', 'checked', 'onChange', 'children'])}
            ref={ref}
            data-sd-checked={props.checked}
            className={clsx('sd-radio_button', props.className)}
            onClick={() => props.onChange?.(!props.checked)}
        >
            <div className="sd-radio_button-box" ref={rippleRef}></div>
            <div className="sd-radio_button-label">{props.children}</div>
        </div>
    )
})

import { useRef, useEffect } from 'react'
import { ripple } from '../utils/ripple'
import clsx from 'clsx'

/**
 * @specs https://m3.material.io/components/radio-button/specs
 */
export function RadioButton(props: {
    checked?: boolean
    onChange?(checked: boolean): void
    className?: string
    children?: React.ReactNode
}) {
    const rippleRef = useRef<HTMLDivElement>(null)
    useEffect(() => ripple(rippleRef.current!))

    return (
        <>
            <div
                data-sd-checked={props.checked ? 'true' : 'false'}
                className={clsx('sd-radio_button', props.className)}
                onClick={() => props.onChange?.(!props.checked)}
            >
                <div className="sd-radio_button-box" ref={rippleRef}></div>
                <div className="sd-radio_button-label">{props.children}</div>
            </div>
        </>
    )
}

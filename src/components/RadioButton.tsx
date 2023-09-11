import { useRef, useEffect } from 'react'
import { ripple } from '../utils/ripple'
import clsx from 'clsx'

export function RadioButton(props: {
    checked?: boolean
    onChange?(checked: boolean): void
    className?: string
}) {
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => ripple(inputRef.current!))

    return (
        <div
            data-sd-checked={props.checked ? 'true' : 'false'}
            className={clsx('sd-radio_button', props.className)}
            ref={inputRef}
            onClick={() => props.onChange?.(!props.checked)}
        ></div>
    )
}

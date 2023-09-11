import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import { ripple } from '../utils/ripple'
import clsx from 'clsx'

// @specs https://m3.material.io/components/chips/specs
export const Chip = forwardRef<
    HTMLDivElement,
    {
        sd: 'outlined' | 'tonal'
        children: React.ReactNode
        className?: string
        leadingIcon?: React.ReactNode
        trailingIcon?: React.ReactNode
        enabled?: boolean
        onClick?: () => void
    }
>(function (props, ref) {
    const divRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        return ripple(divRef.current!)
    })
    useImperativeHandle(ref, () => {
        return divRef.current!
    })

    return (
        <div
            className={clsx('sd-chip', `sd-chip-${props.sd}`, props.className)}
            onClick={props.onClick}
            ref={divRef}
            data-sd={props.enabled ? 'enabled' : 'disabled'}
        >
            {props.leadingIcon && (
                <div className="sd-chip-leading_icon">{props.leadingIcon}</div>
            )}

            <div className="sd-chip-label_text">{props.children}</div>

            {props.trailingIcon && (
                <div className="sd-chip-trailing_icon">
                    {props.trailingIcon}
                </div>
            )}
        </div>
    )
})

import { forwardRef } from 'react'
import clsx from 'clsx'
import { Ripple } from '../utils/Ripple.tsx'

/**
 * @specs https://m3.material.io/components/chips/specs
 */
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
    return (
        <Ripple
            className={clsx('sd-chip', `sd-chip-${props.sd}`, props.className)}
            onClick={props.onClick}
            ref={ref}
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
        </Ripple>
    )
})

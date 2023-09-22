import './chip.scss'
import clsx from 'clsx'
import { Ripple } from '../../utils/Ripple.tsx'

/**
 * @specs https://m3.material.io/components/chips/specs
 */
export function Chip(props: {
    sd: 'outlined' | 'tonal'
    children: React.ReactNode
    className?: string
    leadingIcon?: React.ReactNode
    trailingIcon?: React.ReactNode
    disabled?: boolean
    onClick?: () => void
}) {
    return (
        <Ripple
            className={clsx('sd-chip', `sd-chip-${props.sd}`, props.className)}
            onClick={props.onClick}
            data-sd-disabled={props.disabled}
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
}

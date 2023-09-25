import './chip.scss'
import clsx from 'clsx'
import { Ripple } from '@/utils/Ripple.tsx'
import { forwardRef } from 'react'
import { ExtendProps } from '@/utils/type.ts'
import omit from 'lodash-es/omit'

/**
 * @specs https://m3.material.io/components/chips/specs
 */
export const Chip = forwardRef<
    HTMLElement,
    ExtendProps<{
        sd: 'outlined' | 'tonal'
        children: React.ReactNode
        className?: string
        leadingIcon?: React.ReactNode
        trailingIcon?: React.ReactNode
        disabled?: boolean
        onClick?: () => void
    }>
>(function Chip(props, ref) {
    return (
        <Ripple
            {...omit(props, [
                'sd',
                'children',
                'className',
                'leadingIcon',
                'trailingIcon',
                'disabled',
                'onClick',
                'as',
            ])}
            ref={ref}
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
})

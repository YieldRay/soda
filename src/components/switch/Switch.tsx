import { ExtendProps } from '@/utils/type'
import './switch.scss'
import clsx from 'clsx'
import { omit } from 'lodash-es'
import { forwardRef } from 'react'

export const Switch = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        checked?: boolean
        onChange?: (checked: boolean) => void
        children?: React.ReactNode
        disabled?: boolean
    }>
>(function Switch(props, ref) {
    return (
        <div
            {...omit(props, ['checked', 'onChange', 'children', 'disabled'])}
            ref={ref}
            className={clsx('sd-switch', props.className)}
            data-sd-disabled={props.disabled}
            data-sd-checked={props.checked}
            onClick={() => props.onChange?.(!props.checked)}
        >
            <div className="sd-switch-thumb">
                <div className="sd-switch-icon">{props.children}</div>
            </div>
        </div>
    )
})

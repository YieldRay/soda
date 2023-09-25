import './badge.scss'
import { forwardRef } from 'react'
import clsx from 'clsx'
import omit from 'lodash-es/omit'
import { ExtendProps } from '@/utils/type'

/**
 * @specs https://m3.material.io/components/badges/specs
 */
export const Badge = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        children?: React.ReactNode
        label?: React.ReactNode
        /**
         * do not need specify this property by default, as it will automatically
         * choose small for empty label and large for none-empty label
         */
        sd?: 'none' | 'small' | 'large'
    }>
>(function Badge(props, ref) {
    return (
        <div
            {...omit(props, ['className', 'children', 'sd'])}
            className={clsx('sd-badge', props.className)}
            ref={ref}
            data-sd={props.sd || (props.label ? 'large' : 'small')}
        >
            {props.children}
            <div className="sd-badge-label">{props.label}</div>
        </div>
    )
})

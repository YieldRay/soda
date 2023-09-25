import './button.scss'
import clsx from 'clsx'
import omit from 'lodash-es/omit'
import { Ripple } from '@/utils/Ripple'
import { ExtendProps, TagNameString } from '@/utils/type'
import { forwardRef } from 'react'

/**
 * @specs https://m3.material.io/components/buttons/specs
 */
export const Button = forwardRef<
    HTMLElement,
    ExtendProps<{
        as?: TagNameString
        /**
         * @default filled
         */
        sd?: 'outlined' | 'filled' | 'elevated' | 'tonal' | 'text'
        disabled?: boolean
        children?: React.ReactNode
    }>
>(function Button(props, ref) {
    return (
        <Ripple
            {...omit(props, ['as', 'sd', 'className', 'disabled', 'children'])}
            ref={ref}
            as={props.as || 'button'}
            className={clsx(
                'sd-button',
                `sd-button-${props.sd || 'filled'}`,
                props.className
            )}
            data-sd-disabled={props.disabled}
        >
            {props.children}
        </Ripple>
    )
})

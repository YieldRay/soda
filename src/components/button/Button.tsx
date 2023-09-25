import './button.scss'
import clsx from 'clsx'
import omit from 'lodash-es/omit'
import { Ripple } from '@/utils/Ripple'
import { ExtendProps, TagNameString } from '@/utils/type'

/**
 * @specs https://m3.material.io/components/buttons/specs
 */
export function Button(
    props: ExtendProps<{
        as?: TagNameString
        /**
         * @default filled
         */
        sd?: 'outlined' | 'filled' | 'elevated' | 'tonal' | 'text'
        className?: string
        disabled?: boolean
        children?: React.ReactNode
    }>
) {
    return (
        <Ripple
            {...omit(props, ['as', 'sd', 'className', 'disabled', 'children'])}
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
}

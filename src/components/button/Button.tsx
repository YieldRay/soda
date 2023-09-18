import './button.scss'
import clsx from 'clsx'
import omit from 'lodash-es/omit'
import { Ripple } from '@/utils/Ripple'

/**
 * @specs https://m3.material.io/components/buttons/specs
 */
export function Button(
    props: {
        as?: string
        /**
         * default filled
         */
        sd?: 'outlined' | 'filled' | 'elevated' | 'tonal' | 'text'
        className?: string
        disabled?: boolean
        children?: React.ReactNode
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } & Record<string, any>
) {
    return (
        <Ripple
            {...omit(props, ['as', 'sd', 'className'])}
            as={props.as ?? 'button'}
            className={clsx(
                'sd-button',
                `sd-button-${props.sd ?? 'filled'}`,
                props.className
            )}
            data-sd-disabled={props.disabled}
        ></Ripple>
    )
}

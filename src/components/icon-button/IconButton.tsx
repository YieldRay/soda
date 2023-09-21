import './icon-button.scss'
import { Ripple } from '@/utils/Ripple'
import clsx from 'clsx'
import omit from 'lodash-es/omit'

/**
 * @specs https://m3.material.io/components/icon-buttons/specs
 */
export function IconButton(
    props: {
        as?: string
        /**
         * @default standard
         */
        sd?: 'standard' | 'filled' | 'tonal' | 'outlined'
        children?: React.ReactNode
        className?: string
        disabled?: boolean
        /**
         * Standard button is unselected by default,
         * other button is selected by default.
         */
        selected?: boolean
    } & Omit<React.HTMLProps<HTMLDivElement>, 'ref'>
) {
    const sd = props.sd ?? 'standard'
    const selected = Reflect.has(props, 'selected')
        ? props.selected!
        : sd === 'standard'
        ? false
        : true

    return (
        <Ripple
            {...omit(props, [
                'as',
                'sd',
                'className',
                'disabled',
                'selected',
                'data-sd-selected',
                'data-sd-disabled',
            ])}
            as={props.as}
            className={clsx(
                'sd-icon_button',
                `sd-icon_button-${sd}`,
                props.className
            )}
            data-sd-selected={selected}
            data-sd-disabled={props.disabled}
        >
            <div className="sd-icon_button-icon">{props.children}</div>
        </Ripple>
    )
}

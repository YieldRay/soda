import './icon-button.scss'
import { Ripple } from '@/utils/Ripple'
import { ExtendProps, TagNameString } from '@/utils/type'
import clsx from 'clsx'
import omit from 'lodash-es/omit'
import { forwardRef } from 'react'

/**
 * @specs https://m3.material.io/components/icon-buttons/specs
 */
export const IconButton = forwardRef<
    HTMLElement,
    ExtendProps<{
        as?: TagNameString
        /**
         * @default standard
         */
        sd?: 'standard' | 'filled' | 'tonal' | 'outlined'
        children?: React.ReactNode
        disabled?: boolean
        /**
         * Standard button is unselected by default,
         * other button is selected by default.
         */
        selected?: boolean
    }>
>(function IconButton({ as, children, className, disabled, ...props }, ref) {
    const sd = props.sd || 'standard'
    const selected = Reflect.has(props, 'selected')
        ? props.selected!
        : sd === 'standard'
        ? false
        : true

    return (
        <Ripple
            {...omit(props, ['sd', 'selected'])}
            ref={ref}
            className={clsx(
                'sd-icon_button',
                `sd-icon_button-${sd}`,
                className
            )}
            as={as}
            data-sd-selected={selected}
            data-sd-disabled={disabled}
        >
            <div className="sd-icon_button-icon">{children}</div>
        </Ripple>
    )
})

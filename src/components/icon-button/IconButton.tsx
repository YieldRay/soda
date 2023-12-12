import './icon-button.scss'
import { Ripple } from '@/ripple/Ripple'
import { ExtendProps } from '@/utils/type'
import clsx from 'clsx'
import { forwardRef } from 'react'
import { Icon } from '@mdi/react'

/**
 * @specs https://m3.material.io/components/icon-buttons/specs
 */
export const IconButton = forwardRef<
    HTMLElement,
    ExtendProps<{
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

        path?: string
    }>
>(function IconButton(
    {
        children,
        className,
        disabled,
        sd: initSd,
        selected: initSelected,
        path,
        ...props
    },
    ref
) {
    const sd = initSd || 'standard'
    const selected =
        initSelected !== undefined
            ? initSelected!
            : sd === 'standard'
            ? false
            : true

    return (
        <Ripple
            {...props}
            ref={ref}
            className={clsx(
                'sd-icon_button',
                `sd-icon_button-${sd}`,
                className
            )}
            as="button"
            data-sd-selected={selected}
            data-sd-disabled={disabled}
        >
            <div className="sd-icon_button-icon">
                {path ? <Icon path={path}></Icon> : children}
            </div>
        </Ripple>
    )
})

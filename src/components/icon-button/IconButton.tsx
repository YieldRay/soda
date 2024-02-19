import './icon-button.scss'
import clsx from 'clsx'
import { forwardRef } from 'react'
import { Icon } from '@mdi/react'
import { Ripple } from '@/ripple/Ripple'
import { ExtendProps } from '@/utils/type'

/**
 * @specs https://m3.material.io/components/icon-buttons/specs
 */
export const IconButton = forwardRef<
    HTMLElement,
    ExtendProps<{
        /**
         * @default standard
         */
        variant?: 'standard' | 'filled' | 'tonal' | 'outlined'
        /**
         * Standard button is unselected by default,
         * other button is selected by default.
         */
        selected?: boolean
        path?: string
        rotate?: number
        disabled?: boolean
        children?: React.ReactNode
    }>
>(function IconButton(
    {
        variant = 'standard',
        selected: initSelected,
        path,
        rotate,
        disabled,
        className,
        children,
        ...props
    },
    ref,
) {
    const selected =
        initSelected !== undefined
            ? initSelected!
            : variant === 'standard'
              ? false
              : true

    return (
        <Ripple
            {...props}
            ref={ref}
            className={clsx(
                'sd-icon_button',
                `sd-icon_button-${variant}`,
                className,
            )}
            as="button"
            data-sd-selected={selected}
            data-sd-disabled={disabled}
        >
            <div className="sd-icon_button-icon">
                {path ? (
                    <Icon size={1} rotate={rotate} path={path} />
                ) : (
                    children
                )}
            </div>
        </Ripple>
    )
})

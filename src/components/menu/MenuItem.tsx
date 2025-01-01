import './menu.scss'
import clsx from 'clsx'
import { forwardRef } from 'react'
import { Ripple } from '@/ripple/Ripple'
import { ExtendProps } from '@/utils/type'

export interface Props {
    leadingIcon?: React.ReactNode
    trailingIcon?: React.ReactNode
    trailingText?: React.ReactNode
    children?: React.ReactNode
    disabled?: boolean
}

/**
 * use `<Menu>` to wrap it
 */
export const MenuItem = forwardRef<HTMLElement, ExtendProps<Props>>(
    function MenuItem(
        {
            leadingIcon,
            trailingIcon,
            trailingText,
            disabled,
            className,
            children,
            ...props
        },
        ref,
    ) {
        return (
            <Ripple
                {...props}
                ref={ref}
                as="li"
                className={clsx('sd-menu_item', className)}
                data-sd-disabled={disabled}
                aria-disabled={disabled}
                role="menuitem"
                tabIndex={disabled ? undefined : 0}
            >
                {leadingIcon && (
                    <div className="sd-menu_item-leading_icon">
                        {leadingIcon}
                    </div>
                )}

                <div className="sd-menu_item-supporting_text">{children}</div>

                {trailingIcon && (
                    <div className="sd-menu_item-trailing_icon">
                        {trailingIcon}
                    </div>
                )}
                {trailingText && (
                    <div className="sd-menu_item-trailing_text">
                        {trailingText}
                    </div>
                )}
            </Ripple>
        )
    },
)

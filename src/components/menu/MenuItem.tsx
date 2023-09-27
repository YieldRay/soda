import './menu.scss'
import omit from 'lodash-es/omit'
import clsx from 'clsx'
import { Ripple } from '@/utils/Ripple'
import { ExtendProps } from '@/utils/type'
import { forwardRef } from 'react'

export interface Props {
    leadingIcon?: React.ReactNode
    children?: React.ReactNode
    trailingIcon?: React.ReactNode
    trailingText?: React.ReactNode
    disabled?: boolean
}

/**
 * use `<Menu>` to wrap it
 */
export const MenuItem = forwardRef<HTMLElement, ExtendProps<Props>>(
    function MenuItem(
        {
            className,
            leadingIcon,
            children,
            trailingIcon,
            trailingText,
            disabled,
            ...props
        },
        ref
    ) {
        return (
            <Ripple
                {...omit(props, ['as'])}
                ref={ref}
                className={clsx('sd-menu_item', className)}
                data-sd-disabled={disabled}
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
    }
)

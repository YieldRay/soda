import './menu.scss'
import omit from 'lodash-es/omit'
import clsx from 'clsx'
import { Ripple } from '@/utils/Ripple'
import { ExtendProps, TagNameString } from '@/utils/type'
import { forwardRef } from 'react'

/**
 * use `<Menu>` to wrap it
 */
export const MenuItem = forwardRef<
    HTMLElement,
    ExtendProps<{
        leadingIcon?: React.ReactNode
        children?: React.ReactNode
        trailingIcon?: React.ReactNode
        trailingText?: React.ReactNode
        disabled?: boolean
        as?: TagNameString
    }>
>(function MenuItem(props, ref) {
    return (
        <Ripple
            {...omit(
                props,
                'className',
                'leadingIcon',
                'children',
                'trailingIcon',
                'trailingText',
                'disabled'
            )}
            ref={ref}
            className={clsx('sd-menu_item', props.className)}
            data-sd-disabled={props.disabled}
        >
            {props.leadingIcon && (
                <div className="sd-menu_item-leading_icon">
                    {props.leadingIcon}
                </div>
            )}

            <div className="sd-menu_item-supporting_text">{props.children}</div>

            {props.trailingIcon && (
                <div className="sd-menu_item-trailing_icon">
                    {props.trailingIcon}
                </div>
            )}
            {props.trailingText && (
                <div className="sd-menu_item-trailing_text">
                    {props.trailingText}
                </div>
            )}
        </Ripple>
    )
})

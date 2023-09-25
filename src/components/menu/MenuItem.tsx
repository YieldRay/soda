import './menu.scss'
import omit from 'lodash-es/omit'
import clsx from 'clsx'
import { Ripple } from '@/utils/Ripple'
import { ExtendProps, TagNameString } from '@/utils/type'

/**
 * use `<Menu>` to wrap it
 */
export function MenuItem(
    props: ExtendProps<{
        leadingIcon?: React.ReactNode
        children?: React.ReactNode
        trailingIcon?: React.ReactNode
        trailingText?: React.ReactNode
        disabled?: boolean
        as?: TagNameString
    }>
) {
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
}

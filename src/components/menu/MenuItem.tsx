import './menu.scss'
import omit from 'lodash-es/omit'
import { Ripple } from '@/utils/Ripple'
import clsx from 'clsx'
import { ExtendProps } from '@/utils/type'

/**
 * use `<Menu>` to wrap it
 */
export function MenuItem(
    props: Omit<
        ExtendProps<{
            leadingIcon?: React.ReactNode
            children?: React.ReactNode
            trailingIcon?: React.ReactNode
            trailingText?: React.ReactNode
            disabled?: boolean
        }>,
        'ref'
    >
) {
    return (
        <Ripple
            as="div"
            className={clsx('sd-menu_item', props.className)}
            {...omit(props, 'className')}
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

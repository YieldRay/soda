import './tab.scss'
import clsx from 'clsx'
import { Ripple } from '@/utils/Ripple'
import omit from 'lodash-es/omit'
import { ExtendProps, TagNameString } from '@/utils/type'
import { forwardRef } from 'react'

/**
 * use `<Tab>` to wrap it
 */
export const TabItem = forwardRef<
    HTMLElement,
    ExtendProps<{
        children?: React.ReactNode
        icon?: React.ReactNode
        active?: boolean
        as?: TagNameString
    }>
>(function TabItem(props, ref) {
    return (
        <Ripple
            {...omit(props, 'className')}
            ref={ref}
            as={props.as}
            className={clsx('sd-tab_item', props.className)}
            data-sd-active={props.active}
        >
            {props.icon && <div className="sd-tab_item-icon">{props.icon}</div>}
            <div className="sd-tab_item-label_text">{props.children}</div>
            <div className="sd-tab_item-active_indicator"></div>
        </Ripple>
    )
})

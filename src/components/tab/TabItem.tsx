import './tab.scss'
import clsx from 'clsx'
import { Ripple } from '@/utils/Ripple'
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
>(function TabItem({ children, icon, active, as, className, ...props }, ref) {
    return (
        <Ripple
            {...props}
            ref={ref}
            as={as}
            className={clsx('sd-tab_item', className)}
            data-sd-active={active}
        >
            {icon && <div className="sd-tab_item-icon">{icon}</div>}
            <div className="sd-tab_item-label_text">{children}</div>
            <div className="sd-tab_item-active_indicator"></div>
        </Ripple>
    )
})

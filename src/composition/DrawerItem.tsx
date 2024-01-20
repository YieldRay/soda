import './DrawerItem.scss'
import clsx from 'clsx'
import { Ripple } from '@/ripple/Ripple'
import { ExtendProps } from '@/utils/type'
import { forwardRef } from 'react'

/**
 * To make a NavigationDrawer, use a `<SideSheet>` to contain `<DrawerItem>`.
 * This component has ref forwarded.
 */
export const DrawerItem = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        icon?: React.ReactNode
        badge?: React.ReactNode
        active?: boolean
        children?: React.ReactNode
    }>
>(({ icon, badge, children, className, active, ...props }, ref) => (
    <Ripple
        {...props}
        ref={ref}
        data-sd-active={active}
        className={clsx('sd-drawer_item', className)}
    >
        <div className="sd-drawer_item-icon">{icon}</div>
        <div className="sd-drawer_item-label">{children}</div>
        <div className="sd-drawer_item-badge">{badge}</div>
    </Ripple>
))

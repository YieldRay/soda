import './tab.scss'
import clsx from 'clsx'
import { Ripple } from '@/utils/Ripple'
import { ExtendProps } from '@/utils/type'
import { forwardRef, useContext } from 'react'
import { TabContext } from '.'

/**
 * Use `<Tab>` to wrap it
 *
 * It's style depends on whether you provide `icon`
 */
export const TabItem = forwardRef<
    HTMLElement,
    ExtendProps<{
        value: string
        children?: React.ReactNode
        icon?: React.ReactNode
        active?: boolean
    }>
>(function TabItem(
    { children, icon, value, active: initActive, className, onClick, ...props },
    ref
) {
    const tabContext = useContext(TabContext)
    const active = tabContext ? tabContext.value === value : initActive

    return (
        <Ripple
            {...props}
            ref={ref}
            className={clsx('sd-tab_item', className)}
            data-sd-active={active}
            onClick={(e) => {
                onClick?.(e)
                tabContext?.onChange?.(value)
            }}
        >
            {icon && <div className="sd-tab_item-icon">{icon}</div>}
            <div className="sd-tab_item-label_text">{children}</div>
            <div className="sd-tab_item-active_indicator"></div>
        </Ripple>
    )
})

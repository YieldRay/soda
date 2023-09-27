import './tab.scss'
import clsx from 'clsx'
import { Ripple } from '@/utils/Ripple'
import { ExtendProps, TagNameString } from '@/utils/type'
import { forwardRef, useContext } from 'react'
import { TabContext } from '.'

/**
 * Use `<Tab>` to wrap it
 */
export const TabItem = forwardRef<
    HTMLElement,
    ExtendProps<{
        value: string
        children?: React.ReactNode
        icon?: React.ReactNode
        active?: boolean
        as?: TagNameString
    }>
>(function TabItem(
    {
        children,
        icon,
        value,
        active: initActive,
        as,
        className,
        onClick,
        ...props
    },
    ref
) {
    const tabContext = useContext(TabContext)
    const active = tabContext ? tabContext.value === value : initActive

    return (
        <Ripple
            {...props}
            ref={ref}
            as={as}
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

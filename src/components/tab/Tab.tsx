import './tab.scss'
import clsx from 'clsx'
import { Ripple } from '@/ripple/Ripple'
import { ExtendProps } from '@/utils/type'
import { forwardRef, useContext } from 'react'
import { TabContext } from '.'

/**
 * Use `<Tab>` to wrap it
 *
 * It's style depends on whether you provide `icon`
 */
export const Tab = forwardRef<
    HTMLElement,
    ExtendProps<{
        value: string
        children?: React.ReactNode
        icon?: React.ReactNode
        active?: boolean
    }>
>(function Tab(
    { children, icon, value, active: initActive, className, onClick, ...props },
    ref
) {
    const tabContext = useContext(TabContext)
    const active = tabContext ? tabContext.value === value : initActive

    return (
        <Ripple
            {...props}
            ref={ref}
            tabIndex={0}
            className={clsx('sd-tab', className)}
            data-sd-active={active}
            onClick={(e) => {
                onClick?.(e)
                tabContext?.onChange?.(value)
            }}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    tabContext?.onChange?.(value)
                }
            }}
        >
            <div className="sd-tab-helper">
                {icon && <div className="sd-tab-icon">{icon}</div>}
                <div className="sd-tab-label_text">{children}</div>
                <div className="sd-tab-active_indicator"></div>
            </div>
        </Ripple>
    )
})

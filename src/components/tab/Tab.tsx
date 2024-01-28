import './tab.scss'
import clsx from 'clsx'
import { Ripple } from '@/ripple/Ripple'
import { ExtendProps } from '@/utils/type'
import { forwardRef, useContext } from 'react'
import { TabContext } from './Tabs'
import { useMergeEventHandlers } from '@/hooks/use-merge'

/**
 * Use `<Tab>` to wrap it
 *
 * It's style depends on whether you provide `icon`
 */
export const Tab = forwardRef<
    HTMLElement,
    ExtendProps<{
        index: number
        children?: React.ReactNode
        icon?: React.ReactNode
        active?: boolean
    }>
>(function Tab(
    { children, icon, index, active: initActive = false, className, ...props },
    ref
) {
    const tabContext = useContext(TabContext)
    const active = tabContext ? tabContext.index === index : initActive

    const dispatchChange = () => {
        if (active) return
        if (!tabContext) return
        tabContext.setIndex?.(index)
    }

    return (
        <Ripple
            {...props}
            ref={ref}
            tabIndex={0}
            className={clsx('sd-tab', className)}
            data-sd-active={active}
            onClick={useMergeEventHandlers(props.onClick, dispatchChange)}
            onKeyDown={useMergeEventHandlers(props.onKeyDown, (e) => {
                if (e.key === 'Enter') {
                    dispatchChange()
                }
            })}
        >
            <div className="sd-tab-helper">
                {icon && <div className="sd-tab-icon">{icon}</div>}
                <div className="sd-tab-label_text">{children}</div>
                <div className="sd-tab-active_indicator"></div>
            </div>
        </Ripple>
    )
})

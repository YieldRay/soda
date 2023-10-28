import './tab.scss'
import clsx from 'clsx'
import { ExtendProps } from '@/utils/type'
import { forwardRef, useContext } from 'react'
import { TabContext } from '.'

/**
 * Use `<Tab>` to wrap it
 */
export const TabPanel = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        value: string
        children?: React.ReactNode
        active?: boolean
    }>
>(function TabPanel(
    { children, value, active: initActive, className, onClick, ...props },
    ref
) {
    const tabContext = useContext(TabContext)
    const active = tabContext ? tabContext.value === value : initActive

    if (!active) return <></>

    return (
        <div
            {...props}
            ref={ref}
            className={clsx('sd-tab_item', className)}
            data-sd-active={active}
            onClick={(e) => {
                onClick?.(e)
                tabContext?.onChange?.(value)
            }}
        >
            {children}
        </div>
    )
})

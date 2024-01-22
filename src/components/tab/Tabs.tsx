import './tab.scss'
import clsx from 'clsx'
import { ExtendProps } from '@/utils/type'
import { forwardRef, createContext } from 'react'
import { useAutoState } from '@/hooks/use-auto-state'

export const TabContext = createContext<
    | {
          value?: string
          onChange?: (value: string) => void
      }
    | undefined
>(undefined)

/**
 * You can set its width like `style={{width: "100vw"}}` to occupy more width.
 * Child elements (`<TabItem>`) will divide its width equally.
 *
 * Either `value` or `defaultValue` MUST be set
 *
 * @specs https://m3.material.io/components/tabs/specs
 */
export const Tabs = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        children?: React.ReactNode
        value?: string
        defaultValue?: string
        onChange?: (value: string) => void
    }>
>(function Tab(
    { value: value$co, onChange, defaultValue, className, children, ...props },
    ref
) {
    const [value, setValue] = useAutoState(onChange, value$co, defaultValue!)

    return (
        <div {...props} ref={ref} className={clsx('sd-tabs', className)}>
            <TabContext.Provider value={{ value, onChange: setValue }}>
                {children}
            </TabContext.Provider>
        </div>
    )
})

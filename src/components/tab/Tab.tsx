import './tab.scss'
import clsx from 'clsx'
import { ExtendProps } from '@/utils/type'
import { forwardRef, createContext } from 'react'

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
 * @specs https://m3.material.io/components/tabs/specs
 */
export const Tab = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        children?: React.ReactNode
        value?: string
        onChange?: (value: string) => void
    }>
>(function Tab({ className, children, value, onChange, ...props }, ref) {
    return (
        <div {...props} ref={ref} className={clsx('sd-tab', className)}>
            <TabContext.Provider value={{ value, onChange }}>
                {children}
            </TabContext.Provider>
        </div>
    )
})

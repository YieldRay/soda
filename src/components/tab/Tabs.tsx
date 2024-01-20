import './tab.scss'
import clsx from 'clsx'
import { ExtendProps } from '@/utils/type'
import { forwardRef, createContext, useState } from 'react'

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
    const controlled = value$co !== undefined
    const [value$un, setValue$un] = useState(defaultValue)
    const value = controlled ? value$co : value$un
    const dispatchChange = (v: string) => {
        onChange?.(v)
        if (!controlled) {
            setValue$un(v)
        }
    }
    return (
        <div {...props} ref={ref} className={clsx('sd-tabs', className)}>
            <TabContext.Provider value={{ value, onChange: dispatchChange }}>
                {children}
            </TabContext.Provider>
        </div>
    )
})

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
export const Tab = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        children?: React.ReactNode
        value?: string
        defaultValue?: string
        onChange?: (value: string) => void
    }>
>(function Tab(
    { className, children, value, onChange, defaultValue, ...props },
    ref
) {
    const controlled = value !== undefined
    const [value$, setValue$] = useState(defaultValue)
    const realValue = controlled ? value : value$
    const dispatchChange = (v: string) => {
        if (controlled) {
            onChange?.(v)
        } else {
            setValue$(v)
        }
    }
    return (
        <div {...props} ref={ref} className={clsx('sd-tab', className)}>
            <TabContext.Provider
                value={{ value: realValue, onChange: dispatchChange }}
            >
                {children}
            </TabContext.Provider>
        </div>
    )
})

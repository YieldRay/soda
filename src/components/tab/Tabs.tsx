import './tab.scss'
import clsx from 'clsx'
import { createContext, forwardRef, useRef } from 'react'
import { useAutoState } from '@/hooks/use-auto-state'
import { ExtendProps } from '@/utils/type'

export const TabContext = createContext<
    | {
          index?: number
          setIndex?: (index: number) => void
          lastIndex?: number
          allowTransitionRef?: React.MutableRefObject<boolean>
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
        index?: number
        defaultIndex?: number
        onChange?: (index: number) => void
        noTransition?: boolean
    }>
>(function Tab(
    {
        index: index$co,
        onChange,
        defaultIndex,
        noTransition,
        className,
        children,
        ...props
    },
    ref,
) {
    const [index, setIndex] = useAutoState(onChange, index$co, defaultIndex!)
    const lastIndexRef = useRef(-1)
    const allowTransitionRef = useRef(false)

    return (
        <div {...props} ref={ref} className={clsx('sd-tabs', className)}>
            <TabContext.Provider
                value={{
                    index,
                    setIndex: (i) => {
                        lastIndexRef.current = index
                        setIndex(i)
                        if (!noTransition) allowTransitionRef.current = true
                    },
                    lastIndex: lastIndexRef.current,
                    allowTransitionRef,
                }}
            >
                {children}
            </TabContext.Provider>
        </div>
    )
})

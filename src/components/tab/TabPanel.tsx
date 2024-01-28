import './tab.scss'
import clsx from 'clsx'
import { ExtendProps } from '@/utils/type'
import { useContext, useEffect, useRef, useState } from 'react'
import { TabContext } from './Tabs'
import {
    startViewTransitionFlushSync,
    isViewTransitionSupported,
} from '@/utils/view-transition'

/**
 * Use `<Tab>` to wrap it
 *
 * This component has no ref forwarded.
 */
export function TabPanel({
    children,
    index,
    active: initActive,
    className,
    ...props
}: ExtendProps<{
    index: number
    children?: React.ReactNode
    active?: boolean
}>) {
    const tabContext = useContext(TabContext)
    const active = tabContext ? tabContext.index === index : initActive

    const ref = useRef<HTMLDivElement>(null)
    const [show, setShow] = useState(
        isViewTransitionSupported
            ? tabContext?.allowTransitionRef?.current
                ? false
                : true
            : false
    )

    useEffect(() => {
        if (!active) return
        if (!tabContext?.allowTransitionRef?.current) return

        const l2r = [
            () => ref.current?.classList.add('sd-vt-tab_slide_left_to_right'),
            () =>
                ref.current?.classList.remove('sd-vt-tab_slide_left_to_right'),
        ]

        const r2l = [
            () => ref.current?.classList.add('sd-vt-tab_slide_right_to_left'),
            () =>
                ref.current?.classList.remove('sd-vt-tab_slide_right_to_left'),
        ]

        startViewTransitionFlushSync(() => {
            setShow(true)
        }, ...(index > (tabContext?.lastIndex || -1) ? r2l : l2r))
    }, [active, index, tabContext])

    if (!active) return <></>

    return (
        show && (
            <div
                {...props}
                ref={ref}
                className={clsx('sd-tab_panel', className)}
                data-sd-active={active}
            >
                {children}
            </div>
        )
    )
}

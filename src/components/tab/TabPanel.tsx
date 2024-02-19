import './tab.scss'
import clsx from 'clsx'
import { useContext, useLayoutEffect, useRef, useState } from 'react'
import { ExtendProps } from '@/utils/type'
import {
    isViewTransitionSupported,
    startViewTransitionFlushSync,
} from '@/utils/view-transition'
import { TabContext } from './Tabs'

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
            : false,
    )

    useLayoutEffect(() => {
        if (!active) return
        if (!tabContext?.allowTransitionRef?.current) return
        const el = ref.current
        if (!el) return

        const l2r = [
            () => el.classList.add('sd-vt-tab_slide_left_to_right'),
            () => el.classList.remove('sd-vt-tab_slide_left_to_right'),
        ]

        const r2l = [
            () => el.classList.add('sd-vt-tab_slide_right_to_left'),
            () => el.classList.remove('sd-vt-tab_slide_right_to_left'),
        ]

        startViewTransitionFlushSync(
            () => {
                setShow(true)
            },
            ...(index > (tabContext?.lastIndex || -1) ? r2l : l2r),
        )
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

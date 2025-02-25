import { useRef, useState } from 'react'
import './RefreshIndicator.scss'
import clsx from 'clsx'
import { mdiRefresh } from '@mdi/js'
import Icon from '@mdi/react'
import { useEventListenerEffect } from '@/hooks/use-event-listener'
import { clamp } from '@/utils/misc'
import { ExtendProps } from '@/utils/type'

/**
 * When the child's Scrollable descendant overscrolls, an animated circular progress indicator is faded into view. When the scroll ends, if the indicator has been dragged far enough for it to become completely opaque, the onRefresh callback is called. The callback is expected to update the scrollable's contents and then complete the Promise it returns. The refresh indicator disappears after the callback's Promise has completed.
 */
export function RefreshIndicator({
    movement = 50,
    children,
    onRefresh,
    disabled,
    className,
    style,
    ...props
}: ExtendProps<{
    onRefresh?: () => Promise<void>
    movement?: number
    /**
     * The component need to track if the children is at the top of the scrollable element, if not, the refresh indicator will not be triggered.
     *
     * When set to `true`, the refresh indicator will not be triggered; Otherwise, the refresh indicator will always able be triggered.
     *
     * The default value is `undefined`, which means the component will check if the children is at the top of the scrollable element by using `scrollTop`.
     */
    disabled?: boolean
}>) {
    const ref = useRef<HTMLDivElement>(null)
    const spinner = useRef<HTMLDivElement>(null)
    const pointerdownY = useRef<number>()
    const [deltaY, setDeltaY] = useState(0)
    const [refreshing, setRefreshing] = useState(false)
    const showSpinner = deltaY > 0 || refreshing
    const percentage = clamp(0, deltaY / movement, 1)

    useEventListenerEffect(ref, 'pointerdown', (e) => {
        // do not trigger, if already refreshing
        if (refreshing) return
        // if `disabled` is not provided
        if (disabled === undefined) {
            const el = ref.current!
            if (el.scrollTop !== 0) return
        }
        pointerdownY.current = e.clientY
    })
    useEventListenerEffect(ref, ['pointerup', 'pointerleave'], (e) => {
        if (!pointerdownY.current) return
        // pointer have released, so get the final deltaY, and clean up everything
        const deltaY = e.clientY - pointerdownY.current
        setDeltaY(0)
        pointerdownY.current = undefined
        // check if the deltaY is enough to trigger the refresh
        if (deltaY >= movement) {
            setRefreshing(true)
            const promise = new Promise((resolve) => resolve(onRefresh?.()))
            promise.finally(() => {
                setRefreshing(false)
                // scale the spinner to zero
                const el = spinner.current
                if (!el) return
                if (
                    el
                        .getAnimations()
                        .find((a) => a.id === 'refreshSpinnerDisappear')
                )
                    return
                el.animate(
                    {
                        transform: ['scale(1)', `scale(0)`],
                        opacity: [1, 0],
                    },
                    {
                        duration: 400,
                        easing: 'cubic-bezier(0.2, 0, 0, 1)',
                        composite: 'add',
                    },
                ).id = 'refreshSpinnerDisappear'
            })
        } else {
            // cannot trigger refresh
            setRefreshing(false)
            const el = spinner.current
            if (!el) return
            el.animate(
                [
                    { opacity: 1 },
                    {
                        opacity: 0,
                        translate: '0 0',
                    },
                ],
                {
                    duration: 200,
                    easing: 'cubic-bezier(0.2, 0, 0, 1)',
                },
            )
        }
    })
    useEventListenerEffect(ref, 'pointermove', (e) => {
        if (!pointerdownY.current) return
        setDeltaY(e.clientY - pointerdownY.current)
    })

    return (
        <div
            {...props}
            style={{
                minHeight: `${movement}px`,
                ...style,
            }}
            className={clsx('sd-refresh_indicator', className)}
            ref={ref}
        >
            <div
                ref={spinner}
                className="sd-refresh_indicator-spinner"
                style={{
                    translate: `0 ${deltaY ? percentage * movement : 0.2 * movement}px`,
                    opacity: showSpinner ? 1 : 0,
                }}
            >
                <Icon
                    className={clsx(
                        refreshing && 'sd-refresh_indicator-rotate',
                    )}
                    path={mdiRefresh}
                    size={1}
                    rotate={percentage * 100}
                />
            </div>
            {children}
        </div>
    )
}

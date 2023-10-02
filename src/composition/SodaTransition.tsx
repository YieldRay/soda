import { ExtendProps } from '@/utils/type'
import { useState, useEffect, useLayoutEffect, useRef } from 'react'
// Vue CSS-Based Transitions: https://vuejs.org/guide/built-ins/transition.html#css-based-transitions
// enter-from enter-active enter-to
// leave-from leave-active leave-to
// React react-transition-group: https://reactcommunity.org/react-transition-group/switch-transition

/**
 * A simple state based transition for element's enter and exit (to DOM)
 *
 * [warn]: transition property should set to beforeEnter/beforeLeave to activate css transition
 * or set transition to style property to manage them all
 */
export function SodaTransition({
    beforeEnter = {},
    afterEnter = {},
    beforeLeave = {},
    afterLeave = {},
    style,
    state = false,
    allowFristRun = false,
    children,
    ...props
}: ExtendProps<{
    style?: React.CSSProperties
    beforeEnter?: React.CSSProperties
    afterEnter?: React.CSSProperties
    beforeLeave?: React.CSSProperties
    afterLeave?: React.CSSProperties
    /**
     * `true` for enter, `false` for leave
     */
    state?: boolean
    allowFristRun?: boolean
    children?: React.ReactNode
}>) {
    const [show, setShow] = useState(false)
    const [transitionStyle, setTransitionStyle] = useState(
        state ? beforeEnter : beforeLeave
    )
    const isFristRun = useRef(!allowFristRun)

    useLayoutEffect(() => {
        if (isFristRun.current) {
            // do not transition if is first run
            setTransitionStyle(state ? afterEnter : afterLeave)
            setShow(state)
        } else {
            setTransitionStyle(state ? beforeEnter : beforeLeave)
            setShow(true)
        }
    }, [state, beforeEnter, beforeLeave, afterEnter, afterLeave])

    useEffect(() => {
        if (isFristRun.current!) {
            // do not transition if is first run
            isFristRun.current = false
            return
        }

        requestAnimationFrame(() => {
            setTransitionStyle(state ? afterEnter : afterLeave)
        })
    }, [state, afterEnter, afterLeave])

    const onTransitionEnd = () => {
        if (state === false) setShow(false)
    }

    return (
        <>
            {show && (
                <div
                    {...props}
                    style={{ ...style, ...transitionStyle }}
                    onTransitionEnd={onTransitionEnd}
                >
                    {children}
                </div>
            )}
        </>
    )
}

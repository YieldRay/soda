import { forwardRef, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ExtendProps, TagNameString } from '@/utils/type'

// Vue CSS-Based Transitions: https://vuejs.org/guide/built-ins/transition.html#css-based-transitions
// enter-from enter-active enter-to
// leave-from leave-active leave-to
// React react-transition-group: https://reactcommunity.org/react-transition-group/switch-transition

/**
 * This component provide a very simple state-based mechanism for handling element transitions on enter and exit.
 *
 * For more robust and feature-rich animation components, consider using libraries such as:
 * - [framer-motion](https://npm.im/framer-motion)
 * - [react-transition-group](https://npm.im/react-transition-group)
 *
 * If you prefer an imperative approach to animate DOM elements, this library uses the [Web Animations API](https://developer.mozilla.org/docs/Web/API/Web_Animations_API) internally to minimize dependencies. However, you might find [Motion One](https://npm.im/motion) to be a better fit for such needs.
 *
 * ![WARNING]: To activate CSS transitions, the `transition` property should be set to `entering` or `exiting`.
 * Alternatively, manage all transitions by setting the `transition` property in the `style` attribute.
 */
export const SodaTransition = forwardRef<
    HTMLElement,
    ExtendProps<{
        as?: TagNameString
        style?: React.CSSProperties
        className?: string
        entering?: React.CSSProperties
        entered?: React.CSSProperties
        exiting?: React.CSSProperties
        exited?: React.CSSProperties
        /**
         * `true` for enter, `false` for leave
         */
        in?: boolean
        /**
         * By default the component does not perform the enter transition when it first mounts, regardless of the value of `in`. If you want this behavior, set both `appear` and `in` to `true`.
         */
        appear?: boolean
        children?: React.ReactNode
    }>
>(function SodaTransition(
    {
        entering = {},
        entered = {},
        exiting = {},
        exited = {},
        style,
        in: isIn = false,
        appear = false,
        children,
        as,
        ...props
    },
    ref,
) {
    const [show, setShow] = useState(false)
    const [transitionStyle, setTransitionStyle] = useState(
        isIn ? entering : exiting,
    )
    const isFirstMount = useRef(!appear)

    useLayoutEffect(() => {
        if (isFirstMount.current) {
            // do not transition if is first run
            setTransitionStyle(isIn ? entered : exited)
            setShow(isIn)
        } else {
            setTransitionStyle(isIn ? entering : exiting)
            setShow(true)
        }
    }, [isIn, entering, exiting, entered, exited])

    useEffect(() => {
        if (isFirstMount.current!) {
            // do not transition if is first run
            isFirstMount.current = false
            return
        }

        requestAnimationFrame(() => {
            setTransitionStyle(isIn ? entered : exited)
        })
    }, [isIn, entered, exited])

    const onTransitionEnd = () => {
        if (isIn === false) setShow(false)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const As: any = as || 'div'

    return (
        show && (
            <As
                {...props}
                ref={ref}
                style={{ ...style, ...transitionStyle }}
                onTransitionEnd={onTransitionEnd}
            >
                {children}
            </As>
        )
    )
})

/**
 * A simple wrapper of `<SodaTransition>`, with default fade transition included.
 */
export const SodaSimpleTransition = forwardRef<
    HTMLElement,
    Parameters<typeof SodaTransition>[0] & {
        enter?: React.CSSProperties
        leave?: React.CSSProperties
    }
>(function SodaSimpleTransition(
    {
        enter = { opacity: '1' },
        leave = { opacity: '0' },
        entering,
        entered,
        exiting,
        exited,
        style,
        ...props
    },
    ref,
) {
    return (
        <SodaTransition
            {...{
                entering: { ...entering, ...leave },
                entered: { ...entered, ...enter },
                exiting: { ...exiting, ...enter },
                exited: { ...exited, ...leave },
                style: { transition: 'all 200ms', ...style },
                ...props,
                ref,
            }}
        />
    )
})

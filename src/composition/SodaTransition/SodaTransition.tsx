import { forwardRef, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ExtendProps, TagNameString } from '@/utils/type'

// Vue CSS-Based Transitions: https://vuejs.org/guide/built-ins/transition.html#css-based-transitions
// enter-from enter-active enter-to
// leave-from leave-active leave-to
// React react-transition-group: https://reactcommunity.org/react-transition-group/switch-transition

/**
 * A simple state based transition for element's enter and exit (to DOM)
 *
 * [warn]: `transition` property should set to entering/exiting to activate css transition
 * or set transition to `style` property to manage them all
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

    const As: any = as || 'div'

    const component = (
        <As
            {...props}
            ref={ref}
            style={{ ...style, ...transitionStyle }}
            onTransitionEnd={onTransitionEnd}
        >
            {children}
        </As>
    )

    return show && component
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

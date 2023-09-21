import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { rippleEffect } from './ripple-effect'
import omit from 'lodash-es/omit'

type Props = {
    /**
     * HTML tag name, div by default
     */
    as?: keyof JSX.IntrinsicElements
    children?: React.ReactNode
    disabled?: boolean
    /**
     * In ms
     */
    rippleDuration?: number
    /**
     * Any css color string
     */
    rippleColor?: string
} & Record<string, any>

export const Ripple = forwardRef<HTMLElement, Props>((props, ref) => {
    const eRef = useRef<HTMLElement>(null)
    useImperativeHandle(ref, () => eRef.current!)
    useEffect(() => {
        if (!props.disabled)
            return rippleEffect(
                eRef.current!,
                props.rippleDuration,
                props.rippleColor
            )
    }, [props])
    const Element: any = props.as ?? 'div'
    return (
        <Element
            ref={eRef}
            {...omit(props, [
                'as',
                'ref',
                'disabled',
                'rippleDuration',
                'rippleColor',
            ])}
        >
            {props.children}
        </Element>
    )
})

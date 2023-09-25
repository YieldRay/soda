import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import { rippleEffect } from './ripple-effect'
import omit from 'lodash-es/omit'
import { ExtendProps, TagNameString } from './type'

type Props = ExtendProps<{
    /**
     * HTML tag name, div by default
     */
    as?: TagNameString
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
}>

export const Ripple = forwardRef<HTMLElement, Props>((props, ref) => {
    const eRef = useRef<HTMLElement>(null)

    useEffect(() => {
        if (!props.disabled)
            return rippleEffect(
                eRef.current!,
                props.rippleDuration,
                props.rippleColor
            )
    }, [props])

    useImperativeHandle(ref, () => eRef.current!)

    const As: any = props.as || 'div'
    return (
        <As
            {...omit(props, [
                'as',
                'disabled',
                'rippleDuration',
                'rippleColor',
            ])}
            ref={eRef}
        >
            {props.children}
        </As>
    )
})

import { useEffect, useRef } from 'react'
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

export function Ripple(props: Props) {
    const ref = useRef<HTMLElement>(null)

    useEffect(() => {
        if (!props.disabled)
            return rippleEffect(
                ref.current!,
                props.rippleDuration,
                props.rippleColor
            )
    }, [props])
    const As: any = props.as || 'div'
    return (
        <As
            {...omit(props, [
                'as',
                'disabled',
                'rippleDuration',
                'rippleColor',
            ])}
            ref={ref}
        >
            {props.children}
        </As>
    )
}

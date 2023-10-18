import { useRef, forwardRef, useImperativeHandle } from 'react'
import { useRippleEffect } from './ripple-effect'
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

/**
 * Wrapper component for ripple-effect.ts
 */
export const Ripple = forwardRef<HTMLElement, Props>(
    ({ as, disabled, rippleColor, rippleDuration, ...props }, ref) => {
        const eRef = useRef<HTMLElement>(null)
        useRippleEffect(eRef, rippleDuration, rippleColor)
        useImperativeHandle(ref, () => eRef.current!)

        const As: any = as || 'div'

        return (
            <As {...props} ref={eRef} disabled={disabled}>
                {props.children}
            </As>
        )
    }
)

import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import { rippleEffect } from './ripple-effect'
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

        useEffect(() => {
            if (!disabled)
                return rippleEffect(eRef.current!, rippleDuration, rippleColor)
        }, [disabled, rippleColor, rippleDuration])

        useImperativeHandle(ref, () => eRef.current!)

        const As: any = as || 'div'

        return (
            <As {...props} ref={eRef}>
                {props.children}
            </As>
        )
    }
)

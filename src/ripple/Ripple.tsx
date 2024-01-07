import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { ripple } from './ripple-effect'
import { ExtendProps, TagNameString } from '@/utils/type'

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

type RippleAt = (
    rippleX: number,
    rippleY: number,
    autoRemove?: boolean
) => (onFinish?: VoidFunction | undefined) => void

export type RippleHandle = HTMLElement & { rippleAt?: RippleAt }

/**
 * Wrapper component for ripple-effect.ts
 */
export const Ripple = forwardRef<RippleHandle, Props>(
    ({ as, disabled, rippleColor, ...props }, ref) => {
        const eRef = useRef<HTMLElement>(null)
        const rippleAtRef = useRef<RippleAt | undefined>(undefined)
        useEffect(() => {
            const rippleResult = ripple(eRef.current!, rippleColor)
            rippleAtRef.current = rippleResult?.rippleAt
            return rippleResult?.cleanup
        })
        useImperativeHandle(ref, () => {
            const e = eRef.current!
            Reflect.set(e, 'rippleAt', rippleAtRef.current)
            return e
        })

        const As: any = as || 'div'

        return (
            <As {...props} ref={eRef} disabled={disabled}>
                {props.children}
            </As>
        )
    }
)

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { ExtendProps, TagNameString } from '@/utils/type'
import { ripple } from './ripple-effect'

interface RippleProps {
    disabled?: boolean
    /**
     * In ms
     */
    rippleDuration?: number
    /**
     * Any css color string
     */
    rippleColor?: string
}

interface RippleRefProps extends RippleProps {
    /**
     * HTML tag name, div by default
     */
    as: TagNameString
    children?: React.ReactNode
}

interface RippleFnProps extends RippleProps {
    as?: undefined
    children: (ref: React.Ref<HTMLElement>) => React.ReactNode
}

type Props = ExtendProps<RippleRefProps | RippleFnProps>

type RippleAt = (
    rippleX: number,
    rippleY: number,
    autoRemove?: boolean,
) => (onFinish?: VoidFunction | undefined) => void

export type RippleHandle = HTMLElement & { rippleAt?: RippleAt }

/**
 * Wrapper component for ripple-effect.ts
 */
export const Ripple = forwardRef<RippleHandle, Props>(
    ({ as, disabled, rippleColor, children, ...props }, ref) => {
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

        if (as) {
            const As = as as any
            return (
                <As {...props} ref={eRef} disabled={disabled}>
                    {children}
                </As>
            )
        }

        return children(eRef)
    },
)

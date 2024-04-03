import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { AsOrChildrenProps, ExtendProps } from '@/utils/type'
import { ripple } from './ripple-effect'

type Props = ExtendProps<
    {
        disabled?: boolean
        /**
         * In ms
         */
        rippleDuration?: number
        /**
         * Any css color string
         */
        rippleColor?: string
    } & AsOrChildrenProps
>

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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

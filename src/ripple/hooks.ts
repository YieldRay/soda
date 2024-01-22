import { useEffect } from 'react'
import { ripple } from './ripple-effect'

/**
 * Hooks wrapper of the raw dom function
 */
export function useRippleEffect<T extends HTMLElement>(
    eleRef: React.RefObject<T>,
    duration?: number,
    color?: string
) {
    useEffect(
        () =>
            eleRef.current ? ripple(eleRef.current, color)?.cleanup : undefined,
        [eleRef, duration, color]
    )
}

/**
 * @example
 * ```jsx
 * <div ref={useRippleRef()}> Ripple </div>
 * <div ref={useMergeRefs(useRippleRef(), ...)}> Ripple </div>
 * ```
 */
export function useRippleRef<T extends HTMLElement>(color?: string) {
    const refCallback: React.RefCallback<T> = (ele) => {
        if (!ele) return
        ripple(ele, color)
    }
    return refCallback
}

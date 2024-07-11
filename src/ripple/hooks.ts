import { useCallback, useEffect } from 'react'
import { ripple } from './ripple-effect'

/**
 * Hooks wrapper of the raw dom function
 */
export function useRippleEffect<T extends HTMLElement>(
    eleRef: React.RefObject<T>,
    duration?: number,
    color?: string,
) {
    useEffect(
        () =>
            eleRef.current ? ripple(eleRef.current, color)?.cleanup : undefined,
        [eleRef, duration, color],
    )
}

/**
 * @example
 * ```jsx
 * const rippleRef = useRippleRef()
 * <div ref={rippleRef}> Ripple </div>
 *
 * const mergedRef = useMergeRefs(rippleRef, ...)
 * <div ref={mergedRef}> Ripple </div>
 * ```
 */
export function useRippleRef<T extends HTMLElement>(color?: string) {
    const refCallback: React.RefCallback<T> = (ele) => {
        if (!ele) return
        ripple(ele, color)
    }
    return useCallback(refCallback, [color])
}

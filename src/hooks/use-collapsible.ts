import { useEffect } from 'react'

/**
 * [warn]: also need to set `overflow:hidden` and optional set `transition:all 200ms`
 *
 * No padding and margin should be set
 */
export function useCollapsible(
    elementRef: React.RefObject<HTMLElement>,
    collapsed: boolean,
) {
    useEffect(() => {
        const el = elementRef.current
        if (!el) return

        if (collapsed) {
            el.style.maxHeight = 0 + 'px'
        } else {
            el.style.maxHeight = el.scrollHeight + 'px'
        }
    }, [elementRef, collapsed])
}

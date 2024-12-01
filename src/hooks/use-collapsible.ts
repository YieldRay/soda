import { useEffect } from 'react'

/**
 * !WARNING: Also need to set `overflow:hidden` and optional set `transition:all 200ms`
 *
 * No padding and margin should be set
 */
export function useCollapsible(
    elementRef: React.RefObject<HTMLElement>,
    collapsed: boolean,
    direction: 'vertical' | 'horizontal' = 'vertical',
) {
    useEffect(() => {
        const el = elementRef.current
        if (!el) return

        el.style[
            ({ vertical: 'maxHeight', horizontal: 'maxWidth' } as const)[
                direction
            ]
        ] = collapsed
            ? '0px'
            : el[
                  (
                      {
                          vertical: 'scrollHeight',
                          horizontal: 'scrollWidth',
                      } as const
                  )[direction]
              ] + 'px'
    }, [elementRef, collapsed, direction])
}

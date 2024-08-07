import { useCallback } from 'react'
import { useMergeRefs as useMergeRefs_FloatingUI } from '@floating-ui/react'

/**
 * Just forward `useMergeRefs` from floating-ui
 */
export function useMergeRefs<Instance>(
    ...refs: Array<React.Ref<Instance>>
): React.RefCallback<Instance> | null {
    return useMergeRefs_FloatingUI(refs)
}

/**
 * Run event handlers in sequence, break if event is already prevented
 */
export function useMergeEventHandlers<
    Event extends { preventDefault(): void; isDefaultPrevented(): boolean },
>(...eventHandlers: Array<((e: Event) => void) | undefined>) {
    return useCallback(
        (e: Event) => {
            for (const handler of eventHandlers) {
                handler?.(e)
                if (e.isDefaultPrevented()) break
            }
        },
        [eventHandlers],
    )
}

// TODO:
// functions below are not hooks
// so they are pending for moving to other module

/**
 * This helps because the react style property cannot set custom css property
 */
export function refCSSProperty(
    property: string,
    value?: string | null,
    priority?: '' | 'important',
) {
    return <E extends HTMLElement>(el?: E | null) => {
        if (!el) return
        if (value !== undefined) el.style.setProperty(property, value, priority)
    }
}

/**
 * This helps because the react style property cannot set custom css property
 */
export function refCSSProperties(
    properties: Record<
        string,
        string | null | undefined | [string, 'important' | '']
    >,
) {
    return <E extends HTMLElement>(el?: E | null) => {
        if (!el) return
        for (const [property, val] of Object.entries(properties)) {
            if (Array.isArray(val)) {
                el.style.setProperty(property, ...val)
            } else {
                if (val !== undefined) el.style.setProperty(property, val)
            }
        }
    }
}

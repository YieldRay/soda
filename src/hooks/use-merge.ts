import { useMergeRefs as useMergeRefs_FU } from '@floating-ui/react'

/**
 * Run event handlers in sequence, break if event is already prevented
 */
export function useMergeEventHandlers<
    Event extends { preventDefault(): void; isDefaultPrevented(): boolean }
>(...eventHandlers: Array<((e: Event) => void) | undefined>) {
    return (e: Event) => {
        for (const handler of eventHandlers) {
            handler?.(e)
            if (e.isDefaultPrevented()) break
        }
    }
}

/**
 * Just forward `useMergeRefs` from floating-ui
 */
export function useMergeRefs<Instance>(
    ...refs: Array<React.Ref<Instance>>
): React.RefCallback<Instance> | null {
    return useMergeRefs_FU(refs)
}

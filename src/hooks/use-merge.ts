import { useMergeRefs as useMergeRefsFU } from '@floating-ui/react'

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

export function useMergeRefs<Instance>(
    ...refs: Array<React.Ref<Instance>>
): React.RefCallback<Instance> | null {
    return useMergeRefsFU(refs)
}

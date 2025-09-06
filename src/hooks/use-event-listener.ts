import { useEffect } from 'react'

type GetEventMap<T> = T extends HTMLElement
    ? HTMLElementEventMap
    : T extends Document
      ? DocumentEventMap
      : T extends Window
        ? WindowEventMap
        : never

type ListenTarget = HTMLElement | Document | Window

function isListenTarget(
    element: unknown,
): element is HTMLElement | Document | Window {
    return (
        element instanceof HTMLElement ||
        element instanceof Document ||
        element instanceof Window
    )
}

type MaybeRefObject<T> = React.RefObject<T> | T

export function refEventListener<
    T extends ListenTarget,
    K extends keyof GetEventMap<T>,
>(
    elementRef: MaybeRefObject<T>,
    type: K | K[],
    listener: (this: T, ev: GetEventMap<T>[K]) => unknown,
    options?: boolean | AddEventListenerOptions,
) {
    const el = isListenTarget(elementRef) ? elementRef : elementRef.current
    if (!el) return () => {}
    const types = Array.isArray(type) ? type : [type]

    types.forEach((type) =>
        el.addEventListener(
            type as unknown as string,
            listener as EventListenerOrEventListenerObject,
            options,
        ),
    )
    return () =>
        types.forEach((type) =>
            el.removeEventListener(
                type as unknown as string,
                listener as EventListenerOrEventListenerObject,
                options,
            ),
        )
}

export function useEventListenerEffect<
    T extends ListenTarget,
    K extends keyof GetEventMap<T>,
>(
    elementRef: MaybeRefObject<T>,
    type: K | K[],
    listener: (this: T, ev: GetEventMap<T>[K]) => unknown,
    options?: boolean | AddEventListenerOptions,
) {
    useEffect(
        () => refEventListener(elementRef, type, listener, options),
        [elementRef, type, listener, options],
    )
}

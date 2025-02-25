import { useEffect } from 'react'

export function refEventListener<
    T extends HTMLElement,
    K extends keyof HTMLElementEventMap,
>(
    elementRef: React.RefObject<T> | T,
    type: K | K[],
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => unknown,
    options?: boolean | AddEventListenerOptions,
) {
    const el =
        elementRef instanceof HTMLElement ? elementRef : elementRef.current
    if (!el) return () => {}
    const types = Array.isArray(type) ? type : [type]
    types.forEach((type) => el.addEventListener(type, listener, options))
    return () =>
        types.forEach((type) => el.removeEventListener(type, listener, options))
}

export function useEventListenerEffect<
    T extends HTMLElement,
    K extends keyof HTMLElementEventMap,
>(
    elementRef: React.RefObject<T>,
    type: K | K[],
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => unknown,
    options?: boolean | AddEventListenerOptions,
) {
    useEffect(
        () => refEventListener(elementRef, type, listener, options),
        [elementRef, type, listener, options],
    )
}

import { useEffect } from 'react'

export function refEventListener<
    T extends HTMLElement,
    K extends keyof HTMLElementEventMap,
>(
    elementRef: React.RefObject<T> | T,
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => unknown,
    options?: boolean | AddEventListenerOptions,
) {
    const el =
        elementRef instanceof HTMLElement ? elementRef : elementRef.current
    if (!el) return () => {}

    el.addEventListener(type, listener, options)
    return () => el.removeEventListener(type, listener, options)
}

export function useEventListenerEffect<
    T extends HTMLElement,
    K extends keyof HTMLElementEventMap,
>(
    elementRef: React.RefObject<T>,
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => unknown,
    options?: boolean | AddEventListenerOptions,
) {
    useEffect(
        () => refEventListener(elementRef, type, listener, options),
        [elementRef, type, listener, options],
    )
}

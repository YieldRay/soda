import { flushSync } from 'react-dom'

export const isViewTransitionSupported = 'startViewTransition' in document
/**
 * Not a `document.startViewTransition()` polyfill,
 * just do nothing in the browser that does not support this API,
 * but returns the same interface as it supports.
 * @example
 * // For react, use `flushSync()` to synchronously set state
 * // (state changes is asynchronous by default)
 * startViewTransition(() => {
 *     flushSync(() => {
 *         setYes((prev) => !prev);
 *     });
 * });
 *
 */
export function startViewTransition(
    updateDOM: () => Promise<void> | void,
): ViewTransition {
    if (isViewTransitionSupported) {
        return document.startViewTransition(updateDOM)
    } else {
        const updateCallbackDone = Promise.resolve(updateDOM()).then(
            () => undefined,
        )
        return {
            ready: Promise.reject(Error('View transitions unsupported')),
            updateCallbackDone,
            finished: updateCallbackDone,
            skipTransition: () => {},
        }
    }
}

/**
 * Shorthand function which call `flushSync()` in the internal.
 * You can use the prepare & cleanup function to toggle className
 */
export function startViewTransitionFlushSync(
    callback: VoidFunction,
    prepare?: VoidFunction,
    cleanup?: VoidFunction,
) {
    if (isViewTransitionSupported) {
        prepare?.()
        startViewTransition(() => {
            flushSync(callback)
        }).finished.finally(cleanup)
    } else {
        return callback()
    }
}

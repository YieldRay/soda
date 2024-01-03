import { flushSync } from 'react-dom'

export const isViewTransitionSupported = !!document.startViewTransition

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
    updateDOM: () => Promise<void> | void
): ViewTransition {
    if (isViewTransitionSupported) {
        return document.startViewTransition(updateDOM)
    } else {
        const updateCallbackDone = Promise.resolve(updateDOM()).then(() => {})
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
    cleanup?: VoidFunction
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

declare global {
    interface Document {
        /**
         * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Document/startViewTransition)
         * @param callback A callback function typically invoked to update the DOM during the view transition process, which returns a Promise. The callback is invoked once the API has taken a screenshot of the current page. When the promise returned by the callback fulfills, the view transition begins in the next frame. If the promise returned by the callback rejects, the transition is abandoned.
         * @returns A ViewTransition object instance.
         */
        startViewTransition(
            callback: () => Promise<void> | void
        ): ViewTransition
    }

    interface ViewTransition {
        /**
         * A Promise that fulfills once the transition animation is finished, and the new page view is visible and interactive to the user.
         */
        finished: Promise<void>
        /**
         * A Promise that fulfills once the pseudo-element tree is created and the transition animation is about to start.
         */
        ready: Promise<void>
        /**
         * A Promise that fulfills when the promise returned by the document.startViewTransition()'s callback fulfills.
         */
        updateCallbackDone: Promise<void>
        /**
         * Skips the animation part of the view transition, but doesn't skip running the document.startViewTransition() callback that updates the DOM.
         */
        skipTransition(): void
    }
}

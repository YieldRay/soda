import { useEffect, useState } from 'react'

/**
 * Prefer [`use()`](https://react.dev/reference/react/use) than this
 *
 * @example
 * ```ts
 * function App() {
 *     const p = usePromise(() =>
 *         fetch('https://swapi.dev/api/').then((r) => r.json())
 *     )
 *     if (p.status === 'pending') return 'Loading...'
 *     if (p.status === 'rejected') return JSON.stringify(p.reason)
 *     if (p.status === 'fulfilled')
 *         return <pre>{JSON.stringify(p.value, null, 4)}</pre>
 * }
 * ```
 */
export function usePromise<T>(
    promiseFactory: Promise<T> | (() => Promise<T>),
    deps: React.DependencyList = [],
) {
    const [value, setValue] = useState<
        PromiseSettledResult<T> | { status: 'pending' }
    >({
        status: 'pending',
    })

    useEffect(() => {
        const promise =
            typeof promiseFactory === 'function'
                ? promiseFactory()
                : promiseFactory

        promise.then(
            (value: T) => {
                setValue({ status: 'fulfilled', value })
            },
            (reason: unknown) => {
                setValue({ status: 'rejected', reason })
            },
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)

    return value
}

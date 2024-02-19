import { useEffect, useState } from 'react'

/**
 * For practical, this hook only intend for one element
 * @returns ResizeObserverEntry
 */
export function useResizeObserver(
    elementRef: React.RefObject<HTMLElement>,
    options?: ResizeObserverOptions,
) {
    const [entry, setEntry] = useState<ResizeObserverEntry>()

    useEffect(() => {
        const ro = new ResizeObserver((entries) => {
            setEntry(entries[0])
        })

        const element = elementRef.current!

        ro.observe(element, options)

        return () => ro.unobserve(element)
    })

    return entry
}

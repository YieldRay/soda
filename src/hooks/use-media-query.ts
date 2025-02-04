import { useCallback, useSyncExternalStore } from 'react'

/**
 * @param defaultValue used only for server render
 */
export function useMediaQuery(query: string, defaultValue?: boolean) {
    const subscribe = useCallback(
        (callback: VoidFunction) => {
            const matchedMedia = window.matchMedia(query)
            matchedMedia.addEventListener('change', callback)
            return () => matchedMedia.removeEventListener('change', callback)
        },
        [query],
    )

    const getSnapshot = () => window.matchMedia(query).matches

    const getServerSnapshot = () => {
        if (typeof defaultValue === 'boolean') return defaultValue
        throw Error('useMediaQuery is a client-only hook')
    }

    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

type WindowSizeType = 'compact' | 'medium' | 'expanded'

/**
 * @param defaultValue used only for server render
 * @see https://m3.material.io/foundations/layout/applying-layout/window-size-classes
 */
export function useWindowSizeType(
    defaultValue?: WindowSizeType,
): WindowSizeType {
    const isCompact = useMediaQuery(
        'only screen and (max-width : 600px)',
        false,
    )
    const isMedium = useMediaQuery('only screen and (max-width : 840px)', false)

    // SSR
    if (typeof window === 'undefined' && defaultValue) return defaultValue

    if (isCompact) return 'compact'
    if (isMedium) return 'medium'
    return 'expanded'
}

/**
 * @param defaultValue used only for server render
 */
export function usePrefersDark(defaultValue?: boolean) {
    return useMediaQuery('(prefers-color-scheme: dark)', defaultValue)
}

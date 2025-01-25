import { useCallback, useSyncExternalStore } from 'react'

export function useMediaQuery(query: string) {
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
        throw Error('useMediaQuery is a client-only hook')
    }

    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

/**
 * https://m3.material.io/foundations/layout/applying-layout/window-size-classes
 */
export function useWindowSizeType(): 'compact' | 'medium' | 'expanded' {
    const isCompact = useMediaQuery('only screen and (max-width : 600px)')
    const isMedium = useMediaQuery('only screen and (max-width : 840px)')
    if (isCompact) return 'compact'
    if (isMedium) return 'medium'
    return 'expanded'
}

export function usePrefersDark() {
    return useMediaQuery('(prefers-color-scheme: dark)')
}

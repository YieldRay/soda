import { useCallback, useEffect, useState } from 'react'

/**
 * Simple wrapper of the standard [Fullscreen API](https://developer.mozilla.org/docs/Web/API/Fullscreen_API)
 *
 * Given an element ref, return something similar to `useState()`
 */
export function useFullscreen(
    elementRef: React.RefObject<HTMLElement>,
    options?: FullscreenOptions,
) {
    const [isFullscreen, setIsFullscreen] = useState<boolean>(
        document.fullscreenEnabled &&
            !!elementRef.current &&
            elementRef.current === document.fullscreenElement,
    )

    useEffect(() => {
        const el = elementRef.current
        if (!el) return

        const onChange = (e: Event) => {
            setIsFullscreen(document.fullscreenElement === e.target)
        }

        el.addEventListener('fullscreenchange', onChange)

        return () => el.removeEventListener('fullscreenchange', onChange)
    }, [elementRef])

    const dispatch = async (isFullscreen: boolean): Promise<void> => {
        const el = elementRef.current
        if (!el) return

        if (isFullscreen) {
            return el.requestFullscreen(options)
        } else {
            return document.exitFullscreen()
        }
    }

    return [isFullscreen, useCallback(dispatch, [elementRef, options])] as const
}

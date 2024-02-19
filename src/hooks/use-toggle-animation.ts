import { useLayoutEffect, useRef } from 'react'

export function useToggleAnimation<T extends HTMLElement>(
    elRef: React.RefObject<T>,
    open: boolean,
    options: {
        show(el: T): Animation
        hide(el: T): Animation
    },
) {
    const isFirstRun = useRef(true)

    useLayoutEffect(() => {
        const el = elRef.current
        if (!el) return

        if (isFirstRun.current) {
            isFirstRun.current = false
            if (!open) el.style.display = 'none'
            return
        }

        el.getAnimations().forEach((a) => a.cancel())

        if (open) {
            // to show
            el.style.display = ''
            const a = options.show(el)
            a.onfinish = () => (el.style.display = '')
        } else {
            // to hide
            const a = options.hide(el)
            a.onfinish = () => (el.style.display = 'none')
        }
    }, [elRef, open, options])
}

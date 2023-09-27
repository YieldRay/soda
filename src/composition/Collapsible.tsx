import { ExtendProps } from '@/utils/type'
import { forwardRef, useRef, useImperativeHandle, useEffect } from 'react'

/**
 * Low level component, use `<Details>` component if possiable
 */
export const Collapsible = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        open?: boolean
        children?: React.ReactNode
    }>
>(function Collapsible({ open, children, ...props }, ref) {
    const eRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(ref, () => eRef.current!)
    useEffect(() => {
        const e = eRef.current!
        if (open) {
            e.style.maxHeight = e.scrollHeight + 'px'
        } else {
            e.style.maxHeight = 0 + 'px'
        }
    }, [open])

    return (
        <div {...props} ref={eRef}>
            <style jsx>{`
                div {
                    transition: all 200ms;
                    overflow: hidden;
                    boxsizing: border-box;
                }
            `}</style>
            {children}
        </div>
    )
})

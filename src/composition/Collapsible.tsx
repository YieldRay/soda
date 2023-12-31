import { ExtendProps } from '@/utils/type'
import { forwardRef, useRef, useImperativeHandle, useEffect } from 'react'

/**
 * Low level component, use `<Details>` component if possible
 */
export const Collapsible = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        expanded?: boolean
        children?: React.ReactNode
    }>
>(function Collapsible({ expanded, children, style, ...props }, ref) {
    const eRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(ref, () => eRef.current!)
    useEffect(() => {
        const e = eRef.current!
        if (expanded) {
            e.style.maxHeight = e.scrollHeight + 'px'
        } else {
            e.style.maxHeight = 0 + 'px'
        }
    }, [expanded])

    return (
        <div
            {...props}
            ref={eRef}
            style={{
                transition: 'all 200ms',
                overflow: 'hidden',
                boxSizing: 'border-box',
                ...style,
            }}
        >
            {children}
        </div>
    )
})

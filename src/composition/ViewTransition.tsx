import { useImperativeHandle, forwardRef, useState, useRef } from 'react'
import { flushSync } from 'react-dom'
import { startViewTransition } from '@/utils/view-transition'
import { ExtendProps } from '@/utils/type'

/**
 * [experimental]: This component use ref to toggle transition.
 */
export const ViewTransition = forwardRef<
    { replace(children: React.ReactNode): void },
    ExtendProps<{
        children?: React.ReactNode
        style?: React.CSSProperties
        className?: string
    }>
>((props, ref) => {
    const [children, setChildren] = useState<React.ReactNode>(props.children)
    const divRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(ref, () => ({
        replace(next) {
            startViewTransition(() => {
                flushSync(() => {
                    setChildren(next)
                })
            })
        },
    }))
    return (
        <div {...props} ref={divRef}>
            {children}
        </div>
    )
})

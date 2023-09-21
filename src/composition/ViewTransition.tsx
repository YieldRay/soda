import { useImperativeHandle, forwardRef, useState, useRef } from 'react'
import { flushSync } from 'react-dom'
import { startViewTransition } from '@/utils/view-transition'

export const ViewTransition = forwardRef<
    { replace(children: React.ReactNode): void },
    {
        children?: React.ReactNode
        style?: React.CSSProperties
        className?: string
    } & React.HTMLProps<HTMLDivElement>
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
        <div ref={divRef} {...props}>
            {children}
        </div>
    )
})
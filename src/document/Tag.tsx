import { ExtendProps, TagNameString } from '@/utils/type'
import { useEffect } from 'react'

export default function Tag({
    as,
    appendTo = document.head,
    children = '',
    ...props
}: ExtendProps<{
    as: TagNameString
    appendTo?: HTMLElement
    children?: string
}>) {
    useEffect(() => {
        const e = document.createElement(as)
        Object.keys(props).forEach((attr) =>
            Reflect.set(e, attr, Reflect.get(props, attr))
        )
        e.innerHTML = children
        appendTo.append(e)
    }, [as, appendTo, children, props])
}

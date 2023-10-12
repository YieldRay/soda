import { createPortal } from 'react-dom'

/**
 * Wrapper component of `createPortal()`
 * Just like https://vuejs.org/guide/built-ins/teleport.html
 */
export function Portal({
    children,
    container,
    key,
}: {
    children?: React.ReactNode
    container?: Element | DocumentFragment
    key?: string | null
}) {
    if (container) return createPortal(children, container, key)
    else return children
}

import { createRoot } from 'react-dom/client'

export function renderWithinDiv(
    children: React.ReactNode | ((div: HTMLElement) => React.ReactNode),
    divAttrs?: Partial<Record<keyof HTMLIFrameElement, string>>,
    parentNode: ParentNode = document.body,
) {
    const div = document.createElement('div')
    if (divAttrs) {
        for (const [k, v] of Object.entries(divAttrs)) {
            div.setAttribute(k, v)
        }
    }
    parentNode.append(div)
    createRoot(div).render(
        typeof children === 'function' ? children(div) : children,
    )
    return div
}

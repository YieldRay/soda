/**
 * extend a built-in HTMLElement's react properties (by default HTMLDivElement)
 */
export type ExtendProps<
    T extends object = object,
    U extends HTMLElement = HTMLElement
> = T & Omit<React.HTMLProps<U>, keyof T | 'ref'>

export type TagNameString = keyof JSX.IntrinsicElements

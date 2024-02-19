/**
 * Extend a built-in HTMLElement's react properties (by default HTMLDivElement)
 */
export type ExtendProps<
    Props extends object = object,
    As extends HTMLElement = HTMLElement,
> = Props & Omit<React.HTMLProps<As>, 'as' | 'ref' | keyof Props>

export type TagNameString = keyof JSX.IntrinsicElements

export type As<Props = any> = React.ElementType<Props>

export type PropsOf<T extends As> = React.ComponentPropsWithoutRef<T> & {
    as?: As
}

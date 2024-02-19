import './navigation.scss'
import clsx from 'clsx'
import { forwardRef } from 'react'
import { mergeStyles } from '@/utils/style'
import { ExtendProps } from '@/utils/type'
import { Helper, HelperItem } from './Helper'

/**
 * @specs https://m3.material.io/components/navigation-rail/specs
 */
export const NavigationRail = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        fab: React.ReactNode
        items: Array<HelperItem & { key: React.Key }>
        onChange?(item: HelperItem & { key: React.Key }): void
        /**
         * Fix the component to the left side
         *
         * See also `zIndex` `inset`
         */
        fixed?: boolean
        /**
         * CSS `z-index`, if `fixed` set to `true`
         *
         * @default 2
         */
        zIndex?: number
        /**
         * CSS `inset`, if `fixed` set to `true`
         */
        inset?: string
    }>
>(function NavigationRail(
    {
        fab,
        items,
        fixed,
        zIndex = 2,
        inset = '0 auto 0 0',
        onChange,
        className,
        style,
        ...props
    },
    ref,
) {
    return (
        <div
            {...props}
            ref={ref}
            className={clsx('sd-navigation_rail', className)}
            style={mergeStyles(
                fixed && {
                    position: 'fixed',
                    zIndex,
                    inset,
                },
                style,
            )}
        >
            <div className="sd-navigation_rail-fab">{fab}</div>
            <div className="sd-navigation_rail-items">
                {items.map((item) => (
                    <Helper {...item} onClick={() => onChange?.(item)}></Helper>
                ))}
            </div>
        </div>
    )
})

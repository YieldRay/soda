import './navigation.scss'
import clsx from 'clsx'
import { forwardRef } from 'react'
import { mergeStyles } from '@/utils/style'
import { ExtendProps } from '@/utils/type'
import { Helper, HelperItem } from './Helper'

/**
 * @specs https://m3.material.io/components/navigation-bar/specs
 */
export const NavigationBar = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        items: Array<HelperItem & { key: React.Key }>
        onChange?(item: HelperItem & { key: React.Key }): void
        /**
         * Fix the component to the bottom side
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
>(function NavigationBar(
    {
        items,
        fixed,
        zIndex = 2,
        inset = 'auto 0 0',
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
            className={clsx('sd-navigation_bar', className)}
            style={mergeStyles(
                fixed && {
                    position: 'fixed',
                    zIndex,
                    inset,
                },
                style,
            )}
        >
            {items.map((item) => (
                <Helper
                    {...item}
                    onClick={() => onChange?.(item)}
                    onKeyDownEnter={() => onChange?.(item)}
                ></Helper>
            ))}
        </div>
    )
})

import './navigation.scss'
import clsx from 'clsx'
import { Helper, HelperItem } from './Helper'
import { ExtendProps } from '@/utils/type'
import { forwardRef } from 'react'

/**
 * @specs https://m3.material.io/components/navigation-bar/specs
 */
export const NavigationBar = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        items: Array<HelperItem & { key: React.Key }>
        onChange?(item: HelperItem & { key: React.Key }): void
        /**
         * Fix the component to the bottom side,
         * if set to a number, it also become the zIndex
         */
        fixed?: boolean | number
    }>
>(function NavigationBar(
    { items, fixed, onChange, className, style, ...props },
    ref
) {
    return (
        <div
            {...props}
            ref={ref}
            className={clsx('sd-navigation_bar', className)}
            style={{
                ...(fixed === true
                    ? {
                          position: 'fixed',
                          bottom: '0',
                          zIndex: typeof fixed === 'boolean' ? 2 : fixed,
                          width: '100%',
                          boxSizing: 'border-box',
                      }
                    : undefined),
                ...style,
            }}
        >
            {items.map((item) => (
                <Helper {...item} onClick={() => onChange?.(item)}></Helper>
            ))}
        </div>
    )
})

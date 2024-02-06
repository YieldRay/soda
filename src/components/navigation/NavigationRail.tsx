import './navigation.scss'
import { Helper, HelperItem } from './Helper'
import clsx from 'clsx'
import { ExtendProps } from '@/utils/type'
import { forwardRef } from 'react'

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
         * Fix the component to the left side,
         * if set to a number, it also become the zIndex
         */
        fixed?: boolean | number
    }>
>(function NavigationRail(
    { fab, items, fixed, onChange, className, style, ...props },
    ref
) {
    return (
        <div
            {...props}
            ref={ref}
            className={clsx('sd-navigation_rail', className)}
            style={{
                ...(fixed === true
                    ? {
                          position: 'fixed',
                          zIndex: typeof fixed === 'boolean' ? 2 : fixed,
                          top: '0',
                          left: '0',
                          height: '100%',
                          boxSizing: 'border-box',
                      }
                    : undefined),
                ...style,
            }}
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

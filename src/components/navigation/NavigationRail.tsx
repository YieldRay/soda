import './navigation.scss'
import { Helper, HelperItem } from './Helper'
import clsx from 'clsx'
import assign from 'lodash-es/assign'
import { createPortal } from 'react-dom'
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
         * Fix the component to the left of the window
         */
        fixed?: boolean
    }>
>(function NavigationRail(
    { fab, items, fixed, onChange, className, style, ...props },
    ref
) {
    const ele = (
        <div
            {...props}
            ref={ref}
            className={clsx('sd-navigation_rail', className)}
            style={assign(
                fixed
                    ? {
                          position: 'fixed',
                          top: '0',
                          left: '0',
                          height: '100%',
                          boxSizing: 'border-box',
                      }
                    : {},
                style
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

    if (fixed) return createPortal(ele, document.body)
    return ele
})

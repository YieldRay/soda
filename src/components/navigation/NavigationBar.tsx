import './navigation.scss'
import { createPortal } from 'react-dom'
import assign from 'lodash-es/assign'
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
         * Fix the component to the bottom of the window
         */
        fixed?: boolean
    }>
>(function NavigationBar(
    { items, fixed, onChange, className, style, ...props },
    ref
) {
    const ele = (
        <div
            {...props}
            ref={ref}
            className={clsx('sd-navigation_bar', className)}
            style={assign(
                fixed
                    ? {
                          position: 'fixed',
                          bottom: '0',
                          width: '100%',
                          boxSizing: 'border-box',
                      }
                    : {},
                style
            )}
        >
            {items.map((item) => (
                <Helper {...item} onClick={() => onChange?.(item)}></Helper>
            ))}
        </div>
    )

    if (fixed) return createPortal(ele, document.body)
    return ele
})

import './menu.scss'
import clsx from 'clsx'
import { forwardRef } from 'react'
import { ExtendProps } from '@/utils/type'

/**
 * The `<Menu>` container, will contain `<MenuItem>` and `<Divider>` components
 *
 * @specs https://m3.material.io/components/menus/specs
 */
export const Menu = forwardRef<
    HTMLUListElement,
    ExtendProps<{ children?: React.ReactNode }>
>(function Menu({ className, children, ...props }, ref) {
    return (
        <ul {...props} ref={ref} className={clsx('sd-menu', className)}>
            {children}
        </ul>
    )
})

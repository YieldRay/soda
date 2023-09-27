import './menu.scss'
import clsx from 'clsx'
import { ExtendProps } from '@/utils/type'
import { forwardRef } from 'react'

/**
 * The `<Menu>` container, will contain `<MenuItem>` and `<Divider>` components
 * @specs https://m3.material.io/components/menus/specs
 */
export const Menu = forwardRef<
    HTMLMenuElement,
    ExtendProps<{ children?: React.ReactNode }>
>(function Menu({ className, children, ...props }, ref) {
    return (
        <menu {...props} ref={ref} className={clsx('sd-menu', className)}>
            {children}
        </menu>
    )
})

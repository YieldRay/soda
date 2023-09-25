import './menu.scss'
import omit from 'lodash-es/omit'
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
>(function Menu(props, ref) {
    return (
        <menu
            {...omit(props, 'className', 'children')}
            ref={ref}
            className={clsx('sd-menu', props.className)}
        >
            {props.children}
        </menu>
    )
})

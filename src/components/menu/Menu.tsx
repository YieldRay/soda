import './menu.scss'
import omit from 'lodash-es/omit'
import clsx from 'clsx'
import { ExtendProps } from '@/utils/type'

/**
 * The `<Menu>` container, will contain `<MenuItem>` and `<Divider>` components
 * @specs https://m3.material.io/components/menus/specs
 */
export function Menu(props: ExtendProps<{ children?: React.ReactNode }>) {
    return (
        <div
            className={clsx('sd-menu', props.className)}
            {...omit(props, 'className')}
        >
            {props.children}
        </div>
    )
}

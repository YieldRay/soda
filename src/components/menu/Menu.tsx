import './menu.scss'
import omit from 'lodash-es/omit'
import clsx from 'clsx'

/**
 * The `<Menu>` container, will contain `<MenuItem>` and `<Divider>` components
 * @specs https://m3.material.io/components/menus/specs
 */
export function Menu(
    props: { children?: React.ReactNode } & React.HTMLProps<HTMLDivElement>
) {
    return (
        <div
            className={clsx('sd-menu', props.className)}
            {...omit(props, 'className')}
        >
            {props.children}
        </div>
    )
}

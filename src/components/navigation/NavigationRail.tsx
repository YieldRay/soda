import './navigation.scss'
import { Helper, HelperItem } from './Helper'
import clsx from 'clsx'
import assign from 'lodash-es/assign'
import omit from 'lodash-es/omit'
import { createPortal } from 'react-dom'

export function NavigationRail(
    props: {
        fab: React.ReactNode
        items: Array<HelperItem & { key: React.Key }>
        onChange?(item: HelperItem & { key: React.Key }): void
        fixed?: boolean
    } & Omit<
        React.HTMLProps<HTMLDivElement>,
        'onChange' | 'items' | 'fixed' | 'fab'
    >
) {
    const ele = (
        <div
            className={clsx('sd-navigation_rail', props.className)}
            {...omit(props, ['className', 'style', 'onChange', 'fixed', 'fab'])}
            style={assign(
                props.fixed
                    ? {
                          position: 'fixed',
                          top: '0',
                          left: '0',
                          height: '100%',
                          boxSizing: 'border-box',
                      }
                    : {},
                props.style
            )}
        >
            <div className="sd-navigation_rail-fab">{props.fab}</div>
            <div className="sd-navigation_rail-items">
                {props.items.map((item) => (
                    <Helper
                        {...item}
                        onClick={() => props.onChange?.(item)}
                    ></Helper>
                ))}
            </div>
        </div>
    )

    if (props.fixed) return createPortal(ele, document.body)
    return ele
}

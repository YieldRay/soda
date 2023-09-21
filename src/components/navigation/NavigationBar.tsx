import './navigation.scss'
import { createPortal } from 'react-dom'
import assign from 'lodash-es/assign'
import omit from 'lodash-es/omit'
import clsx from 'clsx'
import { Helper, HelperItem } from './Helper'

/**
 * https://m3.material.io/components/navigation-bar/specs
 */
export function NavigationBar(
    props: {
        items: Array<HelperItem & { key: React.Key }>
        onChange?(item: HelperItem & { key: React.Key }): void
        fixed?: boolean
    } & Omit<React.HTMLProps<HTMLDivElement>, 'onChange' | 'items' | 'fixed'>
) {
    const ele = (
        <div
            className={clsx('sd-navigation_bar', props.className)}
            {...omit(props, ['className', 'style', 'onChange', 'fixed'])}
            style={assign(
                props.fixed
                    ? {
                          position: 'fixed',
                          bottom: '0',
                          width: '100%',
                          boxSizing: 'border-box',
                      }
                    : {},
                props.style
            )}
        >
            {props.items.map((item) => (
                <Helper
                    {...item}
                    onClick={() => props.onChange?.(item)}
                ></Helper>
            ))}
        </div>
    )

    if (props.fixed) return createPortal(ele, document.body)
    return ele
}

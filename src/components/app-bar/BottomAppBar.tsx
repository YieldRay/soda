import './app-bar.scss'
import clsx from 'clsx'
import assign from 'lodash-es/assign'
import { createPortal } from 'react-dom'

/**
 * @specs https://m3.material.io/components/bottom-app-bar/specs
 * BottonAppBar has fixed height = 80px
 */
export function BottomAppBar(props: {
    children?: React.ReactNode
    style?: React.CSSProperties
    className?: string
    fixed?: boolean
}) {
    const ele = (
        <div
            className={clsx('sd-bottom_app_bar', props.className)}
            style={assign(
                props.fixed
                    ? { position: 'fixed', left: '0', bottom: '0' }
                    : undefined,
                props.style
            )}
        >
            {props.children}
        </div>
    )

    if (props.fixed) return createPortal(ele, document.body)
    return ele
}

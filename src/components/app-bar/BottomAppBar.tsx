import './app-bar.scss'
import { ExtendProps } from '@/utils/type'
import clsx from 'clsx'
import assign from 'lodash-es/assign'
import { forwardRef } from 'react'
import { createPortal } from 'react-dom'
import omit from 'lodash-es/omit'

/**
 * BottonAppBar has fixed height = 80px
 * @specs https://m3.material.io/components/bottom-app-bar/specs
 */
export const BottomAppBar = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        children?: React.ReactNode
        fixed?: boolean
    }>
>(function BottomAppBar(props, ref) {
    const ele = (
        <div
            {...omit(props, ['className', 'style', 'fixed'])}
            ref={ref}
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
})

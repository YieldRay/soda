import './app-bar.scss'
import { ExtendProps } from '@/utils/type'
import clsx from 'clsx'
import assign from 'lodash-es/assign'
import { forwardRef } from 'react'
import { createPortal } from 'react-dom'

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
>(function BottomAppBar({ fixed, className, style, ...props }, ref) {
    const ele = (
        <div
            {...props}
            ref={ref}
            className={clsx('sd-bottom_app_bar', className)}
            style={assign(
                fixed
                    ? { position: 'fixed', left: '0', bottom: '0' }
                    : undefined,
                style
            )}
        >
            {props.children}
        </div>
    )

    if (fixed) return createPortal(ele, document.body)
    return ele
})

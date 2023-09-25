import './app-bar.scss'
import clsx from 'clsx'
import { createPortal } from 'react-dom'
import assign from 'lodash-es/assign'
import { forwardRef } from 'react'
import { ExtendProps } from '@/utils/type'
import omit from 'lodash-es/omit'

/**
 * @specs https://m3.material.io/components/top-app-bar/specs
 */
export const TopAppBar = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        children?: React.ReactNode
        leadingNavigationIcon?: React.ReactNode
        trailingIcon?: React.ReactNode
        fixed?: boolean
        /**
         * @default small
         */
        sd?: 'center' | 'small' | 'medium' | 'large'
    }>
>(function TopAppBar(props, ref) {
    const sd = props.sd || 'small'
    const ele = (
        <div
            {...omit(props, [
                'className',
                'style',
                'children',
                'leadingNavigationIcon',
                'trailingIcon',
                'fixed',
                'sd',
            ])}
            ref={ref}
            className={clsx('sd-top_app_bar', props.className)}
            style={assign(
                props.fixed
                    ? { position: 'fixed', left: '0', top: '0' }
                    : undefined,
                props.style
            )}
            data-sd={sd}
        >
            <div className="sd-top_app_bar-helper">
                <div className="sd-top_app_bar-leading_navigation_icon">
                    {props.leadingNavigationIcon}
                </div>
                {(sd === 'small' || sd === 'center') && (
                    <div className="sd-top_app_bar-headline">
                        {props.children}
                    </div>
                )}
                <div className="sd-top_app_bar-trailing_icon">
                    {props.trailingIcon}
                </div>
            </div>
            {(sd === 'medium' || sd === 'large') && (
                <div className="sd-top_app_bar-headline"> {props.children}</div>
            )}
        </div>
    )
    if (props.fixed) return createPortal(ele, document.body)
    return ele
})

import './app-bar.scss'
import clsx from 'clsx'
import { createPortal } from 'react-dom'
import { forwardRef } from 'react'
import { ExtendProps } from '@/utils/type'

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
>(function TopAppBar(
    {
        leadingNavigationIcon,
        trailingIcon,
        fixed,
        children,
        sd: initSd,
        className,
        style,
        ...props
    },
    ref
) {
    const sd = initSd || 'small'
    const ele = (
        <div
            {...props}
            ref={ref}
            className={clsx('sd-top_app_bar', className)}
            style={{
                ...(fixed
                    ? { position: 'fixed', left: '0', top: '0' }
                    : undefined),
                ...style,
            }}
            data-sd={sd}
        >
            <div className="sd-top_app_bar-helper">
                <div className="sd-top_app_bar-leading_navigation_icon">
                    {leadingNavigationIcon}
                </div>
                {(sd === 'small' || sd === 'center') && (
                    <div className="sd-top_app_bar-headline">{children}</div>
                )}
                <div className="sd-top_app_bar-trailing_icon">
                    {trailingIcon}
                </div>
            </div>
            {(sd === 'medium' || sd === 'large') && (
                <div className="sd-top_app_bar-headline"> {children}</div>
            )}
        </div>
    )
    if (fixed) return createPortal(ele, document.body)
    return ele
})

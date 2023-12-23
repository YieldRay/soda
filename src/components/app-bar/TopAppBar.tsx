import './app-bar.scss'
import clsx from 'clsx'
import { forwardRef } from 'react'
import { ExtendProps } from '@/utils/type'
import { Portal } from '@/utils/Portal'

/**
 *
 * @specs https://m3.material.io/components/top-app-bar/specs
 */
export const TopAppBar = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        children?: React.ReactNode
        /**
         * This affect the hight, e.g.:
         *
         * small/medium 64px  medium 112px  large 152px
         * @default small
         */
        sd?: 'center' | 'small' | 'medium' | 'large'
        leadingNavigationIcon?: React.ReactNode
        trailingIcon?: React.ReactNode
        fixed?: boolean
        /**
         * Only works if `fixed` set to true
         */
        teleportTo?: Element | DocumentFragment
    }>
>(function TopAppBar(
    {
        leadingNavigationIcon,
        trailingIcon,
        fixed,
        teleportTo,
        children,
        sd: initSd,
        className,
        style,
        ...props
    },
    ref
) {
    const sd = initSd || 'small'

    const topAppBar = (
        <div
            {...props}
            ref={ref}
            className={clsx('sd-top_app_bar', className)}
            style={{
                position: fixed ? 'fixed' : undefined,
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
                <div className="sd-top_app_bar-headline">{children}</div>
            )}
        </div>
    )

    if (fixed) return <Portal container={teleportTo}>{topAppBar}</Portal>
    return topAppBar
})

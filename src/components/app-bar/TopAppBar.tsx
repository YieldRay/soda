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
         * This affect the height, e.g.:
         *
         * small/medium 64px  medium 112px  large 152px
         * @default small
         */
        variant?: 'center' | 'small' | 'medium' | 'large'
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
        variant = 'small',
        className,
        style,
        ...props
    },
    ref
) {
    const topAppBar = (
        <div
            {...props}
            ref={ref}
            className={clsx('sd-top_app_bar', className)}
            style={{
                position: fixed ? 'fixed' : undefined,
                ...style,
            }}
            data-sd={variant}
        >
            <div className="sd-top_app_bar-helper">
                <div className="sd-top_app_bar-leading_navigation_icon">
                    {leadingNavigationIcon}
                </div>
                {(variant === 'small' || variant === 'center') && (
                    <div className="sd-top_app_bar-headline">{children}</div>
                )}
                <div className="sd-top_app_bar-trailing_icon">
                    {trailingIcon}
                </div>
            </div>
            {(variant === 'medium' || variant === 'large') && (
                <div className="sd-top_app_bar-headline">{children}</div>
            )}
        </div>
    )

    if (fixed) return <Portal container={teleportTo}>{topAppBar}</Portal>
    return topAppBar
})

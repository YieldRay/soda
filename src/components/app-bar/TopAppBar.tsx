import './app-bar.scss'
import clsx from 'clsx'
import { forwardRef } from 'react'
import { mergeStyles } from '@/utils/style'
import { ExtendProps } from '@/utils/type'

/**
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
         * @default "small"
         */
        variant?: 'center' | 'small' | 'medium' | 'large'
        leadingNavigationIcon?: React.ReactNode
        trailingIcon?: React.ReactNode
        /**
         * Fix the component to the top side,
         *
         * See also `zIndex` `inset`
         */
        fixed?: boolean
        /**
         * CSS `z-index`, if `fixed` set to `true`
         *
         * @default 1
         */
        zIndex?: number
        /**
         * CSS `inset`, if `fixed` set to `true`
         */
        inset?: string
    }>
>(function TopAppBar(
    {
        leadingNavigationIcon,
        trailingIcon,
        fixed,
        zIndex = 1,
        inset = '0 0 auto',
        variant = 'small',
        children,
        className,
        style,
        ...props
    },
    ref,
) {
    return (
        <div
            {...props}
            ref={ref}
            className={clsx('sd-top_app_bar', className)}
            style={mergeStyles(
                fixed && {
                    position: 'fixed',
                    zIndex,
                    inset,
                },
                style,
            )}
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
})

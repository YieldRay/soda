import './app-bar.scss'
import clsx from 'clsx'
import { forwardRef } from 'react'
import { ExtendProps } from '@/utils/type'

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
        /**
         * Fix the component to the top side,
         * if set to a number, it also become the zIndex
         */
        fixed?: boolean | number
    }>
>(function TopAppBar(
    {
        leadingNavigationIcon,
        trailingIcon,
        fixed,
        children,
        variant = 'small',
        className,
        style,
        ...props
    },
    ref
) {
    return (
        <div
            {...props}
            ref={ref}
            className={clsx('sd-top_app_bar', className)}
            style={{
                ...(fixed === true
                    ? {
                          position: 'fixed',
                          top: '0',
                          zIndex: typeof fixed === 'boolean' ? 1 : fixed,
                          width: '100%',
                          boxSizing: 'border-box',
                      }
                    : undefined),
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
})

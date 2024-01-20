import './divider.scss'
import { ExtendProps } from '@/utils/type'
import clsx from 'clsx'
import { forwardRef } from 'react'

/**
 * The divider has margin included by default, you can remove it by adding `style={{margin:"0"}}`
 * @specs https://m3.material.io/components/divider/specs
 */
export const Divider = forwardRef<
    HTMLHRElement,
    ExtendProps<{
        /**
         * @default full
         */
        variant?: 'full' | 'inset'
        /**
         * @default horizontal
         */
        direction?: 'horizontal' | 'vertical'
    }>
>(function Divider(
    { variant = 'full', direction = 'horizontal', className, ...props },
    ref
) {
    return (
        <div
            {...props}
            ref={ref}
            className={clsx(
                'sd-divider',
                {
                    'sd-divider-full': variant === 'full',
                    'sd-divider-inset': variant === 'inset',
                },
                className
            )}
            data-sd-direction={direction}
        />
    )
})

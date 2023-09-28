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
        sd?: 'full' | 'inset'
        /**
         * @default horizontal
         */
        direction?: 'horizontal' | 'vertical'
    }>
>(function Divider({ sd, direction, className, ...props }, ref) {
    return (
        <div
            {...props}
            ref={ref}
            className={clsx(
                {
                    'sd-divider': true,
                    'sd-divider-full': sd === 'full' || sd == undefined,
                    'sd-divider-inset': sd === 'inset',
                },
                className
            )}
            data-sd-direction={
                direction === 'vertical' ? 'vertical' : 'horizontal'
            }
        ></div>
    )
})

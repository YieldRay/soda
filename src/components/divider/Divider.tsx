import './divider.scss'
import { ExtendProps } from '@/utils/type'
import clsx from 'clsx'
import omit from 'lodash-es/omit'
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
         * @default horizon
         */
        direction?: 'horizon' | 'vertical'
    }>
>(function Divider(props, ref) {
    return (
        <div
            {...omit(props, 'sd', 'direction', 'className')}
            ref={ref}
            className={clsx(
                {
                    'sd-divider': true,
                    'sd-divider-full':
                        props.sd === 'full' || props.sd == undefined,
                    'sd-divider-inset': props.sd === 'inset',
                },
                props.className
            )}
            data-sd-direction={
                props.direction === 'vertical' ? 'vertical' : 'horizon'
            }
        ></div>
    )
})

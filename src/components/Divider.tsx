import clsx from 'clsx'
import omit from 'lodash-es/omit'
import { forwardRef } from 'react'

// @specs https://m3.material.io/components/divider/specs
export const Divider = forwardRef<
    HTMLDivElement,
    {
        /**
         * @default full
         */
        sd?: 'full' | 'inset'
        /**
         * @default horizon
         */
        direction?: 'horizon' | 'vertical'
        className?: string
    } & {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any
    }
>((props, ref) => (
    <div
        {...omit(props, 'sd', 'direction', 'className', 'ref')}
        data-sd-type={props.direction === 'vertical' ? 'vertical' : 'horizon'}
        className={clsx(
            {
                'sd-divider': true,
                'sd-divider-full': props.sd === 'full' || props.sd == undefined,
                'sd-divider-inset': props.sd === 'inset',
            },
            props.className
        )}
        ref={ref}
    ></div>
))

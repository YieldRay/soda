import clsx from 'clsx'
import omit from 'lodash-es/omit'
import { forwardRef } from 'react'

/**
 * @specs https://m3.material.io/components/tooltips/specs
 */
export const PlainTooltip = forwardRef<
    HTMLDivElement,
    React.HTMLProps<HTMLDivElement>
>(function PlainTooltip(props, ref) {
    return (
        <div
            {...omit(props, 'className')}
            ref={ref}
            className={clsx('sd-plain_tooltip', props.className)}
        >
            {props.children}
        </div>
    )
})

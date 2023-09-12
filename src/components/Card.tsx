import clsx from 'clsx'
import omit from 'lodash-es/omit'
import { forwardRef } from 'react'

/**
 * @specs https://m3.material.io/components/cards/specs
 */
export const Card = forwardRef<
    unknown,
    {
        as?: string
        sd: 'outlined' | 'filled' | 'elevated'
        className?: string
    } & {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any
    }
>((props, ref) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const As: any = props.as ?? 'div'

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return (
        <As
            {...omit(props, ['as', 'sd', 'className', 'ref'])}
            className={clsx('sd-card', `sd-card-${props.sd}`, props.className)}
            ref={ref}
        ></As>
    )
})

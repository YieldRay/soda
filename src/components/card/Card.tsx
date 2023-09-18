import './card.scss'
import clsx from 'clsx'
import omit from 'lodash-es/omit'

/**
 * @specs https://m3.material.io/components/cards/specs
 */
export function Card(
    props: {
        as?: string
        sd: 'outlined' | 'filled' | 'elevated'
        className?: string
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } & Record<string, any>
) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const As: any = props.as ?? 'div'

    return (
        <As
            {...omit(props, ['as', 'sd', 'className'])}
            className={clsx('sd-card', `sd-card-${props.sd}`, props.className)}
        ></As>
    )
}

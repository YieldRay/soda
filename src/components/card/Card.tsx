import './card.scss'
import clsx from 'clsx'
import omit from 'lodash-es/omit'

/**
 * @specs https://m3.material.io/components/cards/specs
 */
export function Card(
    props: {
        /**
         * change the container component, custom container should accept className and children property,
         * div by default
         */
        as?:
            | keyof JSX.IntrinsicElements
            | React.FC<{ className?: string; children?: React.ReactNode }>
        /**
         * @default elevated
         */
        sd?: 'outlined' | 'filled' | 'elevated'
        className?: string
        children?: React.ReactNode
    } & Record<string, any>
) {
    const As: any = props.as ?? 'div'
    return (
        <As
            {...omit(props, ['as', 'sd', 'className'])}
            className={clsx(
                'sd-card',
                `sd-card-${props.sd ?? 'elevated'}`,
                props.className
            )}
        >
            {props.children}
        </As>
    )
}

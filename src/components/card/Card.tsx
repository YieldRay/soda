import './card.scss'
import { ExtendProps, TagNameString } from '@/utils/type'
import clsx from 'clsx'
import omit from 'lodash-es/omit'
import { forwardRef } from 'react'

/**
 * @specs https://m3.material.io/components/cards/specs
 */
export const Card = forwardRef<
    HTMLElement,
    ExtendProps<{
        /**
         * change the container component, custom container should accept className and children property,
         * div by default
         */
        as?:
            | TagNameString
            | React.FC<{ className?: string; children?: React.ReactNode }>
        /**
         * @default elevated
         */
        sd?: 'outlined' | 'filled' | 'elevated'
        children?: React.ReactNode
    }>
>(function Card(props, ref) {
    const As: any = props.as || 'div'
    return (
        <As
            {...omit(props, ['as', 'sd', 'className'])}
            ref={ref}
            className={clsx(
                'sd-card',
                `sd-card-${props.sd || 'elevated'}`,
                props.className
            )}
        >
            {props.children}
        </As>
    )
})

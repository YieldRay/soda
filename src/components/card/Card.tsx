import './card.scss'
import { ExtendProps, TagNameString } from '@/utils/type'
import clsx from 'clsx'
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
>(function Card({ sd: initSd, children, as, className, ...props }, ref) {
    const As: any = as || 'div'
    const sd = initSd || 'elevated'

    return (
        <As
            {...props}
            ref={ref}
            className={clsx('sd-card', `sd-card-${sd}`, className)}
        >
            {children}
        </As>
    )
})

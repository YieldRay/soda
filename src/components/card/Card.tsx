import './card.scss'
import { Ripple } from '@/utils/Ripple'
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
         * Change the container component, div by default
         */
        as?: TagNameString
        /**
         * @default elevated
         */
        sd?: 'outlined' | 'filled' | 'elevated'
        children?: React.ReactNode
    }>
>(function Card({ sd: initSd, children, as, className, ...props }, ref) {
    const sd = initSd || 'elevated'

    return (
        <Ripple
            {...props}
            ref={ref}
            as={as || 'div'}
            className={clsx('sd-card', `sd-card-${sd}`, className)}
        >
            {children}
        </Ripple>
    )
})

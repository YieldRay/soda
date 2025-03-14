import './card.scss'
import clsx from 'clsx'
import { forwardRef } from 'react'
import { Ripple } from '@/ripple/Ripple'
import { ExtendProps, TagNameString } from '@/utils/type'

/**
 * You can set the `disabled` property to disable ripple
 *
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
         * Variant
         * @default "elevated"
         */
        variant?: 'outlined' | 'filled' | 'elevated'
        children?: React.ReactNode
    }>
>(function Card(
    { variant = 'elevated', as = 'div', className, children, ...props },
    ref,
) {
    return (
        <Ripple
            {...props}
            ref={ref}
            as={as}
            className={clsx('sd-card', `sd-card-${variant}`, className)}
        >
            {children}
        </Ripple>
    )
})

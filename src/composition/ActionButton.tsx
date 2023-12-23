import './ActionButton.scss'
import { Ripple } from '@/ripple/Ripple'
import clsx from 'clsx'
import { ExtendProps } from '@/utils/type'
import { forwardRef } from 'react'

/**
 * This component is primary for internal use.
 * This component has ref forwarded.
 */
export const ActionButton = forwardRef<
    HTMLElement,
    ExtendProps<{
        inverse?: boolean
        disabled?: boolean
        children?: React.ReactNode
    }>
>(({ className, inverse, disabled, children, ...props }, ref) => {
    return (
        <Ripple
            {...props}
            ref={ref}
            as="button"
            className={clsx('sd-action_button', className)}
            rippleColor={
                inverse ? 'rgb(255 255 255 / 0.1)' : 'rgb(0 0 0 / 0.1)'
            }
            data-sd-inverse={!!inverse}
            data-sd-disabled={!!disabled}
        >
            {children}
        </Ripple>
    )
})

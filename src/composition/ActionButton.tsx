import './ActionButton.scss'
import { Ripple } from '@/ripple/Ripple'
import clsx from 'clsx'
import { ExtendProps } from '@/utils/type'
import { forwardRef, useEffect } from 'react'
import { usePrefersDark } from '@/hooks/use-media-query'

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
    const prefersDark = usePrefersDark()

    const rippleColor = prefersDark
        ? inverse
            ? 'rgb(0 0 0 / 0.1)'
            : 'rgb(255 255 255 / 0.1)'
        : inverse
        ? 'rgb(255 255 255 / 0.1)'
        : 'rgb(0 0 0 / 0.1)'

    useEffect(() => {}, [])

    return (
        <Ripple
            {...props}
            ref={ref}
            as="button"
            className={clsx('sd-action_button', className)}
            rippleColor={rippleColor}
            data-sd-inverse={!!inverse}
            data-sd-disabled={!!disabled}
        >
            {children}
        </Ripple>
    )
})

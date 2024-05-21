import './fab.scss'
import clsx from 'clsx'
import { forwardRef } from 'react'
import { Ripple } from '@/ripple/Ripple'
import { ExtendProps } from '@/utils/type.ts'

/**
 * @specs https://m3.material.io/components/floating-action-button/specs
 */
export const Fab = forwardRef<
    HTMLElement,
    ExtendProps<{
        /**
         * @default surface
         */
        variant?: 'surface' | 'secondary' | 'tertiary'
        /**
         * @default default
         */
        size?: 'default' | 'small' | 'large'
        extended?: boolean
        disabled?: boolean
        children?: React.ReactNode
    }>
>(function Fab(
    {
        variant = 'surface',
        size = 'default',
        extended = false,
        disabled,
        className,
        children,
        ...props
    },
    ref,
) {
    return (
        <Ripple
            {...props}
            ref={ref}
            as="button"
            className={clsx('sd-fab', className)}
            data-sd={variant}
            data-sd-size={size}
            data-sd-extended={extended}
            data-sd-disabled={disabled}
            aria-disabled={disabled}
            role="button"
        >
            <div className="sd-fab-icon">{children}</div>
        </Ripple>
    )
})

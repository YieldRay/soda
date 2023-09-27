import './fab.scss'
import { Ripple } from '@/utils/Ripple.tsx'
import clsx from 'clsx'
import { ExtendProps, TagNameString } from '@/utils/type.ts'
import { forwardRef } from 'react'

/**
 * @specs https://m3.material.io/components/floating-action-button/specs
 */
export const Fab = forwardRef<
    HTMLElement,
    ExtendProps<{
        /**
         * @default surface
         */
        sd?: 'surface' | 'secondary' | 'tertiary'
        /**
         * @default default
         */
        size?: 'default' | 'small' | 'large'
        children?: React.ReactNode
        extended?: boolean
        disabled?: boolean
        as?: TagNameString
    }>
>(function Fab(
    { sd, className, size, children, extended, disabled, as, ...props },
    ref
) {
    return (
        <Ripple
            {...props}
            ref={ref}
            as={as || 'button'}
            className={clsx('sd-fab', className)}
            data-sd={sd || 'surface'}
            data-sd-size={size || 'default'}
            data-sd-extended={extended}
            data-sd-disabled={disabled}
        >
            <div className="sd-fab-icon">{children}</div>
        </Ripple>
    )
})

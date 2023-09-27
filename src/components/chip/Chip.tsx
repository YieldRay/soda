import './chip.scss'
import clsx from 'clsx'
import { Ripple } from '@/utils/Ripple.tsx'
import { forwardRef } from 'react'
import { ExtendProps } from '@/utils/type.ts'
import omit from 'lodash-es/omit'

/**
 * @specs https://m3.material.io/components/chips/specs
 */
export const Chip = forwardRef<
    HTMLElement,
    ExtendProps<{
        /**
         * @default outlined
         */
        sd?: 'outlined' | 'tonal'
        children: React.ReactNode
        className?: string
        leadingIcon?: React.ReactNode
        trailingIcon?: React.ReactNode
        disabled?: boolean
        onClick?: () => void
    }>
>(function Chip(
    { sd, children, leadingIcon, trailingIcon, disabled, onClick, ...props },
    ref
) {
    return (
        <Ripple
            {...omit(props, ['className', 'as'])}
            ref={ref}
            className={clsx(
                'sd-chip',
                `sd-chip-${sd || 'outlined'}`,
                props.className
            )}
            onClick={onClick}
            data-sd-disabled={disabled}
        >
            {leadingIcon && (
                <div className="sd-chip-leading_icon">{leadingIcon}</div>
            )}

            <div className="sd-chip-label_text">{children}</div>

            {trailingIcon && (
                <div className="sd-chip-trailing_icon">{trailingIcon}</div>
            )}
        </Ripple>
    )
})

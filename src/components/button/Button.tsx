import './button.scss'
import clsx from 'clsx'
import { Ripple } from '@/utils/Ripple'
import { ExtendProps } from '@/utils/type'
import { forwardRef } from 'react'
import omit from 'lodash-es/omit'

/**
 * @specs https://m3.material.io/components/buttons/specs
 */
export const Button = forwardRef<
    HTMLElement,
    ExtendProps<
        {
            /**
             * @default filled
             */
            sd?: 'outlined' | 'filled' | 'elevated' | 'tonal' | 'text'
            disabled?: boolean
            children?: React.ReactNode
        },
        HTMLButtonElement
    >
>(function Button(
    { sd: initSd, className, disabled, children, type, ...props },
    ref
) {
    const sd = initSd || 'filled'

    return (
        <Ripple
            {...omit(props, 'as')}
            ref={ref}
            type={type ?? 'button'}
            className={clsx('sd-button', `sd-button-${sd}`, className)}
            data-sd-disabled={disabled}
        >
            {children}
        </Ripple>
    )
})

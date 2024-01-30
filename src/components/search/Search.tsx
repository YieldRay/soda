import './search.scss'
import { ExtendProps } from '@/utils/type'
import clsx from 'clsx'
import { forwardRef } from 'react'

/**
 * @specs https://m3.material.io/components/search/specs
 */
export const Search = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        placeholder?: string
        leadingIcon?: React.ReactNode
        trailingIcon?: React.ReactNode
        /**
         * @default bar
         */
        variant?: 'bar' | 'view'
        full?: boolean
        inputProps?: React.ComponentProps<'input'>
        value?: string
        defaultValue?: string
        onChange?: (value: string) => void
    }>
>(function Search(
    {
        variant = 'bar',
        placeholder,
        leadingIcon,
        trailingIcon,
        full = false,
        defaultValue,
        value,
        onChange,
        inputProps,
        className,
        style,
        ...props
    },
    ref
) {
    return (
        <div
            {...props}
            ref={ref}
            className={clsx('sd-search', className)}
            style={{ ...style, width: full ? '100%' : '' }}
            data-sd={variant}
        >
            <div className="sd-search-leading_icon">{leadingIcon}</div>
            <input
                type="text"
                {...inputProps}
                className={clsx(
                    'sd-search-supporting_text',
                    inputProps?.className
                )}
                placeholder={placeholder}
                defaultValue={defaultValue}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
            />
            <div className="sd-search-trailing_icon">{trailingIcon}</div>
        </div>
    )
})

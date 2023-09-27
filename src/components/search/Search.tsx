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
        sd?: 'bar' | 'view'
        value?: string
        onChange?: (value: string) => void
    }>
>(function Search(
    {
        placeholder,
        leadingIcon,
        trailingIcon,
        sd: initSd,
        value,
        onChange,
        className,
        ...props
    },
    ref
) {
    const sd = initSd === 'view' ? 'view' : 'bar'

    return (
        <div
            {...props}
            ref={ref}
            className={clsx('sd-search', className)}
            data-sd={sd}
        >
            <div className="sd-search-leading_icon">{leadingIcon}</div>
            <input
                type="text"
                className="sd-search-supporting_text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
            />
            <div className="sd-search-trailing_icon">{trailingIcon}</div>
        </div>
    )
})

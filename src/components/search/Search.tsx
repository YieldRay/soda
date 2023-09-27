import './search.scss'
import { forwardRef } from 'react'

/**
 * warn: this component forward the inner input element for ref
 * @specs https://m3.material.io/components/search/specs
 */
export const Search = forwardRef<
    HTMLInputElement,
    {
        placeholder?: string
        leadingIcon?: React.ReactNode
        trailingIcon?: React.ReactNode
        /**
         * @default bar
         */
        sd?: 'bar' | 'view'
        value?: string
        onChange?: (value: string) => void
    }
>(function Search(
    { placeholder, leadingIcon, trailingIcon, sd: initSd, value, onChange },
    ref
) {
    const sd = initSd === 'view' ? 'view' : 'bar'

    return (
        <div className="sd-search" data-sd={sd}>
            <div className="sd-search-leading_icon">{leadingIcon}</div>
            <input
                type="text"
                className="sd-search-supporting_text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                ref={ref}
            />
            <div className="sd-search-trailing_icon">{trailingIcon}</div>
        </div>
    )
})

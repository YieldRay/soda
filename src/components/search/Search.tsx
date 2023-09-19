import './search.scss'
import { forwardRef } from 'react'

/**
 * @specs https://m3.material.io/components/search/specs
 */
export const Search = forwardRef<
    HTMLInputElement,
    {
        placeholder?: string
        leadingIcon?: React.ReactNode
        trailingIcon?: React.ReactNode
        sd?: 'bar' | 'view'
        value?: string
        onChange?: (value: string) => void
    }
>((props, ref) => {
    return (
        <div
            className="sd-search"
            data-sd={props.sd === 'view' ? 'view' : 'bar'}
        >
            <div className="sd-search-leading_icon">{props.leadingIcon}</div>
            <input
                type="text"
                className="sd-search-supporting_text"
                placeholder={props.placeholder}
                value={props.value}
                onChange={(e) => props.onChange?.(e.target.value)}
                ref={ref}
            />
            <div className="sd-search-trailing_icon">{props.trailingIcon}</div>
        </div>
    )
})

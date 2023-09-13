import { forwardRef } from 'react'

/**
 * @specs https://m3.material.io/components/search/specs
 */
export const Search = forwardRef<
    HTMLInputElement,
    {
        placeholder?: string
        /**
         * provide one item or an array, each item is an icon button
         */
        leadingIcon?: React.ReactNode | React.ReactNode[]
        /**
         * provide one item or an array, each item is an icon button
         */
        trailingIcon?: React.ReactNode | React.ReactNode[]
        sd?: 'bar' | 'view'
        value?: string
        onChange?: (value: string) => void
    }
>((props, ref) => {
    const left = props.leadingIcon
        ? (Array.isArray(props.leadingIcon)
              ? props.leadingIcon
              : [props.leadingIcon]
          ).map((icon, i) => (
              <div key={i} className="sd-search-leading_icon">
                  {icon}
              </div>
          ))
        : null

    const right = props.trailingIcon
        ? (Array.isArray(props.trailingIcon)
              ? props.trailingIcon
              : [props.trailingIcon]
          ).map((icon, i) => (
              <div key={i} className="sd-search-trailing_icon">
                  {icon}
              </div>
          ))
        : null

    return (
        <div
            className="sd-search"
            data-sd={props.sd === 'view' ? 'view' : 'bar'}
        >
            {left}
            <input
                type="text"
                className="sd-search-supporting_text"
                placeholder={props.placeholder}
                value={props.value}
                onChange={(e) => props.onChange?.(e.target.value)}
                ref={ref}
            />
            {right}
        </div>
    )
})

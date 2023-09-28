import './text-field.scss'
import { forwardRef, useRef, useState } from 'react'
import clsx from 'clsx'
import { ExtendProps } from '@/utils/type'

/**
 * [warn]: This component forward the inner input element for ref
 * @specs https://m3.material.io/components/text-fields/specs
 */
export const TextField = forwardRef<
    HTMLInputElement,
    ExtendProps<{
        leadingIcon?: React.ReactNode
        trailingIcon?: React.ReactNode
        labelText?: string
        supportingText?: string
        type?: 'text' | 'number'
        value?: string | number
        onChange?: (text: string | number) => void
        readonly?: boolean
        disabled?: boolean
        error?: boolean
        /**
         * @default filled
         */
        sd?: 'filled' | 'outlined'
    }>
>(function TextField(
    {
        leadingIcon,
        trailingIcon,
        labelText,
        supportingText,
        type,
        value,
        readonly,
        disabled,
        error,
        sd: initSd,
        onChange: initOnChange,
        className,
        style,
        ...props
    },
    ref
) {
    const stringValue = String(value || '')
    const [focusd, setFocusd] = useState(false)
    const [length, setLength] = useState(stringValue.length)
    const populated = length > 0 || focusd
    const inputRef = useRef<HTMLInputElement>(null)

    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        const value = (e.target as HTMLInputElement).value
        setLength(String(value).length)
        initOnChange?.(value)
    }

    const sd = initSd === 'outlined' ? 'outlined' : 'filled'
    return (
        <div
            {...props}
            className={clsx('sd-text_field', className)}
            style={style}
            onClick={() => {
                inputRef.current?.focus() //? once the container is clicked, focus the input element
                setFocusd(true)
            }}
            // https://stackoverflow.com/questions/37609049/how-to-correctly-catch-change-focusout-event-on-text-input-in-react-js
            onFocus={() => setFocusd(true)}
            onBlur={() => setFocusd(false)}
            tabIndex={-1}
            data-sd={sd}
            data-sd-label_text={populated ? 'populated' : 'empty'}
            data-sd-disabled={disabled}
            data-sd-error={error}
            data-sd-focusd={focusd}
        >
            {leadingIcon && (
                <div className="sd-text_field-leading_icon">{leadingIcon}</div>
            )}

            <Helper sd={sd}>
                <div
                    key="sd-text_field-label_text"
                    className="sd-text_field-label_text"
                >
                    {labelText}
                </div>
                <input
                    key="input"
                    type={type}
                    ref={ref}
                    value={value}
                    onChange={onChange}
                    readOnly={readonly}
                    disabled={disabled}
                />
            </Helper>

            {trailingIcon && (
                <div className="sd-text_field-trailing_icon">
                    {trailingIcon}
                </div>
            )}

            {sd !== 'outlined' && (
                <div className="sd-text_field-active_indicator"></div>
            )}

            {supportingText && (
                <div className="sd-text_field-supporting_text">
                    {supportingText}
                </div>
            )}
        </div>
    )
})

const Helper = ({
    children,
    sd,
}: {
    children: React.ReactNode
    sd?: 'filled' | 'outlined'
}) =>
    sd === 'outlined' ? (
        <>{children}</>
    ) : (
        <div className="sd-text_field-filled_helper">{children}</div>
    )

import './text-field.scss'
import clsx from 'clsx'
import { forwardRef, useEffect, useId, useRef, useState } from 'react'
import { useAutoState } from '@/hooks/use-auto-state'
import { useMergeEventHandlers } from '@/hooks/use-merge'
import { setReactRef, type ReactRef } from '@/utils/react-ref'
import { type ExtendProps } from '@/utils/type'

type InternalHTMLElement = HTMLInputElement | HTMLTextAreaElement

/**
 * Set `textarea` to `true` to enable textarea style
 *
 * @specs https://m3.material.io/components/text-fields/specs
 */
export const TextField = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        leadingIcon?: React.ReactNode
        trailingIcon?: React.ReactNode
        labelText?: React.ReactNode
        supportingText?: React.ReactNode
        value?: string
        defaultValue?: string
        onChange?: (text: string) => void
        readonly?: boolean
        disabled?: boolean
        error?: boolean
        /**
         * Textarea will ignore this and only show as filled style
         * @default "filled"
         */
        variant?: 'filled' | 'outlined'
        /**
         * Set to true to change the internal element to `<textarea>`
         */
        textarea?: boolean
        /**
         * Rows only for textarea
         * @default 2
         */
        rows?: number
        placeholder?: string
        /**
         * For access the internal input element
         *
         * !WARNING: (for typescript user) use `const ref = useRef<HTMLInputElement | undefined>()` to create a MutableRefObject
         */
        inputRef?: ReactRef<HTMLInputElement | undefined>
        /**
         * For access the internal textarea element
         *
         * !WARNING: (for typescript user) use `const ref = useRef<HTMLInputElement | undefined>()` to create a MutableRefObject
         */
        textareaRef?: ReactRef<HTMLTextAreaElement | undefined>
        /**
         * For internal use, control if focused is shown
         */
        'data-sd-focus'?: boolean
    }>
>(function TextField(
    {
        leadingIcon,
        trailingIcon,
        labelText,
        supportingText,
        value: value$co,
        defaultValue = '',
        readonly,
        disabled,
        error,
        variant = 'filled',
        onChange,
        textarea,
        rows = 2,
        placeholder: initPlaceholder,
        inputRef,
        textareaRef,
        className,
        style,
        'data-sd-focus': dataSdFocus,
        ...props
    },
    ref,
) {
    const labelId = useId()
    const supportingTextId = useId()

    const [value, setValue] = useAutoState<string>(
        onChange,
        value$co,
        defaultValue,
    )

    const [focus, setFocus] = useState(false)
    const { length } = String(value || '')
    const populated = length > 0 || focus
    // use css `:placeholder-shown` requires `placeholder` attribute (even empty) present
    // but we use js here so we can bypass that limitation
    const placeholder = populated || !labelText ? initPlaceholder : undefined
    const innerRef = useRef<InternalHTMLElement>(null)

    const handleChange = (e: React.FormEvent<InternalHTMLElement>) => {
        const value = (e.target as InternalHTMLElement).value
        setValue(value)
    }

    useEffect(() => {
        // set ref
        if (textarea) {
            setReactRef(textareaRef, innerRef.current)
        } else {
            setReactRef(inputRef, innerRef.current)
        }
    }, [textarea, textareaRef, inputRef])

    const inputNode = (
        <>
            <Helper sd={labelText ? variant : 'outlined'}>
                {labelText && (
                    <div
                        key="sd-text_field-label_text"
                        className="sd-text_field-label_text"
                        id={labelId}
                    >
                        {labelText}
                    </div>
                )}
                {!textarea && (
                    <input
                        ref={innerRef as React.ForwardedRef<HTMLInputElement>}
                        onChange={handleChange}
                        value={value}
                        readOnly={readonly}
                        disabled={disabled}
                        placeholder={placeholder}
                        aria-labelledby={labelText ? labelId : undefined}
                        aria-describedby={
                            supportingText ? supportingTextId : undefined
                        }
                        aria-invalid={error}
                    />
                )}
            </Helper>
            {textarea && (
                <textarea
                    ref={innerRef as React.ForwardedRef<HTMLTextAreaElement>}
                    onChange={handleChange}
                    value={value}
                    readOnly={readonly}
                    disabled={disabled}
                    placeholder={placeholder}
                    rows={rows}
                    aria-labelledby={labelText ? labelId : undefined}
                    aria-describedby={
                        supportingText ? supportingTextId : undefined
                    }
                    aria-invalid={error}
                />
            )}
        </>
    )

    return (
        <div
            {...props}
            ref={ref}
            className={clsx('sd-text_field', className)}
            style={style}
            onClick={useMergeEventHandlers(props.onClick, () => {
                innerRef.current?.focus() //? once the container is clicked, focus the input element
                setFocus(true)
            })}
            // https://stackoverflow.com/questions/37609049/how-to-correctly-catch-change-focusout-event-on-text-input-in-react-js
            onFocus={useMergeEventHandlers(props.onFocus, () => setFocus(true))}
            onBlur={useMergeEventHandlers(props.onBlur, () => setFocus(false))}
            tabIndex={-1}
            data-sd={variant}
            data-sd-label_text={populated ? 'populated' : 'empty'}
            data-sd-disabled={disabled}
            data-sd-error={error}
            data-sd-focus={dataSdFocus || focus}
        >
            {leadingIcon && (
                <div className="sd-text_field-leading_icon">{leadingIcon}</div>
            )}

            {inputNode}

            {trailingIcon && (
                <div className="sd-text_field-trailing_icon">
                    {trailingIcon}
                </div>
            )}

            {variant !== 'outlined' && (
                <div className="sd-text_field-active_indicator" />
            )}

            {supportingText && (
                <div
                    className="sd-text_field-supporting_text"
                    id={supportingTextId}
                    aria-live={error ? 'polite' : undefined}
                >
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

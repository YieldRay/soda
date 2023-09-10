import { forwardRef, useImperativeHandle, useRef, useState } from 'react'

// @reference https://m3.material.io/components/text-fields/specs
export const TextFields = forwardRef<
    unknown,
    {
        leadingIcon?: React.ReactNode
        tailingIcon?: React.ReactNode
        labelText?: string
        type?: 'text' | 'number'
        value?: string | number
        onChange?: (text: string | number) => void
        readonly?: boolean
        disabled?: boolean
    }
>(function (props, ref) {
    const stringValue = String(props.value || '')
    const [focus, setFocus] = useState(false)
    const [length, setLength] = useState(stringValue.length)
    const populated = length > 0 || focus
    const inputRef = useRef<HTMLInputElement>(null)

    //? forward ref
    useImperativeHandle(ref, () => {
        return inputRef
    })

    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const value: ValueType = e.target.value
        setLength(String(value).length)
        props.onChange?.(value)
    }

    return (
        <div
            className="sd-text_fields"
            onClick={() => {
                inputRef.current?.focus() //? once the container is clicked, focus the input element
                setFocus(true)
            }}
            // https://stackoverflow.com/questions/37609049/how-to-correctly-catch-change-focusout-event-on-text-input-in-react-js
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            data-sd-label_text={populated ? 'populated' : 'empty'}
            data-sd-input_text={props.disabled ? 'disabled' : ''}
        >
            {props.leadingIcon && (
                <div className="sd-text_fields-leading_icon">
                    {props.leadingIcon}
                </div>
            )}

            <div className="sd-text_fields-helper">
                <div className="sd-text_fields-label_text">
                    {props.labelText}
                </div>
                <input
                    type={props.type}
                    ref={inputRef}
                    value={props.value}
                    onChange={onChange}
                    readOnly={props.readonly}
                    disabled={props.disabled}
                />
            </div>

            {props.tailingIcon && (
                <div className="sd-text_fields-tailing_icon">
                    {props.tailingIcon}
                </div>
            )}

            <div className="sd-text_fields-active_indicator"></div>
        </div>
    )
})

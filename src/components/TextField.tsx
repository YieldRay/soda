import {
    ReactNode,
    forwardRef,
    useImperativeHandle,
    useRef,
    useState,
} from 'react'

// @reference https://m3.material.io/components/text-fields/specs
export const TextField = forwardRef<
    unknown,
    {
        leadingIcon?: React.ReactNode
        tailingIcon?: React.ReactNode
        labelText?: string
        supportingText?: string
        type?: 'text' | 'number'
        value?: string | number
        onChange?: (text: string | number) => void
        readonly?: boolean
        disabled?: boolean
        error?: boolean
        sdType?: 'filled' | 'outlined'
    }
>(function (props, ref) {
    const stringValue = String(props.value || '')
    const [focusd, setFocusd] = useState(false)
    const [length, setLength] = useState(stringValue.length)
    const populated = length > 0 || focusd
    const inputRef = useRef<HTMLInputElement>(null)

    //? forward ref
    useImperativeHandle(ref, () => {
        return inputRef.current
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
            className="sd-text_field"
            onClick={() => {
                inputRef.current?.focus() //? once the container is clicked, focus the input element
                setFocusd(true)
            }}
            // https://stackoverflow.com/questions/37609049/how-to-correctly-catch-change-focusout-event-on-text-input-in-react-js
            onFocus={() => setFocusd(true)}
            onBlur={() => setFocusd(false)}
            tabIndex={-1}
            data-sd-label_text={populated ? 'populated' : 'empty'}
            data-sd-type={props.sdType === 'outlined' ? 'outlined' : 'filled'}
            data-sd-disabled={props.disabled ? 'true' : 'false'}
            data-sd-error={props.error ? 'true' : 'false'}
            data-sd-focusd={focusd ? 'true' : 'false'}
        >
            {props.leadingIcon && (
                <div className="sd-text_field-leading_icon">
                    {props.leadingIcon}
                </div>
            )}

            <Helper sdType={props.sdType}>
                <div
                    key="sd-text_field-label_text"
                    className="sd-text_field-label_text"
                >
                    {props.labelText}
                </div>
                <input
                    key="input"
                    type={props.type}
                    ref={inputRef}
                    value={props.value}
                    onChange={onChange}
                    readOnly={props.readonly}
                    disabled={props.disabled}
                />
            </Helper>

            {props.tailingIcon && (
                <div className="sd-text_field-tailing_icon">
                    {props.tailingIcon}
                </div>
            )}

            {props.sdType !== 'outlined' && (
                <div className="sd-text_field-active_indicator"></div>
            )}

            {props.supportingText && (
                <div className="sd-text_field-supporting_text">
                    {props.supportingText}
                </div>
            )}
        </div>
    )
})

const Helper = ({
    children,
    sdType,
}: {
    children: ReactNode
    sdType?: 'filled' | 'outlined'
}) =>
    sdType === 'outlined' ? (
        <>{children}</>
    ) : (
        <div className="sd-text_field-filled_helper">{children}</div>
    )

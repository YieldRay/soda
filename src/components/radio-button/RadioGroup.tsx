import { createContext, useState } from 'react'

export const RadioGroupContext = createContext<
    | {
          value?: string
          onChange?: (value: string) => void
      }
    | undefined
>(undefined)

/**
 * Container component for `<RadioButton>`
 */
export function RadioGroup({
    value,
    defaultValue,
    onChange,
    children,
}: {
    defaultValue?: string
    value?: string
    onChange?: (value: string) => void
    children?: React.ReactNode
}) {
    const controlled = value !== undefined
    const [value$, setValue$] = useState(defaultValue)
    const realValue = controlled ? value : value$
    const dispatchChange = (v: string) => {
        onChange?.(v)
        if (!controlled) {
            setValue$(v)
        }
    }
    return (
        <RadioGroupContext.Provider
            value={{ value: realValue, onChange: dispatchChange }}
        >
            {children}
        </RadioGroupContext.Provider>
    )
}

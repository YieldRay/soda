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
    value: value$co,
    defaultValue,
    onChange,
    children,
}: {
    defaultValue?: string
    value?: string
    onChange?: (value: string) => void
    children?: React.ReactNode
}) {
    const controlled = value$co !== undefined
    const [value$un, setValue$un] = useState(defaultValue)
    const value = controlled ? value$co : value$un
    const dispatchChange = (v: string) => {
        onChange?.(v)
        if (!controlled) {
            setValue$un(v)
        }
    }
    return (
        <RadioGroupContext.Provider value={{ value, onChange: dispatchChange }}>
            {children}
        </RadioGroupContext.Provider>
    )
}

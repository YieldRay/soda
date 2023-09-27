import { createContext } from 'react'

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
    onChange,
    children,
}: {
    value?: string
    onChange?: (value: string) => void
    children?: React.ReactNode
}) {
    return (
        <RadioGroupContext.Provider value={{ value, onChange }}>
            {children}
        </RadioGroupContext.Provider>
    )
}

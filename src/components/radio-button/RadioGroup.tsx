import { createContext } from 'react'
import { useAutoState } from '@/hooks/use-auto-state'

export const RadioGroupContext = createContext<
    | {
          value?: string
          setValue?: (value: string) => void
      }
    | undefined
>(undefined)

/**
 * Container component for `<RadioButton>`
 *
 * Either `value` or `defaultValue` MUST be set
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
    const [value, setValue] = useAutoState<string>(
        onChange,
        value$co,
        defaultValue!
    )

    return (
        <RadioGroupContext.Provider value={{ value, setValue }}>
            {children}
        </RadioGroupContext.Provider>
    )
}

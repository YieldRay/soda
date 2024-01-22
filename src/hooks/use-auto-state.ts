import { useState } from 'react'

/**
 * This hook provide a mechanism that can support both controlled and uncontrolled state
 * to replace `useState()`
 *
 * @param onChange The callback for component's onChange prop
 * @param value$co The controlled value, if is `undefined`, value will be uncontrolled
 * @param defaultValue The default value for uncontrolled
 *
 * @template T Cannot be `undefined`
 */
export function useAutoState<T>(
    onChange: ((value: T) => void) | undefined,
    value$co: T,
    defaultValue?: T
): [T, (value: T) => void]
export function useAutoState<T>(
    onChange: ((value: T) => void) | undefined,
    value$co: T | undefined,
    defaultValue: T
): [T, (value: T) => void]
export function useAutoState<T>(
    onChange: ((value: T) => void) | undefined,
    value$co?: T,
    defaultValue?: T
): [T, (value: T) => void] {
    const isControlled = value$co !== undefined
    const [value$un, setValue$un] = useState(defaultValue)

    const setValue = (v: T) => {
        onChange?.(v)
        if (!isControlled) {
            setValue$un(v)
        }
    }

    return [isControlled ? value$co : value$un!, setValue]
}

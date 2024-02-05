/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/ban-ts-comment */

export const pick = <T extends object, U extends keyof T>(obj: T, keys: U[]) =>
    Object.fromEntries(
        //@ts-ignore
        keys.map((k) => obj.hasOwnProperty(k) && [k, obj[k]]).filter((x) => x)
    ) as Pick<T, U>

export const omit = <T extends object, U extends keyof T>(obj: T, keys: U[]) =>
    Object.fromEntries(
        //@ts-ignore
        keys.map((k) => !obj.hasOwnProperty(k) && [k, obj[k]]).filter((x) => x)
    ) as Omit<T, U>

export const isNumber = (x: unknown): x is number =>
    typeof x === 'number' && !Number.isNaN(x)

/**
 * Clamps number within the inclusive lower and upper bounds.
 */
export const clamp = (number: number, lower: number, upper: number) =>
    Math.min(Math.max(number, lower), upper)

export const chunk = <T>(
    array: Array<T> | null | undefined,
    size = 1
): T[][] => {
    if (!array) return []
    const result: T[][] = []
    for (let i = 0; i < array.length; i += size)
        result.push(array.slice(i, i + size))
    return result
}

export const isNumber = (x: unknown): x is number =>
    typeof x === 'number' && !Number.isNaN(x)

/**
 * Clamps number within the inclusive lower and upper bounds.
 *
 * This is like css [clamp(MIN, VAL, MAX)](https://developer.mozilla.org/docs/Web/CSS/clamp).
 * Waiting for the [proposal](https://github.com/tc39/proposal-math-clamp) to be implemented.
 */
export const clamp = (lower: number, value: number, upper: number) =>
    Math.min(Math.max(value, lower), upper)

export const chunk = <T>(
    array: Array<T> | null | undefined,
    size = 1,
): T[][] => {
    if (!array) return []
    const result: T[][] = []
    for (let i = 0; i < array.length; i += size)
        result.push(array.slice(i, i + size))
    return result
}

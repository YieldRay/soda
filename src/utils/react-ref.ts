/**
 * Use this to avoid react's immutable ref:
 *
 * ```ts
 * interface RefObject<T> {
 *     readonly current: T | null;
 * }
 * // Bivariance hack for consistent unsoundness with RefObject
 * type RefCallback<T> = { bivarianceHack(instance: T | null): void }["bivarianceHack"];
 * type Ref<T> = RefCallback<T> | RefObject<T> | null;
 * type LegacyRef<T> = string | Ref<T>;
 * ```
 */
export type ReactRef<T> =
    | React.RefCallback<T>
    | React.MutableRefObject<T>
    | null

/**
 * support callback and object.current
 */
export function setReactRef<T>(ref: ReactRef<T> | undefined, value: T) {
    if (!ref) return
    if (typeof ref === 'function') ref(value)
    else ref.current = value
}

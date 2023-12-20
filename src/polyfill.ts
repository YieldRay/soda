declare global {
    // typescript already provided this in es2023
    // our target is under it, but we only use these methods in documentation code
    interface Array<T> {
        toReversed(): T[]
        toSpliced(start: number, deleteCount?: number): T[]
        toSpliced(start: number, deleteCount: number, ...items: T[]): T[]
    }

    interface PromiseConstructor {
        withResolvers<T>(): {
            promise: Promise<T>
            resolve: (value: T | PromiseLike<T>) => void
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            reject: (reason?: any) => void
        }
    }
}

if (!Promise.withResolvers) {
    // for chrome<119
    Promise.withResolvers = <T>() => {
        let resolve: (value: T | PromiseLike<T>) => void
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let reject: (reason?: any) => void
        const promise = new Promise<T>((res, rej) => {
            resolve = res
            reject = rej
        })
        //@ts-expect-error - this is just correct
        return { promise, resolve, reject }
    }
}

export {}

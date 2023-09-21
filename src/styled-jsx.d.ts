// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { DetailedHTMLProps, StyleHTMLAttributes } from 'react'

declare module 'react' {
    interface StyleHTMLAttributes<T>
        extends DetailedHTMLProps<StyleHTMLAttributes<T>, T> {
        jsx?: boolean
        global?: boolean
    }
}

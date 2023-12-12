import type { DetailedHTMLProps } from 'react'

declare module 'react' {
    interface StyleHTMLAttributes<T>
        extends DetailedHTMLProps<StyleHTMLAttributes<T>, T> {
        jsx?: boolean
        global?: boolean
    }
}

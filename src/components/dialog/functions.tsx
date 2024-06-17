import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Scrim } from '@/composition'
import { useToggleAnimation } from '@/hooks/use-toggle-animation'
import { Button } from '../button/Button'
import { TextField } from '../text-field'
import { Dialog } from './Dialog'

type MaybePromiseLike<T> = T | PromiseLike<T>

export async function dialog<T>(
    control: (
        close: (value: MaybePromiseLike<T> | MaybePromiseLike<null>) => void,
    ) => React.ComponentPropsWithoutRef<typeof Dialog>,
): Promise<T | null> {
    type CloseFn = (value: MaybePromiseLike<T> | MaybePromiseLike<null>) => void
    let closeRef: CloseFn = () => null // we need ref to close, as close() is created in the component
    const callClose: CloseFn = (...args) => closeRef(...args)
    const props = control(callClose)

    // create mount root
    const container = document.createElement('div')
    container.className = 'sd-temp'
    const root = createRoot(container)
    const duration = 250

    const { promise, resolve } = Promise.withResolvers<
        MaybePromiseLike<T> | MaybePromiseLike<null>
    >()

    const Component = () => {
        const ref = useRef<HTMLDivElement>(null)
        const [open, setOpen] = useState(false)

        const close: CloseFn = (value) => {
            setOpen(false)
            // waiting for the animation to end
            setTimeout(() => {
                resolve(value)
                root.unmount()
                container.remove()
            }, duration)
        }
        closeRef = close

        useToggleAnimation(
            ref,
            open,
            (el) =>
                el.animate(
                    { scale: ['0.9', '1'] },
                    {
                        duration,
                        easing: 'cubic-bezier(0.2, 0, 0, 1)',
                    },
                ),
            (el) =>
                el.animate(
                    { scale: ['1', '0.9'], opacity: ['1', '0'] },
                    {
                        duration,
                        easing: 'cubic-bezier(0.2, 0, 0, 1)',
                    },
                ),
        )
        useEffect(() => {
            setOpen(true)
        }, [])

        return (
            <Scrim
                center
                duration={duration}
                open={open}
                onScrimClick={() => close(null)}
                ref={(el) => el?.focus()}
            >
                <Dialog ref={ref} {...props} />
            </Scrim>
        )
    }
    root.render(<Component />)
    document.body.append(container)
    return promise
}

export const alert = (message?: React.ReactNode, headline?: React.ReactNode) =>
    dialog<void>((close) => ({
        children: message,
        headline,
        buttons: (
            <Button variant="text" onClick={close}>
                OK
            </Button>
        ),
    }))

export const confirm = (
    message?: React.ReactNode,
    headline?: React.ReactNode,
) =>
    dialog<boolean>((close) => ({
        children: message,
        headline,
        buttons: (
            <>
                <Button variant="text" onClick={() => close(false)}>
                    Cancel
                </Button>
                <Button
                    variant="text"
                    ref={(el) => el?.focus()}
                    onClick={() => close(true)}
                >
                    OK
                </Button>
            </>
        ),
    }))

export const prompt = (
    message?: React.ReactNode,
    defaultValue?: string,
    headline?: React.ReactNode,
) => {
    let value: string | null =
        typeof defaultValue === 'string' ? defaultValue : null

    return dialog<string>((close) => ({
        children: (
            <>
                <p style={{ margin: '0 0 1rem' }}>{message}</p>
                <TextField
                    style={{ width: '100%' }}
                    ref={(el) => el?.focus()}
                    defaultValue={defaultValue}
                    onChange={(text) => {
                        value = text
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') close(value)
                    }}
                />
            </>
        ),
        headline,
        buttons: (
            <Button variant="text" onClick={() => close(value)}>
                OK
            </Button>
        ),
    }))
}

import type { Meta, StoryObj } from '@storybook/react'
import { useEffect, useRef, useState } from 'react'
import { FloatingOverlay } from '@floating-ui/react'
import { createRoot } from 'react-dom/client'
import { SodaSimpleTransition } from '@/composition'
import { Scrim } from '@/composition/Scrim'
import { useToggleAnimation } from '@/hooks/use-toggle-animation'
import { Portal } from '@/utils/Portal'
import { Dialog } from '.'
import { Button } from '../button'
import { TextField } from '../text-field'

const meta: Meta<typeof Dialog> = {
    title: 'components/Dialog/Dialog',
    component: Dialog,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        headline: 'headline',
        children: (
            <>
                A dialog is a type of modal node that appears in front of app
                content to provide critical information, or ask for a decision.
            </>
        ),
    },
}

export default meta

type Story = StoryObj<typeof meta>

export const WithSoda: Story = {
    render: (props) => {
        const ref = useRef<HTMLDivElement>(null)
        const [open, setOpen] = useState(false)
        useToggleAnimation(
            ref,
            open,
            (el) =>
                el.animate(
                    { scale: ['0.9', '1'] },
                    {
                        duration: 250,
                        easing: 'cubic-bezier(0.2, 0, 0, 1)',
                    },
                ),
            (el) =>
                el.animate(
                    { scale: ['1', '0.9'], opacity: ['1', '0'] },
                    {
                        duration: 250,
                        easing: 'cubic-bezier(0.2, 0, 0, 1)',
                    },
                ),
        )

        const dialog = (
            <Dialog
                {...props}
                ref={ref}
                buttons={
                    <>
                        <Button
                            variant="text"
                            onClick={async () => {
                                const answer = await prompt(
                                    'Are you OK?',
                                    'default',
                                    'Prompt',
                                )
                                confirm(
                                    answer
                                        ? `You entered: ${answer}`
                                        : `Canceled`,
                                    'Result',
                                )
                            }}
                        >
                            wow!
                        </Button>
                        <Button variant="text" onClick={() => setOpen(false)}>
                            close
                        </Button>
                    </>
                }
            />
        )

        return (
            <>
                <Button variant="text" onClick={() => setOpen(true)}>
                    {`open dialog (use <Scrim> from soda)`}
                </Button>

                <Portal container={document.body}>
                    <Scrim
                        center
                        open={open}
                        onScrimClick={() => setOpen(false)}
                    >
                        {dialog}
                    </Scrim>
                </Portal>
            </>
        )
    },
}

export const WithFloatingUI: Story = {
    render: (props) => {
        const [open, setOpen] = useState(false)
        const overlayRef = useRef<HTMLDivElement>(null)
        return (
            <>
                <Button variant="text" onClick={() => setOpen(true)}>
                    {`open dialog (use <FloatingOverlay> from @floating-ui/react)`}
                </Button>

                <Portal container={document.body}>
                    <SodaSimpleTransition in={open}>
                        <FloatingOverlay
                            lockScroll
                            style={{
                                width: '100%',
                                height: '100%',
                                display: 'grid',
                                placeItems: 'center',
                                background: 'rgb(0 0 0 / 0.1)',
                            }}
                            ref={overlayRef}
                        >
                            <Dialog
                                {...props}
                                buttons={
                                    <>
                                        <Button
                                            variant="text"
                                            onClick={() => alert('wow!')}
                                        >
                                            wow!
                                        </Button>
                                        <Button
                                            variant="text"
                                            onClick={() => setOpen(false)}
                                        >
                                            close
                                        </Button>
                                    </>
                                }
                            />
                        </FloatingOverlay>
                    </SodaSimpleTransition>
                </Portal>
            </>
        )
    },
}

/***
 * Some utility functions to show dialogs
 */
type Awaitable<T> = T | PromiseLike<T>

async function dialog<T>(
    control: (
        close: (value: Awaitable<T> | Awaitable<null>) => void,
    ) => React.ComponentPropsWithoutRef<typeof Dialog>,
): Promise<T | null> {
    type CloseFn = (value: Awaitable<T> | Awaitable<null>) => void
    let closeRef: CloseFn = () => null // we need ref to close, as close() is created in the component
    const callClose: CloseFn = (...args) => closeRef(...args)
    const props = control(callClose)

    // create mount root
    const container = document.createElement('div')
    container.className = 'sd-temp'
    const root = createRoot(container)
    const duration = 250

    const { promise, resolve } = Promise.withResolvers<T | null>()

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

const alert = (message?: React.ReactNode, headline?: React.ReactNode) =>
    dialog<void>((close) => ({
        children: message,
        headline,
        buttons: (
            <Button variant="text" onClick={close}>
                OK
            </Button>
        ),
    }))

const confirm = (message?: React.ReactNode, headline?: React.ReactNode) =>
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

const prompt = (
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

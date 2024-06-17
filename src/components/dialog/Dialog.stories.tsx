import type { Meta, StoryObj } from '@storybook/react'
import { useRef, useState } from 'react'
import { FloatingOverlay } from '@floating-ui/react'
import { SodaSimpleTransition } from '@/composition'
import { Scrim } from '@/composition/Scrim'
import { useToggleAnimation } from '@/hooks/use-toggle-animation'
import { Portal } from '@/utils/Portal'
import { Dialog } from '.'
import { Button } from '../button'
import { alert, confirm, prompt } from './functions'

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

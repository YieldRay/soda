import type { Meta, StoryObj } from '@storybook/react'

import { Dialog } from '.'
import { Button } from '../button'
import { ModalHolder } from '@/composition/ModalHolder'
import { useRef, useState } from 'react'
import { FloatingOverlay } from '@floating-ui/react'
import { Portal } from '@/utils/Portal'
import { SimpleSodaTransition } from '@/composition'

const meta = {
    title: 'Dialog/Dialog',
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
} satisfies Meta<typeof Dialog>

export default meta

type Story = StoryObj<typeof meta>

export const UseModalHolder: Story = {
    render: (props) => {
        const [open, setOpen] = useState(false)

        const dialog = (
            <Dialog
                {...props}
                buttons={
                    <>
                        <Button sd="text" onClick={() => alert('wow!')}>
                            wow!
                        </Button>
                        <Button sd="text" onClick={() => setOpen(false)}>
                            close
                        </Button>
                    </>
                }
            />
        )

        return (
            <>
                <Button sd="text" onClick={() => setOpen(true)}>
                    {`open dialog (use <ModalHolder> from soda)`}
                </Button>

                <ModalHolder
                    open={open}
                    onScrimClick={() => setOpen(false)}
                    onEscape={() => setOpen(false)}
                >
                    {dialog}
                </ModalHolder>
            </>
        )
    },
}

export const UseFloatingUI: Story = {
    render: (props) => {
        const [open, setOpen] = useState(false)
        const overlayRef = useRef<HTMLDivElement>(null)
        return (
            <>
                <Button sd="text" onClick={() => setOpen(true)}>
                    {`open dialog (use <FloatingOverlay> from @floating-ui/react)`}
                </Button>

                <Portal container={document.body}>
                    <SimpleSodaTransition in={open}>
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
                                            sd="text"
                                            onClick={() => alert('wow!')}
                                        >
                                            wow!
                                        </Button>
                                        <Button
                                            sd="text"
                                            onClick={() => setOpen(false)}
                                        >
                                            close
                                        </Button>
                                    </>
                                }
                            />
                        </FloatingOverlay>
                    </SimpleSodaTransition>
                </Portal>
            </>
        )
    },
}

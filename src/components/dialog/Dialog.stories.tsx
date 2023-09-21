import type { Meta, StoryObj } from '@storybook/react'

import { Dialog } from '.'
import { Button } from '../button'
import { ModalHolder } from '@/headless/ModalHolder'
import { useState } from 'react'

const meta = {
    title: 'Dialog/Dialog',
    component: Dialog,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Dialog>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => {
        const [open, setOpen] = useState(false)
        return (
            <>
                <Button sd="text" onClick={() => setOpen(true)}>
                    open dialog
                </Button>

                <ModalHolder open={open} onScrimClick={() => setOpen(false)}>
                    <Dialog
                        headline="headline"
                        buttons={
                            <>
                                <Button sd="text" onClick={() => alert('wow!')}>
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
                    >
                        A dialog is a type of modal node that appears in front
                        of app content to provide critical information, or ask
                        for a decision.
                    </Dialog>
                </ModalHolder>
            </>
        )
    },
}

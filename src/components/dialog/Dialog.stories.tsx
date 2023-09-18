import type { Meta, StoryObj } from '@storybook/react'

import { Dialog } from './'
import { Button } from '../button'
import { useState } from 'react'

const meta = {
    title: 'Dialog',
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
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [open, setOpen] = useState(false)
        return (
            <>
                <Button sd="text" onClick={() => setOpen(true)}>
                    open dialog
                </Button>

                <Dialog
                    headline="headline"
                    open={open}
                    onScrimClick={() => setOpen(false)}
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
                >
                    A dialog is a type of modal node that appears in front of
                    app content to provide critical information, or ask for a
                    decision.
                </Dialog>
            </>
        )
    },
}

import type { Meta, StoryObj } from '@storybook/react'

import { FullScreenDialog } from '.'
import { Button } from '../button'
import { useState } from 'react'

const meta = {
    title: 'FullScreenDialog',
    component: FullScreenDialog,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof FullScreenDialog>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [open, setOpen] = useState(false)
        return (
            <>
                <Button sd="text" onClick={() => setOpen(true)}>
                    open fullscreen dialog
                </Button>
                <FullScreenDialog
                    open={open}
                    onCloseClick={() => setOpen(false)}
                    headline="FullScreenDialog Title"
                    button="Save"
                >
                    content
                </FullScreenDialog>
            </>
        )
    },
}

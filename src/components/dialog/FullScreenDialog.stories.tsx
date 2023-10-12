import type { Meta, StoryObj } from '@storybook/react'

import { FullScreenDialog } from '.'
import { Button } from '../button'
import { useState } from 'react'
import { ModalHolder } from '@/composition/ModalHolder'

const meta = {
    title: 'Dialog/FullScreenDialog',
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
        const [open, setOpen] = useState(false)
        return (
            <>
                <Button sd="text" onClick={() => setOpen(true)}>
                    open fullscreen dialog
                </Button>

                <ModalHolder open={open}>
                    <FullScreenDialog
                        onCloseClick={() => setOpen(false)}
                        headline="FullScreenDialog Title"
                        button={<Button sd="text">Save</Button>}
                        footer={
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    gap: '0.5rem',
                                }}
                            >
                                <Button sd="text">Cancel</Button>
                                <Button sd="text">OK</Button>
                            </div>
                        }
                    >
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Impedit nulla laboriosam, harum officiis
                        blanditiis magni ipsam quas dolores labore
                        necessitatibus quibusdam odio earum unde rerum dolore
                        quae voluptates adipisci porro!
                    </FullScreenDialog>
                </ModalHolder>
            </>
        )
    },
}

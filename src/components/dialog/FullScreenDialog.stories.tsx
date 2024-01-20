import type { Meta, StoryObj } from '@storybook/react'

import { FullScreenDialog } from '.'
import { Button } from '../button'
import { useState } from 'react'
import { ModalHolder } from '@/composition/ModalHolder'

const meta = {
    title: 'components/Dialog/FullScreenDialog',
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
                <Button variant="text" onClick={() => setOpen(true)}>
                    open fullscreen dialog
                </Button>

                <ModalHolder open={open}>
                    <FullScreenDialog
                        onCloseClick={() => setOpen(false)}
                        headline="FullScreenDialog Title"
                        button={<Button variant="text">Save</Button>}
                        footer={
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    gap: '0.5rem',
                                }}
                            >
                                <Button variant="text">Cancel</Button>
                                <Button variant="text">OK</Button>
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

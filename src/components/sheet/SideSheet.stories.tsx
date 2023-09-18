import type { Meta, StoryObj } from '@storybook/react'

import { SideSheet } from './'
import { Button } from '../button'
import { useState } from 'react'

const meta = {
    title: 'SideSheet',
    component: SideSheet,
    tags: ['autodocs'],
} satisfies Meta<typeof SideSheet>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [open, setOpen] = useState(false)
        return (
            <div style={{ height: '400px' }}>
                <Button sd="text" onClick={() => setOpen(true)}>
                    open side sheet
                </Button>

                <SideSheet
                    open={open}
                    header="headline"
                    position="left"
                    onScrimClick={() => setOpen(false)}
                    action={
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <Button onClick={() => setOpen(false)}>Save</Button>
                            <Button
                                sd="outlined"
                                onClick={() => setOpen(false)}
                            >
                                Close
                            </Button>
                        </div>
                    }
                >
                    side sheet
                </SideSheet>
            </div>
        )
    },
}

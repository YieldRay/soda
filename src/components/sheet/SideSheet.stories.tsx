import type { Meta, StoryObj } from '@storybook/react'

import { SideSheet } from '.'
import { useState } from 'react'
import { Button } from '../button'
import { TopAppBar } from '../app-bar'
import { IconButton } from '../icon-button'

const meta = {
    title: 'SideSheet',
    component: SideSheet,
    tags: ['autodocs'],
} satisfies Meta<typeof SideSheet>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => {
        const [open, setOpen] = useState(false)
        return (
            <>
                <div style={{ paddingTop: '64px', height: '400px' }}>
                    <TopAppBar
                        fixed
                        leadingNavigationIcon={
                            <IconButton onClick={() => setOpen(true)}>
                                ═
                            </IconButton>
                        }
                    >
                        TopAppBar
                    </TopAppBar>
                    <p>click the menu icon to open</p>
                </div>
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
            </>
        )
    },
}

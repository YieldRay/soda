import type { Meta, StoryObj } from '@storybook/react'

import { SideSheet } from '.'
import { useState } from 'react'
import { Button } from '../button'
import { TopAppBar } from '../app-bar'
import { IconButton } from '../icon-button'
import { DrawerItem } from '@/composition/DrawerItem'
import { mdiMenu } from '@mdi/js'

const meta = {
    title: 'components/Sheet/SideSheet',
    component: SideSheet,
    tags: ['autodocs'],
} satisfies Meta<typeof SideSheet>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => (
        <SideSheet
            header="headline"
            footer={
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Button>Save</Button>
                    <Button variant="outlined">Close</Button>
                </div>
            }
            style={{ minHeight: 'max(66.6vh, 400px)' }}
        >
            <DrawerItem active>Home</DrawerItem>
            <DrawerItem>Search</DrawerItem>
            <DrawerItem>Settings</DrawerItem>
        </SideSheet>
    ),
}

export const Fixed: Story = {
    render: () => {
        const [open, setOpen] = useState(false)
        return (
            <div
                style={{
                    willChange: 'transform',
                    minHeight: 'max(66.6vh, 400px)',
                }}
            >
                <TopAppBar
                    leadingNavigationIcon={
                        <IconButton
                            onClick={() => setOpen(true)}
                            path={mdiMenu}
                        />
                    }
                >
                    TopAppBar
                </TopAppBar>

                <p>Click the menu icon to open.</p>
                <p>Set the fixed property to true for convenience!</p>

                <SideSheet
                    fixed
                    open={open}
                    header="headline"
                    position="left"
                    onScrimClick={() => setOpen(false)}
                    footer={
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <Button onClick={() => setOpen(false)}>Save</Button>
                            <Button
                                variant="outlined"
                                onClick={() => setOpen(false)}
                            >
                                Close
                            </Button>
                        </div>
                    }
                >
                    <DrawerItem active>Home</DrawerItem>
                    <DrawerItem>Search</DrawerItem>
                    <DrawerItem>Settings</DrawerItem>
                </SideSheet>
            </div>
        )
    },
}

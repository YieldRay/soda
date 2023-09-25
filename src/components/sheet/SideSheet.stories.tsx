import type { Meta, StoryObj } from '@storybook/react'

import { SideSheet } from '.'
import { useState } from 'react'
import { Button } from '../button'
import { TopAppBar } from '../app-bar'
import { IconButton } from '../icon-button'
import { IconMenu } from '@/utils/icons'
import { DrawerItem } from '@/composition/DrawerItem'

const meta = {
    title: 'Sheet/SideSheet',
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
                <TopAppBar
                    leadingNavigationIcon={
                        <IconButton onClick={() => setOpen(true)}>
                            <IconMenu />
                        </IconButton>
                    }
                >
                    TopAppBar
                </TopAppBar>

                <p style={{ height: '400px' }}>
                    <p>click the menu icon to open</p>
                    <p>
                        support <code>{`portalTo={document.body}`}</code> so you
                        can port it to global
                    </p>
                </p>

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
                    <DrawerItem enabled>Home</DrawerItem>
                    <DrawerItem>Search</DrawerItem>
                    <DrawerItem>Settings</DrawerItem>
                </SideSheet>
            </>
        )
    },
}

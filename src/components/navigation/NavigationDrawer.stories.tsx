import type { Meta, StoryObj } from '@storybook/react'

import { NavigationDrawer, NavigationDrawerItem } from '.'
import { useState } from 'react'
import {
    mdiClose,
    mdiDeleteOutline,
    mdiHeartOutline,
    mdiInbox,
    mdiMagnify,
    mdiMenu,
    mdiSendVariantOutline,
} from '@mdi/js'
import { Switch } from '../switch/Switch'
import { Divider } from '../divider/Divider'
import { IconButton, TopAppBar } from '..'
import { Search } from '../search/Search'

const meta = {
    title: 'components/Navigation/NavigationDrawer',
    component: NavigationDrawer,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof NavigationDrawer>

export default meta

type Story = StoryObj<typeof meta>

export const Standard: Story = {
    render: () => {
        {
            const [open, setOpen] = useState(true)

            return (
                <div
                    style={{
                        display: 'flex',
                        height: '100vh',
                        background: 'var(--md-sys-color-surface)',
                    }}
                >
                    <NavigationDrawer open={open} headline="Mail">
                        <NavigationDrawerItem icon={mdiInbox} badge="24">
                            Inbox
                        </NavigationDrawerItem>
                        <NavigationDrawerItem
                            icon={mdiSendVariantOutline}
                            badge="99+"
                        >
                            Outbox
                        </NavigationDrawerItem>
                        <NavigationDrawerItem icon={mdiHeartOutline}>
                            Favorites
                        </NavigationDrawerItem>
                        <NavigationDrawerItem icon={mdiDeleteOutline}>
                            Trash
                        </NavigationDrawerItem>
                        <Divider />
                    </NavigationDrawer>

                    <div
                        style={{
                            flex: '1',
                            // here we use flex layout
                            // it's important to set flex-grow: 1
                        }}
                    >
                        open
                        <Switch checked={open} onChange={setOpen} />
                    </div>
                </div>
            )
        }
    },
}

export const Modal: Story = {
    decorators: (Story) => (
        <div style={{ height: '100vh' }}>
            <Story />
        </div>
    ),
    render: () => {
        const [open, setOpen] = useState(true)
        const [isSearching, setSearching] = useState(false)

        return (
            <>
                {isSearching ? (
                    <Search
                        variant="view"
                        full
                        placeholder="Search..."
                        leadingIcon={
                            <IconButton
                                path={mdiMenu}
                                onClick={() => setOpen(true)}
                            />
                        }
                        trailingIcon={
                            <>
                                <IconButton path={mdiMagnify} />
                                <IconButton
                                    path={mdiClose}
                                    onClick={() => setSearching(false)}
                                />
                            </>
                        }
                    />
                ) : (
                    <TopAppBar
                        leadingNavigationIcon={
                            <IconButton
                                path={mdiMenu}
                                onClick={() => setOpen(true)}
                            />
                        }
                        trailingIcon={
                            <IconButton
                                path={mdiMagnify}
                                onClick={() => setSearching(true)}
                            />
                        }
                    >
                        TopAppBar
                    </TopAppBar>
                )}

                <NavigationDrawer
                    modal
                    open={open}
                    onScrimClick={() => setOpen(false)}
                    headline="Mail"
                >
                    <NavigationDrawerItem icon={mdiInbox} badge="24">
                        Inbox
                    </NavigationDrawerItem>
                    <NavigationDrawerItem
                        icon={mdiSendVariantOutline}
                        badge="99+"
                    >
                        Outbox
                    </NavigationDrawerItem>
                    <NavigationDrawerItem icon={mdiHeartOutline}>
                        Favorites
                    </NavigationDrawerItem>
                    <NavigationDrawerItem icon={mdiDeleteOutline}>
                        Trash
                    </NavigationDrawerItem>
                </NavigationDrawer>
            </>
        )
    },
}

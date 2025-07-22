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
import Icon from '@mdi/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { NavigationDrawer, NavigationDrawerItem } from '.'
import { IconButton, TopAppBar } from '..'
import { Divider } from '../divider/Divider'
import { List } from '../list/List'
import { Search } from '../search/Search'
import { Switch } from '../switch/Switch'

const meta: Meta<typeof NavigationDrawer> = {
    title: 'components/Navigation/NavigationDrawer',
    component: NavigationDrawer,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
}

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
                        <NavigationDrawerItem
                            icon={<Icon path={mdiInbox} />}
                            badge="24"
                        >
                            Inbox
                        </NavigationDrawerItem>
                        <NavigationDrawerItem
                            icon={<Icon path={mdiSendVariantOutline} />}
                            badge="99+"
                        >
                            Outbox
                        </NavigationDrawerItem>
                        <NavigationDrawerItem
                            icon={<Icon path={mdiHeartOutline} />}
                        >
                            Favorites
                        </NavigationDrawerItem>
                        <NavigationDrawerItem
                            icon={<Icon path={mdiDeleteOutline} />}
                        >
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
                        <List
                            headline="open"
                            onClick={() => setOpen(!open)}
                            trailingIcon={<Switch checked={open} />}
                        />
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
                    <NavigationDrawerItem
                        icon={<Icon path={mdiInbox} />}
                        badge="24"
                    >
                        Inbox
                    </NavigationDrawerItem>
                    <NavigationDrawerItem
                        icon={<Icon path={mdiSendVariantOutline} />}
                        badge="99+"
                    >
                        Outbox
                    </NavigationDrawerItem>
                    <NavigationDrawerItem
                        icon={<Icon path={mdiHeartOutline} />}
                    >
                        Favorites
                    </NavigationDrawerItem>
                    <NavigationDrawerItem
                        icon={<Icon path={mdiDeleteOutline} />}
                    >
                        Trash
                    </NavigationDrawerItem>
                </NavigationDrawer>
            </>
        )
    },
}

import type { Meta, StoryObj } from '@storybook/react'

import { NavigationBar } from '.'
import { useState } from 'react'
import Icon from '@mdi/react'
import {
    mdiHome,
    mdiHomeOutline,
    mdiCardSearch,
    mdiCardSearchOutline,
    mdiCog,
    mdiCogOutline,
} from '@mdi/js'
import { Switch } from '../switch'

const meta = {
    title: 'components/Navigation/NavigationBar',
    component: NavigationBar,
    tags: ['autodocs'],
} satisfies Meta<typeof NavigationBar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        items: [
            {
                key: 'home',
                label: 'home',
                icon: (active) => (
                    <Icon size={1} path={active ? mdiHome : mdiHomeOutline} />
                ),
                active: true,
            },
            {
                key: 'search',
                label: 'search',
                icon: (active) => (
                    <Icon
                        size={1}
                        path={active ? mdiCardSearch : mdiCardSearchOutline}
                    />
                ),
            },
            {
                key: 'settings',
                label: 'settings',
                icon: (active) => (
                    <Icon path={active ? mdiCog : mdiCogOutline} />
                ),
            },
        ],
    },
    render: (props) => {
        const [fixed, setFixed] = useState(false)
        const [items, setItems] = useState(props.items)
        return (
            <>
                <center>
                    fixed
                    <Switch checked={fixed} onChange={setFixed} />
                </center>
                <NavigationBar
                    fixed={fixed}
                    items={items}
                    onChange={({ key }) => {
                        setItems(
                            items.map((item) => ({
                                ...item,
                                active: item.key === key,
                            }))
                        )
                    }}
                />
            </>
        )
    },
}

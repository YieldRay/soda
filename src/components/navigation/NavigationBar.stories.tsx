import type { Meta, StoryObj } from '@storybook/react'

import { NavigationBar } from '.'
import { useState } from 'react'
import { Button } from '../button'
import Icon from '@mdi/react'
import {
    mdiHome,
    mdiHomeOutline,
    mdiCardSearch,
    mdiCardSearchOutline,
    mdiCog,
    mdiCogOutline,
} from '@mdi/js'

const meta = {
    title: 'Navigation/NavigationBar',
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
                    <Icon path={active ? mdiHome : mdiHomeOutline} />
                ),
                active: true,
            },
            {
                key: 'search',
                label: 'search',
                icon: (active) => (
                    <Icon
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
                <Button onClick={() => setFixed(!fixed)}>toogle fixed</Button>
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
                ></NavigationBar>
            </>
        )
    },
}

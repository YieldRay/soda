import type { Meta, StoryObj } from '@storybook/react'

import { NavigationRail } from '.'
import { useState } from 'react'
import { IconMagnify } from '@/utils/icons'
import { Button } from '../button'
import { Fab } from '../fab'

const meta = {
    title: 'Navigation/NavigationRail',
    component: NavigationRail,
    tags: ['autodocs'],
} satisfies Meta<typeof NavigationRail>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        fab: (
            <>
                <Fab>＋</Fab>
            </>
        ),
        items: [
            {
                key: 'home',
                label: 'home',
                icon: '🏠',
                active: true,
            },
            {
                key: 'search',
                label: 'search',
                icon: <IconMagnify />,
            },
            {
                key: 'settings',
                label: 'settings',
                icon: '⚙',
            },
        ],
    },
    render: (props) => {
        const [fixed, setFixed] = useState(false)
        const [items, setItems] = useState(props.items)
        return (
            <>
                <Button onClick={() => setFixed(!fixed)}>toogle fixed</Button>
                <NavigationRail
                    fab={props.fab}
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
                ></NavigationRail>
            </>
        )
    },
}

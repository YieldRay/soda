import type { Meta, StoryObj } from '@storybook/react'

import { NavigationBar } from '.'
import { useState } from 'react'
import { Button } from '../button'

const meta = {
    title: 'NavigationBar',
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
                icon: 'HOME',
                active: true,
            },
            {
                key: 'settings',
                label: 'settings',
                icon: 'SETTINGS',
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
                            items.map((i) => ({ ...i, active: i.key === key }))
                        )
                    }}
                ></NavigationBar>
            </>
        )
    },
}

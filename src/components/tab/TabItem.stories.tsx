import type { Meta, StoryObj } from '@storybook/react'

import { Tab, TabItem } from '.'
import { IconChecked, IconClose, IconMagnify } from '@/utils/icons'
import { useState } from 'react'

const meta = {
    title: 'TabItem',
    component: TabItem,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof TabItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => {
        const [items, setItems] = useState([
            { icon: <IconMagnify />, children: <>Apple</> },
            { icon: <IconChecked />, children: <>Banana</> },
            { icon: <IconClose />, children: <>Orange</>, active: true },
        ])
        return (
            <Tab>
                {items.map((item, i) => (
                    <TabItem
                        {...item}
                        key={i}
                        onClick={() => {
                            setItems(
                                items.map((i) => ({ ...i, active: item === i }))
                            )
                        }}
                    ></TabItem>
                ))}
            </Tab>
        )
    },
}

export const WithoutIcon: Story = {
    render: () => {
        const [items, setItems] = useState([
            { children: <>Apple</> },
            { children: <>Banana</> },
            { children: <>Orange</>, active: true },
        ])
        return (
            <Tab style={{ width: '50vw' }}>
                {items.map((item, i) => (
                    <TabItem
                        {...item}
                        key={i}
                        onClick={() => {
                            setItems(
                                items.map((i) => ({ ...i, active: item === i }))
                            )
                        }}
                    ></TabItem>
                ))}
            </Tab>
        )
    },
}

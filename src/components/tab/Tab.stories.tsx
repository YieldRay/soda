import type { Meta, StoryObj } from '@storybook/react'

import { Tab, TabItem } from '.'
import { IconChecked, IconClose, IconMagnify } from '@/utils/icons'
import { useState } from 'react'

const meta = {
    title: 'Tab',
    component: Tab,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Tab>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => {
        const [value, setValue] = useState('0')

        return (
            <Tab value={value} onChange={setValue}>
                <TabItem icon={<IconChecked />} value="0">
                    Apple
                </TabItem>
                <TabItem icon={<IconClose />} value="1">
                    Banana
                </TabItem>
                <TabItem icon={<IconMagnify />} value="2">
                    Orange
                </TabItem>
            </Tab>
        )
    },
}

export const WithoutIcon: Story = {
    render: () => {
        const [value, setValue] = useState('0')

        return (
            <Tab value={value} onChange={setValue}>
                <TabItem value="0">Apple</TabItem>
                <TabItem value="1">Banana</TabItem>
                <TabItem value="2">Orange</TabItem>
            </Tab>
        )
    },
}

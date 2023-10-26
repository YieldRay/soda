import type { Meta, StoryObj } from '@storybook/react'

import { Tab, TabItem } from '.'
import { useState } from 'react'
import Icon from '@mdi/react'
import { mdiCheck, mdiClose, mdiMagnify } from '@mdi/js'

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
                <TabItem icon={<Icon path={mdiCheck} />} value="0">
                    Apple
                </TabItem>
                <TabItem icon={<Icon path={mdiClose} />} value="1">
                    Banana
                </TabItem>
                <TabItem icon={<Icon path={mdiMagnify} />} value="2">
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

export const Uncontrolled: Story = {
    args: {
        defaultValue: '1',
        children: (
            <>
                <TabItem value="0">Apple</TabItem>
                <TabItem value="1">Banana</TabItem>
                <TabItem value="2">Orange</TabItem>
            </>
        ),
    },
}

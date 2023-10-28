import type { Meta, StoryObj } from '@storybook/react'

import { Tabs, Tab, TabPanel } from '.'
import { useState } from 'react'
import Icon from '@mdi/react'
import { mdiCheck, mdiClose, mdiMagnify } from '@mdi/js'

const meta = {
    title: 'Tab',
    component: Tabs,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => {
        const [value, setValue] = useState('0')

        return (
            <Tabs value={value} onChange={setValue}>
                <Tab icon={<Icon path={mdiCheck} />} value="0">
                    Apple
                </Tab>
                <Tab icon={<Icon path={mdiClose} />} value="1">
                    Banana
                </Tab>
                <Tab icon={<Icon path={mdiMagnify} />} value="2">
                    Orange
                </Tab>

                <TabPanel value="0">Panel 0</TabPanel>
                <TabPanel value="1">Panel 1</TabPanel>
                <TabPanel value="2">Panel 2</TabPanel>
            </Tabs>
        )
    },
}

export const WithoutIcon: Story = {
    render: () => {
        const [value, setValue] = useState('0')

        return (
            <Tabs value={value} onChange={setValue}>
                <Tab value="0">Apple</Tab>
                <Tab value="1">Banana</Tab>
                <Tab value="2">Orange</Tab>
            </Tabs>
        )
    },
}

export const Uncontrolled: Story = {
    args: {
        defaultValue: '1',
        children: (
            <>
                <Tab value="0">Apple</Tab>
                <Tab value="1">Banana</Tab>
                <Tab value="2">Orange</Tab>
            </>
        ),
    },
}

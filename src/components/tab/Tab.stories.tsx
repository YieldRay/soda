import type { Meta, StoryObj } from '@storybook/react'

import { Tabs, Tab, TabPanel } from '.'
import { useState } from 'react'
import Icon from '@mdi/react'
import { mdiCheck, mdiClose, mdiMagnify } from '@mdi/js'

const meta = {
    title: 'components/Tab',
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
        const [index, setIndex] = useState(0)

        return (
            <Tabs index={index} onChange={setIndex}>
                <div style={{ display: 'flex', overflowX: 'auto' }}>
                    <Tab icon={<Icon size={1} path={mdiCheck} />} index={0}>
                        Apple
                    </Tab>
                    <Tab icon={<Icon size={1} path={mdiClose} />} index={1}>
                        Banana
                    </Tab>
                    <Tab icon={<Icon size={1} path={mdiMagnify} />} index={2}>
                        Orange
                    </Tab>
                </div>

                <div style={{ overflow: 'hidden' }}>
                    <TabPanel index={0}>{'Panel 0 '.repeat(4)}</TabPanel>
                    <TabPanel index={1}>{'Panel 1 '.repeat(4)}</TabPanel>
                    <TabPanel index={2}>{'Panel 2 '.repeat(4)}</TabPanel>
                </div>
            </Tabs>
        )
    },
}

export const WithoutIcon: Story = {
    render: () => {
        const [index, setIndex] = useState(0)

        return (
            <Tabs index={index} onChange={setIndex}>
                <Tab index={0}>Apple</Tab>
                <Tab index={1}>Banana</Tab>
                <Tab index={2}>Orange</Tab>
            </Tabs>
        )
    },
}

export const Uncontrolled: Story = {
    args: {
        defaultIndex: 1,
        children: (
            <>
                <Tab index={0}>Apple</Tab>
                <Tab index={1}>Banana</Tab>
                <Tab index={2}>Orange</Tab>
            </>
        ),
        onChange: console.log,
    },
}

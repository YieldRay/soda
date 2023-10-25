import type { Meta, StoryObj } from '@storybook/react'

import { Switch } from '.'
import { useState } from 'react'
import Icon from '@mdi/react'
import { mdiCheck, mdiClose } from '@mdi/js'

const meta = {
    title: 'Switch',
    component: Switch,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Switch>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => {
        const [checked, setChecked] = useState(false)
        return (
            <Switch checked={checked} onChange={() => setChecked(!checked)} />
        )
    },
}

export const Disabled: Story = {
    args: {
        disabled: true,
    },
}

export const WithIcon: Story = {
    render: () => {
        const [checked, setChecked] = useState(false)
        return (
            <Switch checked={checked} onChange={() => setChecked(!checked)}>
                {<Icon path={checked ? mdiCheck : mdiClose} />}
            </Switch>
        )
    },
}

export const Uncontrolled: Story = {
    args: {
        defaultChecked: true,
    },
}

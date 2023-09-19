import type { Meta, StoryObj } from '@storybook/react'

import { Switch } from './'
import { useState } from 'react'
import { IconChecked, IconClose } from '@/utils/icons'

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
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [checked, setChecked] = useState(false)
        return <Switch checked={checked} onChange={setChecked}></Switch>
    },
}

export const WithIcon: Story = {
    render: () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [checked, setChecked] = useState(false)
        return (
            <Switch checked={checked} onChange={setChecked}>
                {checked ? <IconChecked /> : <IconClose />}
            </Switch>
        )
    },
}

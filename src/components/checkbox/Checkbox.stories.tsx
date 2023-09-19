import type { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from '.'
import { useState } from 'react'

const meta = {
    title: 'Checkbox',
    component: Checkbox,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => {
        const [checked, setChecked] = useState(false)
        return <Checkbox checked={checked} onChange={setChecked}></Checkbox>
    },
}

export const Disabled: Story = {
    args: {
        disabled: true,
        checked: true,
    },
}

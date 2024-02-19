import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Checkbox } from '.'

const meta = {
    title: 'components/Checkbox',
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
        return (
            <Checkbox checked={checked} onChange={() => setChecked(!checked)} />
        )
    },
}

export const Disabled: Story = {
    args: {
        disabled: true,
        checked: true,
    },
}

export const Uncontrolled: Story = {
    args: {
        defaultChecked: true,
        onChange(v) {
            console.log(`Uncontrolled set to ${v}`)
        },
    },
}

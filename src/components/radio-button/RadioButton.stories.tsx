import type { Meta, StoryObj } from '@storybook/react'

import { RadioButton } from '.'
import { useState } from 'react'
import { RadioGroup } from '@/composition/RadioGroup'

const meta = {
    title: 'RadioButton',
    component: RadioButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof RadioButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => {
        const [checked, setChecked] = useState(false)
        return (
            <RadioButton
                checked={checked}
                onChange={() => setChecked(!checked)}
            >
                Label {checked.toString()}
            </RadioButton>
        )
    },
}

export const Group: Story = {
    render: () => {
        const values = ['apple', 'banana', 'orange']
        const [value, setValue] = useState('')

        return (
            <RadioGroup value={value} onChange={(v) => setValue(v)}>
                {values.map((v, i) => (
                    <RadioButton
                        value={v}
                        tabIndex={i + 1}
                        key={i}
                        disabled={i === 0}
                    >
                        {v}
                    </RadioButton>
                ))}
            </RadioGroup>
        )
    },
}

export const Uncontrolled: Story = {
    args: {
        defaultChecked: true,
        children: <>Label</>,
    },
}

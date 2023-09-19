import type { Meta, StoryObj } from '@storybook/react'

import { RadioButton } from './'
import { useState } from 'react'

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
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [checked, setChecked] = useState(false)
        return (
            <RadioButton checked={checked} onChange={setChecked}>
                Label
            </RadioButton>
        )
    },
}

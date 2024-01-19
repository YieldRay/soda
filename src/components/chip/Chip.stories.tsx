import type { Meta, StoryObj } from '@storybook/react'

import { Chip } from '.'
import { useState } from 'react'

const meta = {
    title: 'components/Chip',
    component: Chip,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        leadingIcon: '✨',
        trailingIcon: '×',
    },
} satisfies Meta<typeof Chip>

export default meta

type Story = StoryObj<typeof meta>

export const Outlined: Story = {
    args: {
        sd: 'outlined',
        children: 'outlined',
    },
    render: (props) => {
        const [enabled, setEnabled] = useState(true)
        return (
            <Chip
                {...props}
                disabled={!enabled}
                onClick={() => setEnabled(!enabled)}
            />
        )
    },
}

export const Tonal: Story = {
    args: {
        sd: 'tonal',
        children: 'tonal',
    },
    render: (props) => {
        const [enabled, setEnabled] = useState(true)
        return (
            <Chip
                {...props}
                disabled={!enabled}
                onClick={() => setEnabled(!enabled)}
            />
        )
    },
}

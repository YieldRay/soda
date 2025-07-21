import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Chip } from '.'

const meta: Meta<typeof Chip> = {
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
}

export default meta

type Story = StoryObj<typeof meta>

export const Outlined: Story = {
    args: {
        variant: 'outlined',
        children: 'outlined',
    },
    render: (props) => {
        const [enabled, setEnabled] = useState(true)
        return (
            <Chip
                {...props}
                disabled={!enabled}
                onClick={() => setEnabled(!enabled)}
            >
                {props.children}
            </Chip>
        )
    },
}

export const Tonal: Story = {
    args: {
        variant: 'tonal',
        children: 'tonal',
    },
    render: (props) => {
        const [enabled, setEnabled] = useState(true)
        return (
            <Chip
                {...props}
                disabled={!enabled}
                onClick={() => setEnabled(!enabled)}
            >
                {props.children}
            </Chip>
        )
    },
}

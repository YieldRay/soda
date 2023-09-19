import type { Meta, StoryObj } from '@storybook/react'

import { TextField } from '.'

const meta = {
    title: 'TextField',
    component: TextField,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    args: {
        labelText: 'labelText',
    },
} satisfies Meta<typeof TextField>

export default meta

type Story = StoryObj<typeof meta>

export const Filled: Story = {
    args: {
        sd: 'filled',
    },
}

export const Outlined: Story = {
    args: {
        sd: 'outlined',
    },
}

export const Error: Story = {
    args: {
        error: true,
    },
}

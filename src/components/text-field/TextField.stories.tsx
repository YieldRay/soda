import type { Meta, StoryObj } from '@storybook/react'

import { TextField } from './'

const meta = {
    title: 'TextField',
    component: TextField,
    tags: ['autodocs'],
} satisfies Meta<typeof TextField>

export default meta

type Story = StoryObj<typeof meta>

export const Filled: Story = {
    args: {
        sd: 'filled',
        labelText: 'labelText',
    },
}

export const Outlined: Story = {
    args: {
        sd: 'outlined',
        labelText: 'labelText',
    },
}

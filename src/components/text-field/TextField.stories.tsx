import type { Meta, StoryObj } from '@storybook/react'

import { TextField } from '.'
import { IconClose, IconMagnify } from '@/utils/icons'

const meta = {
    title: 'TextField',
    component: TextField,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    args: {
        labelText: 'labelText',
        leadingIcon: <IconMagnify />,
        trailingIcon: <IconClose />,
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

export const Textarea: Story = {
    args: {
        textarea: true,
        labelText: 'labelText',
        leadingIcon: undefined,
        trailingIcon: undefined,
        rows: 3,
    },
}

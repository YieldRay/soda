import type { Meta, StoryObj } from '@storybook/react'

import { Chip } from './Chip'

const meta = {
    title: 'Chip',
    component: Chip,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Chip>

export default meta

type Story = StoryObj<typeof meta>

export const Outlined: Story = {
    args: {
        sd: 'outlined',
        children: 'outlined',
        enabled: true,
    },
}

export const Tonal: Story = {
    args: {
        sd: 'tonal',
        children: 'tonal',
        enabled: true,
    },
}
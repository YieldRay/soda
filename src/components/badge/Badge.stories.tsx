import type { Meta, StoryObj } from '@storybook/react'

import { Badge } from './'
import { Button } from '../button'

const meta = {
    title: 'Badge',
    component: Badge,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Badge>

export default meta

type Story = StoryObj<typeof meta>

export const WithLabel: Story = {
    args: {
        label: 'with label',
        children: <Button>Button</Button>,
    },
}

export const WithoutLabel: Story = {
    args: {
        label: '',
        children: <Button>Button</Button>,
    },
}

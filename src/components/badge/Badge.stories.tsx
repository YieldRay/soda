import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '.'
import { Button } from '../button'

const meta: Meta<typeof Badge> = {
    title: 'components/Badge',
    component: Badge,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const WithLabel: Story = {
    args: {
        label: '999+',
        children: <Button>Button</Button>,
    },
}

export const WithoutLabel: Story = {
    args: {
        label: '',
        children: <Button>Button</Button>,
    },
}

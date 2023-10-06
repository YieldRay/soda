import type { Meta, StoryObj } from '@storybook/react'

import { TimePicker } from '.'

const meta = {
    title: 'TimePicker',
    component: TimePicker,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof TimePicker>

export default meta

type Story = StoryObj<typeof meta>

export const Vertical: Story = {}

export const Horizontal: Story = {
    args: {
        direction: 'horizontal',
    },
}

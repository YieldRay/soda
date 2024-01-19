import type { Meta, StoryObj } from '@storybook/react'

import { TimePicker } from '.'

const meta = {
    title: 'components/TimePicker',
    component: TimePicker,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    args: {
        onOK: alert,
    },
} satisfies Meta<typeof TimePicker>

export default meta

type Story = StoryObj<typeof meta>

export const Vertical: Story = {
    args: {
        direction: 'vertical',
    },
}

export const Horizontal: Story = {
    args: {
        direction: 'horizontal',
    },
}

export const Use24hourSystem: Story = {
    args: {
        use24hourSystem: true,
        initShowClock: true,
    },
}

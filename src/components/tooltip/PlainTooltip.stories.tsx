import type { Meta, StoryObj } from '@storybook/react'

import { PlainTooltip } from '.'

const meta = {
    title: 'Tooltip/PlainTooltip',
    component: PlainTooltip,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof PlainTooltip>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        children: <>Save to favorites</>,
    },
}

import type { Meta, StoryObj } from '@storybook/react'

import { ProgressIndicator } from '.'

const meta = {
    title: 'components/ProgressIndicator',
    component: ProgressIndicator,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ProgressIndicator>

export default meta

type Story = StoryObj<typeof meta>

export const Linear: Story = {
    args: {
        sd: 'linear',
    },
    decorators: [
        (Story) => (
            <div style={{ minWidth: '200px' }}>
                <Story />
            </div>
        ),
    ],
}

export const Circular: Story = {
    args: {
        sd: 'circular',
    },
}

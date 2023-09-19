import type { Meta, StoryObj } from '@storybook/react'

import { ProgressIndicator } from './'

const meta = {
    title: 'ProgressIndicator',
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
        type: 'linear',
    },
    decorators: [
        (Story) => (
            <div style={{ minWidth: '200px' }}>
                <Story />
            </div>
        ),
    ],
}

export const Cicular: Story = {
    args: {
        type: 'circular',
    },
}
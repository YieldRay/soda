import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProgressIndicator } from '.'

const meta: Meta<typeof ProgressIndicator> = {
    title: 'components/ProgressIndicator',
    component: ProgressIndicator,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Linear: Story = {
    args: {
        variant: 'linear',
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
        variant: 'circular',
    },
}

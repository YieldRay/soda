import type { Meta, StoryObj } from '@storybook/react'

import { ActionButton } from './ActionButton'

const meta = {
    title: 'composition/ActionButton',
    component: ActionButton,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    args: {
        children: <>ActionButton</>,
    },
} satisfies Meta<typeof ActionButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {},
}

export const Inverse: Story = {
    args: {
        inverse: true,
    },
    decorators: [
        (Story) => (
            <div
                style={{
                    background: `var(--sd-sys-color-inverse-surface)`,
                    width: '100vw',
                    height: '100vh',
                }}
            >
                <Story />
            </div>
        ),
    ],
}

import type { Meta, StoryObj } from '@storybook/react'

import { DatePicker } from '.'

const meta = {
    title: 'DatePicker',
    component: DatePicker,
    tags: ['autodocs'],
} satisfies Meta<typeof DatePicker>

export default meta

type Story = StoryObj<typeof meta>

export const Docked: Story = {
    args: { sd: 'docked' },
    decorators: [
        (Story) => (
            <div style={{ minHeight: '50vh' }}>
                <Story />
            </div>
        ),
    ],
}

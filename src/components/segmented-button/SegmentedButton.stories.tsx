import type { Meta, StoryObj } from '@storybook/react'

import { SegmentedButton } from '.'
import { useState } from 'react'

const meta = {
    title: 'Button/SegmentedButton',
    component: SegmentedButton,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof SegmentedButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => {
        const items = [
            {
                value: 'enabled',
                label: <>✅ Enabled</>,
            },
            {
                value: 'unknown',
                label: <>🔄 Unknown</>,
                disabled: true,
            },
            {
                value: 'disabled',
                label: <>❎ disabled</>,
            },
        ]
        const [activeIndex, setActiveIndex] = useState(0)
        return (
            <SegmentedButton
                items={items}
                activeIndex={activeIndex}
                onChange={(i) => setActiveIndex(i)}
            />
        )
    },
}

import type { Meta, StoryObj } from '@storybook/react'

import { Slider } from '.'
import { useState } from 'react'

const meta = {
    title: 'Slider',
    component: Slider,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Slider>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => {
        const [value, setValue] = useState(0)
        return (
            <div style={{ minWidth: '20rem' }}>
                <p>{value}</p>
                <Slider value={value} onChange={setValue} steps={5}></Slider>
            </div>
        )
    },
}

export const Vertical: Story = {
    render: () => {
        const [value, setValue] = useState(0)
        return (
            <div style={{ minWidth: '20rem' }}>
                <p>{value}</p>
                <Slider
                    value={value}
                    onChange={setValue}
                    steps={5}
                    direction="vertical"
                ></Slider>
            </div>
        )
    },
}

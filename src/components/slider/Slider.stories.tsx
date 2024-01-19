import type { Meta, StoryObj } from '@storybook/react'

import { Slider } from '.'
import { useState } from 'react'

const meta = {
    title: 'components/Slider',
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
                <Slider value={value} onChange={setValue} />
            </div>
        )
    },
}

export const Steps: Story = {
    render: () => {
        const [value, setValue] = useState(0)
        return (
            <div style={{ minWidth: '20rem' }}>
                <p>{value}</p>
                <Slider value={value} onChange={setValue} steps={5} />
            </div>
        )
    },
}

export const Limit: Story = {
    render: () => {
        const [value, setValue] = useState(10)
        return (
            <div style={{ minWidth: '20rem' }}>
                <p>{value}</p>
                <Slider value={value} onChange={setValue} min={10} max={50} />
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
                    direction="vertical"
                />
            </div>
        )
    },
}

export const Uncontrolled: Story = {
    args: {
        defaultValue: 50,
        onChange: console.log,
    },
}

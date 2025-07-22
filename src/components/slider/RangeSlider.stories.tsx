import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { RangeSlider } from './RangeSlider'

const meta: Meta<typeof RangeSlider> = {
    title: 'components/RangeSlider',
    component: RangeSlider,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => {
        const [rangeValue, setRangeValue] = useState<[number, number]>([20, 80])
        return (
            <div style={{ minWidth: '20rem' }}>
                <p>
                    {rangeValue[0]} - {rangeValue[1]}
                </p>
                <RangeSlider value={rangeValue} onChange={setRangeValue} />
            </div>
        )
    },
}

export const WithSteps: Story = {
    render: () => {
        const [rangeValue, setRangeValue] = useState<[number, number]>([1, 4])
        return (
            <div style={{ minWidth: '20rem' }}>
                <p>
                    {rangeValue[0]} - {rangeValue[1]}
                </p>
                <RangeSlider
                    value={rangeValue}
                    onChange={setRangeValue}
                    steps={5}
                    min={0}
                    max={5}
                />
            </div>
        )
    },
}

export const Vertical: Story = {
    render: () => {
        const [rangeValue, setRangeValue] = useState<[number, number]>([30, 70])
        return (
            <div style={{ minHeight: '20rem' }}>
                <p>
                    {rangeValue[0].toFixed(2)} - {rangeValue[1].toFixed(2)}
                </p>
                <RangeSlider
                    value={rangeValue}
                    onChange={setRangeValue}
                    direction="vertical"
                />
            </div>
        )
    },
}

export const Uncontrolled: Story = {
    args: {
        defaultValue: [25, 75],
        onChange: console.log,
    },
}

export const CustomRange: Story = {
    render: () => {
        const [rangeValue, setRangeValue] = useState<[number, number]>([
            150, 350,
        ])
        return (
            <div style={{ minWidth: '20rem' }}>
                <p>
                    {rangeValue[0].toFixed(2)} - {rangeValue[1].toFixed(2)}
                </p>
                <RangeSlider
                    value={rangeValue}
                    onChange={setRangeValue}
                    min={100}
                    max={500}
                />
            </div>
        )
    },
}

export const Disabled: Story = {
    render: () => {
        const [rangeValue, setRangeValue] = useState<[number, number]>([40, 60])
        return (
            <div style={{ minWidth: '20rem' }}>
                <p>
                    {rangeValue[0]} - {rangeValue[1]}
                </p>
                <RangeSlider
                    value={rangeValue}
                    onChange={setRangeValue}
                    disabled
                />
            </div>
        )
    },
}

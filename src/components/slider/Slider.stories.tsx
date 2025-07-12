import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Slider } from '.'

const meta: Meta<typeof Slider> = {
    title: 'components/Slider',
    component: Slider,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
}

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

export const Range: Story = {
    render: () => {
        const [rangeValue, setRangeValue] = useState<[number, number]>([20, 80])
        return (
            <div style={{ minWidth: '20rem' }}>
                <p>{rangeValue[0]} - {rangeValue[1]}</p>
                <Slider 
                    range
                    rangeValue={rangeValue} 
                    onRangeChange={setRangeValue} 
                />
            </div>
        )
    },
}

export const RangeWithSteps: Story = {
    render: () => {
        const [rangeValue, setRangeValue] = useState<[number, number]>([1, 4])
        return (
            <div style={{ minWidth: '20rem' }}>
                <p>{rangeValue[0]} - {rangeValue[1]}</p>
                <Slider 
                    range
                    rangeValue={rangeValue} 
                    onRangeChange={setRangeValue}
                    steps={5}
                    min={0}
                    max={5}
                />
            </div>
        )
    },
}

export const RangeVertical: Story = {
    render: () => {
        const [rangeValue, setRangeValue] = useState<[number, number]>([30, 70])
        return (
            <div style={{ minHeight: '20rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <p>{rangeValue[0]} - {rangeValue[1]}</p>
                <Slider 
                    range
                    rangeValue={rangeValue} 
                    onRangeChange={setRangeValue}
                    direction="vertical"
                />
            </div>
        )
    },
}

export const RangeUncontrolled: Story = {
    args: {
        range: true,
        defaultRangeValue: [25, 75],
        onRangeChange: console.log,
    },
}

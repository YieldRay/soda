import type { Meta, StoryObj } from '@storybook/react'

import { Card } from './'

const meta = {
    title: 'Card',
    component: Card,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Outlined: Story = {
    args: {
        sd: 'outlined',
        children: <CardDemoChild />,
    },
}

export const Filled: Story = {
    args: {
        sd: 'filled',
        children: <CardDemoChild />,
    },
}

export const Elevated: Story = {
    args: {
        sd: 'elevated',
        children: <CardDemoChild />,
    },
}

function CardDemoChild() {
    return (
        <div
            style={{
                minWidth: '300px',
                minHeight: '400px',
                display: 'grid',
                placeItems: 'center',
            }}
        >
            This is a card
        </div>
    )
}

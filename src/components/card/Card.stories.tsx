import type { Meta, StoryObj } from '@storybook/react'

import { Card } from '.'

const meta = {
    title: 'Card',
    component: Card,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        children: <CardDemoChild />,
    },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Outlined: Story = {
    args: {
        sd: 'outlined',
    },
}

export const Filled: Story = {
    args: {
        sd: 'filled',
    },
}

export const Elevated: Story = {
    args: {
        sd: 'elevated',
    },
}

function CardDemoChild() {
    return (
        <div
            style={{
                minWidth: '400px',
                minHeight: '200px',
                display: 'grid',
                placeItems: 'center',
            }}
        >
            This is a card
        </div>
    )
}

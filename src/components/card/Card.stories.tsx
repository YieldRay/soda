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

export const Elevated: Story = {
    args: {
        sd: 'elevated',
    },
}

export const Filled: Story = {
    args: {
        sd: 'filled',
    },
}

export const Outlined: Story = {
    args: {
        sd: 'outlined',
    },
}

function CardDemoChild() {
    return (
        <div
            style={{
                minWidth: '200px',
                minHeight: '100px',
                padding: '1rem',
            }}
        >
            This is a card
        </div>
    )
}

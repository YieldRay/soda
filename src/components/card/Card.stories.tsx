import type { Meta, StoryObj } from '@storybook/react'

import { Card } from '.'

const meta = {
    title: 'components/Card',
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
        variant: 'elevated',
    },
}

export const Filled: Story = {
    args: {
        variant: 'filled',
    },
}

export const Outlined: Story = {
    args: {
        variant: 'outlined',
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

import type { Meta, StoryObj } from '@storybook/react'

import { Details } from './Details'
import { useState } from 'react'

const meta = {
    title: 'composition/Details',
    component: Details,
    tags: ['autodocs'],
    args: {
        summary: <>summary</>,
        children: <>details</>,
    },
} satisfies Meta<typeof Details>

export default meta

type Story = StoryObj<typeof meta>

export const Outlined: Story = {
    args: {
        sd: 'outlined',
        summary: 'outlined',
    },
}

export const Filled: Story = {
    args: {
        sd: 'filled',
        summary: 'filled',
    },
}

export const Controlled: Story = {
    render: () => {
        const [expanded, setExpanded] = useState(true)
        return (
            <Details
                sd="filled"
                summary="filled"
                expanded={expanded}
                onChange={() => setExpanded(!expanded)}
            >
                details
            </Details>
        )
    },
}

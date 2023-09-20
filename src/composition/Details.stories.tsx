import type { Meta, StoryObj } from '@storybook/react'

import { Details } from './Details'
import { useState } from 'react'

const meta = {
    title: 'composition/Details',
    component: Details,
    tags: ['autodocs'],
} satisfies Meta<typeof Details>

export default meta

type Story = StoryObj<typeof meta>

export const Outlined: Story = {
    render: () => {
        const [open, setOpen] = useState(true)
        return (
            <Details
                sd="outlined"
                summary="outlined"
                open={open}
                onChange={setOpen}
            >
                details
            </Details>
        )
    },
}

export const Filled: Story = {
    render: () => {
        const [open, setOpen] = useState(true)
        return (
            <Details
                sd="filled"
                summary="filled"
                open={open}
                onChange={setOpen}
            >
                details
            </Details>
        )
    },
}

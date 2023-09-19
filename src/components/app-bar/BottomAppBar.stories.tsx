import type { Meta, StoryObj } from '@storybook/react'

import { BottomAppBar } from './'

const meta = {
    title: 'BottomAppBar',
    component: BottomAppBar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof BottomAppBar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => {
        return (
            <div style={{ minWidth: '400px' }}>
                <p>content</p>
                <BottomAppBar>BottomAppBar</BottomAppBar>
            </div>
        )
    },
}

import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { clamp } from '@/utils/misc'
import { ResizablePanes } from './ResizablePanes'

const meta: Meta<typeof ResizablePanes> = {
    title: 'composition/ResizablePanes',
    component: ResizablePanes,
    tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        firstPane: <>firstPane</>,
        firstPaneProps: {
            style: {
                background: 'var(--md-sys-color-primary)',
            },
        },
        secondPane: <>secondPane</>,
        secondPaneProps: {
            style: {
                background: 'var(--md-sys-color-inverse-primary)',
            },
        },
        resizerSize: '4px',
        resizerProps: {
            style: {
                background: '#eee',
            },
        },
    },
    render: (props) => {
        const [size, setSize] = useState(200)
        // tips: use clamp to limit pane size
        const onSizeChange = (size: number) => setSize(clamp(100, size, 200))
        return (
            <ResizablePanes
                {...props}
                size={size}
                onSizeChange={onSizeChange}
            />
        )
    },
}

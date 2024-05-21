import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from './Skeleton'

const meta: Meta<typeof Skeleton> = {
    title: 'composition/Skeleton',
    component: Skeleton,
    tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        height: '2rem',
        borderRadius: '4px',
    },
}

import type { Meta, StoryObj } from '@storybook/react'

import { Snakebar } from '.'
import { IconClose } from '@/utils/icons'

const meta = {
    title: 'Snakebar',
    component: Snakebar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Snakebar>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
    args: {
        children: 'snakebar!',
        action: <>Action</>,
        icon: <IconClose />,
    },
}

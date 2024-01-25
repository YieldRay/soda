import type { Meta, StoryObj } from '@storybook/react'

import { Blockquote } from './Blockquote'
import { mdiBookmarkOutline } from '@mdi/js'

const meta = {
    title: 'composition/Blockquote',
    component: Blockquote,
    tags: ['autodocs'],
    args: {
        iconPath: mdiBookmarkOutline,
        children: 'Blockquote'.repeat(20),
        close: true,
    },
} satisfies Meta<typeof Blockquote>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

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

export const Error: Story = {
    args: {
        variant: 'error',
    },
}

import type { Meta, StoryObj } from '@storybook/react'
import { mdiBookmarkOutline } from '@mdi/js'
import { Blockquote } from './Blockquote'

const meta: Meta<typeof Blockquote> = {
    title: 'composition/Blockquote',
    component: Blockquote,
    tags: ['autodocs'],
    args: {
        iconPath: mdiBookmarkOutline,
        children: 'Blockquote'.repeat(20),
        close: true,
    },
}

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

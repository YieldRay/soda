import type { Meta, StoryObj } from '@storybook/react'

import { TopAppBar } from '.'
import { IconButton } from '../icon-button'

const meta = {
    title: 'TopAppBar',
    component: TopAppBar,
    tags: ['autodocs'],
    args: {
        children: <>TopAppBar</>,
        leadingNavigationIcon: <IconButton>◀</IconButton>,
        trailingIcon: (
            <>
                <IconButton>❤</IconButton>
                <IconButton>×</IconButton>
            </>
        ),
    },
} satisfies Meta<typeof TopAppBar>

export default meta

type Story = StoryObj<typeof meta>

export const Small: Story = {
    args: {
        sd: 'small',
    },
}

export const Center: Story = {
    args: {
        sd: 'center',
    },
}

export const Medium: Story = {
    args: {
        sd: 'medium',
    },
}

export const Large: Story = {
    args: {
        sd: 'large',
    },
}
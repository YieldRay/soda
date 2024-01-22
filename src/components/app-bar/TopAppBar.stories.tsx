import type { Meta, StoryObj } from '@storybook/react'

import { TopAppBar } from '.'
import { IconButton } from '../icon-button'
import { mdiDotsVertical, mdiMagnify, mdiMenu } from '@mdi/js'

const meta = {
    title: 'components/AppBar/TopAppBar',
    component: TopAppBar,
    tags: ['autodocs'],
    args: {
        children: <>TopAppBar</>,
        leadingNavigationIcon: <IconButton path={mdiMenu} />,
        trailingIcon: (
            <>
                <IconButton path={mdiMagnify} />
                <IconButton path={mdiDotsVertical} />
            </>
        ),
    },
} satisfies Meta<typeof TopAppBar>

export default meta

type Story = StoryObj<typeof meta>

export const Small: Story = {
    args: {
        variant: 'small',
    },
}

export const Center: Story = {
    args: {
        variant: 'center',
    },
}

export const Medium: Story = {
    args: {
        variant: 'medium',
    },
}

export const Large: Story = {
    args: {
        variant: 'large',
    },
}

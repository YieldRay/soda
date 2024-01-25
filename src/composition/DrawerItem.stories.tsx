import type { Meta, StoryObj } from '@storybook/react'

import { DrawerItem } from './DrawerItem'
import { mdiCheck } from '@mdi/js'
import Icon from '@mdi/react'

const meta = {
    title: 'composition/DrawerItem',
    component: DrawerItem,
    tags: ['autodocs'],
    args: {
        icon: <Icon size={1} path={mdiCheck} />,
        children: 'label text (soooooooooo looooooooooooong)',
        badge: '99+',
    },
} satisfies Meta<typeof DrawerItem>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        active: false,
    },
}

export const Enabled: Story = {
    args: {
        active: true,
    },
}

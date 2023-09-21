import type { Meta, StoryObj } from '@storybook/react'

import { MenuItem, Menu } from '.'
import { IconChecked, IconClose, IconMagnify } from '@/utils/icons'
import { Divider } from '../divider'

const meta = {
    title: 'MenuItem',
    component: MenuItem,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof MenuItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => {
        return (
            <Menu>
                <MenuItem
                    leadingIcon={<IconMagnify />}
                    trailingIcon={<IconMagnify />}
                >
                    Apple
                </MenuItem>
                <Divider />
                <MenuItem leadingIcon={<IconChecked />} trailingText={'⌘C'}>
                    Banana
                </MenuItem>
                <MenuItem leadingIcon={<IconClose />} trailingText={'⌘V'}>
                    Orange
                </MenuItem>
            </Menu>
        )
    },
}

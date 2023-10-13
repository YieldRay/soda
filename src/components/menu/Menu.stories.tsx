import type { Meta, StoryObj } from '@storybook/react'

import { MenuItem, Menu } from '.'
import { Divider } from '../divider'
import { mdiCheck, mdiClose, mdiMagnify } from '@mdi/js'
import Icon from '@mdi/react'

const meta = {
    title: 'Menu',
    component: Menu,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Menu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => {
        return (
            <Menu>
                <MenuItem
                    leadingIcon={<Icon path={mdiMagnify}></Icon>}
                    trailingIcon={<Icon path={mdiMagnify}></Icon>}
                >
                    Apple
                </MenuItem>
                <Divider />
                <MenuItem
                    leadingIcon={<Icon path={mdiCheck}></Icon>}
                    trailingText={'⌘C'}
                >
                    Banana
                </MenuItem>
                <MenuItem
                    leadingIcon={<Icon path={mdiClose}></Icon>}
                    trailingText={'⌘V'}
                >
                    Orange
                </MenuItem>
                <MenuItem
                    leadingIcon={<Icon path={mdiClose}></Icon>}
                    trailingText={'⌘V'}
                    disabled
                >
                    Orange
                </MenuItem>
            </Menu>
        )
    },
}

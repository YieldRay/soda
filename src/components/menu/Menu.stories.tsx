import type { Meta, StoryObj } from '@storybook/react'

import { MenuItem, Menu } from '.'
import { Divider } from '../divider'
import { mdiCheck, mdiClose, mdiMagnify } from '@mdi/js'
import Icon from '@mdi/react'

const meta = {
    title: 'components/Menu',
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
                    leadingIcon={<Icon size={1} path={mdiMagnify} />}
                    trailingIcon={<Icon size={1} path={mdiMagnify} />}
                >
                    Apple
                </MenuItem>
                <Divider />
                <MenuItem
                    leadingIcon={<Icon size={1} path={mdiCheck} />}
                    trailingText={'⌘C'}
                >
                    Banana
                </MenuItem>
                <MenuItem
                    leadingIcon={<Icon size={1} path={mdiClose} />}
                    trailingText={'⌘V'}
                >
                    Orange
                </MenuItem>
                <MenuItem
                    leadingIcon={<Icon size={1} path={mdiClose} />}
                    trailingText={'⌘V'}
                    disabled
                >
                    Orange
                </MenuItem>
            </Menu>
        )
    },
}

import type { Meta, StoryObj } from '@storybook/react'
import { mdiDotsVertical } from '@mdi/js'
import { IconButton } from '../..'
import { NestedMenu as Menu, NestedMenuItem as MenuItem } from './NestedMenu'

const meta: Meta<typeof Menu> = {
    title: 'composition/NestedMenu',
    component: Menu,
    tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

const submenus = (
    <>
        <MenuItem onClick={() => console.log('Undo')}>Undo</MenuItem>
        <MenuItem disabled>Redo</MenuItem>
        <MenuItem>Cut</MenuItem>
        <Menu label="Copy as" leadingIcon={'*'}>
            <MenuItem>Text</MenuItem>
            <MenuItem>Video</MenuItem>
            <Menu label="Image">
                <MenuItem>.png</MenuItem>
                <MenuItem>.jpg</MenuItem>
                <MenuItem>.svg</MenuItem>
                <MenuItem>.git</MenuItem>
            </Menu>
            <MenuItem>Audio</MenuItem>
        </Menu>
        <Menu label="Share">
            <MenuItem>Twitter</MenuItem>
            <MenuItem>Instagram</MenuItem>
        </Menu>
    </>
)

export const Default: Story = {
    args: {
        label: <IconButton path={mdiDotsVertical} />,
        defaultOpen: false,
        children: submenus,
    },
    decorators: [
        (Story) => (
            <div style={{ minHeight: '50vh' }}>
                <h1>Dropdown Menu</h1>
                <p>(Soda with floating-ui)</p>
                <Story />
            </div>
        ),
    ],
}

export const ContextMenu: Story = {
    args: { contextMenu: true, children: submenus },
    decorators: [
        (Story) => (
            <div style={{ minHeight: '50vh' }}>
                <h1>Context Menu</h1>
                <p>Right click the document to display</p>
                <p>(Soda with floating-ui)</p>
                <Story />
            </div>
        ),
    ],
}

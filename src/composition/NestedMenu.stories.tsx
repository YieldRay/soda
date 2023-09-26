import type { Meta, StoryObj } from '@storybook/react'
import { NestedMenu as Menu, NestedMenuItem as MenuItem } from './NestedMenu'

const meta = {
    title: 'composition/NestedMenu',
    component: Menu,
    tags: ['autodocs'],
} satisfies Meta<typeof Menu>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => (
        <div style={{ minHeight: '100vh' }}>
            <h1>Floating UI Dropdown Menu</h1>
            <p>(Soda with floating-ui)</p>

            <Menu label={<button>open</button>} defaultOpen>
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
            </Menu>

            <h3>ARIA Authoring Practices Guide</h3>
            <a
                target="_blank"
                href="https://www.w3.org/WAI/ARIA/apg/patterns/menubutton/"
                rel="noreferrer"
            >
                Menu Button
            </a>
        </div>
    ),
}

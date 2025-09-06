import { useState } from 'react'
import {
    mdiAccount,
    mdiCog,
    mdiFolder,
    mdiHeart,
    mdiMessageOutline,
    mdiPencilOutline,
    mdiPlus,
} from '@mdi/js'
import Icon from '@mdi/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { FabMenu, FabMenuItem } from '.'
import { Switch } from '../switch'

const meta: Meta<typeof FabMenu> = {
    title: 'components/Button/FabMenu',
    component: FabMenu,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'FAB Menu component with expandable menu items following Material Design 3 specifications. Supports up to 6 menu items and three color variants.',
            },
        },
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div
                style={{
                    height: '400px',
                    display: 'flex',
                    justifyContent: 'end',
                }}
            >
                <Story />
            </div>
        ),
    ],
    argTypes: {
        variant: {
            options: ['primary', 'secondary', 'tertiary'],
            control: { type: 'radio' },
            description: 'Color variant for the menu',
        },
        open: {
            control: { type: 'boolean' },
            description: 'Controlled open state',
        },
    },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        variant: 'primary',
        fabIcon: <Icon path={mdiPlus} size={1} />,
        'aria-label': 'Open menu',
    },
    render: (args) => (
        <FabMenu {...args}>
            <FabMenuItem
                icon={<Icon path={mdiPencilOutline} size={1} />}
                label="Edit"
                onClick={() => console.log('Edit clicked')}
            />
            <FabMenuItem
                icon={<Icon path={mdiMessageOutline} size={1} />}
                label="Message"
                onClick={() => console.log('Message clicked')}
            />
            <FabMenuItem
                icon={<Icon path={mdiFolder} size={1} />}
                label="Folder"
                onClick={() => console.log('Folder clicked')}
            />
        </FabMenu>
    ),
}

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        fabIcon: <Icon path={mdiPlus} size={1} />,
    },
    render: (args) => (
        <FabMenu {...args}>
            <FabMenuItem
                icon={<Icon path={mdiAccount} size={1} />}
                label="Profile"
            />
            <FabMenuItem
                icon={<Icon path={mdiCog} size={1} />}
                label="Settings"
            />
        </FabMenu>
    ),
}

export const Tertiary: Story = {
    args: {
        variant: 'tertiary',
        fabIcon: <Icon path={mdiHeart} size={1} />,
    },
    render: (args) => (
        <FabMenu {...args}>
            <FabMenuItem
                icon={<Icon path={mdiPencilOutline} size={1} />}
                label="Write"
            />
            <FabMenuItem
                icon={<Icon path={mdiMessageOutline} size={1} />}
                label="Chat"
                disabled
            />
            <FabMenuItem
                icon={<Icon path={mdiFolder} size={1} />}
                label="Save"
            />
        </FabMenu>
    ),
}

export const MaxItems: Story = {
    args: {
        variant: 'primary',
        fabIcon: <Icon path={mdiPlus} size={1} />,
    },
    render: (args) => (
        <FabMenu {...args}>
            <FabMenuItem
                icon={<Icon path={mdiPencilOutline} size={1} />}
                label="First"
            />
            <FabMenuItem
                icon={<Icon path={mdiMessageOutline} size={1} />}
                label="Second"
            />
            <FabMenuItem
                icon={<Icon path={mdiFolder} size={1} />}
                label="Third"
            />
            <FabMenuItem
                icon={<Icon path={mdiAccount} size={1} />}
                label="Fourth"
            />
            <FabMenuItem icon={<Icon path={mdiCog} size={1} />} label="Fifth" />
            <FabMenuItem
                icon={<Icon path={mdiHeart} size={1} />}
                label="Sixth"
            />
            {/* This item will be ignored due to 6-item limit */}
            <FabMenuItem
                icon={<Icon path={mdiPlus} size={1} />}
                label="Seventh (ignored)"
            />
        </FabMenu>
    ),
    parameters: {
        docs: {
            description: {
                story: 'FAB Menu supports up to 6 items. Additional items are automatically ignored.',
            },
        },
    },
}

export const IconOnly: Story = {
    args: {
        variant: 'primary',
        fabIcon: <Icon path={mdiPlus} size={1} />,
    },
    render: (args) => (
        <FabMenu {...args}>
            <FabMenuItem
                icon={<Icon path={mdiPencilOutline} size={1} />}
                aria-label="Edit"
            />
            <FabMenuItem
                icon={<Icon path={mdiMessageOutline} size={1} />}
                aria-label="Message"
            />
            <FabMenuItem
                icon={<Icon path={mdiFolder} size={1} />}
                aria-label="Folder"
            />
        </FabMenu>
    ),
    parameters: {
        docs: {
            description: {
                story: 'FAB Menu items can contain only icons without labels. Ensure proper aria-label is provided for accessibility.',
            },
        },
    },
}

export const Controlled: Story = {
    args: {
        variant: 'primary',
        open: false,
        fabIcon: <Icon path={mdiPlus} size={1} />,
    },
    render: function ControlledStory(args) {
        const [open, setOpen] = useState(args.open)

        return (
            <div
                style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <Switch checked={open} onChange={setOpen} />
                <FabMenu {...args} open={open} onChange={setOpen}>
                    <FabMenuItem
                        icon={<Icon path={mdiPencilOutline} size={1} />}
                        label="Edit"
                    />
                    <FabMenuItem
                        icon={<Icon path={mdiMessageOutline} size={1} />}
                        label="Message"
                    />
                </FabMenu>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'FAB Menu can be controlled externally using the open prop and onChange callback.',
            },
        },
    },
}

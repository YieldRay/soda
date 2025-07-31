import {
    mdiContentCopy,
    mdiContentCut,
    mdiContentPaste,
    mdiDelete,
    mdiPencilOutline,
    mdiShare,
} from '@mdi/js'
import Icon from '@mdi/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Fab } from './Fab'
import { FabMenu, FabMenuItem } from './FabMenu'

const meta: Meta<typeof FabMenu> = {
    title: 'components/Button/FabMenu',
    component: FabMenu,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            options: ['primary', 'secondary', 'tertiary'],
            control: { type: 'radio' },
        },
        fabSize: {
            options: ['small', 'default', 'large'],
            control: { type: 'radio' },
        },
    },
}

export default meta

type Story = StoryObj<typeof meta>

const createMenuItems = () => [
    <FabMenuItem key="edit" icon={<Icon path={mdiPencilOutline} size={1} />}>
        Edit
    </FabMenuItem>,
    <FabMenuItem key="copy" icon={<Icon path={mdiContentCopy} size={1} />}>
        Copy
    </FabMenuItem>,
    <FabMenuItem key="cut" icon={<Icon path={mdiContentCut} size={1} />}>
        Cut
    </FabMenuItem>,
    <FabMenuItem key="paste" icon={<Icon path={mdiContentPaste} size={1} />}>
        Paste
    </FabMenuItem>,
    <FabMenuItem key="share" icon={<Icon path={mdiShare} size={1} />}>
        Share
    </FabMenuItem>,
    <FabMenuItem key="delete" icon={<Icon path={mdiDelete} size={1} />}>
        Delete
    </FabMenuItem>,
]

export const Primary: Story = {
    args: {
        variant: 'primary',
        fabSize: 'default',
        items: createMenuItems(),
        children: (
            <Fab variant="surface" size="default">
                <Icon path={mdiPencilOutline} size={1} />
            </Fab>
        ),
    },
}

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        fabSize: 'default',
        items: createMenuItems(),
        children: (
            <Fab variant="secondary" size="default">
                <Icon path={mdiPencilOutline} size={1} />
            </Fab>
        ),
    },
}

export const Tertiary: Story = {
    args: {
        variant: 'tertiary',
        fabSize: 'default',
        items: createMenuItems(),
        children: (
            <Fab variant="tertiary" size="default">
                <Icon path={mdiPencilOutline} size={1} />
            </Fab>
        ),
    },
}

export const SmallFab: Story = {
    args: {
        variant: 'primary',
        fabSize: 'small',
        items: createMenuItems().slice(0, 3), // Show fewer items for small FAB
        children: (
            <Fab variant="surface" size="small">
                <Icon path={mdiPencilOutline} size={1} />
            </Fab>
        ),
    },
}

export const LargeFab: Story = {
    args: {
        variant: 'primary',
        fabSize: 'large',
        items: createMenuItems(),
        children: (
            <Fab variant="surface" size="large">
                <Icon path={mdiPencilOutline} size={1} />
            </Fab>
        ),
    },
}

export const WithDisabledItems: Story = {
    args: {
        variant: 'primary',
        fabSize: 'default',
        items: [
            <FabMenuItem key="edit" icon={<Icon path={mdiPencilOutline} size={1} />}>
                Edit
            </FabMenuItem>,
            <FabMenuItem key="copy" icon={<Icon path={mdiContentCopy} size={1} />} disabled>
                Copy (disabled)
            </FabMenuItem>,
            <FabMenuItem key="share" icon={<Icon path={mdiShare} size={1} />}>
                Share
            </FabMenuItem>,
        ],
        children: (
            <Fab variant="surface" size="default">
                <Icon path={mdiPencilOutline} size={1} />
            </Fab>
        ),
    },
}

export const MaximumItems: Story = {
    args: {
        variant: 'primary',
        fabSize: 'default',
        items: createMenuItems(), // All 6 items (maximum as per spec)
        children: (
            <Fab variant="surface" size="default">
                <Icon path={mdiPencilOutline} size={1} />
            </Fab>
        ),
    },
    parameters: {
        docs: {
            description: {
                story: 'The FAB menu can have up to six items as per Material Design specifications.',
            },
        },
    },
}
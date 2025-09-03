import {
    mdiPlus,
    mdiPencil,
    mdiEmail,
    mdiDelete,
    mdiShare,
    mdiHeart,
    mdiStar,
    mdiBookmark,
} from '@mdi/js'
import Icon from '@mdi/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { FabMenu } from '.'

const meta: Meta<typeof FabMenu> = {
    title: 'composition/FabMenu',
    component: FabMenu,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'FAB Menu (Speed Dial) displays a main FAB that expands to show a list of action items. Based on Material Design 3 FAB specifications.',
            },
        },
    },
    tags: ['autodocs'],
    args: {
        icon: <Icon path={mdiPlus} size={1} />,
        actions: [
            {
                icon: <Icon path={mdiPencil} size={0.8} />,
                label: 'Edit',
                onClick: () => alert('Edit clicked'),
            },
            {
                icon: <Icon path={mdiEmail} size={0.8} />,
                label: 'Email',
                onClick: () => alert('Email clicked'),
            },
            {
                icon: <Icon path={mdiShare} size={0.8} />,
                label: 'Share',
                onClick: () => alert('Share clicked'),
            },
        ],
    },
    argTypes: {
        position: {
            options: ['top', 'bottom', 'left', 'right'],
            control: { type: 'radio' },
        },
        variant: {
            options: ['surface', 'secondary', 'tertiary'],
            control: { type: 'radio' },
        },
        size: {
            options: ['small', 'default', 'large'],
            control: { type: 'radio' },
        },
    },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        position: 'top',
    },
}

export const WithLabels: Story = {
    args: {
        position: 'top',
        showLabels: true,
    },
}

export const PositionBottom: Story = {
    args: {
        position: 'bottom',
        showLabels: true,
    },
}

export const PositionLeft: Story = {
    args: {
        position: 'left',
        showLabels: true,
    },
}

export const PositionRight: Story = {
    args: {
        position: 'right',
        showLabels: true,
    },
}

export const NoBackdrop: Story = {
    args: {
        position: 'top',
        showLabels: true,
        showBackdrop: false,
    },
}

export const SecondaryVariant: Story = {
    args: {
        position: 'top',
        variant: 'secondary',
        showLabels: true,
    },
}

export const LargeSize: Story = {
    args: {
        position: 'top',
        size: 'large',
        showLabels: true,
    },
}

export const ManyActions: Story = {
    args: {
        position: 'top',
        showLabels: true,
        actions: [
            {
                icon: <Icon path={mdiPencil} size={0.8} />,
                label: 'Edit',
                onClick: () => alert('Edit clicked'),
            },
            {
                icon: <Icon path={mdiEmail} size={0.8} />,
                label: 'Email',
                onClick: () => alert('Email clicked'),
            },
            {
                icon: <Icon path={mdiShare} size={0.8} />,
                label: 'Share',
                onClick: () => alert('Share clicked'),
            },
            {
                icon: <Icon path={mdiHeart} size={0.8} />,
                label: 'Like',
                onClick: () => alert('Like clicked'),
            },
            {
                icon: <Icon path={mdiStar} size={0.8} />,
                label: 'Favorite',
                onClick: () => alert('Favorite clicked'),
            },
            {
                icon: <Icon path={mdiBookmark} size={0.8} />,
                label: 'Bookmark',
                onClick: () => alert('Bookmark clicked'),
            },
        ],
    },
}

export const WithDisabledAction: Story = {
    args: {
        position: 'top',
        showLabels: true,
        actions: [
            {
                icon: <Icon path={mdiPencil} size={0.8} />,
                label: 'Edit',
                onClick: () => alert('Edit clicked'),
            },
            {
                icon: <Icon path={mdiEmail} size={0.8} />,
                label: 'Email (disabled)',
                onClick: () => alert('Email clicked'),
                disabled: true,
            },
            {
                icon: <Icon path={mdiDelete} size={0.8} />,
                label: 'Delete',
                onClick: () => alert('Delete clicked'),
                variant: 'tertiary',
            },
        ],
    },
}

export const CustomCloseIcon: Story = {
    args: {
        position: 'top',
        showLabels: true,
        iconOpen: <Icon path={mdiStar} size={1} />,
    },
}
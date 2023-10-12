import type { Meta, StoryObj } from '@storybook/react'

import { Snakebar } from '.'

const meta = {
    title: 'Snakebar',
    component: Snakebar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Snakebar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        children: 'snakebar!',
        action: <>Dismiss</>,
        onActionClick: () => console.log('onActionClick'),
        onCloseClick: () => console.log('onCloseClick'),
    },
}

export const Long: Story = {
    args: {
        children:
            'Snackbars should be placed at the bottom of a UI, in front of the main content. In some cases, snackbars can be nudged upwards to avoid overlapping with other UI elements near the bottom, such as FABs or bottom app bars.',
        action: <>Undo</>,
    },
}

export const ThridLine: Story = {
    args: {
        children:
            'Snackbars should be placed at the bottom of a UI, in front of the main content. In some cases, snackbars can be nudged upwards to avoid overlapping with other UI elements near the bottom, such as FABs or bottom app bars.',
        action: <>Undo</>,
        thirdLine: true,
    },
}

import type { Meta, StoryObj } from '@storybook/react'

import { Snackbar } from '.'
import { Button } from '../button'
import { useState } from 'react'

const meta = {
    title: 'components/Snackbar',
    component: Snackbar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Snackbar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        children: 'snackbar!',
        action: <>Dismiss</>,
        onActionClick: () => console.log('onActionClick'),
        onCloseClick: () => console.log('onCloseClick'),
    },
}

const msg =
    'Snackbars should be placed at the bottom of a UI, in front of the main content. In some cases, snackbars can be nudged upwards to avoid overlapping with other UI elements near the bottom, such as FABs or bottom app bars.'

export const Long: Story = {
    args: {
        children: msg,
        action: <>Undo</>,
    },
}

export const ThirdLine: Story = {
    args: {
        children: msg,
        action: <>Undo</>,
        thirdLine: true,
    },
}

export const Fixed: Story = {
    render: () => {
        const [open, setOpen] = useState(false)
        return (
            <>
                <Button onClick={() => setOpen((x) => !x)}>toggle</Button>
                open={String(open)}
                <br />
                <Snackbar
                    fixed
                    teleportTo={document.body}
                    open={open}
                    action="Close"
                    onActionClick={() => setOpen(false)}
                    onCloseClick={() => setOpen(false)}
                >
                    Snackbar
                </Snackbar>
            </>
        )
    },
}

export const Full: Story = {
    render: () => {
        const [open, setOpen] = useState(false)
        return (
            <>
                <Button onClick={() => setOpen((x) => !x)}>toggle</Button>
                open={String(open)}
                <br />
                <Snackbar
                    fixed
                    full
                    thirdLine
                    teleportTo={document.body}
                    open={open}
                    action="Close"
                    onActionClick={() => setOpen(false)}
                    onCloseClick={() => setOpen(false)}
                >
                    {msg}
                </Snackbar>
            </>
        )
    },
}

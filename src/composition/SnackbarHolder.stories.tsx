import type { Meta, StoryObj } from '@storybook/react'

import { SnackbarHolder } from './SnackbarHolder'
import { Snackbar } from '@/components/snackbar'

const meta = {
    title: 'composition/SnackbarHolder',
    component: SnackbarHolder,
    tags: ['autodocs'],
} satisfies Meta<typeof SnackbarHolder>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => (
        <SnackbarHolder teleportTo={document.body}>
            <Snackbar>Snakebar</Snackbar>
        </SnackbarHolder>
    ),
}

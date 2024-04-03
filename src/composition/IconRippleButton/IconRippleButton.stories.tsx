import type { Meta, StoryObj } from '@storybook/react'
import { mdiCheck } from '@mdi/js'
import { IconRippleButton } from './IconRippleButton'

const meta: Meta<typeof IconRippleButton> = {
    title: 'composition/IconRippleButton',
    component: IconRippleButton,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    args: {
        path: mdiCheck,
    },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

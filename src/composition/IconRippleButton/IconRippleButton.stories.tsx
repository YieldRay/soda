import type { Meta, StoryObj } from '@storybook/react'
import { mdiCheck } from '@mdi/js'
import { IconRippleButton } from './IconRippleButton'

const meta = {
    title: 'composition/IconRippleButton',
    component: IconRippleButton,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    args: {
        path: mdiCheck,
    },
} satisfies Meta<typeof IconRippleButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

import type { Meta, StoryObj } from '@storybook/react'
import { IconRippleButton } from './IconRippleButton'
import { mdiCheck } from '@mdi/js'

const meta = {
    title: 'composition/IconRippleButton',
    component: IconRippleButton,
    tags: ['autodocs'],
    args: {
        path: mdiCheck,
    },
} satisfies Meta<typeof IconRippleButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

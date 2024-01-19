import type { Meta, StoryObj } from '@storybook/react'

import { SegmentedButton } from '.'
import { mdiCheck, mdiStarOutline, mdiTriangleOutline } from '@mdi/js'
import Icon from '@mdi/react'

const items = [
    {
        value: 'enabled',
        label: (
            <>
                <Icon path={mdiStarOutline} /> Enabled
            </>
        ),
    },
    {
        value: 'unknown',
        label: (
            <>
                <Icon path={mdiCheck} /> Selected
            </>
        ),
        disabled: true,
    },
    {
        value: 'disabled',
        label: (
            <>
                <Icon path={mdiTriangleOutline} /> Unknown
            </>
        ),
    },
]

const meta = {
    title: 'components/Button/SegmentedButton',
    component: SegmentedButton,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    args: {
        items,
        onChange: console.log,
    },
} satisfies Meta<typeof SegmentedButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Density_1: Story = {
    name: 'Density -1',
    args: {
        density: -1,
    },
}

export const Density_2: Story = {
    name: 'Density -2',
    args: {
        density: -2,
    },
}

export const Density_3: Story = {
    name: 'Density -3',
    args: {
        density: -3,
    },
}

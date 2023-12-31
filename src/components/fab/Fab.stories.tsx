import type { Meta, StoryObj } from '@storybook/react'

import { Fab } from '.'
import Icon from '@mdi/react'
import { mdiPencilOutline } from '@mdi/js'

const meta = {
    title: 'Button/Fab',
    component: Fab,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        children: <Icon path={mdiPencilOutline} size={1} />,
    },
    argTypes: {
        sd: {
            options: ['surface', 'secondary', 'tertiary'],
            control: { type: 'radio' },
        },
        size: {
            options: ['small', 'middle', 'large'],
            control: { type: 'radio' },
        },
    },
} satisfies Meta<typeof Fab>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        sd: 'surface',
    },
}

export const Extended: Story = {
    args: {
        sd: 'surface',
        extended: true,
        children: (
            <>
                <Icon path={mdiPencilOutline} size={1} />
                Compose
            </>
        ),
    },
}

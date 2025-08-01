import { mdiPencilOutline } from '@mdi/js'
import Icon from '@mdi/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Fab } from '.'

const meta: Meta<typeof Fab> = {
    title: 'components/Button/Fab',
    component: Fab,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        children: <Icon path={mdiPencilOutline} size={1} />,
    },
    argTypes: {
        variant: {
            options: ['surface', 'secondary', 'tertiary'],
            control: { type: 'radio' },
        },
        size: {
            options: ['small', 'middle', 'large'],
            control: { type: 'radio' },
        },
    },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        variant: 'surface',
    },
}

export const Extended: Story = {
    args: {
        variant: 'surface',
        extended: true,
        children: (
            <>
                <Icon path={mdiPencilOutline} size={1} />
                Compose
            </>
        ),
    },
}

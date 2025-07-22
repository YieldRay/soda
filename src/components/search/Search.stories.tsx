import { mdiMagnify, mdiMenu } from '@mdi/js'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Search } from '.'
import { IconButton } from '../icon-button'

const meta: Meta<typeof Search> = {
    title: 'components/Search',
    component: Search,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        placeholder: 'placeholder',
        leadingIcon: <IconButton path={mdiMenu} />,
        trailingIcon: <IconButton path={mdiMagnify} />,
    },
}

export default meta

type Story = StoryObj<typeof meta>

export const Bar: Story = {
    args: {
        variant: 'bar',
    },
}

export const View: Story = {
    args: {
        variant: 'view',
    },
}

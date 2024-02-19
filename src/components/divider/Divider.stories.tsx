import type { Meta, StoryObj } from '@storybook/react'
import { Divider } from '.'

const meta = {
    title: 'components/Divider',
    component: Divider,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Divider>

export default meta

type Story = StoryObj<typeof meta>

export const Horizen: Story = {
    render: () => (
        <>
            <p>before divider</p>
            <Divider></Divider>
            <p>after divider</p>
        </>
    ),
}

export const Vertical: Story = {
    render: () => (
        <div style={{ display: 'flex' }}>
            <p>before divider</p>
            <Divider direction="vertical"></Divider>
            <p>after divider</p>
        </div>
    ),
}

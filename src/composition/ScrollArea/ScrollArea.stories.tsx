import type { Meta, StoryObj } from '@storybook/react-vite'
import { ScrollArea } from './ScrollArea'

const meta: Meta<typeof ScrollArea> = {
    title: 'composition/ScrollArea',
    component: ScrollArea,
    tags: ['autodocs'],
    argTypes: {
        color: {
            control: 'color',
        },
    },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    decorators: (Story) => (
        <div
            style={{
                width: '300px',
                height: '400px',
                background: 'pink',
                color: 'whitesmoke',
            }}
        >
            {<Story />}
        </div>
    ),
    render: (props) => (
        <ScrollArea {...props}>
            <ul>
                {Array.from({ length: 48 }, (_, i) => i).map((i) => (
                    <li>ScrollArea {i}</li>
                ))}
            </ul>
        </ScrollArea>
    ),
}

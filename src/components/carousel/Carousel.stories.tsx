import type { Meta, StoryObj } from '@storybook/react-vite'
import { Carousel } from '.'

const meta: Meta<typeof Carousel> = {
    title: 'components/Carousel',
    component: Carousel,
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        items: new Array(6).fill(0).map((_, i) => ({
            value: (
                <img src={`https://picsum.photos/200/300?random=${i}`}></img>
            ),
            label: `Cat ${i + 1}`,
        })),
    },
}

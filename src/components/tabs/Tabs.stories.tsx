import type { Meta, StoryObj } from '@storybook/react'
import { mdiCheck, mdiClose, mdiMagnify } from '@mdi/js'
import Icon from '@mdi/react'
import { Tabs } from '.'

const meta: Meta<typeof Tabs> = {
    title: 'components/Tabs',
    component: Tabs,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        items: [
            {
                value: 'Tab 1',
                icon: <Icon size={1} path={mdiCheck} />,
            },
            {
                value: 'Tab 2',
                icon: <Icon size={1} path={mdiClose} />,
            },
            {
                value: 'Tab 3',
                icon: <Icon size={1} path={mdiMagnify} />,
            },
        ],
    },
}

export const Full: Story = {
    parameters: { layout: 'fullscreen' },
    args: {
        full: true,
        items: [
            {
                value: 'Tab 1',
                icon: <Icon size={1} path={mdiCheck} />,
            },
            {
                value: 'Tab 2',
                icon: <Icon size={1} path={mdiClose} />,
            },
            {
                value: 'Tab 3',
                icon: <Icon size={1} path={mdiMagnify} />,
                disabled: true,
            },
            {
                value: 'Tab 4',
                icon: <Icon size={1} path={mdiMagnify} />,
            },
        ],
    },
}

export const Row: Story = {
    args: {
        variant: 'secondary',
        items: [
            {
                value: 'Tab 1',
                icon: <Icon size={1} path={mdiCheck} />,
                direction: 'row',
            },
            {
                value: 'Tab 2',
                icon: <Icon size={1} path={mdiClose} />,
                direction: 'row',
            },
            {
                value: 'Tab 3',
                icon: <Icon size={1} path={mdiMagnify} />,
                direction: 'row',
            },
        ],
    },
}

export const Scrolling: Story = {
    parameters: { layout: 'fullscreen' },
    decorators: [
        (Story) => (
            <div style={{ paddingBottom: '2rem' }}>
                <Story />
            </div>
        ),
    ],
    args: {
        items: [
            1, 666666, 8080, 3, 443, 8888, 1, 666666, 8080, 3, 443, 8888,
        ].map((i, value) => ({
            label: `Tab ${i}`,
            value: String(value),
        })),
    },
}

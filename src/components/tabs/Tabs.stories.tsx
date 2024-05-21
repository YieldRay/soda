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
            20, 21, 22, 23, 25, 53, 67, 68, 69, 80, 110, 119, 123, 137, 138,
            139, 143, 161, 162, 179, 194, 443, 465, 514, 515, 587, 636, 993,
            995, 1080, 1194, 1433, 1434, 1521, 1723, 1812, 1813, 2049, 3306,
            3389, 5060, 5061, 5432, 5900, 6379, 8080, 8443, 27017, 27018, 27019,
            27020, 50000,
        ].map((i, value) => ({
            label: `Tab ${i}`,
            value: String(value),
        })),
    },
}

export const Block: Story = {
    args: {
        variant: 'block',
        defaultValue: 'Tab 1',
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

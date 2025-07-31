import { mdiAccount, mdiClose, mdiCheck, mdiMagnify } from '@mdi/js'
import Icon from '@mdi/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { SplitButton } from '.'
import { Divider } from '../divider'
import { Menu, MenuItem } from '../menu'

const meta: Meta<typeof SplitButton> = {
    title: 'components/Button/SplitButton',
    component: SplitButton,
    parameters: { layout: 'centered' },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['outlined', 'filled', 'elevated', 'tonal'],
        },
        size: {
            control: { type: 'select' },
            options: ['extra-small', 'small', 'medium', 'large', 'extra-large'],
        },
        disabled: {
            type: 'boolean',
            options: [false, true],
            control: { type: 'radio' },
        },
    },
}

export default meta
type Story = StoryObj<typeof meta>

const SampleMenu = (
    <Menu>
        <MenuItem
            leadingIcon={<Icon size={1} path={mdiCheck} />}
        >
            Edit
        </MenuItem>
        <MenuItem
            leadingIcon={<Icon size={1} path={mdiMagnify} />}
        >
            Search
        </MenuItem>
        <Divider />
        <MenuItem
            leadingIcon={<Icon size={1} path={mdiClose} />}
        >
            Delete
        </MenuItem>
    </Menu>
)

export const Filled: Story = {
    args: {
        variant: 'filled',
        size: 'medium',
        children: 'Save',
        menu: SampleMenu,
        onClick: () => alert('Primary action clicked!'),
    },
}

export const Elevated: Story = {
    args: {
        variant: 'elevated',
        size: 'medium',
        children: 'Save',
        menu: SampleMenu,
        onClick: () => alert('Primary action clicked!'),
    },
}

export const Tonal: Story = {
    args: {
        variant: 'tonal',
        size: 'medium',
        children: 'Save',
        menu: SampleMenu,
        onClick: () => alert('Primary action clicked!'),
    },
}

export const Outlined: Story = {
    args: {
        variant: 'outlined',
        size: 'medium',
        children: 'Save',
        menu: SampleMenu,
        onClick: () => alert('Primary action clicked!'),
    },
}

export const WithIcon: Story = {
    args: {
        variant: 'filled',
        size: 'medium',
        children: (
            <>
                <Icon size="20px" path={mdiAccount} /> Profile
            </>
        ),
        menu: SampleMenu,
        onClick: () => alert('Primary action clicked!'),
    },
}

export const IconOnly: Story = {
    args: {
        variant: 'filled',
        size: 'medium',
        children: <Icon size="20px" path={mdiAccount} />,
        menu: SampleMenu,
        onClick: () => alert('Primary action clicked!'),
        'aria-label': 'User profile actions',
    },
}

export const ExtraSmall: Story = {
    args: {
        variant: 'filled',
        size: 'extra-small',
        children: 'Save',
        menu: SampleMenu,
        onClick: () => alert('Primary action clicked!'),
    },
}

export const Small: Story = {
    args: {
        variant: 'filled',
        size: 'small',
        children: 'Save',
        menu: SampleMenu,
        onClick: () => alert('Primary action clicked!'),
    },
}

export const Medium: Story = {
    args: {
        variant: 'filled',
        size: 'medium',
        children: 'Save',
        menu: SampleMenu,
        onClick: () => alert('Primary action clicked!'),
    },
}

export const Large: Story = {
    args: {
        variant: 'filled',
        size: 'large',
        children: 'Save',
        menu: SampleMenu,
        onClick: () => alert('Primary action clicked!'),
    },
}

export const ExtraLarge: Story = {
    args: {
        variant: 'filled',
        size: 'extra-large',
        children: 'Save',
        menu: SampleMenu,
        onClick: () => alert('Primary action clicked!'),
    },
}

export const Disabled: Story = {
    args: {
        variant: 'filled',
        size: 'medium',
        children: 'Save',
        menu: SampleMenu,
        disabled: true,
        onClick: () => alert('Primary action clicked!'),
    },
}

export const AllVariants: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <SplitButton
                variant="filled"
                children="Filled"
                menu={SampleMenu}
                onClick={() => alert('Filled clicked!')}
            />
            <SplitButton
                variant="elevated"
                children="Elevated"
                menu={SampleMenu}
                onClick={() => alert('Elevated clicked!')}
            />
            <SplitButton
                variant="tonal"
                children="Tonal"
                menu={SampleMenu}
                onClick={() => alert('Tonal clicked!')}
            />
            <SplitButton
                variant="outlined"
                children="Outlined"
                menu={SampleMenu}
                onClick={() => alert('Outlined clicked!')}
            />
        </div>
    ),
}

export const AllSizes: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <SplitButton
                variant="filled"
                size="extra-small"
                children="XS"
                menu={SampleMenu}
                onClick={() => alert('XS clicked!')}
            />
            <SplitButton
                variant="filled"
                size="small"
                children="Small"
                menu={SampleMenu}
                onClick={() => alert('Small clicked!')}
            />
            <SplitButton
                variant="filled"
                size="medium"
                children="Medium"
                menu={SampleMenu}
                onClick={() => alert('Medium clicked!')}
            />
            <SplitButton
                variant="filled"
                size="large"
                children="Large"
                menu={SampleMenu}
                onClick={() => alert('Large clicked!')}
            />
            <SplitButton
                variant="filled"
                size="extra-large"
                children="Extra Large"
                menu={SampleMenu}
                onClick={() => alert('XL clicked!')}
            />
        </div>
    ),
}